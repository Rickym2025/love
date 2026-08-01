'use client';

import React, { useEffect, useRef } from 'react';

export default function OrbitWidget() {
  const orbitContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Rickym2025/mrstudio/main/public/orbit-template.html")
      .then((res) => {
        if (!res.ok) throw new Error("Errore caricamento widget orbitale");
        return res.text();
      })
      .then((html) => {
        if (orbitContainerRef.current) {
          orbitContainerRef.current.innerHTML = html;
        }
      })
      .catch((err) => console.error("Impossibile caricare l'ecosistema orbitale:", err));
  }, []);

  return (
    <div
      ref={orbitContainerRef}
      className="w-full flex justify-center items-center relative min-h-[440px] orbit-area my-8"
      id="orbit-template-container"
    >
      {/* Il contenuto dell'ecosistema viene iniettato qui via useRef */}
    </div>
  );
}
