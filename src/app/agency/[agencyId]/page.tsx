'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, Settings, Sparkles, CheckCircle2, Music, Eye, Layers, ExternalLink } from 'lucide-react';

export default function AgencyStudioPage({ params }: { params: { agencyId: string } }) {
  const agencyName = params.agencyId.replace(/-/g, ' ').toUpperCase();

  const [coupleNames, setCoupleNames] = useState('Elena & Davide');
  const [weddingDate, setWeddingDate] = useState('2026-09-28');
  const [locationName, setLocationName] = useState('Villa del Balbianello');
  const [theme, setTheme] = useState<'pink' | 'blue'>('pink');

  // MODULI ATTIVABILI DALL'AGENZIA
  const [modules, setModules] = useState({
    envelope: true,
    waterRipple: true,
    clouds: false,
    scratchDate: true,
    quiz: true,
    musicFF: true,
    amazonWishlist: true,
    photoWall: true,
  });

  const toggleModule = (key: keyof typeof modules) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col">
      
      {/* HEADER AGENZIA STUDIO */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#8B1E24] text-white flex items-center justify-center font-bold text-sm shadow">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif text-lg font-bold text-[#1E293B] leading-none">{agencyName}</h1>
            <span className="text-[10px] text-[#8B1E24] uppercase tracking-widest font-bold">Studio Configuratore White-Label</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs bg-emerald-500/10 text-emerald-800 border border-emerald-500/20 px-3 py-1 rounded-full font-bold">
            10 Crediti Matrimoni Attivi
          </span>
        </div>
      </header>

      {/* STRUTTURA STUDIO A 3 COLONNE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* COLONNA 1: MENU NAVIGAZIONE E RICHIESTA BRANO FF EDIZIONI */}
        <div className="lg:col-span-3 bg-white border-r border-[#E2E8F0] p-6 space-y-6">
          <div>
            <span className="text-[10px] text-[#64748B] uppercase tracking-widest font-bold block mb-3">Menu Studio</span>
            <nav className="space-y-1">
              <button className="w-full text-left px-4 py-3 rounded-xl bg-[#FAF7F2] font-bold text-xs text-[#8B1E24] border border-[#E2E8F0]">
                📁 I Miei Matrimoni Clienti
              </button>
              <button className="w-full text-left px-4 py-3 rounded-xl hover:bg-[#FAF7F2] text-xs font-medium text-[#64748B]">
                🎨 Personalizzazione Brand
              </button>
            </nav>
          </div>

          {/* BOX RICHIESTA BRANO INEDITO FF EDIZIONI */}
          <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F4EFE6] border-2 border-[#D4AF37] p-5 rounded-2xl shadow-sm text-center">
            <Music className="w-6 h-6 text-[#D4AF37] mx-auto mb-2 animate-bounce" />
            <h4 className="font-serif text-sm font-bold text-[#1E293B] mb-1">Richiedi Brano FF Edizioni</h4>
            <p className="text-[10px] text-[#64748B] mb-3">Brano inedito e personalizzato per gli sposi prodotto dal Maestro Fausto Fusetti.</p>
            <a
              href="https://wa.me/3904251675950?text=Ciao%20Fausto,%20vorrei%20richiedere%20un%20brano%20inedito%20per%20un%20matrimonio!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#D4AF37] text-white text-[10px] font-bold uppercase tracking-wider block shadow hover:bg-[#B59226]"
            >
              Richiedi Canzone ↗
            </a>
          </div>
        </div>

        {/* COLONNA 2: MODULI ED EDITOR INFORMAZIONI SPOSI */}
        <div className="lg:col-span-5 p-6 overflow-y-auto space-y-6 bg-[#FAF7F2]">
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#1E293B] mb-4 flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#8B1E24]" /> Dati del Matrimonio
            </h3>
            
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[#64748B] font-bold mb-1 uppercase">Nomi degli Sposi</label>
                <input
                  type="text"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E2E8F0] rounded-xl px-3 py-2.5 font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#64748B] font-bold mb-1 uppercase">Data Evento</label>
                  <input
                    type="date"
                    value={weddingDate}
                    onChange={(e) => setWeddingDate(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#E2E8F0] rounded-xl px-3 py-2.5"
                  />
                </div>
                <div>
                  <label className="block text-[#64748B] font-bold mb-1 uppercase">Tema Grafico</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as any)}
                    className="w-full bg-[#FAF7F2] border border-[#E2E8F0] rounded-xl px-3 py-2.5 font-bold"
                  >
                    <option value="pink">Villa / Rosa & Oro</option>
                    <option value="blue">Cielo Azzurro & Nuvole</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#64748B] font-bold mb-1 uppercase">Nome Location</label>
                <input
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#E2E8F0] rounded-xl px-3 py-2.5"
                />
              </div>
            </div>
          </div>

          {/* SELEZIONE MODULI ATTIVI */}
          <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#1E293B] mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#D4AF37]" /> Moduli & Effetti Attivabili
            </h3>

            <div className="space-y-2 text-xs">
              {Object.entries(modules).map(([key, isEnabled]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-[#FAF7F2] rounded-xl border border-[#E2E8F0]">
                  <span className="font-bold text-[#1E293B] capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <button
                    onClick={() => toggleModule(key as any)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${
                      isEnabled ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isEnabled ? 'Attivo' : 'Disattivato'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLONNA 3: PREVIEW LIVE DELL'INVITO E DELLA FESTA */}
        <div className="lg:col-span-4 bg-white border-l border-[#E2E8F0] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-[#8B1E24] font-bold uppercase tracking-wider flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> Anteprima Live Cliente
              </span>
              <Link
                href="/elena-e-davide"
                target="_blank"
                className="text-[10px] font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
              >
                Apri full ↗
              </Link>
            </div>

            {/* MOCKUP MOBILE PREVIEW */}
            <div className="w-full max-w-xs mx-auto aspect-[9/16] bg-[#FAF7F2] border-4 border-[#1E293B] rounded-[32px] p-4 shadow-xl flex flex-col items-center justify-between text-center overflow-hidden">
              <div className="w-12 h-1 bg-[#1E293B] rounded-full mb-2" />
              <div className="my-auto">
                <span className="text-[8px] text-[#D4AF37] font-bold uppercase">Wedding Day</span>
                <h4 className="font-serif text-lg text-[#1E293B] font-bold">{coupleNames}</h4>
                <p className="text-[8px] text-[#64748B]">{weddingDate}</p>
                <div className="mt-4 p-2 bg-white rounded-xl border border-[#E2E8F0] text-[8px] italic">
                  {locationName}
                </div>
              </div>
              <div className="w-full py-2 bg-[#8B1E24] text-white text-[8px] font-bold rounded-lg uppercase">
                Conferma Partecipazione
              </div>
            </div>
          </div>

          <button className="w-full py-3.5 rounded-xl bg-[#8B1E24] text-white font-bold text-xs uppercase tracking-widest shadow-md mt-6 hover:bg-[#6E1216]">
            Salva & Genera Link Sposi 🚀
          </button>
        </div>

      </div>
    </div>
  );
}
