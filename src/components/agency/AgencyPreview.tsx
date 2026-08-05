"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, MapPin, Gift } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import PartingClouds from "@/components/PartingClouds";
import Marquee from "@/components/Marquee";
import PartnerStores from "@/components/PartnerStores";
import LoveQuiz from "@/components/LoveQuiz";
import AudioPlayer from "@/components/AudioPlayer";
import EnvelopeWax from "@/components/EnvelopeWax";
import WaterRippleImage from "@/components/ui/water-ripple-image";
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
  introStart = "arco",
  dateDisplayMode = "countdown",
  scheduleSchema = "classico",
  rsvpStyle = "classico",
  eventThemePreset = "Luxury Gold & Total White",
  customEventTheme = "",
  coupleNames = "Elena & Davide",
  weddingDateDay = "15",
  weddingDateMonth = "Settembre",
  weddingDateYear = "2026",
  locationName = "Villa Rosa",
  locationAddress = "Via Roma 1, Roma",
  audioUrl = "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3",
  waterImageUrl = "",
  welcomePhrase,
  selectedPhrasePreset = "0",
  customWelcomePhrase = "",
  dressCodeNotes = "Abiti eleganti nei toni cromatici della palette",
  selectedPaletteIdx = 0,
  partnerStores = [],
  marqueeText,
  customIban = "IT60 X 05428 11101 000000123456",
  modules = {},
}: AgencyPreviewProps) {
  // GESTIONE ROBUSTA E DIFENSIVA DELLE PALETTE
  const palettesList = Array.isArray(DRESS_CODE_PALETTES)
    ? DRESS_CODE_PALETTES
    : typeof DRESS_CODE_PALETTES === "object" && DRESS_CODE_PALETTES !== null
    ? Object.values(DRESS_CODE_PALETTES)
    : [];

  const fallbackPalette = {
    id: "1",
    name: "Lavanda & Lillà",
    colors: ["#FAF7F2", "#F3E8FF", "#E9D5FF", "#8B5CF6", "#3B0764"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
  };

  const safeIdx = Math.max(0, Math.min(selectedPaletteIdx || 0, Math.max(0, (palettesList.length || 1) - 1)));
  const activePalette = (palettesList && palettesList[safeIdx]) || fallbackPalette;

  // SICUREZZA TOTALE SU ARRAY COLORI
  const colors = Array.isArray(activePalette?.colors) && activePalette.colors.length >= 3
    ? activePalette.colors
    : ["#FAF7F2", "#FFFFFF", "#E6C687", "#8B5CF6", "#3B0764"];

  const bgMain = colors[0] || "#FAF7F2";
  const bgCard = colors[1] || "#FFFFFF";
  const borderCard = colors[2] || "#E6C687";

  const textColor = (activePalette as any)?.textColor || "#1E293B";
  const accentColor = (activePalette as any)?.accentColor || "#8B6508";

  // SELEZIONE FOTO RIGOROSA E SICURA
  const photosMap = DRESS_CODE_PHOTOS || {};
  const outfitPhotos: string[] =
    Array.isArray((activePalette as any)?.images) && (activePalette as any).images.length > 0
      ? (activePalette as any).images
      : photosMap[safeIdx] || photosMap[safeIdx % 8] || photosMap[0] || [
          "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80",
          "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80"
        ];

  const presetsArray = Array.isArray(WELCOME_PHRASE_PRESETS) ? WELCOME_PHRASE_PRESETS : [];
  const computedWelcomePhrase =
    welcomePhrase ||
    (selectedPhrasePreset === "9"
      ? customWelcomePhrase
      : presetsArray[Number(selectedPhrasePreset) || 0]) ||
    "Benvenuti al nostro matrimonio";

  const mapQuery = encodeURIComponent((locationAddress || locationName || "Villa Rosa").trim());
  const activeTheme = eventThemePreset === "Personalizzato (digita a mano)" ? customEventTheme : eventThemePreset;

  const fullscreenDynamicUrl = `/${
    selectedTemplate === "A" ? "elena-e-davide" : "francesca-e-luca"
  }?template=${selectedTemplate}&start=${introStart}&dateMode=${dateDisplayMode}&schedule=${scheduleSchema}&rsvpStyle=${rsvpStyle}&day=${encodeURIComponent(
    weddingDateDay
  )}&month=${encodeURIComponent(weddingDateMonth)}&year=${encodeURIComponent(
    weddingDateYear
  )}&couple=${encodeURIComponent(coupleNames)}&location=${encodeURIComponent(
    locationName
  )}&phrase=${encodeURIComponent(computedWelcomePhrase)}&audio=${encodeURIComponent(
    audioUrl
  )}&palette=${safeIdx}`;

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
        className="w-[340px] h-[580px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto transition-colors space-y-4 pb-6"
        style={{ backgroundColor: bgMain, color: textColor }}
      >
        {/* PLAYER AUDIO PERSISTENTE */}
        {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

        {/* MARQUEE NOMI SPOSI */}
        {modules.dedicheMarquee && (
          <div className="py-1">
            <Marquee text={marqueeText} coupleNames={coupleNames} />
          </div>
        )}

        {/* EFFETTI START */}
        {introStart === "busta" && modules.busta3d && (
          <div className="p-2">
            <EnvelopeWax coupleNames={coupleNames} inline={true} />
          </div>
        )}

        {introStart === "nuvole" && modules.nuvole3d && (
          <div className="relative py-1">
            <PartingClouds inline={true} />
          </div>
        )}

        {introStart === "lago" && (
          <div className="relative w-full h-36 overflow-hidden border-b border-sky-300">
            <WaterRippleImage src={waterImageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-12 h-12 drop-shadow-lg">
                <Image src="/wax-seal.png" alt="Sigillo Acqua" fill className="object-contain" priority unoptimized />
              </div>
            </div>
          </div>
        )}

        {/* HERO SPOSI */}
        <div className="text-center pt-3 px-4 space-y-1">
          <span className="text-[10px] tracking-widest uppercase font-bold" style={{ color: accentColor }}>
            Il Matrimonio di {coupleNames} • {activeTheme}
          </span>
          <p className="text-xs font-bold" style={{ color: textColor }}>
            {weddingDateDay} {weddingDateMonth} {weddingDateYear}
          </p>
          <h3 className="text-2xl font-serif font-bold mt-1" style={{ color: textColor }}>
            {coupleNames}
          </h3>
          <p className="text-xs italic font-serif opacity-90 px-2 pt-1 font-medium" style={{ color: textColor }}>
            &quot;{computedWelcomePhrase}&quot;
          </p>
          <p className="text-xs font-bold uppercase pt-1" style={{ color: accentColor }}>{locationName}</p>
        </div>

        {/* MODULO DATA */}
        {dateDisplayMode === "countdown" && (
          <div className="my-3 mx-3 p-3 rounded-2xl text-center border shadow-sm" style={{ backgroundColor: bgCard, borderColor: borderCard }}>
            <span className="text-[10px] font-bold uppercase block mb-1 font-serif" style={{ color: accentColor }}>
              ⏳ Il nostro grande giorno inizia tra
            </span>
            <div className="flex justify-center gap-3 font-serif font-bold text-xs" style={{ color: textColor }}>
              <div><span className="block text-sm" style={{ color: accentColor }}>129</span><span className="text-[8px] uppercase text-slate-600 font-sans">Giorni</span></div>
              <span>:</span>
              <div><span className="block text-sm" style={{ color: accentColor }}>14</span><span className="text-[8px] uppercase text-slate-600 font-sans">Ore</span></div>
              <span>:</span>
              <div><span className="block text-sm" style={{ color: accentColor }}>23</span><span className="text-[8px] uppercase text-slate-600 font-sans">Minuti</span></div>
              <span>:</span>
              <div><span className="block text-sm" style={{ color: accentColor }}>17</span><span className="text-[8px] uppercase text-slate-600 font-sans">Secondi</span></div>
            </div>
          </div>
        )}

        {dateDisplayMode === "scratch" && modules.grattaData && (
          <div className="my-3 mx-3 p-3 rounded-2xl text-center border shadow-sm bg-white border-slate-200">
            <span className="text-[10px] font-bold uppercase block mb-2" style={{ color: accentColor }}>
              🎰 Gratta col dito per scoprire la data
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {dateDisplayMode === "text" && (
          <div className="my-3 mx-3 p-3 rounded-2xl text-center border shadow-sm bg-white border-[#D4AF37]/40">
            <span className="text-[10px] font-bold uppercase block mb-1" style={{ color: accentColor }}>Data del Matrimonio</span>
            <p className="font-serif font-bold text-lg" style={{ color: textColor }}>{weddingDateDay} {weddingDateMonth} {weddingDateYear}</p>
          </div>
        )}

        {/* PROGRAMMA DELLA GIORNATA */}
        {scheduleSchema === "classico" && (
          <div className="mx-3 my-3 p-4 rounded-2xl border text-center shadow-sm space-y-2 bg-white border-slate-200">
            <span className="text-[10px] font-bold uppercase block font-serif text-xs" style={{ color: accentColor }}>
              Programma della Giornata
            </span>
            <div className="space-y-1.5 text-xs pt-1 font-serif" style={{ color: textColor }}>
              <p><strong className="font-sans" style={{ color: accentColor }}>16:30</strong> — Arrivo ed Accoglienza Ospiti</p>
              <p><strong className="font-sans" style={{ color: accentColor }}>17:00</strong> — Cerimonia di Nozze</p>
              <p><strong className="font-sans" style={{ color: accentColor }}>18:30</strong> — Aperitivo &amp; Cocktail Hour</p>
              <p><strong className="font-sans" style={{ color: accentColor }}>20:00</strong> — Cena di Gala &amp; Taglio Torta</p>
              <p><strong className="font-sans" style={{ color: accentColor }}>22:00</strong> — Festa &amp; Open Bar</p>
            </div>
          </div>
        )}

        {scheduleSchema === "timeline" && (
          <div className="mx-3 my-3 p-4 rounded-2xl border text-center shadow-sm space-y-2 bg-white border-slate-200">
            <span className="text-[10px] font-bold uppercase block font-serif text-xs mb-2" style={{ color: accentColor }}>
              📍 Timeline Verticale Orari
            </span>
            <div className="relative pl-6 space-y-2 text-left border-l-2 text-xs" style={{ borderColor: accentColor, color: textColor }}>
              <div><span className="font-bold" style={{ color: accentColor }}>16:30</span> — Accoglienza Ospiti</div>
              <div><span className="font-bold" style={{ color: accentColor }}>17:00</span> — Cerimonia Solenne</div>
              <div><span className="font-bold" style={{ color: accentColor }}>18:30</span> — Aperitivo in Giardino</div>
              <div><span className="font-bold" style={{ color: accentColor }}>20:00</span> — Cena &amp; Torta</div>
            </div>
          </div>
        )}

        {scheduleSchema === "schede" && (
          <div className="mx-3 my-3 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl border font-bold bg-white border-slate-200" style={{ color: textColor }}>
              <span className="block text-[10px]" style={{ color: accentColor }}>16:30</span> Accoglienza
            </div>
            <div className="p-2.5 rounded-xl border font-bold bg-white border-slate-200" style={{ color: textColor }}>
              <span className="block text-[10px]" style={{ color: accentColor }}>17:00</span> Cerimonia
            </div>
            <div className="p-2.5 rounded-xl border font-bold bg-white border-slate-200" style={{ color: textColor }}>
              <span className="block text-[10px]" style={{ color: accentColor }}>18:30</span> Aperitivo
            </div>
            <div className="p-2.5 rounded-xl border font-bold bg-white border-slate-200" style={{ color: textColor }}>
              <span className="block text-[10px]" style={{ color: accentColor }}>20:00</span> Cena &amp; Torta
            </div>
          </div>
        )}

        {scheduleSchema === "minimal" && (
          <div className="mx-3 my-3 p-3 text-center space-y-1 font-serif text-xs" style={{ color: textColor }}>
            <p>16:30 • Accoglienza Ospiti</p>
            <p>17:00 • Cerimonia di Nozze</p>
            <p>18:30 • Aperitivo</p>
            <p>20:00 • Cena &amp; Torta</p>
          </div>
        )}

        {/* LOCATION CON MAPPA */}
        {modules.locationMappa && (
          <div className="mx-3 my-3 p-4 rounded-2xl border text-center shadow-sm space-y-3 bg-white border-slate-200">
            <span className="text-[10px] font-bold uppercase block font-serif text-xs" style={{ color: accentColor }}>
              📍 Location del Matrimonio
            </span>
            <p className="font-bold text-xs" style={{ color: textColor }}>{locationName}</p>
            <p className="text-[10px] font-medium text-slate-600">{locationAddress}</p>

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
              className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#1E293B] text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Apri Mappa &amp; Indicazioni ↗
            </a>
          </div>
        )}

        {/* DRESS CODE CON GALLERIA OUTFIT COORDINATA */}
        {modules.codiceAbbigliamento && (
          <div className="mx-3 my-3 p-4 rounded-2xl text-center border shadow-sm space-y-2 bg-white border-slate-200">
            <span className="text-[10px] font-bold uppercase block font-serif text-xs" style={{ color: accentColor }}>
              Dress Code &amp; Palette
            </span>
            <p className="text-[10px] font-serif" style={{ color: textColor }}>{dressCodeNotes}</p>

            {/* PALLINI COLORI */}
            <div className="flex justify-center gap-1.5 py-1">
              {colors.map((c, i) => (
                <div key={i} className="w-4 h-4 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: c }} />
              ))}
            </div>

            {/* GALLERIA OUTFIT */}
            <div className="pt-1">
              <span className="text-[9px] uppercase font-bold text-slate-500 block mb-1">
                Esempi di Abbigliamento Consigliati (Scorri ➔)
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x">
                {outfitPhotos.map((imgUrl, idx) => (
                  <div key={idx} className="w-20 h-28 flex-shrink-0 rounded-xl overflow-hidden relative shadow-sm border border-slate-200 snap-center">
                    <img
                      src={imgUrl}
                      alt={`Outfit ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NEGOZI CONVENZIONATI */}
        {modules.negoziConvenzionati && (
          <div className="p-2">
            <PartnerStores stores={partnerStores} />
          </div>
        )}

        {/* LISTA NOZZE IBAN */}
        {modules.listaNozzeAmazon && (
          <div className="mx-3 my-3 p-4 rounded-2xl border text-center space-y-2 bg-white border-slate-200">
            <span className="text-[10px] font-bold uppercase block font-serif text-xs flex items-center justify-center gap-1" style={{ color: accentColor }}>
              <Gift className="w-3.5 h-3.5" style={{ color: accentColor }} /> Lista Nozze &amp; Coordinate IBAN
            </span>
            <div className="p-2 bg-[#FAF7F2] rounded-xl border border-slate-200 text-[10px] font-mono font-bold text-[#1E293B] break-all">
              {customIban}
            </div>
          </div>
        )}

        {/* MODULO RSVP */}
        {modules.confermaRsvp && (
          <div className="p-3">
            <RsvpForm
              coupleNames={coupleNames}
              paletteColors={colors}
              rsvpStyle={rsvpStyle}
            />
          </div>
        )}

        {/* GIOCHI DELLA FESTA */}
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
