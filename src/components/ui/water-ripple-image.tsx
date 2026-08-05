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
        return;
      }

      // SHADER VERTEX
      const vertShaderSource = `
        attribute vec2 a_position;
        varying vec2 v_uv;
        void main() {
          v_uv = a_position * 0.5 + 0.5;
          gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      // SHADER FRAGMENT CAUSTIC WATER RIPPLE
      const fragShaderSource = `
        precision mediump float;
        uniform float u_time;
        uniform vec2 u_resolution;
        varying vec2 v_uv;

        float noise(vec2 p) {
          return sin(p.x * 12.0 + u_time * 1.5) * cos(p.y * 12.0 + u_time * 1.5);
        }

        void main() {
          vec2 uv = v_uv;
          vec2 p = uv * 6.0;
          float c = noise(p + vec2(u_time * 0.2, u_time * 0.3));
          float caustic = pow(c * 0.5 + 0.5, 3.0) * 0.35;

          vec3 waterColor = vec3(0.83, 0.68, 0.21) * caustic; // Riflessi dorati eleganti
          gl_FragColor = vec4(waterColor, caustic);
        }
      `;

      const createShader = (glContext: WebGLRenderingContext, type: number, source: string) => {
        const shader = glContext.createShader(type);
        if (!shader) return null;
        glContext.shaderSource(shader, source);
        glContext.compileShader(shader);
        return shader;
      };

      const vertShader = createShader(gl, gl.VERTEX_SHADER, vertShaderSource);
      const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragShaderSource);

      if (!vertShader || !fragShader) return;

      const program = gl.createProgram();
      if (!program) return;
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);
      gl.useProgram(program);

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const positionLocation = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      const timeLocation = gl.getUniformLocation(program, 'u_time');
      let animationFrameId: number;

      const render = (time: number) => {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform1f(timeLocation, time * 0.001);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        animationFrameId = requestAnimationFrame(render);
      };

      animationFrameId = requestAnimationFrame(render);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
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
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block cursor-pointer opacity-70 pointer-events-none mix-blend-screen" />
      )}
    </div>
  );
}

export default WaterRippleImage;
