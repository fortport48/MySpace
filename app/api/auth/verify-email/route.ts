import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    const verificationRecord = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationRecord) {
      return NextResponse.json(
        { error: 'Invalid or expired email verification token.' },
        { status: 400 }
      );
    }

    if (new Date() > verificationRecord.expires) {
      await prisma.verificationToken.delete({
        where: { token },
      });
      return NextResponse.json(
        { error: 'Email verification token has expired.' },
        { status: 400 }
      );
    }

    // Update user's emailVerified date
    await prisma.user.update({
      where: { email: verificationRecord.email },
      data: { emailVerified: new Date() },
    });

    // Clean up verification token
    await prisma.verificationToken.delete({
      where: { token },
    });

    return NextResponse.json({
      message: 'Email address verified successfully!',
    });
  } catch (error) {
    console.error('Email Verification Error:', error);
    return NextResponse.json(
      { error: 'Failed to verify email address.' },
      { status: 500 }
    );
  }
}
