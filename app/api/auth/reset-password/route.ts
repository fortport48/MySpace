import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  newPassword: z.string().min(8, 'New password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = resetPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid request data' },
        { status: 400 }
      );
    }

    const { token, newPassword } = validation.data;

    // Find token record
    const resetRecord = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired password reset link.' },
        { status: 400 }
      );
    }

    // Check expiration
    if (new Date() > resetRecord.expires) {
      await prisma.passwordResetToken.delete({
        where: { token },
      });
      return NextResponse.json(
        { error: 'Password reset link has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 12);

    // Update User password
    await prisma.user.update({
      where: { email: resetRecord.email },
      data: { passwordHash },
    });

    // Delete used reset token
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return NextResponse.json({
      message: 'Password reset successful! You can now log in with your new password.',
    });
  } catch (error) {
    console.error('Reset Password Error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password. Please try again.' },
      { status: 500 }
    );
  }
}
