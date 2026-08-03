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
    selectedColorScheme,
    setSelectedColorScheme,
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
    waterImageUrl,
    setWaterImageUrl,
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

  function handleStoreLogoUpload(id: string, e: any) {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      updateStore(id, "logoUrl", url);
    }
  }

  function handleAudioFileUpload(e: any) {
    if (e.target.files && e.target.files[0]) {
      setAudioUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  function handleWaterImageUpload(e: any) {
    if (e.target.files && e.target.files[0]) {
      setWaterImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <div style={style} className="p-8 border-r border-[#D4AF37]/30 overflow-y-auto max-h-screen min-w-[340px]">
      {activeTab === "create" && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-[#1E293B]">Crea &amp; Configura Invito</h2>

          {/* 1. TEMPLATE */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-2">1. Template Grafico Layout</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate("A");
                  setCoupleNames("Elena & Davide");
                }}
                className={`p-4 rounded-2xl border-2 text-left ${
                  selectedTemplate === "A" ? "border-[#D4AF37] bg-amber-50" : "border-slate-200 bg-white"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-[#D4AF37] block">Template A</span>
                <h4 className="font-serif font-bold text-sm">Arco Romano &amp; Cigni</h4>
                <p className="text-[10px] text-slate-500 mt-1">Sfondo avorio, cigni sul lago, ceralacca oro e mappa location.</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedTemplate("B");
                  setCoupleNames("Francesca & Luca");
                }}
                className={`p-4 rounded-2xl border-2 text-left ${
                  selectedTemplate === "B" ? "border-sky-500 bg-sky-50" : "border-slate-200 bg-white"
                }`}
              >
                <span className="text-[10px] font-bold uppercase text-sky-600 block">Template B</span>
                <h4 className="font-serif font-bold text-sm">Cielo &amp; Nuvole 3D</h4>
                <p className="text-[10px] text-slate-500 mt-1">3 Grattabili date, busta azzurra, Nuvole Parting Clouds e RSVP pastello.</p>
              </button>
            </div>
          </div>

          {/* 2. SPOSI & FRASE */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-slate-600">2. Dati Sposi &amp; Frase di Benvenuto</label>
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Nomi Sposi</label>
              <input
                type="text"
                value={coupleNames}
                onChange={(e) => setCoupleNames(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-1">Frase di Benvenuto (10 Opzioni)</label>
              <select
                value={selectedPhrasePreset}
                onChange={(e) => setSelectedPhrasePreset(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
              >
                {WELCOME_PHRASE_PRESETS.map((phrase, idx) => (
                  <option key={idx} value={idx.toString()}>
                    {idx + 1}. {phrase.length > 55 ? phrase.substring(0, 55) + "..." : phrase}
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
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs resize-none"
                />
              </div>
            )}
          </div>

          {/* 3. COLONNA SONORA */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-slate-600">3. Brano Inedito / Colonna Sonora</label>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Carica File MP3 dal PC / Smartphone</label>
              <input type="file" accept="audio/*" onChange={handleAudioFileUpload} className="text-xs text-slate-600 block w-full mb-2" />
              <label className="block text-[10px] font-bold text-slate-500 mb-1">Oppure Inserisci URL File Audio MP3</label>
              <input type="text" value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-mono" />
            </div>
          </div>

          {/* 4. TUTTI I MODULI NUMERATI PROGRESSIVAMENTE (5.1 - 5.12) */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <label className="block text-xs font-bold uppercase text-slate-600">4. Attiva &amp; Personalizza i Moduli dell&apos;Ecosistema</label>

            {/* 5.1 BUSTA 3D */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">5.1 ✉️ Busta d&apos;Epoca &amp; Sigillo Ceralacca</span>
              <button
                type="button"
                onClick={() => toggleModule("busta3d")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  modules.busta3d ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                }`}
              >
                {modules.busta3d ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* 5.2 GRATTA LA DATA */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">5.2 🎰 Gratta la Data col Dito</span>
                <button
                  type="button"
                  onClick={() => toggleModule("grattaData")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    modules.grattaData ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                  }`}
                >
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

            {/* 5.3 EFFETTO ACQUA */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">5.3 💧 Effetto Acqua (Rifrazione Liquida)</span>
                <button
                  type="button"
                  onClick={() => toggleModule("effettoAcqua")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    modules.effettoAcqua ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {modules.effettoAcqua ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.effettoAcqua && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="block text-[10px] text-slate-500 font-bold">Carica Immagine Sfondo Lago (File PC/Mobile)</label>
                  <input type="file" accept="image/*" onChange={handleWaterImageUpload} className="text-xs text-slate-600 block w-full" />
                </div>
              )}
            </div>

            {/* 5.4 NUVOLE 3D */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">5.4 ☁️ Nuvole 3D Programma Orari</span>
              <button
                type="button"
                onClick={() => toggleModule("nuvole3d")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  modules.nuvole3d ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                }`}
              >
                {modules.nuvole3d ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* 5.5 LOCATION & MAPPA */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">5.5 📍 Location &amp; Mappa Google / Indicazioni</span>
                <button
                  type="button"
                  onClick={() => toggleModule("locationMappa")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    modules.locationMappa ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {modules.locationMappa ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.locationMappa && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <input type="text" value={locationName} onChange={(e) => setLocationName(e.target.value)} placeholder="Nome Location" className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                  <input type="text" value={locationAddress} onChange={(e) => setLocationAddress(e.target.value)} placeholder="Indirizzo completo" className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                </div>
              )}
            </div>

            {/* 5.6 DRESS CODE PALETTE */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">5.6 🎨 Codice Abbigliamento &amp; Palette Multi-Colore</span>
                <button
                  type="button"
                  onClick={() => toggleModule("codiceAbbigliamento")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    modules.codiceAbbigliamento ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {modules.codiceAbbigliamento ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.codiceAbbigliamento && (
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <input type="text" value={dressCodeNotes} onChange={(e) => setDressCodeNotes(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                  <label className="block text-[10px] text-slate-500 font-bold mt-2">Scegli tra le 8 Palette Cromatiche Complete</label>
                  <div className="grid grid-cols-2 gap-2">
                    {DRESS_CODE_PALETTES.map((pal, idx) => (
                      <button
                        key={pal.id}
                        type="button"
                        onClick={() => setSelectedPaletteIdx(idx)}
                        className={`p-2 rounded-xl border text-left flex flex-col gap-1 ${
                          selectedPaletteIdx === idx ? "border-[#D4AF37] bg-amber-50 shadow-sm" : "border-slate-200 bg-white"
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
              )}
            </div>

            {/* 5.7 NEGOZI CONVENZIONATI (CAMPI COMPLETI NOME, LINK E UPLOAD LOGO) */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">5.7 🏪 Negozi Convenzionati (Link &amp; Upload Logo)</span>
                <button
                  type="button"
                  onClick={() => toggleModule("negoziConvenzionati")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    modules.negoziConvenzionati ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {modules.negoziConvenzionati ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.negoziConvenzionati && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {partnerStores.map((store: any) => (
                    <div key={store.id} className="bg-[#FAF7F2] p-3 rounded-xl border border-slate-200 space-y-2">
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Nome Negozio</label>
                        <input
                          type="text"
                          value={store.name}
                          onChange={(e) => updateStore(store.id, "name", e.target.value)}
                          className="w-full p-2 rounded-lg bg-white border border-slate-300 text-xs font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Link Sito Web Negozio (es. https://...)</label>
                        <input
                          type="text"
                          value={store.url}
                          placeholder="https://www.negozio.it"
                          onChange={(e) => updateStore(store.id, "url", e.target.value)}
                          className="w-full p-2 rounded-lg bg-white border border-slate-300 text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-500 font-bold mb-0.5">Carica Logo Negozio (File PC/Mobile)</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleStoreLogoUpload(store.id, e)}
                          className="text-[10px] text-slate-600 block w-full"
                        />
                      </div>
                      <button type="button" onClick={() => removeStore(store.id)} className="text-xs text-rose-600 font-bold flex items-center gap-1 pt-1">
                        <Trash2 className="w-3.5 h-3.5" /> Rimuovi Negozio
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addStore} className="px-3 py-1.5 bg-[#D4AF37] text-slate-900 text-xs font-bold rounded-lg flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Aggiungi Negozio Convenzionato
                  </button>
                </div>
              )}
            </div>

            {/* 5.8 LISTA NOZZE AMAZON & IBAN */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">5.8 🎁 Lista Nozze Amazon &amp; IBAN</span>
                <button
                  type="button"
                  onClick={() => toggleModule("listaNozzeAmazon")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    modules.listaNozzeAmazon ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {modules.listaNozzeAmazon ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.listaNozzeAmazon && (
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-[10px] text-slate-500 font-bold mb-1">IBAN Sposi</label>
                  <input type="text" value={customIban} onChange={(e) => setCustomIban(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs font-mono" />
                </div>
              )}
            </div>

            {/* 5.9 DEDICHE SCORREVOLI MARQUEE */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#1E293B]">5.9 📜 Dediche Scorrevoli (Marquee)</span>
                <button
                  type="button"
                  onClick={() => toggleModule("dedicheMarquee")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    modules.dedicheMarquee ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {modules.dedicheMarquee ? "Attivo" : "Disattivato"}
                </button>
              </div>
              {modules.dedicheMarquee && (
                <div className="pt-2 border-t border-slate-100">
                  <input type="text" value={marqueeText} onChange={(e) => setMarqueeText(e.target.value)} className="w-full p-2 rounded-lg border border-slate-300 text-xs" />
                </div>
              )}
            </div>

            {/* 5.10 HUB GIOCHI DELLA FESTA */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">5.10 🎮 Hub Giochi della Festa (Quiz, Puzzle, Gratta Foto)</span>
              <button
                type="button"
                onClick={() => toggleModule("hubGiochiFesta")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  modules.hubGiochiFesta ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                }`}
              >
                {modules.hubGiochiFesta ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* 5.11 GUEST PHOTO WALL */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">5.11 📸 Guest Photo Wall (10 Filtri + Proiettore)</span>
              <button
                type="button"
                onClick={() => toggleModule("guestPhotoWall")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  modules.guestPhotoWall ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                }`}
              >
                {modules.guestPhotoWall ? "Attivo" : "Disattivato"}
              </button>
            </div>

            {/* 5.12 CONFERMA PARTECIPAZIONE RSVP */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
              <span className="text-xs font-bold text-[#1E293B]">5.12 ✉️ Modulo Conferma Partecipazione RSVP</span>
              <button
                type="button"
                onClick={() => toggleModule("confermaRsvp")}
                className={`px-3 py-1 rounded-lg text-xs font-bold ${
                  modules.confermaRsvp ? "bg-[#D4AF37] text-slate-900" : "bg-slate-200 text-slate-500"
                }`}
              >
                {modules.confermaRsvp ? "Attivo" : "Disattivato"}
              </button>
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
  );
}
