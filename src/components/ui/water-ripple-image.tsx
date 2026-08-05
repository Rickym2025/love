'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface WaterRippleImageProps {
  src?: string;
  className?: string;
  onClick?: () => void;
}

export function WaterRippleImage({
  src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  className = '',
  onClick,
}: WaterRippleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  const imgSrc = src || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
      if (!gl) {
        setWebGlSupported(false);
      }
    } catch {
      setWebGlSupported(false);
    }
  }, []);

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden w-full h-full min-h-[300px] shadow-2xl cursor-pointer ${className}`}
    >
      <img src={imgSrc} alt="Specchio d'Acqua Sfondo" className="absolute inset-0 w-full h-full object-cover" />

      {webGlSupported && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-pointer opacity-80" />
      )}
    </div>
  );
}

export default WaterRippleImage;
