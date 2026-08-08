"use client";

import React, { useState } from "react";
import { Heart, Sparkles } from "lucide-react";

export interface EnvelopeWaxProps {
  coupleNames?: string;
  waxSealUrl?: string; // PROP PER IL SIGILLO PERSONALIZZATO
  inline?: boolean;
  onOpen?: () => void;
}

export default function EnvelopeWax({
  coupleNames = "Elena & Davide",
  waxSealUrl = "/wax-seal.png",
  inline = false,
  onOpen,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (typeof onOpen === "function") {
      onOpen();
    }
  };

  const sealImgSrc = waxSealUrl || "/wax-seal.png";

  return (
    <div className={`w-full flex flex-col items-center justify-center select-none ${inline ? "py-2" : "py-8"}`}>
      {!isOpen ? (
        <div
          onClick={handleOpen}
          className="relative w-72 sm:w-80 h-48 sm:h-52 bg-[#F3E8FF] rounded-2xl border-2 border-[#D4AF37] shadow-2xl flex flex-col items-center justify-center p-4 cursor-pointer hover:scale-105 transition-all group overflow-hidden"
        >
          {/* LEMBI E SFUMATURA BUSTA A V */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#F3E8FF] to-[#E9D5FF] opacity-90" />
          <div className="absolute top-0 inset-x-0 h-24 border-b-2 border-[#D4AF37]/40 bg-[#FAF7F2]/60 [clip-path:polygon(0_0,_100%_0,_50%_100%)] shadow-inner" />

          {/* SIGILLO IN CERALACCA 3D REATTIVO */}
          <div className="relative z-20 w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_10px_15px_rgba(212,175,55,0.5)] group-hover:rotate-6 transition-transform">
            <img
              src={sealImgSrc}
              alt="Sigillo Ceralacca 3D"
              className="w-full h-full object-contain rounded-full"
            />
          </div>

          <span className="relative z-20 text-[10px] sm:text-xs font-serif font-bold text-[#8B6508] uppercase tracking-widest mt-2 animate-pulse flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Tocca il Sigillo per Aprire
          </span>
        </div>
      ) : (
        <div className="p-4 bg-emerald-950/80 text-emerald-200 rounded-2xl border border-emerald-500 text-xs font-serif font-bold flex items-center gap-2 animate-fade-in">
          <Heart className="w-4 h-4 fill-emerald-400 text-emerald-400" /> Busta Aperta con Successo!
        </div>
      )}
    </div>
  );
}
