import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/security/auth-guard';
import { rateLimit } from '@/lib/security/rate-limit';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const muteSchema = z.object({
  targetUsername: z.string().min(1, 'Target username is required'),
  action: z.enum(['mute', 'unmute']),
});

export async function POST(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth.isAuthenticated || !auth.userId) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
    }

    const limitResult = rateLimit(auth.userId, 'mute_user', 20, 5 * 60 * 1000);
    if (!limitResult.success) {
      return NextResponse.json({ error: 'Too many requests. Please wait.' }, { status: 429 });
    }

    const body = await req.json();
    const validation = muteSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid mute request' }, { status: 400 });
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
      return NextResponse.json({ error: 'You cannot mute yourself' }, { status: 400 });
    }

    if (action === 'mute') {
      await (prisma as any).userMute.upsert({
        where: {
          muterId_mutedId: {
            muterId: auth.userId,
            mutedId: targetUser.id,
          },
        },
        create: {
          muterId: auth.userId,
          mutedId: targetUser.id,
        },
        update: {},
      });
      return NextResponse.json({ message: `@${targetUsername} has been muted.` });
    } else {
      await (prisma as any).userMute.deleteMany({
        where: {
          muterId: auth.userId,
          mutedId: targetUser.id,
        },
      });
      return NextResponse.json({ message: `@${targetUsername} has been unmuted.` });
    }
  } catch (error) {
    console.error('Mute User Error:', error);
    return NextResponse.json({ error: 'Failed to process mute request' }, { status: 500 });
  }
}
