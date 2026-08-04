"use client";

import React from "react";

export default function PartingClouds() {
  return (
    <div className="relative w-full h-32 my-2 overflow-hidden select-none pointer-events-none">
      {/* SVG Volumetrico Nuvola Sinistra */}
      <div className="absolute top-0 left-0 w-2/3 h-full transition-transform duration-1000 ease-out hover:-translate-x-3/4">
        <svg viewBox="0 0 200 100" className="w-full h-full fill-white/90 drop-shadow-md">
          <path d="M 0,50 Q 20,20 50,30 Q 80,10 120,30 Q 150,10 180,40 Q 200,60 170,80 Q 130,100 80,90 Q 30,100 0,70 Z" />
        </svg>
      </div>

      {/* SVG Volumetrico Nuvola Destra */}
      <div className="absolute top-0 right-0 w-2/3 h-full transition-transform duration-1000 ease-out hover:translate-x-3/4">
        <svg viewBox="0 0 200 100" className="w-full h-full fill-sky-100/90 drop-shadow-md">
          <path d="M 200,50 Q 180,20 150,30 Q 120,10 80,30 Q 50,10 20,40 Q 0,60 30,80 Q 70,100 120,90 Q 170,100 200,70 Z" />
        </svg>
      </div>
    </div>
  );
}
