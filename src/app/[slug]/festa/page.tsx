'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Camera, Tv, Heart, X, ArrowLeft } from 'lucide-react';

export default function FestaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const isFrancesca = slug === 'francesca-e-luca';
  const coupleNames = isFrancesca ? 'Francesca & Luca' : 'Elena & Davide';

  const [photos, setPhotos] = useState([
    { id: '1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', author: 'Marco', caption: 'Evviva gli Sposi! 🎉' },
    { id: '2', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', author: 'Giulia', caption: 'Bellissimi! ❤️' },
  ]);

  const [isProjector, setIsProjector] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3D39] p-6 sm:p-12">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E5DACB]">
          <Link href={`/${slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#8B1E24]">
            <ArrowLeft className="w-4 h-4" /> Torna all'Invito
          </Link>
          <span className="font-serif text-xl font-bold">{coupleNames} • La Festa Live</span>
          <button
            onClick={() => setIsProjector(true)}
            className="px-5 py-2.5 rounded-full bg-[#8B1E24] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Tv className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            Modalità Maxischermo Proiettore
          </button>
        </div>

        <div className="text-center max-w-xl mx-auto mb-10">
          <Camera className="w-10 h-10 text-[#D4AF37] mx-auto mb-2" />
          <h1 className="font-serif text-4xl text-[#4A3D39] mb-2">Guest Photo Wall</h1>
          <p className="text-xs text-[#9E8976]">Carica le tue foto per vederle proiettate in tempo reale sul maxischermo del locale!</p>
        </div>

        {/* GRIGLIA POLAROID */}
        <div className="grid sm:grid-cols-3 gap-6">
          {photos.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-2xl border border-[#E5DACB] shadow-md transform hover:-rotate-1 transition-transform">
              <div className="aspect-[9/16] rounded-xl overflow-hidden mb-3 bg-[#FAF7F2]">
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
              </div>
              <p className="font-serif italic text-sm mb-1">"{p.caption}"</p>
              <p className="text-xs font-bold text-[#D4AF37]">— {p.author}</p>
            </div>
          ))}
        </div>

        {/* MODALITÀ PROIETTORE FESTA */}
        {isProjector && (
          <div className="fixed inset-0 z-50 bg-[#0F172A] text-white flex flex-col items-center justify-between p-8">
            <button onClick={() => setIsProjector(false)} className="absolute top-6 right-6 p-3 rounded-full bg-slate-800">
              <X className="w-6 h-6" />
            </button>
            <div className="my-auto text-center max-w-xl">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-4 animate-pulse">
                📺 PROIEZIONE LIVE LOCALE
              </span>
              <div className="aspect-[9/16] max-w-xs mx-auto bg-white p-3 rounded-2xl shadow-2xl mb-4">
                <img src={photos[0].url} alt="Proiezione" className="w-full h-full object-cover rounded-xl" />
              </div>
              <h2 className="font-serif text-2xl text-amber-100">"{photos[0].caption}"</h2>
              <p className="text-xs font-bold text-amber-400 mt-1">— {photos[0].author}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
