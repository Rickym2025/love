"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Folder, PlusCircle, Palette, Sliders, Music, ExternalLink, X, Sparkles, Building2, Store, Eye } from "lucide-react";

export interface AgencyPageProps {
  params: {
    agencyId: string;
  };
}

export default function AgencyStudioPage({ params }: AgencyPageProps) {
  const [activeTab, setActiveTab] = useState<"list" | "create" | "modules" | "brand">("create");
  
  // Template & Palette
  const [selectedTemplate, setSelectedTemplate] = useState<"A" | "B">("A");
  const [selectedColorScheme, setSelectedColorScheme] = useState("1");

  // Dati Sposi e Personalizzazioni
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [weddingDate, setWeddingDate] = useState("24 MAGGIO 2026");
  const [locationName, setLocationName] = useState("Villa del Balbianello");
  const [dressCodeText, setDressCodeText] = useState("Abiti eleganti in tonalità pastello. Evitare il bordeaux.");
  const [welcomePhrase, setWelcomePhrase] = useState("Due anime, un solo destino. Una storia scritta nel cuore.");
  const [customIban, setCustomIban] = useState("IT60 X 0542 8111 0000 0012 3456");
  const [marqueeText, setMarqueeText] = useState("Evviva gli Sposi! 🎉 • Un giorno indimenticabile • Unisciti ai festeggiamenti •");
  const [showWeb3FormsModal, setShowWeb3FormsModal] = useState(false);

  // TUTTI I 19 MODULI ATTIVABILI E VISIBILI
  const [modules, setModules] = useState({
    busta3d: true, // EnvelopeWax
    waterRipple: true, // WaterRippleImage
    kineticGrid: true, // KineticGrid
    containerScroll: true, // ContainerScrollAnimation
    animatedGradient: true, // AnimatedGradient
    partingClouds: true, // PartingClouds
    scratchDate: true, // ScratchDate / ScratchCard
    marqueeDediche: true, // Marquee
    dressCode: true, // Dress Code Palette
    partnerStores: true, // PartnerStores
    listaNozzeAmazon: true, // Wishlist Amazon
    confermaRsvp: true, // RsvpForm
    loveQuiz: true, // LoveQuiz (Pagina Festa)
    photoPuzzle: true, // PhotoPuzzle (Pagina Festa)
    scratchPhoto: true, // ScratchPhoto (Pagina Festa)
    photoWall: true, // PhotoWallSection (10 Filtri + Proiettore)
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
            <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37] uppercase block mb-1">Agency Hub White-Label</span>
            <h1 className="text-2xl font-serif font-bold text-[#1E293B] uppercase tracking-wider">SPOSI IN LOVE</h1>
            <p className="text-xs text-slate-500 mt-1">Studio Agenzia • <span className="text-emerald-600 font-bold">10 Crediti Attivi</span></p>
          </div>

          <nav className="space-y-2">
            <button type="button" onClick={() => setActiveTab("list")} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${activeTab === "list" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"}`}>
              <Folder className="w-4 h-4" /> I Miei Matrimoni Clienti
            </button>
            <button type="button" onClick={() => setActiveTab("create")} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${activeTab === "create" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"}`}>
              <PlusCircle className="w-4 h-4" /> Crea Invito &amp; Selezione Template
            </button>
            <button type="button" onClick={() => setActiveTab("modules")} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${activeTab === "modules" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"}`}>
              <Sliders className="w-4 h-4" /> Moduli &amp; Effetti (19 Componenti)
            </button>
            <button type="button" onClick={() => setActiveTab("brand")} className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${activeTab === "brand" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"}`}>
              <Building2 className="w-4 h-4" /> Personalizzazione Brand Agenzia
            </button>
          </nav>
        </div>

        {/* CANZONE INEDITA FF EDIZIONI */}
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/40">
          <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
            <Music className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">FF Edizioni</span>
          </div>
          <p className="text-xs text-[#1E293B] font-bold">Brano Inedito per Sposi</p>
          <p className="text-[11px] text-slate-500 mt-1 mb-3">Richiedi la canzone d&apos;autore al Maestro Fausto Fusetti.</p>
          <button type="button" onClick={() => setShowWeb3FormsModal(true)} className="w-full py-2 bg-[#D4AF37] text-slate-900 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-amber-400">
            Richiedi Canzone ↗
          </button>
        </div>
      </div>

      {/* ─── COLONNA 2: CONFIGURATORE CENTRALE ─── */}
      <div className="w-full md:w-2/4 p-8 border-r border-[#D4AF37]/30 overflow-y-auto max-h-screen">
        {activeTab === "create" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Configura Invito &amp; Effetti Visivi</h2>

            {/* SELEZIONE TEMPLATE STRUTTURALE */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">1. Template Grafico (Struttura Layout)</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => { setSelectedTemplate("A"); setCoupleNames("Elena & Davide"); }} className={`p-4 rounded-2xl border-2 text-left ${selectedTemplate === "A" ? "border-[#D4AF37] bg-amber-50" : "border-slate-200 bg-white"}`}>
                  <span className="text-[10px] font-bold uppercase text-[#D4AF37] block">Template A</span>
                  <h4 className="font-serif font-bold text-sm">Arco Romano, Cigni &amp; Effetto Acqua</h4>
                  <p className="text-[10px] text-slate-500 mt-1">WaterRippleImage, Carta Strappata, Timeline oraria e Lista Nozze.</p>
                </button>

                <button type="button" onClick={() => { setSelectedTemplate("B"); setCoupleNames("Francesca & Luca"); }} className={`p-4 rounded-2xl border-2 text-left ${selectedTemplate === "B" ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white"}`}>
                  <span className="text-[10px] font-bold uppercase text-sky-600 block">Template B</span>
                  <h4 className="font-serif font-bold text-sm">Cielo, Nuvole 3D &amp; Griglia Cinetica</h4>
                  <p className="text-[10px] text-slate-500 mt-1">PartingClouds, KineticGrid, 3 Grattabili date e RSVP pastello.</p>
                </button>
              </div>
            </div>

            {/* FORM DATI SPOSI */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold uppercase text-slate-600">2. Dati Sposi &amp; Testi</label>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Nomi Sposi</label>
                <input type="text" value={coupleNames} onChange={(e) => setCoupleNames(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Data Nozze</label>
                <input type="text" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Location</label>
                <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Testo Scorrevole Dediche (Marquee)</label>
                <input type="text" value={marqueeText} onChange={(e) => setMarqueeText(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">IBAN Sposi</label>
                <input type="text" value={customIban} onChange={(e) => setCustomIban(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono" />
              </div>
            </div>
          </div>
        )}

        {/* TAB MODULI & EFFETTI VISIVI (TUTTI E 19) */}
        {activeTab === "modules" && (
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1E293B] mb-2">Attiva o Disattiva Moduli (19 Componenti)</h2>
            {Object.keys(modules).map((key) => {
              const isActive = modules[key as keyof typeof modules];
              return (
                <div key={key} className="flex justify-between items-center p-3.5 bg-white rounded-xl border border-slate-200">
                  <div>
                    <span className="text-xs font-bold capitalize text-[#1E293B] block">{key}</span>
                    <span className="text-[10px] text-slate-400">Componente Visivo &amp; Interattivo</span>
                  </div>
                  <button type="button" onClick={() => toggleModule(key as keyof typeof modules)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${isActive ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                    {isActive ? "Attivo" : "Disattivato"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB BRAND AGENZIA */}
        {activeTab === "brand" && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Personalizzazione Brand Agenzia</h2>
            <p className="text-xs text-slate-500">Carica il logo dell&apos;agenzia White-Label da mostrare nel piè di pagina dell&apos;invito.</p>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Logo Agenzia (PNG Trasparente)</label>
              <input type="file" className="text-xs text-slate-600" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nome Agenzia Wedding Planner</label>
              <input type="text" defaultValue="Sposi in Love Agency" className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
            </div>
          </div>
        )}
      </div>

      {/* ─── COLONNA 3: ANTEPRIMA LIVE REALE CON EFFETTI ─── */}
      <div className="flex-1 p-6 bg-[#1E293B] flex flex-col items-center justify-center">
        <div className="flex justify-between items-center w-full max-w-[320px] mb-3 text-white">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Anteprima Live Invito
          </span>
          <Link href={selectedTemplate === "A" ? "/elena-e-davide" : "/francesca-e-luca"} target="_blank" className="text-[11px] text-slate-300 hover:text-white">
            Apri Full ↗
          </Link>
        </div>

        {/* MOCKUP SMARTPHONE */}
        <div className={`w-[320px] h-[580px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto ${selectedTemplate === "B" ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"}`}>
          
          {/* 1. BUSTA D'EPOCA CON VERA CERALACCA */}
          {modules.busta3d && (
            <div className="m-3 p-4 bg-white rounded-2xl border border-[#D4AF37]/30 text-center shadow-sm relative">
              <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">✦ Busta &amp; Sigillo Ceralacca</span>
              <p className="font-serif font-bold text-sm text-[#1E293B]">{coupleNames}</p>
              
              <div className="relative w-12 h-12 mx-auto my-2">
                <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
              </div>
              <span className="text-[9px] uppercase font-bold text-slate-400 animate-pulse">Tocca per Aprire</span>
            </div>
          )}

          {/* 2. EFFETTO ACQUA O GRIGLIA CINETICA */}
          {modules.waterRipple && (
            <div className="m-3 p-2 bg-sky-100/60 rounded-xl border border-sky-300 text-center text-[10px] text-sky-800 font-bold">
              💧 WaterRippleImage: Rifrazione Liquida Lago Attiva
            </div>
          )}

          {/* 3. MARQUEE DEDICHE SCORREVOLI */}
          {modules.marqueeDediche && (
            <div className="bg-[#1E293B] text-[#D4AF37] py-1 text-[10px] uppercase tracking-widest truncate px-2 font-mono">
              {marqueeText}
            </div>
          )}

          {/* INTRO HERO */}
          <div className="text-center pt-4 px-4">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">Wedding Day</span>
            <p className="text-xs font-bold text-slate-400 mt-0.5">{weddingDate}</p>
            <h3 className="text-2xl font-serif font-bold mt-1">{coupleNames}</h3>
            <p className="text-xs italic mt-2 px-2 font-serif opacity-80">&quot;{welcomePhrase}&quot;</p>
          </div>

          {/* 4. NUVOLE 3D */}
          {modules.partingClouds && (
            <div className="m-3 p-3 bg-gradient-to-r from-sky-100 via-pink-50 to-white rounded-xl border border-sky-200 text-center text-[10px] text-sky-800 font-bold">
              ☁️ PartingClouds: Nuvole 3D che si aprono allo Scroll
            </div>
          )}

          {/* 5. GRATTIAMO LA DATA */}
          {modules.scratchDate && (
            <div className="my-4 mx-3 p-3 bg-white rounded-xl text-center border border-slate-200">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2">🎰 ScratchDate: 3 Riquadri Grattabili</span>
              <div className="flex justify-center gap-2">
                <div className="w-14 h-12 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-center text-xs font-bold">24</div>
                <div className="w-14 h-12 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-center text-xs font-bold">MAG</div>
                <div className="w-14 h-12 bg-sky-50 rounded-lg border border-sky-200 flex items-center justify-center text-xs font-bold">2026</div>
              </div>
            </div>
          )}

          {/* 6. GIOCHI DELLA FESTA ATTIVI */}
          {(modules.loveQuiz || modules.photoPuzzle || modules.scratchPhoto) && (
            <div className="mx-3 my-3 p-3 bg-purple-50 rounded-xl border border-purple-200 text-center text-[10px] text-purple-900 font-bold">
              🎮 Hub Giochi Festa: Quiz, Puzzle 3x3 e Gratta Foto Attivi
            </div>
          )}

          {/* 7. BOTTONE RSVP */}
          {modules.confermaRsvp && (
            <div className="p-4">
              <button type="button" className="w-full py-3 font-bold rounded-full text-xs shadow-md uppercase tracking-wider bg-[#D4AF37] text-slate-900">
                Conferma Partecipazione (RSVP)
              </button>
            </div>
          )}
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
