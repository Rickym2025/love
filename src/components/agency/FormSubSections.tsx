"use client";

import React from "react";
import { Heart, Sparkles, Music, Layers, Calendar, MapPin, Palette, Gift, MessageSquare, Plus, Trash2, ShoppingBag, PartyPopper, HelpCircle, Image as ImageIcon } from "lucide-react";
import {
  WELCOME_PHRASE_PRESETS,
  DATE_DISPLAY_MODES,
  SCHEDULE_SCHEMAS,
  EVENT_THEMES,
  INTRO_START_OPTIONS,
  RSVP_STYLES,
  AUDIO_DEMOS,
  BACKGROUND_PRESETS,
  DRESS_CODE_PALETTES,
} from "./constants";

// 10 DOMANDE QUIZ PREIMPOSTATE D'AUTORE PER GLI SPOSI
export const QUIZ_PRESET_QUESTIONS = [
  "Dove ci siamo conosciuti per la prima volta?",
  "Chi ha fatto il primo passo?",
  "Qual è il nostro piatto preferito da mangiare insieme?",
  "Dove andremo in viaggio di nozze?",
  "Chi guida meglio tra i due?",
  "Chi ha detto 'Ti Amo' per primo?",
  "Qual è la canzone della nostra storia?",
  "Chi dei due cucina meglio?",
  "Qual è la data del nostro primo anniversario?",
  "Chi è il più ritardatario tra gli sposi?",
];

// ... (Sottosezioni 1-10 intatte)

// 11. MODULO RSVP (SEPARATO E PULITO)
export function SectionRsvpFesta({
  rsvpStyle,
  handleUpdate,
  toggleModule,
  modules,
}: any) {
  return (
    <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> Conferma Partecipazione (RSVP)
        </h3>
        <button
          type="button"
          onClick={() => toggleModule("confermaRsvp")}
          className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
            modules?.confermaRsvp
              ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
              : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {modules?.confermaRsvp ? "✓ Attivo" : "✕ Disattivo"}
        </button>
      </div>

      <div>
        <label className="block text-[11px] font-bold mb-1">Stile Modulo RSVP (6 Stili Formali &amp; Interattivi)</label>
        <select
          value={rsvpStyle}
          onChange={(e) => handleUpdate("rsvpStyle", e.target.value)}
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
        <span className="text-xs font-bold">Stelle e Fregi Divisori (✦ ✦ ✦)</span>
        <button
          type="button"
          onClick={() => toggleModule("fregiStelle")}
          className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
            modules?.fregiStelle !== false
              ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
              : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {modules?.fregiStelle !== false ? "✓ Attivo" : "✕ Disattivo"}
        </button>
      </div>
    </div>
  );
}

// 12. NUOVA SEZIONE DEDICATA: FESTA, GIOCHI & MAXISCHERMO (STACCO NETTO DARK/GOLD)
export function SectionFestaGiochiMaxischermo({
  quizQuestions = [
    { question: "Dove ci siamo conosciuti per la prima volta?", answer: "In università" },
    { question: "Chi ha fatto la proposta di nozze?", answer: "Davide" },
  ],
  galleryStyle = "polaroid",
  handleUpdate,
  toggleModule,
  modules,
}: any) {
  const addQuizQuestion = (presetText?: string) => {
    const newQ = {
      id: Date.now().toString(),
      question: presetText || "Nuova Domanda del Quiz...",
      answer: "Risposta corretta",
    };
    handleUpdate("quizQuestions", [...quizQuestions, newQ]);
  };

  const removeQuizQuestion = (idx: number) => {
    const updated = quizQuestions.filter((_: any, i: number) => i !== idx);
    handleUpdate("quizQuestions", updated);
  };

  const updateQuizQuestion = (idx: number, field: "question" | "answer", val: string) => {
    const updated = quizQuestions.map((q: any, i: number) => (i === idx ? { ...q, [field]: val } : q));
    handleUpdate("quizQuestions", updated);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-5 text-left">
      <div className="flex justify-between items-center border-b border-slate-700/80 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
          <PartyPopper className="w-5 h-5 text-[#D4AF37]" /> Festa, Giochi &amp; Maxischermo (Sezione Separata)
        </h3>
        <button
          type="button"
          onClick={() => toggleModule("hubGiochiFesta")}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
            modules?.hubGiochiFesta !== false
              ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-md"
              : "bg-slate-800 text-slate-400 border-slate-700"
          }`}
        >
          {modules?.hubGiochiFesta !== false ? "✓ Festa Attiva" : "✕ Disattiva"}
        </button>
      </div>

      {/* TIPO DI GALLERIA FOTOGRAFICA FESTA */}
      <div className="space-y-2">
        <label className="block text-[11px] font-bold text-[#D4AF37]">Tipologia Galleria Fotografica Festa</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => handleUpdate("galleryStyle", "polaroid")}
            className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
              galleryStyle !== "circular"
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-md"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            📸 Photo Wall Polaroid
          </button>
          <button
            type="button"
            onClick={() => handleUpdate("galleryStyle", "circular")}
            className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
              galleryStyle === "circular"
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-md"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            🎡 Galleria 3D Circolare
          </button>
        </div>
      </div>

      {/* EDITOR QUIZ SPOSI CON DOMANDE PRESET */}
      <div className="pt-3 border-t border-slate-700/80 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#D4AF37]" /> Quiz della Coppia (Personalizza Domande)
          </span>
          <button
            type="button"
            onClick={() => addQuizQuestion()}
            className="px-2.5 py-1 text-[10px] font-bold bg-[#D4AF37] text-slate-900 rounded-lg flex items-center gap-1 hover:bg-amber-400 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Aggiungi Domanda
          </button>
        </div>

        {/* DROPDOWN DOMANDE PREIMPOSTATE */}
        <div>
          <label className="block text-[10px] text-slate-400 mb-1">Seleziona e aggiungi una domanda preimpostata d&apos;autore:</label>
          <select
            onChange={(e) => {
              if (e.target.value) {
                addQuizQuestion(e.target.value);
                e.target.value = "";
              }
            }}
            className="w-full text-xs p-2 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium cursor-pointer"
          >
            <option value="">-- Scegli tra 10 Domande Preimpostate --</option>
            {QUIZ_PRESET_QUESTIONS.map((q, idx) => (
              <option key={idx} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {/* LISTA DOMANDE DEL QUIZ */}
        <div className="space-y-2">
          {quizQuestions.map((q: any, idx: number) => (
            <div key={idx} className="p-3 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-1.5">
              <div className="flex gap-2 items-center">
                <span className="text-xs font-bold text-[#D4AF37]">{idx + 1}.</span>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => updateQuizQuestion(idx, "question", e.target.value)}
                  className="flex-1 text-xs p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                  placeholder="Domanda..."
                />
                <button
                  type="button"
                  onClick={() => removeQuizQuestion(idx)}
                  className="p-1.5 text-rose-400 hover:bg-rose-950 rounded-lg cursor-pointer"
                  title="Elimina domanda"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <input
                type="text"
                value={q.answer}
                onChange={(e) => updateQuizQuestion(idx, "answer", e.target.value)}
                className="w-full text-xs p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-emerald-400 font-mono"
                placeholder="Risposta corretta..."
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
