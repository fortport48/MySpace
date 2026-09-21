'use client';

import React, { useState } from 'react';
import { Camera, Compass, Gamepad2, Sparkles, Music, Film, Utensils, Smile } from 'lucide-react';

type Persona = 'creative' | 'explorer' | 'lowkey';

const PERSONAS = {
  creative: {
    name: 'Maya',
    tagline: 'Visual artist & analogue film enthusiast 📷',
    bio: 'Capturing quiet moments, collecting vinyl records, and drinking black coffee in vintage cafes.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    cover: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=1200&q=80',
    status: '🎨 Painting in the studio',
    tags: ['Photography', 'Art', 'Music', 'Travel'],
    listening: 'Cocteau Twins — Cherry-coloured Funk',
    favorite: '35mm Film Photography',
    vibe: 'Aesthetic & Mindful',
  },
  explorer: {
    name: 'Leo',
    tagline: 'Chasing sunsets, mountain trails & street food 🏕️',
    bio: 'Always planning the next backpacking trip. Lover of spicy ramen, indie films, and outdoor campfires.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    cover: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    status: '🏔️ Trekking the Alps',
    tags: ['Travel', 'Food', 'Adventure', 'Movies'],
    listening: 'Lord Huron — The Night We Met',
    favorite: 'Backpacking in Norway',
    vibe: 'Adventurous & Energetic',
  },
  lowkey: {
    name: 'Sam',
    tagline: 'Cozy gamer, anime binger & lofi lover 🎧',
    bio: 'Building island paradises in Animal Crossing, sipping matcha, and curating late-night playlists.',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    cover: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    status: '🎮 Ranked match in progress',
    tags: ['Gaming', 'Anime', 'Music', 'Memes'],
    listening: 'Lofi Girl — Beats to Relax/Study to',
    favorite: 'Elden Ring / Zelda TOTK',
    vibe: 'Chill & Laidback',
  },
};

export function ProductShowcase() {
  const [activePersona, setActivePersona] = useState<Persona>('creative');

  const current = PERSONAS[activePersona];

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      <div className="text-center space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Interactive Preview</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Your profile should feel like you.
        </h2>
        <p className="text-slate-600 font-medium max-w-xl mx-auto text-sm sm:text-base">
          Choose a vibe below to see how a profile dynamically reflects different personalities.
        </p>

        {/* Tab Buttons */}
        <div className="inline-flex items-center p-1.5 bg-slate-100/90 rounded-full border border-slate-200">
          <button
            onClick={() => setActivePersona('creative')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-2 ${
              activePersona === 'creative'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Creative</span>
          </button>
          <button
            onClick={() => setActivePersona('explorer')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-2 ${
              activePersona === 'explorer'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Explorer</span>
          </button>
          <button
            onClick={() => setActivePersona('lowkey')}
            className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all flex items-center gap-2 ${
              activePersona === 'lowkey'
                ? 'bg-white text-blue-600 shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Lowkey</span>
          </button>
        </div>
      </div>

      {/* Profile Card Showcase Container */}
      <div className="max-w-3xl mx-auto rounded-3xl md:rounded-[2.5rem] bg-white/90 backdrop-blur-xl border border-white/90 shadow-2xl shadow-blue-500/10 overflow-hidden transition-all duration-300">
        
        {/* Banner */}
        <div className="h-32 sm:h-44 relative overflow-hidden">
          <img
            src={current.cover}
            alt={`${current.name} cover`}
            className="w-full h-full object-cover object-center transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content Area */}
        <div className="p-6 sm:p-8 space-y-6 relative z-10 pt-2 sm:pt-4">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <img
              src={current.avatar}
              alt={current.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-white shadow-lg bg-white -mt-16 sm:-mt-20 shrink-0"
            />
            <div className="space-y-1 sm:pt-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{current.name}</h3>
              <p className="text-xs sm:text-sm font-semibold text-blue-600">{current.tagline}</p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-800 text-xs font-bold border border-sky-100 mt-1">
                <span>{current.status}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            {current.bio}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {current.tags.map((tag) => (
              <span key={tag} className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100">
                {tag}
              </span>
            ))}
          </div>

          {/* Highlight Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-pink-600">
                <Music className="w-4 h-4" />
                <span>On Repeat</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{current.listening}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
                <Sparkles className="w-4 h-4" />
                <span>Core Passion</span>
              </div>
              <p className="text-xs font-bold text-slate-900">{current.favorite}</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
