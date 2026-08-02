'use client';

import React, { useRef, useEffect } from 'react';

interface WaterRippleProps {
  src: string;
  blueish?: number;
  scale?: number;
  illumination?: number;
  surfaceDistortion?: number;
  waterDistortion?: number;
  className?: string;
}

export function WaterRippleImage({
  src,
  blueish = 0.4,
  scale = 7,
  illumination = 0.15,
  surfaceDistortion = 0.03,
  waterDistortion = 0.02,
  className = '',
}: WaterRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    let ripples: { x: number; y: number; r: number; alpha: number }[] = [];
    let lastTime = 0;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
    };

    const addRipple = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      if (now - lastTime < 100) return;
      lastTime = now;

      const rect = canvas.getBoundingClientRect();
      let x = 0, y = 0;
      if ('touches' in e && e.touches.length > 0) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else if ('clientX' in e) {
        x = (e as MouseEvent).clientX - rect.left;
        y = (e as MouseEvent).clientY - rect.top;
      }
      ripples.push({ x, y, r: 0, alpha: illumination * 4 });
    };

    canvas.parentElement?.addEventListener('mousemove', addRipple);
    canvas.parentElement?.addEventListener('touchmove', addRipple);

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      if (img.complete) {
        ctx.drawImage(img, 0, 0, width, height);
      }

      ctx.fillStyle = `rgba(30, 144, 255, ${blueish * 0.12})`;
      ctx.fillRect(0, 0, width, height);

      ripples.forEach((rip, idx) => {
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${rip.alpha})`;
        ctx.lineWidth = scale * 0.3;
        ctx.stroke();

        rip.r += waterDistortion * 80 + 1.0;
        rip.alpha -= surfaceDistortion * 0.3 + 0.004;

        if (rip.alpha <= 0) {
          ripples.splice(idx, 1);
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.parentElement?.removeEventListener('mousemove', addRipple);
      canvas.parentElement?.removeEventListener('touchmove', addRipple);
    };
  }, [src, blueish, scale, illumination, surfaceDistortion, waterDistortion]);

  return (
    <div className={`relative overflow-hidden rounded-3xl shadow-xl ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full object-cover cursor-pointer" />
    </div>
  );
}
