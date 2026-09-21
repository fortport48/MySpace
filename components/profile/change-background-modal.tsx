'use client';

import React, { useState } from 'react';
import { X, Image as ImageIcon, Check, Sparkles, Upload } from 'lucide-react';

interface ChangeBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCoverUrl?: string;
  userName: string;
  onCoverUpdated?: (newUrl: string) => void;
}

const PRESET_BACKGROUNDS = [
  {
    id: 'mountains',
    name: 'Alpine Sunrise',
    url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'sunset',
    name: 'Ocean Sunset',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'forest',
    name: 'Mist & Forest',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'aurora',
    name: 'Cosmic Gradient',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'coffee',
    name: 'Cozy Aesthetic',
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'minimal',
    name: 'Pastel Glow',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1600&q=80',
  },
];

export function ChangeBackgroundModal({
  isOpen,
  onClose,
  currentCoverUrl,
  userName,
  onCoverUpdated,
}: ChangeBackgroundModalProps) {
  const [selectedUrl, setSelectedUrl] = useState(currentCoverUrl || PRESET_BACKGROUNDS[0].url);
  const [customInputUrl, setCustomInputUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSave = async (urlToSave: string) => {
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // First fetch current profile about details so we don't clear name
      const resProfile = await fetch('/api/profile');
      let name = userName || 'Profile Owner';
      if (resProfile.ok) {
        const fullData = await resProfile.json();
        if (fullData.about?.name) {
          name = fullData.about.name;
        }
      }

      const res = await fetch('/api/profile/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          coverImageUrl: urlToSave,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update background');
      }

      if (onCoverUpdated) {
        onCoverUpdated(urlToSave);
      }
      onClose();
      // Reload page to reflect new background across server component
      window.location.reload();
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong while updating background.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">Custom Profile Background</h3>
              <p className="text-xs font-semibold text-slate-500">Personalize your public digital space</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview */}
        <div className="relative w-full h-36 rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
          <img
            src={selectedUrl}
            alt="Background Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/20 flex items-end p-3">
            <span className="text-xs font-bold text-white bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              Live Preview
            </span>
          </div>
        </div>

        {/* Presets Grid */}
        <div className="space-y-2">
          <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
            Choose Preset Wallpaper
          </label>
          <div className="grid grid-cols-3 gap-3">
            {PRESET_BACKGROUNDS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedUrl(preset.url);
                  setCustomInputUrl('');
                }}
                className={`group relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedUrl === preset.url
                    ? 'border-blue-600 ring-2 ring-blue-500/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 flex items-end p-1.5">
                  <span className="text-[10px] font-bold text-white truncate drop-shadow-sm">
                    {preset.name}
                  </span>
                </div>
                {selectedUrl === preset.url && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom File Upload & URL Option */}
        <div className="space-y-3 pt-1">
          <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
            <Upload className="w-3.5 h-3.5 text-blue-600" /> Upload Local Image File or Paste URL
          </label>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <label className="cursor-pointer px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl border border-blue-200 flex items-center justify-center gap-1.5 transition-colors">
              <Upload className="w-4 h-4 text-blue-600" />
              <span>Choose Device File</span>
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp, image/gif"
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setIsSubmitting(true);
                  setErrorMsg('');
                  try {
                    const formData = new FormData();
                    formData.append('file', file);
                    const res = await fetch('/api/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || 'Failed to upload image');
                    setSelectedUrl(data.url);
                    setCustomInputUrl(data.url);
                  } catch (err: any) {
                    setErrorMsg(err.message || 'Image upload failed.');
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              />
            </label>

            <input
              type="url"
              placeholder="Or paste URL: https://images.unsplash.com/..."
              value={customInputUrl}
              onChange={(e) => {
                setCustomInputUrl(e.target.value);
                if (e.target.value.startsWith('http') || e.target.value.startsWith('/uploads/')) {
                  setSelectedUrl(e.target.value);
                }
              }}
              className="flex-1 px-4 py-2 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {errorMsg && (
          <p className="text-xs font-bold text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-100">
            {errorMsg}
          </p>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleSave(selectedUrl)}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <span>Saving...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Apply Background</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
