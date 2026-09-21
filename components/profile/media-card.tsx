'use client';

import React from 'react';
import { MediaItem } from '@/lib/types';

interface MediaCardProps {
  item: MediaItem;
  onSelect?: (item: MediaItem) => void;
}

export function MediaCard({ item, onSelect }: MediaCardProps) {
  return (
    <div
      onClick={() => onSelect?.(item)}
      className="group relative flex-shrink-0 w-32 sm:w-36 lg:w-40 flex flex-col cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm shadow-slate-200/50 border border-slate-100 bg-slate-100 group-hover:shadow-md group-hover:shadow-blue-500/10 transition-all">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="mt-2 text-center space-y-0.5">
        <h4 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {item.title}
        </h4>
        {item.subtitle && (
          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {item.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
