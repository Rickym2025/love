'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import LoveQuiz from '@/components/LoveQuiz';
import { Camera, Tv, ArrowLeft, X } from 'lucide-react';

export default function FestaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const isFrancesca = slug === 'francesca-e-luca';
  const coupleNames = isFrancesca ? 'Francesca & Luca' : 'Elena & Davide';

  const [photos, setPhotos] = useState([
    { id: '1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', author: 'Marco', caption: 'Evviva gli Sposi! 🎉' },
    { id: '2', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', author: 'Giulia', caption: 'Bellissimi! ❤️' },
  ]);

  const [isProjector, setIsProjector] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newPhoto = {
        id: Date.now().toString(),
        url: event.target?.result as string,
        author: 'Invitato',
        caption: 'Un ricordo speciale! 🥂',
      };
      setPhotos((prev) => [newPhoto, ...prev]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] p-6 sm:p-12">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E2E8F0]">
          <Link href={`/${slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#8B1E24]">
            <ArrowLeft className="w-4 h-4" /> Torna all'Invito
          </Link>
          <span className="font-serif text-xl font-bold">{coupleNames} • La Festa</span>
          <button
            onClick={() => setIsProjector(true)}
            className="px-5 py-2.5 rounded-full bg-[#8B1E24] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#6E1216] transition-all shadow-md"
          >
            <Tv className="w-4 h-4 text-[#D4AF37] animate-pulse" />
            Connetti a Maxischermo / Proiettore
          </button>
        </div>

        {/* SEZIONE GIOCHI IN ALTO NELLA PAGINA DELLA FESTA */}
        <section className="mb-12">
          <LoveQuiz coupleNames={coupleNames} />
        </section>

        {/* SCATTO FOTO / VIDEO OSPITI */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <Camera className="w-10 h-10 text-[#D4AF37] mx-auto mb-2" />
          <h1 className="font-serif text-4xl text-[#1E293B] mb-2">Guest Photo Wall</h1>
          <p className="text-xs text-[#64748B] mb-6">Scatta una foto o registra un video dal cellulare per trasmetterlo sul maxischermo!</p>
          
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,video/*"
            capture="environment"
            className="hidden"
            onChange={handleUpload}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-8 py-4 rounded-full bg-[#D4AF37] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B59226] transition-all shadow-lg inline-flex items-center gap-2"
          >
            <Camera className="w-4 h-4" /> Scatta Foto o Video Ora 📸
          </button>
        </div>

        {/* GRIGLIA POLAROID */}
        <div className="grid sm:grid-cols-3 gap-6">
          {photos.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-md transform hover:-rotate-1 transition-transform">
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-[#FAF7F2]">
                <img src={p.url} alt={p.caption} className="w-full h-full object-cover" />
              </div>
              <p className="font-serif italic text-sm mb-1">"{p.caption}"</p>
              <p className="text-xs font-bold text-[#D4AF37]">— {p.author}</p>
            </div>
          ))}
        </div>

        {/* MODALITÀ MAXISCHERMO PROIETTORE */}
        {isProjector && (
          <div className="fixed inset-0 z-50 bg-[#0A0A0C] text-white flex flex-col items-center justify-between p-8">
            <button onClick={() => setIsProjector(false)} className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-white">
              <X className="w-6 h-6" />
            </button>
            <div className="my-auto text-center max-w-xl">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block mb-4 animate-pulse">
                📺 PROIEZIONE MAXISCHERMO FESTA
              </span>
              <div className="aspect-[3/4] max-w-xs mx-auto bg-white p-3 rounded-2xl shadow-2xl mb-4">
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
