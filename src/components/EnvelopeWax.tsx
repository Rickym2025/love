"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface EnvelopeWaxProps {
  coupleNames?: string;
  onOpen?: () => void;
}

export default function EnvelopeWax({
  coupleNames = "Elena & Davide",
  onOpen,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    if (onOpen) onOpen();
  };

  return (
    <div className="w-full my-4 flex flex-col items-center justify-center select-none">
      <div
        onClick={handleOpen}
        className={`w-full max-w-sm aspect-[4/5] bg-[#FAF7F2] rounded-3xl border-2 border-[#D4AF37]/40 shadow-2xl relative overflow-hidden transition-all duration-700 cursor-pointer ${
          isOpen ? "scale-95 opacity-20 pointer-events-none" : "hover:scale-[1.02]"
        }`}
      >
        {/* RILIEVI FLOREALI SUI LATI (STILE FOTO 1) */}
        <div className="absolute inset-y-0 left-2 w-12 opacity-30 pointer-events-none bg-[radial-[#D4AF37]_1px,transparent_1px)] [background-size:12px_12px]" />
        <div className="absolute inset-y-0 right-2 w-12 opacity-30 pointer-events-none bg-[radial-[#D4AF37]_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* LEMBO INFERIORE E SUPERIORE A V */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-[#F5EFE6] border-b border-[#D4AF37]/30 [clip-path:polygon(0_0,100%_0,50%_100%)] drop-shadow-sm" />
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-[#F5EFE6] border-t border-[#D4AF37]/30 [clip-path:polygon(0_100%,100%_100%,50%_0)] drop-shadow-sm" />

        {/* SIGILLO CERALACCA BORDEAUX CENTRALE (FOTO 1) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <div className="relative w-20 h-20 drop-shadow-xl animate-pulse">
            <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
          </div>

          <span className="font-serif font-bold text-xs uppercase tracking-widest text-[#8B6508] mt-4 bg-white/90 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-sm">
            ▲ TOCCA PER APRIRE
          </span>

          <p className="font-serif font-bold text-base text-[#1E293B] mt-2 drop-shadow-xs">
            {coupleNames}
          </p>
        </div>
      </div>
    </div>
  );
}
