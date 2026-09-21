import React from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { DEMO_PROFILE } from '@/lib/mock-data';
import { FullUserProfileData } from '@/lib/types';
import { ProfileHero } from '@/components/profile/profile-hero';
import { CategorySection } from '@/components/profile/category-section';
import { PersonalityBadgesSection } from '@/components/profile/personality-badge';
import { FavoriteQuotesCard } from '@/components/profile/quote-card';
import { Compass, Sparkles, Smile } from 'lucide-react';

interface PublicProfilePageProps {
  params: {
    username: string;
  };
}

async function getProfileData(username: string): Promise<FullUserProfileData | null> {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/profile/${username}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.error('Fetch public profile error:', err);
  }
  return null;
}

// Generate dynamic SEO metadata per public profile
export async function generateMetadata({ params }: PublicProfilePageProps): Promise<Metadata> {
  const data = await getProfileData(params.username);
  const name = data?.about?.name || DEMO_PROFILE.name;
  const username = params.username;
  const bio = data?.about?.bio || data?.about?.tagline || DEMO_PROFILE.bio;
  const avatar = data?.about?.profileImage || DEMO_PROFILE.avatarUrl;
  const title = `${name} (@${username}) — Everything that makes me, me`;
  const description = bio;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      username,
      type: 'profile',
      images: [
        {
          url: avatar,
          width: 800,
          height: 800,
          alt: `${name}'s profile photo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [avatar],
    },
  };
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const data = await getProfileData(params.username);
  const session = await getServerSession(authOptions);

  // Check if viewing logged in user's own profile
  const currentUser = session?.user as any;
  const isOwner = Boolean(
    currentUser &&
    (currentUser.username?.toLowerCase() === params.username.toLowerCase() ||
     currentUser.id === data?.id)
  );

  // Dynamic profile structure with fallback for uncreated handles
  const profile: FullUserProfileData = data || {
    id: 'demo',
    username: params.username,
    about: {
      name: DEMO_PROFILE.name,
      username: params.username,
      tagline: DEMO_PROFILE.tagline,
      bio: DEMO_PROFILE.bio,
      location: DEMO_PROFILE.location,
      profileImage: DEMO_PROFILE.avatarUrl,
      coverImageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
      statusPill: DEMO_PROFILE.statusPill,
      handwrittenHeader: DEMO_PROFILE.handwrittenNoteHeader,
      handwrittenFooter: DEMO_PROFILE.handwrittenNoteFooter,
      quoteBlock: DEMO_PROFILE.quoteBlock,
    },
    personality: {
      description: 'Chasing sunsets, indie music and specialty coffee.',
      personalityType: 'ENFP (The Campaigner)',
      traits: DEMO_PROFILE.personalityTraits,
      values: ['Curiosity', 'Authenticity', 'Empathy'],
    },
    lifestyle: {
      chronotype: 'Night Owl',
      socialEnergy: 'Ambivert',
      freeTimeActivity: 'Landscape photography & brewing specialty coffee',
      weekendActivities: 'Mountain trekking & stargazing',
    },
    hobbies: DEMO_PROFILE.hobbies.map((h: string, i: number) => ({ id: `h_${i}`, name: h, icon: '🏔️', orderIndex: i })),
    favorites: DEMO_PROFILE.travel.map((t: any, i: number) => ({ id: t.id, category: 'travel' as const, title: t.title, subtitle: t.subtitle, imageUrl: t.imageUrl, description: t.description, orderIndex: i })),
    preferences: DEMO_PROFILE.likes.map((l: string, i: number) => ({ id: `l_${i}`, type: 'like' as const, label: l, orderIndex: i })),
    quotes: DEMO_PROFILE.favoriteQuotes.map((q: string, i: number) => ({ id: `q_${i}`, content: q, isFeatured: i === 0, orderIndex: i })),
    socials: [
      { id: 's1', platform: 'instagram' as const, url: 'https://instagram.com' },
      { id: 's2', platform: 'linkedin' as const, url: 'https://linkedin.com' },
      { id: 's3', platform: 'github' as const, url: 'https://github.com' },
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
  };

  // Convert profile data to ProfileHero format
  const heroProfile = {
    id: profile.id,
    username: profile.username,
    name: profile.about.name,
    tagline: profile.about.tagline || '',
    bio: profile.about.bio || '',
    avatarUrl: profile.about.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    coverImageUrl: profile.about.coverImageUrl,
    handwrittenNoteHeader: profile.about.handwrittenHeader,
    handwrittenNoteFooter: profile.about.handwrittenFooter,
    quoteBlock: profile.about.quoteBlock,
    statusPill: profile.about.statusPill || '🌿 Exploring • Learning • Growing',
    location: profile.about.location,
    socials: {
      instagram: profile.socials.find(s => s.platform === 'instagram')?.url,
      youtube: profile.socials.find(s => s.platform === 'youtube')?.url,
      twitter: profile.socials.find(s => s.platform === 'twitter')?.url,
      github: profile.socials.find(s => s.platform === 'github')?.url,
      website: profile.socials.find(s => s.platform === 'website')?.url,
      linkedin: profile.socials.find(s => s.platform === 'linkedin')?.url,
    },
    hobbies: profile.hobbies.map(h => h.name),
    personalityTraits: profile.personality?.traits || [],
    lifestyleBadges: [
      profile.lifestyle?.chronotype,
      profile.lifestyle?.socialEnergy,
    ].filter(Boolean) as string[],
    favoriteQuotes: profile.quotes.map(q => q.content),
    likes: profile.preferences.filter(p => p.type === 'like' || p.type === 'enjoy').map(p => p.label),
    dislikes: profile.preferences.filter(p => p.type === 'dislike' || p.type === 'avoid').map(p => p.label),
    travel: profile.favorites.filter(f => f.category === 'travel').map(f => ({
      id: f.id,
      category: 'travel' as const,
      title: f.title,
      subtitle: f.subtitle,
      imageUrl: f.imageUrl || 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80',
      description: f.description,
    })),
    music: profile.favorites.filter(f => f.category === 'music').map(f => ({
      id: f.id,
      category: 'music' as const,
      title: f.title,
      subtitle: f.subtitle,
      imageUrl: f.imageUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    })),
    movies: profile.favorites.filter(f => f.category === 'movie' || f.category === 'tvshow').map(f => ({
      id: f.id,
      category: 'movie' as const,
      title: f.title,
      subtitle: f.subtitle,
      imageUrl: f.imageUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    })),
    books: profile.favorites.filter(f => f.category === 'book').map(f => ({
      id: f.id,
      category: 'book' as const,
      title: f.title,
      subtitle: f.subtitle,
      imageUrl: f.imageUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    })),
    food: profile.favorites.filter(f => f.category === 'food').map(f => ({
      id: f.id,
      category: 'food' as const,
      title: f.title,
      subtitle: f.subtitle,
      imageUrl: f.imageUrl || 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
    })),
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 sm:space-y-10">
        
        {/* TOP HERO SECTION */}
        <ProfileHero profile={heroProfile} isOwner={isOwner} />

        {/* 3-COLUMN DESKTOP CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">

          {/* TRAVEL DESTINATIONS (Renders ONLY if data exists) */}
          {heroProfile.travel.length > 0 && (
            <div className="lg:col-span-2">
              <CategorySection
                title="Travel Destinations"
                subtitle="Places I've been, and places I dream to go."
                category="travel"
                items={heroProfile.travel}
              />
            </div>
          )}

          {/* HOBBIES & PASSIONS (Renders ONLY if data exists) */}
          {profile.hobbies.length > 0 && (
            <div className="w-full rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-6 shadow-xl shadow-blue-950/5 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Hobbies & Passions</h3>
                  <p className="text-xs font-semibold text-slate-500">What I spend my free hours doing</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-1">
                {profile.hobbies.map((h) => (
                  <div 
                    key={h.id} 
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-sky-50/90 border border-sky-200/80 shadow-2xs hover:scale-105 transition-transform"
                  >
                    <span className="text-base">{h.icon || '🎨'}</span>
                    <span className="text-xs font-bold text-sky-950">{h.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MUSIC (Renders ONLY if data exists) */}
          {heroProfile.music.length > 0 && (
            <CategorySection
              title="My Music"
              subtitle="Songs, artists and vibes that keep me going."
              category="music"
              items={heroProfile.music}
            />
          )}

          {/* MOVIES & SHOWS (Renders ONLY if data exists) */}
          {heroProfile.movies.length > 0 && (
            <CategorySection
              title="Movies & Shows"
              subtitle="Films that inspire and stay with me."
              category="movie"
              items={heroProfile.movies}
            />
          )}

          {/* BOOKS (Renders ONLY if data exists) */}
          {heroProfile.books && heroProfile.books.length > 0 && (
            <CategorySection
              title="Favorite Books"
              subtitle="Stories and ideas that shaped my perspective."
              category="book"
              items={heroProfile.books}
            />
          )}

          {/* FOOD & CULINARY (Renders ONLY if data exists) */}
          {heroProfile.food && heroProfile.food.length > 0 && (
            <CategorySection
              title="Food & Flavors"
              subtitle="Dishes, coffee, and comfort foods I love."
              category="food"
              items={heroProfile.food}
            />
          )}

          {/* PERSONALITY & CORE VALUES (Renders ONLY if data exists) */}
          {profile.personality && (profile.personality.description || profile.personality.traits?.length > 0) && (
            <div className="w-full rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-6 shadow-xl shadow-blue-950/5 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Personality & Values</h3>
                  {profile.personality.personalityType && (
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100 mt-1 inline-block">
                      {profile.personality.personalityType}
                    </span>
                  )}
                </div>
              </div>

              {profile.personality.description && (
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {profile.personality.description}
                </p>
              )}

              {profile.personality.traits && profile.personality.traits.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Core Traits</span>
                  <div className="flex flex-wrap gap-2">
                    {profile.personality.traits.map((t, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-900 border border-indigo-200/70">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* LIFESTYLE & WEEKEND VIBE (Renders ONLY if data exists) */}
          {profile.lifestyle && (profile.lifestyle.chronotype || profile.lifestyle.socialEnergy || profile.lifestyle.freeTimeActivity) && (
            <div className="w-full rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-6 shadow-xl shadow-blue-950/5 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100">
                  <Compass className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">Lifestyle Vibe</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {profile.lifestyle.chronotype && (
                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100/80">
                    <span className="text-[10px] font-extrabold uppercase text-purple-700">Chronotype</span>
                    <p className="text-xs font-bold text-purple-950 mt-0.5">{profile.lifestyle.chronotype}</p>
                  </div>
                )}
                {profile.lifestyle.socialEnergy && (
                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100/80">
                    <span className="text-[10px] font-extrabold uppercase text-purple-700">Social Energy</span>
                    <p className="text-xs font-bold text-purple-950 mt-0.5">{profile.lifestyle.socialEnergy}</p>
                  </div>
                )}
              </div>

              {profile.lifestyle.freeTimeActivity && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase">Free Time Choice</span>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{profile.lifestyle.freeTimeActivity}</p>
                </div>
              )}
            </div>
          )}

          {/* LIKES & SMALL JOYS (Renders ONLY if data exists) */}
          {heroProfile.likes.length > 0 && (
            <PersonalityBadgesSection
              title="Likes & Small Joys"
              iconType="like"
              items={heroProfile.likes}
            />
          )}

          {/* DISLIKES & AVOIDS (Renders ONLY if data exists) */}
          {heroProfile.dislikes.length > 0 && (
            <PersonalityBadgesSection
              title="Dislikes & Avoids"
              iconType="dislike"
              items={heroProfile.dislikes}
            />
          )}

          {/* FAVORITE QUOTES (Renders ONLY if data exists) */}
          {profile.quotes.length > 0 && (
            <FavoriteQuotesCard quotes={profile.quotes.map(q => q.content)} />
          )}

        </div>

        {/* BOTTOM HANDWRITTEN DECOR NOTE */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4 text-center">
          <div className="font-handwriting text-3xl sm:text-4xl text-blue-700/90 tracking-wide select-none">
            {profile.about.handwrittenFooter || 'Everything that makes me, me. ✨'}
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mt-1 opacity-70" />
        </div>

      </div>
    </div>
  );
}
