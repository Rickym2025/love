"use client";

import React, { useState, useEffect } from "react";

export interface PartingCloudsProps {
  children?: React.ReactNode;
}

export default function PartingClouds({ children }: PartingCloudsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max((scrollY - 200) / 350, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftCloudShift = scrollProgress * -140;
  const rightCloudShift = scrollProgress * 140;

  return (
    <div className="relative py-16 overflow-hidden min-h-[420px] flex flex-col items-center justify-center my-6">
      {/* NUVOLA SINISTRA VOLUMETRICA 3D */}
      <div
        className="absolute left-0 top-4 w-[65%] h-[280px] bg-gradient-to-r from-sky-200/90 via-pink-100/90 to-white/90 rounded-r-full blur-md pointer-events-none transition-transform duration-75 ease-out z-20 shadow-xl"
        style={{ transform: `translateX(${leftCloudShift}px)` }}
      >
        <div className="absolute top-6 left-8 w-40 h-48 bg-sky-300/40 rounded-full blur-xl" />
      </div>

      {/* NUVOLA DESTRA VOLUMETRICA 3D */}
      <div
        className="absolute right-0 bottom-4 w-[65%] h-[280px] bg-gradient-to-l from-sky-200/90 via-pink-100/90 to-white/90 rounded-l-full blur-md pointer-events-none transition-transform duration-75 ease-out z-20 shadow-xl"
        style={{ transform: `translateX(${rightCloudShift}px)` }}
      >
        <div className="absolute bottom-6 right-8 w-40 h-48 bg-amber-200/40 rounded-full blur-xl" />
      </div>

      {/* CONTENUTO TIMELINE FRA LE NUVOLE */}
      <div className="relative z-10 max-w-md w-full px-6 text-center">
        {children || (
          <div className="p-6 bg-white/90 rounded-3xl border border-sky-200 shadow-xl backdrop-blur-sm">
            <h3 className="font-serif italic text-2xl text-[#1E293B] mb-4">Programma tra le Nuvole</h3>
            <p className="text-xs text-slate-600">Scorri la pagina per veder scostare le nuvole volumetriche!</p>
          </div>
        )}
      </div>
    </div>
  );
}
