import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { DEMO_PROFILES } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.trim() || '';
    const category = searchParams.get('category')?.trim().toLowerCase() || '';
    const hobbyParam = searchParams.get('hobby')?.trim() || '';
    const locationParam = searchParams.get('location')?.trim() || '';
    const personalityParam = searchParams.get('personality')?.trim() || '';
    
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '9', 10));
    const skip = (page - 1) * limit;

    // 1. Fetch user IDs that have explicitly configured non-public privacy settings (PRIVATE or MEMBERS_ONLY)
    const nonPublicSettings = await (prisma as any).privacySettings.findMany({
      where: {
        profileVisibility: {
          in: ['PRIVATE', 'MEMBERS_ONLY'],
        },
      },
      select: { userId: true },
    });

    const hiddenUserIds: string[] = nonPublicSettings.map((s: any) => s.userId);

    // 2. Fetch all usernames & IDs that are non-public or suspended
    const hiddenConditions: any[] = [
      { isPublic: false },
      { isSuspended: true },
    ];
    if (hiddenUserIds.length > 0) {
      hiddenConditions.push({ id: { in: hiddenUserIds } });
    }

    const privateUserRecords = await prisma.user.findMany({
      where: {
        OR: hiddenConditions,
      },
      select: { id: true, username: true },
    });

    const excludedUserIds = new Set<string>([
      ...hiddenUserIds,
      ...privateUserRecords.map((u) => u.id),
    ]);

    const excludedUsernames = new Set<string>(
      privateUserRecords.map((u) => u.username.toLowerCase())
    );

    // 3. Build Prisma query condition (ALWAYS enforce isPublic: true, NOT suspended, NOT hidden by privacy settings)
    const whereCondition: any = {
      isPublic: true,
      isSuspended: false,
    };

    if (excludedUserIds.size > 0) {
      whereCondition.id = {
        notIn: Array.from(excludedUserIds),
      };
    }

    const andConditions: any[] = [];

    // Search query across name, username, bio, tagline, location, hobbies, favorites, personality
    if (query) {
      andConditions.push({
        OR: [
          { name: { contains: query } },
          { username: { contains: query } },
          { bio: { contains: query } },
          { tagline: { contains: query } },
          { location: { contains: query } },
          { hobbies: { some: { name: { contains: query } } } },
          { favorites: { some: { title: { contains: query } } } },
          { favorites: { some: { subtitle: { contains: query } } } },
          { personality: { is: { traits: { contains: query } } } },
        ],
      });
    }

    // Filter by specific hobby
    if (hobbyParam) {
      andConditions.push({
        hobbies: {
          some: {
            name: { contains: hobbyParam },
          },
        },
      });
    }

    // Filter by favorite category (travel, music, movie, book, food, etc.)
    if (category && category !== 'all' && category !== 'hobbies') {
      andConditions.push({
        favorites: {
          some: {
            category: category,
          },
        },
      });
    } else if (category === 'hobbies') {
      andConditions.push({
        hobbies: {
          some: {},
        },
      });
    }

    // Filter by location
    if (locationParam) {
      andConditions.push({
        location: { contains: locationParam },
      });
    }

    // Filter by personality traits
    if (personalityParam) {
      andConditions.push({
        personality: {
          is: {
            traits: { contains: personalityParam },
          },
        },
      });
    }

    if (andConditions.length > 0) {
      whereCondition.AND = andConditions;
    }

    // Fetch database users matching public criteria
    const [dbUsers, totalCount] = await Promise.all([
      prisma.user.findMany({
        where: whereCondition,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          hobbies: { take: 4, orderBy: { orderIndex: 'asc' } },
          favorites: { take: 4, orderBy: { orderIndex: 'asc' } },
          personality: true,
        },
      }),
      prisma.user.count({ where: whereCondition }),
    ]);

    // Format profiles
    let profiles = dbUsers.map((u) => ({
      id: u.id,
      name: u.name,
      username: u.username,
      bio: u.bio || u.tagline || 'Curious mind sharing personal passions & experiences.',
      tagline: u.tagline || '',
      avatarUrl: u.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      coverImageUrl: u.coverImageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      location: u.location || '',
      statusPill: u.statusPill || '',
      hobbies: u.hobbies.map((h) => ({
        id: h.id,
        name: h.name,
        icon: h.icon || '🎨',
      })),
      interests: u.favorites.map((f) => ({
        id: f.id,
        title: f.title,
        category: f.category,
        imageUrl: f.imageUrl,
      })),
    }));

    // If database has few users, merge mock demo profiles (excluding private handles)
    if (profiles.length < limit && page === 1) {
      const mockProfilesFormatted = DEMO_PROFILES.filter((dp) => {
        // Enforce mock query filtering
        if (query) {
          const qLower = query.toLowerCase();
          const matches =
            dp.name.toLowerCase().includes(qLower) ||
            dp.username.toLowerCase().includes(qLower) ||
            dp.bio.toLowerCase().includes(qLower) ||
            dp.tagline.toLowerCase().includes(qLower) ||
            (dp.location && dp.location.toLowerCase().includes(qLower)) ||
            dp.hobbies.some((h) => h.toLowerCase().includes(qLower)) ||
            dp.travel.some((t) => t.title.toLowerCase().includes(qLower)) ||
            dp.music.some((m) => m.title.toLowerCase().includes(qLower)) ||
            dp.movies.some((mv) => mv.title.toLowerCase().includes(qLower));
          if (!matches) return false;
        }

        if (category && category !== 'all') {
          if (category === 'travel' && dp.travel.length === 0) return false;
          if (category === 'music' && dp.music.length === 0) return false;
          if (category === 'movie' && dp.movies.length === 0) return false;
        }

        if (hobbyParam) {
          const hLower = hobbyParam.toLowerCase();
          if (!dp.hobbies.some((h) => h.toLowerCase().includes(hLower))) return false;
        }

        return true;
      }).map((dp) => ({
        id: dp.id,
        name: dp.name,
        username: dp.username,
        bio: dp.bio,
        tagline: dp.tagline,
        avatarUrl: dp.avatarUrl,
        coverImageUrl: dp.coverImageUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
        location: dp.location || '',
        statusPill: dp.statusPill || '',
        hobbies: dp.hobbies.slice(0, 4).map((h, i) => ({
          id: `demo_h_${i}`,
          name: h,
          icon: h.slice(0, 2),
        })),
        interests: [
          ...dp.travel.slice(0, 2).map((t) => ({ id: t.id, title: t.title, category: 'travel', imageUrl: t.imageUrl })),
          ...dp.music.slice(0, 2).map((m) => ({ id: m.id, title: m.title, category: 'music', imageUrl: m.imageUrl })),
        ],
      }));

      // Combine database users and mock profiles (deduplicating by username & strictly excluding private handles)
      const existingUsernames = new Set(profiles.map((p) => p.username.toLowerCase()));
      for (const mp of mockProfilesFormatted) {
        const handleLower = mp.username.toLowerCase();
        if (!existingUsernames.has(handleLower) && !excludedUsernames.has(handleLower)) {
          profiles.push(mp);
        }
      }
    }

    const totalPages = Math.ceil((totalCount || profiles.length) / limit);
    const hasMore = page < totalPages || (page === 1 && profiles.length > limit);

    // Suggested profiles section (top 3 public profiles)
    const suggestedProfiles = profiles.slice(0, 3);

    return NextResponse.json({
      profiles,
      suggestedProfiles,
      pagination: {
        page,
        limit,
        totalCount: totalCount || profiles.length,
        totalPages: totalPages || 1,
        hasMore,
      },
    });
  } catch (error) {
    console.error('Explore API Error:', error);
    return NextResponse.json(
      { error: 'Failed to search public profiles' },
      { status: 500 }
    );
  }
}
