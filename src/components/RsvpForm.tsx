"use client";

import React, { useState } from "react";
import { Check, X, Users, Utensils, Send, Heart, AlertCircle, Sparkles } from "lucide-react";

export interface RsvpFormProps {
  coupleNames?: string;
  paletteColors?: string[];
  rsvpStyle?: string; // "classico" | "moderno" | "minimal"
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

  const primaryColor = paletteColors[3] || "#8B6508";
  const accentColor = paletteColors[2] || "#D4AF37";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviato(true);
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-3xl bg-[#FAF7F2] border-2 border-[#D4AF37] text-center space-y-3 shadow-md animate-fade-in">
        <Heart className="w-10 h-10 text-[#D4AF37] mx-auto fill-[#D4AF37]" />
        <h3 className="text-lg font-serif font-bold text-[#1E293B]">Grazie di cuore!</h3>
        <p className="text-xs text-slate-600 font-serif">
          La tua conferma di partecipazione per il matrimonio di <strong>{coupleNames}</strong> è stata inviata con successo.
        </p>
      </div>
    );
  }

  // 1. STILE MODERNO INTERATTIVO (PULSANTI GLOW & COUNTER PARTICIPANTI)
  if (rsvpStyle === "moderno") {
    return (
      <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-slate-900 text-white border-2 border-[#D4AF37] shadow-xl space-y-4 text-left">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> RSVP • Conferma Partecipazione
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
            className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-bold focus:border-[#D4AF37] focus:outline-none"
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
                  ? "bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)]"
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
                  ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)]"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              <X className="w-4 h-4" /> Purtroppo No
            </button>
          </div>
        </div>

        {attending === true && (
          <>
            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-300 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-[#D4AF37]" /> Numero Partecipanti
              </label>
              <div className="flex items-center gap-3 bg-slate-800 p-1.5 rounded-xl border border-slate-700 justify-between">
                <button
                  type="button"
                  onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-700 text-white font-bold text-base flex items-center justify-center hover:bg-slate-600"
                >
                  -
                </button>
                <span className="font-mono font-bold text-sm text-[#D4AF37]">{guestCount} Persona/e</span>
                <button
                  type="button"
                  onClick={() => setGuestCount((prev) => Math.min(10, prev + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-700 text-white font-bold text-base flex items-center justify-center hover:bg-slate-600"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-300 mb-1 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" /> Preferenza Menu
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-bold">
                {["Carne", "Pesce", "Vegetariano", "Bimbi"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMenu(m.toLowerCase())}
                    className={`p-2 rounded-lg border text-center cursor-pointer ${
                      selectedMenu === m.toLowerCase()
                        ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    Menu {m}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-300 mb-1 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-[#D4AF37]" /> Allergie o Intolleranze
              </label>
              <textarea
                rows={2}
                placeholder="es. Celiachia, Lattosio..."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs font-medium focus:border-[#D4AF37] focus:outline-none resize-none"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-[#D4AF37] text-slate-900 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-all shadow-[0_0_15px_rgba(212,175,55,0.6)] cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Send className="w-4 h-4" /> Conferma Partecipazione
        </button>
      </form>
    );
  }

  // 2. STILE MINIMAL DIRETTO (SENZA RIQUADRI, FORM DIRETTISSIMO)
  if (rsvpStyle === "minimal") {
    return (
      <form onSubmit={handleSubmit} className="p-4 space-y-3 text-center border-t border-b border-[#D4AF37]/30 py-6">
        <h4 className="text-xs uppercase tracking-widest font-bold text-[#8B6508]">Conferma la tua presenza</h4>
        <p className="text-xs italic font-serif text-slate-600">Per il matrimonio di {coupleNames}</p>

        <input
          type="text"
          required
          placeholder="Nome e Cognome..."
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          className="w-full p-2.5 bg-transparent border-b-2 border-slate-300 text-xs font-serif font-bold text-[#1E293B] text-center focus:border-[#D4AF37] focus:outline-none"
        />

        <div className="flex justify-center gap-4 py-2 text-xs font-serif font-bold">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="minimal_rsvp"
              checked={attending === true}
              onChange={() => setAttending(true)}
              className="accent-[#D4AF37]"
            />
            Sì, parteciperò
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="minimal_rsvp"
              checked={attending === false}
              onChange={() => setAttending(false)}
              className="accent-[#D4AF37]"
            />
            Non potrò esserci
          </label>
        </div>

        <button
          type="submit"
          className="px-6 py-2.5 bg-[#1E293B] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-slate-800 transition-colors shadow-sm"
        >
          Invia Risposta ↗
        </button>
      </form>
    );
  }

  // 3. STILE CLASSICO ELEGANTE (DEFAULT)
  return (
    <form onSubmit={handleSubmit} className="p-5 rounded-3xl bg-white border border-slate-200 text-center space-y-4 shadow-sm">
      <div className="space-y-1">
        <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B6508] block">
          CONFERMA DI PARTECIPAZIONE
        </span>
        <p className="text-xs font-serif italic text-slate-600">
          Facci sapere se sarai dei nostri per festeggiare insieme il matrimonio di {coupleNames}!
        </p>
      </div>

      <div className="text-left space-y-3">
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1 font-serif">Il tuo Nome e Cognome</label>
          <input
            type="text"
            required
            placeholder="es. Mario Rossi"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-serif font-bold text-[#1E293B]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1 font-serif">Confermi la tua presenza?</label>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold font-serif">
            <button
              type="button"
              onClick={() => setAttending(true)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                attending === true
                  ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-xs"
                  : "bg-[#FAF7F2] text-slate-600 border-slate-200"
              }`}
            >
              Sì, ci sarò!
            </button>
            <button
              type="button"
              onClick={() => setAttending(false)}
              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                attending === false
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-[#FAF7F2] text-slate-600 border-slate-200"
              }`}
            >
              Purtroppo no
            </button>
          </div>
        </div>

        {attending === true && (
          <>
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1 font-serif">Numero Partecipanti</label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-serif font-bold text-[#1E293B] bg-white cursor-pointer"
              >
                <option value={1}>Solo io (1 Persona)</option>
                <option value={2}>In Coppia (2 Persone)</option>
                <option value={3}>Famiglia (3 Persone)</option>
                <option value={4}>Famiglia (4 Persone)</option>
                <option value={5}>Gruppo (5+ Persone)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1 font-serif">Allergie o Intolleranze</label>
              <textarea
                rows={2}
                placeholder="es. Celiaco, Lattosio, Crostacei..."
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-serif text-[#1E293B]"
              />
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-[#8B6508] text-white font-serif font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#6D5006] transition-colors shadow-sm cursor-pointer"
      >
        CONFERMA LA PARTECIPAZIONE
      </button>
    </form>
  );
}
