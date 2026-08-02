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
  initials = "L",
  audioUrl,
  themeColor = "#D4AF37",
  onOpen,
  children,
}: EnvelopeWaxProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Gestione audio condiviso o audioUrl dedicato
    const audio = (document.getElementById("love-wedding-audio") as HTMLAudioElement) || new Audio(audioUrl);
    if (audio && typeof audio.play === "function") {
      audio.play().catch((err) => console.log("Audio play prevented:", err));
    }

    if (onOpen) onOpen();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#1E293B]/90 backdrop-blur-md transition-opacity duration-1000 ${
          isOpen ? "opacity-0 pointer-events-none delay-700" : "opacity-100"
        }`}
      >
        <div
          onClick={handleOpen}
          className="relative w-[90%] max-w-[420px] h-[280px] bg-[#FAF7F2] rounded-lg shadow-2xl border border-[#D4AF37]/30 cursor-pointer group flex flex-col justify-between p-6 select-none transition-transform duration-300 hover:scale-[1.02]"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 40px rgba(212, 175, 55, 0.15)",
          }}
        >
          {/* Flap 3D Pieghevole Superiore */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 bg-[#F3EDE2] rounded-t-lg origin-top transition-all duration-700 border-b border-[#D4AF37]/40 z-10"
            style={{
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              transform: isOpen ? "rotateX(180deg)" : "rotateX(0deg)",
            }}
          />

          {/* Nomi Sposi */}
          <div className="z-20 text-center pt-2">
            <p className="font-serif text-2xl text-[#1E293B] tracking-wide font-bold">{coupleNames}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-sans mt-1">{weddingDate}</p>
          </div>

          {/* Sigillo in Ceralacca Dorato */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-transform duration-500 ${
              isOpen ? "scale-150 opacity-0" : "scale-100 group-hover:scale-110"
            }`}
          >
            <div className="relative w-20 h-20 drop-shadow-[0_10px_15px_rgba(212,175,55,0.4)]">
              <Image src="/wax-seal.png" alt="Sigillo Ceralacca Love" fill className="object-contain" priority />
            </div>
          </div>

          {/* Dicitura Invito */}
          <div className="z-20 text-center pb-2">
            <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-widest animate-pulse">
              ✦ TOCCA PER APRIRE ✦
            </span>
          </div>
        </div>
      </div>

      {/* Rende i figli trasmessi dal layout/page */}
      {children}
    </>
  );
}
