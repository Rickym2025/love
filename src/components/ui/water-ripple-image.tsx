'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface WaterRippleImageProps {
  src?: string;
  blueish?: number;
  scale?: number;
  illumination?: number;
  surfaceDistortion?: number;
  waterDistortion?: number;
  className?: string;
  onClick?: () => void;
}

export function WaterRippleImage({
  src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  className = '',
  onClick,
}: WaterRippleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

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
      {webGlSupported ? (
        <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
      ) : (
        <div className="relative w-full h-full">
          <img src={src} alt="Specchio d'Acqua" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

export default WaterRippleImage;
