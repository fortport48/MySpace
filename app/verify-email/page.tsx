'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight } from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('No verification token provided.');
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`/api/auth/verify-email?token=${encodeURIComponent(token)}`);
        const data = await res.json();

        if (!res.ok) {
          setStatus('error');
          setMessage(data.error || 'Verification failed.');
        } else {
          setStatus('success');
          setMessage(data.message || 'Email verified successfully!');
        }
      } catch (err) {
        setStatus('error');
        setMessage('An unexpected error occurred during verification.');
      }
    };

    verifyToken();
  }, [token]);

  return (
    <div className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white/90 shadow-2xl shadow-blue-500/10 text-center">
      
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white font-bold text-2xl shadow-md shadow-blue-500/30 mb-2">
        M
      </div>

      <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
        Email Verification
      </h2>

      {status === 'loading' && (
        <div className="py-8 space-y-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-600">Verifying your email address...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="py-4 space-y-5">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{message}</span>
          </div>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all"
          >
            Go to Dashboard <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {status === 'error' && (
        <div className="py-4 space-y-5">
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-semibold flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            <span>{message}</span>
          </div>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all"
          >
            Back to Log In
          </Link>
        </div>
      )}

    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="text-slate-500 font-medium">Loading...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
