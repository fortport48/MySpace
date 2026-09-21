import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/security/auth-guard';
import { rateLimit } from '@/lib/security/rate-limit';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const auth = await requireAuth();
    if (!auth.isAuthenticated || !auth.userId) {
      return NextResponse.json({ error: auth.error || 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting: Max 3 data exports per hour
    const limitResult = rateLimit(auth.userId, 'export_data', 3, 60 * 60 * 1000);
    if (!limitResult.success) {
      return NextResponse.json({ error: 'Data export rate limit reached. Please try again later.' }, { status: 429 });
    }

    // Retrieve all data records associated with user
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      include: {
        personality: true,
        lifestyle: true,
        hobbies: true,
        favorites: true,
        preferences: true,
        quotes: true,
        socials: true,
        sectionSettings: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User record not found' }, { status: 404 });
    }

    const privacySettings = await (prisma as any).privacySettings.findUnique({
      where: { userId: auth.userId },
    });

    // Strip internal database password hash for security
    const { passwordHash, ...userData } = user;

    const dataExportPayload = {
      exportVersion: '1.0',
      exportedAt: new Date().toISOString(),
      user: userData,
      privacySettings: privacySettings || {
        profileVisibility: 'PUBLIC',
        locationVisibility: 'PUBLIC',
        birthdayVisibility: 'PRIVATE',
      },
    };

    return new NextResponse(JSON.stringify(dataExportPayload, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="avero-data-export-${user.username}.json"`,
      },
    });
  } catch (error) {
    console.error('Data Export Error:', error);
    return NextResponse.json({ error: 'Failed to export personal data' }, { status: 500 });
  }
}
