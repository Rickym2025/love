"use client";

import React, { useState } from "react";
import { Sparkles, Wand2, Loader2, CheckCircle2, Image as ImageIcon } from "lucide-react";

export interface SectionMonogramStudioProps {
  coupleNames?: string;
  waterImageUrl?: string;
  handleUpdate: (field: string, value: any) => void;
}

const MONOGRAM_STYLES = [
  { id: "gold_luxury", name: "👑 Gold Luxury & Champagne", desc: "Sigillo d'avorio con lettere in foglia d'oro e cornice di foglie" },
  { id: "botanical_salvia", name: "🌿 Botanical Salvia & Olivo", desc: "Ceralacca verde salvia con lettere oro e rametti d'olivo" },
  { id: "royal_crest", name: "🍷 Royal Crest Bordeaux", desc: "Sigillo bordeaux con stemma araldico e lettere incise in oro" },
  { id: "minimal_modern", name: "✨ Minimal Modern Total White", desc: "Ceralacca bianca moderna con monogramma geometrico dorato" },
];

export function SectionMonogramStudio({
  coupleNames = "Elena & Davide",
  waterImageUrl = "",
  handleUpdate,
}: SectionMonogramStudioProps) {
  const [initials, setInitials] = useState("E & D");
  const [selectedStyle, setSelectedStyle] = useState("gold_luxury");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState(waterImageUrl || "");

  const handleGenerateMonogram = async () => {
    if (!initials.trim()) return alert("Inserisci le iniziali per la ceralacca.");

    setIsGenerating(true);

    try {
      const res = await fetch("https://n8n.rmstudio.app/webhook/love-monogram-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          initials: initials.trim(),
          style: selectedStyle,
          experience_slug: coupleNames.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        }),
      });

      const data = await res.json();

      if (data.success && data.monogram_url) {
        setGeneratedUrl(data.monogram_url);
        // Applica l'immagine generata alla ceralacca del matrimonio
        handleUpdate("waterImageUrl", data.monogram_url);
      } else {
        alert("Errore nella generazione con Fal.ai.");
      }
    } catch (err) {
      alert("Errore di connessione con il server Fal.ai.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-5 text-left">
      <div className="flex justify-between items-center border-b border-slate-700/80 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-[#D4AF37]" /> Monogram Studio AI (Ceralacca 3D con Fal.ai)
        </h3>
        <span className="text-[10px] bg-[#D4AF37] text-slate-950 font-bold px-2.5 py-1 rounded-full">
          Generatore Fal.ai 2K
        </span>
      </div>

      <p className="text-xs text-slate-300 font-serif leading-relaxed">
        Crea un logo nuziale unico al mondo per gli sposi. L&apos;IA interrogherà **Fal.ai Nano Banana Pro** per incidere le loro iniziali sulla ceralacca 3D dell&apos;invito.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* INIZIALI SPOSI */}
        <div>
          <label className="block text-xs font-bold text-[#D4AF37] mb-1">
            Iniziali degli Sposi (es. E &amp; D o M + S)
          </label>
          <input
            type="text"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            className="w-full text-sm p-3 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono font-bold focus:border-[#D4AF37] outline-none"
            placeholder="E & D"
          />
        </div>

        {/* ANTEPRIMA CERALACCA GENERATA */}
        <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-700">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#D4AF37] relative bg-black shrink-0 flex items-center justify-center">
            {generatedUrl ? (
              <img src={generatedUrl} alt="Ceralacca Generata" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-slate-600" />
            )}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Stato Ceralacca 3D:</span>
            <span className="text-xs font-bold text-amber-300 block">
              {generatedUrl ? "✓ Monogramma Pronta" : "Nessuna Ceralacca AI Generata"}
            </span>
          </div>
        </div>
      </div>

      {/* SELEZIONE STILE CERALACCA */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-bold text-[#D4AF37]">Scegli lo Stile Artistico:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MONOGRAM_STYLES.map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setSelectedStyle(st.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedStyle === st.id
                  ? "border-[#D4AF37] bg-slate-800 shadow-md ring-2 ring-[#D4AF37]"
                  : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
              }`}
            >
              <span className="text-xs font-bold block text-white mb-0.5">{st.name}</span>
              <span className="text-[10px] text-slate-400 block leading-tight">{st.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* PULSANTE GENERAZIONE CON FAL.AI */}
      <button
        type="button"
        disabled={isGenerating}
        onClick={handleGenerateMonogram}
        className="w-full py-3.5 bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generazione Ceralacca 3D con Fal.ai in corso...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-slate-950" />
            Genera Ceralacca 3D con Fal.ai Ora
          </>
        )}
      </button>
    </div>
  );
}
