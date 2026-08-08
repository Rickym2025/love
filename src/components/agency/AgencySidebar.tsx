"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutGrid,
  FolderHeart,
  Palette,
  Sparkles,
  Send,
  MessageSquare,
  Wand2,
  Users,
  DollarSign,
} from "lucide-react";

export interface AgencySidebarProps {
  agencyId?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  createdCount?: number;
  style?: React.CSSProperties;
}

export default function AgencySidebar({
  agencyId = "sposi-in-love",
  activeTab,
  setActiveTab,
  createdCount = 3,
  style,
}: AgencySidebarProps) {
  const [richiestaAperta, setRichiestaAperta] = useState(false);
  const [inviatoWeb3, setInviatoWeb3] = useState(false);

  const formattedAgencyName = (agencyId || "sposi-in-love")
    .replace(/-/g, " ")
    .toUpperCase();

  const handleWeb3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviatoWeb3(true);
  };

  return (
    <aside
      style={style}
      className="bg-[#1E293B] text-[#FAF7F2] border-r border-[#D4AF37]/30 p-5 flex flex-col justify-between h-full select-none overflow-y-auto"
    >
      <div className="space-y-5">
        {/* LOGO AGENZIA WHITE-LABEL */}
        <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
          <div className="relative w-10 h-10 flex-shrink-0 drop-shadow">
            <Image src="/logo.png" alt="Logo Agenzia" fill className="object-contain" priority unoptimized />
          </div>
          <div className="overflow-hidden">
            <span className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" /> White-Label Hub
            </span>
            <h1 className="font-serif font-bold text-base text-white truncate">
              {formattedAgencyName}
            </h1>
          </div>
        </div>

        {/* MENU NAVIGAZIONE COMPLETO CON TUTTI I 7 MODULI B2B */}
        <nav className="space-y-1.5">
          {/* TAB 1: CREA / MODIFICA */}
          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "create"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0" /> Crea / Modifica Invito
          </button>

          {/* TAB 2: INVITI GIÀ CREATI */}
          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "list"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <FolderHeart className="w-4 h-4 text-[#D4AF37] shrink-0" /> Inviti Salvati ({createdCount})
          </button>

          {/* TAB 3: MONOGRAM STUDIO AI (FAL.AI) */}
          <button
            type="button"
            onClick={() => setActiveTab("monogram")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "monogram"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <Wand2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Monogram Studio AI (Fal.ai)
          </button>

          {/* TAB 4: TABLEAU DE MARIAGE TAVOLI */}
          <button
            type="button"
            onClick={() => setActiveTab("tableau")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "tableau"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4 text-[#D4AF37] shrink-0" /> Tableau de Mariage
          </button>

          {/* TAB 5: BUDGET PLANNER SPESE FORNITORI */}
          <button
            type="button"
            onClick={() => setActiveTab("budget")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "budget"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <DollarSign className="w-4 h-4 text-[#D4AF37] shrink-0" /> Controllo Spese &amp; Budget
          </button>

          {/* TAB 6: SPEDIZIONE WHATSAPP INVITATI */}
          <button
            type="button"
            onClick={() => setActiveTab("whatsapp")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "whatsapp"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#D4AF37] shrink-0" /> Lista Invitati &amp; WhatsApp
          </button>

          {/* TAB 7: BRAND WHITE-LABEL */}
          <button
            type="button"
            onClick={() => setActiveTab("brand")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "brand"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4 shrink-0" /> Brand &amp; Logo White-Label
          </button>
        </nav>
      </div>

      {/* MODULO RICHIESTA WEB3FORMS */}
      <div className="pt-4 border-t border-slate-700/60 text-[10px] space-y-3">
        {!richiestaAperta ? (
          <button
            type="button"
            onClick={() => setRichiestaAperta(true)}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.5)] hover:shadow-[0_0_20px_rgba(212,175,55,0.8)] transition-all cursor-pointer"
          >
            <Send className="w-4 h-4 text-slate-900" /> Richiedi Brano / Assistenza
          </button>
        ) : (
          <form
            onSubmit={handleWeb3Submit}
            className="p-3 bg-slate-900 rounded-2xl border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.6)] space-y-2 text-left"
          >
            <span className="font-bold text-[#D4AF37] block text-xs">Richiesta Assistenza B2B</span>
            {inviatoWeb3 ? (
              <p className="text-emerald-400 font-bold">Richiesta inviata con successo!</p>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Oggetto (es. Brano SIAE)"
                  required
                  className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-[10px] font-bold"
                />
                <textarea
                  rows={2}
                  placeholder="Messaggio per il team..."
                  required
                  className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-white text-[10px] resize-none"
                />
                <div className="flex gap-1 pt-1">
                  <button type="submit" className="flex-1 py-1.5 bg-[#D4AF37] text-slate-900 font-bold rounded-lg text-[10px] cursor-pointer">Invia Web3</button>
                  <button type="button" onClick={() => setRichiestaAperta(false)} className="py-1.5 px-2 bg-slate-800 text-slate-400 rounded-lg text-[10px] cursor-pointer">Chiudi</button>
                </div>
              </>
            )}
          </form>
        )}

        <div className="text-slate-400">
          <p className="font-bold text-[#D4AF37]">Piano Agency Hub Attivo</p>
          <p className="mt-0.5">{createdCount} di 10 Matrimoni Utilizzati</p>
        </div>
      </div>
    </aside>
  );
}
