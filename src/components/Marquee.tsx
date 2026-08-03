"use client";

import React from "react";

export interface Testimonial {
  id?: string;
  name?: string;
  quote?: string;
}

export interface MarqueeProps {
  text?: string; // Accetta la stringa diretta delle dediche
  marqueeText?: string; // Accetta anche marqueeText per retro-compatibilità
  items?: Testimonial[]; // Accetta anche un array di recensioni/dediche
  speed?: number;
}

export default function Marquee({
  text = "Evviva gli Sposi! 🎉 • Vi aspettiamo per festeggiare insieme • Un giorno unico ed indimenticabile •",
  marqueeText,
  items,
}: MarqueeProps) {
  // Usa marqueeText se presente, altrimenti passa a text
  const effectiveText = marqueeText || text;

  const contentText =
    items && items.length > 0
      ? items.map((item) => `"${item.quote || ""}" — ${item.name || "Anonimo"}`).join(" • ")
      : effectiveText;

  return (
    <div className="overflow-hidden whitespace-nowrap bg-[#1E293B] text-[#D4AF37] py-2 border-y border-[#D4AF37]/30 font-mono text-xs select-none shadow-md">
      <div className="inline-block animate-pulse tracking-widest uppercase font-semibold">
        <span className="mx-4">{contentText}</span>
        <span className="mx-4">{contentText}</span>
        <span className="mx-4">{contentText}</span>
      </div>
    </div>
  );
}
