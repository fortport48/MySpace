'use client';

import React, { useState } from 'react';
import { Camera, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { ImageCropperModal } from '../image-cropper';

interface PhotoItem {
  id: string;
  url: string;
  caption?: string;
}

export function PhotosEditor() {
  const [photos, setPhotos] = useState<PhotoItem[]>([
    { id: 'p1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', caption: 'Mountain sunset' },
    { id: 'p2', url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80', caption: 'South Goa beach vibes' },
    { id: 'p3', url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80', caption: 'Manali snow trek' },
  ]);

  const [isCropOpen, setIsCropOpen] = useState(false);
  const [captionInput, setCaptionInput] = useState('');

  const handleCropComplete = (croppedUrl: string) => {
    const newPhoto: PhotoItem = {
      id: `p_${Date.now()}`,
      url: croppedUrl,
      caption: captionInput || 'New photo',
    };
    setPhotos([...photos, newPhoto]);
    setCaptionInput('');
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900">Photos Gallery</h3>
          <p className="text-xs text-slate-500 font-medium">Upload and manage personal photo memories.</p>
        </div>
        <button
          onClick={() => setIsCropOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full flex items-center gap-1.5 shadow-sm transition-all"
        >
          <Camera className="w-4 h-4" /> Add Photo
        </button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative rounded-2xl overflow-hidden border border-slate-200 aspect-square bg-slate-100 shadow-2xs">
            <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                onClick={() => setPhotos(photos.filter(p => p.id !== photo.id))}
                className="p-2 bg-rose-600 text-white rounded-full hover:scale-110 transition-transform"
                title="Delete Photo"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            {photo.caption && (
              <div className="absolute bottom-0 inset-x-0 p-2 bg-slate-900/70 text-white text-[10px] font-semibold truncate text-center">
                {photo.caption}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Crop Modal */}
      <ImageCropperModal
        isOpen={isCropOpen}
        onClose={() => setIsCropOpen(false)}
        onCropComplete={handleCropComplete}
        title="Upload & Crop Photo Memory"
      />
    </div>
  );
}
