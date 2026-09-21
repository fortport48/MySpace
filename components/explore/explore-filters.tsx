'use client';

import React from 'react';
import { Compass, Music, Film, Plane, BookOpen, Utensils, Sparkles, X } from 'lucide-react';

interface ExploreFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  activeHobby: string;
  onSelectHobby: (hobby: string) => void;
  onResetFilters: () => void;
  isFiltered: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All Profiles', icon: Compass },
  { id: 'hobbies', label: 'Hobbies', icon: Sparkles },
  { id: 'travel', label: 'Travel', icon: Plane },
  { id: 'music', label: 'Music', icon: Music },
  { id: 'movie', label: 'Movies & Shows', icon: Film },
  { id: 'book', label: 'Books', icon: BookOpen },
  { id: 'food', label: 'Food & Coffee', icon: Utensils },
];

const POPULAR_TAGS = [
  'Photography',
  'Mountain Trekking',
  'Indie Music',
  'Specialty Coffee',
  'Sci-Fi',
  'Stargazing',
  'Kyoto',
  'Minimalist',
  'Analog Film',
];

export function ExploreFilters({
  selectedCategory,
  onSelectCategory,
  activeHobby,
  onSelectHobby,
  onResetFilters,
  isFiltered,
}: ExploreFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Category Selection Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const CatIcon = cat.icon;
          const isActive = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border whitespace-nowrap transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                  : 'bg-white/80 backdrop-blur-md text-slate-700 border-slate-200 hover:border-blue-300 hover:text-blue-600'
              }`}
            >
              <CatIcon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}

        {isFiltered && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors ml-auto whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>

      {/* Quick Hashtag Filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider whitespace-nowrap pr-1">
          Popular:
        </span>
        {POPULAR_TAGS.map((tag) => {
          const isTagActive = activeHobby.toLowerCase() === tag.toLowerCase();

          return (
            <button
              key={tag}
              onClick={() => onSelectHobby(isTagActive ? '' : tag)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                isTagActive
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : 'bg-slate-100/90 text-slate-600 border-slate-200/80 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200'
              }`}
            >
              #{tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
