'use client';

import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Share2, MessageCircle, Twitter, Linkedin, Facebook, Send } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  name: string;
}

export function ShareModal({ isOpen, onClose, username, name }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  if (!isOpen) return null;

  const profileUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/u/${username}`
    : `https://myspace.app/u/${username}`;

  const shareText = `Check out ${name}'s (@${username}) personal profile on MySpace — Everything that makes me, me! ✨`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(profileUrl)}&color=0f172a&bgcolor=ffffff`;

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${shareText} ${profileUrl}`)}`,
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      color: 'bg-slate-900 hover:bg-black text-white',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] hover:bg-blue-700 text-white',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-blue-600 text-white',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`,
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-600 text-white',
      url: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=${encodeURIComponent(shareText)}`,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 overflow-hidden space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Share Profile</h3>
              <p className="text-xs text-slate-500 font-medium">@{username}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Copy Link Input */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Profile Link</label>
          <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <input
              type="text"
              readOnly
              value={profileUrl}
              className="flex-1 bg-transparent px-3 text-sm text-slate-700 font-mono font-medium focus:outline-none overflow-hidden text-ellipsis"
            />
            <button
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* QR Code Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Profile QR Code</span>
            <button
              onClick={() => setShowQrCode(!showQrCode)}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <QrCode className="w-4 h-4" />
              <span>{showQrCode ? 'Hide QR' : 'Show QR Code'}</span>
            </button>
          </div>

          {showQrCode && (
            <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200 animate-in zoom-in-95 duration-200 space-y-3">
              <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <img
                  src={qrCodeUrl}
                  alt={`QR Code for ${username}`}
                  className="w-44 h-44 object-contain rounded-lg"
                />
              </div>
              <p className="text-xs font-medium text-slate-500 text-center">
                Scan with any smartphone camera to open @{username}&apos;s profile
              </p>
            </div>
          )}
        </div>

        {/* Social Sharing Buttons */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Share directly to</label>
          <div className="grid grid-cols-5 gap-2">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  title={`Share on ${item.name}`}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl ${item.color} transition-all duration-200 hover:scale-105 shadow-sm`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-bold mt-1.5 truncate max-w-full">{item.name}</span>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
