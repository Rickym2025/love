'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ScratchCardProps {
  revealText?: string;
  subText?: string;
  day?: string;
  month?: string;
  year?: string;
}

export default function ScratchCard({
  revealText = '28 SETTEMBRE 2026',
  subText = 'Chiesa di Pescarenico • Ore 11:00',
  day = '28',
  month = 'Settembre',
  year = '2026',
}: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scratched, setScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#D4AF37';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#5C450C';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ GRATTA CON IL DITO ✨', canvas.width / 2, canvas.height / 2 + 4);

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
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
      return { x: clientX - rect.left, y: clientY - rect.top };
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
      setScratched(true);
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
    <div className="relative w-full max-w-sm mx-auto aspect-[5/2] bg-[#FAF7F2] border border-[#D4AF37]/50 rounded-2xl overflow-hidden shadow-xl flex flex-col items-center justify-center p-4 text-center select-none">
      <div className="z-0">
        <span className="text-[#8B1E24] text-[10px] font-bold uppercase tracking-widest block mb-1">
          Data Segreta Rivelata
        </span>
        <h4 className="font-serif text-2xl font-bold text-[#4A3D39]">
          {revealText || `${day} ${month} ${year}`}
        </h4>
        <p className="text-xs text-[#9E8976] italic mt-1">{subText}</p>
      </div>

      <canvas
        ref={canvasRef}
        width={380}
        height={150}
        className={`absolute inset-0 w-full h-full cursor-pointer z-10 transition-opacity duration-500 ${
          scratched ? 'touch-none' : ''
        }`}
      />
    </div>
  );
}
