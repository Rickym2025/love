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
      colors: ['#D4AF37', '#FAF7F2', '#EFE8D8', '#1E293B'],
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
            {/* BUSTA D'EPOCA VERTICALE CON EMBOSSED FLORAL PATTERN (IDENTICA ALL'IMMAGINE 1) */}
            <div className={`relative w-full max-w-sm aspect-[3/5] ${isBlue ? 'bg-[#E3F2FD] border-[#BBDEFB]' : 'bg-[#F5EFE6] border-[#E5DACB]'} rounded-2xl shadow-2xl border-2 flex flex-col items-center justify-between p-6 overflow-hidden`}>
              
              {/* Ricami floreali incisi ai lati */}
              <div className="absolute top-6 left-3 text-xs opacity-25 pointer-events-none font-serif select-none">🌿 🌸 🌿</div>
              <div className="absolute top-6 right-3 text-xs opacity-25 pointer-events-none font-serif select-none">🌿 🌸 🌿</div>
              <div className="absolute bottom-6 left-3 text-xs opacity-25 pointer-events-none font-serif select-none">🌿 🌸 🌿</div>
              <div className="absolute bottom-6 right-3 text-xs opacity-25 pointer-events-none font-serif select-none">🌿 🌸 🌿</div>

              {/* Risvolto Triangolare Superiore */}
              <motion.div
                animate={isAnimating ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
                transition={{ duration: 0.8 }}
                style={{ transformOrigin: 'top', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                className={`absolute top-0 left-0 right-0 h-[52%] ${isBlue ? 'bg-[#D0E7FF]' : 'bg-[#EFE8D8]'} border-b shadow-sm`}
              />

              {/* Risvolto Triangolare Inferiore */}
              <div
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
                className={`absolute bottom-0 left-0 right-0 h-[52%] ${isBlue ? 'bg-[#E3F2FD]' : 'bg-[#F5EFE6]'} border-t shadow-inner pointer-events-none z-10`}
              />

              <div className="z-10 text-center my-auto">
                <p className="font-serif text-[#1E293B] text-xl italic mb-1">
                  {coupleNames}
                </p>
                <p className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mt-2">
                  TAP TO OPEN
                </p>
              </div>

              {/* UNICO SIGILLO CERALACCA BORGOGNA / ORO (NESSUN DOPPIO RETTANGOLO) */}
              <button
                onClick={handleOpen}
                className="z-30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center cursor-pointer transform active:scale-95 transition-transform"
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
                <div className="w-18 h-18 rounded-full border-2 border-[#D4AF37] bg-gradient-to-br from-[#8B1E24] via-[#6E1216] to-[#4A0A0D] hidden items-center justify-center text-[#D4AF37] font-serif font-bold text-lg shadow-xl">
                  R&Z
                </div>
              </button>

              <div className="z-10 text-center text-[#64748B] text-[10px] font-serif italic">
                {weddingDate}
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
