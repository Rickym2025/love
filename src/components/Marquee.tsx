"use client";

import React, { ComponentPropsWithoutRef, useRef } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  autoFill?: boolean;
  ariaLabel?: string;
  ariaLive?: "off" | "polite" | "assertive";
  ariaRole?: string;

  // RETROCOMPATIBILITÀ CON ALTRE PAGINE
  text?: string;
  coupleNames?: string;
  items?: Array<{ name: string; role?: string; text: string; stars?: number }>;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
  ariaLabel,
  ariaLive = "off",
  ariaRole = "marquee",
  text,
  coupleNames,
  items,
  ...props
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  const renderedContent = children ? (
    children
  ) : text ? (
    <span className="font-serif text-xs md:text-sm font-bold tracking-widest text-[#D4AF37] px-4 uppercase whitespace-nowrap">
      {text}
    </span>
  ) : coupleNames ? (
    <span className="font-serif text-xs md:text-sm font-bold tracking-widest text-[#D4AF37] px-4 uppercase whitespace-nowrap">
      ✦ IL MATRIMONIO DI {coupleNames.toUpperCase()} ✦ BENVENUTI AL NOSTRO GIORNO SPECIALE ✦
    </span>
  ) : items ? (
    <div className="flex gap-4 items-center">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="p-3 bg-slate-900 border border-[#D4AF37]/50 rounded-xl text-white text-xs shrink-0 whitespace-nowrap"
        >
          <strong className="text-[#D4AF37]">{item.name}</strong>: &quot;{item.text}&quot;
        </div>
      ))}
    </div>
  ) : (
    <span className="font-serif text-xs font-bold tracking-widest text-[#D4AF37] px-4 uppercase whitespace-nowrap">
      ✦ LOVE — LE PARTECIPAZIONI DIGITALI D&apos;AUTORE ✦
    </span>
  );

  return (
    <div
      {...props}
      ref={marqueeRef}
      data-slot="marquee"
      className={cn(
        "group flex overflow-hidden p-2 [--duration:45s] [--gap:1.5rem] [gap:var(--gap)] select-none cursor-grab active:cursor-grabbing",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
      tabIndex={0}
    >
      {React.useMemo(
        () => (
          <>
            {Array.from({ length: repeat }, (_, i) => (
              <div
                key={i}
                className={cn(
                  !vertical ? "flex-row [gap:var(--gap)]" : "flex-col [gap:var(--gap)]",
                  "flex shrink-0 justify-around",
                  !vertical && "animate-marquee flex-row",
                  vertical && "animate-marquee-vertical flex-col",
                  pauseOnHover && "group-hover:[animation-play-state:paused]",
                  reverse && "[animation-direction:reverse]"
                )}
              >
                {renderedContent}
              </div>
            ))}
          </>
        ),
        [repeat, renderedContent, vertical, pauseOnHover, reverse]
      )}
    </div>
  );
}

export default Marquee;
