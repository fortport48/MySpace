import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const sectionsSchema = z.array(
  z.object({
    sectionKey: z.string(),
    isVisible: z.boolean(),
    orderIndex: z.number(),
  })
);

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await req.json();
    const validation = sectionsSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid section settings payload' },
        { status: 400 }
      );
    }

    const sections = validation.data;

    // Upsert each section setting for user
    for (const sec of sections) {
      await prisma.sectionSetting.upsert({
        where: {
          userId_sectionKey: {
            userId: user.id,
            sectionKey: sec.sectionKey,
          },
        },
        create: {
          userId: user.id,
          sectionKey: sec.sectionKey,
          isVisible: sec.isVisible,
          orderIndex: sec.orderIndex,
        },
        update: {
          isVisible: sec.isVisible,
          orderIndex: sec.orderIndex,
        },
      });
    }

    return NextResponse.json({
      message: 'Section order and visibility updated successfully!',
    });
  } catch (error) {
    console.error('Update Section Settings Error:', error);
    return NextResponse.json(
      { error: 'Failed to update section settings.' },
      { status: 500 }
    );
  }
}
