"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Folder, PlusCircle, Palette, Sliders, Music, ExternalLink, X, MoveHorizontal, Sparkles, Building2, Store, Upload, Plus, Trash2 } from "lucide-react";
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

// PALETTE MULTI-COLORE PREIMPOSTATE PER IL DRESS CODE
const DRESS_CODE_PALETTES = [
  { id: "1", name: "Pastello Romantico", colors: ["#FAF7F2", "#FDE68A", "#FCA5A5", "#93C5FD", "#60A5FA"] },
  { id: "2", name: "Oro & Champagne", colors: ["#FAF7F2", "#F3EDE2", "#D4AF37", "#B8860B", "#1E293B"] },
  { id: "3", name: "Smeraldo & Salvia", colors: ["#F0FDF4", "#A7F3D0", "#34D399", "#059669", "#064E3B"] },
  { id: "4", name: "Rose Gold & Cipria", colors: ["#FFF1F2", "#FECDD3", "#FB7185", "#E11D48", "#881337"] },
  { id: "5", name: "Blu Notte & Zaffiro", colors: ["#F0F9FF", "#93C5FD", "#3B82F6", "#1D4ED8", "#0F172A"] },
  { id: "6", name: "Sabbia & Terracotta", colors: ["#FFF7ED", "#FED7AA", "#FB923C", "#EA580C", "#7C2D12"] },
  { id: "7", name: "Lavanda & Lillà", colors: ["#F5F3FF", "#DDD6FE", "#A78BFA", "#7C3AED", "#4C1D95"] },
  { id: "8", name: "Bianco & Minimal", colors: ["#FFFFFF", "#F8FAFC", "#E2E8F0", "#94A3B8", "#0F172A"] },
];

