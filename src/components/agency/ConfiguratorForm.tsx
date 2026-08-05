"use client";

import React from "react";
import { Sparkles, Calendar, Music, MapPin, Palette, Gift, Heart, MessageSquare } from "lucide-react";
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

  // ATTIVAZIONE / DISATTIVAZIONE SINGOLO MODULO
  const toggleModule = (key: string) => {
    onUpdate("modules", { ...modules, [key]: !modules?.[key] });
  };

  // APPLICAZIONE PRESET MODELLO A
  const applyTemplateA = () => {
    onUpdate("selectedTemplate", "A");
    onUpdate("coupleNames", "Elena & Davide");
    onUpdate("introStart", "busta");
    onUpdate("dateDisplayMode", "countdown");
    onUpdate("scheduleSchema", "classico");
    onUpdate("audioUrl", "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3");
    onUpdate("selectedPaletteIdx", 0);
  };

  // APPLICAZIONE PRESET MODELLO B
  const applyTemplateB = () => {
    onUpdate("selectedTemplate", "B");
    onUpdate("coupleNames", "Francesca & Luca");
    onUpdate("introStart", "nuvole");
    onUpdate("dateDisplayMode", "scratch");
    onUpdate("scheduleSchema", "timeline");
    onUpdate("audioUrl", "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3");
    onUpdate("selectedPaletteIdx", 1);
  };

  const palettesList = Array.isArray(DRESS_CODE_PALETTES)
    ? DRESS_CODE_PALETTES
    : Object.values(DRESS_CODE_PALETTES || {});

  return (
    <div className="w-full space-y-6 text-[#1E293B]">
      {/* ✦ MODELLI PREIMPOSTATI A / B ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Modello Preimpostato
        </h3>
        <p className="text-[11px] text-slate-600">
          Seleziona uno dei due modelli d&apos;autore per caricare il layout di esempio:
        </p>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={applyTemplateA}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTemplate === "A"
                ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xs font-bold block text-[#1E293B]">Modello A — Elena &amp; Davide</span>
            <span className="text-[10px] text-slate-500 mt-1 block">Luxury Gold • Busta 3D • Countdown</span>
          </button>

          <button
            type="button"
            onClick={applyTemplateB}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTemplate === "B"
                ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xs font-bold block text-[#1E293B]">Modello B — Francesca &amp; Luca</span>
            <span className="text-[10px] text-slate-500 mt-1 block">Boho Chic • Nuvole 3D • Gratta Data</span>
          </button>
        </div>
      </div>

      {/* ✦ 1. EFFETTO DI APERTURA ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Effetto di Apertura
          </h3>
          <button
            type="button"
            onClick={() => {
              toggleModule("busta3d");
              toggleModule("nuvole3d");
            }}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.busta3d || modules?.nuvole3d
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-xs"
                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
            }`}
          >
            {modules?.busta3d || modules?.nuvole3d ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold mb-1">Effetto Start Iniziale</label>
            <select
              value={introStart}
              onChange={(e) => onUpdate("introStart", e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
            >
              {(INTRO_START_OPTIONS || []).map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold mb-1">Tema dell&apos;Evento</label>
            <select
              value={eventThemePreset}
              onChange={(e) => onUpdate("eventThemePreset", e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
            >
              {(EVENT_THEMES || []).map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {eventThemePreset === "Personalizzato (digita a mano)" && (
          <input
            type="text"
            placeholder="Es. Country Chic Vintage..."
            value={customEventTheme}
            onChange={(e) => onUpdate("customEventTheme", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
          />
        )}
      </div>

      {/* ✦ 2. NOMI SPOSI & FRASE BENVENUTO ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#D4AF37]" /> Dati Sposi &amp; Frase d&apos;Accoglienza
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("dedicheMarquee")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.dedicheMarquee
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-xs"
                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
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
            onChange={(e) => onUpdate("coupleNames", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif font-bold"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Frase d&apos;Accoglienza Preset</label>
          <select
            value={selectedPhrasePreset}
            onChange={(e) => onUpdate("selectedPhrasePreset", e.target.value)}
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
              onChange={(e) => onUpdate("customWelcomePhrase", e.target.value)}
              className="mt-2 w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-serif"
            />
          )}
        </div>
      </div>

      {/* ✦ 3. DATA E CONTO ALLA ROVESCIA ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> Data del Matrimonio
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("grattaData")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.grattaData
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-xs"
                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
            }`}
          >
            {modules?.grattaData ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

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
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
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
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
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
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
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
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> Location del Matrimonio
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("locationMappa")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.locationMappa
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-xs"
                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
            }`}
          >
            {modules?.locationMappa ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

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

      {/* ✦ 7. DRESS CODE & PALETTE ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-[#D4AF37]" /> Dress Code &amp; Palette CROMATICA
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("codiceAbbigliamento")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.codiceAbbigliamento
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-xs"
                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
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
                  onClick={() => onUpdate("selectedPaletteIdx", idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="text-[10px] font-bold block mb-1.5 truncate">{p.name}</span>
                  <div className="flex gap-1">
                    {(p.colors || []).map((c: string, cIdx: number) => (
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
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-[#D4AF37]" /> Lista Nozze &amp; Coordinate IBAN
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("listaNozzeAmazon")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.listaNozzeAmazon
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-xs"
                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
            }`}
          >
            {modules?.listaNozzeAmazon ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

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

      {/* ✦ 9. CONFERMA PARTECIPAZIONE (RSVP) & FESTA ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> Conferma Partecipazione (RSVP) &amp; Festa
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("confermaRsvp")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.confermaRsvp
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-xs"
                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
            }`}
          >
            {modules?.confermaRsvp ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Stile Modulo RSVP</label>
          <select
            value={rsvpStyle}
            onChange={(e) => onUpdate("rsvpStyle", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
          >
            {(RSVP_STYLES || []).map((style) => (
              <option key={style.id} value={style.id}>
                {style.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold">Giochi della Festa per Invitati</span>
          <button
            type="button"
            onClick={() => toggleModule("hubGiochiFesta")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.hubGiochiFesta
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-xs"
                : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
            }`}
          >
            {modules?.hubGiochiFesta ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>
      </div>
    </div>
  );
}
