'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, Instagram, Twitter } from 'lucide-react';

export function LandingFooter() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          
          {/* Column 1 & 2: Brand Info */}
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 fill-white/20" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight">
                MySpace
              </span>
            </Link>
            <p className="text-sm font-semibold text-slate-400">
              Your personality, online.
            </p>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
              Show who you are outside of work with one aesthetic, minimal personal identity link.
            </p>
          </div>

          {/* Column 3: Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Account */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">Account</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">Log In</Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">Create Profile</Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">Legal & Social</h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Privacy</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Terms</span>
              </li>
            </ul>

            <div className="flex items-center gap-3 pt-2">
              <span className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors" title="Instagram">
                <Instagram className="w-4 h-4" />
              </span>
              <span className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-colors" title="X (Twitter)">
                <Twitter className="w-4 h-4" />
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-800 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500">
          <p>© 2026 MySpace. All rights reserved.</p>
          <p>Show who you are, not just what you do.</p>
        </div>

      </div>
    </footer>
  );
}
