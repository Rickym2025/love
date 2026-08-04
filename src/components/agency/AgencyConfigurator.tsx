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
  "Personalizzata (scrivi la tua frase personalizzata nel campo sottostante)",
];

export const INTRO_START_PRESETS = [
  { id: "busta", name: "✉️ Busta d'Epoca & Sigillo Ceralacca (/wax-seal.png)" },
  { id: "nuvole", name: "☁️ Cielo & Nuvole 3D Volumetriche (Apertura allo Scroll)" },
  { id: "arco", name: "🏛️ Arco Romano & Cigni sul Lago" },
  { id: "lago", name: "🌊 Rifrazione Acqua & Lago Romantico" },
];

export const DATE_DISPLAY_MODES = [
  { id: "scratch", name: "🎰 Gratta la Data col Dito (HTML5 Canvas)" },
  { id: "countdown", name: "⏳ Countdown Timer in Tempo Reale" },
  { id: "text", name: "📜 Data Fissa Elegant (Testo Grande Dorato)" },
];

export const SCHEDULE_SCHEMAS = [
  { id: "classico", name: "🏛️ Classico Elegante (Elenco Orari Serf)" },
  { id: "timeline", name: "📍 Timeline Verticale con Nodi Dorati" },
  { id: "nuvole", name: "☁️ Programma tra le Nuvole 3D" },
  { id: "schede", name: "🎴 Schede Card Separati" },
  { id: "minimal", name: "📜 Minimal Serif Pulito" },
];

