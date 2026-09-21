'use client';

import React from 'react';
import { AboutSectionData } from '@/lib/types';

interface AboutEditorProps {
  data: AboutSectionData;
  onChange: (updated: AboutSectionData) => void;
}

export function AboutEditor({ data, onChange }: AboutEditorProps) {
  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-xl font-extrabold text-slate-900">About Me</h3>
        <p className="text-xs text-slate-500 font-medium">Personal bio, location, optional birthday/pronouns, and decorative notes.</p>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Short Bio</label>
        <textarea
          rows={3}
          value={data.bio || ''}
          onChange={(e) => onChange({ ...data, bio: e.target.value })}
          placeholder="Tell people who you are outside of your professional life..."
          className="w-full px-4 py-2.5 bg-slate-50 text-sm font-medium rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Location</label>
          <input
            type="text"
            value={data.location || ''}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            placeholder="e.g. Himachal & Mumbai, India"
            className="w-full px-4 py-2.5 bg-slate-50 text-sm rounded-xl border border-slate-200"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Birthday (Optional)</label>
          <input
            type="date"
            value={data.birthday || ''}
            onChange={(e) => onChange({ ...data, birthday: e.target.value })}
            className="w-full px-4 py-2.5 bg-slate-50 text-sm rounded-xl border border-slate-200"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pronouns (Optional)</label>
          <input
            type="text"
            value={data.pronouns || ''}
            onChange={(e) => onChange({ ...data, pronouns: e.target.value })}
            placeholder="e.g. he/him, she/her, they/them"
            className="w-full px-4 py-2.5 bg-slate-50 text-sm rounded-xl border border-slate-200"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Status Pill Badge</label>
          <input
            type="text"
            value={data.statusPill || ''}
            onChange={(e) => onChange({ ...data, statusPill: e.target.value })}
            placeholder="🌿 Exploring • Learning • Growing"
            className="w-full px-4 py-2.5 bg-slate-50 text-sm rounded-xl border border-slate-200"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Handwritten Script Header</label>
          <input
            type="text"
            value={data.handwrittenHeader || ''}
            onChange={(e) => onChange({ ...data, handwrittenHeader: e.target.value })}
            placeholder="Same Person, More to Explore"
            className="w-full px-4 py-2.5 bg-slate-50 text-sm rounded-xl border border-slate-200"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Hero Quote Callout Block</label>
        <input
          type="text"
          value={data.quoteBlock || ''}
          onChange={(e) => onChange({ ...data, quoteBlock: e.target.value })}
          placeholder="Collecting moments, not things."
          className="w-full px-4 py-2.5 bg-slate-50 text-sm font-medium rounded-xl border border-slate-200"
        />
      </div>
    </div>
  );
}
