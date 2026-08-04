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
}

const VERT = `
precision mediump float;
varying vec2 vUv;
attribute vec2 a_position;
void main() {
  vUv = .5 * (a_position + 1.);
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D u_image_texture;
uniform float u_time;
uniform float u_ratio;
uniform float u_img_ratio;
uniform float u_blueish;
uniform float u_scale;
uniform float u_illumination;
uniform float u_surface_distortion;
uniform float u_water_distortion;

void main() {
  vec2 uv = vUv;
  uv.y = 1. - uv.y;
  vec4 img = texture2D(u_image_texture, uv);
  gl_FragColor = img;
}
`;

export function WaterRippleImage({
  src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  className = '',
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
    <div className={`relative overflow-hidden w-full h-full min-h-[280px] rounded-2xl shadow-xl ${className}`}>
      {webGlSupported ? (
        <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
      ) : (
        <div className="relative w-full h-full">
          <img src={src} alt="Sfondo Lago" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

export default WaterRippleImage;
