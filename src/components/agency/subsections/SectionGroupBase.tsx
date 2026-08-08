"use client";

import React from "react";
import { Heart, Sparkles, Music, Layers, Send } from "lucide-react";
import {
  WELCOME_PHRASE_PRESETS,
  AUDIO_DEMOS,
  BACKGROUND_PRESETS,
} from "../constants";

export function SectionDatiSposi({
  coupleNames,
  selectedPhrasePreset,
  customWelcomePhrase,
  modules,
  toggleModule,
  handleUpdate,
}: any) {
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
            modules?.dedicheMarquee
              ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
              : "bg-slate-100 text-slate-500 border-slate-200"
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
          {(WELCOME_PHRASE_PRESETS || []).map((phrase, idx) => (
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

export function SectionModelliPreset({
  selectedTemplate,
  applyTemplateA,
  applyTemplateB,
  applyTemplateC,
  heroMediaImage,
  ricevimentoImage,
  handleUpdate,
}: any) {
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
            selectedTemplate === "A"
              ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <span className="text-xs font-bold block text-[#1E293B]">Modello A</span>
          <span className="text-[9px] text-slate-500 mt-1 block">Elena &amp; Davide</span>
        </button>

        <button
          type="button"
          onClick={applyTemplateB}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedTemplate === "B"
              ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <span className="text-xs font-bold block text-[#1E293B]">Modello B</span>
          <span className="text-[9px] text-slate-500 mt-1 block">Francesca &amp; Luca</span>
        </button>

        <button
          type="button"
          onClick={applyTemplateC}
          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
            selectedTemplate === "C"
              ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <span className="text-xs font-bold block text-[#8B6508]">Modello C (Landing)</span>
          <span className="text-[9px] text-slate-500 mt-1 block">Giulia &amp; Marco</span>
        </button>
      </div>

      {selectedTemplate === "C" && (
        <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#D4AF37]/50 space-y-2 mt-3 animate-fade-in">
          <span className="text-xs font-bold text-[#8B6508] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Personalizza Immagini del Modello C:
          </span>
          <div className="space-y-2 pt-1">
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-0.5">1. Foto Cerimonia / Principale</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                value={heroMediaImage || ""}
                onChange={(e) => handleUpdate("heroMediaImage", e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-700 mb-0.5">2. Foto Ricevimento / Festa</label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/photo-..."
                value={ricevimentoImage || ""}
                onChange={(e) => handleUpdate("ricevimentoImage", e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SectionColonnaSonora({ audioUrl, handleUpdate }: any) {
  return (
    <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
        <Music className="w-4 h-4 text-[#D4AF37]" /> Colonna Sonora d&apos;Autore FF Edizioni
      </h3>

      <div>
        <label className="block text-[11px] font-bold mb-1">Seleziona Brano o Incolla MP3</label>
        <select
          value={audioUrl}
          onChange={(e) => handleUpdate("audioUrl", e.target.value)}
          className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
        >
          {(AUDIO_DEMOS || []).map((track) => (
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

      {/* HIGHLIGHT NEUROMARKETING CANZONE INEDITA CON DOPPIO ARRANGIAMENTO */}
      <div className="p-3.5 bg-slate-900 text-white rounded-xl border border-[#D4AF37] space-y-2 text-left">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Canzone Inedita Unica al Mondo (+€300)
          </span>
          <span className="text-[9px] bg-[#D4AF37] text-slate-950 font-bold px-2 py-0.5 rounded-full">2 Varianti Incluse</span>
        </div>
        <p className="text-[11px] text-slate-300 font-serif leading-relaxed">
          Vuoi regalare agli sposi un brano irripetibile con i loro nomi, aneddoti e ricordi reali? Il Maestro <strong>Fausto Fusetti</strong> inciderà <strong>2 versioni d&apos;arrangiamento</strong> tra cui scegliere la loro melodia perfetta.
        </p>
        <a
          href="https://wa.me/3904251675950?text=Ciao%20Riccardo,%20vorrei%20richiedere%20una%20Canzone%20Inedita%20Su%20Misura%20per%20gli%20sposi!"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#D4AF37] hover:text-amber-300 pt-1"
        >
          <Send className="w-3.5 h-3.5" /> Richiedi Canzone Su Misura per gli Sposi (+€300) ↗
        </a>
      </div>
    </div>
  );
}

export function SectionSfondoTextures({ heroBgImage, handleUpdate }: any) {
  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
        <Layers className="w-4 h-4 text-[#D4AF37]" /> Sfondo dell&apos;Invito &amp; Textures (10 Preset + Palette)
      </h3>

      <div>
        <label className="block text-[11px] font-bold mb-2">Scegli la Texture di Sfondo dell&apos;Invito</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {(BACKGROUND_PRESETS || []).map((preset) => {
            const isSelected = heroBgImage === preset.url;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleUpdate("heroBgImage", preset.url)}
                className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer overflow-hidden ${
                  isSelected
                    ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                    : "border-slate-200 bg-white hover:border-slate-300"
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
