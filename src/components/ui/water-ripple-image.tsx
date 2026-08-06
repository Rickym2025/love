'use client';

import React, { useEffect, useRef, useState } from 'react';

type ShaderParams = {
  blueish: number;
  scale: number;
  illumination: number;
  surfaceDistortion: number;
  waterDistortion: number;
};

export interface WaterRippleImageProps extends Partial<ShaderParams> {
  src?: string;
  className?: string;
  onClick?: () => void;
  /** Mostra un piccolo bottone per caricare un'immagine custom (debug/demo) */
  showControls?: boolean;
}

const DEFAULT_SRC =
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80';

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

vec3 mod289(vec3 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec2 mod289(vec2 x) { return x - floor(x * (1. / 289.)) * 289.; }
vec3 permute(vec3 x) { return mod289(((x*34.)+1.)*x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1., 0.) : vec2(0., 1.);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0., i1.y, 1.)) + i.x + vec3(0., i1.x, 1.));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.);
  m = m*m;
  m = m*m;
  vec3 x = 2. * fract(p * C.www) - 1.;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130. * dot(m, g);
}

mat2 rotate2D(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

float surface_noise(vec2 uv, float t, float scale) {
  vec2 n = vec2(.1);
  vec2 N = vec2(.1);
  mat2 m = rotate2D(.5);
  for (int j = 0; j < 10; j++) {
    uv *= m;
    n *= m;
    vec2 q = uv * scale + float(j) + n + (.5 + .5 * float(j)) * (mod(float(j), 2.) - 1.) * t;
    n += sin(q);
    N += cos(q) / scale;
    scale *= 1.2;
  }
  return (N.x + N.y + .1);
}

void main() {
  vec2 uv = vUv;
  uv.y = 1. - uv.y;
  uv.x *= u_ratio;

  float t = .002 * u_time;
  vec3 color = vec3(0.);
  float opacity = 0.;

  float outer_noise = snoise((.3 + .1 * sin(t)) * uv + vec2(0., .2 * t));
  vec2 surface_noise_uv = 2. * uv + (outer_noise * .2);

  float surf = surface_noise(surface_noise_uv, t, u_scale);
  surf *= pow(uv.y, .3);
  surf = pow(surf, 2.);

  vec2 img_uv = vUv;
  img_uv -= .5;
  if (u_ratio > u_img_ratio) {
    img_uv.x = img_uv.x * u_ratio / u_img_ratio;
  } else {
    img_uv.y = img_uv.y * u_img_ratio / u_ratio;
  }
  float scale_factor = 1.4;
  img_uv *= scale_factor;
  img_uv += .5;
  img_uv.y = 1. - img_uv.y;

  img_uv += (u_water_distortion * outer_noise);
  img_uv += (u_surface_distortion * surf);

  vec4 img = texture2D(u_image_texture, img_uv);
  img *= (1. + u_illumination * surf);

  color += img.rgb;
  color += u_illumination * vec3(1. - u_blueish, 1., 1.) * surf;
  opacity += img.a;

  float edge_width = .02;
  float edge_alpha = smoothstep(0., edge_width, img_uv.x) * smoothstep(1., 1. - edge_width, img_uv.x);
  edge_alpha *= smoothstep(0., edge_width, img_uv.y) * smoothstep(1., 1. - edge_width, img_uv.y);
  color *= edge_alpha;
  opacity *= edge_alpha;

  gl_FragColor = vec4(color, opacity);
}
`;

function compileShader(gl: WebGLRenderingContext, src: string, type: number) {
  const sh = gl.createShader(type);
  if (!sh) throw new Error('createShader ha restituito null');
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error(`Shader compile error: ${info || 'unknown'}`);
  }
  return sh;
}

function createProgram(gl: WebGLRenderingContext, vs: string, fs: string) {
  const v = compileShader(gl, vs, gl.VERTEX_SHADER);
  const f = compileShader(gl, fs, gl.FRAGMENT_SHADER);
  const prog = gl.createProgram();
  if (!prog) throw new Error('createProgram ha restituito null');
  gl.attachShader(prog, v);
  gl.attachShader(prog, f);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error(`Program link error: ${info || 'unknown'}`);
  }
  return prog;
}

export function WaterRippleImage({
  src = DEFAULT_SRC,
  className = '',
  onClick,
  showControls = false,
  blueish = 0.6,
  scale = 7,
  illumination = 0.15,
  surfaceDistortion = 0.07,
  waterDistortion = 0.03,
}: WaterRippleImageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const texRef = useRef<WebGLTexture | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const animRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  const [webGlSupported, setWebGlSupported] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);

  const paramsRef = useRef<ShaderParams>({
    blueish,
    scale,
    illumination,
    surfaceDistortion,
    waterDistortion,
  });

  const applyUniforms = (gl: WebGLRenderingContext) => {
    const u = uniformsRef.current;
    const p = paramsRef.current;
    gl.uniform1f(u['u_blueish'], p.blueish);
    gl.uniform1f(u['u_scale'], p.scale);
    gl.uniform1f(u['u_illumination'], p.illumination);
    gl.uniform1f(u['u_surface_distortion'], p.surfaceDistortion);
    gl.uniform1f(u['u_water_distortion'], p.waterDistortion);
  };

  const setTextureFromImage = (gl: WebGLRenderingContext, image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (texRef.current) gl.deleteTexture(texRef.current);
    const texture = gl.createTexture();
    texRef.current = texture;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    const u = uniformsRef.current;
    gl.uniform1i(u['u_image_texture'], 0);

    const imgRatio = image.naturalWidth / image.naturalHeight;
    gl.uniform1f(u['u_ratio'], canvas.width / canvas.height);
    gl.uniform1f(u['u_img_ratio'], imgRatio);
  };

  const loadImage = (srcUrl: string, gl: WebGLRenderingContext) =>
    new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        imgRef.current = img;
        setTextureFromImage(gl, img);
        resolve();
      };
      img.onerror = reject;
      img.src = srcUrl;
    });

  const resize = () => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!gl || !canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = container.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);

    const u = uniformsRef.current;
    gl.uniform1f(u['u_ratio'], canvas.width / canvas.height);

    if (imgRef.current) {
      const imgRatio = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
      gl.uniform1f(u['u_img_ratio'], imgRatio);
    }
  };

  // Init WebGL una sola volta
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext('webgl', { alpha: true, antialias: true }) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    let program: WebGLProgram;
    try {
      program = createProgram(gl, VERT, FRAG);
    } catch (e) {
      console.error(e);
      setWebGlSupported(false);
      return;
    }

    glRef.current = gl;
    gl.useProgram(program);

    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const info = gl.getActiveUniform(program, i);
      if (!info) continue;
      uniformsRef.current[info.name] = gl.getUniformLocation(program, info.name);
    }

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    applyUniforms(gl);
    resize();

    loadImage(currentSrc, gl).catch((e) => {
      console.error('Errore caricamento immagine water ripple:', e);
    });

    startTimeRef.current = performance.now();

    const ro = new ResizeObserver(() => resize());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', resize);

    const render = () => {
      const u = uniformsRef.current;
      const elapsed = performance.now() - startTimeRef.current;
      if (u['u_time']) gl.uniform1f(u['u_time'], elapsed);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animRef.current = requestAnimationFrame(render);
    };
    animRef.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (texRef.current) gl.deleteTexture(texRef.current);
      gl.useProgram(null);
      gl.deleteProgram(program);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Applica i parametri shader quando cambiano le props
  useEffect(() => {
    paramsRef.current = { blueish, scale, illumination, surfaceDistortion, waterDistortion };
    const gl = glRef.current;
    if (gl) applyUniforms(gl);
  }, [blueish, scale, illumination, surfaceDistortion, waterDistortion]);

  // Ricarica la texture quando cambia la prop `src`
  useEffect(() => {
    setCurrentSrc(src);
    const gl = glRef.current;
    if (!gl) return;
    loadImage(src, gl)
      .then(() => resize())
      .catch((e) => console.error('Errore ricaricamento immagine water ripple:', e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Upload manuale (solo se showControls è true)
  useEffect(() => {
    if (!showControls) return;
    const input = inputRef.current;
    if (!input) return;

    const onChange = () => {
      const [file] = input.files ?? [];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const gl = glRef.current;
        if (!gl) return;
        loadImage(dataUrl, gl)
          .then(() => resize())
          .catch((err) => console.error(err));
      };
      reader.readAsDataURL(file);
    };

    input.addEventListener('change', onChange);
    return () => input.removeEventListener('change', onChange);
  }, [showControls]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative overflow-hidden w-full h-full min-h-[300px] cursor-pointer ${className}`}
    >
      {webGlSupported ? (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      ) : (
        // Fallback se WebGL non è disponibile: mostra l'immagine statica
        <img src={currentSrc} alt="Specchio d'Acqua Sfondo" className="absolute inset-0 w-full h-full object-cover" />
      )}

      {showControls && (
        <label className="absolute bottom-3 right-3 z-10 rounded bg-black/60 px-3 py-1.5 text-xs text-white cursor-pointer hover:bg-black/80">
          Carica immagine
          <input ref={inputRef} type="file" accept="image/*" className="hidden" />
        </label>
      )}
    </div>
  );
}

export default WaterRippleImage;
