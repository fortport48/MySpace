'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface UnsavedWarningProps {
  hasUnsavedChanges: boolean;
}

export function UnsavedWarningGuard({ hasUnsavedChanges }: UnsavedWarningProps) {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved profile changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  if (!hasUnsavedChanges) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-amber-500 text-slate-900 font-bold text-xs px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-amber-400 animate-bounce">
      <AlertTriangle className="w-4 h-4 text-slate-900" />
      <span>Unsaved profile changes — Don't forget to save!</span>
    </div>
  );
}
