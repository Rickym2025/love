'use client';

import React, { useState } from 'react';
import { Camera, Tv, Heart, X, Upload } from 'lucide-react';

interface PhotoItem {
  id: string;
  url: string;
  author: string;
  caption: string;
}

export default function PhotoWallSection({ coupleNames = 'gli Sposi' }: { coupleNames?: string }) {
  const [photos, setPhotos] = useState<PhotoItem[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      author: 'Marco & Giulia',
      caption: 'W gli Sposi! 🎉',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      author: 'Alessia',
      caption: 'Un giorno indimenticabile ❤️',
    },
  ]);

  const [isProjector, setIsProjector] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="py-16 px-6 max-w-5xl mx-auto text-center">
      
      {/* HEADER GALLERIA */}
      <div className="bg-white border border-[#E5DACB] p-8 rounded-3xl shadow-sm mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <span className="text-xs text-[#8B1E24] font-bold uppercase tracking-widest block mb-1">
            Guest Photo Wall
          </span>
          <h3 className="font-serif text-2xl text-[#4A3D39]">I Ricordi della Festa</h3>
          <p className="text-xs text-[#9E8976]">Scatta e condividi le tue foto con {coupleNames}!</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsProjector(true)}
            className="px-5 py-3 rounded-full bg-[#8B1E24] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6E1216] transition-all shadow-md flex items-center gap-2"
          >
            <Tv className="w-4 h-4 animate-pulse text-[#D4AF37]" />
            Modalità Maxischermo Proiettore
          </button>
        </div>
      </div>

      {/* GRIGLIA POLAROID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-2xl border border-[#E5DACB] shadow-md transform hover:-rotate-1 transition-all">
            <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-[#FAF7F2]">
              <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
            </div>
            <p className="font-serif italic text-sm text-[#4A3D39] mb-1">"{p.caption}"</p>
            <p className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">— {p.author}</p>
          </div>
        ))}
      </div>

      {/* MODALITÀ MAXISCHERMO PROIETTORE FESTA */}
      {isProjector && (
        <div className="fixed inset-0 z-50 bg-[#0F172A] text-white flex flex-col items-center justify-between p-8 select-none">
          <button
            onClick={() => setIsProjector(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="my-auto text-center max-w-2xl">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-4 animate-pulse">
              📺 PROIEZIONE LIVE FESTA DI MATRIMONIO
            </span>
            <div className="aspect-square max-w-md mx-auto bg-white p-4 rounded-3xl shadow-2xl mb-6">
              <img src={photos[activeIdx].url} alt="Foto Festa" className="w-full h-full object-cover rounded-2xl" />
            </div>
            <h2 className="font-serif text-3xl text-amber-100 font-light mb-2">"{photos[activeIdx].caption}"</h2>
            <p className="text-sm font-bold uppercase tracking-widest text-amber-400">— {photos[activeIdx].author}</p>
          </div>

          <p className="text-xs text-slate-400 uppercase tracking-widest">
            Inquadra il QR Code sul tavolo per caricare le tue foto sullo schermo!
          </p>
        </div>
      )}

    </section>
  );
}
