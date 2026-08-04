"use client";

import React, { useRef, useEffect, useState } from "react";

export interface WaterRippleProps {
  src: string;
  blueish?: number;
  scale?: number;
  illumination?: number;
  surfaceDistortion?: number;
  waterDistortion?: number;
  alt?: string;
  className?: string;
}

export function WaterRippleImage({
  src,
  blueish = 0.4,
  scale = 7,
  illumination = 0.15,
  surfaceDistortion = 0.03,
  waterDistortion = 0.02,
  alt = "Effetto Acqua",
  className = "",
}: WaterRippleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    const vsSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = vec2(a_texCoord.x, 1.0 - a_texCoord.y);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 v_texCoord;
      uniform sampler2D u_image;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_blueish;
      uniform float u_scale;
      uniform float u_illumination;
      uniform float u_surfaceDistortion;
      uniform float u_waterDistortion;

      float noise(vec2 p) {
        return sin(p.x * 12.0 + u_time * 2.0) * cos(p.y * 12.0 + u_time * 1.5) * 0.5 + 0.5;
      }

      void main() {
        vec2 uv = v_texCoord;
        float dist = distance(uv, u_mouse);
        float mouseWave = sin(dist * u_scale * 15.0 - u_time * 4.0) * exp(-dist * 4.0) * u_surfaceDistortion;

        float waveX = sin(uv.y * u_scale * 8.0 + u_time * 1.8) * u_waterDistortion;
        float waveY = cos(uv.x * u_scale * 8.0 + u_time * 1.5) * u_waterDistortion;

        vec2 distortedUv = uv + vec2(waveX + mouseWave, waveY + mouseWave);
        distortedUv = clamp(distortedUv, 0.0, 1.0);

        vec4 texColor = texture2D(u_image, distortedUv);
        float caustic = noise(distortedUv * u_scale * 2.0) * u_illumination;
        vec3 waterTint = mix(texColor.rgb, vec3(0.0, 0.4, 0.8), u_blueish * 0.25);
        vec3 finalColor = waterTint + vec3(caustic);

        gl_FragColor = vec4(finalColor, texColor.a);
      }
    `;

    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Errore compilazione shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
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

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]),
      gl.STATIC_DRAW
    );

    const texCoordLocation = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(texCoordLocation);
    gl.vertexAttribPointer(texCoordLocation, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    };

    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");
    const uBlueishLoc = gl.getUniformLocation(program, "u_blueish");
    const uScaleLoc = gl.getUniformLocation(program, "u_scale");
    const uIllumLoc = gl.getUniformLocation(program, "u_illumination");
    const uSurfDistLoc = gl.getUniformLocation(program, "u_surfaceDistortion");
    const uWaterDistLoc = gl.getUniformLocation(program, "u_waterDistortion");

    gl.uniform1f(uBlueishLoc, blueish);
    gl.uniform1f(uScaleLoc, scale);
    gl.uniform1f(uIllumLoc, illumination);
    gl.uniform1f(uSurfDistLoc, surfaceDistortion);
    gl.uniform1f(uWaterDistLoc, waterDistortion);

    let mouseX = 0.5;
    let mouseY = 0.5;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;
      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      mouseX = (clientX - rect.left) / rect.width;
      mouseY = 1.0 - (clientY - rect.top) / rect.height;
    };

    const container = containerRef.current;
    container?.addEventListener("mousemove", handlePointerMove);
    container?.addEventListener("touchmove", handlePointerMove);

    let animId: number;
    let startTime = performance.now();

    const render = () => {
      const parent = containerRef.current;
      if (parent) {
        if (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight) {
          canvas.width = parent.clientWidth || 600;
          canvas.height = parent.clientHeight || 400;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }
      }

      const elapsed = (performance.now() - startTime) * 0.001;
      gl.uniform1f(uTimeLoc, elapsed);
      gl.uniform2f(uMouseLoc, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      container?.removeEventListener("mousemove", handlePointerMove);
      container?.removeEventListener("touchmove", handlePointerMove);
    };
  }, [src, blueish, scale, illumination, surfaceDistortion, waterDistortion]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden w-full h-full min-h-[300px] rounded-3xl shadow-xl ${className}`}>
      {webGlSupported ? (
        <canvas ref={canvasRef} className="w-full h-full block cursor-pointer" />
      ) : (
        <div className="relative w-full h-full">
          <img src={src} alt={alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-500/10 pointer-events-none" />
        </div>
      )}
    </div>
  );
}

export default WaterRippleImage;
