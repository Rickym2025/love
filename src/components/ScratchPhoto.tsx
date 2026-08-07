"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

export interface ScratchPhotoProps {
  imageSrc?: string;
  overlayText?: string;
}

export default function ScratchPhoto({
  imageSrc = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  overlayText = "🎰 Gratta col dito per scoprire la Foto della Coppia",
}: ScratchPhotoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    const height = (canvas.height = 200);

    // SFONDO STRATO DORATO DA CANCELLARE
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#D4AF37");
    gradient.addColorStop(0.5, "#F3E8FF");
    gradient.addColorStop(1, "#B8860B");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.font = "bold 12px serif";
    ctx.fillStyle = "#1E293B";
    ctx.textAlign = "center";
    ctx.fillText(overlayText, width / 2, height / 2);
  }, [overlayText]);

  // CALCOLO SOGLIA EFFETTIVA CANCELLAZIONE (>75%)
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imgData.data;
      let transparentPixels = 0;

      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const totalPixels = canvas.width * canvas.height;
      const percentage = (transparentPixels / totalPixels) * 100;

      // SI RIVELA SOLO SE SUPERATA LA SOGLIA DEL 75%
      if (percentage >= 75) {
        setIsRevealed(true);
      }
    } catch {}
  };

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    const rect = e.currentTarget.getBoundingClientRect();
    scratch(e.clientX - rect.left, e.clientY - rect.top);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    scratch(touch.clientX - rect.left, touch.clientY - rect.top);
  };

  return (
    <div className="relative w-full max-w-sm mx-auto h-[200px] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg select-none">
      <img src={imageSrc} alt="Foto Sposi Rivelata" className="w-full h-full object-cover" />

      {!isRevealed && (
        <canvas
          ref={canvasRef}
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onMouseLeave={() => setIsScratching(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsScratching(true)}
          onTouchEnd={() => setIsScratching(false)}
          onTouchMove={handleTouchMove}
          className="absolute inset-0 w-full h-full cursor-pointer z-10 touch-none"
        />
      )}
    </div>
  );
}
