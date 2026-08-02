'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function PartingClouds({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Nuvola Sinistra si sposta a -100%, Nuvola Destra si sposta a +100%
  const cloudLeftX = useTransform(scrollYProgress, [0, 0.5], ['0%', '-100%']);
  const cloudRightX = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);
  const cloudOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <div ref={containerRef} className="relative py-12 px-6 max-w-4xl mx-auto overflow-hidden">
      {/* NUVOLA SINISTRA */}
      <motion.div
        style={{ x: cloudLeftX, opacity: cloudOpacity }}
        className="absolute top-0 left-0 w-1/2 h-full z-20 pointer-events-none flex items-center justify-start opacity-90"
      >
        <div className="w-64 h-64 bg-[#BBDEFB]/60 blur-3xl rounded-full" />
        <span className="text-8xl -ml-10 select-none">☁️</span>
      </motion.div>

      {/* NUVOLA DESTRA */}
      <motion.div
        style={{ x: cloudRightX, opacity: cloudOpacity }}
        className="absolute top-0 right-0 w-1/2 h-full z-20 pointer-events-none flex items-center justify-end opacity-90"
      >
        <div className="w-64 h-64 bg-[#BBDEFB]/60 blur-3xl rounded-full" />
        <span className="text-8xl -mr-10 select-none">☁️</span>
      </motion.div>

      {/* CONTENUTO CHE SI RIVELA SOTTO LE NUVOLE */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
