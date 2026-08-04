"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, MapPin, Gift } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import PartingClouds from "@/components/PartingClouds";
import Marquee from "@/components/Marquee";
import PartnerStores from "@/components/PartnerStores";
import LoveQuiz from "@/components/LoveQuiz";
import { DRESS_CODE_PALETTES, DRESS_CODE_PHOTOS, WELCOME_PHRASE_PRESETS } from "./constants";

export interface AgencyPreviewProps {
  selectedTemplate?: "A" | "B";
  introStart?: string;
  dateDisplayMode?: string;
  scheduleSchema?: string;
  rsvpStyle?: string;
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

export default function AgencyPreview({
  selectedTemplate = "A",
  introStart = "busta",
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
  const outfitPhotos = DRESS_CODE_PHOTOS[selectedPaletteIdx % 8] || DRESS_CODE_PHOTOS[0];
  const [bustaAperta, setBustaAperta] = useState(false);

  const computedWelcomePhrase =
    welcomePhrase ||
    (selectedPhrasePreset === "9"
      ? customWelcomePhrase
      : WELCOME_PHRASE_PRESETS[Number(selectedPhrasePreset) || 0]) ||
    "Benvenuti al nostro matrimonio";

  const mapQuery = encodeURIComponent((locationAddress || locationName || "Villa Rosa").trim());
  const activeTheme = eventThemePreset === "Personalizzato (digita a mano)" ? customEventTheme : eventThemePreset;

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
    <div className="w-full h-full flex flex-col items-center justify-center p-2 select-none">
      {/* TESTATA ANTEPRIMA */}
      <div className="flex justify-between items-center w-full max-w-[340px] mb-2 text-white">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Live Preview Sincronizzata
        </span>
        <Link
          href={fullscreenDynamicUrl}
          target="_blank"
          className="text-[10px] text-[#D4AF37] hover:text-white flex items-center gap-1 font-bold bg-[#FAF7F2]/10 px-2 py-1 rounded-lg transition-all"
        >
          Apri Fullscreen ↗
        </Link>
      </div>

      {/* FRAME SMARTPHONE MOCKUP */}
      <div
        className={`w-[340px] h-[580px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto ${
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

        {/* EFFETTO START MUTUAMENTE ESCLUSIVO (INLINE SCHERMO) */}
        {introStart === "busta" && modules.busta3d && (
          <div
            onClick={() => setBustaAperta(!bustaAperta)}
            className="m-3 p-4 bg-[#F5EFE6] rounded-2xl border border-[#D4AF37]/40 text-center shadow-sm cursor-pointer"
          >
            <span className="text-[9px] font-bold text-[#8B6508] uppercase tracking-widest block mb-1">
              ✦ Partecipazione Digitale
            </span>
            <p className="font-serif font-bold text-sm text-[#1E293B]">{coupleNames}</p>
            <div className="relative w-12 h-12 mx-auto my-2 drop-shadow">
              <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
            </div>
            <span className="text-[9px] uppercase font-bold text-[#8B6508]">
              {bustaAperta ? "Partecipazione Aperta" : "Tocca per Aprire l'Invito"}
            </span>
          </div>
        )}

        {introStart === "nuvole" && modules.nuvole3d && (
          <div className="relative py-2">
            <PartingClouds />
          </div>
        )}

        {/* HERO SPOSI */}
        <div className="text-center pt-4 px-4 space-y-1">
          <span className="text-[10px] tracking-widest uppercase font-bold text-[#8B6508]">
            Matrimonio • {activeTheme}
          </span>
          <p className="text-xs font-bold text-slate-700">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear}
          </p>
          <h3 className="text-2xl font-serif font-bold text-[#1E293B] mt-1">
            {coupleNames}
          </h3>
          <p className="text-xs italic font-serif text-[#1E293B] opacity-90 px-2 pt-1 font-medium">
            &quot;{computedWelcomePhrase}&quot;
          </p>
          <p className="text-xs font-bold text-[#8B6508] uppercase pt-1">{locationName}</p>
        </div>

        {/* MODULO VISUALIZZAZIONE DATA (3 OPZIONI) */}
        {dateDisplayMode === "countdown" && (
          <div className="my-3 mx-3 p-3 bg-white/90 rounded-2xl text-center border border-[#D4AF37]/40 shadow-sm">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block mb-1 font-serif">
              ⏳ Il nostro grande giorno inizia tra
            </span>
            <div className="flex justify-center gap-3 text-[#1E293B] font-serif font-bold text-xs">
              <div><span className="block text-sm text-[#8B6508]">129</span><span className="text-[8px] uppercase text-slate-600 font-sans">Giorni</span></div>
              <span>:</span>
              <div><span className="block text-sm text-[#8B6508]">14</span><span className="text-[8px] uppercase text-slate-600 font-sans">Ore</span></div>
              <span>:</span>
              <div><span className="block text-sm text-[#8B6508]">23</span><span className="text-[8px] uppercase text-slate-600 font-sans">Minuti</span></div>
              <span>:</span>
              <div><span className="block text-sm text-[#8B6508]">17</span><span className="text-[8px] uppercase text-slate-600 font-sans">Secondi</span></div>
            </div>
          </div>
        )}

        {dateDisplayMode === "scratch" && modules.grattaData && (
          <div className="my-3 mx-3 p-3 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block mb-2">
              🎰 Gratta col dito per scoprire la data
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {dateDisplayMode === "text" && (
          <div className="my-3 mx-3 p-3 bg-white rounded-2xl text-center border border-[#D4AF37]/40 shadow-sm">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block mb-1">Data del Matrimonio</span>
            <p className="font-serif font-bold text-lg text-[#1E293B]">{weddingDateDay} {weddingDateMonth} {weddingDateYear}</p>
          </div>
        )}

        {/* PROGRAMMA DELLA GIORNATA (5 SCHEMI IN ITALIANO) */}
        <div className="mx-3 my-3 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-2">
          <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-xs">
            Programma della Giornata ({scheduleSchema})
          </span>
          <div className="space-y-1.5 text-xs text-[#1E293B] pt-1 font-serif">
            <p><strong className="text-[#8B6508] font-sans">16:30</strong> — Arrivo ed Accoglienza Ospiti</p>
            <p><strong className="text-[#8B6508] font-sans">17:00</strong> — Cerimonia di Nozze</p>
            <p><strong className="text-[#8B6508] font-sans">18:30</strong> — Aperitivo &amp; Cocktail Hour</p>
            <p><strong className="text-[#8B6508] font-sans">20:00</strong> — Cena di Gala &amp; Taglio Torta</p>
            <p><strong className="text-[#8B6508] font-sans">22:00</strong> — Festa &amp; Open Bar</p>
          </div>
        </div>

        {/* LOCATION CON MAPPA INTEGRATA */}
        {modules.locationMappa && (
          <div className="mx-3 my-3 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-3">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-xs">
              📍 Location del Matrimonio
            </span>
            <p className="font-bold text-xs text-[#1E293B]">{locationName}</p>
            <p className="text-[10px] text-slate-600 font-medium">{locationAddress}</p>

            <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-200 relative shadow-inner">
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
              className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#1E293B] text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Apri Mappa &amp; Indicazioni ↗
            </a>
          </div>
        )}

        {/* DRESS CODE CON GALLERIA OUTFIT RIGOROSAMENTE COERENTE */}
        {modules.codiceAbbigliamento && (
          <div className="mx-3 my-3 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-xs">
              Dress Code &amp; Palette
            </span>
            <p className="text-[10px] text-slate-700 font-serif">{dressCodeNotes}</p>

            <div className="flex justify-center gap-1.5 py-1">
              {activePalette.colors.map((c, i) => (
                <div key={i} className="w-4 h-4 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: c }} />
              ))}
            </div>

            <div className="pt-1">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">
                Esempi di Abbigliamento Consigliati (Scorri ➔)
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
                {outfitPhotos.map((imgUrl, idx) => (
                  <div key={idx} className="w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden relative shadow-sm border border-slate-200 snap-center">
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

        {/* LISTA NOZZE IBAN */}
        {modules.listaNozzeAmazon && (
          <div className="mx-3 my-3 p-4 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase block font-serif text-xs flex items-center justify-center gap-1">
              <Gift className="w-3.5 h-3.5 text-[#8B6508]" /> Lista Nozze &amp; Coordinate IBAN
            </span>
            <div className="p-2 bg-[#FAF7F2] rounded-xl border border-slate-200 text-[10px] font-mono font-bold text-[#1E293B] break-all">
              {customIban}
            </div>
          </div>
        )}

        {/* MODULO CONFERMA RSVP (DINAMICO SULLA PALETTA COLORI) */}
        {modules.confermaRsvp && (
          <div className="p-3">
            <RsvpForm coupleNames={coupleNames} />
          </div>
        )}

        {/* GIOCHI DELLA FESTA (DOPO IL MODULO RSVP) */}
        {modules.hubGiochiFesta && (
          <div className="mx-3 my-3 p-4 bg-gradient-to-br from-[#1E293B] to-slate-800 text-white rounded-2xl shadow-md text-center space-y-2">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block">
              🎮 Giochi della Festa per gli Invitati
            </span>
            <p className="text-[10px] text-slate-300">
              Partecipa al Quiz della coppia, gioca al Puzzle e scopri la foto speciale!
            </p>
            <div className="pt-1">
              <LoveQuiz />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
