"use client";

import React from "react";
import { Sparkles, Calendar, Music, MapPin, Palette, Gift, CheckSquare, Heart, MessageSquare } from "lucide-react";
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
  template?: "A" | "B";
  introStart?: string;
  start?: string;
  dateDisplayMode?: string;
  dateMode?: string;
  scheduleSchema?: string;
  schedule?: string;
  rsvpStyle?: string;
  eventThemePreset?: string;
  eventTheme?: string;
  customEventTheme?: string;
  coupleNames?: string;
  weddingDateDay?: string;
  weddingDateMonth?: string;
  weddingDateYear?: string;
  locationName?: string;
  locationAddress?: string;
  audioUrl?: string;
  audio?: string;
  welcomePhrase?: string;
  selectedPhrasePreset?: string;
  phrasePreset?: string;
  customWelcomePhrase?: string;
  dressCodeNotes?: string;
  selectedPaletteIdx?: number;
  palette?: number;
  customIban?: string;
  marqueeText?: string;
  modules?: Record<string, boolean>;
  onUpdate: (field: string, value: any) => void;
}

export default function ConfiguratorForm(props: ConfiguratorFormProps) {
  const {
    selectedTemplate,
    template,
    introStart,
    start,
    dateDisplayMode,
    dateMode,
    scheduleSchema,
    schedule,
    rsvpStyle = "classico",
    eventThemePreset,
    eventTheme,
    customEventTheme = "",
    coupleNames = "Elena & Davide",
    weddingDateDay = "15",
    weddingDateMonth = "Settembre",
    weddingDateYear = "2026",
    locationName = "Villa Rosa",
    locationAddress = "Via Roma 1, Roma",
    audioUrl,
    audio,
    welcomePhrase = "Benvenuti al nostro matrimonio",
    selectedPhrasePreset,
    phrasePreset,
    customWelcomePhrase = "",
    dressCodeNotes = "Abiti eleganti nei toni cromatici della palette",
    selectedPaletteIdx,
    palette,
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
  } = props;

  // VALORI CORRENTI CON FALLBACK SU ENTI BINDING
  const currentTemplate = selectedTemplate || template || "A";
  const currentStart = introStart || start || "busta";
  const currentDateMode = dateDisplayMode || dateMode || "countdown";
  const currentSchedule = scheduleSchema || schedule || "classico";
  const currentPaletteIdx = selectedPaletteIdx !== undefined ? selectedPaletteIdx : (palette !== undefined ? palette : 0);
  const currentPhrasePreset = selectedPhrasePreset || phrasePreset || "0";
  const currentAudioUrl = audioUrl || audio || "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3";
  const currentEventTheme = eventThemePreset || eventTheme || "Luxury Gold & Total White";

  // AGGIORNAMENTO SINCRONIZZATO PER ENTRAMBE LE CHIAVI (PERMETTE LA SELEZIONE NEI DROPDOWN)
  const handleUpdate = (field: string, value: any) => {
    onUpdate(field, value);

    if (field === "selectedTemplate") onUpdate("template", value);
    if (field === "template") onUpdate("selectedTemplate", value);

    if (field === "introStart") onUpdate("start", value);
    if (field === "start") onUpdate("introStart", value);

    if (field === "dateDisplayMode") onUpdate("dateMode", value);
    if (field === "dateMode") onUpdate("dateDisplayMode", value);

    if (field === "scheduleSchema") onUpdate("schedule", value);
    if (field === "schedule") onUpdate("scheduleSchema", value);

    if (field === "selectedPaletteIdx") onUpdate("palette", value);
    if (field === "palette") onUpdate("selectedPaletteIdx", value);

    if (field === "selectedPhrasePreset") onUpdate("phrasePreset", value);
    if (field === "phrasePreset") onUpdate("selectedPhrasePreset", value);

    if (field === "eventThemePreset") onUpdate("eventTheme", value);
    if (field === "eventTheme") onUpdate("eventThemePreset", value);

    if (field === "audioUrl") onUpdate("audio", value);
    if (field === "audio") onUpdate("audioUrl", value);
  };

  const toggleModule = (key: string) => {
    onUpdate("modules", { ...modules, [key]: !modules[key] });
  };

  const palettesList = Array.isArray(DRESS_CODE_PALETTES)
    ? DRESS_CODE_PALETTES
    : Object.values(DRESS_CODE_PALETTES || {});

  return (
    <div className="w-full space-y-6 text-[#1E293B]">
      {/* ✦ 1. MODELLO & EFFETTO APERTURA INIZIALE ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Modello &amp; Apertura Iniziale
          </h3>
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={!!modules.busta3d || !!modules.nuvole3d}
              onChange={() => {
                toggleModule("busta3d");
                toggleModule("nuvole3d");
              }}
              className="w-3.5 h-3.5 rounded text-[#D4AF37]"
            />
            Attiva Animazione Start
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold mb-1">Modello Invito</label>
            <select
              value={currentTemplate}
              onChange={(e) => handleUpdate("selectedTemplate", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
            >
              <option value="A">Modello A — Elena &amp; Davide</option>
              <option value="B">Modello B — Francesca &amp; Luca</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold mb-1">Effetto Start Iniziale</label>
            <select
              value={currentStart}
              onChange={(e) => handleUpdate("introStart", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
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
            value={currentEventTheme}
            onChange={(e) => handleUpdate("eventThemePreset", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
          >
            {(EVENT_THEMES || []).map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>

          {currentEventTheme === "Personalizzato (digita a mano)" && (
            <input
              type="text"
              placeholder="Es. Country Chic Vintage..."
              value={customEventTheme}
              onChange={(e) => handleUpdate("customEventTheme", e.target.value)}
              className="mt-2 w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
            />
          )}
        </div>
      </div>

      {/* ✦ 2. NOMI SPOSI & FRASE BENVENUTO ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#D4AF37]" /> Dati Sposi &amp; Frase d&apos;Accoglienza
          </h3>
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={!!modules.dedicheMarquee}
              onChange={() => toggleModule("dedicheMarquee")}
              className="w-3.5 h-3.5 rounded text-[#D4AF37]"
            />
            Attiva Testo Scorrevole
          </label>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Nomi degli Sposi</label>
          <input
            type="text"
            value={coupleNames}
            onChange={(e) => handleUpdate("coupleNames", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif font-bold"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Frase d&apos;Accoglienza Preset</label>
          <select
            value={currentPhrasePreset}
            onChange={(e) => handleUpdate("selectedPhrasePreset", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-serif cursor-pointer"
          >
            {(WELCOME_PHRASE_PRESETS || []).map((phrase, idx) => (
              <option key={idx} value={String(idx)}>
                {idx === 9 ? "✍️ Personalizzato (digita la tua frase)" : `"${phrase}"`}
              </option>
            ))}
          </select>

          {currentPhrasePreset === "9" && (
            <textarea
              rows={2}
              placeholder="Scrivi la tua frase speciale d'accoglienza..."
              value={customWelcomePhrase}
              onChange={(e) => handleUpdate("customWelcomePhrase", e.target.value)}
              className="mt-2 w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-serif"
            />
          )}
        </div>
      </div>

      {/* ✦ 3. DATA E CONTO ALLA ROVESCIA ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> Data e Visualizzazione
          </h3>
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={!!modules.grattaData}
              onChange={() => toggleModule("grattaData")}
              className="w-3.5 h-3.5 rounded text-[#D4AF37]"
            />
            Attiva Gratta la Data
          </label>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-bold mb-1">Giorno</label>
            <input
              type="text"
              value={weddingDateDay}
              onChange={(e) => handleUpdate("weddingDateDay", e.target.value)}
              className="w-full text-xs p-2 text-center rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold mb-1">Mese</label>
            <input
              type="text"
              value={weddingDateMonth}
              onChange={(e) => handleUpdate("weddingDateMonth", e.target.value)}
              className="w-full text-xs p-2 text-center rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold mb-1">Anno</label>
            <input
              type="text"
              value={weddingDateYear}
              onChange={(e) => handleUpdate("weddingDateYear", e.target.value)}
              className="w-full text-xs p-2 text-center rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Modulo Visualizzazione Data</label>
          <select
            value={currentDateMode}
            onChange={(e) => handleUpdate("dateDisplayMode", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
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
            value={currentSchedule}
            onChange={(e) => handleUpdate("scheduleSchema", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
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
            value={currentAudioUrl}
            onChange={(e) => handleUpdate("audioUrl", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
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
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={!!modules.locationMappa}
              onChange={() => toggleModule("locationMappa")}
              className="w-3.5 h-3.5 rounded text-[#D4AF37]"
            />
            Attiva Mappa Interattiva
          </label>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold mb-1">Nome della Location / Villa</label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => handleUpdate("locationName", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold mb-1">Indirizzo per Navigatore / Google Maps</label>
            <input
              type="text"
              value={locationAddress}
              onChange={(e) => handleUpdate("locationAddress", e.target.value)}
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
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={!!modules.codiceAbbigliamento}
              onChange={() => toggleModule("codiceAbbigliamento")}
              className="w-3.5 h-3.5 rounded text-[#D4AF37]"
            />
            Attiva Galleria Dress Code
          </label>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-2">Seleziona Palette (8 Opzioni Coordinate)</label>
          <div className="grid grid-cols-2 gap-2">
            {palettesList.map((p: any, idx: number) => {
              const isSelected = currentPaletteIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleUpdate("selectedPaletteIdx", idx)}
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
            onChange={(e) => handleUpdate("dressCodeNotes", e.target.value)}
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
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={!!modules.listaNozzeAmazon}
              onChange={() => toggleModule("listaNozzeAmazon")}
              className="w-3.5 h-3.5 rounded text-[#D4AF37]"
            />
            Attiva Lista Nozze &amp; IBAN
          </label>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Codice IBAN per Contributi</label>
          <input
            type="text"
            value={customIban}
            onChange={(e) => handleUpdate("customIban", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-mono font-bold"
          />
        </div>
      </div>

      {/* ✦ 9. CONFERSIONE PARTECIPAZIONE (RSVP) & FESTA ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> Conferma Partecipazione (RSVP) &amp; Giochi Festa
          </h3>
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={!!modules.confermaRsvp}
              onChange={() => toggleModule("confermaRsvp")}
              className="w-3.5 h-3.5 rounded text-[#D4AF37]"
            />
            Attiva Modulo RSVP
          </label>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Stile Modulo RSVP</label>
          <select
            value={rsvpStyle}
            onChange={(e) => handleUpdate("rsvpStyle", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
          >
            {(RSVP_STYLES || []).map((style) => (
              <option key={style.id} value={style.id}>
                {style.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold">Attiva Hub Giochi della Festa per Invitati</span>
          <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 cursor-pointer">
            <input
              type="checkbox"
              checked={!!modules.hubGiochiFesta}
              onChange={() => toggleModule("hubGiochiFesta")}
              className="w-3.5 h-3.5 rounded text-[#D4AF37]"
            />
            Abilita Giochi Festa
          </label>
        </div>
      </div>

      {/* ✦ 10. RIEPILOGO GENERALE MODULI ATTIVI ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-[#D4AF37]" /> Panoramica Generale Moduli Attivi
        </h3>

        <div className="grid grid-cols-2 gap-2 text-xs font-medium">
          {Object.entries({
            busta3d: "Busta Luxury con Ceralacca",
            grattaData: "Gioco Gratta la Data",
            nuvole3d: "Apertura Nuvole 3D",
            locationMappa: "Mappa Google Maps",
            codiceAbbigliamento: "Galleria Dress Code",
            negoziConvenzionati: "Negozi Amazon",
            listaNozzeAmazon: "Box Lista Nozze & IBAN",
            dedicheMarquee: "Nomi Scorrenvoli",
            hubGiochiFesta: "Hub Giochi Festa",
            confermaRsvp: "Modulo RSVP Partecipazione",
          }).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer p-1.5 rounded-lg hover:bg-slate-100/60">
              <input
                type="checkbox"
                checked={!!modules[key]}
                onChange={() => toggleModule(key)}
                className="w-4 h-4 rounded text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span className="truncate">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
