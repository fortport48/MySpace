import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const aboutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  tagline: z.string().optional(),
  bio: z.string().optional(),
  location: z.string().optional(),
  birthday: z.string().optional(),
  pronouns: z.string().optional(),
  profileImage: z.string().optional(),
  coverImageUrl: z.string().optional(),
  statusPill: z.string().optional(),
  handwrittenHeader: z.string().optional(),
  handwrittenFooter: z.string().optional(),
  quoteBlock: z.string().optional(),
});

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = aboutSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid about data' },
        { status: 400 }
      );
    }

    const data = validation.data;

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: data.name,
        tagline: data.tagline,
        bio: data.bio,
        location: data.location,
        birthday: data.birthday ? new Date(data.birthday) : null,
        pronouns: data.pronouns,
        profileImage: data.profileImage,
        coverImageUrl: data.coverImageUrl,
        statusPill: data.statusPill,
        handwrittenHeader: data.handwrittenHeader,
        handwrittenFooter: data.handwrittenFooter,
        quoteBlock: data.quoteBlock,
      },
    });

    return NextResponse.json({
      message: 'About section updated successfully!',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (error) {
    console.error('Update About Section Error:', error);
    return NextResponse.json(
      { error: 'Failed to update About section.' },
      { status: 500 }
    );
  }
}
