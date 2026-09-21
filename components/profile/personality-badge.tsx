'use client';

import React from 'react';
import { Sparkles, Heart, ThumbsDown, Smile, Zap } from 'lucide-react';

interface BadgesSectionProps {
  title: string;
  iconType?: 'hobby' | 'personality' | 'like' | 'dislike' | 'lifestyle';
  items: string[];
}

export function PersonalityBadgesSection({ title, iconType = 'hobby', items }: BadgesSectionProps) {
  if (!items || items.length === 0) return null;
  const getBadgeStyle = () => {
    switch (iconType) {
      case 'like':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/70 hover:bg-emerald-100/80';
      case 'dislike':
        return 'bg-rose-50 text-rose-800 border-rose-200/70 hover:bg-rose-100/80';
      case 'personality':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200/70 hover:bg-indigo-100/80';
      case 'lifestyle':
        return 'bg-purple-50 text-purple-800 border-purple-200/70 hover:bg-purple-100/80';
      default:
        return 'bg-sky-50 text-sky-800 border-sky-200/70 hover:bg-sky-100/80';
    }
  };

  const renderIcon = () => {
    switch (iconType) {
      case 'like':
        return <Heart className="w-4 h-4 text-emerald-600" />;
      case 'dislike':
        return <ThumbsDown className="w-4 h-4 text-rose-600" />;
      case 'personality':
        return <Smile className="w-4 h-4 text-indigo-600" />;
      case 'lifestyle':
        return <Zap className="w-4 h-4 text-purple-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-sky-600" />;
    }
  };

  return (
    <div className="w-full rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 p-5 sm:p-6 shadow-lg shadow-blue-500/5">
      <div className="flex items-center gap-2.5 mb-4">
        <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">
          {renderIcon()}
        </div>
        <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {items.map((item, idx) => (
          <span
            key={idx}
            className={`inline-flex items-center px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all cursor-default ${getBadgeStyle()}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
