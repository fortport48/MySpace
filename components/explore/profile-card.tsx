'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, Sparkles, Compass, Heart } from 'lucide-react';

export interface ExploreProfileData {
  id: string;
  name: string;
  username: string;
  bio: string;
  tagline?: string;
  avatarUrl: string;
  coverImageUrl?: string;
  location?: string;
  statusPill?: string;
  hobbies: Array<{ id: string; name: string; icon?: string }>;
  interests: Array<{ id: string; title: string; category: string; imageUrl?: string }>;
}

interface ProfileCardProps {
  profile: ExploreProfileData;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Link
      href={`/u/${profile.username}`}
      className="group relative flex flex-col justify-between rounded-3xl bg-white/85 backdrop-blur-xl border border-white/90 p-6 shadow-xl shadow-blue-950/5 hover:shadow-2xl hover:shadow-blue-900/15 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Top Banner Accent */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-600 opacity-80 group-hover:opacity-100 transition-opacity" />

      <div className="space-y-4 pt-1">
        {/* Header Row: Avatar & Basic Info */}
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 border-white shadow-md shadow-blue-900/10 flex-shrink-0 bg-slate-100 group-hover:scale-105 transition-transform duration-300">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                {profile.name}
              </h3>
            </div>
            
            <p className="text-xs font-bold text-blue-600 truncate">
              @{profile.username}
            </p>

            {profile.location && (
              <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mt-1 truncate">
                <MapPin className="w-3 h-3 text-rose-500 flex-shrink-0" />
                <span className="truncate">{profile.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bio / Tagline */}
        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed font-normal">
          {profile.tagline || profile.bio}
        </p>

        {/* Top Hobbies Badges */}
        {profile.hobbies && profile.hobbies.length > 0 && (
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-sky-500" /> Hobbies & Passions
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profile.hobbies.slice(0, 3).map((h) => (
                <span
                  key={h.id}
                  className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-sky-50 text-sky-900 border border-sky-200/70 inline-flex items-center gap-1"
                >
                  <span>{h.icon || '🎨'}</span>
                  <span className="truncate">{h.name}</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Top Interests / Favorite Highlights */}
        {profile.interests && profile.interests.length > 0 && (
          <div className="space-y-1.5 pt-1 border-t border-slate-100">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500" /> Favorite Highlights
            </span>
            <div className="flex flex-wrap gap-1.5">
              {profile.interests.slice(0, 3).map((item) => (
                <span
                  key={item.id}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 truncate max-w-[140px]"
                >
                  {item.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Card Footer Link */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
        <span className="group-hover:underline">View Public Profile</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>

    </Link>
  );
}
