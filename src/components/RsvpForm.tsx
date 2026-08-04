"use client";

import React, { useState } from "react";

export interface RsvpFormProps {
  coupleNames?: string;
  paletteColors?: string[];
}

export default function RsvpForm({
  coupleNames = "Elena & Davide",
  paletteColors = ["#FAF7F2", "#FDE68A", "#FCA5A5", "#D4AF37", "#1E293B"],
}: RsvpFormProps) {
  const [nome, setNome] = useState("");
  const [presenza, setPresenza] = useState("si");
  const [ospiti, setOspiti] = useState("1");
  const [intolleranze, setIntolleranze] = useState("");
  const [inviato, setInviato] = useState(false);

  const mainAccent = paletteColors[3] || "#D4AF37";
  const darkText = paletteColors[4] || "#1E293B";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviato(true);
  };

  if (inviato) {
    return (
      <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-3xl text-center space-y-2">
        <span className="text-2xl">✨</span>
        <h4 className="font-serif font-bold text-sm text-emerald-900">Grazie {nome}!</h4>
        <p className="text-xs text-emerald-700">La tua risposta per {coupleNames} è stata registrata con successo.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-5 rounded-3xl border shadow-md space-y-3 text-center transition-colors"
      style={{ backgroundColor: paletteColors[0] || "#FFFFFF", borderColor: mainAccent }}
    >
      <span className="text-xs font-bold uppercase tracking-wider block font-serif" style={{ color: mainAccent }}>
        ✉️ Conferma Partecipazione RSVP
      </span>

      <div>
        <label className="block text-[10px] font-bold mb-1 text-left" style={{ color: darkText }}>Nome e Cognome</label>
        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="es. Mario Rossi"
          className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
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
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
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
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold bg-white"
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
        Invia Conferma RSVP
      </button>
    </form>
  );
}
