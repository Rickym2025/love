"use client";

import React from "react";
import Image from "next/image";

export default function ConfiguratorBrand() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-[#1E293B]">Personalizzazione Brand White-Label</h2>
      <p className="text-xs text-slate-500">Configura il tuo logo ed i contatti dell&apos;agenzia che appariranno nel footer degli inviti dei tuoi clienti.</p>

      <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 border border-slate-200 rounded-2xl overflow-hidden p-2 bg-[#FAF7F2]">
            <Image src="/logo.png" alt="Logo Agenzia" fill className="object-contain p-1" priority />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Logo Agenzia (PNG Trasparente)</label>
            <input type="file" accept="image/*" className="text-xs text-slate-600 block w-full" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Nome Agenzia / Wedding Planner</label>
          <input type="text" defaultValue="Sposi In Love Agency" className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1E293B]" />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Link Sito Web Agenzia</label>
          <input type="text" defaultValue="https://www.sposiinlove.it" className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono text-[#1E293B]" />
        </div>
      </div>
    </div>
  );
}
