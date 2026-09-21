import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const personalitySchema = z.object({
  description: z.string().optional(),
  personalityType: z.string().optional(),
  traits: z.array(z.string()).optional(),
  values: z.array(z.string()).optional(),
});

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = personalitySchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid personality data' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const traitsStr = validation.data.traits?.join(',') || '';
    const valuesStr = validation.data.values?.join(',') || '';

    const personalityRecord = await prisma.personalityProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        description: validation.data.description,
        personalityType: validation.data.personalityType,
        traits: traitsStr,
        values: valuesStr,
      },
      update: {
        description: validation.data.description,
        personalityType: validation.data.personalityType,
        traits: traitsStr,
        values: valuesStr,
      },
    });

    return NextResponse.json({
      message: 'Personality profile updated successfully!',
      personality: personalityRecord,
    });
  } catch (error) {
    console.error('Update Personality Error:', error);
    return NextResponse.json(
      { error: 'Failed to update Personality section.' },
      { status: 500 }
    );
  }
}
