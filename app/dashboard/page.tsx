'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { DEMO_PROFILE } from '@/lib/mock-data';
import { Sparkles, Eye, Share2, Copy, Check, Edit3, Settings, Music, ExternalLink, ArrowRight } from 'lucide-react';

export default function DashboardPage() {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);

  const currentUser = session?.user as any;
  const username = currentUser?.username || DEMO_PROFILE.username;
  const displayName = currentUser?.name || DEMO_PROFILE.name;
  const avatarUrl = currentUser?.profileImage || currentUser?.image || DEMO_PROFILE.avatarUrl;

  const profileUrl = `avero.app/u/${username}`;

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${profileUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-xl shadow-blue-500/5">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-blue-500/20"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Welcome back, {displayName}! 👋
              </h1>
            </div>
            <p className="text-sm text-slate-500 font-medium">
              Manage your personal profile, update your favorite media, and check insights.
            </p>
          </div>
        </div>

        {/* Share Profile Link Box */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <button
            onClick={copyLink}
            className="w-full sm:w-auto px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-full border border-slate-200 flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Link Copied!' : profileUrl}</span>
          </button>
          
          <Link
            href={`/u/${username}`}
            className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
          >
            View Public Profile <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Profile Views</span>
            <Eye className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">1,420</div>
          <p className="text-xs text-emerald-600 font-semibold">+18% this month</p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Shares & Clicks</span>
            <Share2 className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">84</div>
          <p className="text-xs text-slate-500 font-medium">Across social links</p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Curated Items</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900">28</div>
          <p className="text-xs text-slate-500 font-medium">Trips, songs, movies & books</p>
        </div>

        <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
            <span>Profile Strength</span>
            <span className="text-xs font-bold text-blue-600">92%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden mt-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full w-[92%]" />
          </div>
          <p className="text-xs text-slate-500 font-medium">Add 1 more quote to reach 100%</p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Edit Profile Basics */}
        <Link
          href="/dashboard/edit"
          className="group p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Edit3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
              Edit Basic Info & Bio
            </h3>
            <p className="text-sm text-slate-600">
              Update your photo, bio tagline, handwritten script notes, and social media handles.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
            <span>Launch Editor</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 2: Manage Categories */}
        <Link
          href="/dashboard/edit?tab=media"
          className="group p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
              Manage Music & Media
            </h3>
            <p className="text-sm text-slate-600">
              Add new travel trips, songs, movie recommendations, favorite books, and food spots.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-600">
            <span>Manage Media</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Card 3: Account & Theme Settings */}
        <Link
          href="/dashboard/settings"
          className="group p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-white/90 shadow-sm hover:shadow-xl transition-all duration-300 space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Settings & Privacy
            </h3>
            <p className="text-sm text-slate-600">
              Customize theme colors, manage public visibility, and configure custom handle.
            </p>
          </div>
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
            <span>Open Settings</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

      </div>

    </div>
  );
}
