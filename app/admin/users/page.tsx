'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, Search, ShieldCheck, ShieldAlert, CheckCircle2, XCircle, 
  Trash2, RefreshCw, Loader2, Sparkles, Filter, Edit3, UserCheck, UserX 
} from 'lucide-react';

interface AdminUserItem {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: string;
  isPublic: boolean;
  isSuspended: boolean;
  isVerified: boolean;
  isPremium: boolean;
  subscriptionPlan: string;
  profileViews: number;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [users, setUsers] = useState<AdminUserItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionUserId, setActionUserId] = useState<string | null>(null);

  const fetchUsers = useCallback(async (query: string, filterStatus: string) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      if (filterStatus) params.set('status', filterStatus);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error('Fetch admin users error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(searchQuery, statusFilter);
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery, statusFilter, fetchUsers]);

  // Handle User Action (Suspend/Unsuspend, Verify/Unverify, Change Subscription)
  const handleUpdateUser = async (userId: string, payload: Partial<AdminUserItem>) => {
    setActionUserId(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        fetchUsers(searchQuery, statusFilter);
      }
    } catch (err) {
      console.error('Update user status error:', err);
    } finally {
      setActionUserId(null);
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (userId: string, username: string) => {
    if (!confirm(`Are you sure you want to permanently delete user @${username}? This cannot be undone.`)) {
      return;
    }

    setActionUserId(userId);
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchUsers(searchQuery, statusFilter);
      }
    } catch (err) {
      console.error('Delete user error:', err);
    } finally {
      setActionUserId(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            User Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Accounts & Subscriptions
          </h1>
          <p className="text-xs text-slate-400 font-medium">Search users, toggle verification badges, suspend policy violators, and manage subscription tiers.</p>
        </div>

        <button
          onClick={() => fetchUsers(searchQuery, statusFilter)}
          className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors self-start sm:self-auto"
          title="Refresh User List"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, handle @username, or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 text-xs text-white placeholder-slate-500 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-950 text-xs font-bold text-slate-300 rounded-xl border border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="">All Statuses</option>
            <option value="verified">Verified Only</option>
            <option value="premium">Premium / Paid Tiers</option>
            <option value="suspended">Suspended Accounts</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* USER MANAGEMENT TABLE */}
      <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-xl">
        {isLoading ? (
          <div className="py-20 text-center space-y-3">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-400">Loading user accounts...</p>
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] font-extrabold tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3.5">User</th>
                  <th className="px-4 py-3.5">Role & Badges</th>
                  <th className="px-4 py-3.5">Subscription Plan</th>
                  <th className="px-4 py-3.5">Account Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-900/50 transition-colors">
                    
                    {/* User Info Column */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-9 h-9 rounded-xl object-cover ring-1 ring-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1.5 font-bold text-white">
                            <span>{user.name}</span>
                            {user.isVerified && (
                              <span title="Verified Badge">
                                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-blue-400 font-semibold">@{user.username}</span>
                          <span className="text-[10px] text-slate-500 block truncate">{user.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* Role & Badges Column */}
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          user.role === 'ADMIN'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}>
                          {user.role}
                        </span>

                        <button
                          onClick={() => handleUpdateUser(user.id, { isVerified: !user.isVerified })}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors ${
                            user.isVerified
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                              : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
                          }`}
                          title="Toggle Verification Badge"
                        >
                          {user.isVerified ? '✓ Verified' : '+ Verify'}
                        </button>
                      </div>
                    </td>

                    {/* Subscription Plan Column */}
                    <td className="px-4 py-3.5">
                      <select
                        value={user.subscriptionPlan}
                        onChange={(e) => handleUpdateUser(user.id, { subscriptionPlan: e.target.value as any })}
                        className="px-2.5 py-1 bg-slate-900 text-[11px] font-bold text-emerald-400 rounded-lg border border-slate-800 focus:outline-none"
                      >
                        <option value="FREE">FREE</option>
                        <option value="PRO">PRO ($9/mo)</option>
                        <option value="VIP">VIP ($19/mo)</option>
                      </select>
                    </td>

                    {/* Account Status Column */}
                    <td className="px-4 py-3.5">
                      {user.isSuspended ? (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-400 border border-rose-500/30 inline-flex items-center gap-1">
                          <XCircle className="w-3 h-3" /> Suspended
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Active
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="px-4 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.isSuspended ? (
                          <button
                            onClick={() => handleUpdateUser(user.id, { isSuspended: false })}
                            disabled={actionUserId === user.id}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] rounded-lg transition-colors"
                          >
                            Unsuspend
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateUser(user.id, { isSuspended: true })}
                            disabled={actionUserId === user.id}
                            className="px-3 py-1 bg-amber-600/80 hover:bg-amber-600 text-white font-bold text-[11px] rounded-lg transition-colors"
                          >
                            Suspend
                          </button>
                        )}

                        <button
                          onClick={() => handleDeleteUser(user.id, user.username)}
                          disabled={actionUserId === user.id}
                          className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-950/50 rounded-lg transition-colors"
                          title="Delete User Account"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500 text-xs font-semibold">
            No user accounts found matching search filter.
          </div>
        )}
      </div>

    </div>
  );
}
