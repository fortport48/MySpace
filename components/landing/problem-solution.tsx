'use client';

import React from 'react';
import { Instagram, Music, Film, Image, MessageSquare, Check, Sparkles } from 'lucide-react';

export function ProblemSolution() {
  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        {/* LEFT — WITHOUT THE APP */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200">
              Without Avero
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Your personality is scattered.
            </h3>
            
            {/* Scattered Cards Representation */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-purple-600 text-white">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Instagram</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">Photos & Stories</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500 text-white">
                    <Music className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Spotify</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">Music & Playlists</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-amber-500 text-white">
                    <Film className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Letterboxd</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">Movie Reviews</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-rose-500 text-white">
                    <Image className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">Pinterest</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">Interests & Vibes</span>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-emerald-600 text-white">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">WhatsApp</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">Random updates</span>
              </div>
            </div>
          </div>

          <p className="text-sm font-extrabold text-slate-600 italic border-t border-slate-200 pt-4">
            Too many places. Nothing feels like the whole you.
          </p>
        </div>

        {/* RIGHT — WITH THE APP */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-600 text-white flex flex-col justify-between space-y-6 shadow-xl shadow-blue-500/20">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              With Avero
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold">
              Everything that makes you, you.
            </h3>

            {/* Unified Card Mockup */}
            <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-sky-200 uppercase tracking-wider">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>One Unified Personal Identity</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <div className="p-2.5 bg-white/10 rounded-xl">✨ About Me</div>
                <div className="p-2.5 bg-white/10 rounded-xl">🎨 Hobbies</div>
                <div className="p-2.5 bg-white/10 rounded-xl">🌟 Interests</div>
                <div className="p-2.5 bg-white/10 rounded-xl">🍕 Favorites</div>
                <div className="p-2.5 bg-white/10 rounded-xl">🎧 Music</div>
                <div className="p-2.5 bg-white/10 rounded-xl">🎬 Movies</div>
                <div className="p-2.5 col-span-2 bg-white/10 rounded-xl">🔗 All Social Links</div>
              </div>
            </div>
          </div>

          <p className="text-sm font-extrabold text-blue-100 italic border-t border-white/20 pt-4">
            One profile. One link. Your personality.
          </p>
        </div>

      </div>

    </section>
  );
}
