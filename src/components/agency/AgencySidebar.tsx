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
  X,
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

  // FORMATTAZIONE PULITA DEL NOME AGENZIA
  let formattedAgencyName = (agencyId || "sposi-in-love")
    .replace(/-/g, " ")
    .replace(/@/g, " ")
    .toUpperCase();

  if (
    formattedAgencyName.includes("GMAIL") ||
    formattedAgencyName.includes("RICCARDO") ||
    formattedAgencyName.includes("SPOSI IN LOVE")
  ) {
    formattedAgencyName = "SPOSI IN LOVE MASTER DEMO";
  }

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
            <h1 className="font-serif font-bold text-sm text-white truncate">
              {formattedAgencyName}
            </h1>
          </div>
        </div>

        {/* MENU NAVIGAZIONE COMPLETO IN ITALIANO */}
        <nav className="space-y-1.5">
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

          <button
            type="button"
            onClick={() => setActiveTab("monogram")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "monogram"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <Wand2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Sigillo &amp; Iniziali 3D
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tableau")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "tableau"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4 text-[#D4AF37] shrink-0" /> Tableau &amp; Mappa Tavoli
          </button>

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

          <button
            type="button"
            onClick={() => setActiveTab("brand")}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === "brand"
                ? "bg-[#D4AF37] text-[#1E293B] shadow-md"
                : "text-slate-300 hover:bg-[#FAF7F2]/10 hover:text-white"
            }`}
          >
            <Palette className="w-4 h-4 shrink-0" /> Brand &amp; Logo Personalizzato
          </button>
        </nav>
      </div>

      {/* PULSANTE ASSISTENZA B2B */}
      <div className="pt-4 border-t border-slate-700/60 text-[10px] space-y-3">
        <button
          type="button"
          onClick={() => setRichiestaAperta(true)}
          className="w-full py-2.5 px-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.5)] hover:shadow-[0_0_20px_rgba(212,175,55,0.8)] transition-all cursor-pointer"
        >
          <Send className="w-4 h-4 text-slate-900" /> Richiedi Brano / Assistenza
        </button>

        <div className="text-slate-400">
          <p className="font-bold text-[#D4AF37]">Piano Agency Hub Attivo</p>
          <p className="mt-0.5">{createdCount} di 10 Matrimoni Utilizzati</p>
        </div>
      </div>

      {/* FINESTRA MODALE GRANDE E SPAZIOSA AL CENTRO DELLO SCHERMO */}
      {richiestaAperta && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in text-left">
          <div className="max-w-lg w-full bg-slate-900 text-white p-6 md:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-5 relative">
            <button
              type="button"
              onClick={() => setRichiestaAperta(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Assistenza B2B &amp; Canzone Inedita SIAE
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                Richiesta Diretta al Team RM Studio
              </h3>
              <p className="text-xs text-slate-300 font-serif">
                Compila il modulo per richiedere la colonna sonora su misura o supporto per la tua agenzia.
              </p>
            </div>

            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={() => setInviatoWeb3(true)}
              className="space-y-4"
            >
              <input type="hidden" name="access_key" value="9013a8d5-0901-42a0-b9e6-4c45553f960d" />
              <input type="hidden" name="subject" value="Richiesta Assistenza B2B dal Pannello Agenzia" />

              <div>
                <label className="block text-xs font-bold text-[#D4AF37] mb-1">Nome Agenzia / Referente *</label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={formattedAgencyName}
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#D4AF37] mb-1">Oggetto della Richiesta *</label>
                <input
                  type="text"
                  name="subject_title"
                  required
                  placeholder="Es. Richiesta Canzone Inedita per Sposi / Assistenza Tecnica"
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-bold outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#D4AF37] mb-1">Messaggio Dettagliato *</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Descrivi la tua richiesta o i dettagli degli sposi per la canzone su misura..."
                  className="w-full text-xs p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-serif outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors cursor-pointer shadow-lg"
                >
                  Invia Messaggio al Team
                </button>
                <button
                  type="button"
                  onClick={() => setRichiestaAperta(false)}
                  className="px-5 py-3 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-700 cursor-pointer"
                >
                  Chiudi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
