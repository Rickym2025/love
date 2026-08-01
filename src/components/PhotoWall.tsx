'use client';

import React, { useState } from 'react';
import { Camera, Sparkles, Tv, Share2, Heart, X } from 'lucide-react';

interface PhotoItem {
  id: string;
  url: string;
  author: string;
  caption?: string;
  frameStyle?: string;
}

export default function PhotoWall({ experienceSlug }: { experienceSlug: string }) {
  const [photos, setPhotos] = useState<PhotoItem[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      author: 'Marco Rossi',
      caption: 'W gli Sposi! 🎉',
      frameStyle: 'polaroid',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      author: 'Giulia Bianchi',
      caption: 'Un giorno indimenticabile ❤️',
      frameStyle: 'polaroid',
    },
  ]);

  const [isProjectorMode, setIsProjectorMode] = useState(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      
      {/* HEADER GALLERIA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h3 className="font-serif text-2xl text-amber-100 flex items-center gap-2">
            <Camera className="w-6 h-6 text-amber-400" />
            Guest Photo & Video Wall
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Scatta e condividi le foto della festa in tempo reale!
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Tasto Modalità Proiettore */}
          <button
            onClick={() => setIsProjectorMode(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider hover:bg-amber-500/10 transition-all flex items-center gap-2"
          >
            <Tv className="w-4 h-4 text-amber-400 animate-pulse" />
            Modalità Proiettore Live
          </button>
        </div>
      </div>

      {/* GRIGLIA POLAROID FOTO WALL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white text-slate-950 p-4 rounded-xl shadow-2xl transform hover:-rotate-1 hover:scale-105 transition-all"
          >
            <div className="relative aspect-square rounded-lg overflow-hidden mb-3 bg-slate-100">
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                <Heart className="w-3 h-3 fill-white" /> LOVE
              </span>
            </div>
            <p className="font-serif italic text-sm text-slate-800 mb-1">"{photo.caption}"</p>
            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">— {photo.author}</p>
          </div>
        ))}
      </div>

      {/* OVERLAY MODALITÀ PROIETTORE A TUTTO SCHERMO PER LA FESTA */}
      {isProjectorMode && (
        <div className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-between p-8 select-none">
          <button
            onClick={() => setIsProjectorMode(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center my-auto max-w-2xl">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-4 animate-pulse">
              📺 LIVE PHOTO WALL • PROIETTORE FESTA
            </span>
            <div className="relative aspect-square max-w-md mx-auto bg-white p-6 rounded-2xl shadow-2xl mb-6 transform rotate-1">
              <img
                src={photos[activePhotoIndex].url}
                alt="Proiezione Live"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <h2 className="font-serif text-3xl text-amber-100 font-light mb-2">
              "{photos[activePhotoIndex].caption}"
            </h2>
            <p className="text-sm font-bold uppercase tracking-widest text-amber-400">
              Scattata da {photos[activePhotoIndex].author}
            </p>
          </div>

          <p className="text-xs text-slate-500 uppercase tracking-widest">
            Inquadra il QR Code sul tavolo per aggiungere le tue foto sul maxischermo!
          </p>
        </div>
      )}

    </div>
  );
}
