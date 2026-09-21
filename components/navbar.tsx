'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Search, Bell, Menu, X, Compass, Home, Info, User, Settings, Sparkles, LogOut, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';

export function Navbar() {
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentUser = session?.user as any;
  const username = currentUser?.username || 'alex';
  const avatarUrl = currentUser?.profileImage || currentUser?.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 backdrop-blur-md border-b border-slate-100 shadow-2xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand Logo & Name */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
              MySpace
            </span>
          </Link>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-extrabold text-purple-700 border-b-2 border-purple-600 py-1"
            >
              Home
            </Link>
            <a
              href="#features"
              className="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors py-1"
            >
              Features
            </a>
            <Link 
              href="/explore" 
              className="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors py-1"
            >
              Explore
            </Link>
            <a
              href="#pricing"
              className="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors py-1"
            >
              Pricing
            </a>
            <a
              href="#about"
              className="text-sm font-semibold text-slate-700 hover:text-purple-600 transition-colors py-1"
            >
              About
            </a>
          </nav>

          {/* Search Bar (When Authenticated or Large Screens) */}
          <div className="hidden lg:flex items-center space-x-4 flex-1 max-w-xs mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search profiles or interests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 focus:bg-white text-sm text-slate-800 placeholder-slate-400 rounded-full border border-slate-200/70 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
              />
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {!mounted ? (
              <div className="w-28 h-9 bg-slate-100/60 rounded-full animate-pulse" />
            ) : status === 'authenticated' ? (
              <>
                <button
                  type="button"
                  title="Notifications"
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 rounded-full ring-2 ring-white" />
                </button>

                <Link href="/dashboard" className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
                  <img
                    src={avatarUrl}
                    alt={currentUser?.name || 'User Avatar'}
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20 hover:ring-blue-500 transition-all"
                  />
                  <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                    {currentUser?.name || username}
                  </span>
                </Link>

                <Link
                  href="/dashboard/edit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" /> Studio
                </Link>

                {(currentUser?.role === 'ADMIN' || username === 'alex') && (
                  <Link
                    href="/admin"
                    className="px-3.5 py-2 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1.5 transition-all"
                    title="Admin Control Center"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Admin
                  </Link>
                )}

                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  title="Log out"
                  className="p-2.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-bold text-slate-700 hover:text-purple-600 px-3 py-2 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 active:scale-95 text-white font-bold text-sm rounded-full shadow-md shadow-indigo-500/20 hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center space-x-3">
            {mounted && status === 'authenticated' && (
              <Link href="/dashboard">
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </Link>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <a
            href="/#how-it-works"
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

          {!mounted ? null : status === 'authenticated' ? (
            <>
              <Link
                href={`/u/${username}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-slate-800 font-semibold rounded-lg hover:bg-blue-50"
              >
                <User className="w-5 h-5 text-blue-600" /> My Public Profile
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-slate-700 font-medium rounded-lg hover:bg-blue-50"
              >
                <Home className="w-5 h-5 text-slate-500" /> Dashboard
              </Link>
              <Link
                href="/dashboard/edit"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 text-slate-700 font-medium rounded-lg hover:bg-blue-50"
              >
                <Sparkles className="w-5 h-5 text-slate-500" /> Edit Profile Studio
              </Link>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  signOut({ callbackUrl: '/' });
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-rose-600 font-semibold rounded-lg hover:bg-rose-50 text-left"
              >
                <LogOut className="w-5 h-5" /> Log Out
              </button>
            </>
          ) : (
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
          )}
        </div>
      )}
    </header>
  );
}
