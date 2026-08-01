'use client';

import React, { useState } from 'react';
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
  initials = 'E & D',
  coupleNames = 'Elena & Davide',
  weddingDate = '28 Settembre 2026',
  audioUrl = 'https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3',
  themeColor = 'pink',
  children,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);

    try {
      const audio = new Audio(audioUrl);
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch (e) {}

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

  const envBg = themeColor === 'blue' ? 'bg-[#E3F2FD] border-[#BBDEFB]' : 'bg-[#F4EFE6] border-[#E5DACB]';
  const flapBg = themeColor === 'blue' ? 'bg-[#D0E7FF]' : 'bg-[#EFE8D8]';
  const waxBg = themeColor === 'blue' ? 'from-[#2196F3] via-[#1976D2] to-[#0D47A1]' : 'from-[#8B1E24] via-[#6E1216] to-[#4A0A0D]';

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#4A3D39] overflow-x-hidden">
      
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: `${8 + i * 10}%`,
                animationDelay: `${i * 0.9}s`,
                animationDuration: `${7 + (i % 3) * 2}s`,
              }}
            >
              {themeColor === 'blue' ? '🕊️' : '🌸'}
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
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] p-4 select-none"
          >
            <div className="text-center mb-6">
              <span className="text-[#8B1E24] text-xs font-semibold tracking-widest uppercase mb-1 block">
                Partecipazione di Nozze
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl text-[#4A3D39] font-normal mb-1">
                {coupleNames}
              </h1>
              <p className="text-[#9E8976] text-xs tracking-widest uppercase">
                {weddingDate}
              </p>
            </div>

            {/* STRUTTURA REALE DELLA BUSTA PIEGATA */}
            <div className={`relative w-full max-w-sm sm:max-w-md aspect-[3/4] ${envBg} rounded-2xl shadow-xl border flex flex-col items-center justify-between p-8 overflow-hidden`}>
              
              {/* Pattern Piegatura Vettoriale Interno */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Flap Triangolare della Busta */}
              <motion.div
                animate={isAnimating ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: 'top', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                className={`absolute top-0 left-0 right-0 h-1/2 ${flapBg} border-b shadow-sm flex items-end justify-center pb-2`}
              />

              <div className="z-10 text-center my-auto">
                <p className="font-serif text-[#4A3D39] text-xl italic mb-1">
                  Sei cordialmente invitato
                </p>
                <p className="text-[#9E8976] text-[10px] uppercase tracking-widest">
                  Tocca il sigillo per aprire
                </p>
              </div>

              {/* SIGILLO IN CERALACCA ANCORATO SENZA SPOSTAMENTI */}
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isAnimating ? { scale: [1, 1.2, 0] } : {}}
                transition={{ duration: 0.8 }}
                className={`z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${waxBg} shadow-2xl border-2 border-[#D4AF37]/60 flex items-center justify-center cursor-pointer`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-black/10">
                  <span className="font-serif text-[#FAF7F2] text-lg sm:text-xl font-bold tracking-widest drop-shadow">
                    {initials}
                  </span>
                </div>
              </motion.button>

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
