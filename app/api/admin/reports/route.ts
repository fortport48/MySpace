import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/security/admin-guard';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error || 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get('status')?.toUpperCase() || ''; // 'PENDING' | 'RESOLVED'

    const whereCondition: any = {};
    if (statusFilter) {
      whereCondition.status = statusFilter;
    }

    const reports = await (prisma as any).userReport.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
      take: 50,
    });

    // Populate reporter and reported user details
    const populatedReports = await Promise.all(
      reports.map(async (rep: any) => {
        const [reporter, reported] = await Promise.all([
          prisma.user.findUnique({
            where: { id: rep.reporterId },
            select: { id: true, name: true, username: true },
          }),
          prisma.user.findUnique({
            where: { id: rep.reportedId },
            select: { id: true, name: true, username: true, isSuspended: true, profileImage: true },
          }),
        ]);

        return {
          id: rep.id,
          reason: rep.reason,
          details: rep.details,
          status: rep.status,
          createdAt: rep.createdAt,
          reporter: reporter || { name: 'Anonymous', username: 'user' },
          reported: reported || { name: 'Unknown User', username: 'unknown', isSuspended: false },
        };
      })
    );

    return NextResponse.json({
      reports: populatedReports,
    });
  } catch (error) {
    console.error('Fetch Admin Reports Error:', error);
    return NextResponse.json({ error: 'Failed to fetch content reports' }, { status: 500 });
  }
}
