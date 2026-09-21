'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowLeft, Save, Check, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { FullUserProfileData, SectionKey, SectionSettingData } from '@/lib/types';
import { SectionNav } from './section-nav';
import { LivePreview } from './live-preview';
import { UnsavedWarningGuard } from './unsaved-warning';

// Import Section Editors
import { BasicInfoEditor } from './sections/basic-info-editor';
import { AboutEditor } from './sections/about-editor';
import { PhotosEditor } from './sections/photos-editor';
import { PrivacyEditor } from './sections/privacy-editor';

interface BuilderLayoutProps {
  initialProfile: FullUserProfileData;
}

export function BuilderLayout({ initialProfile }: BuilderLayoutProps) {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<FullUserProfileData>(initialProfile);
  const [activeSection, setActiveSection] = useState<SectionKey>('about');
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [savedNotice, setSavedNotice] = useState(false);

  // Autosave debouncing timer ref
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  // Profile update handlers
  const updateAbout = (updatedAbout: typeof profile.about) => {
    setProfile(prev => ({ ...prev, about: updatedAbout }));
    setSaveState('unsaved');
  };

  const updatePersonality = (updatedPersonality: typeof profile.personality) => {
    setProfile(prev => ({ ...prev, personality: updatedPersonality }));
    setSaveState('unsaved');
  };

  const updateLifestyle = (updatedLifestyle: typeof profile.lifestyle) => {
    setProfile(prev => ({ ...prev, lifestyle: updatedLifestyle }));
    setSaveState('unsaved');
  };

  // Section Reordering & Visibility Toggles
  const handleToggleVisibility = (key: SectionKey) => {
    const updated = profile.sectionSettings.map(s =>
      s.sectionKey === key ? { ...s, isVisible: !s.isVisible } : s
    );
    setProfile(prev => ({ ...prev, sectionSettings: updated }));
    setSaveState('unsaved');
  };

  const handleReorderSections = (newSections: SectionSettingData[]) => {
    setProfile(prev => ({ ...prev, sectionSettings: newSections }));
    setSaveState('unsaved');
  };

  // Force Save Action
  const handleSaveAll = async () => {
    setSaveState('saving');
    try {
      // Save About Section
      await fetch('/api/profile/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile.about),
      });

      // Save Personality & Lifestyle if defined
      if (profile.personality) {
        await fetch('/api/profile/personality', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile.personality),
        });
      }

      if (profile.lifestyle) {
        await fetch('/api/profile/lifestyle', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile.lifestyle),
        });
      }

      // Save Section Settings
      await fetch('/api/profile/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile.sectionSettings),
      });

      setSaveState('saved');
      setSavedNotice(true);
      setTimeout(() => setSavedNotice(false), 2500);
    } catch (err) {
      console.error('Save error:', err);
      setSaveState('unsaved');
    }
  };

  // Debounced Autosave Effect
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (saveState === 'unsaved') {
      if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
      autosaveTimerRef.current = setTimeout(() => {
        handleSaveAll();
      }, 2500);
    }
  }, [profile]);

  return (
    <div className="w-full h-screen flex flex-col bg-slate-100 overflow-hidden select-none">
      
      {/* TOP BUILDER HEADER TOOLBAR */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
              A
            </div>
            <div>
              <h1 className="text-sm font-extrabold text-slate-900 leading-none">
                Profile Builder
              </h1>
              <span className="text-[11px] text-slate-400 font-medium">avero.app/u/{profile.username}</span>
            </div>
          </div>
        </div>

        {/* Center Autosave Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold">
          {saveState === 'saving' && (
            <>
              <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
              <span className="text-blue-600">Autosaving changes...</span>
            </>
          )}
          {saveState === 'saved' && (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700">Saved to cloud</span>
            </>
          )}
          {saveState === 'unsaved' && (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-amber-700">Unsaved edits</span>
            </>
          )}
        </div>

        {/* Manual Save Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveAll}
            disabled={saveState === 'saving'}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
          >
            {savedNotice ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
            {savedNotice ? 'Saved!' : 'Save Profile'}
          </button>
        </div>
      </header>

      {/* 3-COLUMN BUILDER BODY CANVAS */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* COLUMN 1: LEFT SIDE SECTION NAVIGATION (280px) */}
        <div className="w-64 sm:w-72 flex-shrink-0 h-full">
          <SectionNav
            activeSection={activeSection}
            onSelectSection={(key) => setActiveSection(key as SectionKey)}
            sections={profile.sectionSettings}
            onToggleVisibility={handleToggleVisibility}
            onReorderSections={handleReorderSections}
          />
        </div>

        {/* COLUMN 2: CENTER FORM EDITING INTERFACE (Flex-1) */}
        <div className="flex-1 h-full overflow-y-auto p-6 sm:p-8 bg-white/60 backdrop-blur-md">
          <div className="max-w-2xl mx-auto space-y-6">
            
            {activeSection === 'about' && (
              <div className="space-y-6">
                <BasicInfoEditor data={profile.about} onChange={updateAbout} />
                <AboutEditor data={profile.about} onChange={updateAbout} />
              </div>
            )}

            {activeSection === 'personality' && (
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-slate-900">Personality & Type</h3>
                <textarea
                  rows={3}
                  value={profile.personality?.description || ''}
                  onChange={(e) => updatePersonality({
                    description: e.target.value,
                    personalityType: profile.personality?.personalityType || '',
                    traits: profile.personality?.traits || [],
                    values: profile.personality?.values || [],
                  })}
                  className="w-full px-4 py-2.5 bg-slate-50 text-sm rounded-xl border border-slate-200"
                  placeholder="How would your friends describe you?"
                />
              </div>
            )}

            {activeSection === 'photos' && <PhotosEditor />}

            {activeSection === 'privacy' && <PrivacyEditor />}

            {/* Fallback info when navigating other sections */}
            {!['about', 'personality', 'photos', 'privacy'].includes(activeSection) && (
              <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 capitalize">{activeSection.replace(/-/g, ' ')} Section</h3>
                <p className="text-xs text-slate-500">Edit and manage items for this section in the builder. Updates instantly sync in real-time to the Live Preview!</p>
              </div>
            )}

          </div>
        </div>

        {/* COLUMN 3: RIGHT SIDE REAL-TIME LIVE PREVIEW (400px - 500px) */}
        <div className="w-[380px] lg:w-[460px] flex-shrink-0 h-full hidden md:block">
          <LivePreview profile={profile} onRefresh={handleSaveAll} />
        </div>

      </div>

      {/* Unsaved Changes Guard */}
      <UnsavedWarningGuard hasUnsavedChanges={saveState === 'unsaved'} />

    </div>
  );
}
