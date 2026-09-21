import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/security/admin-guard';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error || 'Forbidden' }, { status: 403 });
    }

    const report = await (prisma as any).userReport.findUnique({
      where: { id: params.id },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    return NextResponse.json({ report });
  } catch (error) {
    console.error('Admin Get Report Error:', error);
    return NextResponse.json({ error: 'Failed to fetch report' }, { status: 500 });
  }
}

const reportActionSchema = z.object({
  status: z.enum(['RESOLVED', 'REVIEWED', 'DISMISSED']),
  suspendUser: z.boolean().optional(),
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const adminCheck = await requireAdmin();
    if (!adminCheck.isAdmin) {
      return NextResponse.json({ error: adminCheck.error || 'Forbidden' }, { status: 403 });
    }

    const reportId = params.id;
    const body = await req.json();
    const validation = reportActionSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid report resolution payload' }, { status: 400 });
    }

    const { status, suspendUser } = validation.data;

    // Fetch report details
    const report = await (prisma as any).userReport.findUnique({
      where: { id: reportId },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }

    // If requested, suspend reported user
    if (suspendUser && report.reportedId) {
      await prisma.user.update({
        where: { id: report.reportedId },
        data: { isSuspended: true },
      });
    }

    // Update report status
    const updatedReport = await (prisma as any).userReport.update({
      where: { id: reportId },
      data: { status },
    });

    return NextResponse.json({
      message: `Report marked as ${status}.`,
      report: updatedReport,
    });
  } catch (error) {
    console.error('Resolve Report Error:', error);
    return NextResponse.json({ error: 'Failed to resolve report' }, { status: 500 });
  }
}
