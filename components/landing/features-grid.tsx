'use client';

import React from 'react';
import { User, Heart, Star, Share2, Layers, Link as LinkIcon } from 'lucide-react';

const FEATURES = [
  {
    icon: User,
    color: 'bg-blue-50 text-blue-600 border-blue-100',
    title: 'Personal Profile',
    description: 'One beautiful page that represents you.',
  },
  {
    icon: Heart,
    color: 'bg-pink-50 text-pink-600 border-pink-100',
    title: 'Hobbies & Interests',
    description: 'Share what you enjoy and care about.',
  },
  {
    icon: Star,
    color: 'bg-amber-50 text-amber-600 border-amber-100',
    title: 'Favorites',
    description: 'Music, movies, books, food, places and more.',
  },
  {
    icon: Share2,
    color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    title: 'Social Links',
    description: 'Connect the places where people can find you.',
  },
  {
    icon: Layers,
    color: 'bg-purple-50 text-purple-600 border-purple-100',
    title: 'Custom Sections',
    description: 'Add the things that make your profile unique.',
  },
  {
    icon: LinkIcon,
    color: 'bg-sky-50 text-sky-600 border-sky-100',
    title: 'One Shareable Link',
    description: 'Share your entire profile anywhere.',
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Core Features</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Everything you need to express yourself.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all space-y-3"
            >
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${item.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">{item.title}</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

    </section>
  );
}
