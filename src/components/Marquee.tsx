'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
}

export default function Marquee({ items }: { items: Testimonial[] }) {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden py-4 select-none">
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 25,
        }}
      >
        {duplicated.map((t, idx) => (
          <div
            key={idx}
            className="w-80 sm:w-96 flex-shrink-0 bg-white border border-[#E5DACB] p-6 rounded-2xl shadow-sm hover:border-[#D4AF37] transition-all"
          >
            <div className="flex items-center gap-1 mb-3 text-[#D4AF37]">
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
              ))}
            </div>
            <p className="text-xs text-[#4A3D39] italic mb-4 leading-relaxed font-light">"{t.text}"</p>
            <div>
              <h4 className="font-serif text-sm font-bold text-[#4A3D39]">{t.name}</h4>
              <span className="text-[10px] text-[#9E8976] uppercase tracking-wider">{t.role}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
