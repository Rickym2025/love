"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface EnvelopeWaxProps {
  coupleNames?: string;
  weddingDate?: string;
  initials?: string;
  audioUrl?: string;
  themeColor?: string;
  onOpen?: () => void;
  children?: React.ReactNode;
}

export default function EnvelopeWax({
  coupleNames = "Elena & Davide",
  weddingDate = "24 MAGGIO 2026",
  initials = "E&D",
  audioUrl,
  themeColor = "#D4AF37",
  onOpen,
  children,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const audio = (document.getElementById("love-wedding-audio") as HTMLAudioElement) || new Audio(audioUrl);
    if (audio && typeof audio.play === "function") {
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
        <div
          onClick={handleOpen}
          className="relative w-[92%] max-w-[430px] h-[580px] bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#D4AF37]/30 cursor-pointer group flex flex-col justify-between p-8 select-none transition-transform duration-500 hover:scale-[1.01]"
          style={{
            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.4), inset 0 0 50px rgba(212, 175, 55, 0.12)",
          }}
        >
          {/* Motivo floreale stampato in rilievo ai lati (Embossing floreale) */}
          <div className="absolute inset-x-4 top-12 bottom-12 border-x border-dashed border-[#D4AF37]/20 pointer-events-none" />

          {/* Flap Superiore 3D Pieghevole */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#F5EFE6] rounded-t-2xl origin-top transition-all duration-700 border-b border-[#D4AF37]/40 z-10 shadow-md"
            style={{
              clipPath: "polygon(0 0, 50% 85%, 100% 0)",
              transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          />

          {/* Intestazione Sposi sulla Busta */}
          <div className="z-20 text-center pt-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-bold block mb-1">
              PARTECIPAZIONE DI MATRIMONIO
            </span>
            <h2 className="font-serif text-3xl text-[#1E293B] font-bold tracking-wide">{coupleNames}</h2>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mt-2">{weddingDate}</p>
          </div>

          {/* Sigillo in Ceralacca Bordeaux / Oro (Immagine 1) */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 ${
              isOpen ? "scale-150 opacity-0" : "scale-100 group-hover:scale-110"
            }`}
          >
            <div className="relative w-24 h-24 drop-shadow-[0_12px_20px_rgba(139,30,36,0.4)] flex items-center justify-center bg-[#8B1E24] rounded-full border-4 border-[#D4AF37]/60 shadow-inner">
              <span className="font-serif text-2xl text-[#D4AF37] italic font-bold tracking-tighter">{initials}</span>
            </div>
          </div>

          {/* Dicitura "TOCCA PER APRIRE" in Italiano */}
          <div className="z-20 text-center pb-4">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.25em] animate-pulse block mb-1">
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
