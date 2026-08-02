'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import LoveQuiz from '@/components/LoveQuiz';
import ScratchPhoto from '@/components/ScratchPhoto';
import PhotoPuzzle from '@/components/PhotoPuzzle';
import { Camera, Tv, ArrowLeft, X, Sparkles, Puzzle, Gamepad2, Trophy } from 'lucide-react';

export default function FestaPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const isFrancesca = slug === 'francesca-e-luca';
  const coupleNames = isFrancesca ? 'Francesca & Luca' : 'Elena & Davide';

  const [activeGame, setActiveGame] = useState<'none' | 'quiz' | 'puzzle' | 'scratch'>('none');
  const [prizeText, setPrizeText] = useState('');
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<'none' | 'married' | 'cheers'>('none');
  const [selectedFilter, setSelectedFilter] = useState<'normal' | 'warm' | 'bw'>('normal');

  const [photos, setPhotos] = useState([
    { id: '1', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', author: 'Marco', caption: 'Evviva gli Sposi! 🎉' },
    { id: '2', url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80', author: 'Giulia', caption: 'Bellissimi! ❤️' },
  ]);

  const [isProjector, setIsProjector] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleWinQuiz = () => setPrizeText('🍹 Hai vinto un Drink/Cocktail offerto dagli Sposi!');
  const handleWinPuzzle = () => setPrizeText('💃 Hai vinto un Ballo speciale con la Sposa!');
  const handleWinScratch = () => setPrizeText('🕺 Hai vinto un Ballo scatenato con lo Sposo!');

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
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] p-6 sm:p-12 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER FESTA */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#E2E8F0]">
          <Link href={`/${slug}`} className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
            <ArrowLeft className="w-4 h-4" /> Torna all'Invito
          </Link>
          <span className="font-serif text-xl font-bold">{coupleNames} • La Festa</span>
          <button
            onClick={() => setIsProjector(true)}
            className="px-5 py-2.5 rounded-full bg-[#D4AF37] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-[#B59226] shadow-md"
          >
            <Tv className="w-4 h-4 animate-pulse" />
            Maxischermo Proiettore
          </button>
        </div>

        {/* HUB GIOCHI E SCATTO FOTO IN ALTO */}
        <div className="bg-white border-2 border-[#D4AF37] p-8 rounded-3xl shadow-lg text-center mb-12">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block mb-2">
            Hub Intrattenimento Festa
          </span>
          <h2 className="font-serif text-3xl text-[#1E293B] mb-6">Giochi & Scatto Foto per la Sala</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <button
              onClick={() => setActiveGame(activeGame === 'quiz' ? 'none' : 'quiz')}
              className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                activeGame === 'quiz' ? 'bg-[#D4AF37] text-white' : 'bg-[#FAF7F2] border-[#E2E8F0] text-[#1E293B]'
              }`}
            >
              <Gamepad2 className="w-6 h-6" />
              <span>🧠 Love Quiz</span>
            </button>

            <button
              onClick={() => setActiveGame(activeGame === 'puzzle' ? 'none' : 'puzzle')}
              className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                activeGame === 'puzzle' ? 'bg-[#D4AF37] text-white' : 'bg-[#FAF7F2] border-[#E2E8F0] text-[#1E293B]'
              }`}
            >
              <Puzzle className="w-6 h-6" />
              <span>🧩 Puzzle Foto</span>
            </button>

            <button
              onClick={() => setActiveGame(activeGame === 'scratch' ? 'none' : 'scratch')}
              className={`p-4 rounded-2xl border text-xs font-bold flex flex-col items-center gap-2 transition-all ${
                activeGame === 'scratch' ? 'bg-[#D4AF37] text-white' : 'bg-[#FAF7F2] border-[#E2E8F0] text-[#1E293B]'
              }`}
            >
              <Sparkles className="w-6 h-6" />
              <span>🎟️ Gratta la Foto</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-4 rounded-2xl bg-[#D4AF37] text-white text-xs font-bold flex flex-col items-center gap-2 shadow-md hover:bg-[#B59226]"
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
          {activeGame === 'puzzle' && <PhotoPuzzle onWin={handleWinPuzzle} />}
          {activeGame === 'scratch' && <ScratchPhoto onWin={handleWinScratch} />}
        </div>

        {/* FEED FOTO DEGLI INVITATI SELEZIONABILI PER EDITOR */}
        <div className="grid sm:grid-cols-3 gap-6">
          {photos.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPhoto(p)}
              className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-md transform hover:-rotate-1 transition-transform cursor-pointer group"
            >
              <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-[#FAF7F2] relative">
                <img
                  src={p.url}
                  alt={p.caption}
                  className={`w-full h-full object-cover transition-all ${
                    selectedFilter === 'warm' ? 'sepia-[0.3] contrast-105' : selectedFilter === 'bw' ? 'grayscale' : ''
                  }`}
                />
                {selectedFrame === 'married' && (
                  <span className="absolute top-2 left-2 bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    Just Married 💍
                  </span>
                )}
                {selectedFrame === 'cheers' && (
                  <span className="absolute bottom-2 right-2 bg-[#1E293B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    Love & Cheers 🥂
                  </span>
                )}
              </div>
              <p className="font-serif italic text-sm mb-1">"{p.caption}"</p>
              <p className="text-xs font-bold text-[#D4AF37]">— {p.author}</p>
            </div>
          ))}
        </div>

        {/* MODAL EDITOR FOTO CON FILTRI E CORNICI */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white border-2 border-[#D4AF37] p-6 rounded-3xl max-w-sm w-full text-center shadow-2xl relative">
              <button onClick={() => setSelectedPhoto(null)} className="absolute top-4 right-4 text-slate-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="font-serif text-lg font-bold text-[#1E293B] mb-3">Editor Foto Invitato</h3>

              <div className="aspect-[3/4] max-w-xs mx-auto rounded-xl overflow-hidden shadow-md mb-4 relative">
                <img
                  src={selectedPhoto.url}
                  alt="Editor"
                  className={`w-full h-full object-cover ${
                    selectedFilter === 'warm' ? 'sepia-[0.3]' : selectedFilter === 'bw' ? 'grayscale' : ''
                  }`}
                />
                {selectedFrame === 'married' && (
                  <span className="absolute top-2 left-2 bg-[#D4AF37] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                    Just Married 💍
                  </span>
                )}
              </div>

              {/* CONTROLLI FILTRI E CORNICI */}
              <div className="space-y-2 mb-4 text-xs">
                <div className="flex justify-center gap-2">
                  <button onClick={() => setSelectedFrame('none')} className="px-3 py-1 rounded-full border">No Cornice</button>
                  <button onClick={() => setSelectedFrame('married')} className="px-3 py-1 rounded-full bg-[#D4AF37] text-white font-bold">Just Married 💍</button>
                </div>
                <div className="flex justify-center gap-2">
                  <button onClick={() => setSelectedFilter('normal')} className="px-3 py-1 rounded-full border">Normale</button>
                  <button onClick={() => setSelectedFilter('warm')} className="px-3 py-1 rounded-full border">Warm Sunset</button>
                  <button onClick={() => setSelectedFilter('bw')} className="px-3 py-1 rounded-full border">B&W Noir</button>
                </div>
              </div>

              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-full py-3 rounded-xl bg-[#D4AF37] text-white font-bold text-xs uppercase tracking-wider"
              >
                Applica & Trasmetti al Maxischermo 📺
              </button>
            </div>
          </div>
        )}

        {/* POPUP PREMIO VITTORIA GIOCO */}
        {prizeText && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-md">
            <div className="bg-white border-4 border-[#D4AF37] p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl relative">
              <button onClick={() => setPrizeText('')} className="absolute top-4 right-4 text-slate-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
              <Trophy className="w-16 h-16 text-[#D4AF37] mx-auto mb-3 animate-bounce" />
              <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-2">VITTORIA! 🎉</h3>
              <p className="text-sm font-bold text-[#D4AF37] my-4 p-4 bg-[#FAF7F2] rounded-2xl border border-[#E2E8F0]">
                {prizeText}
              </p>
              <button
                onClick={() => {
                  setPrizeText('');
                  fileInputRef.current?.click();
                }}
                className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-white font-bold text-xs uppercase tracking-widest shadow-md hover:bg-[#B59226]"
              >
                Riscatta con un Selfie 📷
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
