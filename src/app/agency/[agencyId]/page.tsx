"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Folder, PlusCircle, Palette, Sliders, Music, Sparkles, Building2, Store, Plus, Trash2, X } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import PartingClouds from "@/components/PartingClouds";

export interface AgencyPageProps {
  params: {
    agencyId: string;
  };
}

// 10 FRASI DI BENVENUTO PREIMPOSTATE
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

export default function AgencyStudioPage({ params }: AgencyPageProps) {
  const [activeTab, setActiveTab] = useState<"list" | "create" | "modules" | "brand">("create");
  
  const [selectedTemplate, setSelectedTemplate] = useState<"A" | "B">("A");
  const [selectedColorScheme, setSelectedColorScheme] = useState("1");

  // DATI PERSONALIZZABILI SPOSI
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [weddingDateDay, setWeddingDateDay] = useState("24");
  const [weddingDateMonth, setWeddingDateMonth] = useState("MAGGIO");
  const [weddingDateYear, setWeddingDateYear] = useState("2026");
  const [locationName, setLocationName] = useState("Villa del Balbianello");
  const [locationAddress, setLocationAddress] = useState("Via Salita Regina, 22, 22010 Lenno CO");
  const [waterImageUrl, setWaterImageUrl] = useState("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80");
  const [dressCodeNotes, setDressCodeNotes] = useState("Abiti eleganti in tonalità pastello. Evitare il bordeaux.");
  const [selectedDressColor, setSelectedDressColor] = useState("#D4AF37");

  // SELEZIONE FRASE DI BENVENUTO (10 PRESETS + TESTO LIBERO)
  const [selectedPhrasePreset, setSelectedPhrasePreset] = useState("0");
  const [customWelcomePhrase, setCustomWelcomePhrase] = useState("");

  // CALCOLO DINAMICO DELLA FRASE DI BENVENUTO (Risolve il ReferenceError)
  const welcomePhrase =
    selectedPhrasePreset === "9"
      ? customWelcomePhrase || "Scrivi qui la tua frase di benvenuto..."
      : WELCOME_PHRASE_PRESETS[parseInt(selectedPhrasePreset, 10)] || WELCOME_PHRASE_PRESETS[0];

  const [customIban, setCustomIban] = useState("IT60 X 0542 8111 0000 0012 3456");
  const [partnerStoreName, setPartnerStoreName] = useState("Gioielleria Valenza");
  const [showWeb3FormsModal, setShowWeb3FormsModal] = useState(false);

  // LISTA NEGOZI CONVENZIONATI MULTIPLI
  const [partnerStores, setPartnerStores] = useState([
    { id: "1", name: "Gioielleria Valenza", url: "https://www.gioielleriavalenza.it" },
    { id: "2", name: "Rinascente Milano", url: "https://www.rinascente.it" },
  ]);

  const addPartnerStore = () => {
    setPartnerStores([...partnerStores, { id: Date.now().toString(), name: "Nuovo Negozio", url: "https://..." }]);
  };

  const removePartnerStore = (id: string) => {
    setPartnerStores(partnerStores.filter((s) => s.id !== id));
  };

  // 10 COLORI DRESS CODE PREIMPOSTATI
  const dressCodeColorPresets = [
    "#FAF7F2", "#FDE68A", "#FCA5A5", "#93C5FD", "#60A5FA",
    "#D4AF37", "#34D399", "#A78BFA", "#F472B6", "#1E293B",
  ];

  // MODULI ATTIVABILI ED EDITABILI
  const [modules, setModules] = useState({
    busta3d: true,
    grattaData: true,
    waterRipple: true,
    nuvole3d: true,
    locationMappa: true,
    codiceAbbigliamento: true,
    negoziConvenzionati: true,
    listaNozzeAmazon: true,
    confermaRsvp: true,
  });

  const toggleModule = (key: keyof typeof modules) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col md:flex-row font-sans select-none overflow-hidden">
      
      {/* ─── COLONNA 1: MENU AGENZIA ─── */}
      <div className="w-full md:w-1/4 border-r border-[#D4AF37]/30 p-6 flex flex-col justify-between bg-white shadow-sm min-w-[240px]">
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
              <Sliders className="w-4 h-4" /> Moduli &amp; Effetti Personalizzabili
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
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Template &amp; Dati Generali Sposi</h2>

            {/* SELEZIONE TEMPLATE STRUTTURALE */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">1. Template Grafico Layout</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => { setSelectedTemplate("A"); setCoupleNames("Elena & Davide"); }} className={`p-4 rounded-2xl border-2 text-left ${selectedTemplate === "A" ? "border-[#D4AF37] bg-amber-50" : "border-slate-200 bg-white"}`}>
                  <span className="text-[10px] font-bold uppercase text-[#D4AF37] block">Template A</span>
                  <h4 className="font-serif font-bold text-sm">Arco Romano &amp; Cigni</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Sfondo avorio, cigni sul lago, ceralacca oro e mappa location.</p>
                </button>

                <button type="button" onClick={() => { setSelectedTemplate("B"); setCoupleNames("Francesca & Luca"); }} className={`p-4 rounded-2xl border-2 text-left ${selectedTemplate === "B" ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white"}`}>
                  <span className="text-[10px] font-bold uppercase text-sky-600 block">Template B</span>
                  <h4 className="font-serif font-bold text-sm">Cielo &amp; Nuvole 3D</h4>
                  <p className="text-[10px] text-slate-500 mt-1">3 Grattabili date, busta azzurra, Nuvole Parting Clouds e RSVP pastello.</p>
                </button>
              </div>
            </div>

            {/* DATI SPOSI & FRASE BENVENUTO */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold uppercase text-slate-600">2. Nomi Sposi &amp; Frase di Benvenuto</label>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Nomi Sposi</label>
                <input type="text" value={coupleNames} onChange={(e) => setCoupleNames(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold" />
              </div>

              {/* SELETTORE DELLE 10 FRASI DI BENVENUTO */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Selezione Frase di Benvenuto (10 Opzioni)</label>
                <select
                  value={selectedPhrasePreset}
                  onChange={(e) => setSelectedPhrasePreset(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1E293B] bg-white focus:outline-none focus:border-[#D4AF37]"
                >
                  {WELCOME_PHRASE_PRESETS.map((phrase, idx) => (
                    <option key={idx} value={idx.toString()}>
                      {idx + 1}. {phrase.length > 60 ? phrase.substring(0, 60) + "..." : phrase}
                    </option>
                  ))}
                </select>
              </div>

              {/* CAMPO TESTO LIBERO PER FRASE PERSONALIZZATA */}
              {selectedPhrasePreset === "9" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Scrivi la tua Frase Personalizzata</label>
                  <textarea
                    rows={3}
                    value={customWelcomePhrase}
                    onChange={(e) => setCustomWelcomePhrase(e.target.value)}
                    placeholder="Scrivi qui la dedica d'amore personalizzata per gli ospiti..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-[#1E293B] resize-none focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB MODULI TUTTI PERSONALIZZABILI */}
        {activeTab === "modules" && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1E293B] mb-2">Personalizza i Moduli dell&apos;Invito</h2>

            {/* MODULO BUSTA */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">✉️ Busta d&apos;Epoca &amp; Sigillo Ceralacca</span>
              <button type="button" onClick={() => toggleModule("busta3d")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.busta3d ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                {modules.busta3d ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* MODULO GRATTA LA DATA */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">🎰 Gratta la Data col Dito</span>
                <button type="button" onClick={() => toggleModule("grattaData")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.grattaData ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                  {modules.grattaData ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.grattaData && (
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold mb-1">Giorno</label>
                    <input type="text" value={weddingDateDay} onChange={(e) => setWeddingDateDay(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-center" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold mb-1">Mese</label>
                    <input type="text" value={weddingDateMonth} onChange={(e) => setWeddingDateMonth(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-center" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold mb-1">Anno</label>
                    <input type="text" value={weddingDateYear} onChange={(e) => setWeddingDateYear(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs font-bold text-center" />
                  </div>
                </div>
              )}
            </div>

            {/* MODULO EFFETTO ACQUA LAGO */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">💧 Rifrazione Liquida Lago (Water Ripple)</span>
                <button type="button" onClick={() => toggleModule("waterRipple")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.waterRipple ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                  {modules.waterRipple ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.waterRipple && (
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-[10px] text-slate-500 font-bold mb-1">URL Immagine Sfondo Lago</label>
                  <input type="text" value={waterImageUrl} onChange={(e) => setWaterImageUrl(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                </div>
              )}
            </div>

            {/* MODULO LOCATION & MAPPA */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">📍 Location &amp; Mappa Google</span>
                <button type="button" onClick={() => toggleModule("locationMappa")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.locationMappa ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                  {modules.locationMappa ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.locationMappa && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold mb-1">Nome Location</label>
                    <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold mb-1">Indirizzo Mappa</label>
                    <input type="text" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                  </div>
                </div>
              )}
            </div>

            {/* MODULO DRESS CODE & PALETTE */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">🎨 Codice Abbigliamento &amp; Palette Colori</span>
                <button type="button" onClick={() => toggleModule("codiceAbbigliamento")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.codiceAbbigliamento ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                  {modules.codiceAbbigliamento ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.codiceAbbigliamento && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-[10px] text-slate-500 font-bold">Indicazioni Abbigliamento</label>
                  <input type="text" value={dressCodeNotes} onChange={(e) => setDressCodeNotes(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                  <label className="block text-[10px] text-slate-500 font-bold mt-2">Scegli tra i 10 Colori Preimpostati</label>
                  <div className="flex flex-wrap gap-2">
                    {dressCodeColorPresets.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedDressColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition ${
                          selectedDressColor === color ? "border-slate-900 scale-110 shadow-md" : "border-slate-200"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* MODULO NEGOZI CONVENZIONATI MULTIPLI */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">🏪 Negozi Convenzionati in Città</span>
                <button type="button" onClick={() => toggleModule("negoziConvenzionati")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.negoziConvenzionati ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                  {modules.negoziConvenzionati ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.negoziConvenzionati && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {partnerStores.map((store) => (
                    <div key={store.id} className="flex gap-2 items-center bg-[#FAF7F2] p-2 rounded-xl border border-slate-200">
                      <input
                        type="text"
                        value={store.name}
                        onChange={(e) => {
                          const updated = partnerStores.map((s) => (s.id === store.id ? { ...s, name: e.target.value } : s));
                          setPartnerStores(updated);
                        }}
                        className="flex-1 p-1.5 rounded bg-white border border-slate-300 text-xs"
                      />
                      <button type="button" onClick={() => removePartnerStore(store.id)} className="p-1.5 text-rose-500 hover:text-rose-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addPartnerStore} className="px-3 py-1.5 bg-[#D4AF37] text-slate-900 text-xs font-bold rounded-lg flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Aggiungi Negozio
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB BRAND AGENZIA */}
        {activeTab === "brand" && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Personalizzazione Brand Agenzia</h2>
            <p className="text-xs text-slate-500">Configura il tuo logo White-Label da mostrare nel piè di pagina.</p>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Logo Agenzia (PNG Trasparente)</label>
              <input type="file" className="text-xs text-slate-600" />
            </div>
          </div>
        )}
      </div>

      {/* ─── COLONNA 3: VERO INVITO LIVE REALE COMPLETO ─── */}
      <div className="flex-1 p-6 bg-[#1E293B] flex flex-col items-center justify-center min-w-[340px]">
        <div className="flex justify-between items-center w-full max-w-[340px] mb-3 text-white">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> VERO Invito Live Completo
          </span>
          <Link href={selectedTemplate === "A" ? "/elena-e-davide" : "/francesca-e-luca"} target="_blank" className="text-[11px] text-slate-300 hover:text-white">
            Apri Fullscreen ↗
          </Link>
        </div>

        {/* MOCKUP SMARTPHONE */}
        <div className={`w-[340px] h-[600px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto ${selectedTemplate === "B" || selectedColorScheme === "2" ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"}`}>
          
          {/* BUSTA D'EPOCA CON VERA CERALACCA */}
          {modules.busta3d && (
            <div className="p-4 bg-[#F5EFE6] border-b border-[#D4AF37]/30 text-center relative shadow-sm">
              <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">✦ Partecipazione Digitale</span>
              <p className="font-serif font-bold text-sm text-[#1E293B]">{coupleNames}</p>
              
              <div className="relative w-12 h-12 mx-auto my-2">
                <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
              </div>
              <span className="text-[9px] uppercase font-bold text-slate-400 animate-pulse">Tocca per Aprire</span>
            </div>
          )}

          {/* INTRO HERO CON FRASE DI BENVENUTO DINAMICA */}
          <div className="text-center pt-6 px-4">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">Wedding Day</span>
            <p className="text-xs font-bold text-slate-400 mt-0.5">{weddingDateDay} {weddingDateMonth} {weddingDateYear}</p>
            <h3 className="text-2xl font-serif font-bold mt-1 text-[#1E293B]">{coupleNames}</h3>
            <p className="text-xs italic mt-2 px-2 font-serif opacity-80">&quot;{welcomePhrase}&quot;</p>
            <p className="text-xs font-bold text-[#D4AF37] mt-2 uppercase">{locationName}</p>
          </div>

          {/* GRATTIAMO LA DATA */}
          {modules.grattaData && (
            <div className="my-4 mx-3 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2">🎰 Gratta col Dito per Scoprire la Data</span>
              <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
            </div>
          )}

          {/* LOCATION & MAPPA GOOGLE */}
          {modules.locationMappa && (
            <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block">📍 Location &amp; Mappa</span>
              <p className="font-bold text-xs text-[#1E293B]">{locationName}</p>
              <p className="text-[10px] text-slate-500">{locationAddress}</p>
              <div className="w-full h-24 bg-slate-100 rounded-xl flex items-center justify-center text-[10px] font-bold text-slate-400 border border-slate-200">
                Mappa Google Interactive
              </div>
            </div>
          )}

          {/* DRESS CODE CON CERCHI COLORE */}
          {modules.codiceAbbigliamento && (
            <div className="mx-3 my-4 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">Dress Code &amp; Palette</span>
              <p className="text-[10px] text-slate-500 mb-2">{dressCodeNotes}</p>
              <div className="flex justify-center gap-2">
                <div className="w-6 h-6 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: selectedDressColor }} />
              </div>
            </div>
          )}

          {/* NEGOZI CONVENZIONATI */}
          {modules.negoziConvenzionati && (
            <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-xs shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">🏪 Negozi Convenzionati</span>
              {partnerStores.map((s) => (
                <div key={s.id} className="p-2 bg-[#FAF7F2] rounded-lg text-[10px] font-bold text-[#1E293B] flex items-center gap-1">
                  <Store className="w-3 h-3 text-[#D4AF37]" /> {s.name}
                </div>
              ))}
            </div>
          )}

          {/* CONFEMA PARTECIPAZIONE RSVP */}
          {modules.confermaRsvp && (
            <div className="p-3">
              <RsvpForm coupleNames={coupleNames} />
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
