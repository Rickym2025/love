"use client";

import React from "react";
import Image from "next/image";
import { Store, ExternalLink } from "lucide-react";
import { PartnerStore } from "./agency/constants";

export interface PartnerStoresProps {
  stores?: PartnerStore[];
}

export default function PartnerStores({ stores = [] }: PartnerStoresProps) {
  // Garanzia totale che stores sia sempre un array valido
  const safeStores = stores && Array.isArray(stores) ? stores : [];

  if (safeStores.length === 0) {
    return (
      <div className="mx-3 my-3 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-2">
        <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-xs">
          🏪 Negozi Convenzionati
        </span>
        <a
          href="https://www.amazon.it/baby-reg/homepage?tag=zero100store-21"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-[#FAF7F2] rounded-xl text-xs font-bold text-[#1E293B] flex items-center justify-between border border-slate-200 hover:border-[#D4AF37] transition-all"
        >
          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 flex-shrink-0">
              <Image src="/logo.png" alt="Amazon Logo" fill className="object-contain" />
            </div>
            <span>Lista Nozze Ufficiale Amazon ↗</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
        </a>
      </div>
    );
  }

  return (
    <div className="mx-3 my-3 p-4 bg-white rounded-2xl border border-slate-200 text-xs shadow-sm space-y-2">
      <span className="text-[10px] font-bold text-[#8B6508] uppercase block mb-1 font-serif text-xs">
        🏪 Negozi Convenzionati
      </span>
      {safeStores.map((s, idx) => (
        <a
          key={s.id || idx}
          href={s.url || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-[#FAF7F2] rounded-xl text-xs font-bold text-[#1E293B] flex items-center justify-between border border-slate-200 hover:border-[#D4AF37] transition-all"
        >
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
            <span className="truncate">{s.name || "Negozio Partner"} ↗</span>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
        </a>
      ))}
    </div>
  );
}
