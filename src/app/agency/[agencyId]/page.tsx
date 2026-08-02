"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Folder, Palette, Sliders, Music, Smartphone, ExternalLink, Check, X } from "lucide-react";

export default function AgencyStudioPage({ params }: { params: { agencyId: string } }) {
  const [activeTab, setActiveTab] = useState<"wedding" | "brand" | "modules">("wedding");
  const [selectedTheme, setSelectedTheme] = useState("1");
  const [welcomePhrase, setWelcomePhrase] = useState("Due anime, un solo destino. Una storia scritta nel cuore.");
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [locationName, setLocationName] = useState("Villa del Balbianello");
  const [showWeb3FormsModal, setShowWeb3FormsModal] = useState(false);

  // Moduli Attivabili
  const [modules, setModules] = useState({
    envelope: true,
    waterRipple: true,
    clouds: false,
    scratchDate: true,
    musicFF: true,
    amazonWishlist: true,
    photoWall: true,
  });

  const toggleModule = (key: keyof typeof modules) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#1E293B] text-white flex flex-col md:flex-row">
      {/* ─── COLONNA 1: MENU SINISTRA ─── */}
      <div className="w-full md:w-1/4 border-b md:border-b-0 md:border-r border-slate-700 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase block mb-1">
              Agency Hub White-Label
            </span>
            <h1 className="text-xl font-bold text-white uppercase tracking-wider font-serif">SPOSI IN LOVE</h1>
            <p className="text-xs text-slate-400 mt-1">
              Studio Configuratore • <span className="text-emerald-400 font-semibold">10 Crediti Attivi</span>
            </p>
          </div>

          <nav className="space-y-2">
            <button
              type="button"
              onClick={() => setActiveTab("wedding")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition ${
                activeTab === "wedding" ? "bg-[#D4AF37] text-slate-900" : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Folder className="w-4 h-4" />
              I Miei Matrimoni Clienti
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("brand")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition ${
                activeTab === "brand" ? "bg-[#D4AF37] text-slate-900" : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Palette className="w-4 h-4" />
              Personalizzazione Brand
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("modules")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-3 transition ${
                activeTab === "modules" ? "bg-[#D4AF37] text-slate-900" : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Sliders className="w-4 h-4" />
              Moduli & Effetti Attivabili
            </button>
          </nav>
        </div>

        {/* BOX RICHIESTA CANZONE INEDITA FF EDIZIONI */}
        <div className="bg-slate-800/80 p-4 rounded-2xl border border-[#D4AF37]/30 mt-6">
          <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
            <Music className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">FF Edizioni</span>
          </div>
          <p className="text-xs text-slate-300 font-medium">Brano Inedito per Primo Ballo</p>
          <p className="text-[11px] text-slate-400 mt-1 mb-3">
            Composizione d&apos;autore personalizzata sulla storia della coppia dal Maestro Fausto Fusetti.
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
      <div className="w-full md:w-2/4 p-6 border-b md:border-b-0 md:border-r border-slate-700 overflow-y-auto max-h-screen">
        {activeTab === "wedding" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-wider">1. Selezione Tema Grafico (10 Temi)</h2>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Tema Prescelto</label>
              <select
                value={selectedTheme}
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
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

            <div className="pt-4 border-t border-slate-700 space-y-4">
              <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-wider">2. Dati del Matrimonio</h2>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Nomi Sposi</label>
                <input
                  type="text"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Frase di Benvenuto</label>
                <textarea
                  rows={3}
                  value={welcomePhrase}
                  onChange={(e) => setWelcomePhrase(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 text-xs text-white focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === "brand" && (
          <div className="space-y-6">
            <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-wider">Personalizzazione White-Label Agenzia</h2>
            <p className="text-xs text-slate-400">
              Personalizza il footer e i riferimenti visivi mostrati ai tuoi clienti.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Logo Agenzia (PNG Trasparente)</label>
              <input type="file" className="text-xs text-slate-300" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Nome Agenzia / Wedding Planner</label>
              <input
                type="text"
                defaultValue="Sposi in Love Agency"
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-600 text-xs text-white"
              />
            </div>
          </div>
        )}

        {activeTab === "modules" && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-[#D4AF37] uppercase tracking-wider mb-2">Moduli & Effetti Attivabili</h2>
            {Object.keys(modules).map((key) => {
              const isActive = modules[key as keyof typeof modules];
              return (
                <div key={key} className="flex justify-between items-center p-3.5 bg-slate-800 rounded-xl border border-slate-700">
                  <span className="text-xs font-medium capitalize text-slate-200">{key}</span>
                  <button
                    type="button"
                    onClick={() => toggleModule(key as keyof typeof modules)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      isActive ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"
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

      {/* ─── COLONNA 3: ANTEPRIMA LIVE SINCRONIZZATA ─── */}
      <div className="w-full md:w-1/4 p-6 bg-slate-900 flex flex-col items-center justify-center">
        <div className="flex justify-between items-center w-full max-w-[280px] mb-4">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1.5">
            <Smartphone className="w-4 h-4" /> Anteprima Live
          </span>
          <Link href="/elena-e-davide" target="_blank" className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1">
            Apri full <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Mockup Smartphone Reattivo */}
        <div
          className={`w-[280px] h-[540px] rounded-[36px] border-4 border-slate-700 shadow-2xl p-4 overflow-y-auto transition-colors duration-500 ${
            selectedTheme === "2"
              ? "bg-[#F0F7FF] text-[#1976D2]"
              : selectedTheme === "3"
              ? "bg-[#F0FDF4] text-[#15803D]"
              : "bg-[#FAF7F2] text-[#1E293B]"
          }`}
        >
          <div className="text-center pt-8">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">Wedding Day</span>
            <h3 className="text-xl font-serif font-bold mt-2">{coupleNames}</h3>
            <p className="text-xs italic mt-3 px-2 font-serif opacity-80">&quot;{welcomePhrase}&quot;</p>
            <p className="text-xs font-bold mt-4 text-[#D4AF37]">{locationName}</p>

            {/* Badge Moduli Attivi */}
            <div className="mt-6 flex flex-wrap gap-1 justify-center">
              {modules.envelope && <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded">✉️ Busta 3D</span>}
              {modules.waterRipple && <span className="text-[9px] bg-blue-500/20 text-blue-600 px-2 py-0.5 rounded">💧 Effetto Acqua</span>}
              {modules.scratchDate && <span className="text-[9px] bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded">🎰 Gratta Data</span>}
              {modules.photoWall && <span className="text-[9px] bg-purple-500/20 text-purple-700 px-2 py-0.5 rounded">📸 Photo Wall</span>}
            </div>

            <button type="button" className="mt-8 w-full py-2.5 bg-[#D4AF37] text-slate-900 font-bold rounded-full text-xs shadow-md">
              Conferma Partecipazione
            </button>
          </div>
        </div>
      </div>

      {/* ─── MODALE WEB3FORMS (RICHIESTA CANZONE INEDITA FF EDIZIONI) ─── */}
      {showWeb3FormsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1E293B] p-6 rounded-2xl max-w-md w-full border border-[#D4AF37] text-left shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-[#D4AF37]">Richiesta Brano Inedito — FF Edizioni</h3>
              <button type="button" onClick={() => setShowWeb3FormsModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Invia i dettagli della coppia al Maestro Fausto Fusetti per la composizione d&apos;autore.
            </p>

            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-3">
              <input type="hidden" name="access_key" value="9013a8d5-0901-42a0-b9e6-4c45553f960d" />
              <input type="hidden" name="subject" value="Nuova Richiesta Brano Inedito FF Edizioni - SaaS LOVE" />
              <input type="hidden" name="from_name" value="LOVE Agency Hub" />

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Nomi Sposi & Agenzia</label>
                <input
                  type="text"
                  name="sposi_agenzia"
                  required
                  defaultValue={`${coupleNames} (Sposi in Love Agency)`}
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Email Agenzia / Sposi</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="info@agenzia.it"
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Dettagli Storia d&apos;Amore / Stile Desiderato</label>
                <textarea
                  name="messaggio"
                  required
                  rows={3}
                  placeholder="Racconta la storia della coppia o lo stile musicale desiderato..."
                  className="w-full p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-[#D4AF37] resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWeb3FormsModal(false)}
                  className="px-4 py-2 text-xs bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs bg-[#D4AF37] text-slate-900 font-bold rounded-lg hover:bg-amber-400 transition"
                >
                  Invia Richiesta al Maestro 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
