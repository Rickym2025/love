"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, Users, AlertCircle } from "lucide-react";

export interface RsvpFormProps {
  coupleNames?: string;
  paletteColors?: string[];
  rsvpStyle?: string;
}

export default function RsvpForm({
  coupleNames = "Elena & Davide",
  paletteColors = ["#FAF7F2", "#FFF0F5", "#FDE2E4", "#D4AF37", "#1E293B"],
  rsvpStyle = "classico",
}: RsvpFormProps) {
  const [nome, setNome] = useState("");
  const [presenza, setPresenza] = useState("si");
  const [ospiti, setOspiti] = useState("1");
  const [intolleranze, setIntolleranze] = useState("");
  const [inviato, setInviato] = useState(false);

  const mainAccent = paletteColors?.[3] || "#D4AF37";
  const darkText = paletteColors?.[4] || "#1E293B";
  const bgCard = paletteColors?.[0] || "#FFFFFF";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviato(true);
  };

  if (inviato) {
    return (
      <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-3xl text-center space-y-2">
        <span className="text-3xl">✨</span>
        <h4 className="font-serif font-bold text-base text-emerald-900">Grazie {nome}!</h4>
        <p className="text-xs text-emerald-700">La tua risposta per il matrimonio di {coupleNames} è stata registrata con successo.</p>
      </div>
    );
  }

  // STILE PASTELLO MINIMAL
  if (rsvpStyle === "pastello") {
    return (
      <form onSubmit={handleSubmit} className="p-5 bg-sky-50/90 rounded-3xl border border-sky-200 shadow-sm space-y-3 text-center">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block font-serif">
          Conferma di Partecipazione
        </span>

        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Il tuo Nome e Cognome"
          className="w-full p-2.5 rounded-2xl border border-sky-200 text-xs font-bold text-[#1E293B] bg-white focus:outline-none"
        />

        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setPresenza("si")}
            className={`p-2.5 rounded-full transition-all ${
              presenza === "si" ? "bg-sky-700 text-white shadow" : "bg-white text-slate-600 border border-sky-200"
            }`}
          >
            Parteciperò
          </button>
          <button
            type="button"
            onClick={() => setPresenza("no")}
            className={`p-2.5 rounded-full transition-all ${
              presenza === "no" ? "bg-rose-500 text-white shadow" : "bg-white text-slate-600 border border-sky-200"
            }`}
          >
            Non Ci Sarò
          </button>
        </div>

        {presenza === "si" && (
          <input
            type="text"
            value={intolleranze}
            onChange={(e) => setIntolleranze(e.target.value)}
            placeholder="Intolleranze alimentari / Allergie..."
            className="w-full p-2.5 rounded-2xl border border-sky-200 text-xs font-bold text-[#1E293B] bg-white focus:outline-none"
          />
        )}

        <button type="submit" className="w-full py-3 bg-sky-800 text-white font-bold rounded-full text-xs uppercase tracking-wider hover:bg-sky-900 shadow-md transition-all mt-2">
          Invia Risposta
        </button>
      </form>
    );
  }

  // STILE MODERNO CARD
  if (rsvpStyle === "moderno") {
    return (
      <form onSubmit={handleSubmit} className="p-6 rounded-3xl border shadow-lg space-y-4 text-left transition-colors bg-white" style={{ borderColor: mainAccent }}>
        <div className="text-center space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest block font-serif" style={{ color: mainAccent }}>
            Conferma di Partecipazione
          </span>
          <p className="text-[11px] text-slate-500 font-serif">Facci sapere se sarai dei nostri per festeggiare insieme!</p>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1" style={{ color: darkText }}>Il tuo Nome e Cognome</label>
          <input
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="es. Mario Rossi"
            className="w-full p-3 rounded-2xl border border-slate-300 text-xs font-bold text-[#1E293B] bg-[#FAF7F2] focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-bold" style={{ color: darkText }}>Confermi la tua presenza?</label>
          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setPresenza("si")}
              className="p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all"
              style={{
                backgroundColor: presenza === "si" ? mainAccent : "#FAF7F2",
                color: presenza === "si" ? "#FFFFFF" : darkText,
                borderColor: mainAccent,
              }}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Sì, ci sarò!</span>
            </button>
            <button
              type="button"
              onClick={() => setPresenza("no")}
              className="p-3 rounded-2xl border flex items-center justify-center gap-2 transition-all"
              style={{
                backgroundColor: presenza === "no" ? "#FFE4E6" : "#FAF7F2",
                color: presenza === "no" ? "#9F1239" : darkText,
                borderColor: presenza === "no" ? "#FDA4AF" : "#CBD5E1",
              }}
            >
              <XCircle className="w-4 h-4" />
              <span>Purtroppo no</span>
            </button>
          </div>
        </div>

        {presenza === "si" && (
          <>
            <div>
              <label className="block text-xs font-bold mb-1 flex items-center gap-1.5" style={{ color: darkText }}>
                <Users className="w-3.5 h-3.5" style={{ color: mainAccent }} /> Numero Partecipanti
              </label>
              <select
                value={ospiti}
                onChange={(e) => setOspiti(e.target.value)}
                className="w-full p-2.5 rounded-2xl border border-slate-300 text-xs font-bold bg-[#FAF7F2]"
                style={{ color: darkText }}
              >
                <option value="1">Solo Io (1 Persona)</option>
                <option value="2">In Coppia (2 Persone)</option>
                <option value="3">Famiglia (3 Persone)</option>
                <option value="4">Gruppo (4+ Persone)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1 flex items-center gap-1.5" style={{ color: darkText }}>
                <AlertCircle className="w-3.5 h-3.5" style={{ color: mainAccent }} /> Allergie o Intolleranze
              </label>
              <input
                type="text"
                value={intolleranze}
                onChange={(e) => setIntolleranze(e.target.value)}
                placeholder="es. Celiaco, Lattosio, Crostacei..."
                className="w-full p-2.5 rounded-2xl border border-slate-300 text-xs font-bold bg-[#FAF7F2]"
                style={{ color: darkText }}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full py-3.5 font-bold rounded-2xl text-xs uppercase tracking-wider shadow-md mt-2 transition-all"
          style={{ backgroundColor: darkText, color: mainAccent }}
        >
          Conferma la Partecipazione
        </button>
      </form>
    );
  }

  // STILE CLASSICO ELEGANTE (DEFAULT)
  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-3xl border shadow-md space-y-3 text-center transition-colors"
      style={{ backgroundColor: bgCard, borderColor: mainAccent }}
    >
      <span className="text-xs font-bold uppercase tracking-wider block font-serif" style={{ color: mainAccent }}>
        Conferma di Partecipazione
      </span>

      <div>
        <label className="block text-[10px] font-bold mb-1 text-left" style={{ color: darkText }}>Nome e Cognome</label>
        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="es. Mario Rossi"
          className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none"
          style={{ color: darkText }}
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setPresenza("si")}
          className="p-2.5 rounded-xl border transition-all"
          style={{
            backgroundColor: presenza === "si" ? mainAccent : "#FFFFFF",
            color: presenza === "si" ? "#FFFFFF" : darkText,
            borderColor: mainAccent,
          }}
        >
          Parteciperò con Gioia
        </button>
        <button
          type="button"
          onClick={() => setPresenza("no")}
          className="p-2.5 rounded-xl border transition-all"
          style={{
            backgroundColor: presenza === "no" ? "#FFE4E6" : "#FFFFFF",
            color: presenza === "no" ? "#9F1239" : darkText,
            borderColor: presenza === "no" ? "#FDA4AF" : "#CBD5E1",
          }}
        >
          Non Potrò Esserci
        </button>
      </div>

      {presenza === "si" && (
        <>
          <div>
            <label className="block text-[10px] font-bold mb-1 text-left" style={{ color: darkText }}>Numero di Partecipanti</label>
            <select
              value={ospiti}
              onChange={(e) => setOspiti(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none"
              style={{ color: darkText }}
            >
              <option value="1">Solo Io (1 Persona)</option>
              <option value="2">In Coppia (2 Persone)</option>
              <option value="3">Famiglia (3 Persone)</option>
              <option value="4">Famiglia (4+ Persone)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold mb-1 text-left" style={{ color: darkText }}>Intolleranze Alimentari / Allergie</label>
            <input
              type="text"
              value={intolleranze}
              onChange={(e) => setIntolleranze(e.target.value)}
              placeholder="es. Celiaco, Vegetariano, Nessuna..."
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white focus:outline-none"
              style={{ color: darkText }}
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full py-3 font-bold rounded-xl text-xs uppercase tracking-wider shadow-md mt-2 transition-all"
        style={{ backgroundColor: darkText, color: mainAccent }}
      >
        Invia Conferma Partecipazione
      </button>
    </form>
  );
}
