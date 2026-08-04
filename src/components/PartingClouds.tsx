"use client";

import React from "react";

export default function PartingClouds() {
  return (
    <div className="relative w-full h-28 my-2 overflow-hidden select-none pointer-events-none">
      {/* Nuvola Sinistra Soffice */}
      <div className="absolute top-0 left-0 w-3/5 h-full bg-gradient-to-r from-sky-200/90 via-white/95 to-transparent rounded-r-full blur-md transition-transform duration-1000 ease-out hover:-translate-x-full" />
      
      {/* Nuvola Destra Soffice */}
      <div className="absolute top-0 right-0 w-3/5 h-full bg-gradient-to-l from-sky-200/90 via-white/95 to-transparent rounded-l-full blur-md transition-transform duration-1000 ease-out hover:translate-x-full" />
    </div>
  );
}
