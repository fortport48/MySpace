'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, UserPlus, Eye, ShieldAlert, DollarSign, Sparkles, 
  CheckCircle2, ArrowRight, Loader2, ShieldCheck, Activity 
} from 'lucide-react';

interface MetricsData {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  premiumUsers: number;
  suspendedUsers: number;
  verifiedUsers: number;
  pendingReportsCount: number;
  totalProfileViews: number;
}

export default function AdminOverviewPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setMetrics(data.metrics);
        }
      } catch (err) {
        console.error('Fetch admin stats error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 border border-blue-500/30 text-blue-400">
              Admin Overview
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            System & Community Analytics
          </h1>
          <p className="text-xs text-slate-400 font-medium">Real-time overview of users, monetization, content reports, and activity.</p>
        </div>

        <Link
          href="/admin/users"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all self-start sm:self-auto"
        >
          <Users className="w-4 h-4" /> Manage Users
        </Link>
      </div>

      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-400">Loading admin analytics...</p>
        </div>
      ) : (
        <>
          {/* TOP METRICS CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Total Users */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Users</span>
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{metrics?.totalUsers || 0}</span>
                <span className="text-xs font-bold text-emerald-400">+{metrics?.newUsers || 0} this month</span>
              </div>
            </div>

            {/* Premium Subscribers */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Premium Users</span>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{metrics?.premiumUsers || 0}</span>
                <span className="text-xs font-bold text-emerald-400">PRO / VIP Tiers</span>
              </div>
            </div>

            {/* Profile Views */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Profile Views</span>
                <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{metrics?.totalProfileViews || 0}</span>
                <span className="text-xs font-bold text-sky-400">Public Engagement</span>
              </div>
            </div>

            {/* Pending Reports */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Reports</span>
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <ShieldAlert className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white">{metrics?.pendingReportsCount || 0}</span>
                <span className="text-xs font-bold text-amber-400">Needs Review</span>
              </div>
            </div>

          </div>

          {/* SECOND ROW: QUICK ACTION CARDS & STATUS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Box: Quick Moderation Alert */}
            <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <h3 className="text-lg font-extrabold text-white">Content Moderation Queue</h3>
                </div>
                <Link href="/admin/moderation" className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1">
                  View Queue <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Review reported user profiles, hate speech complaints, and community policy violations.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-slate-300">Pending Moderation Tasks</span>
                  <p className="text-sm font-bold text-rose-400 mt-0.5">
                    {metrics?.pendingReportsCount === 0 ? 'Queue is clean!' : `${metrics?.pendingReportsCount} report(s) awaiting review`}
                  </p>
                </div>
                <Link
                  href="/admin/moderation"
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Review Reports
                </Link>
              </div>
            </div>

            {/* Right Box: System Status */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-950/90 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-extrabold text-white">System Security & Status</h3>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-slate-300">RBAC Server Authorization</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-slate-300">Rate Limiting Protection</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-semibold text-slate-300">XSS Content Sanitizer</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Active
                  </span>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
