"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, MapPin, Store, Heart, Gift } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import EnvelopeWax from "@/components/EnvelopeWax";
import PartingClouds from "@/components/PartingClouds";
import Marquee from "@/components/Marquee";
import PartnerStores from "@/components/PartnerStores";
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

export interface AgencyPreviewProps {
  selectedTemplate?: "A" | "B";
  introStart?: string;
  dateDisplayMode?: string;
  scheduleSchema?: string;
  eventThemePreset?: string;
  customEventTheme?: string;
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
  partnerStores?: any[];
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
  introStart = "arco",
  dateDisplayMode = "countdown",
  scheduleSchema = "classico",
  eventThemePreset = "Luxury Gold & Total White",
  customEventTheme = "",
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
  marqueeText = "✦ Viva gli Sposi! ✦ Auguri di cuore da tutti gli invitati ✦",
  customIban = "IT60 X 05428 11101 000000123456",
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

  const activeTheme = eventThemePreset === "Personalizzato (inserisci a mano)" ? customEventTheme : eventThemePreset;

  const fullscreenDynamicUrl = `/${
    selectedTemplate === "A" ? "elena-e-davide" : "francesca-e-luca"
  }?template=${selectedTemplate}&start=${introStart}&dateMode=${dateDisplayMode}&schedule=${scheduleSchema}&day=${encodeURIComponent(
    weddingDateDay
  )}&month=${encodeURIComponent(weddingDateMonth)}&year=${encodeURIComponent(
    weddingDateYear
  )}&couple=${encodeURIComponent(coupleNames)}&location=${encodeURIComponent(
    locationName
  )}&phrase=${encodeURIComponent(computedWelcomePhrase)}&audio=${encodeURIComponent(
    audioUrl
  )}&palette=${selectedPaletteIdx}`;

  return (
    <div className="w-full h-full p-4 flex flex-col items-center justify-center overflow-y-auto">
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
          selectedTemplate === "B" || introStart === "nuvole"
            ? "bg-[#F0F7FF] text-[#1E293B]"
            : "bg-[#FAF7F2] text-[#1E293B]"
        }`}
      >
        {/* MARQUEE DEDICHE */}
        {modules.dedicheMarquee && (
          <div className="py-1">
            <Marquee text={marqueeText} />
          </div>
        )}

        {/* NUVOLE 3D */}
        {modules.nuvole3d && <PartingClouds />}

        {/* BUSTA CERALACCA ENVELOPEWAX */}
        {modules.busta3d && (
          <div className="p-3 my-2">
            <EnvelopeWax coupleNames={coupleNames} />
          </div>
        )}

        {/* HERO SPOSI */}
        <div className="text-center pt-4 px-4 space-y-1">
          <span className="text-[10px] tracking-widest uppercase font-bold text-[#8B6508]">
            Wedding Celebration • {activeTheme}
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

        {/* MODULO DATA (3 OPZIONI) */}
        {dateDisplayMode === "countdown" && (
          <div className="my-4 mx-3 p-3 bg-white/90 rounded-2xl text-center border border-[#D4AF37]/40 shadow-sm">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block mb-1">
              ⏳ The Celebration Begins In
            </span>
            <div className="flex justify-center gap-3 text-[#1E293B] font-serif font-bold text-sm">
              <div><span className="block text-base text-[#8B6508]">129</span><span className="text-[8px] uppercase text-slate-600 font-sans">Days</span></div>
              <span>:</span>
              <div><span className="block text-base text-[#8B6508]">00</span><span className="text-[8px] uppercase text-slate-600 font-sans">Hours</span></div>
              <span>:</span>
              <div><span className="block text-base text-[#8B6508]">23</span><span className="text-[8px] uppercase text-slate-600 font-sans">Minutes</span></div>
            </div>
          </div>
        )}

        {dateDisplayMode === "scratch" && modules.grattaData && (
          <div className="my-4 mx-3 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-sky-800 uppercase block mb-2">
              🎰 Scratch to reveal the date
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {dateDisplayMode === "text" && (
          <div className="my-4 mx-3 p-4 bg-white rounded-2xl text-center border border-[#D4AF37]/40 shadow-sm">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block mb-1">Data del Matrimonio</span>
            <p className="font-serif font-bold text-xl text-[#1E293B]">{weddingDateDay} {weddingDateMonth} {weddingDateYear}</p>
          </div>
        )}

        {/* SCHEDULE OF EVENTS (PROGRAMMA ORARI IN ITALIANO) */}
        <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-2">
          <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-sm">
            Programma della Giornata
          </span>
          <div className="space-y-1.5 text-xs text-[#1E293B] pt-1 font-serif">
            <p><strong className="text-[#8B6508] font-sans">16:30</strong> — Arrivo e Accoglienza Ospiti</p>
            <p><strong className="text-[#8B6508] font-sans">17:00</strong> — Cerimonia di Nozze</p>
            <p><strong className="text-[#8B6508] font-sans">18:30</strong> — Aperitivo &amp; Cocktail Hour</p>
            <p><strong className="text-[#8B6508] font-sans">20:00</strong> — Cene di Gala &amp; Taglio Torta</p>
            <p><strong className="text-[#8B6508] font-sans">22:00</strong> — Festa &amp; Open Bar</p>
          </div>
        </div>

        {/* LOCATION & MAPPA INTEGRATA */}
        {modules.locationMappa && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-3">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-sm">
              📍 Location del Matrimonio
            </span>
            <p className="font-bold text-xs text-[#1E293B]">{locationName}</p>
            <p className="text-[10px] text-slate-600 font-medium">{locationAddress}</p>

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

        {/* DRESS CODE CON GALLERIA OUTFIT SCORREVOLE */}
        {modules.codiceAbbigliamento && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-sm">
              Dress Code &amp; Palette
            </span>
            <p className="text-[10px] text-slate-700 font-serif leading-relaxed">{dressCodeNotes}</p>

            <div className="flex justify-center gap-1.5 py-1">
              {activePalette.colors.map((c, i) => (
                <div key={i} className="w-5 h-5 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: c }} />
              ))}
            </div>

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

        {/* NEGOZI CONVENZIONATI PARTNERSTORES */}
        {modules.negoziConvenzionati && (
          <div className="p-2">
            <PartnerStores stores={partnerStores} />
          </div>
        )}

        {/* LISTA NOZZE & IBAN */}
        {modules.listaNozzeAmazon && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-sm flex items-center justify-center gap-1">
              <Gift className="w-3.5 h-3.5 text-[#8B6508]" /> Gift Preference &amp; IBAN
            </span>
            <div className="p-2 bg-[#FAF7F2] rounded-xl border border-slate-200 text-[10px] font-mono font-bold text-[#1E293B] break-all">
              {customIban}
            </div>
          </div>
        )}

        {/* RSVP FORM */}
        {modules.confermaRsvp && (
          <div className="p-3">
            <RsvpForm coupleNames={coupleNames} />
          </div>
        )}
      </div>
    </div>
  );
}
