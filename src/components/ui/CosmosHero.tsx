"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

interface CosmosHeroProps {
  coupleNames?: string;
  weddingDate?: string;
  onEnter?: () => void;
}

export default function CosmosHero({
  coupleNames = "Elena & Davide",
  weddingDate = "15 Settembre 2026",
  onEnter,
}: CosmosHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // GENERAZIONE STELLE 3D
    const numStars = 400;
    const stars: { x: number; y: number; z: number; size: number; color: string }[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 1.8 + 0.5,
        color: Math.random() > 0.3 ? "#D4AF37" : "#FFFFFF",
      });
    }

    const render = () => {
      // SFONDO SPAZIALE CON SFUMATURA NEBULOSA
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        10,
        width / 2,
        height / 2,
        width
      );
      gradient.addColorStop(0, "#0F172A");
      gradient.addColorStop(0.5, "#020617");
      gradient.addColorStop(1, "#000000");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // ANIMAZIONE STELLE 3D IN MOVIMENTO VERSO LA CAMERA
      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= 1.2;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 256 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.1, (1 - star.z / width) * star.size * 2.5);
          const alpha = 1 - star.z / width;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen bg-black overflow-hidden flex flex-col items-center justify-center select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />

      <div className="relative z-10 text-center px-4 space-y-6 flex flex-col items-center justify-center">
        <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#D4AF37] drop-shadow">
          Orizzonte Cosmico • Partecipazione di Nozze
        </span>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white drop-shadow-2xl">
          {coupleNames}
        </h1>

        <p className="text-sm font-sans font-bold text-amber-200 tracking-wider uppercase drop-shadow">
          {weddingDate}
        </p>

        {/* CERALACCA CENTRALE PER ENTRARE E FAR PARTIRE LA MUSICA */}
        <div
          onClick={onEnter}
          className="mt-6 flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-110"
        >
          <div className="relative w-24 h-24 drop-shadow-[0_0_25px_rgba(212,175,55,0.8)] animate-pulse">
            <Image src="/wax-seal.png" alt="Sigillo Ceralacca Cosmica" fill className="object-contain" priority unoptimized />
          </div>
          <span className="mt-4 text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-widest group-hover:text-amber-300 transition-colors drop-shadow">
            Tocca per Aprire l&apos;Invito
          </span>
        </div>
      </div>
    </div>
  );
}
