"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Folder, PlusCircle, Palette, Sliders, Music, ExternalLink, X, MoveHorizontal, Heart, Calendar, MapPin, Sparkles } from "lucide-react";

export default function AgencyStudioPage({ params }: { params: { agencyId: string } }) {
  const [activeTab, setActiveTab] = useState<"list" | "create" | "brand" | "modules">("list");
  
  // Larghezze Colonne Trascinabili (in percentuale)
  const [col1Width, setCol1Width] = useState(24);
  const [col2Width, setCol2Width] = useState(46);

  // Stato Dati Invito in Creazione
  const [selectedTheme, setSelectedTheme] = useState("1");
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [weddingDate, setWeddingDate] = useState("24 Maggio 2026");
  const [locationName, setLocationName] = useState("Villa del Balbianello");
  const [welcomePhrase, setWelcomePhrase] = useState("Due anime, un solo destino. Una storia scritta nel cuore.");
  const [showWeb3FormsModal, setShowWeb3FormsModal] = useState(false);

  // Moduli Attivi
  const [modules, setModules] = useState({
    envelope: true,
    waterRipple: true,
    clouds: true,
    scratchDate: true,
    musicFF: true,
    amazonWishlist: true,
    photoWall: true,
  });

  // Lista Matrimoni Clienti dell'Agenzia
  const [weddingsList, setWeddingsList] = useState([
    { id: "1", slug: "elena-e-davide", couple: "Elena & Davide", date: "24 Maggio 2026", status: "Attivo", guests: 120, rsvps: 94 },
    { id: "2", slug: "francesca-e-luca", couple: "Francesca & Luca", date: "12 Settembre 2026", status: "Attivo", guests: 85, rsvps: 62 },
    { id: "3", slug: "marco-e-[#D4AF37]", couple: "Marco & Sofia", date: "04 Ottobre 2026", status: "Bozza", guests: 150, rsvps: 0 },
  ]);

  const isDraggingRef = useRef<"col1" | "col2" | null>(null);

  // Gestione Drag delle Colonne
  const handleMouseDown = (divider: "col1" | "col2") => {
    isDraggingRef.current = divider;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const totalWidth = window.innerWidth;
    const currentPx = e.clientX;
    const currentPercent = (currentPx / totalWidth) * 100;

    if (isDraggingRef.current === "col1") {
      if (currentPercent > 15 && currentPercent < 40) {
        setCol1Width(currentPercent);
      }
    } else if (isDraggingRef.current === "col2") {
      const col2Calculated = currentPercent - col1Width;
      if (col2Calculated > 25 && currentPercent < 80) {
        setCol2Width(col2Calculated);
      }
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
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col md:flex-row select-none overflow-hidden">
      
      {/* ─── COLONNA 1: MENU SINISTRA ─── */}
      <div 
        style={{ width: `${col1Width}%` }} 
        className="border-r border-[#D4AF37]/30 p-6 flex flex-col justify-between bg-white shadow-sm min-w-[240px]"
      >
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
              Crea Nuovo Invito
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("brand")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-3 transition ${
                activeTab === "brand" ? "bg-[#1E293B] text-[#D4AF37]" : "bg-[#FAF7F2] text-slate-700 hover:bg-amber-50"
              }`}
            >
              <Palette className="w-4 h-4" />
              Personalizzazione Brand
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

        {/* BOX RICHIESTA CANZONE FAUSTO FUSETTI */}
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D4AF37]/40">
          <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
            <Music className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">FF Edizioni</span>
          </div>
          <p className="text-xs text-[#1E293B] font-bold">Brano Inedito per Sposi</p>
          <p className="text-[11px] text-slate-500 mt-1 mb-3">
            Composizione d'autore personalizzata sulla storia della coppia dal Maestro Fausto Fusetti.
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

      {/* DIVISORE TRASCINABILE 1 */}
      <div
        onMouseDown={() => handleMouseDown("col1")}
        className="w-1.5 bg-slate-200 hover:bg-[#D4AF37] cursor-col-resize flex items-center justify-center transition-colors"
      >
        <MoveHorizontal className="w-3 h-3 text-slate-400" />
      </div>

      {/* ─── COLONNA 2: CONTENUTO DINAMICO CENTRALE ─── */}
      <div 
        style={{ width: `${col2Width}%` }} 
        className="p-8 border-r border-[#D4AF37]/30 overflow-y-auto max-h-screen min-w-[320px]"
      >
        {/* TAB 1: I MIEI MATRIMONI CLIENTU */}
        {activeTab === "list" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-serif font-bold text-[#1E293B]">I Miei Matrimoni Clienti</h2>
                <p className="text-xs text-slate-500">Gestisci le partecipazioni digitali attive per le tue coppie.</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("create")}
                className="px-4 py-2.5 bg-[#D4AF37] text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400"
              >
                + Nuovo Matrimonio
              </button>
            </div>

            <div className="space-y-3">
              {weddingsList.map((item) => (
                <div key={item.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37]">{item.date}</span>
                    <h4 className="font-serif text-lg font-bold text-[#1E293B]">{item.couple}</h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Invitati: {item.guests} • Risposte RSVP: <span className="font-bold text-emerald-600">{item.rsvps}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
                      {item.status}
                    </span>
                    <Link
                      href={`/${item.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 bg-[#1E293B] text-white text-xs rounded-lg font-bold hover:bg-slate-800"
                    >
                      Apri Invito
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CREA NUOVO INVITO & SELEZIONE TEMA */}
        {activeTab === "create" && (
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Crea Nuovo Invito Digitale</h2>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">1. Selezione Tema Grafico (10 Temi)</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs font-bold text-[#1E293B] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="1">1. Avorio & Oro Bruciato (Villa del Balbianello)</option>
                <option value="2">2. Cielo Azzurro & Nuvole (Francesca & Luca)</option>
                <option value="3">3. Smeraldo & Ceralacca Dorata</option>
                <option value="4">4. Rose Gold & Quartz</option>
                <option value="5">5. Blu Notte & Stelle</option>
                <option value="6">6. Minimalista Bianco Ottico</option>
                <option value="7">7. Champagne & Perla</option>
                <option value="8">8. Terracotta & Sabbia</option>
                <option value="9">9. Royal Blue & Gold</option>
                <option value="10">10. Vintage Sepia 1920</option>
              </select>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-200">
              <label className="block text-xs font-bold uppercase text-slate-600">2. Dati della Coppia</label>

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
                <label className="block text-xs font-semibold text-slate-500 mb-1">Location Cerimonia / Ricevimento</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#1E293B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Frase di Benvenuto</label>
                <textarea
                  rows={3}
                  value={welcomePhrase}
                  onChange={(e) => setWelcomePhrase(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-[#1E293B] resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BRAND WHITE-LABEL */}
        {activeTab === "brand" && (
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-[#1E293B]">Personalizzazione White-Label</h2>
            <p className="text-xs text-slate-500">Inserisci il tuo logo agenzia da mostrare nel footer del sito.</p>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-2">Logo Agenzia (PNG Trasparente)</label>
              <input type="file" className="text-xs text-slate-600" />
            </div>
          </div>
        )}

        {/* TAB 4: MODULI & EFFETTI */}
        {activeTab === "modules" && (
          <div className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-[#1E293B] mb-2">Moduli & Effetti Attivabili</h2>
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

      {/* DIVISORE TRASCINABILE 2 */}
      <div
        onMouseDown={() => handleMouseDown("col2")}
        className="w-1.5 bg-slate-200 hover:bg-[#D4AF37] cursor-col-resize flex items-center justify-center transition-colors"
      >
        <MoveHorizontal className="w-3 h-3 text-slate-400" />
      </div>

      {/* ─── COLONNA 3: ANTEPRIMA LIVE REALE DELL'INVITO ─── */}
      <div className="flex-1 p-6 bg-[#1E293B] flex flex-col items-center justify-center min-w-[300px]">
        <div className="flex justify-between items-center w-full max-w-[320px] mb-3 text-white">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Anteprima Reale Invito
          </span>
          <Link href="/elena-e-davide" target="_blank" className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1">
            Apri full <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Mockup Smartphone Reattivo con Componenti Reali */}
        <div
          className={`w-[320px] h-[580px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto transition-colors duration-500 ${
            selectedTheme === "2"
              ? "bg-[#F0F7FF] text-[#1976D2]"
              : selectedTheme === "3"
              ? "bg-[#F0FDF4] text-[#15803D]"
              : "bg-[#FAF7F2] text-[#1E293B]"
          }`}
        >
          {/* ANTEPRIMA COMPONENTE BUSTA */}
          {modules.envelope && (
            <div className="m-3 p-4 bg-white rounded-2xl border border-[#D4AF37]/30 text-center shadow-sm">
              <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">✦ Busta d'Epoca</span>
              <p className="font-serif font-bold text-sm text-[#1E293B]">{coupleNames}</p>
              <div className="my-2 w-10 h-10 mx-auto bg-[#8B1E24] rounded-full border-2 border-[#D4AF37] flex items-center justify-center text-[10px] text-[#D4AF37] font-bold">
                E&D
              </div>
              <span className="text-[9px] uppercase font-bold text-slate-400 animate-pulse">Tocca per Aprire</span>
            </div>
          )}

          {/* INTRO HERO */}
          <div className="text-center pt-6 px-4">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">Wedding Day</span>
            <p className="text-xs font-bold text-slate-400 mt-1">{weddingDate}</p>
            <h3 className="text-2xl font-serif font-bold mt-2">{coupleNames}</h3>
            <p className="text-xs italic mt-3 px-2 font-serif opacity-80">&quot;{welcomePhrase}&quot;</p>
            <p className="text-xs font-bold mt-3 text-[#D4AF37]">{locationName}</p>
          </div>

          {/* ANTEPRIMA GRATTA LA DATA */}
          {modules.scratchDate && (
            <div className="my-6 mx-4 p-3 bg-white rounded-xl text-center border border-slate-200">
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2">✦ Gratta per scoprire la data ✦</span>
              <div className="flex justify-center gap-2">
                <div className="w-14 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-xs font-bold text-[#1E293B]">24</div>
                <div className="w-14 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-xs font-bold text-[#1E293B]">MAG</div>
                <div className="w-14 h-12 bg-amber-100 rounded-lg flex items-center justify-center text-xs font-bold text-[#1E293B]">2026</div>
              </div>
            </div>
          )}

          {/* ANTEPRIMA PROGRAMMA DELLA GIORNATA */}
          <div className="mx-4 my-4 p-3 bg-white/60 rounded-xl text-left text-xs">
            <p className="font-bold text-center text-[#D4AF37] uppercase text-[10px] mb-2">Programma Orari</p>
            <div className="space-y-1.5 text-[11px]">
              <p>16:30 — Arrivo Ospiti a {locationName}</p>
              <p>17:30 — Cerimonia e Scambio degli Anelli</p>
              <p>19:00 — Aperitivo sul Lago & Taglio Torta</p>
            </div>
          </div>

          {/* BOTTONE RSVP */}
          <div className="p-4">
            <button type="button" className="w-full py-3 bg-[#D4AF37] text-slate-900 font-bold rounded-full text-xs shadow-md uppercase tracking-wider">
              Conferma Partecipazione
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
            <p className="text-xs text-slate-500 mb-4">Invia i dettagli della coppia al Maestro Fausto Fusetti.</p>

            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-3">
              <input type="hidden" name="access_key" value="9013a8d5-0901-42a0-b9e6-4c45553f960d" />
              <input type="hidden" name="subject" value="Nuova Richiesta Brano Inedito FF Edizioni - SaaS LOVE" />
              
              <input
                type="text"
                name="sposi"
                required
                placeholder="Nomi Sposi (es. Elena & Davide)"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Agenzia"
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
              />
              <textarea
                name="note"
                required
                rows={3}
                placeholder="Note sulla storia della coppia..."
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs resize-none"
              />

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWeb3FormsModal(false)}
                  className="px-4 py-2 text-xs bg-slate-200 text-slate-700 rounded-lg"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs bg-[#D4AF37] text-slate-900 font-bold rounded-lg hover:bg-amber-400"
                >
                  Invia Richiesta 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
