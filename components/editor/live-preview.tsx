'use client';

import React, { useState } from 'react';
import {
  Smartphone, Monitor, ExternalLink, RefreshCw, Search, Menu,
  Instagram, Linkedin, Github, Youtube, Link2, ChevronRight, Plus, Plane, Music, Film
} from 'lucide-react';
import { FullUserProfileData } from '@/lib/types';
import { ProfileHero } from '@/components/profile/profile-hero';
import { CategorySection } from '@/components/profile/category-section';
import { FavoriteQuotesCard } from '@/components/profile/quote-card';

interface LivePreviewProps {
  profile: FullUserProfileData;
  onRefresh?: () => void;
}

export function LivePreview({ profile, onRefresh }: LivePreviewProps) {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  // Convert profile state into ProfileHero compatible object for real-time reactivity
  const heroProfile = {
    id: profile.id,
    username: profile.username,
    name: profile.about.name || 'Alex',
    tagline: profile.about.tagline || 'A curious mind, collecting experiences, stories and good vibes.',
    bio: profile.about.bio || 'Chasing sunsets, indie acoustic tunes, and getting lost in mountains.',
    avatarUrl: profile.about.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    coverImageUrl: profile.about.coverImageUrl,
    handwrittenNoteHeader: profile.about.handwrittenHeader || 'Same Person, More to Explore',
    handwrittenNoteFooter: profile.about.handwrittenFooter || 'Collect Moments Not Things',
    quoteBlock: profile.about.quoteBlock || 'Collecting moments, not things.',
    statusPill: profile.about.statusPill || '🌿 Exploring • Learning • Growing',
    location: profile.about.location,
    socials: {
      instagram: profile.socials.find(s => s.platform === 'instagram')?.url || 'https://instagram.com',
      linkedin: profile.socials.find(s => s.platform === 'linkedin')?.url || 'https://linkedin.com',
      github: profile.socials.find(s => s.platform === 'github')?.url || 'https://github.com',
      youtube: profile.socials.find(s => s.platform === 'youtube')?.url || 'https://youtube.com',
      website: profile.socials.find(s => s.platform === 'website')?.url || 'https://avero.app',
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
      imageUrl: f.imageUrl || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80',
      description: f.description,
    })),
    music: profile.favorites.filter(f => f.category === 'music').map(f => ({
      id: f.id,
      category: 'music' as const,
      title: f.title,
      subtitle: f.subtitle,
      imageUrl: f.imageUrl || 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&w=600&q=80',
    })),
    movies: profile.favorites.filter(f => f.category === 'movie' || f.category === 'tvshow').map(f => ({
      id: f.id,
      category: 'movie' as const,
      title: f.title,
      subtitle: f.subtitle,
      imageUrl: f.imageUrl || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
    })),
  };

  const visibleSections = profile.sectionSettings
    .filter(s => s.isVisible)
    .sort((a, b) => a.orderIndex - b.orderIndex);

  return (
    <div className="w-full h-full bg-slate-100/90 border-l border-slate-200/80 flex flex-col justify-between overflow-hidden">
      
      {/* Top Viewport Switcher Toolbar */}
      <div className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Live Preview
          </span>
        </div>

        {/* Desktop vs Mobile Toggle */}
        <div className="flex items-center p-1 bg-slate-100 rounded-full border border-slate-200">
          <button
            onClick={() => setViewport('desktop')}
            className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 transition-all ${
              viewport === 'desktop' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" /> Desktop
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`px-3 py-1 text-xs font-bold rounded-full flex items-center gap-1.5 transition-all ${
              viewport === 'mobile' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" /> Mobile
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              onClick={onRefresh}
              title="Refresh Preview"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          <a
            href={`/${profile.username}`}
            target="_blank"
            rel="noreferrer"
            title="Open in new tab"
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main Preview Screen Canvas */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-start justify-center bg-mountain-pattern">
        
        {viewport === 'desktop' ? (
          /* DESKTOP VIEWPORT CANVAS */
          <div className="w-full max-w-4xl space-y-6 animate-in fade-in duration-200">
            <ProfileHero profile={heroProfile} />

            <div className="space-y-6">
              {visibleSections.map(sec => {
                const key = sec.sectionKey;
                if (key === 'personality' && profile.personality) {
                  return (
                    <div key={key} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm space-y-3">
                      <h4 className="text-lg font-extrabold text-slate-900">Personality & Vibe</h4>
                      {profile.personality.description && (
                        <p className="text-xs text-slate-600 font-medium">{profile.personality.description}</p>
                      )}
                      {profile.personality.traits.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {profile.personality.traits.map((t, idx) => (
                            <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-800 text-xs font-bold rounded-full border border-indigo-100">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (key === 'hobbies' && profile.hobbies.length > 0) {
                  return (
                    <div key={key} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm space-y-3">
                      <h4 className="text-lg font-extrabold text-slate-900">Hobbies</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.hobbies.map(h => (
                          <div key={h.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-50 text-sky-900 text-xs font-bold border border-sky-200">
                            <span>{h.icon || '🎨'}</span>
                            <span>{h.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (key === 'favorites' && heroProfile.travel.length > 0) {
                  return (
                    <div key={key} className="space-y-6">
                      {heroProfile.travel.length > 0 && (
                        <CategorySection title="Travel" category="travel" items={heroProfile.travel} addLabel="Add Trip" />
                      )}
                      {heroProfile.music.length > 0 && (
                        <CategorySection title="My Music" category="music" items={heroProfile.music} addLabel="Add Music" />
                      )}
                      {heroProfile.movies.length > 0 && (
                        <CategorySection title="My Movies" category="movie" items={heroProfile.movies} addLabel="Add Movie" />
                      )}
                    </div>
                  );
                }

                if (key === 'preferences' && profile.preferences.length > 0) {
                  return (
                    <div key={key} className="p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm space-y-3">
                      <h4 className="text-lg font-extrabold text-slate-900">Likes & Dislikes</h4>
                      <div className="flex flex-wrap gap-2">
                        {profile.preferences.map(p => (
                          <span key={p.id} className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-full border border-slate-200">
                            {p.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (key === 'quotes' && profile.quotes.length > 0) {
                  return (
                    <FavoriteQuotesCard key={key} quotes={profile.quotes.map(q => q.content)} />
                  );
                }

                return null;
              })}
            </div>
          </div>
        ) : (
          /* MOBILE VIEWPORT CANVAS (Strictly matching reference screenshot) */
          <div className="w-[375px] my-2 rounded-[2.75rem] border-[8px] border-slate-900 bg-[#EBF3FC] shadow-2xl overflow-hidden relative transition-all">
            
            {/* iPhone Top Status Bar */}
            <div className="bg-[#EBF3FC] pt-3 px-6 pb-2 flex items-center justify-between text-xs font-extrabold text-slate-800 select-none">
              <span>9:41</span>
              <div className="w-16 h-4 bg-slate-900 rounded-full" />
              <div className="flex items-center gap-1.5 text-[10px]">
                <span>5G</span>
                <span>100</span>
              </div>
            </div>

            {/* Mobile Header matching screenshot */}
            <div className="px-5 py-3 flex items-center justify-between bg-transparent">
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  My<span className="text-blue-600">Space</span>
                </span>
                <span className="text-[10px] font-medium text-slate-500 mt-0.5">
                  More than just a profile
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-700">
                <Search className="w-5 h-5" />
                <Menu className="w-5 h-5" />
              </div>
            </div>

            {/* Mobile Content Area */}
            <div className="px-4 pb-6 space-y-5 max-h-[660px] overflow-y-auto scrollbar-none">
              
              {/* Hero Profile Card */}
              <ProfileHero profile={heroProfile} />

              {/* Dynamic Visible Sections */}
              {visibleSections.map(sec => {
                const key = sec.sectionKey;

                if (key === 'favorites') {
                  return (
                    <div key={key} className="space-y-4">
                      {heroProfile.travel.length > 0 && (
                        <CategorySection
                          title="Travel"
                          subtitle="Places I've been, and places I dream to go."
                          category="travel"
                          items={heroProfile.travel}
                          addLabel="Add Trip"
                        />
                      )}

                      {heroProfile.music.length > 0 && (
                        <CategorySection
                          title="My Music"
                          subtitle="Songs, artists and vibes that keep me going."
                          category="music"
                          items={heroProfile.music}
                          addLabel="Add Music"
                        />
                      )}

                      {heroProfile.movies.length > 0 && (
                        <CategorySection
                          title="My Movies"
                          subtitle="Films that inspire, amaze and stay with me."
                          category="movie"
                          items={heroProfile.movies}
                          addLabel="Add Movie"
                        />
                      )}
                    </div>
                  );
                }

                if (key === 'hobbies' && profile.hobbies.length > 0) {
                  return (
                    <div key={key} className="p-4 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm space-y-2">
                      <span className="text-xs font-bold text-slate-900">Hobbies</span>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.hobbies.map(h => (
                          <span key={h.id} className="px-3 py-1 bg-sky-50 text-sky-900 text-xs font-bold rounded-full border border-sky-100">
                            {h.icon || '🎨'} {h.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                }

                if (key === 'quotes' && profile.quotes.length > 0) {
                  return (
                    <FavoriteQuotesCard key={key} quotes={profile.quotes.map(q => q.content)} />
                  );
                }

                return null;
              })}

              {/* Bottom Handwritten Footer Note (Matching uploaded screenshot) */}
              <div className="pt-4 pb-2 text-center select-none">
                <div className="font-handwriting text-2xl text-blue-700 font-bold">
                  {heroProfile.handwrittenNoteFooter}
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full mx-auto mt-1" />
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
