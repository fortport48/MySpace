'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Check, Image as ImageIcon, Crop } from 'lucide-react';

interface ImageCropperModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedImageUrl: string) => void;
  aspectRatio?: 'avatar' | 'cover';
  title?: string;
}

export function ImageCropperModal({
  isOpen,
  onClose,
  onCropComplete,
  aspectRatio = 'avatar',
  title = 'Upload & Adjust Image',
}: ImageCropperModalProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [zoom, setZoom] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setImageUrl('');
      setZoom(1);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [isOpen, aspectRatio]);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = () => {
    if (imageUrl) {
      onCropComplete(imageUrl);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-6 border border-slate-100">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Crop className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Upload Zone & Canvas Preview */}
        <div className="space-y-4">
          {!imageUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-3xl p-8 text-center cursor-pointer bg-slate-50 hover:bg-blue-50/50 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">Click to upload an image</p>
                <p className="text-xs text-slate-400">PNG, JPG or WEBP up to 5MB</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`relative overflow-hidden rounded-2xl bg-slate-900 flex items-center justify-center border-4 border-slate-100 shadow-inner ${
                  aspectRatio === 'avatar' ? 'aspect-square max-w-[240px] mx-auto' : 'aspect-[16/9]'
                }`}
              >
                <img
                  src={imageUrl}
                  alt="Crop Preview"
                  className="object-cover transition-transform duration-100"
                  style={{ transform: `scale(${zoom})` }}
                />
              </div>

              {/* Zoom Controls & Change Image Action */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-500">
                    <span>Zoom Level</span>
                    <span>{Math.round(zoom * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="2.5"
                    step="0.05"
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 border border-slate-200 rounded-xl transition-colors whitespace-nowrap self-end"
                >
                  Choose Different Photo
                </button>
              </div>
            </div>
          )}

          {/* URL Input Fallback */}
          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold text-slate-600 uppercase">Or paste Image URL</label>
            <input
              type="text"
              value={imageUrl.startsWith('data:') ? '' : imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2 bg-slate-50 text-xs rounded-xl border border-slate-200"
            />
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-full"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!imageUrl}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-full shadow-md shadow-blue-500/20 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" /> Apply Image
          </button>
        </div>

      </div>
    </div>
  );
}
