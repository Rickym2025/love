"use client";

import React from "react";
import { LayoutGrid, Palette, Sparkles } from "lucide-react";

export interface AgencySidebarProps {
  agencyId?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function AgencySidebar({
  agencyId = "sposi-in-love",
  activeTab,
  setActiveTab,
}: AgencySidebarProps) {
  // Protezione totale su agencyId per evitare TypeError .replace
  const formattedAgencyName = (agencyId || "sposi-in-love")
    .replace(/-/g, " ")
    .toUpperCase();

  return (
    <div className="w-64 bg-slate-950 text-slate-200 border-r border-slate-800 p-6 flex flex-col justify-between min-h-screen">
      <div className="space-y-6">
        {/* LOGO AGENZIA */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Agency Hub White-Label
          </span>
          <h1 className="font-serif font-bold text-lg text-white truncate">
            {formattedAgencyName}
          </h1>
        </div>

        {/* MENU TAB */}
        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "create"
                ? "bg-[#D4AF37] text-slate-900 shadow-md"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Configuratore Invito
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("brand")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${
              activeTab === "brand"
                ? "bg-[#D4AF37] text-slate-900 shadow-md"
                : "text-slate-400 hover:bg-slate-900 hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4" /> Personalizzazione Brand
          </button>
        </nav>
      </div>

      <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-500">
        <p className="font-bold text-slate-400">Piano White-Label Attivo</p>
        <p className="mt-0.5">10 Matrimoni / Anno</p>
      </div>
    </div>
  );
}
