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
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: themeColor === 'blue' ? ['#70b5f9', '#ffffff', '#d4af37'] : ['#e5dacb', '#ffffff', '#d4af37'],
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 1000);
  };

  const isBlue = themeColor === 'blue';

  return (
    <div className={`relative min-h-screen ${isBlue ? 'bg-[#F0F7FF]' : 'bg-[#FAF7F2]'} text-[#1E293B] overflow-x-hidden`}>
      <audio id="love-wedding-audio" ref={audioRef} src={audioUrl} preload="auto" />

      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: `${8 + i * 10}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${7 + (i % 3) * 2}s`,
              }}
            >
              {isBlue ? '🕊️' : '🌸'}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.8 }}
            className={`fixed inset-0 z-50 flex flex-col items-center justify-center ${isBlue ? 'bg-[#F0F7FF]' : 'bg-[#FAF7F2]'} p-4 select-none`}
          >
            {/* INTESTAZIONE E NOMI SPOSI BEN VISIBILI IN ALTO FUORI DALLA BUSTA */}
            <div className="text-center mb-6 z-20">
              <span className="text-[#D4AF37] font-bold text-xs tracking-widest uppercase mb-1 block">
                Partecipazione di Nozze
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#1E293B] font-normal mb-1">
                {coupleNames}
              </h1>
              <p className="text-[#64748B] text-xs tracking-widest uppercase">
                {weddingDate}
              </p>
            </div>

            {/* BUSTA D'EPOCA VERTICALE */}
            <div className={`relative w-full max-w-sm aspect-[3/5] ${isBlue ? 'bg-[#E3F2FD] border-[#BBDEFB]' : 'bg-[#F5EFE6] border-[#E5DACB]'} rounded-3xl shadow-2xl border-2 flex flex-col items-center justify-between p-6 overflow-hidden`}>
              
              {/* Flap Triangolare Superiore */}
              <motion.div
                animate={isAnimating ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: 'top', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                className={`absolute top-0 left-0 right-0 h-[52%] ${isBlue ? 'bg-[#D0E7FF]' : 'bg-[#EFE8D8]'} border-b shadow-sm`}
              />

              {/* Flap Inferiore */}
              <div
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
                className={`absolute bottom-0 left-0 right-0 h-[52%] ${isBlue ? 'bg-[#E3F2FD]' : 'bg-[#F5EFE6]'} border-t shadow-inner pointer-events-none z-10`}
              />

              {/* SIGILLO IN CERALACCA DORATA AL CENTRO */}
              <button
                onClick={handleOpen}
                className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full flex items-center justify-center cursor-pointer transform active:scale-95 transition-transform"
              >
                <img
                  src="/wax-seal.png"
                  alt="Ceralacca"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                    if (target.nextElementSibling) {
                      (target.nextElementSibling as HTMLElement).style.display = 'flex';
                    }
                  }}
                />
                <div className="w-20 h-20 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#E6C363] to-[#997A15] hidden items-center justify-center text-white font-serif font-bold text-xl shadow-lg">
                  L❤️
                </div>
              </button>

              {/* TESTO IN ITALIANO POSIZIONATO IN BASSO (NESSUN TESTO DIETRO IL SIGILLO!) */}
              <div className="z-10 text-center mt-auto pb-4">
                <p className="font-serif text-[#1E293B] text-base italic mb-0.5">
                  Sei cordialmente invitato
                </p>
                <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest">
                  TOCCA PER APRIRE
                </p>
              </div>

              <div className="z-10 text-center text-[#64748B] text-xs font-serif italic">
                Sfoglia l'invito digitale
              </div>
            </div>

            <p className="mt-6 text-[10px] text-[#64748B] tracking-widest uppercase">
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
