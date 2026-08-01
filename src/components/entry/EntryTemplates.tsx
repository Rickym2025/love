'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import EnvelopeWax from '@/components/EnvelopeWax';
import { Scissors, Plane, Flower2, Sparkles, Heart } from 'lucide-react';

interface EntryProps {
  type?: 'wax_seal' | 'ribbon_cut' | 'passport' | 'flower';
  initials?: string;
  coupleNames?: string;
  weddingDate?: string;
  guestName?: string;
  children: React.ReactNode;
}

export default function EntryTemplates({
  type = 'wax_seal',
  initials = 'R & L',
  coupleNames = 'Renzo & Lucia',
  weddingDate = '28 Settembre 2026',
  guestName,
  children,
}: EntryProps) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerOpen = () => {
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#d4af37', '#f3e5ab', '#ffffff', '#e11d48'],
    });
    setIsOpen(true);
  };

  // Se è impostata la Ceralacca classica, usa EnvelopeWax
  if (type === 'wax_seal') {
    return (
      <EnvelopeWax
        initials={initials}
        coupleNames={coupleNames}
        weddingDate={weddingDate}
      >
        {children}
      </EnvelopeWax>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/30 p-4 select-none text-center"
          >
            {guestName && (
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium mb-4 animate-pulse">
                <Heart className="w-3.5 h-3.5 fill-amber-400" />
                <span>Benvenuto/a {guestName}!</span>
              </div>
            )}

            <h1 className="font-serif text-4xl sm:text-6xl text-amber-100 font-light mb-2">
              {coupleNames}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm tracking-widest uppercase mb-10">
              {weddingDate}
            </p>

            {/* TEMPLATE: TAGLIO DEL NASTRO */}
            {type === 'ribbon_cut' && (
              <div className="relative w-full max-w-md bg-slate-900 border border-amber-500/30 rounded-2xl p-8 flex flex-col items-center shadow-2xl">
                <div className="w-full h-12 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 rounded-full flex items-center justify-center relative shadow-lg my-6">
                  <motion.button
                    onClick={triggerOpen}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bg-slate-950 border-2 border-amber-400 text-amber-300 p-3 rounded-full shadow-2xl flex items-center gap-2 cursor-pointer"
                  >
                    <Scissors className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold uppercase tracking-wider pr-1">Taglia il Nastro</span>
                  </motion.button>
                </div>
                <p className="text-xs text-slate-400 italic">Tocca le forbici per inaugurare il nostro invito</p>
              </div>
            )}

            {/* TEMPLATE: PASSAPORTO D'AMORE */}
            {type === 'passport' && (
              <div className="relative w-full max-w-sm aspect-[3/4] bg-emerald-950 border-2 border-amber-400/40 rounded-2xl p-6 flex flex-col justify-between items-center shadow-2xl">
                <div className="text-amber-300 flex items-center gap-2">
                  <Plane className="w-6 h-6" />
                  <span className="font-serif text-lg tracking-widest uppercase font-bold">Boarding Pass</span>
                </div>
                <div className="my-auto text-center">
                  <div className="w-20 h-20 rounded-full border-2 border-amber-400/40 flex items-center justify-center mx-auto mb-3 bg-amber-500/10 text-amber-200 font-serif text-2xl font-bold">
                    {initials}
                  </div>
                  <h3 className="font-serif text-xl text-amber-100">Destinazione Matrimonio</h3>
                </div>
                <motion.button
                  onClick={triggerOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg"
                >
                  Convalida Imbarco
                </motion.button>
              </div>
            )}

            {/* TEMPLATE: BOCCIOLO DI FIORE BOTANICO */}
            {type === 'flower' && (
              <div className="relative w-full max-w-sm bg-slate-900/80 border border-slate-800 rounded-2xl p-8 flex flex-col items-center shadow-2xl">
                <Flower2 className="w-16 h-16 text-rose-400 animate-spin-slow mb-4" />
                <p className="font-serif text-lg text-slate-200 italic mb-6">Un fiore che sboccia per il nostro giorno</p>
                <motion.button
                  onClick={triggerOpen}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-rose-500/30 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Apri Bocciolo
                </motion.button>
              </div>
            )}

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
