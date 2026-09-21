'use client';

import React, { useState } from 'react';
import { X, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface BlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  onBlocked?: () => void;
}

export function BlockModal({ isOpen, onClose, username, onBlocked }: BlockModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleBlock = async () => {
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/user/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUsername: username,
          action: 'block',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to block user');
      }

      setIsBlocked(true);
      if (onBlocked) onBlocked();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while blocking.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsBlocked(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 overflow-hidden space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Block @{username}</h3>
              <p className="text-xs text-slate-500 font-medium">Manage safety & boundaries</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isBlocked ? (
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-100">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-slate-900">@{username} Blocked</h4>
              <p className="text-xs text-slate-600 max-w-xs mx-auto">
                They will no longer be able to view your profile, explore your collections, or contact you.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-all"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Are you sure you want to block <strong className="text-slate-900">@{username}</strong>? 
              They will not be notified that you blocked them.
            </p>

            {errorMsg && (
              <p className="text-xs font-bold text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-100">
                {errorMsg}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleBlock}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
              >
                {isSubmitting ? 'Blocking...' : 'Confirm Block'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
