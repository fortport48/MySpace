'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

const CHIPS = [
  { emoji: '🎵', label: 'Music', color: 'hover:bg-pink-50 hover:border-pink-300' },
  { emoji: '🎮', label: 'Gaming', color: 'hover:bg-purple-50 hover:border-purple-300' },
  { emoji: '📸', label: 'Photography', color: 'hover:bg-blue-50 hover:border-blue-300' },
  { emoji: '✈️', label: 'Travel', color: 'hover:bg-sky-50 hover:border-sky-300' },
  { emoji: '🍜', label: 'Food', color: 'hover:bg-orange-50 hover:border-orange-300' },
  { emoji: '🎨', label: 'Art', color: 'hover:bg-indigo-50 hover:border-indigo-300' },
  { emoji: '📚', label: 'Books', color: 'hover:bg-amber-50 hover:border-amber-300' },
  { emoji: '🎬', label: 'Movies', color: 'hover:bg-emerald-50 hover:border-emerald-300' },
  { emoji: '☕', label: 'Coffee', color: 'hover:bg-amber-100 hover:border-amber-400' },
  { emoji: '🐶', label: 'Pets', color: 'hover:bg-rose-50 hover:border-rose-300' },
  { emoji: '🌱', label: 'Nature', color: 'hover:bg-emerald-100 hover:border-emerald-400' },
];

export function PersonalitySection() {
  const [selectedChips, setSelectedChips] = useState<string[]>([
    'Music', 'Photography', 'Coffee', 'Travel', 'Movies'
  ]);

  const toggleChip = (label: string) => {
    setSelectedChips((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-8">
      
      <div className="space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">Zero Box Constraints</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          There is no right way to be you.
        </h2>
        <p className="text-slate-600 font-medium max-w-xl mx-auto text-base sm:text-lg">
          Pick the things that matter to you. Leave out everything else.
        </p>
      </div>

      {/* Selectable Floating Interest Chips */}
      <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto pt-2">
        {CHIPS.map((chip) => {
          const isSelected = selectedChips.includes(chip.label);
          return (
            <button
              key={chip.label}
              onClick={() => toggleChip(chip.label)}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold border transition-all duration-200 active:scale-95 ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-105'
                  : `bg-white text-slate-700 border-slate-200/80 shadow-2xs ${chip.color}`
              }`}
            >
              <span className="text-lg">{chip.emoji}</span>
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>

      <p className="text-xs font-semibold text-slate-600 flex items-center justify-center gap-1.5 pt-2">
        <Sparkles className="w-3.5 h-3.5 text-blue-600" />
        <span>Click any chip to see how custom interest badges look</span>
      </p>

    </section>
  );
}
