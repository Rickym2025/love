"use client";

import React, { useState } from "react";
import Image from "next/image";

export interface PartingCloudsProps {
  onOpen?: () => void;
}

export default function PartingClouds({ onOpen }: PartingCloudsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);

    const audio = document.getElementById("love-wedding-audio") as HTMLAudioElement;
    if (audio) {
      audio.play().catch((err) => console.log("Autoplay audio limitato:", err));
    }

    if (onOpen) onOpen();
  };

  return (
    <div className="relative w-full h-44 my-2 overflow-hidden select-none">
      {/* NUVOLA 3D SINISTRA (STILE FOTO 2) */}
      <div
        className={`absolute top-0 left-0 w-3/4 h-full transition-transform duration-1000 ease-out z-10 ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="relative w-full h-full opacity-90 drop-shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80"
            alt="Nuvola 3D Sinistra"
            fill
            className="object-cover rounded-r-full"
          />
        </div>
      </div>

      {/* NUVOLA 3D DESTRA (STILE FOTO 2) */}
      <div
        className={`absolute top-0 right-0 w-3/4 h-full transition-transform duration-1000 ease-out z-10 ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="relative w-full h-full opacity-90 drop-shadow-xl">
          <Image
            src="https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=600&q=80"
            alt="Nuvola 3D Destra"
            fill
            className="object-cover rounded-l-full"
          />
        </div>
      </div>

      {/* SIGILLO CERALACCA AL CENTRO TRA LE NUVOLE */}
      {!isOpen && (
        <div
          onClick={handleOpen}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 cursor-pointer animate-pulse"
        >
          <div className="relative w-16 h-16 drop-shadow-2xl">
            <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
          </div>
          <span className="text-[10px] font-bold text-[#8B6508] bg-white/90 px-3 py-1 rounded-full border border-[#D4AF37] mt-2 shadow-md uppercase">
            Tocca per Aprire tra le Nuvole
          </span>
        </div>
      )}
    </div>
  );
}
