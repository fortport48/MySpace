'use client';

import { useEffect } from 'react';

export function PwaRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            console.log('PWA Service Worker active:', registration.scope);
          })
          .catch((err) => {
            console.log('PWA Service Worker registration note:', err);
          });
      });
    }
  }, []);

  return null;
}
