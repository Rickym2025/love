"use client";

import React, { useState } from "react";
import { Check, X, Users, Utensils, Send, Heart, AlertCircle, Sparkles } from "lucide-react";

export interface RsvpFormProps {
  coupleNames?: string;
  paletteColors?: string[];
  rsvpStyle?: string;
}

export default function RsvpForm({
  coupleNames = "Elena & Davide",
  paletteColors = ["#FAF7F2", "#FFFFFF", "#E6C687", "#8B5CF6", "#3B0764"],
  rsvpStyle = "classico",
}: RsvpFormProps) {
  const [attending, setAttending] = useState<boolean | null>(null);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState("carne");
  const [allergies, setAllergies] = useState("");
  const [submitted, setInviato] = useState(false);

  const bgMain = paletteColors[0] || "#FAF7F2";
  const bgCard = paletteColors[1] || "#FFFFFF";
  const borderCard = paletteColors[2] || "#E6C687";
  const accentColor = paletteColors[3] || "#8B6508";
  const textColor = paletteColors[4] || "#1E293B";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviato(true);
  };

  if (submitted) {
    return (
      <div
        className="p-6 rounded-3xl text-center space-y-3 shadow-md animate-fade-in border-2"
        style={{ backgroundColor: bgCard, borderColor: borderCard, color: textColor }}
      >
        <Heart className="w-10 h-10 mx-auto fill-current" style={{ color: accentColor }} />
        <h3 className="text-lg font-serif font-bold">Grazie di cuore!</h3>
        <p className="text-xs opacity-90 font-serif">
          La tua conferma di partecipazione per il matrimonio di <strong>{coupleNames}</strong> è stata inviata con successo.
        </p>
      </div>
    );
  }

  // 1. STILE MODERNO INTERATTIVO (GLOW & COUNTER)
  if (rsvpStyle === "moderno") {
    return (
      <form
        onSubmit={handleSubmit}
        className="p-5 rounded-3xl shadow-xl space-y-4 text-left border-2"
        style={{ backgroundColor: textColor, color: "#FFFFFF", borderColor: accentColor }}
      >
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1" style={{ color: accentColor }}>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> RSVP • Modello Moderno
          </span>
          <h3 className="text-lg font-serif font-bold text-white">Festeggia con {coupleNames}!</h3>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-300 mb-1">Il tuo Nome e Cognome</label>
          <input
            type="text"
            required
            placeholder="es. Mario Rossi"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs font-bold focus:outline-none"
            style={{ borderColor: accentColor }}
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-300 mb-1">Ci sarai al nostro giorno?</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`p-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                attending === true
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <Check className="w-4 h-4" /> Sì, ci sarò!
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`p-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                attending === false
                  ? "bg-rose-500 text-white shadow-md"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <X className="w-4 h-4" /> Purtroppo No
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-300 mb-1 flex items-center gap-1">
            <Users className="w-3.5 h-3.5" style={{ color: accentColor }} /> Numero Partecipanti
          </label>
          <div className="flex items-center gap-3 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700 justify-between">
            <button
              type="button"
              onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
              className="w-8 h-8 rounded-lg bg-slate-700 text-white font-bold text-base flex items-center justify-center hover:bg-slate-600 cursor-pointer"
            >
              -
            </button>
            <span className="font-mono font-bold text-sm" style={{ color: accentColor }}>{guestCount} Persona/e</span>
            <button
              type="button"
              onClick={() => setGuestCount((prev) => Math.min(10, prev + 1))}
              className="w-8 h-8 rounded-lg bg-slate-700 text-white font-bold text-base flex items-center justify-center hover:bg-slate-600 cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* CAMPO INTOLLERANZE SEMPRE PRESENTE */}
        <div>
          <label className="block text-[10px] uppercase font-bold text-slate-300 mb-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" style={{ color: accentColor }} /> Allergie o Intolleranze Alimentari
          </label>
          <textarea
            rows={2}
            placeholder="es. Celiachia, Lattosio, Nichel..."
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs font-medium focus:outline-none resize-none"
          />
        </div>

        <button
          type="submit"
          style={{ backgroundColor: accentColor, color: textColor }}
          className="w-full py-3 font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Send className="w-4 h-4" /> INVIA RISPOSTA
        </button>
      </form>
    );
  }

  // 2. STILE MINIMAL DIRETTO
  if (rsvpStyle === "minimal") {
    return (
      <form onSubmit={handleSubmit} className="p-4 space-y-3 text-center border-t-2 border-b-2 py-6" style={{ borderColor: borderCard }}>
        <h4 className="text-xs uppercase tracking-widest font-bold" style={{ color: accentColor }}>RSVP • Minimal Diretto</h4>
        <p className="text-xs italic font-serif" style={{ color: textColor }}>Conferma la tua presenza per {coupleNames}</p>

        <input
          type="text"
          required
          placeholder="Nome e Cognome..."
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="w-full p-2.5 bg-transparent border-b-2 text-xs font-serif font-bold text-center focus:outline-none"
          style={{ borderColor: accentColor, color: textColor }}
        />

        <div className="flex justify-center gap-4 py-2 text-xs font-serif font-bold">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="minimal_rsvp"
              checked={attending === true}
              onChange={() => setAttending(true)}
              style={{ accentColor: accentColor }}
            />
            Sì, parteciperò
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="minimal_rsvp"
              checked={attending === false}
              onChange={() => setAttending(false)}
              style={{ accentColor: accentColor }}
            />
            Non potrò esserci
          </label>
        </div>

        {/* CAMPO INTOLLERANZE SEMPRE PRESENTE */}
        <textarea
          rows={2}
          placeholder="Allergie o intolleranze alimentari..."
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="w-full p-2 bg-transparent border-b text-xs text-center font-serif focus:outline-none"
          style={{ borderColor: borderCard, color: textColor }}
        />

        <button
          type="submit"
          style={{ backgroundColor: textColor, color: "#FFFFFF" }}
          className="px-6 py-2.5 font-bold text-xs uppercase tracking-wider rounded-full transition-colors shadow-sm cursor-pointer"
        >
          Invia Risposta ↗
        </button>
      </form>
    );
  }

  // 3. STILE LUXURY GOLD D'AUTORE
  if (rsvpStyle === "luxury_gold") {
    return (
      <form
        onSubmit={handleSubmit}
        className="p-5 rounded-3xl border-2 text-center space-y-4 shadow-xl bg-gradient-to-b from-[#FAF7F2] to-white"
        style={{ borderColor: accentColor, color: textColor }}
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B6508] block">✦ LUXURY GOLD D&apos;AUTORE ✦</span>
        <h3 className="text-lg font-serif font-bold" style={{ color: accentColor }}>{coupleNames}</h3>

        <input
          type="text"
          required
          placeholder="Nome e Cognome dell'Ospite"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="w-full p-3 rounded-xl border font-serif font-bold text-center text-xs bg-white shadow-inner"
          style={{ borderColor: borderCard, color: textColor }}
        />

        <div className="grid grid-cols-2 gap-2 text-xs font-serif font-bold">
          <button
            type="button"
            onClick={() => setAttending(true)}
            style={{ backgroundColor: attending === true ? accentColor : "#FFFFFF", borderColor: borderCard, color: attending === true ? "#FFFFFF" : textColor }}
            className="p-2.5 rounded-xl border cursor-pointer shadow-xs"
          >
            ✓ Ci Sarò
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            style={{ backgroundColor: attending === false ? textColor : "#FFFFFF", borderColor: borderCard, color: attending === false ? "#FFFFFF" : textColor }}
            className="p-2.5 rounded-xl border cursor-pointer shadow-xs"
          >
            ✕ Purtroppo No
          </button>
        </div>

        {/* CAMPO INTOLLERANZE SEMPRE PRESENTE */}
        <textarea
          rows={2}
          placeholder="Note per il catering / Intolleranze alimentari..."
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="w-full p-2.5 rounded-xl border text-xs font-serif bg-white"
          style={{ borderColor: borderCard, color: textColor }}
        />

        <button
          type="submit"
          style={{ backgroundColor: accentColor, color: "#FFFFFF" }}
          className="w-full py-3 font-serif font-bold text-xs uppercase tracking-widest rounded-xl hover:brightness-110 shadow-md cursor-pointer"
        >
          CONFERMA PARTECIPAZIONE
        </button>
      </form>
    );
  }

  // 4. STILE BENTO BOX CHIC
  if (rsvpStyle === "bento_chic") {
    return (
      <form onSubmit={handleSubmit} className="p-4 rounded-3xl bg-white border-2 border-slate-200 shadow-md space-y-3 text-left">
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#8B6508] block text-center">Bento Box RSVP</span>
        
        <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-slate-200 space-y-1">
          <label className="block text-[10px] font-bold text-slate-600">Ospite</label>
          <input
            type="text"
            required
            placeholder="Nome e Cognome..."
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs font-bold"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`p-2.5 rounded-xl font-bold text-xs border text-center cursor-pointer ${
              attending === true ? "bg-emerald-600 text-white border-emerald-600" : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Sì, Confermo
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`p-2.5 rounded-xl font-bold text-xs border text-center cursor-pointer ${
              attending === false ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-700 border-slate-200"
            }`}
          >
            Non posso
          </button>
        </div>

        {/* CAMPO INTOLLERANZE SEMPRE PRESENTE */}
        <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-slate-200 space-y-1">
          <label className="block text-[10px] font-bold text-slate-600">Allergie o Intolleranze</label>
          <textarea
            rows={2}
            placeholder="Indicazioni per la cucina..."
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full p-2 rounded-xl bg-white border border-slate-300 text-xs font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-[#8B6508] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer text-center"
        >
          Invia Scheda Bento
        </button>
      </form>
    );
  }

  // 5. STILE BOHÉMIEN D'EPOCA
  if (rsvpStyle === "boheme_vintage") {
    return (
      <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37]/50 text-center space-y-3 font-serif shadow-md">
        <span className="text-xs italic text-[#8B6508] block">✦ Partecipazione d&apos;Epoca ✦</span>
        <h3 className="text-lg font-bold text-[#1E293B]">{coupleNames}</h3>

        <input
          type="text"
          required
          placeholder="Il tuo gentilissimo nome..."
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="w-full p-2.5 bg-white border border-[#D4AF37]/40 rounded-xl text-xs font-bold text-center"
        />

        <div className="flex justify-center gap-3 text-xs font-bold py-1">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`px-4 py-2 rounded-xl border cursor-pointer ${
              attending === true ? "bg-[#D4AF37] text-white border-[#D4AF37]" : "bg-white text-slate-700"
            }`}
          >
            Sarò presente
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`px-4 py-2 rounded-xl border cursor-pointer ${
              attending === false ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-700"
            }`}
          >
            Purtroppo assente
          </button>
        </div>

        {/* CAMPO INTOLLERANZE SEMPRE PRESENTE */}
        <textarea
          rows={2}
          placeholder="Particolari esigenze o intolleranze..."
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          className="w-full p-2 bg-white border border-[#D4AF37]/40 rounded-xl text-xs font-serif"
        />

        <button
          type="submit"
          className="w-full py-2.5 bg-[#8B6508] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm cursor-pointer"
        >
          INVIA CONFERMA D&apos;EPOCA
        </button>
      </form>
    );
  }

  // 6. STILE CLASSICO FORMALE CON MENU (DEFAULT)
  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-3xl border text-center space-y-4 shadow-sm"
      style={{ backgroundColor: bgCard, borderColor: borderCard, color: textColor }}
    >
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-bold tracking-widest block font-serif" style={{ color: accentColor }}>
          CONFERMA DI PARTECIPAZIONE
        </span>
        <p className="text-xs font-serif italic opacity-90">
          Facci sapere se sarai dei nostri per festeggiare insieme il matrimonio di {coupleNames}!
        </p>
      </div>

      <div className="text-left space-y-3">
        <div>
          <label className="block text-[11px] font-bold mb-1 font-serif" style={{ color: textColor }}>Il tuo Nome e Cognome</label>
          <input
            type="text"
            required
            placeholder="es. Mario Rossi"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full p-2.5 rounded-xl border text-xs font-serif font-bold bg-white"
            style={{ borderColor: borderCard, color: textColor }}
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1 font-serif" style={{ color: textColor }}>Confermi la tua presenza?</label>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold font-serif">
            <button
              type="button"
              onClick={() => setAttending(true)}
              style={{
                backgroundColor: attending === true ? accentColor : bgMain,
                borderColor: borderCard,
                color: attending === true ? "#FFFFFF" : textColor,
              }}
              className="p-2.5 rounded-xl border transition-colors cursor-pointer"
            >
              Sì, ci sarò!
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              style={{
                backgroundColor: attending === false ? textColor : bgMain,
                borderColor: borderCard,
                color: attending === false ? "#FFFFFF" : textColor,
              }}
              className="p-2.5 rounded-xl border transition-colors cursor-pointer"
            >
              Purtroppo no
            </button>
          </div>
        </div>

        {/* CAMPO INTOLLERANZE SEMPRE PRESENTE */}
        <div>
          <label className="block text-[11px] font-bold mb-1 font-serif" style={{ color: textColor }}>
            Allergie o Intolleranze Alimentari
          </label>
          <textarea
            rows={2}
            placeholder="es. Celiaco, Lattosio, Crostacei..."
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full p-2.5 rounded-xl border text-xs font-serif bg-white"
            style={{ borderColor: borderCard, color: textColor }}
          />
        </div>
      </div>

      <button
        type="submit"
        style={{ backgroundColor: accentColor, color: "#FFFFFF" }}
        className="w-full py-3 font-serif font-bold text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition-colors shadow-sm cursor-pointer"
      >
        CONFERMA LA PARTECIPAZIONE
      </button>
    </form>
  );
}
