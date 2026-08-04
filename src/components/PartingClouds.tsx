"use client";

import React from "react";
import Image from "next/image";

export default function PartingClouds() {
  return (
    <div className="relative w-full h-40 my-2 overflow-hidden select-none pointer-events-none">
      {/* NUVOLA 3D SINISTRA (STILE FOTO 2) */}
      <div className="absolute top-0 left-0 w-3/4 h-full transition-transform duration-1000 ease-out hover:-translate-x-full">
        <div className="relative w-full h-full opacity-90 drop-shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80"
            alt="Nuvola 3D Sinistra"
            fill
            className="object-cover rounded-r-full"
          />
        </div>
      </div>

      {/* NUVOLA 3D DESTRA (STILE FOTO 2) */}
      <div className="absolute top-0 right-0 w-3/4 h-full transition-transform duration-1000 ease-out hover:translate-x-full">
        <div className="relative w-full h-full opacity-90 drop-shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?auto=format&fit=crop&w=600&q=80"
            alt="Nuvola 3D Destra"
            fill
            className="object-cover rounded-l-full"
          />
        </div>
      </div>
    </div>
  );
}
