"use client";

import React, { useState } from "react";

export interface RsvpFormProps {
  coupleNames?: string;
  rsvpStyle?: string;
}

export default function RsvpForm({
  coupleNames = "Elena & Davide",
  rsvpStyle = "classico",
}: RsvpFormProps) {
  const [nome, setNome] = useState("");
  const [presenza, setPresenza] = useState("si");
  const [ospiti, setOspiti] = useState("1");
  const [intolleranze, setIntolleranze] = useState("");
  const [inviato, setInviato] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviato(true);
  };

  if (inviato) {
    return (
      <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2">
        <span className="text-2xl">✨</span>
        <h4 className="font-serif font-bold text-sm text-emerald-900">Grazie {nome}!</h4>
        <p className="text-xs text-emerald-700">La tua risposta per {coupleNames} è stata registrata con successo.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-3 text-center">
      <span className="text-[10px] font-bold text-[#8B6508] uppercase tracking-wider block font-serif">
        ✉️ Conferma Partecipazione RSVP
      </span>

      <div>
        <label className="block text-[10px] font-bold text-slate-600 mb-1 text-left">Nome e Cognome</label>
        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="es. Mario Rossi"
          className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1E293B]"
        />
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setPresenza("si")}
          className={`p-2.5 rounded-xl border transition-all ${
            presenza === "si" ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]" : "bg-white text-slate-600 border-slate-300"
          }`}
        >
          Parteciperò con Gioia
        </button>
        <button
          type="button"
          onClick={() => setPresenza("no")}
          className={`p-2.5 rounded-xl border transition-all ${
            presenza === "no" ? "bg-rose-100 text-rose-800 border-rose-300" : "bg-white text-slate-600 border-slate-300"
          }`}
        >
          Non Potrò Esserci
        </button>
      </div>

      {presenza === "si" && (
        <>
          <div>
            <label className="block text-[10px] font-bold text-slate-600 mb-1 text-left">Numero di Partecipanti</label>
            <select
              value={ospiti}
              onChange={(e) => setOspiti(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1E293B] bg-white"
            >
              <option value="1">Solo Io (1 Persona)</option>
              <option value="2">In Coppia (2 Persone)</option>
              <option value="3">Famiglia (3 Persone)</option>
              <option value="4">Famiglia (4+ Persone)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-600 mb-1 text-left">Intolleranze Alimentari / Allergie</label>
            <input
              type="text"
              value={intolleranze}
              onChange={(e) => setIntolleranze(e.target.value)}
              placeholder="es. Celiaco, Vegetariano, Nessuna..."
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-bold text-[#1E293B]"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        className="w-full py-3 bg-[#1E293B] text-[#D4AF37] font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-md mt-2"
      >
        Invia Conferma RSVP
      </button>
    </form>
  );
}
