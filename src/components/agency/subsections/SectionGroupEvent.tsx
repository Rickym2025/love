"use client";

import React from "react";
import { Sparkles, Calendar, MapPin, Plus, Trash2 } from "lucide-react";
import {
  DATE_DISPLAY_MODES,
  SCHEDULE_SCHEMAS,
  EVENT_THEMES,
  INTRO_START_OPTIONS,
} from "../constants";

export function SectionEffettoStart({
  introStart,
  eventThemePreset,
  customEventTheme,
  heroMediaImage,
  waterImageUrl,
  handleUpdate,
  toggleModule,
  modules,
}: any) {
  return (
    <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Effetto Start Iniziale
        </h3>
        <button
          type="button"
          onClick={() => {
            toggleModule("busta3d");
            toggleModule("nuvole3d");
          }}
          className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
            modules?.busta3d || modules?.nuvole3d
              ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
              : "bg-slate-100 text-slate-500 border-slate-200"
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
            onChange={(e) => handleUpdate("introStart", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
          >
            {(INTRO_START_OPTIONS || []).map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label === "Scroll Expand Media a Tutto Schermo" ? "Zoom Multimediale allo Scroll" : opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Tema dell&apos;Evento</label>
          <select
            value={eventThemePreset}
            onChange={(e) => handleUpdate("eventThemePreset", e.target.value)}
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
        <div>
          <label className="block text-[11px] font-bold mb-1 text-[#8B6508]">Scrivi il tuo Tema Personalizzato</label>
          <input
            type="text"
            placeholder="Es. Country Chic Vintage, Mare & Coralli..."
            value={customEventTheme}
            onChange={(e) => handleUpdate("customEventTheme", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-[#D4AF37] bg-white font-bold"
          />
        </div>
      )}

      {introStart === "lago" && (
        <div className="mt-2 space-y-1">
          <label className="block text-[10px] font-bold text-[#8B6508]">URL Immagine Specchio d&apos;Acqua (Lago)</label>
          <input
            type="text"
            placeholder="https://images.unsplash.com/photo-..."
            value={waterImageUrl}
            onChange={(e) => handleUpdate("waterImageUrl", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-sky-300 bg-white font-mono"
          />
        </div>
      )}

      <div>
        <label className="block text-[10px] font-bold mb-1">URL Foto Principale Sposi (Zoom / Cerimonia)</label>
        <input
          type="text"
          placeholder="https://images.unsplash.com/photo-..."
          value={heroMediaImage}
          onChange={(e) => handleUpdate("heroMediaImage", e.target.value)}
          className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-mono"
        />
      </div>
    </div>
  );
}

export function SectionDataMatrimonio({
  weddingDateDay,
  weddingDateMonth,
  weddingDateYear,
  dateDisplayMode,
  handleUpdate,
  toggleModule,
  modules,
}: any) {
  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#D4AF37]" /> Data del Matrimonio
        </h3>
        <button
          type="button"
          onClick={() => toggleModule("grattaData")}
          className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
            modules?.grattaData
              ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
              : "bg-slate-100 text-slate-500 border-slate-200"
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
          value={dateDisplayMode}
          onChange={(e) => handleUpdate("dateDisplayMode", e.target.value)}
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
  );
}

export function SectionProgrammaGiornata({
  scheduleSchema,
  scheduleItems,
  addScheduleItem,
  updateScheduleItem,
  removeScheduleItem,
  handleUpdate,
}: any) {
  return (
    <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#D4AF37]" /> Programma della Giornata &amp; Orari Modificabili
        </h3>
        <button
          type="button"
          onClick={addScheduleItem}
          className="px-2.5 py-1 text-[10px] font-bold bg-[#D4AF37] text-slate-900 rounded-lg flex items-center gap-1 hover:bg-amber-400 cursor-pointer shadow-xs"
        >
          <Plus className="w-3 h-3" /> Aggiungi Orario
        </button>
      </div>

      <div>
        <label className="block text-[11px] font-bold mb-2">Schema Grafico Visualizzazione Orari</label>
        <select
          value={scheduleSchema}
          onChange={(e) => handleUpdate("scheduleSchema", e.target.value)}
          className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer mb-3"
        >
          {(SCHEDULE_SCHEMAS || []).map((item) => (
            <option key={item.id} value={item.id}>
              {item.label} — {item.description}
            </option>
          ))}
        </select>

        <div className="space-y-2">
          <label className="block text-[11px] font-bold text-slate-700">Modifica Orari e Momenti:</label>
          {(scheduleItems || []).map((item: any) => (
            <div key={item.id} className="flex gap-2 items-center bg-white p-2 rounded-xl border border-slate-200">
              <input
                type="text"
                value={item.time}
                onChange={(e) => updateScheduleItem(item.id, "time", e.target.value)}
                className="w-20 text-xs p-1.5 font-bold text-center border border-slate-300 rounded-lg text-[#8B6508]"
                placeholder="16:30"
              />
              <input
                type="text"
                value={item.title}
                onChange={(e) => updateScheduleItem(item.id, "title", e.target.value)}
                className="flex-1 text-xs p-1.5 font-medium border border-slate-300 rounded-lg"
                placeholder="Descrizione momento..."
              />
              <button
                type="button"
                onClick={() => removeScheduleItem(item.id)}
                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                title="Elimina orario"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SectionLocationMappa({
  locationName,
  locationAddress,
  handleUpdate,
  toggleModule,
  modules,
}: any) {
  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#D4AF37]" /> Location del Matrimonio &amp; Mappa Google
        </h3>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => toggleModule("locationMappa")}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.locationMappa !== false
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {modules?.locationMappa !== false ? "✓ Modulo Attivo" : "✕ Modulo Disattivo"}
          </button>
          <button
            type="button"
            onClick={() => toggleModule("showOnlyMap")}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.showOnlyMap !== false
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                : "bg-amber-100 text-amber-800 border-amber-300"
            }`}
          >
            {modules?.showOnlyMap !== false ? "✓ Mappa Google Visibile" : "✕ Nascondi Solo Mappa"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-[11px] font-bold mb-1">Nome della Location / Villa (Sempre Visibile)</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => handleUpdate("locationName", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
          />
        </div>
        <div>
          <label className="block text-[11px] font-bold mb-1">Indirizzo per Navigatore / Google Maps (Sempre Visibile)</label>
          <input
            type="text"
            value={locationAddress}
            onChange={(e) => handleUpdate("locationAddress", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
