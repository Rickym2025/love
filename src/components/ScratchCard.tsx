'use client';

import React, { useRef, useEffect, useState } from 'react';

interface ScratchBoxProps {
  label: string;
  hiddenValue: string;
}

function ScratchBox({ label, hiddenValue }: ScratchBoxProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scratched, setScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Strato di copertura azzurro/argentato grattabile
    ctx.fillStyle = '#B0C4DE';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4682B4';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GRATTA', canvas.width / 2, canvas.height / 2 + 4);

    let isDrawing = false;

    const scratch = (x: number, y: number) => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
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
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-2xl shadow-md border border-[#BBDEFB] flex items-center justify-center overflow-hidden">
        <span className="font-serif text-xl sm:text-2xl font-bold text-[#37474F]">
          {hiddenValue}
        </span>
        <canvas
          ref={canvasRef}
          width={112}
          height={112}
          className={`absolute inset-0 w-full h-full cursor-pointer z-10 ${scratched ? 'touch-none' : ''}`}
        />
      </div>
      <span className="text-[10px] text-[#78909C] uppercase tracking-widest mt-2 font-semibold">
        {label}
      </span>
    </div>
  );
}

export default function ScratchDate({ day = '14', month = 'Settembre', year = '2026' }: { day?: string; month?: string; year?: string }) {
  return (
    <div className="my-8 text-center">
      <p className="font-serif italic text-[#4682B4] text-xl mb-1">The Date</p>
      <p className="text-xs text-[#78909C] tracking-widest uppercase mb-6">✦ Gratta per svelare la data ✦</p>
      <div className="flex items-center justify-center gap-4">
        <ScratchBox label="Giorno" hiddenValue={day} />
        <ScratchBox label="Mese" hiddenValue={month} />
        <ScratchBox label="Anno" hiddenValue={year} />
      </div>
    </div>
  );
}
