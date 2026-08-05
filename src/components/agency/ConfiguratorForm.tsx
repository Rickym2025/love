"use client";

import React from "react";
import { Sparkles, Calendar, Music, MapPin, Palette, Gift, CheckSquare, Heart } from "lucide-react";
import {
  DRESS_CODE_PALETTES,
  WELCOME_PHRASE_PRESETS,
  DATE_DISPLAY_MODES,
  SCHEDULE_SCHEMAS,
  EVENT_THEMES,
  INTRO_START_OPTIONS,
  RSVP_STYLES,
  AUDIO_DEMOS
} from "./constants";

export interface ConfiguratorFormProps {
  selectedTemplate?: "A" | "B";
  introStart?: string;
  dateDisplayMode?: string;
  scheduleSchema?: string;
  rsvpStyle?: string;
  eventThemePreset?: string;
  customEventTheme?: string;
  coupleNames?: string;
  weddingDateDay?: string;
  weddingDateMonth?: string;
  weddingDateYear?: string;
  locationName?: string;
  locationAddress?: string;
  audioUrl?: string;
  welcomePhrase?: string;
  selectedPhrasePreset?: string;
  customWelcomePhrase?: string;
  dressCodeNotes?: string;
  selectedPaletteIdx?: number;
  customIban?: string;
  marqueeText?: string;
  modules?: Record<string, boolean>;
  onUpdate: (field: string, value: any) => void;
}

