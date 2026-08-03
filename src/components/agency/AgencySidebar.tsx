"use client";

import React from "react";
import { Folder, PlusCircle, Palette, Sliders, Music, Building2 } from "lucide-react";

interface AgencySidebarProps {
  agencySlug: string;
  activeTab: "list" | "create" | "brand";
  setActiveTab: (tab: "list" | "create" | "brand") => void;
  onOpenWeb3Forms: () => void;
  style?: React.CSSProperties;
}

export default function AgencySidebar({
  agencySlug,
  activeTab,
  setActiveTab,
  onOpenWeb3Forms,
  style,
}: AgencySidebarProps) {
  return (
    <div style={style} className="border-r border-[#D4AF37]/30 p-6 flex flex-col justify-between bg-white shadow-sm min-w-[220px]">
      <div>
        <div className="mb-8">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase block mb-1">
            Agency Hub White-Label
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#1E293B] uppercase tracking-wider">
            {agencySlug.replace(/-/g, " ")}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Studio Agenzia • <span className="text-emerald-600 font-bold">10 Crediti Attivi</span>
          </p>
        </div>

        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
              activeTab === "list" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"
            }`}
          >
            <Folder className="w-4 h-4" /> I Miei Matrimoni Clienti
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
              activeTab === "create" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"
            }`}
          >
            <PlusCircle className="w-4 h-4" /> Crea &amp; Configura Invito
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("brand")}
            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
              activeTab === "brand" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"
            }`}
          >
            <Building2 className="w-4 h-4" /> Personalizzazione Brand Agenzia
          </button>
        </nav>
      </div>

      {/* BOX RICHIESTA BRANO FF EDIZIONI */}
      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/40">
        <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
          <Music className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">FF Edizioni</span>
        </div>
        <p className="text-xs text-[#1E293B] font-bold">Brano Inedito per Sposi</p>
        <p className="text-[11px] text-slate-500 mt-1 mb-3">
          Richiedi la canzone d&apos;autore personalizzata al Maestro Fausto Fusetti.
        </p>
        <button
          type="button"
          onClick={onOpenWeb3Forms}
          className="w-full py-2 bg-[#D4AF37] text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition"
        >
          Richiedi Canzone ↗
        </button>
      </div>
    </div>
  );
}
