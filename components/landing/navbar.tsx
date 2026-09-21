'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight } from 'lucide-react';

export function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            MySpace
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            How It Works
          </a>
          <Link
            href="/explore"
            className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            Explore
          </Link>
        </nav>

        {/* Right: Auth Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-bold text-slate-700 hover:text-blue-600 px-3 py-2 transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <span>Create My Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          <a
            href="#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100"
          >
            How It Works
          </a>
          <Link
            href="/explore"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-base font-semibold text-slate-700 hover:text-blue-600 py-2 border-b border-slate-100"
          >
            Explore
          </Link>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-base font-bold text-slate-700 border border-slate-200 rounded-2xl"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-3 bg-blue-600 text-white font-bold text-base rounded-2xl shadow-md flex items-center justify-center gap-2"
            >
              <span>Create My Profile</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
