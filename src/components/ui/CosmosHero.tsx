"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface CosmosHeroProps {
  coupleNames?: string;
  weddingDate?: string;
  onEnter?: () => void;
  inline?: boolean;
}

export default function CosmosHero({
  coupleNames = "Elena & Davide",
  weddingDate = "15 Settembre 2026",
  onEnter,
  inline = false,
}: CosmosHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleTriggerEnter = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (typeof onEnter === "function") {
        onEnter();
      }
    }, 600); // Sfuma in 600ms prima di passare all'invito
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = inline ? 340 : window.innerWidth);
    let height = (canvas.height = inline ? 580 : window.innerHeight);

    const handleResize = () => {
      if (!canvas || inline) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    if (!inline) {
      window.addEventListener("resize", handleResize);
    }

    // PARTICELLE E STELLE COSMICHE ELEGANTI
    const numStars = inline ? 120 : 300;
    const stars: { x: number; y: number; z: number; size: number; alpha: number; speed: number }[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random(),
        speed: Math.random() * 0.8 + 0.4,
      });
    }

    const render = () => {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        20,
        width / 2,
        height / 2,
        width * 0.8
      );
      gradient.addColorStop(0, "#1E1B4B"); // Deep Space Purple
      gradient.addColorStop(0.5, "#0F172A"); // Blu Notte
      gradient.addColorStop(1, "#020617"); // Nero Cosmico

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      stars.forEach((star) => {
        star.z -= star.speed;
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 256 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.1, (1 - star.z / width) * star.size * 2);
          const alpha = (1 - star.z / width) * 0.9;

          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = "#D4AF37";
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (!inline) window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [inline]);

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          onWheel={handleTriggerEnter}
          onTouchMove={handleTriggerEnter}
          className={`${
            inline
              ? "relative w-full h-[540px] rounded-[32px] overflow-hidden"
              : "fixed inset-0 z-50 w-screen h-screen"
          } bg-black overflow-hidden flex flex-col items-center justify-center select-none`}
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

          {/* ALONE LUMINOSO DORATO IN BACKGROUND */}
          <div className="absolute w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />

          <div className="relative z-10 text-center px-4 space-y-5 flex flex-col items-center justify-center">
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37] drop-shadow-md">
              ✦ Orizzonte Cosmico d&apos;Autore ✦
            </span>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white drop-shadow-2xl">
              {coupleNames}
            </h1>

            <p className="text-xs font-sans font-bold text-amber-200 tracking-wider uppercase drop-shadow">
              {weddingDate}
            </p>

            {/* SIGILLO CERALACCA INTERATTIVO CON EFFETTO GLOW */}
            <div
              onClick={handleTriggerEnter}
              className="mt-4 flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:scale-110 active:scale-95"
            >
              <div className="relative w-20 h-20 drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] animate-pulse">
                <Image src="/wax-seal.png" alt="Sigillo Ceralacca Cosmica" fill className="object-contain" priority unoptimized />
              </div>
              <span className="mt-3 text-[11px] font-serif font-bold text-[#D4AF37] uppercase tracking-widest group-hover:text-amber-300 transition-colors drop-shadow">
                Tocca o Scorri per Entrare
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
