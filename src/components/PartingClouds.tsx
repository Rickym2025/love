"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface PartingCloudsProps {
  onOpen?: () => void;
  inline?: boolean;
}

export default function PartingClouds({ onOpen, inline = false }: PartingCloudsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);

    const audio = document.getElementById("love-wedding-audio") as HTMLAudioElement;
    if (audio) {
      audio.play().catch((err) => console.log("Autoplay audio limitato:", err));
    }

    if (onOpen) onOpen();
  };

  const containerClass = inline
    ? `relative w-full h-56 my-2 overflow-hidden select-none`
    : `fixed inset-0 z-50 flex items-center justify-center bg-sky-900/40 backdrop-blur-sm overflow-hidden select-none transition-opacity duration-1000 ${
        isOpen ? "opacity-0 pointer-events-none delay-700" : "opacity-100"
      }`;

  return (
    <div className={containerClass}>
      {/* NUVOLA 3D SINISTRA */}
      <div
        className={`absolute top-0 left-0 w-3/4 h-full transition-transform duration-1000 ease-out z-10 ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="relative w-full h-full opacity-90 drop-shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=800&q=80"
            alt="Nuvola 3D Sinistra"
            fill
            className="object-cover rounded-r-full"
            priority
          />
        </div>
      </div>

      {/* NUVOLA 3D DESTRA */}
      <div
        className={`absolute top-0 right-0 w-3/4 h-full transition-transform duration-1000 ease-out z-10 ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="relative w-full h-full opacity-90 drop-shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=800&q=80"
            alt="Nuvola 3D Destra"
            fill
            className="object-cover rounded-l-full"
            priority
          />
        </div>
      </div>

      {/* SIGILLO CERALACCA AL CENTRO */}
      {!isOpen && (
        <div
          onClick={handleOpen}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 cursor-pointer animate-pulse"
        >
          <div className="relative w-24 h-28 drop-shadow-2xl">
            <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
          </div>
          <span className="text-xs font-bold text-[#8B6508] bg-white/95 px-4 py-1.5 rounded-full border border-[#D4AF37] mt-3 shadow-xl uppercase font-serif tracking-wider">
            Tocca per Aprire l&apos;Invito
          </span>
        </div>
      )}
    </div>
  );
}
