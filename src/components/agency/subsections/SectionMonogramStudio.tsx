"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Wand2, Loader2, CheckCircle2, Image as ImageIcon, Maximize2, X, Trash2, Check } from "lucide-react";

export interface SectionMonogramStudioProps {
  coupleNames?: string;
  waterImageUrl?: string;
  handleUpdate: (field: string, value: any) => void;
}

export interface SealRecord {
  id: string;
  name: string;
  url: string;
  isSystem?: boolean;
}

const DEFAULT_SYSTEM_SEALS: SealRecord[] = [
  {
    id: "wax_default",
    name: "Sigillo Ceralacca Standard (L + Cuore)",
    url: "/wax-seal.png",
    isSystem: true,
  },
  {
    id: "logo_default",
    name: "Logo Ufficiale RM Studio 3D",
    url: "/logo.png",
    isSystem: true,
  },
];

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
  
  const [activeSealUrl, setActiveSealUrl] = useState(waterImageUrl || "/wax-seal.png");
  const [savedSeals, setSavedSeals] = useState<SealRecord[]>(DEFAULT_SYSTEM_SEALS);
  const [enlargedSeal, setEnlargedSeal] = useState<SealRecord | null>(null);

  const cleanSlug = coupleNames.toLowerCase().replace(/[^a-z0-9]/g, "-");

  // RIPRISTINO SIGILLI SALVATI DA LOCALSTORAGE
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`love_agency_seals_${cleanSlug}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSavedSeals(parsed);
          }
        }
      } catch (e) {
        // fallback
      }
    }
  }, [cleanSlug]);

  // GENERAZIONE NUOVA CERALACCA CON IA FAL.AI
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
          experience_slug: cleanSlug,
        }),
      });

      const data = await res.json();

      if (data.success && data.monogram_url) {
        const newSeal: SealRecord = {
          id: Date.now().toString(),
          name: `Sigillo 3D (${initials.toUpperCase()}) - ${selectedStyle}`,
          url: data.monogram_url,
          isSystem: false,
        };

        const updatedList = [newSeal, ...savedSeals];
        setSavedSeals(updatedList);
        setActiveSealUrl(data.monogram_url);
        handleUpdate("waterImageUrl", data.monogram_url);

        if (typeof window !== "undefined") {
          localStorage.setItem(`love_agency_seals_${cleanSlug}`, JSON.stringify(updatedList));
        }
      } else {
        alert("Errore durante la generazione del sigillo 3D.");
      }
    } catch (err) {
      alert("Errore di connessione con il server di generazione.");
    } finally {
      setIsGenerating(false);
    }
  };

  // SELEZIONA UN SIGILLO DALLA GALLERIA PER L'INVITO
  const handleSelectSeal = (seal: SealRecord) => {
    setActiveSealUrl(seal.url);
    handleUpdate("waterImageUrl", seal.url);
  };

  // ELIMINA SIGILLO PERSONALIZZATO
  const handleDeleteSeal = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Sei sicuro di voler eliminare questo sigillo dalla galleria?")) {
      const updated = savedSeals.filter((s) => s.id !== id);
      setSavedSeals(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem(`love_agency_seals_${cleanSlug}`, JSON.stringify(updated));
      }
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
        Crea o seleziona il sigillo nuziale in ceralacca 3D. Verrà applicato all&apos;apertura dell&apos;invito digitale e potrà essere stampato sui menu del ristorante.
      </p>

      {/* INIZIALI & GENERAZIONE */}
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
          <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#D4AF37] relative bg-black shrink-0 flex items-center justify-center">
            {activeSealUrl ? (
              <img src={activeSealUrl} alt="Sigillo Attivo" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-6 h-6 text-slate-600" />
            )}
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">Sigillo Attivo nell&apos;Invito:</span>
            <span className="text-xs font-bold text-amber-300 block truncate max-w-[180px]">
              ✓ Sigillo Selezionato
            </span>
          </div>
        </div>
      </div>

      {/* SELEZIONE STILE ARTISTICO */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
          1. Scegli lo Stile della Ceralacca (4 Modelli d&apos;Autore):
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

      {/* PULSANTE GENERAZIONE NUOVO SIGILLO */}
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
            <Wand2 className="w-4 h-4 text-slate-950" />
            Crea Nuovo Sigillo 3D con Iniziali Ora
          </>
        )}
      </button>

      {/* GALLERIA DEI SIGILLI SALVATI & PREDEFINITI CON MODAL INGRANDISCI */}
      <div className="pt-4 border-t border-slate-800 space-y-3">
        <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
          2. Galleria Sigilli Salvati ({savedSeals.length}): Tocca per Scegliere o Ingrandire
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {savedSeals.map((seal) => {
            const isCurrent = activeSealUrl === seal.url;
            return (
              <div
                key={seal.id}
                onClick={() => handleSelectSeal(seal)}
                className={`p-3 bg-slate-950 rounded-2xl border-2 transition-all cursor-pointer relative group text-left space-y-2 flex flex-col justify-between ${
                  isCurrent
                    ? "border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] bg-slate-900"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="w-full aspect-square rounded-xl overflow-hidden relative border border-slate-800 bg-black flex items-center justify-center">
                  <img src={seal.url} alt={seal.name} className="w-full h-full object-contain p-1" />
                  
                  {/* PULSANTE INGRANDISCI A TUTTO SCHERMO */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEnlargedSeal(seal);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-slate-900/80 text-amber-300 rounded-lg hover:bg-slate-800 shadow-md"
                    title="Ingrandisci a Tutto Schermo"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>

                  {!seal.isSystem && (
                    <button
                      type="button"
                      onClick={(e) => handleDeleteSeal(seal.id, e)}
                      className="absolute bottom-2 right-2 p-1.5 bg-rose-600/80 text-white rounded-lg hover:bg-rose-700 shadow-md"
                      title="Elimina Sigillo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-white block truncate leading-tight">{seal.name}</span>
                  {isCurrent ? (
                    <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> In Uso nell&apos;Invito
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold text-[#D4AF37] hover:underline block">
                      ✦ Clicca per Usare
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL INGRANDISCI SIGILLO A TUTTO SCHERMO */}
      {enlargedSeal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border-2 border-[#D4AF37] p-6 rounded-3xl text-center space-y-4 shadow-2xl relative my-auto">
            <button
              type="button"
              onClick={() => setEnlargedSeal(null)}
              className="absolute top-4 right-4 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">
              Anteprima HD Sigillo Ceralacca
            </span>
            <h4 className="text-base font-serif font-bold text-white">{enlargedSeal.name}</h4>

            <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-black p-2 shadow-inner mx-auto">
              <img src={enlargedSeal.url} alt="Sigillo Ingrandito" className="w-full h-full object-contain" />
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  handleSelectSeal(enlargedSeal);
                  setEnlargedSeal(null);
                }}
                className="flex-1 py-3 bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
              >
                ✦ Seleziona ed Usa per l&apos;Invito
              </button>
              <button
                type="button"
                onClick={() => setEnlargedSeal(null)}
                className="px-5 py-3 bg-slate-800 text-slate-300 font-bold text-xs rounded-xl hover:bg-slate-700 cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
