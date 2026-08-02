'use client';

import React, { useState } from 'react';
import { Camera, Tv, Heart, X, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';

interface PhotoItem {
  id: string;
  url: string;
  author: string;
  caption: string;
  effectId: string;
}

// 10 EFFETTI E CORNICI D'ÉLITE
export const PHOTO_EFFECTS = [
  { id: 'just-married', name: '💍 Just Married', frameStyle: 'border-8 border-double border-[#D4AF37] p-2 bg-white', filter: 'none' },
  { id: 'cheers', name: '🥂 Love & Cheers', frameStyle: 'border-[12px] border-[#FAF7F2] shadow-xl p-3 bg-gradient-to-b from-amber-50 to-white', filter: 'contrast(1.05) brightness(1.02)' },
  { id: 'golden-hour', name: '✨ Golden Hour', frameStyle: 'border-4 border-[#D4AF37]', filter: 'sepia(0.35) saturate(1.4) brightness(1.05)' },
  { id: 'bw-glamour', name: '🖤 B&W Glamour', frameStyle: 'border-8 border-[#1E293B]', filter: 'grayscale(1) contrast(1.2)' },
  { id: 'polaroid', name: '📸 Retro Polaroid', frameStyle: 'border-[14px] border-b-[40px] border-white shadow-2xl', filter: 'sepia(0.2) contrast(0.9) brightness(1.1)' },
  { id: 'rose-gold', name: '🌹 Rose Gold', frameStyle: 'border-4 border-amber-300/80 shadow-md', filter: 'hue-rotate(-20deg) saturate(1.2) brightness(1.05)' },
  { id: 'cinematic', name: '🎬 Cinematic Film', frameStyle: 'border-y-8 border-x-2 border-slate-900', filter: 'contrast(1.3) saturate(0.8)' },
  { id: 'neon-party', name: '🎉 Party Neon', frameStyle: 'border-4 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]', filter: 'saturate(1.8) contrast(1.1)' },
  { id: 'floral-arch', name: '🌿 Arch Floreale', frameStyle: 'border-8 border-emerald-100 rounded-t-full p-2', filter: 'saturate(1.1) hue-rotate(10deg)' },
  { id: 'vintage-1920', name: '📜 Vintage 1920', frameStyle: 'border-8 border-amber-900/30 p-1', filter: 'sepia(0.8) contrast(0.8) brightness(0.9)' },
];

export default function PhotoWallSection({ coupleNames = 'gli Sposi' }: { coupleNames?: string }) {
  const [photos, setPhotos] = useState<PhotoItem[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
      author: 'Marco & Giulia',
      caption: 'W gli Sposi! 🎉',
      effectId: 'just-married',
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      author: 'Alessia',
      caption: 'Un giorno indimenticabile ❤️',
      effectId: 'golden-hour',
    },
  ]);

  const [isProjector, setIsProjector] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Form Upload Foto Nuovo Invitato
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [selectedEffect, setSelectedEffect] = useState('just-married');

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl && !newAuthor) return;

    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      url: newPhotoUrl || 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
      author: newAuthor || 'Ospite Anonimo',
      caption: newCaption || 'Viva gli Sposi!',
      effectId: selectedEffect,
    };

    setPhotos([newPhoto, ...photos]);
    setShowUploadModal(false);
    setNewPhotoUrl('');
    setNewAuthor('');
    setNewCaption('');
  };

  const currentEffect = PHOTO_EFFECTS.find((e) => e.id === photos[activeIdx]?.effectId) || PHOTO_EFFECTS[0];

  return (
    <section className="py-16 px-6 max-w-6xl mx-auto text-center">
      {/* HEADER GALLERIA */}
      <div className="bg-[#FAF7F2] border border-[#D4AF37]/30 p-8 rounded-3xl shadow-sm mb-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-left">
          <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest block mb-1">
            ✦ Guest Photo Wall
          </span>
          <h3 className="font-serif text-3xl text-[#1E293B] font-bold">I Ricordi della Festa</h3>
          <p className="text-xs text-slate-500 mt-1">Scatta, applica 10 filtri d'autore e condividi con {coupleNames}!</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-5 py-3 rounded-full bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
          >
            <Camera className="w-4 h-4 text-[#D4AF37]" />
            Carica Foto Festa
          </button>

          <button
            onClick={() => setIsProjector(true)}
            className="px-5 py-3 rounded-full bg-[#D4AF37] text-slate-900 text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md flex items-center gap-2"
          >
            <Tv className="w-4 h-4 animate-pulse" />
            Maxischermo Proiettore
          </button>
        </div>
      </div>

      {/* GRIGLIA POLAROID CON FILTRI APPLICATI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {photos.map((p) => {
          const fx = PHOTO_EFFECTS.find((e) => e.id === p.effectId) || PHOTO_EFFECTS[0];
          return (
            <div
              key={p.id}
              className={`bg-white p-4 rounded-2xl shadow-lg border border-slate-100 transform hover:-rotate-1 transition-all duration-300 ${fx.frameStyle}`}
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-[#FAF7F2]">
                <img
                  src={p.url}
                  alt={p.caption}
                  className="w-full h-full object-cover transition-all duration-300"
                  style={{ filter: fx.filter }}
                />
              </div>
              <p className="font-serif italic text-sm text-[#1E293B] mb-1">"{p.caption}"</p>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#D4AF37] pt-2 border-t border-slate-100">
                <span>— {p.author}</span>
                <span className="text-[10px] text-slate-400 font-normal">{fx.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODALE UPLOAD FOTO CON SELEZIONE DEI 10 EFFETTI */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-[#1E293B]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] p-6 rounded-3xl max-w-lg w-full border border-[#D4AF37] text-left shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-serif text-xl font-bold text-[#1E293B]">Carica la tua Foto per gli Sposi</h4>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-500 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPhoto} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL Immagine o Foto Smartphone</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Il tuo Nome / Nomi Invitati</label>
                <input
                  type="text"
                  placeholder="Es. Zio Carlo o Giulia & Marco"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dedica per gli Sposi</label>
                <input
                  type="text"
                  placeholder="Es. Siete stupendi! Viva gli Sposi 🎉"
                  required
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* SELETTORE DEI 10 EFFETTI */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Scegli Cornice o Filtro (10 Effetti)</label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-1">
                  {PHOTO_EFFECTS.map((fx) => (
                    <button
                      key={fx.id}
                      type="button"
                      onClick={() => setSelectedEffect(fx.id)}
                      className={`p-2 rounded-xl text-xs text-left font-medium border transition-all ${
                        selectedEffect === fx.id
                          ? 'border-[#D4AF37] bg-[#D4AF37]/20 text-[#1E293B] font-bold'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-amber-50'
                      }`}
                    >
                      {fx.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D4AF37] text-slate-900 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-amber-400 transition"
              >
                Pubblica sulla Galleria della Festa 🎉
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODALITÀ MAXISCHERMO PROIETTORE FESTA */}
      {isProjector && (
        <div className="fixed inset-0 z-50 bg-[#0F172A] text-white flex flex-col items-center justify-between p-8 select-none">
          <button
            onClick={() => setIsProjector(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800 text-white hover:bg-slate-700"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="my-auto text-center max-w-3xl">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-widest block mb-4 animate-pulse">
              📺 PROIEZIONE LIVE FESTA DI MATRIMONIO — {coupleNames}
            </span>
            
            <div className={`aspect-square max-w-md mx-auto bg-white p-4 rounded-3xl shadow-2xl mb-6 ${currentEffect.frameStyle}`}>
              <img
                src={photos[activeIdx]?.url}
                alt="Foto Festa"
                className="w-full h-full object-cover rounded-2xl"
                style={{ filter: currentEffect.filter }}
              />
            </div>
            
            <h2 className="font-serif text-3xl text-amber-100 font-light mb-2">"{photos[activeIdx]?.caption}"</h2>
            <p className="text-sm font-bold uppercase tracking-widest text-[#D4AF37]">
              — {photos[activeIdx]?.author}
            </p>

            {/* NAVIGAZIONE PROIETTORE */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
                className="px-4 py-2 bg-slate-800 rounded-full text-xs hover:bg-slate-700"
              >
                ◄ Precedente
              </button>
              <button
                onClick={() => setActiveIdx((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
                className="px-4 py-2 bg-slate-800 rounded-full text-xs hover:bg-slate-700"
              >
                Successiva ►
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-400 uppercase tracking-widest">
            Inquadra il QR Code sul tavolo per caricare le tue foto dal vivo sullo schermo!
          </p>
        </div>
      )}
    </section>
  );
}
