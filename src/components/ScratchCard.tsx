"use client";

import React, { useState } from "react";

export interface ScratchCardProps {
  day?: string;
  month?: string;
  year?: string;
  revealText?: string;
  subText?: string;
}

export default function ScratchCard({
  day = "24",
  month = "MAGGIO",
  year = "2026",
  revealText,
  subText,
}: ScratchCardProps) {
  const [isScratched, setIsScratched] = useState(false);

  // Se viene passato revealText (Landing Page)
  if (revealText) {
    return (
      <div 
        onClick={() => setIsScratched(true)}
        className="relative w-full max-w-md mx-auto h-28 bg-[#FAF7F2] rounded-2xl border-2 border-[#D4AF37]/40 shadow-inner flex flex-col items-center justify-center p-4 text-center select-none cursor-pointer overflow-hidden group"
      >
        <div className={`transition-opacity duration-500 ${isScratched ? "opacity-100" : "opacity-20 blur-sm"}`}>
          <span className="font-serif text-xl font-bold text-[#1E293B] block">{revealText}</span>
          {subText && <span className="text-xs text-slate-500 font-semibold block mt-1">{subText}</span>}
        </div>

        {!isScratched && (
          <div className="absolute inset-0 bg-[#D4AF37] flex items-center justify-center text-slate-900 font-bold text-xs uppercase tracking-widest group-hover:bg-amber-400 transition">
            ✦ Clicca / Gratta per Scoprire ✦
          </div>
        )}
      </div>
    );
  }

  // Se vengono passati day, month, year (3 Riquadri)
  return (
    <div className="flex justify-center items-center gap-3 my-4">
      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-center min-w-[70px]">
        <span className="font-serif text-lg font-bold text-[#1E293B] block">{day}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">GIORNO</span>
      </div>
      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-center min-w-[70px]">
        <span className="font-serif text-lg font-bold text-[#1E293B] block">{month}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">MESE</span>
      </div>
      <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-center min-w-[70px]">
        <span className="font-serif text-lg font-bold text-[#1E293B] block">{year}</span>
        <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">ANNO</span>
      </div>
    </div>
  );
}
