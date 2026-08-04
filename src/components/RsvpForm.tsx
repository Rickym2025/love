"use client";

import React, { useState } from "react";

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

  return (
    <form
      onSubmit={handleSubmit}
      className={`p-6 rounded-3xl border shadow-md space-y-4 text-center transition-all ${
        rsvpStyle === "pastello" ? "bg-sky-50/90 border-sky-200" : "bg-white"
      }`}
      style={
        rsvpStyle === "pastello"
          ? {}
          : { backgroundColor: bgCard, borderColor: mainAccent }
      }
    >
      <span
        className="text-xs font-bold uppercase tracking-wider block font-serif"
        style={{ color: rsvpStyle === "pastello" ? "#075985" : mainAccent }}
      >
        Conferma di Partecipazione
      </span>

      {rsvpStyle === "moderno" && (
        <p className="text-[11px] text-slate-500 font-serif -mt-2">
          Facci sapere se sarai dei nostri per festeggiare insieme!
        </p>
      )}

      {/* CAMPO NOME */}
      <div className="text-left">
        <label
          className="block text-[10px] font-bold mb-1"
          style={{ color: rsvpStyle === "pastello" ? "#075985" : darkText }}
        >
          Il tuo Nome e Cognome
        </label>
        <input
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="es. Mario Rossi"
          className={`w-full p-3 rounded-2xl border text-xs font-bold focus:outline-none ${
            rsvpStyle === "pastello"
              ? "border-sky-200 bg-white text-[#1E293B]"
              : "border-slate-300 bg-white"
          }`}
          style={rsvpStyle === "pastello" ? {} : { color: darkText }}
        />
      </div>

      {/* SELEZIONE PRESENZA */}
      <div className="space-y-1">
        <label
          className="block text-[10px] font-bold text-left mb-1"
          style={{ color: rsvpStyle === "pastello" ? "#075985" : darkText }}
        >
          Confermi la tua presenza?
        </label>
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <button
            type="button"
            onClick={() => setPresenza("si")}
            className={`p-3 transition-all ${
              rsvpStyle === "pastello" ? "rounded-full" : "rounded-xl border"
            }`}
            style={
              rsvpStyle === "pastello"
                ? {
                    backgroundColor: presenza === "si" ? "#0369A1" : "#FFFFFF",
                    color: presenza === "si" ? "#FFFFFF" : "#334155",
                    border: "1px solid #BAE6FD",
                  }
                : {
                    backgroundColor: presenza === "si" ? mainAccent : "#FFFFFF",
                    color: presenza === "si" ? "#FFFFFF" : darkText,
                    borderColor: mainAccent,
                  }
            }
          >
            {presenza === "si" ? "✓ " : ""}Parteciperò con Gioia
          </button>

          <button
            type="button"
            onClick={() => setPresenza("no")}
            className={`p-3 transition-all ${
              rsvpStyle === "pastello" ? "rounded-full" : "rounded-xl border"
            }`}
            style={
              rsvpStyle === "pastello"
                ? {
                    backgroundColor: presenza === "no" ? "#F43F5E" : "#FFFFFF",
                    color: presenza === "no" ? "#FFFFFF" : "#334155",
                    border: "1px solid #BAE6FD",
                  }
                : {
                    backgroundColor: presenza === "no" ? "#FFE4E6" : "#FFFFFF",
                    color: presenza === "no" ? "#9F1239" : darkText,
                    borderColor: presenza === "no" ? "#FDA4AF" : "#CBD5E1",
                  }
            }
          >
            {presenza === "no" ? "✗ " : ""}Non Potrò Esserci
          </button>
        </div>
      </div>

      {/* CAMPI EXTRA SE PRESENTE */}
      {presenza === "si" && (
        <div className="space-y-3 pt-1 text-left">
          <div>
            <label
              className="block text-[10px] font-bold mb-1"
              style={{ color: rsvpStyle === "pastello" ? "#075985" : darkText }}
            >
              Numero di Partecipanti
            </label>
            <select
              value={ospiti}
              onChange={(e) => setOspiti(e.target.value)}
              className="w-full p-2.5 rounded-2xl border border-slate-300 text-xs font-bold bg-white focus:outline-none"
              style={{ color: darkText }}
            >
              <option value="1">Solo Io (1 Persona)</option>
              <option value="2">In Coppia (2 Persone)</option>
              <option value="3">Famiglia (3 Persone)</option>
              <option value="4">Famiglia (4+ Persone)</option>
            </select>
          </div>

          <div>
            <label
              className="block text-[10px] font-bold mb-1"
              style={{ color: rsvpStyle === "pastello" ? "#075985" : darkText }}
            >
              Intolleranze Alimentari / Allergie
            </label>
            <input
              type="text"
              value={intolleranze}
              onChange={(e) => setIntolleranze(e.target.value)}
              placeholder="es. Celiaco, Vegetariano, Lattosio..."
              className="w-full p-2.5 rounded-2xl border border-slate-300 text-xs font-bold bg-white focus:outline-none"
              style={{ color: darkText }}
            />
          </div>
        </div>
      )}

      {/* PULSANTE SUBMIT */}
      <button
        type="submit"
        className={`w-full py-3.5 font-bold text-xs uppercase tracking-wider shadow-md mt-2 transition-all ${
          rsvpStyle === "pastello" ? "rounded-full bg-sky-800 text-white" : "rounded-2xl"
        }`}
        style={
          rsvpStyle === "pastello"
            ? {}
            : { backgroundColor: darkText, color: mainAccent }
        }
      >
        Invia Conferma Partecipazione
      </button>
    </form>
  );
}
