"use client";

import React, { useState, useEffect } from "react";

export interface ScheduleItem {
  time: string;
  event: string;
}

export interface PartingCloudsProps {
  schedule?: ScheduleItem[];
  children?: React.ReactNode; // <-- Risolve l'errore TypeScript
}

export default function PartingClouds({
  schedule = [
    { time: "16:30", event: "Apertura Porte & Accoglienza" },
    { time: "17:00", event: "Cerimonia di Nozze" },
    { time: "18:00", event: "Aperitivo & Cocktail Hour" },
    { time: "20:00", event: "Cena di Gala" },
    { time: "21:00", event: "Ballo & Open Bar" },
    { time: "23:00", event: "Taglio Torta & Saluti" },
  ],
  children,
}: PartingCloudsProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const progress = Math.min(Math.max((scrollY - 300) / 400, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Traslazione delle Nuvole allo Scroll
  const leftCloudShift = scrollProgress * -120; // Nuvola sinistra si sposta verso sinistra
  const rightCloudShift = scrollProgress * 120; // Nuvola destra si sposta verso destra

  return (
    <div className="relative py-16 overflow-hidden min-h-[480px] flex flex-col items-center justify-center">
      {/* NUVOLA SINISTRA */}
      <div
        className="absolute left-0 top-10 w-[60%] h-[320px] bg-gradient-to-r from-sky-200/90 via-pink-100/80 to-white/90 rounded-r-full blur-xl pointer-events-none transition-transform duration-100 ease-out z-20 shadow-2xl"
        style={{ transform: `translateX(${leftCloudShift}px)` }}
      >
        <div className="absolute top-8 left-10 w-48 h-48 bg-sky-300/40 rounded-full blur-2xl" />
      </div>

      {/* NUVOLA DESTRA */}
      <div
        className="absolute right-0 bottom-10 w-[60%] h-[320px] bg-gradient-to-l from-sky-200/90 via-pink-100/80 to-white/90 rounded-l-full blur-xl pointer-events-none transition-transform duration-100 ease-out z-20 shadow-2xl"
        style={{ transform: `translateX(${rightCloudShift}px)` }}
      >
        <div className="absolute bottom-8 right-10 w-48 h-48 bg-amber-200/40 rounded-full blur-2xl" />
      </div>

      {/* TIMELINE VERTICALE TRA LE NUVOLE O CONTENUTO FIGLIO */}
      <div className="relative z-10 max-w-md w-full px-6 text-center">
        {children ? (
          children
        ) : (
          <>
            <h3 className="font-serif italic text-3xl text-[#1E293B] mb-8">Programma dell&apos;Evento</h3>

            <div className="relative border-l-2 border-[#D4AF37]/50 ml-1/2 left-1/2 -translate-x-1/2 space-y-8 pl-6 py-2 text-left">
              {schedule.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Rombo Sulla Timeline */}
                  <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 bg-[#D4AF37] rotate-45 border-2 border-white shadow-md" />
                  <div>
                    <span className="font-serif text-lg font-bold text-[#D4AF37] block">{item.time}</span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1E293B]">
                      {item.event}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
