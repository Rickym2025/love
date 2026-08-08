"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export interface EnvelopeWaxProps {
  coupleNames?: string;
  waxSealUrl?: string;
  onOpen?: () => void;
  inline?: boolean;
}

export default function EnvelopeWax({
  coupleNames = "Elena & Davide",
  waxSealUrl = "/wax-seal.png",
  onOpen,
  inline = false,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    if (typeof onOpen === "function") {
      onOpen();
    }
  };

  const sealImageSrc = waxSealUrl || "/wax-seal.png";

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.08, y: -40 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`${
            inline
              ? "relative w-full max-w-[320px] h-[480px] mx-auto rounded-3xl overflow-hidden bg-[#FAF7F2]"
              : "fixed inset-0 z-50 w-screen h-screen bg-[#FAF7F2]"
          } flex flex-col items-center justify-center p-4 select-none overflow-hidden`}
        >
          {/* AURA GLOW DORATA IN BACKGROUND */}
          <div className="absolute w-80 h-80 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

          {/* BUSTA D'EPOCA AVORIO LUSSO CON RILIEVI FLOREALI */}
          <div
            onClick={handleOpenEnvelope}
            className="relative w-full max-w-[340px] h-[520px] bg-[#F7F3E9] rounded-3xl border-2 border-[#D4AF37]/40 shadow-2xl flex flex-col items-center justify-between p-6 text-center cursor-pointer group transition-all duration-300 hover:scale-[1.02] active:scale-95 overflow-hidden"
          >
            {/* TEXTURE CARTA AVORIO D'EPOCA */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#EAE0D5] opacity-90 pointer-events-none" />

            {/* CORNICE DORATA INTERNA SOTTILE */}
            <div className="absolute inset-3 border border-[#D4AF37]/30 rounded-2xl pointer-events-none z-10" />

            {/* PIEGA V SUPERIORE (TOP FLAP) CON SHADOW */}
            <div className="absolute top-0 inset-x-0 h-[260px] bg-gradient-to-b from-[#F2EBDC] to-[#E8DCB8]/60 border-b border-[#D4AF37]/40 [clip-path:polygon(0_0,_100%_0,_50%_100%)] shadow-md z-10" />

            {/* RILIEVI FLOREALI EMBOSSED SUI LEMBI IN SILK WHITE */}
            <svg
              className="absolute top-4 left-4 w-28 h-48 opacity-35 pointer-events-none z-10 text-[#8B6508]"
              viewBox="0 0 100 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20,10 Q40,50 15,100 T30,190" strokeDasharray="3,3" />
              <circle cx="25" cy="30" r="4" fill="currentColor" />
              <circle cx="15" cy="70" r="3" fill="currentColor" />
              <circle cx="35" cy="120" r="5" fill="currentColor" />
              <path d="M25,30 Q10,40 5,30 M25,30 Q40,20 45,25" />
              <path d="M35,120 Q50,110 55,115 M35,120 Q20,130 15,135" />
            </svg>

            <svg
              className="absolute top-4 right-4 w-28 h-48 opacity-35 pointer-events-none z-10 text-[#8B6508] scale-x-[-1]"
              viewBox="0 0 100 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M20,10 Q40,50 15,100 T30,190" strokeDasharray="3,3" />
              <circle cx="25" cy="30" r="4" fill="currentColor" />
              <circle cx="15" cy="70" r="3" fill="currentColor" />
              <circle cx="35" cy="120" r="5" fill="currentColor" />
              <path d="M25,30 Q10,40 5,30 M25,30 Q40,20 45,25" />
              <path d="M35,120 Q50,110 55,115 M35,120 Q20,130 15,135" />
            </svg>

            {/* TESTATA PARTECIPAZIONE */}
            <div className="relative z-20 pt-4 space-y-1">
              <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-[#8B6508] block">
                ✦ PARTECIPAZIONE DI NOZZE ✦
              </span>
              <h2 className="text-xl font-serif font-bold text-[#1E293B] drop-shadow-xs">
                {coupleNames}
              </h2>
            </div>

            {/* SIGILLO IN CERALACCA 3D CENTRALE */}
            <div className="relative z-30 my-auto flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_15px_25px_rgba(122,28,36,0.6)] transition-transform duration-300 group-hover:scale-110 active:scale-95">
                <img
                  src={sealImageSrc}
                  alt="Sigillo in Ceralacca 3D"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>

              {/* CHEVRON + SCRITTA TOCCA PER APRIRE */}
              <div className="pt-4 flex flex-col items-center gap-0.5">
                <ChevronUp className="w-4 h-4 text-[#8B6508] animate-bounce" />
                <span className="text-[10px] font-serif font-bold text-[#8B6508] uppercase tracking-[0.25em] group-hover:text-[#B8860B] transition-colors">
                  TOCCA PER APRIRE
                </span>
              </div>
            </div>

            {/* FOOTER BUSTA */}
            <div className="relative z-20 pb-2">
              <span className="text-[9px] font-serif italic text-slate-500">
                Siete invitati al nostro giorno speciale
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
