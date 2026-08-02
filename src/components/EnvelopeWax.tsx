'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface EnvelopeWaxProps {
  initials?: string;
  coupleNames?: string;
  weddingDate?: string;
  audioUrl?: string;
  themeColor?: 'pink' | 'blue';
  children: React.ReactNode;
}

export default function EnvelopeWax({
  coupleNames = 'Elena & Davide',
  weddingDate = '28 Settembre 2026',
  audioUrl = 'https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3',
  themeColor = 'pink',
  children,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: themeColor === 'blue' ? ['#70b5f9', '#ffffff', '#d4af37'] : ['#8b1e24', '#f4efe6', '#d4af37'],
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 1000);
  };

  const isBlue = themeColor === 'blue';

  return (
    <div className={`relative min-h-screen ${isBlue ? 'bg-[#F0F7FF]' : 'bg-[#FAF7F2]'} text-[#4A3D39] overflow-x-hidden`}>
      
      {/* UNICO ELEMENTO AUDIO NATIVO CONDIVISO CON LA PAGINA */}
      <audio id="love-wedding-audio" ref={audioRef} src={audioUrl} preload="auto" />

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8 }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${isBlue ? 'bg-[#F0F7FF]' : 'bg-[#FAF7F2]'} p-4 select-none`}
          >
            <div className="text-center mb-6">
              <span className="text-[#D4AF37] font-bold text-xs tracking-widest uppercase mb-1 block">
                Partecipazione di Nozze
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#4A3D39] font-normal mb-1">
                {coupleNames}
              </h1>
              <p className="text-[#9E8976] text-xs tracking-widest uppercase">
                {weddingDate}
              </p>
            </div>

            {/* BUSTA D'EPOCA RICAMATA CON PUNTALE TRIANGOLARE */}
            <div className={`relative w-full max-w-sm sm:max-w-md aspect-[3/4] ${isBlue ? 'bg-[#E3F2FD] border-[#BBDEFB]' : 'bg-[#F4EFE6] border-[#E5DACB]'} rounded-3xl shadow-2xl border flex flex-col items-center justify-between p-8 overflow-hidden`}>
              
              {/* Flap Triangolare della Busta */}
              <motion.div
                animate={isAnimating ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: 'top', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                className={`absolute top-0 left-0 right-0 h-1/2 ${isBlue ? 'bg-[#D0E7FF]' : 'bg-[#EFE8D8]'} border-b shadow-sm flex items-end justify-center pb-2`}
              />

              <div className="z-10 text-center my-auto">
                <p className="font-serif text-[#4A3D39] text-xl italic mb-1">
                  Sei cordialmente invitato
                </p>
                <p className="text-[#9E8976] text-[10px] uppercase tracking-widest">
                  Tocca il sigillo per aprire
                </p>
              </div>

              {/* SIGILLO IN CERALACCA (USO DI PUBLIC/WAX-SEAL.PNG O FALLBACK DORATO ANCORATO PERFETTAMENTE) */}
              <button
                onClick={handleOpen}
                className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transform active:scale-95 transition-transform"
              >
                <img
                  src="/wax-seal.png"
                  alt="Ceralacca"
                  className="w-full h-full object-contain drop-shadow-xl"
                  onError={(e) => {
                    // Fallback visivo se l'immagine non è ancora stata caricata
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#E6C363] to-[#997A15] flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg">
                  L❤️
                </div>
              </button>

              <div className="z-10 text-center text-[#9E8976] text-xs font-serif italic">
                Sfoglia l'invito digitale
              </div>
            </div>

            <p className="mt-6 text-[10px] text-[#9E8976] tracking-widest uppercase">
              LOVE • RM Studio Experience
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.main>
      )}
    </div>
  );
}
