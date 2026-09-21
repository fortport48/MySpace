'use client';

import React from 'react';
import { Layers } from 'lucide-react';

export function ValueProp() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold border border-indigo-100">
        <Layers className="w-3.5 h-3.5" />
        <span>Unified Identity</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
        A profile for the parts of you that don&apos;t fit in a bio.
      </h2>

      <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
        Your personality is scattered across different apps, conversations, and profiles. Bring the things you love into one place.
      </p>
    </section>
  );
}
