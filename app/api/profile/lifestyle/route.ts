import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const lifestyleSchema = z.object({
  chronotype: z.string().optional(),
  socialEnergy: z.string().optional(),
  freeTimeActivity: z.string().optional(),
  weekendActivities: z.string().optional(),
});

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = lifestyleSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid lifestyle data' },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const lifestyleRecord = await prisma.lifestyleProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        chronotype: validation.data.chronotype,
        socialEnergy: validation.data.socialEnergy,
        freeTimeActivity: validation.data.freeTimeActivity,
        weekendActivities: validation.data.weekendActivities,
      },
      update: {
        chronotype: validation.data.chronotype,
        socialEnergy: validation.data.socialEnergy,
        freeTimeActivity: validation.data.freeTimeActivity,
        weekendActivities: validation.data.weekendActivities,
      },
    });

    return NextResponse.json({
      message: 'Lifestyle profile updated successfully!',
      lifestyle: lifestyleRecord,
    });
  } catch (error) {
    console.error('Update Lifestyle Error:', error);
    return NextResponse.json(
      { error: 'Failed to update Lifestyle section.' },
      { status: 500 }
    );
  }
}
