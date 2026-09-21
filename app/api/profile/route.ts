import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        personality: true,
        lifestyle: true,
        hobbies: { orderBy: { orderIndex: 'asc' } },
        favorites: { orderBy: { orderIndex: 'asc' } },
        preferences: { orderBy: { orderIndex: 'asc' } },
        quotes: { orderBy: { orderIndex: 'asc' } },
        socials: true,
        sectionSettings: { orderBy: { orderIndex: 'asc' } },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Default Section Settings if not yet created
    const defaultSections = [
      { sectionKey: 'about', isVisible: true, orderIndex: 0 },
      { sectionKey: 'personality', isVisible: true, orderIndex: 1 },
      { sectionKey: 'hobbies', isVisible: true, orderIndex: 2 },
      { sectionKey: 'favorites', isVisible: true, orderIndex: 3 },
      { sectionKey: 'preferences', isVisible: true, orderIndex: 4 },
      { sectionKey: 'lifestyle', isVisible: true, orderIndex: 5 },
      { sectionKey: 'social', isVisible: true, orderIndex: 6 },
      { sectionKey: 'quotes', isVisible: true, orderIndex: 7 },
    ];

    const sectionSettings = user.sectionSettings.length > 0
      ? user.sectionSettings.map(s => ({
          sectionKey: s.sectionKey as any,
          isVisible: s.isVisible,
          orderIndex: s.orderIndex,
        }))
      : defaultSections;

    const fullProfile = {
      id: user.id,
      username: user.username,
      about: {
        name: user.name,
        username: user.username,
        tagline: user.tagline || '',
        bio: user.bio || '',
        location: user.location || '',
        birthday: user.birthday ? user.birthday.toISOString().split('T')[0] : '',
        pronouns: user.pronouns || '',
        profileImage: user.profileImage || '',
        coverImageUrl: user.coverImageUrl || '',
        statusPill: user.statusPill || '🌿 Exploring • Learning • Growing',
        handwrittenHeader: user.handwrittenHeader || 'Same Person, More to Explore',
        handwrittenFooter: user.handwrittenFooter || 'Collect Moments Not Things',
        quoteBlock: user.quoteBlock || 'Collecting moments, not things.',
      },
      personality: {
        description: user.personality?.description || '',
        personalityType: user.personality?.personalityType || '',
        traits: user.personality?.traits ? user.personality.traits.split(',').filter(Boolean) : [],
        values: user.personality?.values ? user.personality.values.split(',').filter(Boolean) : [],
      },
      lifestyle: {
        chronotype: user.lifestyle?.chronotype || 'Night Owl',
        socialEnergy: user.lifestyle?.socialEnergy || 'Ambivert',
        freeTimeActivity: user.lifestyle?.freeTimeActivity || '',
        weekendActivities: user.lifestyle?.weekendActivities || '',
      },
      hobbies: user.hobbies.map(h => ({
        id: h.id,
        name: h.name,
        icon: h.icon || '🎨',
        category: h.category || 'General',
        orderIndex: h.orderIndex,
      })),
      favorites: user.favorites.map(f => ({
        id: f.id,
        category: f.category as any,
        title: f.title,
        subtitle: f.subtitle || '',
        imageUrl: f.imageUrl || '',
        description: f.description || '',
        orderIndex: f.orderIndex,
      })),
      preferences: user.preferences.map(p => ({
        id: p.id,
        type: p.type as any,
        label: p.label,
        orderIndex: p.orderIndex,
      })),
      quotes: user.quotes.map(q => ({
        id: q.id,
        content: q.content,
        author: q.author || '',
        isFeatured: q.isFeatured,
        orderIndex: q.orderIndex,
      })),
      socials: user.socials.map(s => ({
        id: s.id,
        platform: s.platform as any,
        url: s.url,
        label: s.label || '',
      })),
      sectionSettings,
    };

    return NextResponse.json(fullProfile);
  } catch (error) {
    console.error('Fetch Profile Error:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}