export default function ConfiguratorForm({
  selectedTemplate = "A",
  introStart = "busta",
  dateDisplayMode = "countdown",
  scheduleSchema = "classico",
  rsvpStyle = "classico",
  eventThemePreset = "Luxury Gold & Total White",
  customEventTheme = "",
  coupleNames = "Elena & Davide",
  weddingDateDay = "15",
  weddingDateMonth = "Settembre",
  weddingDateYear = "2026",
  locationName = "Villa Rosa",
  locationAddress = "Via Roma 1, Roma",
  audioUrl = "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3",
  welcomePhrase = "Benvenuti al nostro matrimonio",
  selectedPhrasePreset = "0",
  customWelcomePhrase = "",
  dressCodeNotes = "Abiti eleganti nei toni cromatici della palette",
  selectedPaletteIdx = 0,
  customIban = "IT60 X 05428 11101 000000123456",
  marqueeText = "",
  modules = {
    busta3d: true,
    grattaData: true,
    nuvole3d: true,
    locationMappa: true,
    codiceAbbigliamento: true,
    negoziConvenzionati: true,
    listaNozzeAmazon: true,
    dedicheMarquee: true,
    hubGiochiFesta: true,
    confermaRsvp: true,
  },
  onUpdate,
}: ConfiguratorFormProps) {
  const toggleModule = (key: string) => {
    onUpdate("modules", { ...modules, [key]: !modules[key] });
  };

  const palettesList = Array.isArray(DRESS_CODE_PALETTES)
    ? DRESS_CODE_PALETTES
    : Object.values(DRESS_CODE_PALETTES || {});

  return (
    <div className="w-full space-y-6 text-[#1E293B]">
      {/* ✦ 1. MODELLO & EFFETTO INIZIALE ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Modello &amp; Apertura Iniziale
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold mb-1">Modello Invito</label>
            <select
              value={selectedTemplate}
              onChange={(e) => onUpdate("selectedTemplate", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              <option value="A">Modello A — Elena &amp; Davide</option>
              <option value="B">Modello B — Francesca &amp; Luca</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold mb-1">Effetto Start Iniziale</label>
            <select
              value={introStart}
              onChange={(e) => onUpdate("introStart", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium"
            >
              {(INTRO_START_OPTIONS || []).map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Tema dell&apos;Evento</label>
          <select
            value={eventThemePreset}
            onChange={(e) => onUpdate("eventThemePreset", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium"
          >
            {(EVENT_THEMES || []).map((theme, idx) => (
              <option key={idx} value={theme}>
                {theme}
              </option>
            ))}
          </select>

          {eventThemePreset === "Personalizzato (digita a mano)" && (
            <input
              type="text"
              placeholder="Es. Country Chic Vintage..."
              value={customEventTheme}
              onChange={(e) => onUpdate("customEventTheme", e.target.value)}
              className="mt-2 w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
            />
          )}
        </div>
      </div>

      {/* ✦ 2. NOMI SPOSI & FRASE BENVENUTO ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-[#D4AF37]" /> Dati degli Sposi e Frase d&apos;Accoglienza
        </h3>

        <div>
          <label className="block text-[11px] font-bold mb-1">Nomi degli Sposi</label>
          <input
            type="text"
            value={coupleNames}
            onChange={(e) => onUpdate("coupleNames", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif font-bold"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Frase d&apos;Accoglienza Preset</label>
          <select
            value={selectedPhrasePreset}
            onChange={(e) => onUpdate("selectedPhrasePreset", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-serif"
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
              onChange={(e) => onUpdate("customWelcomePhrase", e.target.value)}
              className="mt-2 w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-serif"
            />
          )}
        </div>
      </div>

      {/* ✦ 3. DATA E MODULO CONTO ALLA ROVESCIA ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#D4AF37]" /> Data e Visualizzazione
        </h3>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-bold mb-1">Giorno</label>
            <input
              type="text"
              value={weddingDateDay}
              onChange={(e) => onUpdate("weddingDateDay", e.target.value)}
              className="w-full text-xs p-2 text-center rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold mb-1">Mese</label>
            <input
              type="text"
              value={weddingDateMonth}
              onChange={(e) => onUpdate("weddingDateMonth", e.target.value)}
              className="w-full text-xs p-2 text-center rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold mb-1">Anno</label>
            <input
              type="text"
              value={weddingDateYear}
              onChange={(e) => onUpdate("weddingDateYear", e.target.value)}
              className="w-full text-xs p-2 text-center rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Modulo Visualizzazione Data</label>
          <select
            value={dateDisplayMode}
            onChange={(e) => onUpdate("dateDisplayMode", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium"
          >
            {(DATE_DISPLAY_MODES || []).map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ✦ 4. PROGRAMMA DELLA GIORNATA ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#D4AF37]" /> Programma della Giornata &amp; Orari
        </h3>

        <div>
          <label className="block text-[11px] font-bold mb-1">Schema Visualizzazione Orari</label>
          <select
            value={scheduleSchema}
            onChange={(e) => onUpdate("scheduleSchema", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium"
          >
            {(SCHEDULE_SCHEMAS || []).map((item) => (
              <option key={item.id} value={item.id}>
                {item.label} — {item.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ✦ 5. COLONNA SONORA D'AUTORE ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Music className="w-4 h-4 text-[#D4AF37]" /> Colonna Sonora d&apos;Autore FF Edizioni
        </h3>

        <div>
          <label className="block text-[11px] font-bold mb-1">Brano Inedito per gli Sposi</label>
          <select
            value={audioUrl}
            onChange={(e) => onUpdate("audioUrl", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium"
          >
            {(AUDIO_DEMOS || []).map((track) => (
              <option key={track.id} value={track.url}>
                {track.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ✦ 6. LOCATION & MAPPA ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#D4AF37]" /> Location del Matrimonio
        </h3>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold mb-1">Nome della Location / Villa</label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => onUpdate("locationName", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold mb-1">Indirizzo per Navigatore / Google Maps</label>
            <input
              type="text"
              value={locationAddress}
              onChange={(e) => onUpdate("locationAddress", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
            />
          </div>
        </div>
      </div>

      {/* ✦ 7. PALETTE DEI COLORI & DRESS CODE ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-[#D4AF37]" /> Dress Code &amp; Palette
        </h3>

        <div>
          <label className="block text-[11px] font-bold mb-2">Seleziona Palette Cromatica (8 Optioni)</label>
          <div className="grid grid-cols-2 gap-2">
            {palettesList.map((palette: any, idx: number) => {
              const isSelected = selectedPaletteIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onUpdate("selectedPaletteIdx", idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-1 ring-[#D4AF37]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="text-[10px] font-bold block mb-1.5 truncate">{palette.name}</span>
                  <div className="flex gap-1">
                    {(palette.colors || []).map((c: string, cIdx: number) => (
                      <span
                        key={cIdx}
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: c }}
                      />
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
            onChange={(e) => onUpdate("dressCodeNotes", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
          />
        </div>
      </div>

      {/* ✦ 8. LISTA NOZZE & IBAN ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Gift className="w-4 h-4 text-[#D4AF37]" /> Lista Nozze &amp; Coordinate IBAN
        </h3>

        <div>
          <label className="block text-[11px] font-bold mb-1">Codice IBAN per Contributi</label>
          <input
            type="text"
            value={customIban}
            onChange={(e) => onUpdate("customIban", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-mono font-bold"
          />
        </div>
      </div>

      {/* ✦ 9. MODULI E FUNZIONALITÀ ATTIVE ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-[#D4AF37]" /> Moduli Attivi nell&apos;Invito
        </h3>

        <div className="space-y-2 text-xs font-medium">
          {Object.entries({
            busta3d: "Busta Luxury con Ceralacca 3D",
            grattaData: "Gioco 'Gratta la Data'",
            nuvole3d: "Apertura Nuvole Volumetriche",
            locationMappa: "Mappa Interattiva Google Maps",
            codiceAbbigliamento: "Galleria Dress Code e Outfit",
            negoziConvenzionati: "Negozi Convenzionati Amazon",
            listaNozzeAmazon: "Box Lista Nozze & IBAN",
            dedicheMarquee: "Nomi Scorrenvoli in Testata",
            hubGiochiFesta: "Hub Giochi della Festa & Quiz",
            confermaRsvp: "Modulo Conferma Partecipazione (RSVP)",
          }).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-100/60">
              <input
                type="checkbox"
                checked={!!modules[key]}
                onChange={() => toggleModule(key)}
                className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
