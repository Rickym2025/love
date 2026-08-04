"use client";

import React from "react";
import Image from "next/image";
import { LayoutGrid, FolderHeart, Palette, Sparkles } from "lucide-react";

export interface AgencySidebarProps {
  agencyId?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  style?: React.CSSProperties;
}

export default function AgencySidebar({
  agencyId = "sposi-in-love",
  activeTab,
  setActiveTab,
  style,
}: AgencySidebarProps) {
  const formattedAgencyName = (agencyId || "sposi-in-love")
    .replace(/-/g, " ")
    .toUpperCase();

  return (
    <aside
      style={style}
      className="bg-[#1E293B] text-[#FAF7F2] border-r border-[#D4AF37]/30 p-6 flex flex-col justify-between h-full select-none overflow-y-auto"
    >
      <div className="space-y-6">
        {/* LOGO AGENZIA */}
        <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
          <div className="relative w-10 h-10 flex-shrink-0 drop-shadow">
            <Image src="/logo.png" alt="Logo Agenzia" fill className="object-contain" priority />
          </div>
          <div className="overflow-hidden">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> White-Label Studio
            </span>
            <h1 className="font-serif font-bold text-base text-white truncate">
              {formattedAgencyName}
            </h1>
          </div>
        </div>

        {/* NAVIGAZIONE CON PULSANTE INVITI GIÀ CREATI */}
        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "create"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Crea / Modifica Invito
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "list"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <FolderHeart className="w-4 h-4 text-[#D4AF37]" /> Inviti Già Creati (5)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("brand")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
              activeTab === "brand"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4" /> Brand &amp; Logo White-Label
          </button>
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-700/60 text-[10px] text-slate-400">
        <p className="font-bold text-[#D4AF37]">Piano Agency Hub Attivo</p>
        <p className="mt-0.5">5 di 10 Matrimoni Utilizzati</p>
      </div>
    </aside>
  );
}
