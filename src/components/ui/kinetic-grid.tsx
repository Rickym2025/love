'use client';

import React, { useRef, useEffect } from 'react';

export default function KineticGrid({
  children,
  className = '',
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let mouse = { x: width / 2, y: height / 2 };
    let shockwaves: { x: number; y: number; r: number; opacity: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        r: 0,
        opacity: 0.9,
      });
    };

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('click', handleClick);

    const gap = 32;
    let animId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Disegna griglia ad ALTO CONTRASTO (Puntini più grandi e visibili)
      for (let x = gap / 2; x < width; x += gap) {
        for (let y = gap / 2; y < height; y += gap) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;

          let px = x;
          let py = y;

          if (dist < maxDist) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - dist / maxDist) * 18;
            px += Math.cos(angle) * force;
            py += Math.sin(angle) * force;
          }

          ctx.beginPath();
          ctx.arc(px, py, 2.2, 0, Math.PI * 2); // Raggio 2.2px nitido
          ctx.fillStyle = 'rgba(180, 140, 30, 0.38)'; // Oro caldo ben definito
          ctx.fill();
        }
      }

      // Onde d'urto marcate al click
      shockwaves.forEach((sw, idx) => {
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${sw.opacity})`;
        ctx.lineWidth = 3.5;
        ctx.stroke();

        sw.r += 4.5;
        sw.opacity -= 0.015;

        if (sw.opacity <= 0) {
          shockwaves.splice(idx, 1);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.parentElement?.removeEventListener('mousemove', handleMouseMove);
      canvas.parentElement?.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-auto z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
