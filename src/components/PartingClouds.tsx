"use client";

import React from "react";

export default function PartingClouds() {
  return (
    <div className="relative w-full h-28 my-3 overflow-hidden select-none pointer-events-none">
      {/* Nuvola Sinistra - Soffice con sfumatura sfocata */}
      <div className="absolute top-0 left-0 w-3/5 h-full bg-gradient-to-r from-sky-200/90 via-white/95 to-transparent rounded-r-full blur-sm transition-transform duration-700 animate-pulse" />
      
      {/* Nuvola Destra - Soffice con sfumatura sfocata */}
      <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-sky-200/90 via-white/95 to-transparent rounded-l-full blur-sm transition-transform duration-700 animate-pulse" />

      {/* Testo centrale svelato dalle nuvole */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif font-bold text-[11px] uppercase tracking-widest text-[#B8860B] bg-white/90 px-4 py-1.5 rounded-full border border-[#D4AF37]/40 shadow-sm">
          ☁️ Apertura tra le Nuvole 3D
        </span>
      </div>
    </div>
  );
}
