import React from 'react';
import Link from 'next/link';
import { assertAdminPageAccess } from '@/lib/security/admin-guard';
import { 
  ShieldCheck, LayoutDashboard, Users, ShieldAlert, DollarSign, Settings, 
  ArrowLeft, ExternalLink, Sparkles 
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Enforce server-side Admin Guard (Redirects non-admins to /login)
  const adminGuard = await assertAdminPageAccess();

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-slate-900 text-slate-100 select-none">
      
      {/* ADMIN SIDEBAR */}
      <aside className="w-full md:w-64 flex-shrink-0 bg-slate-950 border-b md:border-b-0 md:border-r border-slate-800/80 p-4 flex flex-col justify-between z-30">
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div className="flex items-center justify-between px-2">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 text-white flex items-center justify-center font-black shadow-md shadow-blue-500/20">
                A
              </div>
              <div>
                <span className="text-base font-black tracking-tight text-white block leading-none">
                  Avero Admin
                </span>
                <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase mt-0.5 block">
                  Control Center
                </span>
              </div>
            </Link>

            <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
              RBAC OK
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-blue-400" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <Users className="w-4 h-4 text-indigo-400" />
              <span>User Management</span>
            </Link>

            <Link
              href="/admin/moderation"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Content Moderation</span>
            </Link>

            <Link
              href="/admin/monetization"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <DollarSign className="w-4 h-4 text-emerald-400" />
              <span>Monetization</span>
            </Link>

            <Link
              href="/admin/system"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <Settings className="w-4 h-4 text-amber-400" />
              <span>System & Feature Flags</span>
            </Link>
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-800/80 space-y-2 px-2">
          <Link
            href="/dashboard"
            className="flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-white py-1.5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
            </span>
          </Link>
          
          <Link
            href="/explore"
            target="_blank"
            className="flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-white py-1.5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" /> View Public Site
            </span>
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
        {children}
      </main>

    </div>
  );
}
