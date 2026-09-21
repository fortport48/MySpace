'use client';

import React from 'react';
import { Smartphone, Monitor } from 'lucide-react';

export function DevicePreview() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 inline-block">
          Cross-Platform
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Looks good wherever people find you.
        </h2>
        <p className="text-slate-600 font-medium max-w-xl mx-auto text-sm sm:text-base">
          Engineered to look like a sleek mobile profile on phones and a spacious personal webpage on desktop screens.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
        
        {/* Desktop View Window */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Monitor className="w-4 h-4 text-purple-600" />
            <span>Desktop Experience</span>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden space-y-4">
            {/* Browser Header Bar */}
            <div className="h-9 bg-slate-100 border-b border-slate-200 px-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="ml-4 px-3 py-0.5 bg-white rounded-md text-[10px] font-mono text-slate-500 border border-slate-200 w-48 truncate">
                myspace.com/u/alex
              </div>
            </div>

            {/* Desktop Mock Content */}
            <div className="p-6 space-y-4">
              <div className="h-28 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-4 text-white flex items-end">
                <div>
                  <h4 className="text-xl font-extrabold">Alex</h4>
                  <p className="text-xs text-purple-100">@alex · Manali & Kyoto</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-pink-600">🎵 Music</span>
                  <p className="text-xs font-semibold text-slate-800">The Weeknd · Arctic Monkeys</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600">🎬 Movies</span>
                  <p className="text-xs font-semibold text-slate-800">Interstellar · Dark Knight</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-indigo-600">✈️ Travel</span>
                  <p className="text-xs font-semibold text-slate-800">Manali · Goa · Rishikesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View Window (Ultra-thin Bezel) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
            <Smartphone className="w-4 h-4 text-purple-600" />
            <span>Mobile Profile</span>
          </div>

          <div className="rounded-[2.4rem] bg-slate-950 p-1 sm:p-1.5 shadow-xl border border-slate-800 relative">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-30 flex items-center justify-between px-1.5">
              <span className="w-1 h-1 rounded-full bg-slate-800" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-900" />
            </div>

            <div className="bg-white rounded-[2rem] p-4 pt-6 space-y-3">
              <div className="flex items-center gap-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Alex"
                  className="w-10 h-10 rounded-full object-cover border border-white shadow-xs"
                />
                <div>
                  <p className="text-xs font-extrabold text-slate-900">Alex</p>
                  <p className="text-[9px] text-slate-500 font-medium">myspace.com/u/alex</p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-xl text-[10px] font-medium text-slate-700 border border-slate-100">
                🌿 Exploring • Learning • Growing
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="p-2 bg-purple-50 rounded-lg font-bold text-purple-900">✈️ Travel Cards</div>
                <div className="p-2 bg-indigo-50 rounded-lg font-bold text-indigo-900">🎵 My Music</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
}
