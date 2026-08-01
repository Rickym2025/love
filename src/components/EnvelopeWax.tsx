'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';

interface EnvelopeWaxProps {
  initials?: string; // es. "R & L"
  coupleNames?: string; // es. "Renzo & Lucia"
  weddingDate?: string; // es. "28 Settembre 2026"
  children: React.ReactNode; // Il contenuto del sito che appare dopo l'apertura
}

export default function EnvelopeWax({
  initials = 'R & L',
  coupleNames = 'Renzo & Lucia',
  weddingDate = '28 Settembre 2026',
  children,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleOpen = () => {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);

    // Riproduce un feedback sonoro leggero (opzionale)
    try {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch (e) {
      // Audio fallback se bloccato dal browser
    }

    // Lancio coriandoli dorati/eleganti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f3e5ab', '#ffffff', '#e11d48'],
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-slate-100 overflow-x-hidden">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 p-4 select-none"
          >
            {/* Titolo e Testo di benvenuto */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Invito Speciale
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl text-amber-100 font-light tracking-wide mb-2">
                {coupleNames}
              </h1>
              <p className="text-slate-400 text-sm tracking-widest uppercase">
                {weddingDate}
              </p>
            </motion.div>

            {/* LA BUSTA */}
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] bg-[#fbf8f3] rounded-xl shadow-2xl border border-amber-200/20 flex flex-col items-center justify-between p-6 overflow-hidden">
              {/* Texture carta materica */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

              {/* Flap superiore della busta */}
              <motion.div
                animate={
                  isAnimating
                    ? { rotateX: 180, zIndex: 0 }
                    : { rotateX: 0, zIndex: 20 }
                }
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: 'top' }}
                className="absolute top-0 left-0 right-0 h-1/2 bg-[#f4eee5] border-b border-amber-900/10 shadow-md rounded-t-xl flex items-end justify-center pb-2"
              >
                <div className="w-full h-full bg-gradient-to-b from-amber-900/5 to-transparent" />
              </motion.div>

              {/* Parte centrale con dettagli */}
              <div className="z-10 text-center my-auto">
                <p className="font-serif text-slate-800 text-lg italic mb-1">
                  Sei cordialmente invitato
                </p>
                <p className="text-slate-500 text-xs uppercase tracking-wider">
                  Tocca la ceralacca per aprire
                </p>
              </div>

              {/* SIGILLO IN CERALACCA ROSSA 3D */}
              <motion.button
                onClick={handleOpen}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={isAnimating ? { scale: [1, 1.2, 0], rotate: [0, 15, -15, 0] } : {}}
                transition={{ duration: 0.8 }}
                className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-red-600 via-rose-700 to-amber-900 shadow-[0_10px_25px_rgba(225,29,72,0.5)] border-2 border-rose-400/40 flex items-center justify-center cursor-pointer group"
              >
                {/* Dettaglio anello ceralacca */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-rose-300/30 flex items-center justify-center bg-rose-800/30 shadow-inner">
                  <span className="font-serif text-amber-100 text-lg sm:text-xl font-bold tracking-widest drop-shadow-md group-hover:scale-110 transition-transform">
                    {initials}
                  </span>
                </div>
                {/* Bagliore pulsante */}
                <span className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping opacity-75 pointer-events-none" />
              </motion.button>

              {/* Fondo della busta */}
              <div className="z-10 flex items-center gap-1 text-slate-400 text-xs italic">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Un giorno speciale da vivere insieme</span>
              </div>
            </div>

            <p className="mt-8 text-xs text-slate-500 tracking-wider uppercase">
              LOVE • RM Studio Experience
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENUTO DEL SITO CHE SI RIVELA QUANDO LA BUSTA VIENE APERTA */}
      {isOpen && (
        <motion.main
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.main>
      )}
    </div>
  );
}
