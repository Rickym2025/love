"use client";

import React, { useRef, useEffect, useState } from "react";

export interface ScratchDateProps {
  day?: string;
  month?: string;
  year?: string;
}

export default function ScratchDate({
  day = "24",
  month = "MAGGIO",
  year = "2026",
}: ScratchDateProps) {
  return (
    <div className="flex justify-center items-center gap-3 my-4 select-none">
      <ScratchTile value={day} label="GIORNO" />
      <ScratchTile value={month} label="MESE" />
      <ScratchTile value={year} label="ANNO" />
    </div>
  );
}

function ScratchTile({ value, label }: { value: string; label: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Disegna la vernice metallica dorata sopra la data
    ctx.fillStyle = "#D4AF37";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1E293B";
    ctx.font = "bold 10px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GRATTA QUI", canvas.width / 2, canvas.height / 2 + 3);

    let isDrawing = false;

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const rect = canvas.getBoundingClientRect();
      let x = 0;
      let y = 0;

      if ("touches" in e && e.touches.length > 0) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else if ("clientX" in e) {
        x = (e as MouseEvent).clientX - rect.left;
        y = (e as MouseEvent).clientY - rect.top;
      }

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      setIsScratched(true);
    };

    const startScratch = () => (isDrawing = true);
    const stopScratch = () => (isDrawing = false);

    canvas.addEventListener("mousedown", startScratch);
    canvas.addEventListener("mousemove", scratch);
    canvas.addEventListener("mouseup", stopScratch);

    canvas.addEventListener("touchstart", startScratch);
    canvas.addEventListener("touchmove", scratch);
    canvas.addEventListener("touchend", stopScratch);

    return () => {
      canvas.removeEventListener("mousedown", startScratch);
      canvas.removeEventListener("mousemove", scratch);
      canvas.removeEventListener("mouseup", stopScratch);

      canvas.removeEventListener("touchstart", startScratch);
      canvas.removeEventListener("touchmove", scratch);
      canvas.removeEventListener("touchend", stopScratch);
    };
  }, []);

  return (
    <div className="relative w-20 h-20 bg-[#FAF7F2] rounded-2xl border-2 border-[#D4AF37]/40 shadow-sm flex flex-col items-center justify-center overflow-hidden">
      {/* Testo Sottostante Nascosto */}
      <div className="text-center z-0">
        <span className="font-serif text-lg font-bold text-[#1E293B] block leading-tight">{value}</span>
        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{label}</span>
      </div>

      {/* Layer Vernice Canvas da Grattare */}
      <canvas
        ref={canvasRef}
        width={80}
        height={80}
        className={`absolute inset-0 cursor-pointer transition-opacity duration-500 z-10 ${
          isScratched ? "pointer-events-auto" : ""
        }`}
      />
    </div>
  );
}
