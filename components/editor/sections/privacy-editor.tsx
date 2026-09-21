'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, Eye, Lock, Globe, Users, Save, Check, Download, Trash2, 
  AlertTriangle, Loader2, KeyRound, X 
} from 'lucide-react';

export function PrivacyEditor() {
  const [profileVisibility, setProfileVisibility] = useState<'PUBLIC' | 'MEMBERS_ONLY' | 'PRIVATE'>('PUBLIC');
  const [locationVisibility, setLocationVisibility] = useState<'PUBLIC' | 'FOLLOWERS' | 'PRIVATE'>('PUBLIC');
  const [birthdayVisibility, setBirthdayVisibility] = useState<'PUBLIC' | 'FOLLOWERS' | 'PRIVATE'>('PRIVATE');

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Delete Account Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    async function fetchPrivacy() {
      try {
        const res = await fetch('/api/profile/privacy');
        if (res.ok) {
          const data = await res.json();
          if (data.profileVisibility) setProfileVisibility(data.profileVisibility);
          if (data.locationVisibility) setLocationVisibility(data.locationVisibility);
          if (data.birthdayVisibility) setBirthdayVisibility(data.birthdayVisibility);
        }
      } catch (err) {
        console.error('Failed to fetch privacy settings:', err);
      }
    }
    fetchPrivacy();
  }, []);

  const handleSavePrivacy = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/profile/privacy', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileVisibility,
          locationVisibility,
          birthdayVisibility,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } catch (err) {
      console.error('Save Privacy Error:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const res = await fetch('/api/user/export-data');
      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `avero-data-export-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      }
    } catch (err) {
      console.error('Export error:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteConfirmationText !== 'DELETE MY ACCOUNT') return;

    setIsDeleting(true);
    setDeleteError('');

    try {
      const res = await fetch('/api/user/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          password: deletePassword,
          confirmationText: deleteConfirmationText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete account');
      }

      window.location.href = '/login?deleted=true';
    } catch (err: any) {
      setDeleteError(err.message || 'An error occurred during account deletion.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Privacy & Safety Control Center</h3>
          <p className="text-xs text-slate-500 font-medium">Manage profile visibility, sensitive field rules, data downloads, and account security.</p>
        </div>
        <button
          onClick={handleSavePrivacy}
          disabled={isSaving}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white font-bold text-xs rounded-full flex items-center gap-1.5 shadow-sm transition-all"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Saved!' : 'Save Privacy Settings'}
        </button>
      </div>

      {/* 1. PROFILE VISIBILITY SETTINGS */}
      <div className="space-y-3">
        <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-blue-600" /> Overall Profile Visibility
        </label>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Public Option */}
          <button
            type="button"
            onClick={() => setProfileVisibility('PUBLIC')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              profileVisibility === 'PUBLIC'
                ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Globe className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-bold text-slate-900">Public</span>
            </div>
            <p className="text-xs text-slate-500 leading-snug">Anyone on the web can view your profile and find you in explore.</p>
          </button>

          {/* Members Only Option */}
          <button
            type="button"
            onClick={() => setProfileVisibility('MEMBERS_ONLY')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              profileVisibility === 'MEMBERS_ONLY'
                ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-bold text-slate-900">Logged-in Users Only</span>
            </div>
            <p className="text-xs text-slate-500 leading-snug">Only logged-in Avero members can view your profile page.</p>
          </button>

          {/* Private Option */}
          <button
            type="button"
            onClick={() => setProfileVisibility('PRIVATE')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              profileVisibility === 'PRIVATE'
                ? 'bg-rose-50/80 border-rose-500 ring-2 ring-rose-500/20 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-rose-600" />
              <span className="text-sm font-bold text-slate-900">Private</span>
            </div>
            <p className="text-xs text-slate-500 leading-snug">Hidden from public explore and search. Only you can view.</p>
          </button>
        </div>
      </div>

      {/* 2. SENSITIVE FIELDS PRIVACY CONTROLS */}
      <div className="space-y-4 pt-2 border-t border-slate-100">
        <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <Shield className="w-4 h-4 text-indigo-600" /> Sensitive Fields Privacy Rules
        </label>

        <div className="space-y-3">
          {/* Location Privacy Rule */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Location Visibility</h4>
              <p className="text-xs text-slate-500">Control who can see your city/region on your profile hero.</p>
            </div>
            <select
              value={locationVisibility}
              onChange={(e: any) => setLocationVisibility(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="PUBLIC">Public (Everyone)</option>
              <option value="FOLLOWERS">Followers Only</option>
              <option value="PRIVATE">Private (Only Me)</option>
            </select>
          </div>

          {/* Birthday Privacy Rule */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Birthday Visibility</h4>
              <p className="text-xs text-slate-500">Control who can see your optional birthday info.</p>
            </div>
            <select
              value={birthdayVisibility}
              onChange={(e: any) => setBirthdayVisibility(e.target.value)}
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="PUBLIC">Public (Everyone)</option>
              <option value="FOLLOWERS">Followers Only</option>
              <option value="PRIVATE">Private (Only Me)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. DATA ARCHIVE EXPORT & ACCOUNT MANAGEMENT */}
      <div className="space-y-4 pt-4 border-t border-slate-100">
        <label className="text-xs font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <Download className="w-4 h-4 text-emerald-600" /> Personal Data & Account Control
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Download Data Archive */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Export Personal Data Archive</h4>
              <p className="text-xs text-slate-500 leading-snug">Download a full copy of your Avero profile data, collections, and preferences in JSON format.</p>
            </div>
            <button
              type="button"
              disabled={isExporting}
              onClick={handleExportData}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 w-fit"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{isExporting ? 'Exporting...' : 'Download JSON Data'}</span>
            </button>
          </div>

          {/* Delete Account */}
          <div className="p-4 bg-rose-50/60 border border-rose-200/80 rounded-2xl space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-rose-900">Delete Account Permanently</h4>
              <p className="text-xs text-rose-700 leading-snug">Permanently erase your account, public profile, and all saved items. This action cannot be undone.</p>
            </div>
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 w-fit"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Account...</span>
            </button>
          </div>
        </div>
      </div>

      {/* DELETE ACCOUNT CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 space-y-6">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 bg-rose-100 text-rose-600 rounded-2xl">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">Confirm Account Deletion</h3>
                  <p className="text-xs font-semibold text-rose-600">Permanent action</p>
                </div>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDeleteAccount} className="space-y-4">
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                This will permanently delete your Avero account, public profile page, and all curated collection data.
              </p>

              {deleteError && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
                  {deleteError}
                </p>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-slate-400" /> Enter Your Password
                </label>
                <input
                  type="password"
                  required
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder="Your current password"
                  className="w-full px-4 py-2.5 bg-slate-50 text-sm font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Type <span className="text-rose-600 font-mono">DELETE MY ACCOUNT</span> to confirm
                </label>
                <input
                  type="text"
                  required
                  value={deleteConfirmationText}
                  onChange={(e) => setDeleteConfirmationText(e.target.value)}
                  placeholder="DELETE MY ACCOUNT"
                  className="w-full px-4 py-2.5 bg-slate-50 text-sm font-bold text-rose-700 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={deleteConfirmationText !== 'DELETE MY ACCOUNT' || isDeleting}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                >
                  {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  <span>{isDeleting ? 'Deleting...' : 'Permanently Delete'}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
