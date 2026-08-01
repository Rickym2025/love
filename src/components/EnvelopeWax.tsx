'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

interface EnvelopeWaxProps {
  initials?: string;
  coupleNames?: string;
  weddingDate?: string;
  audioUrl?: string;
  children: React.ReactNode;
}

export default function EnvelopeWax({
  initials = 'E & D',
  coupleNames = 'Elena & Davide',
  weddingDate = '28 Settembre 2026',
  audioUrl = 'https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3',
  children,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);

    // Avvia la musica personalizzata degli sposi!
    try {
      const audio = new Audio(audioUrl);
      audio.volume = 0.5;
      audio.play().catch(() => {});
    } catch (e) {}

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f4efe6', '#ffffff', '#8b1e24'],
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 1100);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#4A3D39] overflow-x-hidden">
      
      {/* CADUTA PETALI ANIMATI QUANDO LA BUSTA È APERTA */}
      {isOpen && (
        <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${8 + (i % 3) * 2}s`,
              }}
            >
              🌸
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] p-4 select-none"
          >
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6"
            >
              <span className="text-[#8B1E24] text-xs font-semibold tracking-widest uppercase mb-2 block">
                Partecipazione di Nozze
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#4A3D39] font-normal mb-1">
                {coupleNames}
              </h1>
              <p className="text-[#9E8976] text-xs tracking-widest uppercase">
                {weddingDate}
              </p>
            </motion.div>

            {/* BUSTA D'EPOCA RICAMATA CON FLORAL EMBOSSING */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] bg-[#F4EFE6] rounded-2xl shadow-[0_15px_40px_rgba(139,115,85,0.15)] border border-[#E5DACB] flex flex-col items-center justify-between p-8 overflow-hidden">
              
              {/* Ricami Floreali agli angoli (Pattern Embossed) */}
              <div className="absolute top-4 left-4 text-xl opacity-30 pointer-events-none">🌿</div>
              <div className="absolute top-4 right-4 text-xl opacity-30 pointer-events-none">🌿</div>
              <div className="absolute bottom-4 left-4 text-xl opacity-30 pointer-events-none">🌸</div>
              <div className="absolute bottom-4 right-4 text-xl opacity-30 pointer-events-none">🌸</div>

              {/* Flap Superiore */}
              <motion.div
                animate={
                  isAnimating
                    ? { rotateX: 180, zIndex: 0 }
                    : { rotateX: 0, zIndex: 20 }
                }
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: 'top' }}
                className="absolute top-0 left-0 right-0 h-1/2 bg-[#EFE8D8] border-b border-[#D8CBB7] rounded-t-2xl flex items-end justify-center pb-2 shadow-sm"
              />

              <div className="z-10 text-center my-auto">
                <p className="font-serif text-[#4A3D39] text-xl italic mb-2">
                  Sei cordialmente invitato
                </p>
                <p className="text-[#9E8976] text-[10px] uppercase tracking-widest">
                  Tocca il sigillo per aprire
                </p>
              </div>

              {/* SIGILLO IN CERALACCA BORGOGNA CON ORO */}
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={isAnimating ? { scale: [1, 1.2, 0], rotate: [0, 10, -10, 0] } : {}}
                transition={{ duration: 0.8 }}
                className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#8B1E24] via-[#6E1216] to-[#4A0A0D] shadow-[0_10px_25px_rgba(139,30,36,0.35)] border-2 border-[#D4AF37]/50 flex items-center justify-center cursor-pointer group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#D4AF37]/30 flex items-center justify-center bg-[#8B1E24]/20 shadow-inner">
                  <span className="font-serif text-[#F4EFE6] text-lg sm:text-xl font-bold tracking-widest drop-shadow group-hover:scale-110 transition-transform">
                    {initials}
                  </span>
                </div>
              </motion.button>

              <div className="z-10 text-center text-[#9E8976] text-xs font-serif italic">
                Sfoglia la nostra storia d'amore
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
