"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Folder, PlusCircle, Palette, Sliders, Music, ExternalLink, X, MoveHorizontal, Sparkles, Building2, Store } from "lucide-react";

export default function AgencyStudioPage({ params }: { params: { agencyId: string } }) {
  const [activeTab, setActiveTab] = useState<"list" | "create" | "modules" | "brand">("create");
  
  // Larghezze Colonne Trascinabili (in %)
  const [col1Width, setCol1Width] = useState(24);
  const [col2Width, setCol2Width] = useState(46);

  // Concetti Separati: Template Grafico (Struttura) e Tema Colore (Palette)
  const [selectedTemplate, setSelectedTemplate] = useState<"A" | "B">("A");
  const [selectedColorScheme, setSelectedColorScheme] = useState("1"); // 1 su 10 temi colore

  // Dati Personalizzabili
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [weddingDate, setWeddingDate] = useState("24 MAGGIO 2026");
  const [locationName, setLocationName] = useState("Villa del Balbianello");
  const [dressCodeText, setDressCodeText] = useState("Abiti eleganti in tonalità pastello. Evitare il bordeaux.");
  const [welcomePhrase, setWelcomePhrase] = useState("Due anime, un solo destino. Una storia scritta nel cuore.");
  const [customIban, setCustomIban] = useState("IT60 X 0542 8111 0000 0012 3456");
  const [partnerStore, setPartnerStore] = useState("Gioielleria Valenza — Lista Nozze in Corso");
  const [showWeb3FormsModal, setShowWeb3FormsModal] = useState(false);

  // Moduli Attivabili
  const [modules, setModules] = useState({
    envelope: true,
    waterRipple: true,
    clouds: true,
    scratchDate: true,
    dressCode: true,
    partnerStores: true,
    wishlistAmazon: true,
    rsvp: true,
  });

  const isDraggingRef = useRef<"col1" | "col2" | null>(null);

  // Drag Handlers
  const handleMouseDown = (divider: "col1" | "col2") => {
    isDraggingRef.current = divider;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const totalWidth = window.innerWidth;
    const currentPercent = (e.clientX / totalWidth) * 100;

    if (isDraggingRef.current === "col1" && currentPercent > 15 && currentPercent < 35) {
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

  const toggleModule = (key: keyof typeof modules) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col md:flex-row font-sans select-none overflow-hidden">
      
      {/* ─── COLONNA 1: MENU AGENZIA (TRAS CINABILE) ─── */}
      <div style={{ width: `${col1Width}%` }} className="border-r border-[#D4AF37]/30 p-6 flex flex-col justify-between bg-white shadow-sm min-w-[240px]">
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
              <Sliders className="w-4 h-4" /> Moduli &amp; Effetti Attivabili
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
      <div onMouseDown={() => handleMouseDown("col1")} className="w-1.5 bg-slate-200 hover:bg-[#D4AF37] cursor-col-resize flex items-center justify-center hidden md:flex">
        <MoveHorizontal className="w-3 h-3 text-slate-400" />
      </div>

      {/* ─── COLONNA 2: CONFIGURATORE CENTRALE ─── */}
      <div style={{ width: `${col2Width}%` }} className="p-8 border-r border-[#D4AF37]/30 overflow-y-auto max-h-screen min-w-[320px]">
        {activeTab === "create" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Struttura &amp; Personalizzazione Invito</h2>

            {/* SELEZIONE TEMPLATE STRUTTURALE */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">1. Template Grafico (Struttura Layout)</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => { setSelectedTemplate("A"); setCoupleNames("Elena & Davide"); }} className={`p-4 rounded-2xl border-2 text-left ${selectedTemplate === "A" ? "border-[#D4AF37] bg-amber-50" : "border-slate-200 bg-white"}`}>
                  <span className="text-[10px] font-bold uppercase text-[#D4AF37] block">Template A</span>
                  <h4 className="font-serif font-bold text-sm">Arco Romano &amp; Cigni</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Sfondo avorio materico, specchio d&apos;acqua con cigni e timeline classica.</p>
                </button>

                <button type="button" onClick={() => { setSelectedTemplate("B"); setCoupleNames("Francesca & Luca"); }} className={`p-4 rounded-2xl border-2 text-left ${selectedTemplate === "B" ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white"}`}>
                  <span className="text-[10px] font-bold uppercase text-sky-600 block">Template B</span>
                  <h4 className="font-serif font-bold text-sm">Cielo &amp; Nuvole 3D</h4>
                  <p className="text-[10px] text-slate-500 mt-1">3 Grattabili date, Nuvole Parting Clouds e galleria foto dress code.</p>
                </button>
              </div>
            </div>

            {/* SELEZIONE TEMA COLORE (10 PALETTE) */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">2. Tema Colore (10 Palette Cromatiche)</label>
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

            {/* FORM DATI MODULI */}
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold uppercase text-slate-600">3. Moduli Personalizzabili</label>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Nomi Sposi</label>
                <input type="text" value={coupleNames} onChange={(e) => setCoupleNames(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Data delle Nozze</label>
                <input type="text" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Location</label>
                <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Dress Code Notes</label>
                <input type="text" value={dressCodeText} onChange={(e) => setDressCodeText(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Negozi Convenzionati (Lista Nozze locale)</label>
                <input type="text" value={partnerStore} onChange={(e) => setPartnerStore(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">IBAN Sposi</label>
                <input type="text" value={customIban} onChange={(e) => setCustomIban(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono" />
              </div>
            </div>
          </div>
        )}

        {/* TAB BRAND AGENZIA */}
        {activeTab === "brand" && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Personalizzazione Brand Agenzia</h2>
            <p className="text-xs text-slate-500">Configura il tuo logo White-Label e i contatti da mostrare nel piè di pagina.</p>

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

        {/* TAB MODULI TOGGLE */}
        {activeTab === "modules" && (
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1E293B] mb-2">Attiva o Disattiva Moduli</h2>
            {Object.keys(modules).map((key) => {
              const isActive = modules[key as keyof typeof modules];
              return (
                <div key={key} className="flex justify-between items-center p-3.5 bg-white rounded-xl border border-slate-200">
                  <span className="text-xs font-bold capitalize text-[#1E293B]">{key}</span>
                  <button type="button" onClick={() => toggleModule(key as keyof typeof modules)} className={`px-3 py-1.5 rounded-lg text-xs font-bold ${isActive ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"}`}>
                    {isActive ? "Attivo" : "Disattivato"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* DIVISORE TRASCINABILE 2 */}
      <div onMouseDown={() => handleMouseDown("col2")} className="w-1.5 bg-slate-200 hover:bg-[#D4AF37] cursor-col-resize flex items-center justify-center hidden md:flex">
        <MoveHorizontal className="w-3 h-3 text-slate-400" />
      </div>

      {/* ─── COLONNA 3: ANTEPRIMA LIVE Sincronizzata ─── */}
      <div className="flex-1 p-6 bg-[#1E293B] flex flex-col items-center justify-center min-w-[300px]">
        <div className="flex justify-between items-center w-full max-w-[320px] mb-3 text-white">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Anteprima Reale Live
          </span>
          <Link href={selectedTemplate === "A" ? "/elena-e-davide" : "/francesca-e-luca"} target="_blank" className="text-[11px] text-slate-300 hover:text-white">
            Apri Full ↗
          </Link>
        </div>

        {/* MOCKUP SMARTPHONE */}
        <div className={`w-[320px] h-[580px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto ${selectedColorScheme === "2" ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"}`}>
          
          {/* BUSTA D'EPOCA CON VERA CERALACCA */}
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

          {/* PROGRAMMA TIMELINE VERTICALE */}
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-left text-xs space-y-2 shadow-sm">
            <p className="font-bold text-center text-[#D4AF37] uppercase text-[10px] mb-2">✦ Programma Festeggiamenti ✦</p>
            <div className="border-l-2 border-[#D4AF37] pl-3 space-y-2">
              <div><span className="font-bold text-[#D4AF37]">16:30</span> — Apertura Porte a {locationName}</div>
              <div><span className="font-bold text-[#D4AF37]">17:30</span> — Cerimonia e Scambio Anelli</div>
              <div><span className="font-bold text-[#D4AF37]">19:00</span> — Aperitivo Vista Lago</div>
            </div>
          </div>

          {/* DRESS CODE CON CERCHI COLORE */}
          {modules.dressCode && (
            <div className="mx-3 my-4 p-3 bg-white rounded-xl text-center border border-slate-200">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">Dress Code &amp; Palette</span>
              <p className="text-[10px] text-slate-500 mb-2">{dressCodeText}</p>
              <div className="flex justify-center gap-2">
                <div className="w-5 h-5 rounded-full bg-[#FAF7F2] border border-slate-300" />
                <div className="w-5 h-5 rounded-full bg-[#FDE68A]" />
                <div className="w-5 h-5 rounded-full bg-[#FCA5A5]" />
                <div className="w-5 h-5 rounded-full bg-[#93C5FD]" />
              </div>
            </div>
          )}

          {/* NEGOZI CONVENZIONATI */}
          {modules.partnerStores && (
            <div className="mx-3 my-4 p-3 bg-white rounded-xl border border-slate-200 text-xs">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">🏪 Lista Nozze Locale</span>
              <p className="text-[11px] text-slate-700 font-medium">{partnerStore}</p>
            </div>
          )}

          {/* BOTTONE RSVP */}
          {modules.rsvp && (
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
