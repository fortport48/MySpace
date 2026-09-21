'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldAlert, CheckCircle2, XCircle, AlertTriangle, RefreshCw, 
  Loader2, ExternalLink, Flag, ShieldX 
} from 'lucide-react';

interface ReportItem {
  id: string;
  reason: string;
  details?: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
  reporter: { id: string; name: string; username: string };
  reported: { id: string; name: string; username: string; isSuspended: boolean };
}

export default function AdminModerationPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'PENDING' | 'RESOLVED'>('PENDING');
  const [actionReportId, setActionReportId] = useState<string | null>(null);

  const fetchReports = async (status: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/reports?status=${status}`);
      if (res.ok) {
        const data = await res.json();
        setReports(data.reports || []);
      }
    } catch (err) {
      console.error('Fetch moderation reports error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(activeTab);
  }, [activeTab]);

  const handleResolveReport = async (reportId: string, status: 'RESOLVED' | 'DISMISSED', suspendUser: boolean = false) => {
    setActionReportId(reportId);
    try {
      const res = await fetch(`/api/admin/reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, suspendUser }),
      });
      if (res.ok) {
        fetchReports(activeTab);
      }
    } catch (err) {
      console.error('Resolve report error:', err);
    } finally {
      setActionReportId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/10 border border-rose-500/30 text-rose-400">
            Content Moderation Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            User Reports Queue
          </h1>
          <p className="text-xs text-slate-400 font-medium">Review community flags, inspect reported profiles, and take moderation enforcement actions.</p>
        </div>

        <button
          onClick={() => fetchReports(activeTab)}
          className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors self-start sm:self-auto"
          title="Refresh Queue"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('PENDING')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'PENDING'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-slate-950 text-slate-400 hover:text-white'
          }`}
        >
          Pending Review
        </button>
        <button
          onClick={() => setActiveTab('RESOLVED')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'RESOLVED'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-950 text-slate-400 hover:text-white'
          }`}
        >
          Resolved Archive
        </button>
      </div>

      {/* REPORTS QUEUE */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <Loader2 className="w-8 h-8 text-rose-500 animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-400">Fetching reported profiles queue...</p>
        </div>
      ) : reports.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {reports.map((rep) => (
            <div
              key={rep.id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 shadow-lg"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Flag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-white">Reported:</span>
                      <Link
                        href={`/u/${rep.reported.username}`}
                        target="_blank"
                        className="text-sm font-bold text-blue-400 hover:underline flex items-center gap-1"
                      >
                        @{rep.reported.username} <ExternalLink className="w-3 h-3" />
                      </Link>

                      {rep.reported.isSuspended && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          Suspended
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Reported by <strong className="text-slate-200">@{rep.reporter.username}</strong> on {new Date(rep.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-[10px] font-black w-fit ${
                  rep.status === 'PENDING'
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {rep.status}
                </span>
              </div>

              {/* Reason & Details */}
              <div className="space-y-1.5 bg-slate-900/80 p-4 rounded-xl border border-slate-800/80">
                <span className="text-xs font-extrabold text-rose-400 uppercase tracking-wider">
                  Reason: {rep.reason}
                </span>
                {rep.details && (
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{rep.details}"
                  </p>
                )}
              </div>

              {/* Actions */}
              {rep.status === 'PENDING' && (
                <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
                  <button
                    onClick={() => handleResolveReport(rep.id, 'DISMISSED', false)}
                    disabled={actionReportId === rep.id}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition-colors"
                  >
                    Dismiss Report
                  </button>

                  <button
                    onClick={() => handleResolveReport(rep.id, 'RESOLVED', false)}
                    disabled={actionReportId === rep.id}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Mark Resolved
                  </button>

                  <button
                    onClick={() => handleResolveReport(rep.id, 'RESOLVED', true)}
                    disabled={actionReportId === rep.id}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <ShieldX className="w-4 h-4" /> Suspend Reported User
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 text-center text-slate-500 text-xs font-semibold bg-slate-950 rounded-2xl border border-slate-800">
          No reports found in {activeTab.toLowerCase()} queue.
        </div>
      )}

    </div>
  );
}
