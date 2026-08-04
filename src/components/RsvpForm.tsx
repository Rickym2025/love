"use client";

import React, { useState } from "react";
import Image from "next/image";

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
  const [apertoCeralacca, setApertoCeralacca] = useState(false);

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

  // STILE 2: CERALACCA POP-UP
  if (rsvpStyle === "ceralacca" && !apertoCeralacca) {
    return (
      <div
        onClick={() => setApertoCeralacca(true)}
        className="p-6 bg-[#F5EFE6] rounded-3xl border border-[#D4AF37]/40 text-center shadow-md cursor-pointer transition-all hover:scale-[1.02] space-y-2"
      >
        <span className="text-[10px] font-bold text-[#8B6508] uppercase block tracking-widest">
          Conferma Partecipazione
        </span>
        <div className="relative w-14 h-14 mx-auto my-1 drop-shadow">
          <Image src="/wax-seal.png" alt="Sigillo RSVP" fill className="object-contain" priority />
        </div>
        <span className="text-xs font-bold text-[#1E293B] block font-serif">
          Tocca per confermare la tua presenza
        </span>
      </div>
    );
  }

  // STILE 3: PASTELLO MINIMAL
  if (rsvpStyle === "pastello") {
    return (
      <form onSubmit={handleSubmit} className="p-5 bg-sky-50/90 rounded-3xl border border-sky-200 shadow-sm space-y-3 text-center">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block font-serif">
          ✉️ Conferma Partecipazione RSVP
        </span>

        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Il tuo Nome e Cognome"
          className="w-full p-2.5 rounded-2xl border border-sky-200 text-xs font-bold text-[#1E293B] bg-white"
        />

        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setPresenza("si")}
            className={`p-2.5 rounded-full transition-all ${
              presenza === "si" ? "bg-sky-600 text-white shadow" : "bg-white text-slate-600 border border-sky-200"
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
            className="w-full p-2.5 rounded-2xl border border-sky-200 text-xs font-bold text-[#1E293B] bg-white"
          />
        )}

        <button type="submit" className="w-full py-3 bg-sky-700 text-white font-bold rounded-full text-xs uppercase tracking-wider hover:bg-sky-800 shadow-md">
          Invia Risposta
        </button>
      </form>
    );
  }

  // STILE 1: CLASSICO ELEGANTE (DEFAULT)
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
