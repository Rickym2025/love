"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";

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
    selectedTemplate,
    setSelectedTemplate,
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
        name: "Nuovo Negozio",
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

  return (
    <div style={style} className="p-8 max-w-2xl mx-auto space-y-8 text-[#1E293B]">
      {activeTab === "create" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-serif font-bold text-[#1E293B]">Crea &amp; Configura Invito</h2>

          {/* 1. SELEZIONE TEMPLATE */}
          <div>
            <label className="block text-xs font-bold uppercase text-[#1E293B] mb-2 tracking-wider">
              1. Template Grafico Layout
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate("A");
                  setCoupleNames("Elena & Davide");
                }}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  selectedTemplate === "A"
                    ? "border-[#D4AF37] bg-amber-50 shadow-md"
                    : "border-slate-300 bg-white hover:border-[#D4AF37]"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-[#8B6508] block mb-1">Template A</span>
                <h4 className="font-serif font-bold text-base text-[#1E293B]">Arco Romano &amp; Cigni</h4>
                <p className="text-xs text-slate-600 mt-1">Sfondo avorio, cigni sul lago, ceralacca oro e mappa location.</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate("B");
                  setCoupleNames("Francesca & Luca");
                }}
                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                  selectedTemplate === "B"
                    ? "border-sky-500 bg-sky-50 shadow-md"
                    : "border-slate-300 bg-white hover:border-sky-500"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-sky-800 block mb-1">Template B</span>
                <h4 className="font-serif font-bold text-base text-[#1E293B]">Cielo &amp; Nuvole 3D</h4>
                <p className="text-xs text-slate-600 mt-1">3 Grattabili date, busta azzurra, Nuvole Parting Clouds e RSVP pastello.</p>
              </button>
            </div>
          </div>

          {/* 2. DATI SPOSI & FRASE */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              2. Dati Sposi &amp; Frase di Benvenuto
            </label>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nomi Sposi</label>
              <input
                type="text"
                value={coupleNames}
                onChange={(e) => setCoupleNames(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-sm shadow-xs focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Frase di Benvenuto</label>
              <select
                value={selectedPhrasePreset}
                onChange={(e) => setSelectedPhrasePreset(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-sm focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
              >
                {WELCOME_PHRASE_PRESETS.map((phrase, idx) => (
                  <option key={idx} value={idx.toString()} className="text-[#1E293B]">
                    {idx + 1}. {phrase.length > 60 ? phrase.substring(0, 60) + "..." : phrase}
                  </option>
                ))}
              </select>
            </div>

            {selectedPhrasePreset === "9" && (
              <div>
                <textarea
                  rows={2}
                  value={customWelcomePhrase}
                  onChange={(e) => setCustomWelcomePhrase(e.target.value)}
                  placeholder="Scrivi qui la tua frase personalizzata..."
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-[#1E293B] text-xs font-bold resize-none focus:ring-2 focus:ring-[#D4AF37] focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* 3. MODULI ATTIVABILI */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
              3. Moduli Attivi dell&apos;Ecosistema
            </label>

            {/* BUSTA 3D */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">✉️ Busta d&apos;Epoca &amp; Sigillo Ceralacca</span>
              <button
                type="button"
                onClick={() => toggleModule("busta3d")}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  modules.busta3d ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"
                }`}
              >
                {modules.busta3d ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* GRATTA LA DATA */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">🎰 Gratta la Data col Dito</span>
                <button
                  type="button"
                  onClick={() => toggleModule("grattaData")}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    modules.grattaData ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {modules.grattaData ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.grattaData && (
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[10px] text-slate-600 font-bold mb-1">Giorno</label>
                    <input type="text" value={weddingDateDay} onChange={(e) => setWeddingDateDay(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-center text-[#1E293B]" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 font-bold mb-1">Mese</label>
                    <input type="text" value={weddingDateMonth} onChange={(e) => setWeddingDateMonth(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-center text-[#1E293B]" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-600 font-bold mb-1">Anno</label>
                    <input type="text" value={weddingDateYear} onChange={(e) => setWeddingDateYear(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-center text-[#1E293B]" />
                  </div>
                </div>
              )}
            </div>

            {/* LOCATION MAPPA */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">📍 Location &amp; Mappa Google</span>
                <button
                  type="button"
                  onClick={() => toggleModule("locationMappa")}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    modules.locationMappa ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {modules.locationMappa ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.locationMappa && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="Nome Location" className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1E293B]" />
                  <input type="text" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} placeholder="Indirizzo completo" className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1E293B]" />
                </div>
              )}
            </div>

            {/* DRESS CODE PALETTE */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">🎨 Codice Abbigliamento &amp; Palette</span>
                <button
                  type="button"
                  onClick={() => toggleModule("codiceAbbigliamento")}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    modules.codiceAbbigliamento ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {modules.codiceAbbigliamento ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.codiceAbbigliamento && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <input type="text" value={dressCodeNotes} onChange={(e) => setDressCodeNotes(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1E293B]" />
                  <div className="grid grid-cols-2 gap-2">
                    {DRESS_CODE_PALETTES.map((pal, idx) => (
                      <button
                        key={pal.id}
                        type="button"
                        onClick={() => setSelectedPaletteIdx(idx)}
                        className={`p-2.5 rounded-xl border text-left flex flex-col gap-1.5 ${
                          selectedPaletteIdx === idx ? "border-[#D4AF37] bg-amber-50 shadow-sm" : "border-slate-200 bg-white"
                        }`}
                      >
                        <span className="text-[10px] font-bold text-[#1E293B]">{pal.name}</span>
                        <div className="flex gap-1">
                          {pal.colors.map((c, i) => (
                            <div key={i} className="w-4 h-4 rounded-full border border-slate-300" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
