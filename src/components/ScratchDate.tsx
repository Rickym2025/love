"use client";

import React, { useState } from "react";

export interface ScratchDateProps {
  day?: string;
  month?: string;
  year?: string;
}

export default function ScratchDate({
  day = "24",
  month = "MAGGIO",
  year = "2026",
}: ScratchDateProps) {
  const [scratchedTiles, setScratchedTiles] = useState({
    day: false,
    month: false,
    year: false,
  });

  const scratchTile = (tile: "day" | "month" | "year") => {
    setScratchedTiles((prev) => ({ ...prev, [tile]: true }));
  };

  return (
    <div className="flex justify-center items-center gap-3 my-4 select-none">
      {/* GIORNO */}
      <div
        onClick={() => scratchTile("day")}
        className="p-3 bg-[#FAF7F2] rounded-2xl border-2 border-[#D4AF37]/40 text-center min-w-[80px] shadow-sm cursor-pointer relative overflow-hidden group"
      >
        <div className={`transition-opacity duration-500 ${scratchedTiles.day ? "opacity-100" : "opacity-0 blur-sm"}`}>
          <span className="font-serif text-2xl font-bold text-[#1E293B] block">{day}</span>
          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">GIORNO</span>
        </div>

        {!scratchedTiles.day && (
          <div className="absolute inset-0 bg-[#D4AF37] flex items-center justify-center text-slate-900 font-bold text-[10px] uppercase tracking-wider group-hover:bg-amber-400 transition">
            Gratta
          </div>
        )}
      </div>

      {/* MESE */}
      <div
        onClick={() => scratchTile("month")}
        className="p-3 bg-[#FAF7F2] rounded-2xl border-2 border-[#D4AF37]/40 text-center min-w-[80px] shadow-sm cursor-pointer relative overflow-hidden group"
      >
        <div className={`transition-opacity duration-500 ${scratchedTiles.month ? "opacity-100" : "opacity-0 blur-sm"}`}>
          <span className="font-serif text-2xl font-bold text-[#1E293B] block">{month}</span>
          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">MESE</span>
        </div>

        {!scratchedTiles.month && (
          <div className="absolute inset-0 bg-[#D4AF37] flex items-center justify-center text-slate-900 font-bold text-[10px] uppercase tracking-wider group-hover:bg-amber-400 transition">
            Gratta
          </div>
        )}
      </div>

      {/* ANNO */}
      <div
        onClick={() => scratchTile("year")}
        className="p-3 bg-[#FAF7F2] rounded-2xl border-2 border-[#D4AF37]/40 text-center min-w-[80px] shadow-sm cursor-pointer relative overflow-hidden group"
      >
        <div className={`transition-opacity duration-500 ${scratchedTiles.year ? "opacity-100" : "opacity-0 blur-sm"}`}>
          <span className="font-serif text-2xl font-bold text-[#1E293B] block">{year}</span>
          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">ANNO</span>
        </div>

        {!scratchedTiles.year && (
          <div className="absolute inset-0 bg-[#D4AF37] flex items-center justify-center text-slate-900 font-bold text-[10px] uppercase tracking-wider group-hover:bg-amber-400 transition">
            Gratta
          </div>
        )}
      </div>
    </div>
  );
}
