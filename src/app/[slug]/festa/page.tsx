'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import LoveQuiz from '@/components/LoveQuiz';
import ScratchDate from '@/components/ScratchDate';
import { Camera, Tv, ArrowLeft, X, Sparkles, Puzzle, Gamepad2 } from 'lucide-react';

export default function FestaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const isFrancesca = slug === 'francesca-e-luca';
  const coupleNames = isFrancesca ? 'Francesca & Luca' : 'Elena & Davide';

  const [activeGame, setActiveGame] = useState<'none' | 'quiz' | 'puzzle' | 'scratch'>('none');
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
        
        {/* HEADER FESTA */}
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
            Maxischermo Proiettore
          </button>
        </div>

        {/* HUB GIOCHI E SCATTO FOTO IN ALTO */}
        <div className="bg-white border-2 border-[#D4AF37] p-8 rounded-3xl shadow-lg text-center mb-12">
          <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">
            Hub Intrattenimento Festa
          </span>
          <h2 className="font-serif text-3xl text-[#1E293B] mb-6">Giochi & Scatto Foto per la Sala</h2>

          {/* BOTTONI SELEZIONE GIOCHI & CAMERA */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <button
              onClick={() => setActiveGame(activeGame === 'quiz' ? 'none' : 'quiz')}
              className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                activeGame === 'quiz' ? 'bg-[#8B1E24] text-white border-[#8B1E24]' : 'bg-[#FAF7F2] border-[#E2E8F0] text-[#1E293B] hover:border-[#D4AF37]'
              }`}
            >
              <Gamepad2 className="w-6 h-6 text-[#D4AF37]" />
              <span>🧠 Love Quiz</span>
            </button>

            <button
              onClick={() => setActiveGame(activeGame === 'puzzle' ? 'none' : 'puzzle')}
              className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                activeGame === 'puzzle' ? 'bg-[#8B1E24] text-white border-[#8B1E24]' : 'bg-[#FAF7F2] border-[#E2E8F0] text-[#1E293B] hover:border-[#D4AF37]'
              }`}
            >
              <Puzzle className="w-6 h-6 text-[#D4AF37]" />
              <span>🧩 Puzzle Foto</span>
            </button>

            <button
              onClick={() => setActiveGame(activeGame === 'scratch' ? 'none' : 'scratch')}
              className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                activeGame === 'scratch' ? 'bg-[#8B1E24] text-white border-[#8B1E24]' : 'bg-[#FAF7F2] border-[#E2E8F0] text-[#1E293B] hover:border-[#D4AF37]'
              }`}
            >
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              <span>🎟️ Scratch Foto</span>
            </button>

            {/* BOTTONE APERTURA FOTOCAMERA */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-4 rounded-2xl bg-[#D4AF37] text-white border border-[#D4AF37] text-xs font-bold flex flex-col items-center gap-2 shadow-md hover:bg-[#B59226]"
            >
              <Camera className="w-6 h-6 text-white animate-bounce" />
              <span>📸 Scatta Foto/Video</span>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*,video/*"
            capture="environment"
            className="hidden"
            onChange={handleUpload}
          />

          {/* CONTENUTO DEL GIOCO SELEZIONATO */}
          {activeGame === 'quiz' && <LoveQuiz coupleNames={coupleNames} />}
          
          {activeGame === 'scratch' && (
            <div className="py-6">
              <p className="text-xs text-[#64748B] mb-4">Gratta con il dito per svelare lo scatto segreto degli sposi!</p>
              <ScratchDate day="28" month="Settembre" year="2026" />
            </div>
          )}

          {activeGame === 'puzzle' && (
            <div className="py-6 bg-[#FAF7F2] p-6 rounded-2xl border border-[#E2E8F0]">
              <p className="font-serif text-lg font-bold text-[#1E293B] mb-2">🧩 Puzzle Foto degli Sposi</p>
              <p className="text-xs text-[#64748B] mb-4">Ricomponi l'immagine spostando i tasselli con il dito!</p>
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80"
                alt="Puzzle"
                className="w-full max-w-xs mx-auto rounded-2xl shadow-md border-2 border-dashed border-[#D4AF37]"
              />
            </div>
          )}
        </div>

        {/* FEED FOTO DEGLI INVITATI */}
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

        {/* PROIETTORE MAXISCHERMO */}
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
