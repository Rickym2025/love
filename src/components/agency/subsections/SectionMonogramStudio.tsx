"use client";

import React, { useState } from "react";
import { Sparkles, Wand2, Loader2, CheckCircle2, Image as ImageIcon } from "lucide-react";

export interface SectionMonogramStudioProps {
  coupleNames?: string;
  waterImageUrl?: string;
  handleUpdate: (field: string, value: any) => void;
}

const SIGILLO_STYLES = [
  {
    id: "gold_luxury",
    name: "👑 Oro Lusso & Champagne",
    desc: "Sigillo d'avorio con lettere in foglia d'oro 3D e cornice di foglie d'alloro",
    previewUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "botanical_salvia",
    name: "🌿 Verde Salvia & Olivo",
    desc: "Ceralacca verde salvia con iniziali oro e rametti d'olivo in rilievo",
    previewUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "royal_crest",
    name: "🍷 Rosso Bordeaux Araldico",
    desc: "Sigillo bordeaux con stemma nobiliare e iniziali incise in oro bruciato",
    previewUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "minimal_modern",
    name: "✨ Bianco Moderno Minimal",
    desc: "Ceralacca bianca con monogramma geometrico dorato ad alto contrasto",
    previewUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=400&q=80",
  },
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
    if (!initials.trim()) return alert("Inserisci le iniziali per il sigillo.");

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
        handleUpdate("waterImageUrl", data.monogram_url);
      } else {
        alert("Errore durante la generazione del sigillo 3D.");
      }
    } catch (err) {
      alert("Errore di connessione con il server di generazione.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-6 text-left">
      <div className="flex justify-between items-center border-b border-slate-700/80 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Ceralacca 3D &amp; Iniziali d&apos;Autore
          </span>
          <h3 className="text-lg font-serif font-bold text-white">
            Sigillo Personalizzato per {coupleNames}
          </h3>
        </div>
        <span className="text-[10px] bg-[#D4AF37] text-slate-950 font-bold px-3 py-1 rounded-full uppercase">
          Grafica 3D ad Alta Risoluzione
        </span>
      </div>

      <p className="text-xs text-slate-300 font-serif leading-relaxed">
        Crea il sigillo nuziale in ceralacca 3D con le iniziali intrecciate degli sposi. Verrà applicato all&apos;apertura dell&apos;invito digitale e potrà essere stampato sui menu del ristorante.
      </p>

      {/* CAMPO INIZIALI & ANTEPRIMA SIGILLO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800 items-center">
        <div>
          <label className="block text-xs font-bold text-[#D4AF37] mb-1.5">
            Iniziali degli Sposi (es. E &amp; D o M + S)
          </label>
          <input
            type="text"
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
            className="w-full text-sm p-3.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-serif font-bold focus:border-[#D4AF37] outline-none"
            placeholder="E & D"
          />
        </div>

        <div className="flex items-center gap-3 bg-slate-900 p-3 rounded-xl border border-slate-700">
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#D4AF37] relative bg-black shrink-0 flex items-center justify-center shadow-md">
            {generatedUrl ? (
              <img src={generatedUrl} alt="Sigillo Generato" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-slate-600" />
            )}
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Sigillo 3D Attivo:</span>
            <span className="text-xs font-bold text-amber-300 block">
              {generatedUrl ? "✓ Sigillo Personalizzato Pronto" : "Sigillo Predefinito d'Archivio"}
            </span>
          </div>
        </div>
      </div>

      {/* SCHEDE VISIVE DI ESEMPIO DEGLI STILI */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
          Scegli lo Stile della Ceralacca (4 Modelli d&apos;Autore):
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SIGILLO_STYLES.map((st) => {
            const isSelected = selectedStyle === st.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStyle(st.id)}
                className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? "border-[#D4AF37] bg-slate-800/90 shadow-xl ring-2 ring-[#D4AF37]"
                    : "border-slate-800 bg-slate-950 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-700 shrink-0 relative">
                  <img src={st.previewUrl} alt={st.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-xs font-bold block text-white mb-0.5">{st.name}</span>
                  <span className="text-[10px] text-slate-400 block leading-tight">{st.desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* PULSANTE GENERAZIONE */}
      <button
        type="button"
        disabled={isGenerating}
        onClick={handleGenerateMonogram}
        className="w-full py-4 bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Incisione Ceralacca 3D in corso...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-slate-950" />
            Crea Sigillo 3D con Iniziali Ora
          </>
        )}
      </button>
    </div>
  );
}
