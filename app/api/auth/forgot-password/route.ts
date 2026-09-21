import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validation = forgotPasswordSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid email address' },
        { status: 400 }
      );
    }

    const { email } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // Even if user doesn't exist, return success message to prevent user enumeration
    if (!user) {
      return NextResponse.json(
        { message: 'If an account with that email exists, we sent a password reset link.' },
        { status: 200 }
      );
    }

    // Delete any previous reset token for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: normalizedEmail },
    });

    // Create new reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        email: normalizedEmail,
        token,
        expires,
      },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

    return NextResponse.json({
      message: 'Password reset token generated successfully.',
      resetUrl, // Included for demonstration / testing purposes
    });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return NextResponse.json(
      { error: 'An error occurred while requesting password reset.' },
      { status: 500 }
    );
  }
}
