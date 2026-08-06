"use client";

import React from "react";
import { Sparkles, Calendar, Music, MapPin, Palette, Gift, Heart, MessageSquare, Plus, Trash2, ShoppingBag, Layers } from "lucide-react";
import {
  DRESS_CODE_PALETTES,
  WELCOME_PHRASE_PRESETS,
  DATE_DISPLAY_MODES,
  SCHEDULE_SCHEMAS,
  EVENT_THEMES,
  INTRO_START_OPTIONS,
  RSVP_STYLES,
  AUDIO_DEMOS,
  BACKGROUND_PRESETS,
} from "./constants";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
}

export interface PartnerStoreItem {
  id: string;
  name: string;
  url: string;
  logoUrl?: string;
}

// 1. SCHEDA DATI SPOSI
export function SectionDatiSposi({ coupleNames, selectedPhrasePreset, customWelcomePhrase, modules, toggleModule, handleUpdate }: any) {
  return (
    <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border-2 border-[#D4AF37]/40 shadow-md space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-[#D4AF37]" /> Dati Sposi &amp; Frase d&apos;Accoglienza
        </h3>
        <button
          type="button"
          onClick={() => toggleModule("dedicheMarquee")}
          className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
            modules?.dedicheMarquee ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]" : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {modules?.dedicheMarquee ? "✓ Attivo" : "✕ Disattivo"}
        </button>
      </div>

      <div>
        <label className="block text-[11px] font-bold mb-1">Nomi degli Sposi</label>
        <input
          type="text"
          value={coupleNames}
          onChange={(e) => handleUpdate("coupleNames", e.target.value)}
          className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif font-bold text-[#1E293B]"
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold mb-1">Frase d&apos;Accoglienza Preset</label>
        <select
          value={selectedPhrasePreset}
          onChange={(e) => handleUpdate("selectedPhrasePreset", e.target.value)}
          className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif cursor-pointer"
        >
          {(WELCOME_PHRASE_PRESETS || []).map((phrase: string, idx: number) => (
            <option key={idx} value={String(idx)}>
              {idx === 9 ? "✍️ Personalizzato (digita la tua frase)" : `"${phrase}"`}
            </option>
          ))}
        </select>

        {selectedPhrasePreset === "9" && (
          <textarea
            rows={2}
            placeholder="Scrivi la tua frase speciale d'accoglienza..."
            value={customWelcomePhrase}
            onChange={(e) => handleUpdate("customWelcomePhrase", e.target.value)}
            className="mt-2 w-full text-xs p-2 rounded-xl border border-[#D4AF37] bg-white font-serif font-bold"
          />
        )}
      </div>
    </div>
  );
}

// 2. SCHEDA MODELLI PREIMPOSTATI
export function SectionModelliPreset({ selectedTemplate, applyTemplateA, applyTemplateB, applyTemplateC }: any) {
  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-3">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
        <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Modello Preimpostato
      </h3>

      <div className="grid grid-cols-3 gap-2 pt-1">
        <button
          type="button"
          onClick={applyTemplateA}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedTemplate === "A" ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]" : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <span className="text-xs font-bold block text-[#1E293B]">Modello A</span>
          <span className="text-[9px] text-slate-500 mt-1 block">Elena &amp; Davide</span>
        </button>

        <button
          type="button"
          onClick={applyTemplateB}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedTemplate === "B" ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]" : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <span className="text-xs font-bold block text-[#1E293B]">Modello B</span>
          <span className="text-[9px] text-slate-500 mt-1 block">Francesca &amp; Luca</span>
        </button>

        <button
          type="button"
          onClick={applyTemplateC}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedTemplate === "C" ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]" : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <span className="text-xs font-bold block text-[#8B6508]">Modello C</span>
          <span className="text-[9px] text-slate-500 mt-1 block">Giulia &amp; Marco</span>
        </button>
      </div>
    </div>
  );
}

