'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Loader2, AlertCircle } from 'lucide-react';
import { FullUserProfileData } from '@/lib/types';
import { BuilderLayout } from '@/components/editor/builder-layout';
import { DEMO_PROFILE } from '@/lib/mock-data';

export default function ProfileEditorPage() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<FullUserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch('/api/profile');
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else {
          // Default initial profile structure for builder
          setProfile({
            id: 'user_default',
            username: (session?.user as any)?.username || 'user',
            about: {
              name: session?.user?.name || DEMO_PROFILE.name,
              username: (session?.user as any)?.username || DEMO_PROFILE.username,
              tagline: DEMO_PROFILE.tagline,
              bio: DEMO_PROFILE.bio,
              location: DEMO_PROFILE.location,
              profileImage: session?.user?.image || DEMO_PROFILE.avatarUrl,
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
            hobbies: DEMO_PROFILE.hobbies.map((h, i) => ({ id: `h_${i}`, name: h, icon: '🏔️', orderIndex: i })),
            favorites: DEMO_PROFILE.travel.map((t, i) => ({ id: t.id, category: 'travel' as const, title: t.title, subtitle: t.subtitle, imageUrl: t.imageUrl, description: t.description, orderIndex: i })),
            preferences: DEMO_PROFILE.likes.map((l, i) => ({ id: `l_${i}`, type: 'like' as const, label: l, orderIndex: i })),
            quotes: DEMO_PROFILE.favoriteQuotes.map((q, i) => ({ id: `q_${i}`, content: q, isFeatured: i === 0, orderIndex: i })),
            socials: [
              { id: 's1', platform: 'instagram' as const, url: 'https://instagram.com' },
              { id: 's2', platform: 'github' as const, url: 'https://github.com' },
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
      } catch (err) {
        console.error('Fetch profile error:', err);
      } finally {
        setLoading(false);
      }
    }

    if (status === 'authenticated') {
      fetchProfile();
    } else if (status === 'unauthenticated') {
      setLoading(false);
    }
  }, [status, session]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-sm font-extrabold text-slate-700">Opening Profile Studio...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl text-center space-y-4 shadow-xl border border-slate-100">
        <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900">Please Log In</h2>
        <p className="text-sm text-slate-500">You must be logged in to access the profile builder studio.</p>
        <Link href="/login" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-bold text-xs rounded-full">
          Go to Log In
        </Link>
      </div>
    );
  }

  return <BuilderLayout initialProfile={profile} />;
}
