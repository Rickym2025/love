'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  revealText?: string;
  subText?: string;
}

export default function ScratchCard({
  revealText = '28 SETTEMBRE 2026',
  subText = 'Chiesa di Pescarenico • Ore 11:00',
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Disegna lo strato dorato grattabile
    ctx.fillStyle = '#d4af37';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Testo di istruzione sopra la lamina dorata
    ctx.fillStyle = '#423103';
    ctx.font = 'bold 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ GRATTA QUI CON IL DITO ✨', canvas.width / 2, canvas.height / 2 + 5);

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();
    };

    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const handleStart = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const { x, y } = getPos(e);
      scratch(x, y);
    };

    const handleEnd = () => {
      isDrawing = false;
      setIsScratched(true);
    };

    canvas.addEventListener('mousedown', handleStart);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleEnd);

    canvas.addEventListener('touchstart', handleStart);
    canvas.addEventListener('touchmove', handleMove);
    canvas.addEventListener('touchend', handleEnd);

    return () => {
      canvas.removeEventListener('mousedown', handleStart);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleEnd);
      canvas.removeEventListener('touchstart', handleStart);
      canvas.removeEventListener('touchmove', handleMove);
      canvas.removeEventListener('touchend', handleEnd);
    };
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[5/2] bg-slate-900 border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center p-4 text-center select-none">
      {/* Contenuto segreto sotto la lamina */}
      <div className="z-0">
        <span className="text-amber-400 text-xs uppercase tracking-widest block mb-1">
          Data & Location Rivelata
        </span>
        <h4 className="font-serif text-2xl text-amber-100 font-bold tracking-wide">
          {revealText}
        </h4>
        <p className="text-xs text-slate-300 italic mt-1">{subText}</p>
      </div>

      {/* Tela Canvas grattabile */}
      <canvas
        ref={canvasRef}
        width={380}
        height={150}
        className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-500 ${
          isScratched ? 'touch-none' : ''
        }`}
      />
    </div>
  );
}