// 3. SCHEDA COLONNA SONORA
export function SectionColonnaSonora({ audioUrl, handleUpdate }: any) {
  return (
    <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
        <Music className="w-4 h-4 text-[#D4AF37]" /> Colonna Sonora d&apos;Autore &amp; Upload MP3
      </h3>

      <div>
        <label className="block text-[11px] font-bold mb-1">Seleziona Brano o Incolla MP3</label>
        <select
          value={audioUrl}
          onChange={(e) => handleUpdate("audioUrl", e.target.value)}
          className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
        >
          {(AUDIO_DEMOS || []).map((track: any) => (
            <option key={track.id} value={track.url}>
              {track.title}
            </option>
          ))}
          <option value="custom">Incolla Link MP3 Personalizzato / Cloud</option>
        </select>

        {audioUrl === "custom" && (
          <div className="mt-2 space-y-1">
            <label className="block text-[10px] font-bold text-[#8B6508]">URL File MP3 Personalizzato</label>
            <input
              type="text"
              placeholder="https://mio-server.com/musica-sposi.mp3"
              onChange={(e) => handleUpdate("audioUrl", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-[#D4AF37] bg-white font-mono"
            />
          </div>
        )}
      </div>
    </div>
  );
}

// 4. SCHEDA SFONDO TEXTURES
export function SectionSfondoTextures({ heroBgImage, handleUpdate }: any) {
  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
        <Layers className="w-4 h-4 text-[#D4AF37]" /> Sfondo dell&apos;Invito &amp; Textures (10 Preset + Palette)
      </h3>

      <div>
        <label className="block text-[11px] font-bold mb-2">Scegli la Texture di Sfondo dell&apos;Invito</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {(BACKGROUND_PRESETS || []).map((preset: any) => {
            const isSelected = heroBgImage === preset.url || heroBgImage === preset.id;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleUpdate("heroBgImage", preset.url)}
                className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer overflow-hidden ${
                  isSelected ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="w-full h-12 rounded-lg overflow-hidden relative mb-1 border border-black/10">
                  <img src={preset.thumbnail} alt={preset.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-[9px] font-bold block leading-tight truncate text-[#1E293B]">{preset.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold mb-1">Oppure Incolla URL Sfondo Personalizzato / Upload</label>
        <input
          type="text"
          placeholder="https://images.unsplash.com/photo-..."
          value={heroBgImage}
          onChange={(e) => handleUpdate("heroBgImage", e.target.value)}
          className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
        />
      </div>
    </div>
  );
}

// 5. SCHEDA DRESS CODE & PALETTE
export function SectionDressCode({ selectedPaletteIdx, dressCodeNotes, handleUpdate, toggleModule, modules }: any) {
  const palettesList = Array.isArray(DRESS_CODE_PALETTES) ? DRESS_CODE_PALETTES : Object.values(DRESS_CODE_PALETTES || {});

  return (
    <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-[#D4AF37]" /> Dress Code &amp; Palette CROMATICA
        </h3>
        <button
          type="button"
          onClick={() => toggleModule("codiceAbbigliamento")}
          className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
            modules?.codiceAbbigliamento ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]" : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {modules?.codiceAbbigliamento ? "✓ Attivo" : "✕ Disattivo"}
        </button>
      </div>

      <div>
        <label className="block text-[11px] font-bold mb-2">Seleziona Palette (8 Opzioni Coordinate)</label>
        <div className="grid grid-cols-2 gap-2">
          {palettesList.map((p: any, idx: number) => {
            const isSelected = selectedPaletteIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleUpdate("selectedPaletteIdx", idx)}
                className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]" : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <span className="text-[10px] font-bold block mb-1.5 truncate">{p.name}</span>
                <div className="flex gap-1">
                  {(p.colors || []).map((c: string, cIdx: number) => (
                    <span key={cIdx} className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-[11px] font-bold mb-1">Note per il Dress Code</label>
        <input
          type="text"
          value={dressCodeNotes}
          onChange={(e) => handleUpdate("dressCodeNotes", e.target.value)}
          className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
        />
      </div>
    </div>
  );
}