export const RSVP_STYLES = [
  { id: "classico", name: "📜 Classico Elegante (Modulo con Menu & Intolleranze)" },
  { id: "ceralacca", name: "✉️ Sigillo Ceralacca Pop-Up (/wax-seal.png)" },
  { id: "pastello", name: "🎨 Pastello Minimal (Bottoni Pillola)" },
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
    rsvpStyle,
    setRsvpStyle,
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
    {
      id: "1",
      couple: "Elena & Davide",
      date: "15 Settembre 2026",
      location: "Villa Rosa (Roma)",
      template: "Template A (Classico)",
      slug: "elena-e-davide",
      status: "Attivo",
      rsvpCount: 84,
    },
    {
      id: "2",
      couple: "Francesca & Luca",
      date: "28 Ottobre 2026",
      location: "Castello Sforzesco (Milano)",
      template: "Template B (Cielo 3D)",
      slug: "francesca-e-luca",
      status: "Attivo",
      rsvpCount: 112,
    },
    {
      id: "3",
      couple: "Marco & Giulia",
      date: "10 Maggio 2027",
      location: "Tenuta Borgo Antico",
      template: "Template A (Classico)",
      slug: "marco-e-giulia",
      status: "Bozza",
      rsvpCount: 45,
    },
  ];

  return (
    <div style={style} className="p-6 md:p-8 space-y-6 text-[#1E293B] w-full">
      
      {/* BARRA TAB */}
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
          <FolderHeart className="w-3.5 h-3.5" /> ✉️ Inviti Già Creati (3)
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

          {/* 1. SELEZIONE TEMPLATE & EFFETTO START MUTUAMENTE ESCLUSIVO */}
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              1. Selezione Template &amp; Effetto Start (Mutuamente Esclusivo)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate("A");
                  setCoupleNames("Elena & Davide");
                  setIntroStart("busta");
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
                <p className="text-[10px] text-slate-600 mt-1">Busta Ceralacca Bordeaux, Countdown Timer, Mappa Google &amp; RSVP.</p>
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
                <p className="text-[10px] text-slate-600 mt-1">3 Grattabili date, Nuvole Parting Clouds 3D, Hub Giochi completo.</p>
              </button>
            </div>

            {/* EFFETTO START MUTUAMENTE ESCLUSIVO */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-[#1E293B]">Scegli l&apos;Unico Effetto Start Attivo</label>
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

          {/* 2. DATI SPOSI, FRASE PERSONALIZZATA & TEMA EVENTO */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              2. Dati Sposi, Frase Personalizzata &amp; Tema dell&apos;Evento
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
              <label className="block text-xs font-bold text-[#1E293B]">Tema dell&apos;Evento (Preimpostato o Manuale)</label>
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
                  placeholder="Scrivi il tema dell'evento a mano..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#1E293B] mt-2"
                />
              )}
            </div>

            {/* FRASE PERSONALIZZATA */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Frase di Benvenuto (Preset o Scritta a Piacimento)</label>
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
                placeholder="Scrivi qui la tua frase personalizzata liberamente..."
                className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] text-xs font-bold resize-none"
              />
            </div>
          </div>

          {/* 3. VISUALIZZAZIONE DATA & PROGRAMMA ORARI */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              3. Visualizzazione Data &amp; Programma Orari (Italiano)
            </label>

            {/* 3 MODULI DATA */}
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

            {/* 5 SCHEMI PROGRAMMA ORARI IN ITALIANO */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-[#1E293B]">Schema Programma Orari (Scaletta della Giornata)</label>
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

          {/* 4. DRESS CODE, NEGOZI CONVENZIONATI & LISTA NOZZE */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              4. Palette Cromatiche, Negozi &amp; IBAN Sposi
            </label>

            {/* DRESS CODE PALETTE CON FOTO COERENTI */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3">
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

            {/* NEGOZI CONVENZIONATI CON LINK AMAZON AFFILIATO DEFAULT */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">🏪 Negozi Convenzionati (Include Amazon Affiliato)</span>
                <button type="button" onClick={() => toggleModule("negoziConvenzionati")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.negoziConvenzionati ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                  {modules.negoziConvenzionati ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.negoziConvenzionati && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {partnerStores.map((store: any) => (
                    <div key={store.id} className="p-2.5 bg-[#FAF7F2] rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-[#1E293B]">{store.name}</p>
                        <p className="text-[10px] text-slate-500 font-mono truncate max-w-[200px]">{store.url}</p>
                      </div>
                      <button type="button" onClick={() => removeStore(store.id)} className="text-rose-600 p-1 hover:bg-rose-50 rounded-lg">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addStore} className="px-3 py-1.5 bg-[#D4AF37] text-slate-900 text-xs font-bold rounded-lg flex items-center gap-1">
                    <Plus className="w-3 h-3" /> Aggiungi Altro Negozio
                  </button>
                </div>
              )}
            </div>

            {/* IBAN SPOSI */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">🎁 Coordinate IBAN Sposi</span>
                <button type="button" onClick={() => toggleModule("listaNozzeAmazon")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.listaNozzeAmazon ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                  {modules.listaNozzeAmazon ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.listaNozzeAmazon && (
                <input
                  type="text"
                  value={customIban}
                  onChange={(e) => setCustomIban(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono font-bold text-[#1E293B]"
                />
              )}
            </div>
          </div>

          {/* 5. MODULO CONFERMA RSVP (3 MODELLI) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              5. Modulo Conferma Partecipazione RSVP (3 Modelli)
            </label>

            <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#1E293B]">Stile Grafico Modulo RSVP</span>
                <button type="button" onClick={() => toggleModule("confermaRsvp")} className={`px-3 py-1.5 rounded-xl text-xs font-bold ${modules.confermaRsvp ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"}`}>
                  {modules.confermaRsvp ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.confermaRsvp && (
                <select
                  value={rsvpStyle}
                  onChange={(e) => setRsvpStyle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-xs"
                >
                  {RSVP_STYLES.map((r) => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
              )}
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
              <p className="text-xs text-slate-500">Gestisci i matrimoni attivi della tua agenzia (3 di 10 sbloccati)</p>
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
                  <button type="button" onClick={() => alert(`Download File Excel Catering con risposte RSVP (intolleranze e menu) per ${item.couple} avviato!`)} className="p-2 bg-[#1E293B] text-white hover:bg-slate-800 rounded-xl text-xs font-bold flex items-center gap-1" title="Export Excel Catering">
                    <Download className="w-3.5 h-3.5 text-[#D4AF37]" /> Excel Catering
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
