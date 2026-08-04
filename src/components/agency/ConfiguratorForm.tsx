"use client";

import React from "react";
import { Plus, Trash2, Music } from "lucide-react";
import {
  WELCOME_PHRASE_PRESETS,
  INTRO_START_PRESETS,
  DATE_DISPLAY_MODES,
  SCHEDULE_SCHEMAS,
  RSVP_STYLES,
  EVENT_THEME_PRESETS,
  DRESS_CODE_PALETTES,
} from "./constants";

export default function ConfiguratorForm(props: any) {
  const {
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
    customIban,
    setCustomIban,
    modules,
    toggleModule,
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold text-[#1E293B]">Crea &amp; Configura Invito</h2>

      {/* 1. SELEZIONE TEMPLATE & EFFETTO START */}
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

        <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
          <label className="block text-xs font-bold text-[#1E293B]">Tema dell&apos;Evento (Scegli o Digita a Mano)</label>
          <select
            value={eventThemePreset}
            onChange={(e) => setEventThemePreset(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-[#1E293B] font-bold text-xs"
          >
            {EVENT_THEME_PRESETS.map((t, idx) => (
              <option key={idx} value={t}>{t}</option>
            ))}
          </select>
          <input
            type="text"
            value={customEventTheme}
            onChange={(e) => {
              setEventThemePreset("Personalizzato (digita a mano)");
              setCustomEventTheme(e.target.value);
            }}
            placeholder="Digita qui il tema dell'evento personalizzato..."
            className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#1E293B] mt-2"
          />
        </div>

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

      {/* 3. COLONNA SONORA & BRANO INEDITO FF EDIZIONI */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
          3. Brano Inedito / Colonna Sonora (FF Edizioni)
        </label>

        <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-[#8B6508]">
            <Music className="w-4 h-4 text-[#D4AF37]" />
            <span>Colonna Sonora Inedita FF Edizioni (Maestro Fausto Fusetti - SIAE)</span>
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-slate-600 mb-1">Carica File MP3 dal PC / Smartphone</label>
            <input type="file" accept="audio/*" className="text-xs text-slate-600 block w-full mb-2" />
            
            <label className="block text-[10px] font-bold text-slate-600 mb-1">Oppure Inserisci URL File Audio MP3</label>
            <input
              type="text"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              placeholder="https://.../canzone-sposi.mp3"
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white text-xs font-mono font-bold text-[#1E293B]"
            />
          </div>
        </div>
      </div>

      {/* 4. VISUALIZZAZIONE DATA & PROGRAMMA ORARI */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
          4. Visualizzazione Data &amp; Programma Orari (Italiano)
        </label>

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

      {/* 5. DRESS CODE, NEGOZI CONVENZIONATI & LISTA NOZZE */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
          5. Palette Cromatiche, Negozi Convenzionati &amp; IBAN Sposi
        </label>

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

        <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#1E293B]">🏪 Negozi Convenzionati (Include Amazon /logo.png)</span>
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

      {/* 6. MODULO CONFERMA RSVP (3 MODELLI) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <label className="block text-xs font-bold uppercase text-[#1E293B] tracking-wider">
          6. Modulo Conferma Partecipazione RSVP (3 Modelli Dinamici)
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
  );
}
