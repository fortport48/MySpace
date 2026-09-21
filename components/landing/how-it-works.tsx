'use client';

import React from 'react';
import { MessageCircle, Instagram, MessageSquare, QrCode, UserCheck, Palette, Share2 } from 'lucide-react';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600">Simple Process</span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Create your world in three simple steps.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Step 01 */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-extrabold text-blue-600 font-mono">01</span>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Tell Us About You</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Add the things you actually want people to know. Hobbies, interests, favorites, music, movies and more.
          </p>
        </div>

        {/* Step 02 */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-extrabold text-indigo-600 font-mono">02</span>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
              <Palette className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Make It Yours</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Choose your profile style, theme and the sections you want to show.
          </p>
        </div>

        {/* Step 03 */}
        <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-4xl font-extrabold text-sky-600 font-mono">03</span>
            <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl">
              <Share2 className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">Share Your World</h3>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            Get your personal profile link and share it anywhere.
          </p>

          {/* Small Share Icons */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600" title="WhatsApp">
              <MessageCircle className="w-4 h-4" />
            </span>
            <span className="p-2 rounded-xl bg-pink-50 text-pink-600" title="Instagram">
              <Instagram className="w-4 h-4" />
            </span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600" title="Messages">
              <MessageSquare className="w-4 h-4" />
            </span>
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700" title="QR Code">
              <QrCode className="w-4 h-4" />
            </span>
          </div>
        </div>

      </div>

    </section>
  );
}
