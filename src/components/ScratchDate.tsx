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
  const [isCleared, setIsCleared] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Disegna la vernice metallica dorata sopra la data
    ctx.fillStyle = "#D4AF37";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1E293B";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GRATTA QUI", canvas.width / 2, canvas.height / 2 + 3);

    let isDrawing = false;

    const scratch = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 16, 0, Math.PI * 2);
      ctx.fill();
      setIsCleared(true);
    };

    const handlePointerDown = (e: PointerEvent) => {
      isDrawing = true;
      scratch(e.clientX, e.clientY);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDrawing) {
        scratch(e.clientX, e.clientY);
      }
    };

    const handlePointerUp = () => {
      isDrawing = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  return (
    <div className="relative w-20 h-20 bg-[#FAF7F2] rounded-2xl border-2 border-[#D4AF37]/40 shadow-inner flex flex-col items-center justify-center overflow-hidden">
      {/* Testo Sottostante Nascosto */}
      <div className="text-center z-0">
        <span className="font-serif text-lg font-bold text-[#1E293B] block leading-tight">{value}</span>
        <span className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{label}</span>
      </div>

      {/* Layer Vernice Canvas da Grattare col Dito */}
      <canvas
        ref={canvasRef}
        width={80}
        height={80}
        className={`absolute inset-0 cursor-pointer touch-none z-10 ${
          isCleared ? "opacity-90" : "opacity-100"
        }`}
      />
    </div>
  );
}
