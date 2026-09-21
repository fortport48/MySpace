'use client';

import React from 'react';
import { MediaItem } from '@/lib/types';
import { MediaCard } from './media-card';
import { AddItemCard } from './add-item-card';
import { Plane, Music, Film, BookOpen, Utensils, ChevronRight } from 'lucide-react';

interface CategorySectionProps {
  title: string;
  subtitle?: string;
  category: 'travel' | 'music' | 'movie' | 'book' | 'food';
  items: MediaItem[];
  addLabel?: string;
  showAddCard?: boolean;
  onAddItem?: () => void;
  onSeeAll?: () => void;
}

const categoryIcons = {
  travel: { icon: Plane, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
  music: { icon: Music, color: 'text-pink-600 bg-pink-50 border-pink-100' },
  movie: { icon: Film, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
  book: { icon: BookOpen, color: 'text-amber-600 bg-amber-50 border-amber-100' },
  food: { icon: Utensils, color: 'text-orange-600 bg-orange-50 border-orange-100' },
};

export function CategorySection({
  title,
  subtitle,
  category,
  items,
  addLabel = 'Add Item',
  showAddCard = false,
  onAddItem,
  onSeeAll,
}: CategorySectionProps) {
  // If no items and not showing add card, don't render section at all
  if (!items || (items.length === 0 && !showAddCard)) {
    return null;
  }

  const IconConfig = categoryIcons[category] || categoryIcons.travel;
  const CategoryIcon = IconConfig.icon;

  return (
    <div className="w-full rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-6 shadow-xl shadow-blue-950/5 hover:shadow-blue-900/10 transition-all duration-300">
      
      {/* Section Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl border shadow-2xs ${IconConfig.color}`}>
            <CategoryIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {items.length > 3 && (
          <button
            onClick={onSeeAll}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors pt-1 group"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Media Items Horizontal Collection Carousel */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 pt-1 scrollbar-none scroll-smooth">
        {showAddCard && (
          <AddItemCard label={addLabel} category={category} onClick={onAddItem} />
        )}
        {items.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}
