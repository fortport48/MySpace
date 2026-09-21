'use client';

import React from 'react';
import { DollarSign, Sparkles, TrendingUp, CreditCard, Users, CheckCircle2 } from 'lucide-react';

export default function AdminMonetizationPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          Monetization & Billing
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
          Revenue Overview & Subscription Tiers
        </h1>
        <p className="text-xs text-slate-400 font-medium">Monitor active subscriptions, Monthly Recurring Revenue (MRR), and tier performance.</p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Est. Monthly Revenue (MRR)</span>
          <div className="text-3xl font-black text-emerald-400">$1,480.00</div>
          <span className="text-xs font-semibold text-slate-500">+18% growth from last month</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PRO Subscribers ($9/mo)</span>
          <div className="text-3xl font-black text-white">124</div>
          <span className="text-xs font-semibold text-blue-400">Unlimited Wallpapers & Custom Badges</span>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">VIP Subscribers ($19/mo)</span>
          <div className="text-3xl font-black text-purple-400">19</div>
          <span className="text-xs font-semibold text-purple-400">Priority AI Assistant & Analytics</span>
        </div>
      </div>

      {/* SUBSCRIPTION PLAN TIERS COMPARISON */}
      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-extrabold text-white">Active Subscription Tiers</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* FREE PLAN */}
          <div className="p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">FREE</h3>
              <span className="text-xs font-bold text-slate-400">$0 / mo</span>
            </div>
            <p className="text-xs text-slate-400">Standard personal profile page with core custom collection cards.</p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Public Profile Link</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Travel & Music Cards</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Standard Preset Cover Photos</li>
            </ul>
          </div>

          {/* PRO PLAN */}
          <div className="p-6 rounded-3xl bg-slate-950 border-2 border-blue-500/80 space-y-4 relative shadow-lg shadow-blue-500/10">
            <div className="absolute -top-3 right-6 bg-blue-600 text-white text-[10px] font-black uppercase px-3 py-0.5 rounded-full">
              POPULAR
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">PRO TIER</h3>
              <span className="text-xs font-bold text-blue-400">$9 / mo</span>
            </div>
            <p className="text-xs text-slate-400">Enhanced personal space with custom wallpaper uploads and verified badge.</p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Everything in Free</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Custom Background Wallpapers</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> Verified Member Badge</li>
            </ul>
          </div>

          {/* VIP PLAN */}
          <div className="p-6 rounded-3xl bg-slate-950 border-2 border-purple-500/80 space-y-4 relative shadow-lg shadow-purple-500/10">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">VIP TIER</h3>
              <span className="text-xs font-bold text-purple-400">$19 / mo</span>
            </div>
            <p className="text-xs text-slate-400">Full VIP access with priority AI profile assistant and analytics.</p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Everything in Pro</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> AI Profile Bio Generator</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-400" /> Advanced Analytics & Priority Support</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
