'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Play, CheckCircle2, User, Palette, Link as LinkIcon, Lock, 
  Sparkles, Instagram, Linkedin, Github, Youtube, Globe, Heart, Music, Film, Compass, MapPin
} from 'lucide-react';

export function LandingHero() {
  return (
    <div className="relative w-full overflow-hidden bg-slate-50">
      
      {/* BACKGROUND SCENIC MOUNTAIN BACKDROP WITH SKY BLEND */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Real Mountain Background Image */}
        <img
          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
          alt="Mountain peaks landscape background"
          className="w-full h-[780px] object-cover object-top opacity-35 filter brightness-105 contrast-95"
        />
        {/* Soft Sky Gradient Overlays for perfect legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-slate-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-50/90 via-transparent to-sky-50/90" />
      </div>

      {/* SECTION 1: HERO CONTAINER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 lg:pb-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT COLUMN: Main Copy & Calls to Action (5 Columns) */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left z-10">
            
            {/* Small Uppercase Tagline */}
            <p className="text-xs sm:text-sm font-extrabold text-slate-500 uppercase tracking-[0.25em]">
              SAME PEOPLE. DIFFERENT STORIES.
            </p>

            {/* Main Bold Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.02]">
                More Than
              </h1>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-tight leading-[1.02]">
                a Profile
              </h1>
            </div>

            {/* Subtitle Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
              Show your hobbies, interests, memories and everything that makes you, you.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/signup"
                className="px-7 py-3.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 text-white font-bold text-sm sm:text-base rounded-full shadow-lg shadow-indigo-500/25 hover:shadow-xl transition-all flex items-center gap-2 group"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <a
                href="#demo"
                className="px-6 py-3.5 bg-white/90 hover:bg-white border border-purple-200/80 text-purple-900 font-bold text-sm sm:text-base rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-purple-700 translate-x-0.5" />
                </div>
                <span>See Demo</span>
              </a>
            </div>

            {/* Key Platform Stats */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 pt-6 border-t border-slate-200/60 max-w-md mx-auto lg:mx-0 text-center">
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">10K+</div>
                <div className="text-[11px] font-bold text-slate-400">Users</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">50+</div>
                <div className="text-[11px] font-bold text-slate-400">Interests</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">100+</div>
                <div className="text-[11px] font-bold text-slate-400">Themes</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">∞</div>
                <div className="text-[11px] font-bold text-slate-400">Possibilities</div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D Dual Device Showcase (Phone + Laptop) (7 Columns) */}
          <div className="lg:col-span-7 relative flex items-center justify-center pt-6 lg:pt-0">
            
            {/* Handwritten Script Annotation top center */}
            <div className="absolute -top-4 sm:-top-8 left-6 sm:left-12 z-30 pointer-events-none select-none hidden sm:block">
              <span className="font-handwriting text-3xl sm:text-4xl text-blue-700 font-normal -rotate-6 block drop-shadow-xs">
                Collect Moments <br />
                <span className="pl-4">Not Things</span>
              </span>
              <svg className="w-24 h-4 text-blue-600 ml-4 -mt-1 opacity-80" viewBox="0 0 100 20" fill="none">
                <path d="M5 12 Q 50 2, 95 14" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Laptop Annotation top right */}
            <div className="absolute top-4 right-2 sm:right-6 z-30 pointer-events-none select-none hidden lg:block">
              <span className="font-handwriting text-2xl text-slate-700 font-semibold -rotate-3 block">
                Good People <br /> Better Stories
              </span>
              <svg className="w-20 h-4 text-slate-600 ml-2 opacity-70" viewBox="0 0 100 20" fill="none">
                <path d="M5 14 Q 50 4, 95 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            {/* Bottom Right Handwritten Callout */}
            <div className="absolute -bottom-6 right-4 sm:right-10 z-30 pointer-events-none select-none hidden sm:block">
              <span className="font-handwriting text-3xl text-slate-900 font-bold rotate-3 block">
                Your World <br /> Your Way
              </span>
            </div>

            {/* DUAL DEVICE CONTAINER */}
            <div className="relative w-full max-w-2xl flex items-center justify-center">
              
              {/* BACK DEVICE: LAPTOP FRAME (MacBook style preview) */}
              <div className="w-[88%] sm:w-[90%] rounded-2xl sm:rounded-3xl bg-slate-900 border-4 sm:border-8 border-slate-800 shadow-2xl shadow-blue-950/20 overflow-hidden transform lg:translate-x-10 translate-y-2">
                
                {/* Laptop Top Browser Bar */}
                <div className="h-6 sm:h-8 bg-slate-800 px-3 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                  </div>
                  <div className="px-4 py-0.5 bg-slate-900 rounded-full text-[10px] text-slate-400 font-mono max-w-[200px] truncate">
                    myspace.com/u/alex
                  </div>
                  <div className="w-4" />
                </div>

                {/* Laptop Screen Content (Desktop Public Profile Preview) */}
                <div className="bg-slate-50 p-3 sm:p-4 text-left space-y-3 font-sans text-slate-900 min-h-[300px] sm:min-h-[380px]">
                  
                  {/* Banner & Hero Header inside Laptop */}
                  <div className="relative rounded-2xl h-24 sm:h-32 bg-slate-900 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>

                  {/* Laptop Profile Info Card */}
                  <div className="flex items-end gap-3 -mt-10 sm:-mt-12 px-2 relative z-10">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                      alt="Alex"
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base sm:text-lg font-black text-slate-900">Alex</h3>
                        <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                      </div>
                      <p className="text-[10px] sm:text-xs text-slate-600 font-medium line-clamp-1">
                        A curious mind, collecting experiences, stories and good vibes.
                      </p>
                      <div className="flex items-center gap-1.5 text-[9px] text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-full inline-block">
                        🌿 Exploring • Learning • Growing
                      </div>
                    </div>
                  </div>

                  {/* Categories Row Preview inside Laptop */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {/* Travel */}
                    <div className="p-2 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-800">
                        <span>✈️ Travel</span>
                        <span className="text-[8px] text-blue-600">See all &gt;</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=150&q=80" className="h-10 rounded-lg object-cover w-full" alt="Manali" />
                        <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80" className="h-10 rounded-lg object-cover w-full" alt="Goa" />
                        <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=150&q=80" className="h-10 rounded-lg object-cover w-full" alt="Rishikesh" />
                      </div>
                    </div>

                    {/* Music */}
                    <div className="p-2 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-800">
                        <span>🎵 My Music</span>
                        <span className="text-[8px] text-blue-600">See all &gt;</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80" className="h-10 rounded-lg object-cover w-full" alt="Album" />
                        <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=150&q=80" className="h-10 rounded-lg object-cover w-full" alt="Album" />
                        <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&q=80" className="h-10 rounded-lg object-cover w-full" alt="Album" />
                      </div>
                    </div>

                    {/* Movies */}
                    <div className="p-2 bg-white rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-800">
                        <span>🎬 My Movies</span>
                        <span className="text-[8px] text-blue-600">See all &gt;</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <img src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=150&q=80" className="h-10 rounded-lg object-cover w-full" alt="Movie" />
                        <img src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=150&q=80" className="h-10 rounded-lg object-cover w-full" alt="Movie" />
                        <img src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=150&q=80" className="h-10 rounded-lg object-cover w-full" alt="Movie" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* FRONT DEVICE: SMARTPHONE FRAME (Ultra-thin Bezel Mobile Profile Preview) */}
              <div className="absolute -left-2 sm:-left-6 top-4 sm:top-6 w-[235px] sm:w-[275px] rounded-[2.8rem] bg-slate-950 p-1 sm:p-1.5 border border-slate-800 shadow-2xl shadow-indigo-950/50 z-20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                
                {/* Dynamic Island Notch */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-30 flex items-center justify-between px-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                  <span className="w-2 h-2 rounded-full bg-blue-900/80" />
                </div>

                {/* Mobile Phone Screen (Edge-to-Edge display) */}
                <div className="bg-white rounded-[2.4rem] overflow-hidden text-left space-y-2.5 p-3 pt-6 shadow-inner text-slate-900">
                  
                  {/* Phone Header App Bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1.5">
                    <span className="text-xs font-black text-purple-700">MySpace</span>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="text-[10px]">🔍</span>
                      <span className="text-[10px]">☰</span>
                    </div>
                  </div>

                  {/* Mobile Cover Banner & Avatar */}
                  <div className="relative rounded-xl h-20 bg-slate-800 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80"
                      alt="Mobile Cover"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Profile Avatar & Details */}
                  <div className="-mt-8 relative z-10 space-y-1">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      alt="Mobile Alex"
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md bg-white"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-sm font-black text-slate-900">Alex</h4>
                        <span className="text-[10px] text-blue-600">✓</span>
                      </div>
                      <p className="text-[9px] text-slate-500 font-medium leading-tight line-clamp-2">
                        A curious mind, collecting experiences, stories and good vibes.
                      </p>
                    </div>

                    {/* Social Icons row */}
                    <div className="flex items-center gap-1 pt-0.5">
                      <span className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[9px]">📸</span>
                      <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px]">💼</span>
                      <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px]">💻</span>
                      <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[9px]">▶</span>
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[9px]">🔗</span>
                    </div>

                    <div className="text-[8px] font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-full inline-block">
                      🌿 Exploring • Learning • Growing
                    </div>
                  </div>

                  {/* Mobile Cards: Travel */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[9px] font-extrabold text-slate-800">
                      <span>✈️ Travel</span>
                      <span className="text-blue-600 text-[8px]">See all &gt;</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=120&q=80" className="h-10 rounded-lg object-cover w-full" alt="Manali" />
                      <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=120&q=80" className="h-10 rounded-lg object-cover w-full" alt="Goa" />
                      <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=120&q=80" className="h-10 rounded-lg object-cover w-full" alt="Rishikesh" />
                    </div>
                  </div>

                  {/* Mobile Cards: Music */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[9px] font-extrabold text-slate-800">
                      <span>🎵 My Music</span>
                      <span className="text-blue-600 text-[8px]">See all &gt;</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=120&q=80" className="h-9 rounded-lg object-cover w-full" alt="The Weeknd" />
                      <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=120&q=80" className="h-9 rounded-lg object-cover w-full" alt="Arctic Monkeys" />
                      <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=120&q=80" className="h-9 rounded-lg object-cover w-full" alt="Chill Vibes" />
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SECTION 2: FLOATING FEATURE HIGHLIGHTS BAR (Below Hero) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="w-full bg-white/90 backdrop-blur-xl border border-sky-100 shadow-xl shadow-blue-950/5 rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-center">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex-shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-extrabold text-slate-900">Show Yourself</h4>
                <p className="text-xs text-slate-500 leading-snug">Add your interests, hobbies, favorites and more.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100 flex-shrink-0">
                <Palette className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-extrabold text-slate-900">Customize Freely</h4>
                <p className="text-xs text-slate-500 leading-snug">Make it yours with themes, layouts and colors.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 flex-shrink-0">
                <LinkIcon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-extrabold text-slate-900">One Link For Everything</h4>
                <p className="text-xs text-slate-500 leading-snug">Share your world with a single link.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 flex-shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-sm font-extrabold text-slate-900">Your Privacy Control</h4>
                <p className="text-xs text-slate-500 leading-snug">Choose what to show and who can see it.</p>
              </div>
            </div>

            {/* Right Side Video Action */}
            <div className="lg:border-l lg:border-slate-100 lg:pl-6 flex flex-col items-center sm:items-start justify-center space-y-2">
              <span className="font-handwriting text-2xl text-purple-700 font-bold -rotate-2 select-none">
                Be You. <br />
                Share Your World.
              </span>
              <button
                type="button"
                className="px-4 py-2 bg-slate-900 hover:bg-black text-white rounded-full text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95"
              >
                <div className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center">
                  <Play className="w-2.5 h-2.5 fill-white translate-x-0.5" />
                </div>
                <span>Watch Video (1 min)</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: DARK EXPLORE COMMUNITY BANNER (Bottom of reference image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="w-full bg-slate-900 text-white rounded-[2rem] p-6 sm:p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="space-y-2 max-w-xl text-center md:text-left z-10">
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Explore Real People, Real Interests
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
              From travel and movies to fitness, tech, art and more — discover how people express themselves.
            </p>
          </div>

          {/* Right Avatar Stack & Join Community */}
          <div className="flex items-center gap-4 z-10">
            {/* Overlapping Avatar Stack */}
            <div className="flex -space-x-3 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" alt="User" className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80" alt="User" className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" />
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" alt="User" className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" />
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80" alt="User" className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-900 object-cover" />
            </div>

            <p className="text-xs text-slate-300 font-semibold max-w-[180px] leading-tight">
              Join a growing community of creators, dreamers and explorers.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
