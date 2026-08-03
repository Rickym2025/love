"use client";

import React from "react";
import { LayoutGrid, Palette, Sparkles } from "lucide-react";

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
      className="bg-[#1E293B] text-[#FAF7F2] border-r border-[#D4AF37]/30 p-6 flex flex-col justify-between h-screen flex-shrink-0 select-none overflow-y-auto"
    >
      <div className="space-y-6">
        {/* LOGO E NOME AGENZIA */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Agency Hub White-Label
          </span>
          <h1 className="font-serif font-bold text-lg text-white truncate">
            {formattedAgencyName}
          </h1>
        </div>

        {/* MENU NAVIGAZIONE */}
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
            <LayoutGrid className="w-4 h-4" /> Configuratore Invito
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
            <Palette className="w-4 h-4" /> Personalizzazione Brand
          </button>
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-700/60 text-[10px] text-slate-400">
        <p className="font-bold text-[#D4AF37]">Piano White-Label Attivo</p>
        <p className="mt-0.5">10 Matrimoni / Anno</p>
      </div>
    </aside>
  );
}
