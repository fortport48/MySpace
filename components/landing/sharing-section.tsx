'use client';

import React from 'react';
import { Copy, QrCode, MessageCircle, Instagram, MessageSquare, Link as LinkIcon, Sparkles } from 'lucide-react';

export function SharingSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100 inline-block">
          Instant Sharing
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          One link. Your whole world.
        </h2>
        <p className="text-base sm:text-lg font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Send your profile instead of explaining yourself.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center max-w-5xl mx-auto">
        
        {/* ULTRA-THIN BEZEL PHONE MOCKUP COLUMN */}
        <div className="lg:col-span-6 flex justify-center">
          
          <div className="relative w-[260px] sm:w-[290px] rounded-[2.8rem] bg-slate-950 p-1 sm:p-1.5 border border-slate-800 shadow-2xl shadow-purple-950/20 overflow-hidden">
            
            {/* Dynamic Island Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-30 flex items-center justify-between px-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <span className="w-2 h-2 rounded-full bg-blue-900/80" />
            </div>

            {/* Screen Content (Ultra-Modern Mobile Profile) */}
            <div className="w-full bg-white rounded-[2.4rem] overflow-hidden pt-6 p-3.5 space-y-3 text-left shadow-inner">
              
              {/* Top Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-black text-purple-700 tracking-tight">MySpace</span>
                <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  myspace.com/u/alex
                </span>
              </div>

              {/* Cover Banner & Profile Avatar Header */}
              <div className="relative rounded-2xl h-24 bg-slate-900 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80"
                  alt="Mountain Cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Avatar & Personal Info */}
              <div className="-mt-9 relative z-10 space-y-1.5">
                <div className="flex items-end justify-between">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
                    alt="Alex Avatar"
                    className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md bg-white"
                  />
                  <span className="text-[9px] font-bold text-purple-700 bg-purple-50 border border-purple-200/80 px-2 py-0.5 rounded-full">
                    @alex
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-black text-slate-900">Alex</h4>
                    <span className="w-3.5 h-3.5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px] font-bold">✓</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-medium leading-tight">
                    A curious mind, collecting experiences, stories and good vibes.
                  </p>
                </div>

                {/* Status Pill */}
                <div className="text-[9px] font-bold text-sky-900 bg-sky-50 border border-sky-200/80 px-2.5 py-1 rounded-full inline-block">
                  🌿 Exploring • Learning • Growing
                </div>
              </div>

              {/* Social Icons row */}
              <div className="flex items-center gap-1.5 pt-0.5 border-t border-slate-100">
                <span className="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 text-white flex items-center justify-center text-[10px]" title="Instagram">📸</span>
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]" title="LinkedIn">💼</span>
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]" title="GitHub">💻</span>
                <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]" title="YouTube">▶</span>
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px]" title="Website">🔗</span>
              </div>

              {/* Travel Section Cards */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[9px] font-extrabold text-slate-800">
                  <span>✈️ Travel Destinations</span>
                  <span className="text-[8px] font-bold text-purple-600">See all &gt;</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="relative h-11 rounded-lg overflow-hidden border border-slate-100">
                    <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" alt="Manali" />
                    <span className="absolute bottom-0.5 left-1 text-[7px] font-bold text-white drop-shadow-md">Manali</span>
                  </div>
                  <div className="relative h-11 rounded-lg overflow-hidden border border-slate-100">
                    <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" alt="Goa" />
                    <span className="absolute bottom-0.5 left-1 text-[7px] font-bold text-white drop-shadow-md">Goa</span>
                  </div>
                  <div className="relative h-11 rounded-lg overflow-hidden border border-slate-100">
                    <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" alt="Rishikesh" />
                    <span className="absolute bottom-0.5 left-1 text-[7px] font-bold text-white drop-shadow-md">Rishikesh</span>
                  </div>
                </div>
              </div>

              {/* Music Section Cards */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[9px] font-extrabold text-slate-800">
                  <span>🎵 My Music</span>
                  <span className="text-[8px] font-bold text-purple-600">See all &gt;</span>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="relative h-10 rounded-lg overflow-hidden border border-slate-100">
                    <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" alt="The Weeknd" />
                  </div>
                  <div className="relative h-10 rounded-lg overflow-hidden border border-slate-100">
                    <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" alt="Arctic Monkeys" />
                  </div>
                  <div className="relative h-10 rounded-lg overflow-hidden border border-slate-100">
                    <img src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=150&q=80" className="w-full h-full object-cover" alt="Chill Vibes" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Sharing Actions Column */}
        <div className="lg:col-span-6 space-y-4 text-center lg:text-left">
          
          <h3 className="text-2xl font-extrabold text-slate-900">
            Share anywhere with one tap
          </h3>
          <p className="text-sm text-slate-600 font-medium leading-relaxed">
            Whether you are adding it to your social bio, texting a friend, or scanning a QR code at a meetup — your profile is ready instantly.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <Copy className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">Copy Link</p>
                <p className="text-[10px] text-slate-500">One-click copy</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800">
                <QrCode className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">QR Code</p>
                <p className="text-[10px] text-slate-500">Scan to view</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">WhatsApp</p>
                <p className="text-[10px] text-slate-500">Direct share</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="p-2.5 rounded-xl bg-pink-50 text-pink-600">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">Instagram</p>
                <p className="text-[10px] text-slate-500">Bio link ready</p>
              </div>
            </div>

            <div className="p-4 col-span-2 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center gap-3 hover:shadow-md transition-shadow">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-xs font-extrabold text-slate-900">Messages & Chat</p>
                <p className="text-[10px] text-slate-500">Send directly in any messaging app</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
