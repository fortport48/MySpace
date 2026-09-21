import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { checkRateLimit, rateLimitResponse } from '@/lib/security/rate-limiter';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username cannot exceed 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export async function POST(req: Request) {
  try {
    // 1. Enforce IP rate limiting (Max 10 signup attempts per minute per IP)
    const rateLimit = checkRateLimit(req, { limit: 10, windowMs: 60 * 1000 });
    if (!rateLimit.isAllowed) {
      return rateLimitResponse(rateLimit);
    }

    const body = await req.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || 'Invalid input data';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { name, username, email, password } = validation.data;
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedUsername = username.toLowerCase().trim();

    // Check existing email
    const existingEmail = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      );
    }

    // Check existing username
    const existingUsername = await prisma.user.findUnique({
      where: { username: normalizedUsername },
    });
    if (existingUsername) {
      return NextResponse.json(
        { error: 'This username is already taken. Please choose another.' },
        { status: 409 }
      );
    }

    // Hash password securely
    const passwordHash = await bcrypt.hash(password, 12);

    // Default avatar
    const defaultAvatar = `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80`;

    // Create User in DB
    const newUser = await prisma.user.create({
      data: {
        name,
        username: normalizedUsername,
        email: normalizedEmail,
        passwordHash,
        profileImage: defaultAvatar,
        tagline: 'Chasing passions, stories and good vibes.',
        bio: 'Welcome to my MySpace profile!',
        statusPill: '🌿 Exploring • Learning • Growing',
        handwrittenHeader: 'Same Person, More to Explore',
        handwrittenFooter: 'Collect Moments Not Things',
        quoteBlock: 'Collecting moments, not things.',
      },
    });

    // Generate Email Verification Token
    const verifyToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await prisma.verificationToken.create({
      data: {
        email: normalizedEmail,
        token: verifyToken,
        expires,
      },
    });

    // Return created user without passwordHash
    return NextResponse.json(
      {
        message: 'Account created successfully!',
        verificationToken: verifyToken,
        user: {
          id: newUser.id,
          name: newUser.name,
          username: newUser.username,
          email: newUser.email,
          profileImage: newUser.profileImage,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during signup.' },
      { status: 500 }
    );
  }
}
