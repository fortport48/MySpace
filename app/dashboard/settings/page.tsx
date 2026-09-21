'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Palette, Globe, Bell, Trash2, Check, Loader2 } from 'lucide-react';

export default function SettingsPage() {
  const [isPublic, setIsPublic] = useState(true);
  const [theme, setTheme] = useState<'mountain-light' | 'sunset-glow' | 'midnight-dark'>('mountain-light');
  const [allowSearchIndex, setAllowSearchIndex] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch('/api/profile/privacy');
        if (res.ok) {
          const data = await res.json();
          if (typeof data.isPublic === 'boolean') {
            setIsPublic(data.isPublic);
          } else if (data.profileVisibility) {
            setIsPublic(data.profileVisibility === 'PUBLIC');
          }
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/profile/privacy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileVisibility: isPublic ? 'PUBLIC' : 'PRIVATE',
          locationVisibility: 'PUBLIC',
          birthdayVisibility: 'PRIVATE',
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error('Save Settings Error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-2xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Settings & Preferences</h1>
            <p className="text-xs text-slate-500 font-medium">Manage visibility, themes, and account settings</p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold text-xs rounded-full shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : saved ? <Check className="w-4 h-4 text-white" /> : null}
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      {/* Main Settings Sections */}
      <div className="space-y-6">
        
        {/* Section 1: Visibility & Privacy */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Privacy & Visibility</h2>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Public Profile</h3>
                <p className="text-xs text-slate-500">Allow anyone with your link to view your Avero profile.</p>
              </div>
              <button
                onClick={() => setIsPublic(!isPublic)}
                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                  isPublic ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3 border-t">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Search Engine Indexing</h3>
                <p className="text-xs text-slate-500">Allow search engines to index your public profile.</p>
              </div>
              <button
                onClick={() => setAllowSearchIndex(!allowSearchIndex)}
                className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors ${
                  allowSearchIndex ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Appearance & Theme */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Palette className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Theme Aesthetic</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => setTheme('mountain-light')}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                theme === 'mountain-light'
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-100 to-sky-200 border border-blue-200" />
              <h4 className="text-xs font-bold text-slate-800">Mountain Light</h4>
              <p className="text-[11px] text-slate-500">Default serene alpine background with glass cards.</p>
            </button>

            <button
              onClick={() => setTheme('sunset-glow')}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                theme === 'sunset-glow'
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-100 via-rose-100 to-purple-100 border border-amber-200" />
              <h4 className="text-xs font-bold text-slate-800">Sunset Glow</h4>
              <p className="text-[11px] text-slate-500">Warm rose and golden hour twilight gradients.</p>
            </button>

            <button
              onClick={() => setTheme('midnight-dark')}
              className={`p-4 rounded-2xl border text-left space-y-2 transition-all ${
                theme === 'midnight-dark'
                  ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="w-full h-12 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800" />
              <h4 className="text-xs font-bold text-slate-800">Midnight Dark</h4>
              <p className="text-[11px] text-slate-500">Sleek dark mode aesthetic with deep indigo notes.</p>
            </button>
          </div>
        </div>

        {/* Section 3: Custom Handle */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Custom Profile Handle</h2>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Username handle</label>
            <div className="flex items-center">
              <span className="px-4 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs font-semibold text-slate-500">
                avero.app/u/
              </span>
              <input
                type="text"
                defaultValue="alex"
                className="flex-1 px-4 py-2.5 bg-slate-50 text-sm font-semibold rounded-r-xl border border-slate-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Account Actions */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/90 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-rose-600">Danger Zone</h2>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Delete Profile Data</h3>
              <p className="text-xs text-slate-500">Permanently delete your profile and curated media items.</p>
            </div>
            <button className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold rounded-full transition-colors flex items-center gap-1.5">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
