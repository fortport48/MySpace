import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/security/auth-guard';
import { rateLimit } from '@/lib/security/rate-limit';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Password is required to confirm account deletion'),
  confirmationText: z.string().refine((val) => val === 'DELETE MY ACCOUNT', {
    message: 'Please type "DELETE MY ACCOUNT" to confirm',
  }),
});

export async function DELETE(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth.isAuthenticated || !auth.userId) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting: Max 3 deletion attempts per 15 minutes
    const limitResult = rateLimit(auth.userId, 'delete_account', 3, 15 * 60 * 1000);
    if (!limitResult.success) {
      return NextResponse.json({ error: 'Too many deletion attempts. Please wait.' }, { status: 429 });
    }

    const body = await req.json();
    const validation = deleteAccountSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid deletion confirmation' },
        { status: 400 }
      );
    }

    const { password } = validation.data;

    // Fetch user password hash
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { id: true, passwordHash: true },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json({ error: 'User record not found' }, { status: 404 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Incorrect password. Account deletion aborted.' }, { status: 400 });
    }

    // Delete user (Cascading delete will remove all related models)
    await prisma.user.delete({
      where: { id: auth.userId },
    });

    return NextResponse.json({
      message: 'Your account and all associated profile data have been permanently deleted.',
    });
  } catch (error) {
    console.error('Delete Account Error:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