export default function AgencyStudioPage({ params }: AgencyPageProps) {
  const [activeTab, setActiveTab] = useState<"list" | "create" | "brand">("create");
  
  // LARGHEZZE COLONNE TRASCINABILI (in %)
  const [col1Width, setCol1Width] = useState(22);
  const [col2Width, setCol2Width] = useState(45);

  // TEMPLATE GRAFICO E TEMA COLORE
  const [selectedTemplate, setSelectedTemplate] = useState<"A" | "B">("A");
  const [selectedColorScheme, setSelectedColorScheme] = useState("1");

  // DATI SPOSI
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [weddingDateDay, setWeddingDateDay] = useState("24");
  const [weddingDateMonth, setWeddingDateMonth] = useState("MAGGIO");
  const [weddingDateYear, setWeddingDateYear] = useState("2026");
  const [locationName, setLocationName] = useState("Villa del Balbianello");
  const [locationAddress, setLocationAddress] = useState("Via Salita Regina, 22, 22010 Lenno CO");
  const [waterImageUrl, setWaterImageUrl] = useState("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80");
  
  // FRASE BENVENUTO
  const [selectedPhrasePreset, setSelectedPhrasePreset] = useState("0");
  const [customWelcomePhrase, setCustomWelcomePhrase] = useState("");
  const welcomePhrase =
    selectedPhrasePreset === "9"
      ? customWelcomePhrase || "Scrivi qui la tua frase di benvenuto..."
      : WELCOME_PHRASE_PRESETS[parseInt(selectedPhrasePreset, 10)] || WELCOME_PHRASE_PRESETS[0];

  // DRESS CODE PALETTE MULTI-COLORE
  const [selectedPaletteIdx, setSelectedPaletteIdx] = useState(0);
  const [dressCodeNotes, setDressCodeNotes] = useState("Abiti eleganti in tonalità pastello. Evitare il bordeaux.");

  // NEGOZI CONVENZIONATI MULTIPLI CON UPLOAD LOGO E LINK
  const [partnerStores, setPartnerStores] = useState([
    {
      id: "1",
      name: "Gioielleria Valenza",
      url: "https://www.gioielleriavalenza.it",
      logoUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&q=80",
    },
    {
      id: "2",
      name: "Rinascente Milano",
      url: "https://www.rinascente.it",
      logoUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=200&q=80",
    },
  ]);

  const addPartnerStore = () => {
    setPartnerStores([
      ...partnerStores,
      {
        id: Date.now().toString(),
        name: "Nuovo Negozio Convenzionato",
        url: "https://...",
        logoUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=200&q=80",
      },
    ]);
  };

  const removePartnerStore = (id: string) => {
    setPartnerStores(partnerStores.filter((s) => s.id !== id));
  };

  const handleStoreLogoUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      setPartnerStores(partnerStores.map((s) => (s.id === id ? { ...s, logoUrl: localUrl } : s)));
    }
  };

  const handleWaterImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setWaterImageUrl(URL.createObjectURL(file));
    }
  };

  const [customIban, setCustomIban] = useState("IT60 X 0542 8111 0000 0012 3456");
  const [showWeb3FormsModal, setShowWeb3FormsModal] = useState(false);

  // TUTTI I MODULI DELL'ECOSISTEMA ATTIVABILI
  const [modules, setModules] = useState({
    busta3d: true,
    grattaData: true,
    effettoAcqua: true,
    nuvole3d: true,
    locationMappa: true,
    codiceAbbigliamento: true,
    negoziConvenzionati: true,
    listaNozzeAmazon: true,
    dedicheMarquee: true,
    hubGiochiFesta: true,
    guestPhotoWall: true,
    confermaRsvp: true,
  });

  const toggleModule = (key: keyof typeof modules) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // DRAG DISIVORI COLONNE
  const isDraggingRef = useRef<"col1" | "col2" | null>(null);

  const handleMouseDown = (divider: "col1" | "col2") => {
    isDraggingRef.current = divider;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const totalWidth = window.innerWidth;
    const currentPercent = (e.clientX / totalWidth) * 100;

    if (isDraggingRef.current === "col1" && currentPercent > 12 && currentPercent < 35) {
      setCol1Width(currentPercent);
    } else if (isDraggingRef.current === "col2") {
      const col2Val = currentPercent - col1Width;
      if (col2Val > 25 && currentPercent < 80) setCol2Width(col2Val);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const activePalette = DRESS_CODE_PALETTES[selectedPaletteIdx] || DRESS_CODE_PALETTES[0];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col md:flex-row font-sans select-none overflow-hidden">
      
      {/* ─── COLONNA 1: MENU AGENZIA (TRASCINABILE) ─── */}
      <div style={{ width: `${col1Width}%` }} className="border-r border-[#D4AF37]/30 p-6 flex flex-col justify-between bg-white shadow-sm min-w-[220px]">
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
              <PlusCircle className="w-4 h-4" /> Crea &amp; Configura Invito
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

      {/* DIVISORE TRASCINABILE 1 */}
      <div onMouseDown={() => handleMouseDown("col1")} className="w-2 bg-slate-200 hover:bg-[#D4AF37] cursor-col-resize flex items-center justify-center transition-colors hidden md:flex">
        <MoveHorizontal className="w-3 h-3 text-slate-400" />
      </div>

      {/* ─── COLONNA 2: CREA & CONFIGURA INVITO (UNIFICATO) ─── */}
      <div style={{ width: `${col2Width}%` }} className="p-8 border-r border-[#D4AF37]/30 overflow-y-auto max-h-screen min-w-[340px]">
        {activeTab === "create" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Crea &amp; Configura Invito</h2>

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

            {/* SELEZIONE TEMA COLORE (10 PALETTE) */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">2. Tema Colore (10 Palette)</label>
              <select value={selectedColorScheme} onChange={(e) => setSelectedColorScheme(e.target.value)} className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#1E293B]">
                <option value="1">1. Avorio &amp; Oro Bruciato (#FAF7F2 / #D4AF37)</option>
                <option value="2">2. Cielo Azzurro &amp; Nuvole (#F0F7FF / #1976D2)</option>
                <option value="3">3. Smeraldo &amp; Ceralacca Dorata (#F0FDF4 / #15803D)</option>
                <option value="4">4. Rose Gold &amp; Quartz (#FFF1F2 / #E11D48)</option>
                <option value="5">5. Blu Notte &amp; Stelle (#0F172A / #F59E0B)</option>
                <option value="6">6. Minimalista Bianco Ottico (#FFFFFF / #1E293B)</option>
                <option value="7">7. Champagne &amp; Perla (#FDFBF7 / #D4AF37)</option>
                <option value="8">8. Terracotta &amp; Sabbia (#FFF7ED / #C2410C)</option>
                <option value="9">9. Royal Blue &amp; Gold (#1E3A8A / #F59E0B)</option>
                <option value="10">10. Vintage Sepia 1920 (#FEF3C7 / #78350F)</option>
              </select>
            </div>

            {/* DATI SPOSI & FRASE BENVENUTO */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold uppercase text-slate-600">3. Dati Sposi &amp; Frase di Benvenuto</label>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Nomi Sposi</label>
                <input type="text" value={coupleNames} onChange={(e) => setCoupleNames(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Frase di Benvenuto (10 Opzioni)</label>
                <select value={selectedPhrasePreset} onChange={(e) => setSelectedPhrasePreset(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white">
                  {WELCOME_PHRASE_PRESETS.map((phrase, idx) => (
                    <option key={idx} value={idx.toString()}>
                      {idx + 1}. {phrase.length > 55 ? phrase.substring(0, 55) + "..." : phrase}
                    </option>
                  ))}
                </select>
              </div>

              {selectedPhrasePreset === "9" && (
                <div>
                  <textarea rows={2} value={customWelcomePhrase} onChange={(e) => setCustomWelcomePhrase(e.target.value)} placeholder="Scrivi qui la tua frase personalizzata..." className="w-full p-2.5 rounded-xl border border-slate-300 text-xs resize-none" />
                </div>
              )}
            </div>

            {/* TUTTI I MODULI DELL'ECOSISTEMA PERSONALIZZABILI */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold uppercase text-slate-600">4. Attiva &amp; Personalizza Moduli</label>

              {/* BUSTA */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">✉️ Busta d&apos;Epoca &amp; Sigillo Ceralacca</span>
                <button type="button" onClick={() => toggleModule("busta3d")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.busta3d ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                  {modules.busta3d ? "Attivo" : "Disattivato"}
                </button>
              </div>

              {/* GRATTA LA DATA */}
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

              {/* EFFETTO ACQUA CON UPLOAD */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#1E293B]">💧 Effetto Acqua (Rifrazione Liquida)</span>
                  <button type="button" onClick={() => toggleModule("effettoAcqua")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.effettoAcqua ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                    {modules.effettoAcqua ? "Attivo" : "Disattivato"}
                  </button>
                </div>
                {modules.effettoAcqua && (
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <label className="block text-[10px] text-slate-500 font-bold">Carica Immagine Sfondo Lago (File PC/Mobile)</label>
                    <input type="file" accept="image/*" onChange={handleWaterImageUpload} className="text-xs text-slate-600 block w-full" />
                    <label className="block text-[10px] text-slate-500 font-bold mt-2">Oppure URL Immagine</label>
                    <input type="text" value={waterImageUrl} onChange={(e) => setWaterImageUrl(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                  </div>
                )}
              </div>

              {/* LOCATION & MAPPA */}
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

              {/* DRESS CODE CON PALETTE MULTI-COLORE */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#1E293B]">🎨 Codice Abbigliamento &amp; Palette Multi-Colore</span>
                  <button type="button" onClick={() => toggleModule("codiceAbbigliamento")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.codiceAbbigliamento ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                    {modules.codiceAbbigliamento ? "Attivo" : "Disattivato"}
                  </button>
                </div>
                {modules.codiceAbbigliamento && (
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold mb-1">Indicazioni Abbigliamento</label>
                      <input type="text" value={dressCodeNotes} onChange={(e) => setDressCodeNotes(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 font-bold mb-2">Seleziona Palette di Colori (8 Combinazioni)</label>
                      <div className="grid grid-cols-2 gap-2">
                        {DRESS_CODE_PALETTES.map((pal, idx) => (
                          <button
                            key={pal.id}
                            type="button"
                            onClick={() => setSelectedPaletteIdx(idx)}
                            className={`p-2 rounded-xl border text-left flex flex-col gap-1 transition ${
                              selectedPaletteIdx === idx ? "border-[#D4AF37] bg-amber-50" : "border-slate-200 bg-white"
                            }`}
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
                  </div>
                )}
              </div>

              {/* NEGOZI CONVENZIONATI CON LINK E UPLOAD LOGO */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-[#1E293B]">🏪 Negozi Convenzionati (Link &amp; Upload Logo)</span>
                  <button type="button" onClick={() => toggleModule("negoziConvenzionati")} className={`px-3 py-1 rounded-lg text-xs font-bold ${modules.negoziConvenzionati ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                    {modules.negoziConvenzionati ? "Attivo" : "Disattivato"}
                  </button>
                </div>
                {modules.negoziConvenzionati && (
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    {partnerStores.map((store) => (
                      <div key={store.id} className="bg-[#FAF7F2] p-3 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">Negozio</span>
                          <button type="button" onClick={() => removePartnerStore(store.id)} className="text-rose-500 hover:text-rose-700">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <input
                          type="text"
                          value={store.name}
                          placeholder="Nome Negozio"
                          onChange={(e) => {
                            const updated = partnerStores.map((s) => (s.id === store.id ? { ...s, name: e.target.value } : s));
                            setPartnerStores(updated);
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-slate-300 text-xs"
                        />
                        <input
                          type="text"
                          value={store.url}
                          placeholder="Link Sito Web (https://...)"
                          onChange={(e) => {
                            const updated = partnerStores.map((s) => (s.id === store.id ? { ...s, url: e.target.value } : s));
                            setPartnerStores(updated);
                          }}
                          className="w-full p-2 rounded-lg bg-white border border-slate-300 text-xs"
                        />
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 mb-1">Carica Logo Negozio (File)</label>
                          <input type="file" accept="image/*" onChange={(e) => handleStoreLogoUpload(store.id, e)} className="text-[10px] text-slate-600 block w-full" />
                        </div>
                      </div>
                    ))}
                    <button type="button" onClick={addPartnerStore} className="px-3 py-2 bg-[#D4AF37] text-slate-900 text-xs font-bold rounded-xl flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Aggiungi Negozio
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB BRAND AGENZIA */}
        {activeTab === "brand" && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Personalizzazione Brand Agenzia</h2>
            <p className="text-xs text-slate-500">Configura il tuo logo White-Label e i contatti dell&apos;agenzia.</p>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Logo Agenzia (PNG Trasparente)</label>
              <input type="file" className="text-xs text-slate-600" />
            </div>
          </div>
        )}
      </div>

      {/* DIVISORE TRASCINABILE 2 */}
      <div onMouseDown={() => handleMouseDown("col2")} className="w-2 bg-slate-200 hover:bg-[#D4AF37] cursor-col-resize flex items-center justify-center transition-colors hidden md:flex">
        <MoveHorizontal className="w-3 h-3 text-slate-400" />
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

        {/* MOCKUP SMARTPHONE CON L'INVITO COMPLETO */}
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

          {/* INTRO HERO ANNOUNCEMENT */}
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
            </div>
          )}

          {/* DRESS CODE CON PALETTE MULTI-COLORE */}
          {modules.codiceAbbigliamento && (
            <div className="mx-3 my-4 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">Dress Code &amp; Palette</span>
              <p className="text-[10px] text-slate-500 mb-2">{dressCodeNotes}</p>
              <div className="flex justify-center gap-1.5">
                {activePalette.colors.map((c, i) => (
                  <div key={i} className="w-5 h-5 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          )}

          {/* NEGOZI CONVENZIONATI MULTIPLI */}
          {modules.negoziConvenzionati && (
            <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-xs shadow-sm space-y-2">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">🏪 Negozi Convenzionati</span>
              {partnerStores.map((s) => (
                <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#FAF7F2] rounded-xl text-[10px] font-bold text-[#1E293B] flex items-center gap-2 border border-slate-200 hover:border-[#D4AF37] transition block">
                  <Store className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                  <span className="truncate">{s.name} ↗</span>
                </a>
              ))}
            </div>
          )}

          {/* MODULO RSVP */}
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
