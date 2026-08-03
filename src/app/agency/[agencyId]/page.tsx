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
      {/* COLONNA 1: MENU AGENZIA */}
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
              Crea Invito &amp; Selezione Template
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
              Moduli &amp; Effetti Attivabili
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
            Composizione d&apos;autore personalizzata dal Maestro Fausto Fusetti.
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

      {/* COLONNA 2: CONFIGURATORE CENTRALE */}
      <div className="w-full md:w-2/4 p-8 border-r border-[#D4AF37]/30 overflow-y-auto max-h-screen">
        {activeTab === "create" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Configura Invito Digitale</h2>

            {/* SELEZIONE TEMPLATE REALISTICO */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">1. Selezione Template Grafico D&apos;Élite</label>
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
                  <h4 className="font-serif font-bold text-sm text-[#1E293B]">Avorio &amp; Lago di Como</h4>
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
                  <span className="text-[10px] font-bold uppercase text-sky-600 block mb-1">Template 2</span>
                  <h4 className="font-serif font-bold text-sm text-slate-900">Cielo Azzurro &amp; Nuvole 3D</h4>
                  <p className="text-[11px] text-slate-500 mt-1">3 Grattabili, nuvole Parting Clouds, galleria dress code e RSVP pastello.</p>
                </button>
              </div>
            </div>

            {/* DATI SPOSI */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold uppercase text-slate-600">2. Dati della Coppia &amp; Personalizzazione</label>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Nomi Sposi</label>
                <input
                  type="text"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#1E293B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Data delle Nozze</label>
                <input
                  type="text"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#1E293B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Location</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#1E293B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Festa a Tema / Dress Code Notes</label>
                <input
                  type="text"
                  value={themeParty}
                  onChange={(e) => setThemeParty(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#1E293B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* MODULI & EFFETTI ATTIVABILI */}
        {activeTab === "modules" && (
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1E293B] mb-2">Moduli &amp; Effetti Attivabili</h2>
            {Object.keys(modules).map((key) => {
              const isActive = modules[key as keyof typeof modules];
              return (
                <div key={key} className="flex justify-between items-center p-3.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-bold capitalize text-[#1E293B]">{key}</span>
                  <button
                    type="button"
                    onClick={() => toggleModule(key as keyof typeof modules)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      isActive ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {isActive ? "Attivo" : "Disattivato"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* COLONNA 3: ANTEPRIMA LIVE REALE CON VERA CERALACCA */}
      <div className="flex-1 p-6 bg-[#1E293B] flex flex-col items-center justify-center">
        <div className="flex justify-between items-center w-full max-w-[320px] mb-3 text-white">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Anteprima Live Reale
          </span>
          <Link href={selectedTemplate === "1" ? "/elena-e-davide" : "/francesca-e-luca"} target="_blank" className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1">
            Apri Full ↗
          </Link>
        </div>

        {/* Frame Mobile dello Smartphone */}
        <div
          className={`w-[320px] h-[580px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto transition-colors duration-500 ${
            selectedTemplate === "2" ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"
          }`}
        >
          {/* BUSTA D'EPOCA CON VERA CERALACCA LOGO */}
          {modules.envelope && (
            <div className="m-3 p-4 bg-white rounded-2xl border border-[#D4AF37]/30 text-center shadow-sm relative">
              <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">✦ Partecipazione Digitale</span>
              <p className="font-serif font-bold text-sm text-[#1E293B]">{coupleNames}</p>
              
              <div className="relative w-12 h-12 mx-auto my-2">
                <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
              </div>
              
              <span className="text-[9px] uppercase font-bold text-slate-400 animate-pulse">Tocca per Aprire</span>
            </div>
          )}

          {/* INTRO HERO */}
          <div className="text-center pt-4 px-4">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">Wedding Day</span>
            <p className="text-xs font-bold text-slate-400 mt-0.5">{weddingDate}</p>
            <h3 className="text-2xl font-serif font-bold mt-1">{coupleNames}</h3>
            <p className="text-xs italic mt-2 px-2 font-serif opacity-80">&quot;{welcomePhrase}&quot;</p>
          </div>

          {/* GRATTIAMO LA DATA */}
          {modules.scratchDate && (
            <div className="my-4 mx-3 p-3 bg-white rounded-xl text-center border border-slate-200">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2">🎰 Gratta per Scoprire la Data</span>
              <div className="flex justify-center gap-2">
                <div className="w-14 h-12 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-center text-xs font-bold">24</div>
                <div className="w-14 h-12 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-center text-xs font-bold">MAG</div>
                <div className="w-14 h-12 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-center text-xs font-bold">2026</div>
              </div>
            </div>
          )}

          {/* PROGRAMMA FESTEGGIAMENTI */}
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-left text-xs space-y-2 shadow-sm">
            <p className="font-bold text-center text-[#D4AF37] uppercase text-[10px] mb-2">✦ Programma Festeggiamenti ✦</p>
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <span>🚪</span> <span className="font-bold text-[11px]">16:30</span> — Accoglienza Ospiti a {locationName}
            </div>
            <div className="flex items-center gap-2 p-2 bg-[#FAF7F2] rounded-lg">
              <span>💍</span> <span className="font-bold text-[11px]">17:30</span> — Cerimonia e Scambio degli Anelli
            </div>
            <div className="flex items-center gap-2 p-2 bg-sky-50 rounded-lg">
              <span>🥂</span> <span className="font-bold text-[11px]">19:00</span> — Aperitivo Vista Lago &amp; Cocktail
            </div>
            <div className="flex items-center gap-2 p-2 bg-rose-50 rounded-lg">
              <span>🍽️</span> <span className="font-bold text-[11px]">20:30</span> — Cena di Gala &amp; Taglio Torta
            </div>
          </div>

          {/* DRESS CODE CON CERCHI COLORE */}
          {modules.dressCode && (
            <div className="mx-3 my-4 p-3 bg-white rounded-xl text-center border border-slate-200">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">Dress Code &amp; Palette</span>
              <p className="text-[10px] text-slate-500 mb-2">{themeParty}</p>
              <div className="flex justify-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-slate-300" />
                <div className="w-5 h-5 rounded-full bg-[#FDE68A]" />
                <div className="w-5 h-5 rounded-full bg-[#FCA5A5]" />
                <div className="w-5 h-5 rounded-full bg-[#93C5FD]" />
                <div className="w-5 h-5 rounded-full bg-[#60A5FA]" />
              </div>
            </div>
          )}

          {/* BOTTONE RSVP */}
          <div className="p-4">
            <button type="button" className={`w-full py-3 font-bold rounded-full text-xs shadow-md uppercase tracking-wider ${selectedTemplate === "2" ? "bg-sky-500 text-white" : "bg-[#D4AF37] text-slate-900"}`}>
              Conferma Partecipazione (RSVP)
            </button>
          </div>
        </div>
      </div>

      {/* MODALE WEB3FORMS */}
      {showWeb3FormsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full border border-[#D4AF37] text-left shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-[#1E293B]">Richiesta Brano Inedito — FF Edizioni</h3>
              <button type="button" onClick={() => setShowWeb3FormsModal(false)} className="text-slate-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-3">
              <input type="hidden" name="access_key" value="9013a8d5-0901-42a0-b9e6-4c45553f960d" />
              <input type="hidden" name="subject" value="Richiesta Brano Inedito FF Edizioni - LOVE" />
              <input type="text" name="sposi" required placeholder="Nomi Sposi" className="w-full p-2.5 rounded-lg border border-slate-300 text-xs" />
              <input type="email" name="email" required placeholder="Email Agenzia" className="w-full p-2.5 rounded-lg border border-slate-300 text-xs" />
              <textarea name="note" required rows={3} placeholder="Dettagli sulla storia della coppia..." className="w-full p-2.5 rounded-lg border border-slate-300 text-xs resize-none" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowWeb3FormsModal(false)} className="px-4 py-2 text-xs bg-slate-200 text-slate-700 rounded-lg">Annulla</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#D4AF37] text-slate-900 font-bold rounded-lg hover:bg-amber-400">Invia Richiesta 🚀</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
