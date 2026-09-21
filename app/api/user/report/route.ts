import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/security/auth-guard';
import { rateLimit } from '@/lib/security/rate-limit';
import { sanitizeString } from '@/lib/security/sanitize';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const reportSchema = z.object({
  reportedUsername: z.string().min(1, 'Reported username is required'),
  reason: z.string().min(1, 'Reason is required'),
  details: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth.isAuthenticated || !auth.userId) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting: Max 5 reports per 10 minutes per user
    const limitResult = rateLimit(auth.userId, 'report_user', 5, 10 * 60 * 1000);
    if (!limitResult.success) {
      return NextResponse.json(
        { error: `Too many report requests. Please wait ${limitResult.reset} seconds.` },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = reportSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid report payload' },
        { status: 400 }
      );
    }

    const { reportedUsername, reason, details } = validation.data;

    // Sanitize user-generated text
    const cleanReason = sanitizeString(reason);
    const cleanDetails = sanitizeString(details || '');

    // Find reported user
    const reportedUser = await prisma.user.findUnique({
      where: { username: reportedUsername.toLowerCase() },
      select: { id: true },
    });

    if (!reportedUser) {
      return NextResponse.json({ error: 'Reported user not found' }, { status: 404 });
    }

    if (reportedUser.id === auth.userId) {
      return NextResponse.json({ error: 'You cannot report your own profile' }, { status: 400 });
    }

    // Record report in database
    await (prisma as any).userReport.create({
      data: {
        reporterId: auth.userId,
        reportedId: reportedUser.id,
        reason: cleanReason,
        details: cleanDetails,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      message: 'Report submitted successfully. Thank you for keeping Avero safe.',
    });
  } catch (error) {
    console.error('Submit Report Error:', error);
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }
}
