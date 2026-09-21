'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { UserProfile } from '@/lib/types';
import { 
  Link2, Instagram, Linkedin, Github, Youtube, Twitter, MapPin, 
  Share2, UserPlus, UserCheck, QrCode, Flag, ShieldAlert, Image as ImageIcon, Sparkles, Edit3 
} from 'lucide-react';
import { ShareModal } from '@/components/profile/share-modal';
import { ReportModal } from '@/components/profile/report-modal';
import { BlockModal } from '@/components/profile/block-modal';
import { ChangeBackgroundModal } from '@/components/profile/change-background-modal';

interface ProfileHeroProps {
  profile: UserProfile;
  isOwner?: boolean;
}

export function ProfileHero({ profile, isOwner = false }: ProfileHeroProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isBgModalOpen, setIsBgModalOpen] = useState(false);
  const [currentCover, setCurrentCover] = useState(
    profile.coverImageUrl || 
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80'
  );

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  // Filter social links so ONLY populated links are displayed
  const populatedSocials = Object.entries(profile.socials || {}).filter(
    ([_, url]) => url && url.trim().length > 0
  );

  return (
    <>
      <div className="relative w-full rounded-[2rem] sm:rounded-[2.5rem] bg-white/80 backdrop-blur-xl border border-white/90 shadow-2xl shadow-blue-950/10 overflow-hidden transition-all">
        
        {/* Customizable Background Banner */}
        <div className="relative w-full h-48 sm:h-60 md:h-72 bg-slate-900 overflow-hidden">
          <img
            src={currentCover}
            alt={`${profile.name}'s profile background`}
            className="w-full h-full object-cover object-center transition-all duration-500 scale-[1.01]"
          />

          {/* Adaptive Gradient Overlay for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-black/20" />
          
          {/* Top Toolbar (Owner vs Visitor Controls) */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
            {isOwner ? (
              <>
                <button
                  onClick={() => setIsBgModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white text-xs font-bold shadow-lg backdrop-blur-md border border-white/20 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
                  <span>Change Background</span>
                </button>
                <Link
                  href="/dashboard/edit"
                  className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-lg backdrop-blur-md border border-blue-400/30 flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white text-slate-800 text-xs font-bold shadow-md backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105"
                >
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-md transition-all hover:scale-105"
                  title="View Profile QR Code"
                >
                  <QrCode className="w-4 h-4 text-slate-700" />
                </button>
                <button
                  onClick={() => setIsReportOpen(true)}
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-md transition-all hover:scale-105"
                  title="Report Profile"
                >
                  <Flag className="w-4 h-4 text-rose-500" />
                </button>
                <button
                  onClick={() => setIsBlockOpen(true)}
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-md transition-all hover:scale-105"
                  title="Block Profile"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-600" />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Horizontal Content Grid Section */}
        <div className="relative z-10 px-6 sm:px-8 lg:px-10 pb-8 pt-0">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* LEFT COLUMN: Large Circular Profile Photo */}
            <div className="lg:col-span-3 relative flex flex-col items-center lg:items-start -mt-20 sm:-mt-24 z-20 group">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl shadow-blue-900/20 border-4 border-white transition-transform duration-300 group-hover:scale-[1.02] bg-slate-100">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Handwritten Note Badge */}
              {profile.handwrittenNoteHeader && (
                <div className="mt-3 bg-white/95 backdrop-blur-md px-4 py-1 rounded-full border border-blue-100 shadow-md text-blue-700 font-handwriting text-xl sm:text-2xl -rotate-2 select-none pointer-events-none whitespace-nowrap">
                  {profile.handwrittenNoteHeader}
                </div>
              )}
            </div>

            {/* CENTER COLUMN: Bio, Social Links, Personality Strip */}
            <div className="lg:col-span-6 flex flex-col space-y-4 text-center lg:text-left pt-2 sm:pt-4">
              
              {/* Name, Handle, Location & Follow Action */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    {profile.name}
                  </h1>
                  <span className="text-xs sm:text-sm font-extrabold text-blue-600 bg-blue-50/90 px-3 py-1 rounded-full border border-blue-100">
                    @{profile.username}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  {profile.location && (
                    <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-500">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      <span>{profile.location}</span>
                    </div>
                  )}

                  {!isOwner && (
                    <button
                      onClick={toggleFollow}
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full font-bold text-xs transition-all duration-200 shadow-sm active:scale-95 ${
                        isFollowing
                          ? 'bg-slate-100 text-slate-800 border border-slate-300 hover:bg-slate-200'
                          : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95 shadow-blue-500/20'
                      }`}
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Following</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Follow</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Tagline & Bio */}
              {profile.tagline && (
                <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
                  "{profile.tagline}"
                </p>
              )}

              {profile.bio && (
                <p className="text-sm text-slate-600 leading-relaxed max-w-xl font-normal">
                  {profile.bio}
                </p>
              )}

              {/* Social Links Row (Populated Platforms Only) */}
              {populatedSocials.length > 0 && (
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                  {profile.socials.instagram && (
                    <a
                      href={profile.socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socials.twitter && (
                    <a
                      href={profile.socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Twitter / X"
                      className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socials.linkedin && (
                    <a
                      href={profile.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socials.github && (
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="GitHub"
                      className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socials.youtube && (
                    <a
                      href={profile.socials.youtube}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="YouTube"
                      className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                  {profile.socials.website && (
                    <a
                      href={profile.socials.website}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Website"
                      className="w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-blue-600 border border-slate-200 flex items-center justify-center shadow-sm hover:scale-110 hover:shadow-md transition-all"
                    >
                      <Link2 className="w-4 h-4" />
                    </a>
                  )}
                </div>
              )}

              {/* Status & Personality Strip */}
              {profile.statusPill && (
                <div className="pt-1 flex justify-center lg:justify-start">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-900 text-xs sm:text-sm font-bold shadow-2xs">
                    <span>{profile.statusPill}</span>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Featured Quote Block Widget */}
            <div className="lg:col-span-3 flex items-center justify-center lg:justify-end pt-2 lg:pt-6">
              {profile.quoteBlock ? (
                <div className="w-full p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50 backdrop-blur-md border border-blue-100 shadow-sm relative space-y-2">
                  <span className="text-4xl text-blue-400 font-serif leading-none opacity-60">“</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700 italic leading-relaxed">
                    {profile.quoteBlock}
                  </p>
                  <div className="flex items-center justify-between pt-1 border-t border-blue-100/60 text-[10px] font-bold text-blue-600">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" /> Favorite Thought
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full p-4 rounded-2xl bg-slate-50/80 border border-dashed border-slate-200 text-center">
                  <span className="text-xs font-semibold text-slate-400">
                    "Collecting moments, not things."
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Change Background Modal (Owner Only) */}
      {isOwner && (
        <ChangeBackgroundModal
          isOpen={isBgModalOpen}
          onClose={() => setIsBgModalOpen(false)}
          currentCoverUrl={currentCover}
          userName={profile.name}
          onCoverUpdated={(newUrl) => setCurrentCover(newUrl)}
        />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        username={profile.username}
        name={profile.name}
      />

      {/* Report Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        username={profile.username}
      />

      {/* Block Modal */}
      <BlockModal
        isOpen={isBlockOpen}
        onClose={() => setIsBlockOpen(false)}
        username={profile.username}
      />
    </>
  );
}
