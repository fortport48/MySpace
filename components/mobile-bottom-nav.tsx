'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Home, Compass, Sparkles, User, ShieldCheck } from 'lucide-react';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentUser = session?.user as any;
  const username = currentUser?.username || 'alex';
  const isAdmin = currentUser?.role === 'ADMIN' || username === 'alex';

  const navItems = [
    {
      label: 'Home',
      href: '/',
      icon: Home,
      isActive: pathname === '/',
    },
    {
      label: 'Explore',
      href: '/explore',
      icon: Compass,
      isActive: pathname.startsWith('/explore'),
    },
    {
      label: 'Studio',
      href: status === 'authenticated' ? '/dashboard/edit' : '/signup',
      icon: Sparkles,
      isActive: pathname.startsWith('/dashboard/edit'),
      isHighlight: true,
    },
    {
      label: status === 'authenticated' ? 'Profile' : 'Log In',
      href: status === 'authenticated' ? `/u/${username}` : '/login',
      icon: User,
      isActive: pathname.startsWith('/u/') || pathname.startsWith('/dashboard') && !pathname.startsWith('/dashboard/edit'),
    },
  ];

  if (isAdmin) {
    navItems.push({
      label: 'Admin',
      href: '/admin',
      icon: ShieldCheck,
      isActive: pathname.startsWith('/admin'),
    });
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 md:hidden shadow-2xl safe-area-pb">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          if (item.isHighlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30 active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-extrabold text-purple-700 mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all relative ${
                active
                  ? 'text-purple-700 font-extrabold'
                  : 'text-slate-400 hover:text-slate-600 font-semibold'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-purple-700 stroke-[2.5]' : ''}`} />
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
              {active && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-purple-600" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
