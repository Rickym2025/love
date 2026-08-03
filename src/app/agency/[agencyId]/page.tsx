"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Folder, PlusCircle, Palette, Sliders, Music, ExternalLink, X, Sparkles } from "lucide-react";

export interface AgencyPageProps {
  params: {
    agencyId: string;
  };
}

export default function AgencyStudioPage({ params }: AgencyPageProps) {
  const [activeTab, setActiveTab] = useState<"list" | "create" | "brand" | "modules">("create");
  
  // Stato Tema e Dati Sposi
  const [selectedTemplate, setSelectedTemplate] = useState<"1" | "2">("1");
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [weddingDate, setWeddingDate] = useState("24 MAGGIO 2026");
  const [locationName, setLocationName] = useState("Villa del Balbianello");
  const [themeParty, setThemeParty] = useState("Elegante in Abito da Sera");
  const [welcomePhrase, setWelcomePhrase] = useState("Due anime, un solo destino. Una storia scritta nel cuore.");
  const [showWeb3FormsModal, setShowWeb3FormsModal] = useState(false);

  // Moduli Attivabili
  const [modules, setModules] = useState({
    envelope: true,
    waterRipple: true,
    clouds: true,
    scratchDate: true,
    dressCode: true,
    wishlist: true,
    photoWall: true,
  });

  const toggleModule = (key: keyof typeof modules) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col md:flex-row font-sans">
      {/* ─── COLONNA 1: MENU AGENZIA ─── */}
      <div className="w-full md:w-1/4 border-r border-[#D4AF37]/30 p-6 flex flex-col justify-between bg-white shadow-sm">
        <div>
          <div className="mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase block mb-1">
              Agency Hub White-Label
            </span>
            <h1 className="text-2xl font-serif font-bold text-[#1E293B] uppercase tracking-wider">SPOSI IN LOVE</h1>
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
              <Folder className="w-4 h-4" />
              I Miei Matrimoni Clienti
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("create")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                activeTab === "create" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              Crea Invito & Selezione Template
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("brand")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                activeTab === "brand" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"
              }`}
            >
              <Palette className="w-4 h-4" />
              Personalizzazione Brand Agenzia
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("modules")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                activeTab === "modules" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"
              }`}
            >
              <Sliders className="w-4 h-4" />
              Moduli & Effetti Attivabili
            </button>
          </nav>
        </div>

        {/* BOX CANZONE FF EDIZIONI */}
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/40">
          <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
            <Music className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">FF Edizioni</span>
          </div>
          <p className="text-xs text-[#1E293B] font-bold">Brano Inedito per Sposi</p>
          <p className="text-[11px] text-slate-500 mt-1 mb-3">
            Composizione d'autore personalizzata dal Maestro Fausto Fusetti.
          </p>
          <button
            type="button"
            onClick={() => setShowWeb3FormsModal(true)}
            className="w-full py-2.5 bg-[#D4AF37] text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition"
          >
            Richiedi Canzone ↗
          </button>
        </div>
      </div>

      {/* ─── COLONNA 2: CONFIGURATORE CENTRALE ─── */}
      <div className="w-full md:w-2/4 p-8 border-r border-[#D4AF37]/30 overflow-y-auto max-h-screen">
        {activeTab === "create" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Configura Invito Digitale</h2>

            {/* SELEZIONE TEMPLATE REALISTICO */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">1. Selezione Template Grafico D'Élite</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplate("1");
                    setCoupleNames("Elena & Davide");
                    setLocationName("Villa del Balbianello");
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    selectedTemplate === "1" ? "border-[#D4AF37] bg-amber-50/50 shadow-md" : "border-slate-200 bg-white"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-[#D4AF37] block mb-1">Template 1</span>
                  <h4 className="font-serif font-bold text-sm text-[#1E293B]">Avorio & Lago di Como</h4>
                  <p className="text-[11px] text-slate-500 mt-1">Arco dorato, cigni sul lago, ceralacca oro e mappa classica.</p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedTemplate("2");
                    setCoupleNames("Francesca & Luca");
                    setLocationName("Villa Borromeo, Stresa");
                  }}
                  className={`p-4 rounded-2xl border-2 text-left transition ${
                    selectedTemplate === "2" ? "border-sky-500 bg-sky-50/50 shadow-md" : "border-slate-200 bg-white"
                  }`}
                >
                  <span className="text-[10px] font-bol
