"use client";
import React, { useState } from "react";

export default function AgencyStudioPage() {
  const [activeTab, setActiveTab] = useState<"wedding" | "brand" | "modules">("wedding");
  const [selectedTheme, setSelectedTheme] = useState("2"); // Tema Nuvole/Azzurro
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
    setModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#1E293B] text-white flex flex-col md:flex-row">
      {/* COLONNA 1: MENU SINISTRA */}
      <div className="w-full md:w-1/4 border-r border-slate-700 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#D4AF37] mb-1">SPOSI IN LOVE</h1>
          <p className="text-xs text-slate-400 mb-6">Studio Configuratore White-Label</p>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab("wedding")}
              className={`w-[100%] text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === "wedding" ? "bg-[#D4AF37] text-black" : "hover:bg-slate-800 text-slate-300"}`}
            >
              📁 I Miei Matrimoni Clienti
            </button>
            <button 
              onClick={() => setActiveTab("brand")}
              className={`w-[100%] text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === "brand" ? "bg-[#D4AF37] text-black" : "hover:bg-slate-800 text-slate-300"}`}
            >
              🎨 Personalizzazione Brand
            </button>
            <button 
              onClick={() => setActiveTab("modules")}
              className={`w-[100%] text-left px-4 py-3 rounded-lg text-sm font-medium transition ${activeTab === "modules" ? "bg-[#D4AF37] text-black" : "hover:bg-slate-800 text-slate-300"}`}
            >
              ⚙️ Moduli & Effetti Attivabili
            </button>
          </nav>
        </div>

        {/* Box Richiesta Canzone FF Edizioni -> Apre Web3Form */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-[#D4AF37]/30 mt-6">
          <p className="text-xs font-bold text-[#D4AF37]">Richiedi Brano Inedito FF Edizioni</p>
          <p className="text-xs text-slate-400 mt-1 mb-3">Brano d'autore personalizzato per la coppia dal Maestro Fausto Fusetti.</p>
          <button 
            onClick={() => setShowWeb3FormsModal(true)}
            className="w-[100%] py-2 bg-[#D4AF37] text-black rounded-lg text-xs font-bold hover:bg-amber-400 transition"
          >
            Richiedi Canzone ↗
          </button>
        </div>
      </div>

      {/* COLONNA 2: CONFIGURATORE CENTRALE */}
      <div className="w-full md:w-2/4 p-6 border-r border-slate-700 overflow-y-auto max-h-screen">
        {activeTab === "wedding" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-[#D4AF37]">Dati del Matrimonio & Tema</h2>
            
            <div>
              <label className="block text-xs font-semibold mb-2">Selezione Tema Grafico (10 Temi)</label>
              <select 
                value={selectedTheme} 
                onChange={(e) => setSelectedTheme(e.target.value)}
                className="w-[100%] p-3 rounded-lg bg-slate-800 border border-slate-600 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="1">1. Avorio & Oro Bruciato (Villa del Balbianello)</option>
                <option value="2">2. Cielo Azzurro & Nuvole</option>
                <option value="3">3. Smeraldo & Ceralacca Dorata</option>
                <option value="4">4. Rose Gold & Quartz</option>
                <option value="5">5. Blu Notte & Stelle</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2">Nomi Sposi</label>
              <input 
                type="text" 
                value={coupleNames} 
                onChange={(e) => setCoupleNames(e.target.value)}
                className="w-[100%] p-3 rounded-lg bg-slate-800 border border-slate-600 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2">Location</label>
              <input 
                type="text" 
                value={locationName} 
                onChange={(e) => setLocationName(e.target.value)}
                className="w-[100%] p-3 rounded-lg bg-slate-800 border border-slate-600 text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-2">Frase di Benvenuto</label>
              <textarea 
                rows={3} 
                value={welcomePhrase} 
                onChange={(e) => setWelcomePhrase(e.target.value)}
                className="w-[100%] p-3 rounded-lg bg-slate-800 border border-slate-600 text-sm text-white"
              />
            </div>
          </div>
        )}

        {activeTab === "brand" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#D4AF37]">Personalizzazione White-Label Agenzia</h2>
            <p className="text-xs text-slate-400">Carica il tuo logo agenzia e imposta i tuoi colori di footer.</p>
            <div>
              <label className="block text-xs mb-1">Logo Agenzia (PNG Trasparente)</label>
              <input type="file" className="text-xs text-slate-300" />
            </div>
          </div>
        )}

        {activeTab === "modules" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#D4AF37]">Moduli & Effetti Attivabili</h2>
            {Object.keys(modules).map((key) => (
              <div key={key} className="flex justify-between items-center p-3 bg-slate-800 rounded-lg">
                <span className="text-sm capitalize">{key}</span>
                <button 
                  onClick={() => toggleModule(key as keyof typeof modules)}
                  className={`px-3 py-1 rounded text-xs font-bold ${modules[key as keyof typeof modules] ? "bg-emerald-500 text-white" : "bg-slate-600 text-slate-300"}`}
                >
                  {modules[key as keyof typeof modules] ? "Attivo" : "Disattivato"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* COLONNA 3: ANTEPRIMA LIVE SINCRONIZZATA */}
      <div className="w-full md:w-1/4 p-6 bg-slate-900 flex flex-col items-center justify-center">
        <p className="text-xs font-bold text-[#D4AF37] mb-4 uppercase tracking-widest">Anteprima Live Cliente</p>
        
        {/* Mockup Smartphone */}
        <div className={`w-[280px] h-[540px] rounded-[36px] border-4 border-slate-700 shadow-2xl p-4 overflow-y-auto transition-colors duration-500 ${selectedTheme === "2" ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"}`}>
          <div className="text-center pt-8">
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">Wedding Day</span>
            <h3 className="text-xl font-serif font-bold mt-2">{coupleNames}</h3>
            <p className="text-xs italic mt-3 px-2 font-serif opacity-80">"{welcomePhrase}"</p>
            <p className="text-xs font-bold mt-4 text-[#D4AF37]">{locationName}</p>

            {/* Badge Moduli Attivi */}
            <div className="mt-6 flex flex-wrap gap-1 justify-center">
              {modules.envelope && <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded">✉️ Envelope</span>}
              {modules.waterRipple && <span className="text-[9px] bg-blue-500/20 text-blue-600 px-2 py-0.5 rounded">💧 Water Effect</span>}
              {modules.scratchDate && <span className="text-[9px] bg-amber-500/20 text-amber-700 px-2 py-0.5 rounded">🎰 Scratch Date</span>}
            </div>

            <button className="mt-8 w-[100%] py-2 bg-[#D4AF37] text-slate-900 font-bold rounded-full text-xs shadow-md">
              Conferma Partecipazione
            </button>
          </div>
        </div>
      </div>

      {/* MODALE WEB3FORMS (Richiesta Canzone Inedita) */}
      {showWeb3FormsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-800 p-6 rounded-xl max-w-md w-[100%] border border-[#D4AF37]">
            <h3 className="text-lg font-bold text-[#D4AF37] mb-2">Richiesta Brano Inedito - FF Edizioni</h3>
            <p className="text-xs text-slate-300 mb-4">Compila il form per richiedere la composizione su misura al Maestro Fausto Fusetti.</p>
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-3">
              <input type="hidden" name="access_key" value="INSERISCI_TUA_KEY_WEB3FORMS" />
              <input type="text" name="sposi" placeholder="Nomi Sposi (es. Elena & Davide)" required className="w-[100%] p-2 rounded bg-slate-700 text-xs text-white" />
              <input type="email" name="email" placeholder="Email Agenzia / Sposi" required className="w-[100%] p-2 rounded bg-slate-700 text-xs text-white" />
              <textarea name="note" placeholder="Dettagli sulla storia d'amore o genere musicale..." rows={3} className="w-[100%] p-2 rounded bg-slate-700 text-xs text-white" />
              <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={() => setShowWeb3FormsModal(false)} className="px-3 py-1.5 text-xs bg-slate-600 rounded">Annulla</button>
                <button type="submit" className="px-3 py-1.5 text-xs bg-[#D4AF37] text-black font-bold rounded">Invia Richiesta 🚀</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
