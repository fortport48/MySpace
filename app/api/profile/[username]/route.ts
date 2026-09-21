import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { DEMO_PROFILE } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { username: string } }
) {
  try {
    const username = params.username.toLowerCase();
    const session = await getServerSession(authOptions);
    const callerEmail = session?.user?.email;

    const user = await prisma.user.findUnique({
      where: { username },
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
      // Fallback demo profile if user handle not in DB yet
      if (username === 'alex' || username === 'demo') {
        return NextResponse.json({
          id: 'demo_alex',
          username: 'alex',
          isPublic: true,
          about: {
            name: DEMO_PROFILE.name,
            username: DEMO_PROFILE.username,
            tagline: DEMO_PROFILE.tagline,
            bio: DEMO_PROFILE.bio,
            location: DEMO_PROFILE.location,
            profileImage: DEMO_PROFILE.avatarUrl,
            statusPill: DEMO_PROFILE.statusPill,
            handwrittenHeader: DEMO_PROFILE.handwrittenNoteHeader,
            handwrittenFooter: DEMO_PROFILE.handwrittenNoteFooter,
            quoteBlock: DEMO_PROFILE.quoteBlock,
          },
          personality: {
            description: 'Passionate about outdoor adventures and minimalist design.',
            personalityType: 'ENFP (The Campaigner)',
            traits: DEMO_PROFILE.personalityTraits,
            values: ['Curiosity', 'Authenticity', 'Empathy', 'Freedom'],
          },
          lifestyle: {
            chronotype: 'Night Owl',
            socialEnergy: 'Ambivert',
            freeTimeActivity: 'Landscape photography & brewing specialty coffee',
            weekendActivities: 'Mountain trekking & camping under stars',
          },
          hobbies: DEMO_PROFILE.hobbies.map((h: string, i: number) => ({ id: `h_${i}`, name: h, icon: '🏔️', orderIndex: i })),
          favorites: DEMO_PROFILE.travel.map((t: any, i: number) => ({ id: t.id, category: 'travel' as const, title: t.title, subtitle: t.subtitle, imageUrl: t.imageUrl, description: t.description, orderIndex: i })),
          preferences: DEMO_PROFILE.likes.map((l: string, i: number) => ({ id: `l_${i}`, type: 'like' as const, label: l, orderIndex: i })),
          quotes: DEMO_PROFILE.favoriteQuotes.map((q: string, i: number) => ({ id: `q_${i}`, content: q, isFeatured: i === 0, orderIndex: i })),
          socials: [
            { id: 's1', platform: 'instagram' as const, url: 'https://instagram.com' },
            { id: 's2', platform: 'linkedin' as const, url: 'https://linkedin.com' },
            { id: 's3', platform: 'github' as const, url: 'https://github.com' },
            { id: 's4', platform: 'youtube' as const, url: 'https://youtube.com' },
          ],
          sectionSettings: [
            { sectionKey: 'about', isVisible: true, orderIndex: 0 },
            { sectionKey: 'personality', isVisible: true, orderIndex: 1 },
            { sectionKey: 'hobbies', isVisible: true, orderIndex: 2 },
            { sectionKey: 'favorites', isVisible: true, orderIndex: 3 },
            { sectionKey: 'preferences', isVisible: true, orderIndex: 4 },
            { sectionKey: 'lifestyle', isVisible: true, orderIndex: 5 },
            { sectionKey: 'social', isVisible: true, orderIndex: 6 },
            { sectionKey: 'quotes', isVisible: true, orderIndex: 7 },
          ],
        });
      }
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const isOwner = Boolean(callerEmail && callerEmail.toLowerCase() === user.email.toLowerCase());

    // Fetch privacy settings
    const privacySettings = await (prisma as any).privacySettings.findUnique({
      where: { userId: user.id },
    });

    const profileVis = privacySettings?.profileVisibility || (user.isPublic ? 'PUBLIC' : 'PRIVATE');

    // If profile is PRIVATE and viewer is not owner -> 403 Forbidden
    if (profileVis === 'PRIVATE' && !isOwner) {
      return NextResponse.json(
        { error: 'This profile is private.', isPrivate: true },
        { status: 403 }
      );
    }

    // If profile is MEMBERS_ONLY and viewer is not logged in -> 401 Unauthorized
    if (profileVis === 'MEMBERS_ONLY' && !session && !isOwner) {
      return NextResponse.json(
        { error: 'This profile is discoverable only to logged-in members.', isMembersOnly: true },
        { status: 401 }
      );
    }

    // Check location & birthday privacy rules
    const locVis = privacySettings?.locationVisibility || 'PUBLIC';
    const bdayVis = privacySettings?.birthdayVisibility || 'PRIVATE';

    const hideLocation = locVis === 'PRIVATE' && !isOwner;
    const hideBirthday = bdayVis === 'PRIVATE' && !isOwner;

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
      isPublic: user.isPublic,
      about: {
        name: user.name,
        username: user.username,
        tagline: user.tagline || '',
        bio: user.bio || '',
        location: hideLocation ? '' : (user.location || ''),
        birthday: hideBirthday ? '' : (user.birthday ? user.birthday.toISOString().split('T')[0] : ''),
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
    console.error('Fetch Public Profile Error:', error);
    return NextResponse.json({ error: 'Failed to fetch public profile' }, { status: 500 });
  }
}
