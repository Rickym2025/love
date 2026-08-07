"use client";

import React, { useState, useCallback } from "react";

export interface CardItem {
  id?: string;
  imgUrl: string;
  alt?: string;
  linkUrl?: string;
  caption?: string;
  author?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
  onItemClick?: (card: CardItem, index: number) => void;
}

const MAX_VISIBLE = 7;
const HALF = 3;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.78, x: -160, y: 35, zIndex: 1 },
  { rot: -14, scale: 0.85, x: -110, y: 20, zIndex: 2 },
  { rot: -7,  scale: 0.93, x: -55,  y: 7,  zIndex: 3 },
  { rot: 0,   scale: 1.0,  x: 0,    y: 0,  zIndex: 10 },
  { rot: 7,   scale: 0.93, x: 55,   y: 7,  zIndex: 3 },
  { rot: 14,  scale: 0.85, x: 110,  y: 20, zIndex: 2 },
  { rot: 21,  scale: 0.78, x: 160,  y: 35, zIndex: 1 },
];

function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.22 * absDistance * absDistance,
    x: distance * 140,
    y: absDistance * absDistance * 30,
    zIndex: 10 - Math.abs(slot - center),
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full border-[1.5px] border-[#D4AF37]/50 bg-slate-900/90 text-[#D4AF37] cursor-pointer shrink-0 z-30 outline-none shadow-[0_4px_20px_rgba(0,0,0,0.4)] hover:border-[#D4AF37] hover:text-amber-300 active:scale-95 transition-all duration-300";

export default function SocialCards({ cards, onItemClick }: SocialCardsProps) {
  const totalCards = cards.length;

  // FRECCETTE E SELETTORE ATTIVI CON 2 O PIÙ FOTO (NON SERVE ARRIVARE A 7)
  const needsPagination = totalCards > 1;

  const [centerIndex, setCenterIndex] = useState(needsPagination ? HALF : totalCards >> 1);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

  const cycle = useCallback((direction: "left" | "right") => {
    if (!needsPagination) return;
    setCenterIndex((prev) =>
      direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards, needsPagination]);

  if (!totalCards) return null;

  const getSlotForCard = (cardIdx: number): number | null => {
    if (!needsPagination) return cardIdx;
    for (let slot = 0; slot < MAX_VISIBLE; slot++) {
      const idx = ((centerIndex + slot - HALF) % totalCards + totalCards) % totalCards;
      if (idx === cardIdx) return slot;
    }
    return null;
  };

  const slotCount = needsPagination ? Math.min(totalCards, MAX_VISIBLE) : totalCards;

  const chevron = (direction: "left" | "right") => (
    <svg className="relative z-[2] w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <section className="flex flex-col items-center w-full py-4 lg:py-6 px-2 relative z-20">
      <div className="flex items-center justify-center w-full max-w-[90rem]">
        <div className="fan-layout flex relative justify-center items-center w-full h-[280px] sm:h-[340px] md:h-[400px]">
          {cards.map((card, index) => {
            const slot = getSlotForCard(index);
            const isVisible = slot !== null;
            const baseConfig = slot !== null ? getSlotConfig(slotCount, slot) : { rot: 0, scale: 0.5, x: 0, y: 100, zIndex: 0 };

            let extraX = 0;
            let extraY = 0;
            let extraScale = 1;
            let extraRot = 0;

            if (hoveredSlot !== null && slot !== null) {
              if (slot === hoveredSlot) {
                extraY = -25;
                extraScale = 1.1;
              } else {
                const dist = slot - hoveredSlot;
                extraX = dist < 0 ? -25 : 25;
                extraRot = dist < 0 ? -4 : 4;
              }
            }

            const finalX = baseConfig.x + extraX;
            const finalY = baseConfig.y + extraY;
            const finalScale = baseConfig.scale * extraScale;
            const finalRot = baseConfig.rot + extraRot;

            return (
              <div
                key={card.id || index}
                onMouseEnter={() => slot !== null && setHoveredSlot(slot)}
                onMouseLeave={() => setHoveredSlot(null)}
                onClick={() => onItemClick && onItemClick(card, index)}
                className={`fan-card absolute w-[140px] h-[200px] sm:w-[180px] sm:h-[250px] md:w-[220px] md:h-[300px] rounded-2xl border-2 border-[#D4AF37] bg-slate-900 shadow-2xl overflow-hidden cursor-pointer group transition-all duration-500 ease-out ${
                  isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                style={{
                  transform: `translate3d(${finalX}px, ${finalY}px, 0) rotate(${finalRot}deg) scale(${finalScale})`,
                  zIndex: hoveredSlot === slot ? 30 : baseConfig.zIndex,
                }}
              >
                <img
                  src={card.imgUrl}
                  loading="lazy"
                  alt={card.alt || `Card ${index}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white z-20 text-left">
                  <p className="text-xs font-serif font-bold text-[#D4AF37] truncate">{card.caption || "Foto Sposi"}</p>
                  <p className="text-[10px] text-slate-300 truncate">- {card.author || "Invitato"}</p>
                  <span className="text-[9px] font-bold text-amber-300 block mt-0.5 uppercase tracking-wider">✦ Filtri &amp; Dedica</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FRECCE E SELETTORE A PALLINI SEMPRE VISIBILI QUANDO CI SONO PIÙ FOTO */}
      {needsPagination && (
        <div className="flex items-center justify-center gap-4 mt-6 z-30">
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("left")} aria-label="Foto Precedente">
            {chevron("left")}
          </button>
          <div className="flex items-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCenterIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === centerIndex ? "bg-[#D4AF37] scale-[1.3] shadow-md" : "bg-slate-700 hover:bg-slate-500"
                }`}
                title={`Vai alla foto ${i + 1}`}
              />
            ))}
          </div>
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("right")} aria-label="Foto Successiva">
            {chevron("right")}
          </button>
        </div>
      )}
    </section>
  );
}
