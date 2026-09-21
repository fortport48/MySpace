'use client';

import React, { useState } from 'react';
import {
  User, Info, Smile, Sparkles, Heart, Zap, Compass, Link2, Camera, Lock,
  Eye, EyeOff, MoveUp, MoveDown, GripVertical
} from 'lucide-react';
import { SectionKey, SectionSettingData } from '@/lib/types';

export interface SectionMeta {
  key: SectionKey;
  title: string;
  icon: React.ElementType;
}

const SECTION_METADATA: Record<SectionKey, { title: string; icon: React.ElementType }> = {
  about: { title: 'About & Basic Info', icon: User },
  personality: { title: 'Personality & Type', icon: Smile },
  hobbies: { title: 'Hobbies & Passions', icon: Sparkles },
  favorites: { title: 'Favorites (8 Categories)', icon: Heart },
  preferences: { title: 'Likes & Dislikes', icon: Zap },
  lifestyle: { title: 'Lifestyle & Habits', icon: Compass },
  social: { title: 'Social Links', icon: Link2 },
  quotes: { title: 'Favorite Quotes', icon: Info },
  photos: { title: 'Photos Gallery', icon: Camera },
  privacy: { title: 'Privacy & Settings', icon: Lock },
};

interface SectionNavProps {
  activeSection: string;
  onSelectSection: (key: string) => void;
  sections: SectionSettingData[];
  onToggleVisibility: (key: SectionKey) => void;
  onReorderSections: (newSections: SectionSettingData[]) => void;
}

export function SectionNav({
  activeSection,
  onSelectSection,
  sections,
  onToggleVisibility,
  onReorderSections,
}: SectionNavProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Sort sections array by orderIndex
  const sortedSections = [...sections].sort((a, b) => a.orderIndex - b.orderIndex);

  // Drag & Drop Handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const updated = [...sortedSections];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, movedItem);

    // Re-assign orderIndex
    const reordered = updated.map((item, idx) => ({ ...item, orderIndex: idx }));
    onReorderSections(reordered);
    setDraggedIndex(null);
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...sortedSections];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;

    const reordered = updated.map((item, idx) => ({ ...item, orderIndex: idx }));
    onReorderSections(reordered);
  };

  const handleMoveDown = (index: number) => {
    if (index === sortedSections.length - 1) return;
    const updated = [...sortedSections];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;

    const reordered = updated.map((item, idx) => ({ ...item, orderIndex: idx }));
    onReorderSections(reordered);
  };

  return (
    <div className="w-full h-full bg-white/80 backdrop-blur-xl border-r border-slate-200/80 p-4 space-y-6 flex flex-col justify-between overflow-y-auto select-none">
      
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between px-2 pt-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Section Manager
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {sortedSections.length} Sections
          </span>
        </div>

        {/* Dynamic Draggable Section List */}
        <div className="space-y-1.5">
          {sortedSections.map((sec, idx) => {
            const meta = SECTION_METADATA[sec.sectionKey] || { title: sec.sectionKey, icon: User };
            const Icon = meta.icon;
            const isActive = activeSection === sec.sectionKey;
            const isVisible = sec.isVisible;

            return (
              <div
                key={sec.sectionKey}
                draggable
                onDragStart={(e) => handleDragStart(e, idx)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, idx)}
                onClick={() => onSelectSection(sec.sectionKey)}
                className={`group flex items-center justify-between p-3 rounded-2xl transition-all cursor-grab active:cursor-grabbing ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 font-bold'
                    : 'bg-slate-50/90 hover:bg-slate-100 text-slate-700 font-semibold'
                } ${draggedIndex === idx ? 'opacity-40 border-2 border-dashed border-blue-400' : ''}`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <GripVertical className={`w-4 h-4 text-slate-300 opacity-60 group-hover:opacity-100 transition-opacity ${isActive ? 'text-white/80' : ''}`} />
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="text-xs truncate">{meta.title}</span>
                </div>

                {/* Visibility & Reorder Buttons */}
                <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                  {/* Hide/Show Toggle */}
                  <button
                    onClick={() => onToggleVisibility(sec.sectionKey)}
                    title={isVisible ? 'Visible on profile' : 'Hidden from profile'}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isActive
                        ? 'hover:bg-white/20 text-white'
                        : isVisible ? 'text-slate-400 hover:text-slate-700' : 'text-rose-500 bg-rose-50 hover:bg-rose-100'
                    }`}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-rose-600" />}
                  </button>

                  {/* Move Up/Down Arrow Buttons */}
                  <div className="flex items-center">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMoveUp(idx)}
                      title="Move Up"
                      className={`p-1 rounded hover:bg-slate-200/60 disabled:opacity-20 ${isActive ? 'text-white hover:bg-white/20' : 'text-slate-400'}`}
                    >
                      <MoveUp className="w-3 h-3" />
                    </button>
                    <button
                      disabled={idx === sortedSections.length - 1}
                      onClick={() => handleMoveDown(idx)}
                      title="Move Down"
                      className={`p-1 rounded hover:bg-slate-200/60 disabled:opacity-20 ${isActive ? 'text-white hover:bg-white/20' : 'text-slate-400'}`}
                    >
                      <MoveDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Helper Footer */}
      <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-100 text-[11px] text-blue-700 font-medium leading-relaxed">
        ✋ Drag any row to reorder sections. Use the eye icon to hide or show sections in real-time!
      </div>

    </div>
  );
}
