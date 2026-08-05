"use client";

import React from "react";

export interface Testimonial {
  id?: string;
  name?: string;
  quote?: string;
}

export interface MarqueeProps {
  text?: string;
  coupleNames?: string;
  items?: Testimonial[];
}

export default function Marquee({
  text,
  coupleNames = "Elena & Davide",
  items = [],
}: MarqueeProps) {
  const safeItems = Array.isArray(items) ? items : [];

  const contentText =
    safeItems.length > 0
      ? safeItems.map((item) => `"${item.quote || ""}" — ${item.name || "Anonimo"}`).join(" • ")
      : text || `✦ IL MATRIMONIO DI ${coupleNames.toUpperCase()} ✦ BENVENUTI AL NOSTRO GIORNO SPECIALE ✦`;

  return (
    <div className="overflow-hidden whitespace-nowrap w-full bg-[#1E293B] text-[#D4AF37] py-2 border-y border-[#D4AF37]/30 select-none shadow-md">
      <div className="inline-block animate-marquee font-serif text-xs uppercase tracking-widest font-bold">
        <span className="mx-8">{contentText}</span>
        <span className="mx-8">{contentText}</span>
        <span className="mx-8">{contentText}</span>
      </div>
    </div>
  );
}
