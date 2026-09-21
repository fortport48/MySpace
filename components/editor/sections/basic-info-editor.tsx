'use client';

import React, { useState } from 'react';
import { AboutSectionData } from '@/lib/types';
import { ImageCropperModal } from '../image-cropper';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';

interface BasicInfoEditorProps {
  data: AboutSectionData;
  onChange: (updated: AboutSectionData) => void;
}

export function BasicInfoEditor({ data, onChange }: BasicInfoEditorProps) {
  const [cropTarget, setCropTarget] = useState<'avatar' | 'cover' | null>(null);

  const handleCropComplete = (croppedUrl: string) => {
    if (cropTarget === 'avatar') {
      onChange({ ...data, profileImage: croppedUrl });
    } else if (cropTarget === 'cover') {
      onChange({ ...data, coverImageUrl: croppedUrl });
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-xl font-extrabold text-slate-900">Basic Information</h3>
        <p className="text-xs text-slate-500 font-medium">Manage your display identity, username handle, avatar, and cover image.</p>
      </div>

      {/* Profile Avatar & Cover Upload Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Profile Image Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Profile Photo</span>
          <div className="flex items-center gap-4">
            <img
              src={data.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-blue-500/20"
            />
            <button
              type="button"
              onClick={() => setCropTarget('avatar')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Camera className="w-4 h-4" /> Upload & Crop
            </button>
          </div>
        </div>

        {/* Cover Photo Box */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Cover Image</span>
          <div className="flex items-center gap-4">
            <div className="w-20 h-12 rounded-xl bg-slate-200 overflow-hidden border border-slate-300">
              {data.coverImageUrl ? (
                <img src={data.coverImageUrl} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-200 to-sky-200" />
              )}
            </div>
            <button
              type="button"
              onClick={() => setCropTarget('cover')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <ImageIcon className="w-4 h-4" /> Upload & Crop
            </button>
          </div>
        </div>
      </div>

      {/* Text Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Display Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 text-sm font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Username Handle</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">@</span>
            <input
              type="text"
              disabled
              value={data.username}
              className="w-full pl-8 pr-4 py-2.5 bg-slate-100 text-sm font-semibold text-slate-500 rounded-xl border border-slate-200 cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tagline / Headline</label>
        <input
          type="text"
          value={data.tagline || ''}
          onChange={(e) => onChange({ ...data, tagline: e.target.value })}
          placeholder="e.g. A curious mind, collecting experiences, stories and good vibes."
          className="w-full px-4 py-2.5 bg-slate-50 text-sm font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      {/* Image Crop Modal */}
      {cropTarget !== null && (
        <ImageCropperModal
          key={cropTarget}
          isOpen={true}
          onClose={() => setCropTarget(null)}
          onCropComplete={handleCropComplete}
          aspectRatio={cropTarget === 'cover' ? 'cover' : 'avatar'}
          title={cropTarget === 'cover' ? 'Upload & Crop Cover Image' : 'Upload & Crop Profile Photo'}
        />
      )}
    </div>
  );
}
