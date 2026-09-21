'use client';

import React from 'react';
import { Quote } from 'lucide-react';

interface QuoteCardProps {
  quotes: string[];
}

export function FavoriteQuotesCard({ quotes }: QuoteCardProps) {
  if (!quotes || quotes.length === 0) return null;
  return (
    <div className="w-full rounded-3xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
      <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 pointer-events-none" />
      
      <div className="flex items-center gap-2 mb-4 text-blue-200 text-xs uppercase font-extrabold tracking-wider">
        <Quote className="w-4 h-4 text-sky-200" /> Favorite Quotes
      </div>

      <div className="space-y-4 relative z-10">
        {quotes.map((q, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <p className="text-sm sm:text-base font-semibold leading-relaxed text-blue-50 italic">
              {q}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
