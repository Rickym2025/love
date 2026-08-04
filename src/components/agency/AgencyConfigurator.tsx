"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, ExternalLink, Download, Edit3, FolderHeart, LayoutGrid, Palette, Trash2 } from "lucide-react";

export interface PartnerStore {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
}

const WELCOME_PHRASE_PRESETS = [
  "Due anime, un solo destino. Una storia scritta nel cuore.",
  "L'amore non consiste nello guardarsi l'un l'altro, ma nel guardare insieme nella stessa direzione.",
  "Niente è per caso, ogni passo ci ha condotti qui. Unisciti alla nostra gioia.",
  "Oggi inizia il nostro 'per sempre'. Siete i benvenuti a celebrare con noi.",
  "Due cuori, una sola melodia. Festeggia il nostro giorno speciale!",
  "Con gioia e gratitudine vi invitiamo a condividere l'inizio della nostra vita insieme.",
  "L'amore è la forza che muove l'universo. Benvenuti al nostro matrimonio.",
  "Amore, risate e ricordi indimenticabili: grazie per essere con noi.",
  "Un giorno di festa, una vita d'amore. Benvenuti al giorno più bello.",
  "Personalizzata (inserisci la tua frase nel campo sottostante)",
];

export const INTRO_START_PRESETS = [
  { id: "arco", name: "🏛️ Arco Romano & Cigni sul Lago", desc: "Sfondo romantico con specchio d'acqua e decorazioni floreali." },
  { id: "busta", name: "✉️ Busta d'Epoca & Sigillo Ceralacca", desc: "Apertura animata con sigillo bordeaux /wax-seal.png." },
  { id: "lago", name: "🌊 Rifrazione Acqua & Lago", desc: "Effetto increspatura liquida interattiva WebGL." },
  { id: "nuvole", name: "☁️ Cielo & Nuvole 3D Volumetriche", desc: "Spettacolare apertura a nuvole che si dividono allo scroll." },
];

export const DATE_DISPLAY_MODES = [
  { id: "scratch", name: "🎰 Gratta la Data (Col Dito / Mouse)" },
  { id: "countdown", name: "⏳ Countdown Timer in Tempo Reale" },
  { id: "text", name: "📜 Data Fissa Elegant (Testo Dorato Grande)" },
];

export const SCHEDULE_SCHEMAS = [
  { id: "classico", name: "🏛️ Classico Elegante" },
  { id: "timeline", name: "📍 Timeline Verticale con Punti Dorati" },
  { id: "nuvole", name: "☁️ Programma tra le Nuvole 3D" },
  { id: "schede", name: "🎴 Schede Card Separati" },
  { id: "minimal", name: "📜 Minimal Serif" },
];

export const EVENT_THEME_PRESETS = [
  "Shabby Chic & Provenzale",
  "Botanico & Greenery",
  "Country Elegant",
  "Luxury Gold & Total White",
  "BOHO Chic & Terracotta",
  "Minimal Modern",
  "Tropical Romance",
  "Personalizzato (inserisci a mano)",
];

export const DRESS_CODE_PALETTES = [
  { id: "1", name: "Pastello Romantico", colors: ["#FAF7F2", "#FDE68A", "#FCA5A5", "#93C5FD", "#60A5FA"] },
  { id: "2", name: "Oro & Champagne", colors: ["#FAF7F2", "#F3EDE2", "#D4AF37", "#B8860B", "#1E293B"] },
  { id: "3", name: "Smeraldo & Salvia", colors: ["#F0FDF4", "#A7F3D0", "#34D399", "#059669", "#064E3B"] },
  { id: "4", name: "Rose Gold & Cipria", colors: ["#FFF1F2", "#FECDD3", "#FB7185", "#E11D48", "#881337"] },
  { id: "5", name: "Blu Notte & Zaffiro", colors: ["#F0F9FF", "#93C5FD", "#3B82F6", "#1D4ED8", "#0F172A"] },
  { id: "6", name: "Sabbia & Terracotta", colors: ["#FFF7ED", "#FED7AA", "#FB923C", "#EA580C", "#7C2D12"] },
  { id: "7", name: "Lavanda & Lillà", colors: ["#F5F3FF", "#DDD6FE", "#A78BFA", "#7C3AED", "#4C1D95"] },
  { id: "8", name: "Bianco & Minimal", colors: ["#FFFFFF", "#F8FAFC", "#E2E8F0", "#94A3B8", "#0F172A"] },
];

