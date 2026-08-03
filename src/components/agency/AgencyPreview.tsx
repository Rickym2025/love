"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, MapPin, Store } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import { DRESS_CODE_PALETTES } from "./AgencyConfigurator";

const DRESS_CODE_PHOTOS: Record<number, string[]> = {
  0: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80",
  ],
  1: [
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=400&q=80",
  ],
  2: [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=400&q=80",
  ],
};

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
  coupleNames = "Elena & Davide",
  weddingDateDay = "15",
  weddingDateMonth = "Settembre",
  weddingDateYear = "2026",
  locationName = "Villa Rosa",
  locationAddress = "Via Roma 1, Roma",
  welcomePhrase,
  selectedPhrasePreset = "0",
  customWelcomePhrase = "",
  dressCodeNotes = "Abiti eleganti nei toni cromatici della palette",
  selectedPaletteIdx = 0,
  partnerStores = [],
  modules = {},
  audioUrl = "",
}: AgencyPreviewProps) {
  const activePalette = DRESS_CODE_PALETTES[selectedPaletteIdx] || DRESS_CODE_PALETTES[0];
  const outfitPhotos = DRESS_CODE_PHOTOS[selectedPaletteIdx % 3] || DRESS_CODE_PHOTOS[0];

  const computedWelcomePhrase =
    welcomePhrase ||
    (selectedPhrasePreset === "9"
      ? customWelcomePhrase
      : WELCOME_PHRASE_PRESETS[Number(selectedPhrasePreset) || 0]) ||
    "Benvenuti al nostro matrimonio";

  const mapQuery = encodeURIComponent((locationAddress || locationName || "Villa Rosa").trim());

  const fullscreenDynamicUrl = `/${
    selectedTemplate === "A" ? "elena-e-davide" : "francesca-e-luca"
  }?template=${selectedTemplate}&day=${encodeURIComponent(
    weddingDateDay
  )}&month=${encodeURIComponent(weddingDateMonth)}&year=${encodeURIComponent(
    weddingDateYear
  )}&couple=${encodeURIComponent(coupleNames)}&location=${encodeURIComponent(
    locationName
  )}&phrase=${encodeURIComponent(computedWelcomePhrase)}&audio=${encodeURIComponent(
    audioUrl
  )}&palette=${selectedPaletteIdx}`;

  return (
    <div className="w-full h-full p-6 flex flex-col items-center justify-center overflow-y-auto">
      {/* TESTATA ANTEPRIMA */}
      <div className="flex justify-between items-center w-full max-w-[340px] mb-3 text-white">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Live Preview Sincronizzata
        </span>
        <Link
          href={fullscreenDynamicUrl}
          target="_blank"
          className="text-[11px] text-[#D4AF37] hover:text-white flex items-center gap-1 font-bold bg-[#FAF7F2]/10 px-2.5 py-1 rounded-lg transition-all"
        >
          Apri Fullscreen ↗
        </Link>
      </div>

      {/* FRAME SMARTPHONE MOCKUP */}
      <div
        className={`w-[340px] h-[600px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto ${
          selectedTemplate === "B"
            ? "bg-[#F0F7FF] text-[#1E293B]"
            : "bg-[#FAF7F2] text-[#1E293B]"
        }`}
      >
        {/* TEMPLATE A: BUSTA AVORIO CON VERA CERALACCA WAX-SEAL.PNG */}
        {selectedTemplate === "A" && modules.busta3d && (
          <div className="p-4 bg-[#F5EFE6] border-b border-[#D4AF37]/30 text-center relative shadow-sm">
            <span className="text-[9px] font-bold text-[#8B6508] uppercase tracking-widest block mb-1">
              ✦ Partecipazione Digitale
            </span>
            <p className="font-serif font-bold text-base text-[#1E293B]">{coupleNames}</p>
            
            {/* Ceralacca wax-seal.png Reale */}
            <div className="relative w-14 h-14 mx-auto my-2 drop-shadow-md">
              <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
            </div>
            
            <span className="text-[9px] uppercase font-bold text-[#8B6508] animate-pulse">
              TAP TO OPEN
            </span>
          </div>
        )}

        {/* TEMPLATE B: BUSTA AZZURRA E LETTERA */}
        {selectedTemplate === "B" && modules.busta3d && (
          <div className="p-4 bg-[#E0F2FE] border-b border-sky-200 text-center relative shadow-sm">
            <span className="text-[9px] font-bold text-sky-800 uppercase tracking-widest block mb-1">
              ✉️ Invito Speciale
            </span>
            <p className="font-serif font-bold text-base text-[#1E293B]">{coupleNames}</p>
            <div className="relative w-12 h-12 mx-auto my-2 drop-shadow-sm">
              <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
            </div>
            <span className="text-[9px] uppercase font-bold text-sky-700 animate-pulse">
              Scorri per scoprire
            </span>
          </div>
        )}

        {/* HERO SPOSI (Testo Oro Scuro/Antracite Nitido e Leggibile) */}
        <div className="text-center pt-6 px-4 space-y-1">
          <span className="text-[10px] tracking-widest uppercase font-bold text-[#8B6508]">
            Wedding Day
          </span>
          <p className="text-xs font-bold text-slate-700">
            {weddingDateDay}.{weddingDateMonth}.{weddingDateYear}
          </p>
          <h3 className="text-2xl font-serif font-bold text-[#1E293B] mt-1 drop-shadow-xs">
            {coupleNames}
          </h3>
          <p className="text-xs italic font-serif text-[#1E293B] opacity-90 px-2 pt-1 font-semibold">
            &quot;{computedWelcomePhrase}&quot;
          </p>
          <p className="text-xs font-bold text-[#8B6508] uppercase pt-1">{locationName}</p>
        </div>

        {/* TEMPLATE A: COUNTDOWN TIMER REALE */}
        {selectedTemplate === "A" && (
          <div className="my-4 mx-3 p-3 bg-white/90 rounded-2xl text-center border border-[#D4AF37]/40 shadow-sm">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block mb-1">
              The Celebration Begins In
            </span>
            <div className="flex justify-center gap-3 text-[#1E293B] font-serif font-bold text-sm">
              <div><span className="block text-base text-[#8B6508]">129</span><span className="text-[8px] uppercase text-slate-600 font-sans">Days</span></div>
              <span>:</span>
              <div><span className="block text-base text-[#8B6508]">00</span><span className="text-[8px] uppercase text-slate-600 font-sans">Hours</span></div>
              <span>:</span>
              <div><span className="block text-base text-[#8B6508]">23</span><span className="text-[8px] uppercase text-slate-600 font-sans">Minutes</span></div>
              <span>:</span>
              <div><span className="block text-base text-[#8B6508]">17</span><span className="text-[8px] uppercase text-slate-600 font-sans">Seconds</span></div>
            </div>
          </div>
        )}

        {/* TEMPLATE B: 3 GRATTABILI DATA */}
        {selectedTemplate === "B" && modules.grattaData && (
          <div className="my-4 mx-3 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-sky-800 uppercase block mb-2">
              🎰 Scratch to reveal the date
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {/* TEMPLATE A: GRATTABILE DATA */}
        {selectedTemplate === "A" && modules.grattaData && (
          <div className="my-4 mx-3 p-4 bg-white rounded-2xl text-center border border-[#D4AF37]/30 shadow-sm">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block mb-2">
              ✦ Gratta e scopri la data ✦
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {/* PROGRAMMA DELLA GIORNATA (SCHEDULE OF EVENTS) */}
        <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-2">
          <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-sm">
            Schedule of Events
          </span>
          <div className="space-y-1.5 text-xs text-[#1E293B] pt-1 font-serif">
            <p><strong className="text-[#8B6508] font-sans">5 PM</strong> — Guest Arrival</p>
            <p><strong className="text-[#8B6508] font-sans">6 PM</strong> — Nikkah Ceremony</p>
            <p><strong className="text-[#8B6508] font-sans">7 PM</strong> — Mocktail Hour</p>
            <p><strong className="text-[#8B6508] font-sans">8 PM</strong> — Dinner</p>
            <p><strong className="text-[#8B6508] font-sans">9 PM</strong> — Dance &amp; Party</p>
          </div>
        </div>

        {/* LOCATION CON MAPPA INTEGRATA + PULSANTE GOOGLE MAPS */}
        {modules.locationMappa && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-3">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-sm">
              Location &amp; Indicazioni
            </span>
            <p className="font-bold text-xs text-[#1E293B]">{locationName}</p>
            <p className="text-[10px] text-slate-600 font-medium">{locationAddress}</p>

            {/* MAPPA INTERATTIVA INTEGRATA DENTRO L'APP */}
            <div className="w-full h-36 rounded-xl overflow-hidden border border-slate-200 relative shadow-inner">
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

            {/* PULSANTE ESTERNO GOOGLE MAPS */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#1E293B] text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Open in Maps ↗
            </a>
          </div>
        )}

        {/* DRESS CODE CON GALLERIA OUTFIT SCORREVOLE (REPLICATA DA FOTO) */}
        {modules.codiceAbbigliamento && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-sm">
              Dress Code &amp; Palette
            </span>
            <p className="text-[10px] text-slate-700 font-serif leading-relaxed">{dressCodeNotes}</p>

            {/* CERCHI PALETTE CROMATICA */}
            <div className="flex justify-center gap-1.5 py-1">
              {activePalette.colors.map((c, i) => (
                <div
                  key={i}
                  className="w-5 h-5 rounded-full border border-slate-300 shadow-sm"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* GALLERIA OUTFIT SCORREVOLE ORIZZONTALE (scroll ➔) */}
            <div className="pt-2">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">
                Outfit Inspiration (scroll ➔)
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
                {outfitPhotos.map((imgUrl, idx) => (
                  <div key={idx} className="w-24 h-32 flex-shrink-0 rounded-xl overflow-hidden relative shadow-sm border border-slate-200 snap-center">
                    <Image src={imgUrl} alt={`Outfit ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NEGOZI CONVENZIONATI */}
        {modules.negoziConvenzionati && partnerStores && partnerStores.length > 0 && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-xs shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block mb-1 font-serif text-sm">
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

        {/* CONFERMA PARTECIPAZIONE RSVP CON WAX-SEAL */}
        {modules.confermaRsvp && (
          <div className="p-3">
            <RsvpForm coupleNames={coupleNames} />
          </div>
        )}
      </div>
    </div>
  );
}
