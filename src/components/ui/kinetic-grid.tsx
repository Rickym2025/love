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
    let ripples: { x: number; y: number; radius: number; alpha: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        alpha: 1,
      });
    };

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    canvas.parentElement?.addEventListener('mousemove', handleMouseMove);
    canvas.parentElement?.addEventListener('click', handleClick);

    const gridSize = 40;
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Disegna griglia ricurva verso il cursore
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 200;

          let offsetX = 0;
          let offsetY = 0;

          if (dist < maxDist) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - dist / maxDist) * 12;
            offsetX = Math.cos(angle) * force;
            offsetY = Math.sin(angle) * force;
          }

          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(212, 175, 55, 0.25)';
          ctx.fill();
        }
      }

      // Animazione cerchi d'onda al click
      ripples.forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${r.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        r.radius += 3;
        r.alpha -= 0.015;

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