export default function AgencyConfigurator(props: any) {
  const {
    activeTab,
    setActiveTab,
    selectedTemplate,
    setSelectedTemplate,
    introStart,
    setIntroStart,
    dateDisplayMode,
    setDateDisplayMode,
    scheduleSchema,
    setScheduleSchema,
    eventThemePreset,
    setEventThemePreset,
    customEventTheme,
    setCustomEventTheme,
    coupleNames,
    setCoupleNames,
    weddingDateDay,
    setWeddingDateDay,
    weddingDateMonth,
    setWeddingDateMonth,
    weddingDateYear,
    setWeddingDateYear,
    locationName,
    setLocationName,
    locationAddress,
    setLocationAddress,
    audioUrl,
    setAudioUrl,
    selectedPhrasePreset,
    setSelectedPhrasePreset,
    customWelcomePhrase,
    setCustomWelcomePhrase,
    dressCodeNotes,
    setDressCodeNotes,
    selectedPaletteIdx,
    setSelectedPaletteIdx,
    partnerStores,
    setPartnerStores,
    marqueeText,
    setMarqueeText,
    customIban,
    setCustomIban,
    modules,
    toggleModule,
    style,
  } = props;

  function addStore() {
    setPartnerStores([
      ...partnerStores,
      {
        id: Date.now().toString(),
        name: "Nuovo Negozio Convenzionato",
        url: "https://www.negozio.it",
        logoUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=200&q=80",
      },
    ]);
  }

  function removeStore(id: string) {
    setPartnerStores(partnerStores.filter((s: any) => s.id !== id));
  }

  function updateStore(id: string, field: string, value: string) {
    setPartnerStores(
      partnerStores.map((s: any) => (s.id === id ? { ...s, [field]: value } : s))
    );
  }

  const sampleCreatedInvitations = [
    { id: "1", couple: "Elena & Davide", date: "15 Settembre 2026", location: "Villa Rosa (Roma)", template: "Template A", slug: "elena-e-davide", status: "Attivo", rsvpCount: 84 },
    { id: "2", couple: "Francesca & Luca", date: "28 Ottobre 2026", location: "Castello Sforzesco (Milano)", template: "Template B", slug: "francesca-e-luca", status: "Attivo", rsvpCount: 112 },
    { id: "3", couple: "Marco & Giulia", date: "10 Maggio 2027", location: "Tenuta Borgo Antico", template: "Template A", slug: "marco-e-giulia", status: "Bozza", rsvpCount: 45 },
    { id: "4", couple: "Sofia & Lorenzo", date: "22 Giugno 2027", location: "Villa Borromeo", template: "Template B", slug: "sofia-e-lorenzo", status: "Attivo", rsvpCount: 96 },
    { id: "5", couple: "Chiara & Alessandro", date: "14 Luglio 2027", location: "Relais Villa Giulia", template: "Template A", slug: "chiara-e-alessandro", status: "Attivo", rsvpCount: 62 },
  ];

  return (
    <div style={style} className="p-6 md:p-8 space-y-6 text-[#1E293B] w-full">
      
      {/* BARRA RAPIDA TAB */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-4">
        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab("create")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "create"
              ? "bg-[#D4AF37] text-slate-900 shadow-sm"
              : "bg-white text-slate-600 hover:bg-amber-50"
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" /> ➕ Crea / Modifica Invito
        </button>

        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab("list")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "list"
              ? "bg-[#D4AF37] text-slate-900 shadow-sm"
              : "bg-white text-slate-600 hover:bg-amber-50"
          }`}
        >
          <FolderHeart className="w-3.5 h-3.5" /> ✉️ Inviti Già Creati (5)
        </button>

        <button
          type="button"
          onClick={() => setActiveTab && setActiveTab("brand")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === "brand"
              ? "bg-[#D4AF37] text-slate-900 shadow-sm"
              : "bg-white text-slate-600 hover:bg-amber-50"
          }`}
        >
          <Palette className="w-3.5 h-3.5" /> 🎨 Brand White-Label
        </button>
      </div>

      {/* TAB 1: CONFIGURATORE */}
      {activeTab === "create" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#1E293B]">Crea &amp; Configura Invito</h2>

          {/* 1. SELEZIONE TEMPLATE E TIPO DI INTRO/START */}
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              1. Selezione Template &amp; Schermata Iniziale (Start)
            </label>

            {/* PULSANTI TEMPLATE A E B */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate("A");
                  setCoupleNames("Elena & Davide");
                  setIntroStart("arco");
                  setDateDisplayMode("countdown");
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedTemplate === "A"
                    ? "border-[#D4AF37] bg-amber-50 shadow-md"
                    : "border-slate-300 bg-white hover:border-[#D4AF37]"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-[#8B6508] block mb-1">Template A</span>
                <h4 className="font-serif font-bold text-sm text-[#1E293B]">Classico Romantico d&apos;Autore</h4>
                <p className="text-[10px] text-slate-600 mt-1">Arco Romano, Countdown, Ceralacca Bordeaux, Mappa &amp; Guest Photo Wall.</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate("B");
                  setCoupleNames("Francesca & Luca");
                  setIntroStart("nuvole");
                  setDateDisplayMode("scratch");
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all ${
                  selectedTemplate === "B"
                    ? "border-sky-500 bg-sky-50 shadow-md"
                    : "border-slate-300 bg-white hover:border-sky-500"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-sky-800 block mb-1">Template B</span>
                <h4 className="font-serif font-bold text-sm text-[#1E293B]">Moderno Cielo &amp; Nuvole 3D</h4>
                <p className="text-[10px] text-slate-600 mt-1">3 Grattabili date, Busta azzurra, Nuvole Parting Clouds, Hub Giochi completo.</p>
              </button>
            </div>

            {/* SELETTORE SCHERMATA INIZIALE (START) */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-[#1E293B]">Scegli l&apos;Inizio / Schermata di Benvenuto (Start)</label>
              <select
                value={introStart}
                onChange={(e) => setIntroStart(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-xs focus:ring-2 focus:ring-[#D4AF37]"
              >
                {INTRO_START_PRESETS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. DATI SPOSI, FRASE PERSONALIZZATA & TEMA DELL'EVENTO */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              2. Dati Sposi, Frase di Benvenuto &amp; Tema dell&apos;Evento
            </label>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nomi Sposi</label>
              <input
                type="text"
                value={coupleNames}
                onChange={(e) => setCoupleNames(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-xs focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>

            {/* TEMA DELL'EVENTO */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-[#1E293B]">Tema dell&apos;Evento</label>
              <select
                value={eventThemePreset}
                onChange={(e) => setEventThemePreset(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-xs"
              >
                {EVENT_THEME_PRESETS.map((t, idx) => (
                  <option key={idx} value={t}>{t}</option>
                ))}
              </select>
              {eventThemePreset === "Personalizzato (inserisci a mano)" && (
                <input
                  type="text"
                  value={customEventTheme}
                  onChange={(e) => setCustomEventTheme(e.target.value)}
                  placeholder="Scrivi qui il tema dell'evento a mano..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#1E293B] mt-2"
                />
              )}
            </div>

            {/* FRASE DI BENVENUTO + TESTO LIBERO */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Frase di Benvenuto (Preset o Personalizzabile)</label>
              <select
                value={selectedPhrasePreset}
                onChange={(e) => setSelectedPhrasePreset(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-xs mb-2"
              >
                {WELCOME_PHRASE_PRESETS.map((phrase, idx) => (
                  <option key={idx} value={idx.toString()}>
                    {idx + 1}. {phrase.length > 55 ? phrase.substring(0, 55) + "..." : phrase}
                  </option>
                ))}
              </select>
              
              <textarea
                rows={2}
                value={selectedPhrasePreset === "9" ? customWelcomePhrase : (customWelcomePhrase || WELCOME_PHRASE_PRESETS[Number(selectedPhrasePreset)] || "")}
                onChange={(e) => {
                  setSelectedPhrasePreset("9");
                  setCustomWelcomePhrase(e.target.value);
                }}
                placeholder="Oppure scrivi qui la tua frase personalizzata liberamente..."
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] text-xs font-bold resize-none"
              />
            </div>
          </div>

          {/* 3. VISUALIZZAZIONE DATA & SCHEDULE OF EVENTS */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              3. Visualizzazione Data &amp; Programma Orari (Scaletta)
            </label>

            {/* VISUALIZZAZIONE DATA (3 MODULI) */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-[#1E293B]">Modulo Visualizzazione Data</label>
              <select
                value={dateDisplayMode}
                onChange={(e) => setDateDisplayMode(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-xs"
              >
                {DATE_DISPLAY_MODES.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div>
                  <label className="block text-[10px] text-slate-600 font-bold mb-0.5">Giorno</label>
                  <input type="text" value={weddingDateDay} onChange={(e) => setWeddingDateDay(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-center text-[#1E293B]" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-600 font-bold mb-0.5">Mese</label>
                  <input type="text" value={weddingDateMonth} onChange={(e) => setWeddingDateMonth(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-center text-[#1E293B]" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-600 font-bold mb-0.5">Anno</label>
                  <input type="text" value={weddingDateYear} onChange={(e) => setWeddingDateYear(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-center text-[#1E293B]" />
                </div>
              </div>
            </div>

            {/* SCHEDULE OF EVENTS (5 SCHEMI IN ITALIANO) */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-[#1E293B]">Schema Scaletta Orari (Programma della Giornata)</label>
              <select
                value={scheduleSchema}
                onChange={(e) => setScheduleSchema(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-xs"
              >
                {SCHEDULE_SCHEMAS.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. MODULI ECOSISTEMA REPO ATTIVABILI */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              4. Attiva &amp; Configura i Moduli dell&apos;Ecosistema
            </label>

            {/* BUSTA 3D */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">✉️ Busta d&apos;Epoca &amp; Ceralacca (EnvelopeWax)</span>
              <button type="button" onClick={() => toggleModule("busta3d")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.busta3d ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                {modules.busta3d ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* NUVOLE 3D */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">☁️ Nuvole 3D Volumetriche (PartingClouds)</span>
              <button type="button" onClick={() => toggleModule("nuvole3d")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.nuvole3d ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                {modules.nuvole3d ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* LOCATION MAPPA */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">📍 Location &amp; Mappa Google</span>
                <button type="button" onClick={() => toggleModule("locationMappa")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.locationMappa ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                  {modules.locationMappa ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.locationMappa && (
                <div className="space-y-2 pt-1 border-t border-slate-100">
                  <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="Nome Location" className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-[#1E293B]" />
                  <input type="text" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} placeholder="Indirizzo completo" className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-[#1E293B]" />
                </div>
              )}
            </div>

            {/* DRESS CODE PALETTE & FOTO COERENTI */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">🎨 Dress Code &amp; Palette Cromatiche</span>
                <button type="button" onClick={() => toggleModule("codiceAbbigliamento")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.codiceAbbigliamento ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                  {modules.codiceAbbigliamento ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.codiceAbbigliamento && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <input type="text" value={dressCodeNotes} onChange={(e) => setDressCodeNotes(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-[#1E293B]" />
                  <div className="grid grid-cols-2 gap-2">
                    {DRESS_CODE_PALETTES.map((pal, idx) => (
                      <button
                        key={pal.id}
                        type="button"
                        onClick={() => setSelectedPaletteIdx(idx)}
                        className={`p-2 rounded-xl border text-left flex flex-col gap-1 ${selectedPaletteIdx === idx ? "border-[#D4AF37] bg-amber-50 shadow-sm" : "border-slate-200 bg-white"}`}
                      >
                        <span className="text-[10px] font-bold text-[#1E293B]">{pal.name}</span>
                        <div className="flex gap-1">
                          {pal.colors.map((c, i) => (
                            <div key={i} className="w-3.5 h-3.5 rounded-full border border-slate-300" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* HUB GIOCHI FESTA */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">🎮 Hub Giochi Festa (LoveQuiz, PhotoPuzzle, ScratchPhoto)</span>
              <button type="button" onClick={() => toggleModule("hubGiochiFesta")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.hubGiochiFesta ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                {modules.hubGiochiFesta ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* GUEST PHOTO WALL */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">📸 Guest Photo Wall (10 Filtri Polaroid + Proiettore)</span>
              <button type="button" onClick={() => toggleModule("guestPhotoWall")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.guestPhotoWall ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                {modules.guestPhotoWall ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* NEGOZI CONVENZIONATI MULTIPLI */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">🏪 Negozi Convenzionati (PartnerStores)</span>
                <button type="button" onClick={() => toggleModule("negoziConvenzionati")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.negoziConvenzionati ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                  {modules.negoziConvenzionati ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.negoziConvenzionati && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {partnerStores.map((store: any) => (
                    <div key={store.id} className="p-2 bg-[#FAF7F2] rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-[#1E293B]">{store.name}</p>
                        <p className="text-[10px] text-slate-500">{store.url}</p>
                      </div>
                      <button type="button" onClick={() => removeStore(store.id)} className="text-rose-600 p-1">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addStore} className="px-3 py-1 bg-[#D4AF37] text-slate-900 text-xs font-bold rounded-lg flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Aggiungi Negozio
                  </button>
                </div>
              )}
            </div>

            {/* RSVP FORM */}
            <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">✉️ Modulo Conferma Partecipazione (RsvpForm)</span>
              <button type="button" onClick={() => toggleModule("confermaRsvp")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.confermaRsvp ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                {modules.confermaRsvp ? "Attivo" : "Disattivato"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INVITI GIÀ CREATI */}
      {activeTab === "list" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#1E293B]">I Tuoi Inviti Creati</h2>
              <p className="text-xs text-slate-500">Gestisci i matrimoni attivi della tua agenzia (5 di 10 sbloccati)</p>
            </div>
            {setActiveTab && (
              <button type="button" onClick={() => setActiveTab("create")} className="px-4 py-2 bg-[#D4AF37] text-slate-900 text-xs font-bold rounded-xl hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-sm">
                <Plus className="w-4 h-4" /> Crea Nuovo Invito
              </button>
            )}
          </div>

          <div className="space-y-3">
            {sampleCreatedInvitations.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif font-bold text-base text-[#1E293B]">{item.couple}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase bg-emerald-100 text-emerald-800">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">📅 {item.date} • 📍 {item.location}</p>
                  <p className="text-[10px] text-slate-400 font-bold">🎨 {item.template} • ✉️ {item.rsvpCount} Conferme RSVP</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <Link href={`/${item.slug}`} target="_blank" className="p-2 bg-[#FAF7F2] text-[#1E293B] hover:text-[#B8860B] rounded-xl border border-slate-200 text-xs font-bold flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" /> Live
                  </Link>
                  <button type="button" onClick={() => { if (setCoupleNames) setCoupleNames(item.couple); if (setActiveTab) setActiveTab("create"); }} className="p-2 bg-[#FAF7F2] text-[#1E293B] hover:text-[#B8860B] rounded-xl border border-slate-200 text-xs font-bold flex items-center gap-1">
                    <Edit3 className="w-3.5 h-3.5" /> Modifica
                  </button>
                  <button type="button" onClick={() => alert(`Download Excel Catering per ${item.couple} avviato!`)} className="p-2 bg-[#1E293B] text-white hover:bg-slate-800 rounded-xl text-xs font-bold flex items-center gap-1" title="Export Excel Catering">
                    <Download className="w-3.5 h-3.5 text-[#D4AF37]" /> Excel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BRAND AGENZIA */}
      {activeTab === "brand" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#1E293B]">Personalizzazione Brand White-Label</h2>
          <p className="text-xs text-slate-500">Configura il tuo logo ed i contatti dell&apos;agenzia che appariranno nel footer degli inviti dei tuoi clienti.</p>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 border border-slate-200 rounded-2xl overflow-hidden p-2 bg-[#FAF7F2]">
                <Image src="/logo.png" alt="Logo Agenzia" fill className="object-contain p-1" />
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
      )}

    </div>
  );
}
