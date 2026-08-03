"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface EnvelopeWaxProps {
  initials?: string;
  coupleNames?: string;
  weddingDate?: string;
  audioUrl?: string;
  themeColor?: string;
  onOpen?: () => void;
  children?: React.ReactNode;
}

export default function EnvelopeWax({
  initials = "R&Z",
  coupleNames = "Zohan & Rose",
  weddingDate = "27 SETTEMBRE 2026",
  audioUrl,
  onOpen,
  children,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const audio = document.getElementById("love-wedding-audio") as HTMLAudioElement;
    if (audio) {
      audio.play().catch((err) => console.log("Autoplay audio limitato dal browser:", err));
    }

    if (onOpen) onOpen();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1E293B]/80 backdrop-blur-md transition-opacity duration-1000 ${
          isOpen ? "opacity-0 pointer-events-none delay-700" : "opacity-100"
        }`}
      >
        {/* Busta Materica Avorio con Ricamo Floreale 3D */}
        <div
          onClick={handleOpen}
          className="relative w-[92%] max-w-[430px] h-[600px] bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#D4AF37]/30 cursor-pointer group flex flex-col justify-between p-8 select-none transition-transform duration-500 hover:scale-[1.01] overflow-hidden"
          style={{
            boxShadow: "0 30px 70px -15px rgba(0,0,0,0.5), inset 0 0 50px rgba(212,175,55,0.12)",
          }}
        >
          {/* Motivo Floreale in Rilievo Bianco Embossed ai Lati (Come Immagine 1) */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Flap Triangolare Superiore Pieghevole */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#F7F2E8] rounded-t-2xl origin-top transition-transform duration-700 border-b border-[#D4AF37]/30 z-10 shadow-md"
            style={{
              clipPath: "polygon(0 0, 50% 80%, 100% 0)",
              transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          />

          {/* Intestazione Sposi sulla Busta */}
          <div className="z-20 text-center pt-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-1">
              PARTECIPAZIONE DI MATRIMONIO
            </span>
            <h2 className="font-serif text-3xl text-[#1E293B] font-bold tracking-wide">{coupleNames}</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mt-2">{weddingDate}</p>
          </div>

          {/* SIGILLO IN CERALACCA BORDEAUX CON INIZIALI ORO 3D */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
              isOpen ? "scale-150 opacity-0" : "scale-100 group-hover:scale-110"
            }`}
          >
            <div className="relative w-28 h-28 drop-shadow-[0_12px_24px_rgba(139,30,36,0.5)] flex items-center justify-center bg-[#8B1E24] rounded-full border-4 border-[#D4AF37]/60 shadow-inner">
              <span className="font-serif text-3xl text-[#D4AF37] italic font-bold tracking-tighter drop-shadow-md">
                {initials}
              </span>
            </div>
          </div>

          {/* Dicitura "TOCCA PER APRIRE" in Italiano con Freccia */}
          <div className="z-20 text-center pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.25em] animate-bounce block mb-1">
              ^
            </span>
            <span className="text-xs font-bold text-[#1E293B] uppercase tracking-[0.2em]">
              TOCCA PER APRIRE
            </span>
          </div>
        </div>
      </div>

      {children}
    </>
  );
}
