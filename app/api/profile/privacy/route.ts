import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/security/auth-guard';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const privacyPayloadSchema = z.object({
  profileVisibility: z.enum(['PUBLIC', 'MEMBERS_ONLY', 'PRIVATE']),
  locationVisibility: z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']),
  birthdayVisibility: z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']),
  hobbiesVisibility: z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']).optional(),
  favoritesVisibility: z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']).optional(),
  personalityVisibility: z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']).optional(),
  lifestyleVisibility: z.enum(['PUBLIC', 'FOLLOWERS', 'PRIVATE']).optional(),
});

export async function GET() {
  try {
    const auth = await requireAuth();
    if (!auth.isAuthenticated || !auth.userId) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
    }

    const [user, settings] = await Promise.all([
      prisma.user.findUnique({
        where: { id: auth.userId },
        select: { isPublic: true },
      }),
      (prisma as any).privacySettings.findUnique({
        where: { userId: auth.userId },
      }),
    ]);

    return NextResponse.json({
      isPublic: user?.isPublic ?? true,
      profileVisibility: settings?.profileVisibility || (user?.isPublic ? 'PUBLIC' : 'PRIVATE'),
      locationVisibility: settings?.locationVisibility || 'PUBLIC',
      birthdayVisibility: settings?.birthdayVisibility || 'PRIVATE',
      hobbiesVisibility: settings?.hobbiesVisibility || 'PUBLIC',
      favoritesVisibility: settings?.favoritesVisibility || 'PUBLIC',
      personalityVisibility: settings?.personalityVisibility || 'PUBLIC',
      lifestyleVisibility: settings?.lifestyleVisibility || 'PUBLIC',
    });
  } catch (error) {
    console.error('Fetch Privacy Error:', error);
    return NextResponse.json(
      {
        isPublic: true,
        profileVisibility: 'PUBLIC',
        locationVisibility: 'PUBLIC',
        birthdayVisibility: 'PRIVATE',
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await requireAuth();
    if (!auth.isAuthenticated || !auth.userId) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const validation = privacyPayloadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Invalid privacy payload' },
        { status: 400 }
      );
    }

    const {
      profileVisibility,
      locationVisibility,
      birthdayVisibility,
      hobbiesVisibility = 'PUBLIC',
      favoritesVisibility = 'PUBLIC',
      personalityVisibility = 'PUBLIC',
      lifestyleVisibility = 'PUBLIC',
    } = validation.data;

    const isPublicBoolean = profileVisibility === 'PUBLIC';

    // Update User model and PrivacySettings in parallel
    await Promise.all([
      prisma.user.update({
        where: { id: auth.userId },
        data: { isPublic: isPublicBoolean },
      }),
      (prisma as any).privacySettings.upsert({
        where: { userId: auth.userId },
        create: {
          userId: auth.userId,
          profileVisibility,
          locationVisibility,
          birthdayVisibility,
          hobbiesVisibility,
          favoritesVisibility,
          personalityVisibility,
          lifestyleVisibility,
        },
        update: {
          profileVisibility,
          locationVisibility,
          birthdayVisibility,
          hobbiesVisibility,
          favoritesVisibility,
          personalityVisibility,
          lifestyleVisibility,
        },
      }),
    ]);

    return NextResponse.json({
      message: 'Privacy settings updated successfully!',
      isPublic: isPublicBoolean,
      profileVisibility,
      locationVisibility,
      birthdayVisibility,
    });
  } catch (error) {
    console.error('Update Privacy Error:', error);
    return NextResponse.json(
      { error: 'Failed to update privacy settings' },
      { status: 500 }
    );
  }
}
