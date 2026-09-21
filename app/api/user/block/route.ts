import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/security/auth-guard';
import { rateLimit } from '@/lib/security/rate-limit';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const blockSchema = z.object({
  targetUsername: z.string().min(1, 'Target username is required'),
  action: z.enum(['block', 'unblock']),
});

export async function POST(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth.isAuthenticated || !auth.userId) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting: Max 20 block actions per 5 minutes
    const limitResult = rateLimit(auth.userId, 'block_user', 20, 5 * 60 * 1000);
    if (!limitResult.success) {
      return NextResponse.json({ error: 'Too many block requests. Please wait.' }, { status: 429 });
    }

    const body = await req.json();
    const validation = blockSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid block request' }, { status: 400 });
    }

    const { targetUsername, action } = validation.data;

    const targetUser = await prisma.user.findUnique({
      where: { username: targetUsername.toLowerCase() },
      select: { id: true },
    });

    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    if (targetUser.id === auth.userId) {
      return NextResponse.json({ error: 'You cannot block yourself' }, { status: 400 });
    }

    if (action === 'block') {
      await (prisma as any).userBlock.upsert({
        where: {
          blockerId_blockedId: {
            blockerId: auth.userId,
            blockedId: targetUser.id,
          },
        },
        create: {
          blockerId: auth.userId,
          blockedId: targetUser.id,
        },
        update: {},
      });
      return NextResponse.json({ message: `@${targetUsername} has been blocked.` });
    } else {
      await (prisma as any).userBlock.deleteMany({
        where: {
          blockerId: auth.userId,
          blockedId: targetUser.id,
        },
      });
      return NextResponse.json({ message: `@${targetUsername} has been unblocked.` });
    }
  } catch (error) {
    console.error('Block User Error:', error);
    return NextResponse.json({ error: 'Failed to process block request' }, { status: 500 });
  }
}
