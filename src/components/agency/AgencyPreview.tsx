"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, MapPin, Store } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import { DRESS_CODE_PALETTES } from "./AgencyConfigurator";

export interface PartnerStore {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
}

export interface AgencyPreviewProps {
  selectedTemplate?: "A" | "B";
  selectedColorScheme?: string;
  coupleNames?: string;
  weddingDateDay?: string;
  weddingDateMonth?: string;
  weddingDateYear?: string;
  locationName?: string;
  locationAddress?: string;
  audioUrl?: string;
  waterImageUrl?: string;
  welcomePhrase?: string;
  selectedPhrasePreset?: string;
  customWelcomePhrase?: string;
  dressCodeNotes?: string;
  selectedPaletteIdx?: number;
  partnerStores?: PartnerStore[];
  marqueeText?: string;
  customIban?: string;
  modules?: Record<string, boolean>;
}

const WELCOME_PHRASE_PRESETS = [
  "Due anime, un solo destino. Una storia scritta nel cuore.",
  "L'amore non consiste nello guardarsi l'un l'altro, ma nel guardare insieme nella stessa direzione.",
  "Niente è per caso, ogni passo ci ha condotti qui. Unisciti alla nostra gioia.",
  "Oggi inizia il nostro 'per sempre'. Siete i benvenuti a celebrare con noi.",
  "Due cuori, una sola melodia. Festeggia il nostro giorno speciale!",
  "Con gioia e gratitudine vi invitiamo a condividere l'inizio della nostra vita insieme.",
  "L'amore è la forza che muove l'universo. Benvenuti al nostro matrimonio.",
  "Amore, risate e ricordi indimenticabili: grazie per essere con noi.",
  "Un giorno di festa, una vita d'amore. Benvenuti al giorno più bello.",
  "Personalizzata",
];

export default function AgencyPreview({
  selectedTemplate = "A",
  selectedColorScheme = "1",
  coupleNames = "Elena & Davide",
  weddingDateDay = "15",
  weddingDateMonth = "Settembre",
  weddingDateYear = "2026",
  locationName = "Villa Rosa",
  locationAddress = "Via Roma 1, Roma",
  welcomePhrase,
  selectedPhrasePreset = "0",
  customWelcomePhrase = "",
  dressCodeNotes = "Abiti eleganti nei toni della palette",
  selectedPaletteIdx = 0,
  partnerStores = [],
  modules = {},
  audioUrl = "",
}: AgencyPreviewProps) {
  const activePalette = DRESS_CODE_PALETTES[selectedPaletteIdx] || DRESS_CODE_PALETTES[0];

  const computedWelcomePhrase =
    welcomePhrase ||
    (selectedPhrasePreset === "9"
      ? customWelcomePhrase
      : WELCOME_PHRASE_PRESETS[Number(selectedPhrasePreset) || 0]) ||
    "Benvenuti al nostro matrimonio";

  const mapQuery = encodeURIComponent((locationAddress || locationName || "Villa Rosa").trim());

  const fullscreenDynamicUrl = `/${
    selectedTemplate === "A" ? "elena-e-davide" : "francesca-e-luca"
  }?day=${encodeURIComponent(weddingDateDay)}&month=${encodeURIComponent(
    weddingDateMonth
  )}&year=${encodeURIComponent(weddingDateYear)}&couple=${encodeURIComponent(
    coupleNames
  )}&location=${encodeURIComponent(locationName)}&phrase=${encodeURIComponent(
    computedWelcomePhrase
  )}&audio=${encodeURIComponent(audioUrl)}&palette=${selectedPaletteIdx}`;

  return (
    <div className="flex-1 p-6 bg-[#1E293B] flex flex-col items-center justify-center min-w-[340px] h-screen overflow-y-auto">
      <div className="flex justify-between items-center w-full max-w-[340px] mb-3 text-white">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> VERO Invito Live Sincronizzato
        </span>
        <Link
          href={fullscreenDynamicUrl}
          target="_blank"
          className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 font-bold"
        >
          Apri Fullscreen ↗
        </Link>
      </div>

      {/* MOCKUP SMARTPHONE */}
      <div
        className={`w-[340px] h-[600px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto ${
          selectedTemplate === "B" || selectedColorScheme === "2"
            ? "bg-[#F0F7FF] text-[#1976D2]"
            : "bg-[#FAF7F2] text-[#1E293B]"
        }`}
      >
        {/* BUSTA CERALACCA */}
        {modules.busta3d && (
          <div className="p-4 bg-[#F5EFE6] border-b border-[#D4AF37]/30 text-center relative shadow-sm">
            <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              ✦ Partecipazione Digitale
            </span>
            <p className="font-serif font-bold text-sm text-[#1E293B]">{coupleNames}</p>
            <div className="relative w-12 h-12 mx-auto my-2">
              <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
            </div>
            <span className="text-[9px] uppercase font-bold text-slate-400 animate-pulse">
              Tocca per Aprire
            </span>
          </div>
        )}

        {/* HERO */}
        <div className="text-center pt-6 px-4">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">
            Wedding Day
          </span>
          <p className="text-xs font-bold text-slate-400 mt-0.5">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear}
          </p>
          <h3 className="text-2xl font-serif font-bold mt-1 text-[#1E293B]">{coupleNames}</h3>
          <p className="text-xs italic mt-2 px-2 font-serif opacity-80">
            &quot;{computedWelcomePhrase}&quot;
          </p>
          <p className="text-xs font-bold text-[#D4AF37] mt-2 uppercase">{locationName}</p>
        </div>

        {/* GRATTIAMO LA DATA */}
        {modules.grattaData && (
          <div className="my-4 mx-3 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2">
              🎰 Gratta col Dito per Scoprire la Data
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {/* LOCATION CON MAPPA INTEGRATA + PULSANTE MAPS */}
        {modules.locationMappa && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-3">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase block">
              📍 Location &amp; Indicazioni Stradali
            </span>
            <p className="font-bold text-xs text-[#1E293B]">{locationName}</p>
            <p className="text-[10px] text-slate-500">{locationAddress}</p>

            {/* MAPPA INTERATTIVA INTEGRATA DENTRO L'APP */}
            <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-200 my-2 relative">
              <iframe
                title="Mappa Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

            {/* PULSANTE ESTERNO PER GOOGLE MAPS */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#1E293B] text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#D4AF37]" /> Indicazioni Stradali su Google Maps ↗
            </a>
          </div>
        )}

        {/* DRESS CODE */}
        {modules.codiceAbbigliamento && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">
              Dress Code &amp; Palette
            </span>
            <p className="text-[10px] text-slate-500 mb-2">{dressCodeNotes}</p>
            <div className="flex justify-center gap-1.5">
              {activePalette.colors.map((c, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-slate-300 shadow-sm"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        )}

        {/* NEGOZI CONVENZIONATI */}
        {modules.negoziConvenzionati && partnerStores && partnerStores.length > 0 && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-xs shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">
              🏪 Negozi Convenzionati
            </span>
            {partnerStores.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-[#FAF7F2] rounded-xl text-[10px] font-bold text-[#1E293B] flex items-center gap-2 border border-slate-200 hover:border-[#D4AF37]"
              >
                <Store className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span className="truncate">{s.name} ↗</span>
              </a>
            ))}
          </div>
        )}

        {/* RSVP */}
        {modules.confermaRsvp && (
          <div className="p-3">
            <RsvpForm coupleNames={coupleNames} />
          </div>
        )}
      </div>
    </div>
  );
}
