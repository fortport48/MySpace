'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface AddItemCardProps {
  label: string;
  category: 'travel' | 'music' | 'movie' | 'book' | 'food';
  onClick?: () => void;
}

const colorVariants = {
  travel: {
    bg: 'bg-blue-50 hover:bg-blue-100/80 border-blue-200/60 text-blue-600',
    iconBg: 'bg-blue-600 text-white',
  },
  music: {
    bg: 'bg-pink-50 hover:bg-pink-100/80 border-pink-200/60 text-pink-600',
    iconBg: 'bg-pink-600 text-white',
  },
  movie: {
    bg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200/60 text-emerald-600',
    iconBg: 'bg-emerald-600 text-white',
  },
  book: {
    bg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-200/60 text-amber-600',
    iconBg: 'bg-amber-600 text-white',
  },
  food: {
    bg: 'bg-orange-50 hover:bg-orange-100/80 border-orange-200/60 text-orange-600',
    iconBg: 'bg-orange-600 text-white',
  },
};

export function AddItemCard({ label, category, onClick }: AddItemCardProps) {
  const styles = colorVariants[category];

  return (
    <div
      onClick={onClick}
      className={`group flex-shrink-0 w-32 sm:w-36 lg:w-40 flex flex-col items-center justify-center p-3 aspect-square rounded-2xl border border-dashed transition-all cursor-pointer ${styles.bg}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${styles.iconBg}`}>
        <Plus className="w-5 h-5" />
      </div>
      <span className="mt-3 text-xs font-bold tracking-tight">
        {label}
      </span>
    </div>
  );
}
