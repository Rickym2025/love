"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, MapPin, Gift, PartyPopper } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import PartingClouds from "@/components/PartingClouds";
import Marquee from "@/components/Marquee";
import PartnerStores from "@/components/PartnerStores";
import LoveQuiz from "@/components/LoveQuiz";
import AudioPlayer from "@/components/AudioPlayer";
import EnvelopeWax from "@/components/EnvelopeWax";
import WaterRippleImage from "@/components/ui/water-ripple-image";
import ScrollExpandMedia from "@/components/ui/scroll-expand-media";
import TimelineHowItWorks from "@/components/ui/TimelineHowItWorks";
import CosmosHero from "@/components/ui/CosmosHero";
import CircularGallery from "@/components/ui/CircularGallery";
import SocialCards, { CardItem } from "@/components/ui/SocialCards";
import PhotoWallSection from "@/components/PhotoWallSection";
import PhotoPuzzle from "@/components/PhotoPuzzle";
import ScratchPhoto from "@/components/ScratchPhoto";
import InvitationTemplateC from "@/components/invitation/InvitationTemplateC";
import { DRESS_CODE_PALETTES, DRESS_CODE_PHOTOS, WELCOME_PHRASE_PRESETS, BACKGROUND_PRESETS } from "./constants";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
}

export interface AgencyPreviewProps {
  selectedTemplate?: "A" | "B" | "C";
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
  showAmazonAffiliate?: boolean;
  scheduleItems?: ScheduleItem[];
  heroBgImage?: string;
  heroMediaImage?: string;
  ricevimentoImage?: string;
  puzzleImage?: string;
  scratchPhotoUrl?: string;
  galleryStyle?: string;
  quizQuestions?: any[];
  marqueeText?: string;
  customIban?: string;
  modules?: Record<string, boolean>;
}

export default function AgencyPreview({
  selectedTemplate = "A",
  introStart = "busta",
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
  showAmazonAffiliate = true,
  scheduleItems = [
    { id: "1", time: "16:30", title: "Arrivo ed Accoglienza Ospiti" },
    { id: "2", time: "17:00", title: "Cerimonia Solenne di Nozze" },
    { id: "3", time: "18:30", title: "Aperitivo & Cocktail Hour in Giardino" },
    { id: "4", time: "20:00", title: "Cena di Gala & Taglio Torta" },
    { id: "5", time: "22:00", title: "Festa, DJ Set & Open Bar" },
  ],
  heroBgImage = "palette",
  heroMediaImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  ricevimentoImage = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  puzzleImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
  scratchPhotoUrl = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  galleryStyle = "polaroid",
  quizQuestions = [],
  marqueeText,
  customIban = "IT60 X 05428 11101 000000123456",
  modules = {},
}: AgencyPreviewProps) {
  const [startClosed, setStartClosed] = useState(false);
  const [suonaMusica, setSuonaMusica] = useState(false);

  const playWeddingAudio = () => {
    setSuonaMusica(true);
    if (typeof window !== "undefined") {
      const audio = document.getElementById("love-wedding-audio") as HTMLAudioElement;
      if (audio) {
        audio.muted = false;
        audio.play().catch(() => {});
      }
    }
  };

  const palettesList = Array.isArray(DRESS_CODE_PALETTES)
    ? DRESS_CODE_PALETTES
    : Object.values(DRESS_CODE_PALETTES || {});

  const fallbackPalette = {
    id: "1",
    name: "Lavanda & Lillà",
    colors: ["#FAF7F2", "#F3E8FF", "#E9D5FF", "#8B5CF6", "#3B0764"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
  };

  const safeIdx = Math.max(0, Math.min(selectedPaletteIdx || 0, Math.max(0, (palettesList.length || 1) - 1)));
  const activePalette = (palettesList && palettesList[safeIdx]) || fallbackPalette;

  const colorsList = Array.isArray(activePalette?.colors) && activePalette.colors.length >= 3
    ? activePalette.colors
    : ["#FAF7F2", "#FFFFFF", "#E6C687", "#8B5CF6", "#3B0764"];

  const bgMain = colorsList[0] || "#FAF7F2";
  const borderCard = colorsList[2] || "#E6C687";

  const currentPreset = (BACKGROUND_PRESETS || []).find((p) => p.url === heroBgImage);
  const isDarkBg = currentPreset?.isDark;

  const textColor = isDarkBg ? "#FFFFFF" : ((activePalette as any)?.textColor || "#1E293B");
  const accentColor = isDarkBg ? "#D4AF37" : ((activePalette as any)?.accentColor || "#8B6508");

  const isWhiteBg = heroBgImage === "#FFFFFF";
  const isPaletteSync = heroBgImage === "palette" || !heroBgImage;
  const containerBgStyle = isWhiteBg
    ? { backgroundColor: "#FFFFFF", color: textColor }
    : isPaletteSync
    ? { backgroundColor: bgMain, color: textColor }
    : { backgroundColor: bgMain, color: textColor };

  const photosMap = DRESS_CODE_PHOTOS || {};
  const outfitPhotos: string[] =
    Array.isArray((activePalette as any)?.images) && (activePalette as any).images.length > 0
      ? (activePalette as any).images
      : photosMap[safeIdx] || photosMap[safeIdx % 8] || photosMap[0] || [];

  const presetsArray = Array.isArray(WELCOME_PHRASE_PRESETS) ? WELCOME_PHRASE_PRESETS : [];
  
  const computedWelcomePhrase =
    welcomePhrase ||
    (selectedPhrasePreset === "9"
      ? customWelcomePhrase || "Insieme è il nostro posto preferito."
      : presetsArray[Number(selectedPhrasePreset) || 0]) ||
    "Benvenuti al nostro matrimonio";

  const mapQuery = encodeURIComponent((locationAddress || locationName || "Villa Rosa").trim());
  const activeTheme = eventThemePreset === "Personalizzato (digita a mano)" ? (customEventTheme || "Tema Personalizzato") : eventThemePreset;

  const showFregi = modules.fregiStelle !== false;
  const showLocationModule = modules.locationMappa !== false;
  const showGoogleMapIframe = modules.showOnlyMap !== false;

  const slugName = selectedTemplate === "A" ? "elena-e-davide" : selectedTemplate === "B" ? "francesca-e-luca" : "giulia-e-marco";

  const saveCurrentStateToLocalStorage = () => {
    if (typeof window === "undefined") return;
    const previewData = {
      selectedTemplate,
      introStart,
      dateDisplayMode,
      scheduleSchema,
      rsvpStyle,
      coupleNames,
      weddingDateDay,
      weddingDateMonth,
      weddingDateYear,
      locationName,
      locationAddress,
      audioUrl,
      welcomePhrase: computedWelcomePhrase,
      selectedPaletteIdx: safeIdx,
      heroBgImage,
      waterImageUrl,
      heroMediaImage,
      ricevimentoImage,
      puzzleImage,
      scratchPhotoUrl,
      galleryStyle,
      quizQuestions,
      customIban,
    };
    localStorage.setItem("love_invitation_data", JSON.stringify(previewData));
    localStorage.setItem(`love_invitation_${slugName}`, JSON.stringify(previewData));
  };

  const handleOpenFullscreenInvito = (e: React.MouseEvent) => {
    e.preventDefault();
    saveCurrentStateToLocalStorage();
    window.open(`/${slugName}?preview=true`, "_blank", "noopener,noreferrer");
  };

  const handleOpenFullscreenFesta = (e: React.MouseEvent) => {
    e.preventDefault();
    saveCurrentStateToLocalStorage();
    window.open(`/${slugName}/festa?preview=true`, "_blank", "noopener,noreferrer");
  };

  const previewFanCards: CardItem[] = [
    { imgUrl: scratchPhotoUrl, caption: "Il Primo Ballo", author: coupleNames },
    { imgUrl: puzzleImage, caption: "Taglio Torta", author: "Zii Rossi" },
    { imgUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", caption: "Brindisi", author: "Amici" },
  ];

  const previewPolaroidPhotos = [
    { id: "1", url: scratchPhotoUrl, caption: "Il Primo Ballo degli Sposi", author: coupleNames },
    { id: "2", url: puzzleImage, caption: "Taglio della Torta", author: "Zii Rossi" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 select-none">
      {/* TESTATA ANTEPRIMA CON PULSANTI FULLSCREEN */}
      <div className="flex flex-col gap-1.5 w-full max-w-[350px] mb-3 text-white">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Live Preview Sincronizzata
        </span>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`/${slugName}?preview=true`}
            onClick={handleOpenFullscreenInvito}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-900 hover:bg-amber-400 flex items-center justify-center gap-1 font-bold bg-[#D4AF37] px-3 py-2 rounded-xl shadow-md transition-all text-center cursor-pointer"
          >
            ✦ Fullscreen Invito ↗
          </a>
          <a
            href={`/${slugName}/festa?preview=true`}
            onClick={handleOpenFullscreenFesta}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white hover:bg-slate-700 flex items-center justify-center gap-1 font-bold bg-slate-800 border border-[#D4AF37]/50 px-3 py-2 rounded-xl shadow-md transition-all text-center cursor-pointer"
          >
            🎉 Fullscreen Festa ↗
          </a>
        </div>
      </div>

      {/* MOCKUP SMARTPHONE PROPORZIONATO (REALE DESIGN IPHONE 350x680) */}
      <div
        className="w-[350px] h-[680px] max-h-[82vh] rounded-[48px] border-[10px] border-slate-900 shadow-2xl overflow-y-auto overflow-x-hidden relative backdrop-blur-sm scrollbar-thin"
        style={containerBgStyle}
      >
        {/* DYNAMIC ISLAND IPHONE */}
        <div className="w-28 h-4 bg-slate-900 rounded-b-xl mx-auto sticky top-0 z-50 mb-2 border-b border-slate-800 shadow-xs" />

        {!isWhiteBg && !isPaletteSync && (
          <div
            className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20"
            style={{ backgroundImage: `url(${heroBgImage})` }}
          />
        )}

        {(audioUrl || suonaMusica) && <AudioPlayer audioUrl={audioUrl} />}

        {selectedTemplate === "C" ? (
          <InvitationTemplateC
            coupleNames={coupleNames}
            welcomePhrase={computedWelcomePhrase}
            weddingDateDay={weddingDateDay}
            weddingDateMonth={weddingDateMonth}
            weddingDateYear={weddingDateYear}
            locationName={locationName}
            locationAddress={locationAddress}
            outfitPhotos={outfitPhotos}
            colors={colorsList}
            rsvpStyle={rsvpStyle}
            heroMediaImage={heroMediaImage}
            ricevimentoImage={ricevimentoImage}
            heroBgImage={heroBgImage}
            waterImageUrl={waterImageUrl}
            dateMode={dateDisplayMode}
            scheduleSchema={scheduleSchema}
            scheduleItems={scheduleItems}
            dressCodeNotes={dressCodeNotes}
            customIban={customIban}
            partnerStores={partnerStores}
            showAmazonAffiliate={showAmazonAffiliate}
            showGoogleMapIframe={showGoogleMapIframe}
            showMappa={showLocationModule}
            showDressCode={modules.codiceAbbigliamento !== false}
            showNegozi={modules.negoziConvenzionati !== false}
            showListaNozze={modules.listaNozzeAmazon !== false}
            showHubGiochi={modules.hubGiochiFesta !== false}
            cleanSlug="giulia-e-marco"
            playWeddingAudio={playWeddingAudio}
          />
        ) : (
          /* MODELLO A & B */
          <>
            {modules.dedicheMarquee && (
              <div className="py-1">
                <Marquee text={marqueeText} coupleNames={coupleNames} />
              </div>
            )}

            {introStart === "busta" && modules.busta3d && (
              <div className="p-2">
                <EnvelopeWax coupleNames={coupleNames} inline={true} onOpen={playWeddingAudio} />
              </div>
            )}

            {introStart === "nuvole" && modules.nuvole3d && (
              <div className="relative py-1">
                <PartingClouds inline={true} onOpen={playWeddingAudio} />
              </div>
            )}

            {introStart === "lago" && !startClosed && (
              <div className="relative w-full h-44 overflow-hidden border-b border-sky-300">
                <WaterRippleImage
                  src={waterImageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"}
                  onClick={() => {
                    playWeddingAudio();
                    setStartClosed(true);
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/20">
                  <div className="relative w-12 h-12 drop-shadow-lg animate-pulse">
                    <Image src="/wax-seal.png" alt="Sigillo Acqua" fill className="object-contain" priority unoptimized />
                  </div>
                  <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mt-1 drop-shadow">
                    Tocca per Aprire
                  </span>
                </div>
              </div>
            )}

            {introStart === "expand" && (
              <div className="py-1 px-2">
                <ScrollExpandMedia
                  bgImageSrc={isPaletteSync || isWhiteBg ? "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" : heroBgImage}
                  mediaSrc={heroMediaImage}
                  title={coupleNames}
                  date={`${weddingDateDay} ${weddingDateMonth} ${weddingDateYear}`}
                  onExpand={playWeddingAudio}
                />
              </div>
            )}

            {introStart === "cosmos" && !startClosed && (
              <div className="relative w-full h-[300px]">
                <CosmosHero
                  coupleNames={coupleNames}
                  weddingDate={`${weddingDateDay} ${weddingDateMonth} ${weddingDateYear}`}
                  inline={true}
                  onEnter={() => {
                    playWeddingAudio();
                    setStartClosed(true);
                  }}
                />
              </div>
            )}

            {/* HERO SPOSI */}
            <div className="text-center pt-3 px-4 space-y-2">
              {heroMediaImage && (
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md relative">
                  <img src={heroMediaImage} alt={coupleNames} className="w-full h-full object-cover" />
                </div>
              )}
              <span className="text-[10px] tracking-widest uppercase font-bold block" style={{ color: accentColor }}>
                Il Matrimonio di {coupleNames} • {activeTheme}
              </span>
              <p className="text-xs font-bold" style={{ color: textColor }}>
                {weddingDateDay} {weddingDateMonth} {weddingDateYear}
              </p>
              <h3 className="text-2xl font-serif font-bold mt-1 drop-shadow-xs" style={{ color: textColor }}>
                {coupleNames}
              </h3>
              <p className="text-xs italic font-serif opacity-90 px-2 pt-1 font-medium" style={{ color: textColor }}>
                &quot;{computedWelcomePhrase}&quot;
              </p>
              <p className="text-xs font-bold uppercase pt-1" style={{ color: accentColor }}>{locationName}</p>
            </div>

            {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

            {/* MODULO DATA */}
            {dateDisplayMode === "countdown" && (
              <div className="my-3 mx-3 p-3 rounded-2xl text-center border shadow-sm bg-white/90 backdrop-blur-xs" style={{ borderColor: borderCard }}>
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

            {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

            {/* PROGRAMMA GIORNATA */}
            {scheduleSchema === "howitworks" && (
              <div className="mx-3 my-3 p-2 rounded-2xl border text-center shadow-sm bg-white border-slate-200">
                <span className="text-[10px] font-bold uppercase block font-serif text-xs mb-1" style={{ color: accentColor }}>
                  📍 Programma a Carte 3D
                </span>
                <TimelineHowItWorks items={scheduleItems} accentColor={accentColor} />
              </div>
            )}

            {scheduleSchema === "classico" && (
              <div className="mx-3 my-3 p-4 rounded-2xl border text-center shadow-sm space-y-2 bg-white border-slate-200">
                <span className="text-[10px] font-bold uppercase block font-serif text-xs" style={{ color: accentColor }}>
                  Programma della Giornata
                </span>
                <div className="space-y-1.5 text-xs pt-1 font-serif" style={{ color: textColor }}>
                  {scheduleItems.map((item) => (
                    <p key={item.id}>
                      <strong className="font-sans" style={{ color: accentColor }}>{item.time}</strong> — {item.title}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {scheduleSchema === "timeline" && (
              <div className="mx-3 my-3 p-4 rounded-2xl border text-center shadow-sm space-y-2 bg-white border-slate-200">
                <span className="text-[10px] font-bold uppercase block font-serif text-xs mb-2" style={{ color: accentColor }}>
                  📍 Timeline Verticale Orari
                </span>
                <div className="relative pl-6 space-y-2 text-left border-l-2 text-xs" style={{ borderColor: accentColor, color: textColor }}>
                  {scheduleItems.map((item) => (
                    <div key={item.id}>
                      <span className="font-bold" style={{ color: accentColor }}>{item.time}</span> — {item.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {scheduleSchema === "schede" && (
              <div className="mx-3 my-3 grid grid-cols-2 gap-2 text-center text-xs">
                {scheduleItems.map((item) => (
                  <div key={item.id} className="p-2.5 rounded-xl border font-bold bg-white border-slate-200 shadow-sm" style={{ color: textColor }}>
                    <span className="block text-[10px]" style={{ color: accentColor }}>{item.time}</span> {item.title}
                  </div>
                ))}
              </div>
            )}

            {scheduleSchema === "minimal" && (
              <div className="mx-3 my-3 p-3 text-center space-y-1 font-serif text-xs bg-white/80 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-sm" style={{ color: textColor }}>
                {scheduleItems.map((item) => (
                  <p key={item.id}>
                    <strong className="font-sans" style={{ color: accentColor }}>{item.time}</strong> • {item.title}
                  </p>
                ))}
              </div>
            )}

            {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

            {/* LOCATION CON MAPPA GOOGLE SEPARATA */}
            {showLocationModule && (
              <div className="mx-3 my-3 p-4 rounded-2xl border text-center shadow-sm space-y-3 bg-white border-slate-200">
                <span className="text-[10px] font-bold uppercase block font-serif text-xs" style={{ color: accentColor }}>
                  📍 Location del Matrimonio
                </span>
                <p className="font-bold text-xs" style={{ color: textColor }}>{locationName}</p>
                <p className="text-[10px] font-medium text-slate-600">{locationAddress}</p>

                {showGoogleMapIframe && (
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
                )}

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

            {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

            {/* DRESS CODE CON GALLERIA OUTFIT */}
            {modules.codiceAbbigliamento && (
              <div className="mx-3 my-3 p-4 rounded-2xl text-center border shadow-sm space-y-2 bg-white border-slate-200">
                <span className="text-[10px] font-bold uppercase block font-serif text-xs" style={{ color: accentColor }}>
                  Dress Code &amp; Palette
                </span>
                <p className="text-[10px] font-serif" style={{ color: textColor }}>{dressCodeNotes}</p>

                <div className="flex justify-center gap-1.5 py-1">
                  {colorsList.map((c, i) => (
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
                <PartnerStores stores={partnerStores} showAmazonAffiliate={showAmazonAffiliate} />
              </div>
            )}

            {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

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

            {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

            {/* MODULO RSVP */}
            {modules.confermaRsvp && (
              <div className="p-3">
                <RsvpForm
                  coupleNames={coupleNames}
                  paletteColors={colorsList}
                  rsvpStyle={rsvpStyle}
                />
              </div>
            )}

            {/* GIOCHI DELLA FESTA LIVE IN PREVIEW CON GALLERIA DINAMICA SELEZIONATA */}
            {modules.hubGiochiFesta !== false && (
              <div className="mx-3 my-3 p-4 bg-gradient-to-br from-[#1E293B] to-slate-800 text-white rounded-2xl shadow-md text-center space-y-3">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block flex items-center justify-center gap-1">
                  <PartyPopper className="w-3.5 h-3.5" /> Giochi della Festa &amp; Maxischermo
                </span>

                {/* RENDERING ESATTO DELLA GALLERIA SELEZIONATA IN DASHBOARD */}
                <div className="py-1">
                  {galleryStyle === "circular" ? (
                    <CircularGallery />
                  ) : galleryStyle === "fan" ? (
                    <SocialCards cards={previewFanCards} />
                  ) : (
                    <PhotoWallSection photos={previewPolaroidPhotos} isAgencyDashboard={true} />
                  )}
                </div>

                <div className="py-1"><PhotoPuzzle imageSrc={puzzleImage} /></div>
                <div className="py-1"><ScratchPhoto imageSrc={scratchPhotoUrl} /></div>
                
                {/* QUIZ SPOSI LIVE CON LE DOMANDE AGGIORNATE IN REAL-TIME */}
                <div className="py-1">
                  <LoveQuiz questions={quizQuestions} />
                </div>

                <a
                  href={`/${slugName}/festa?preview=true`}
                  onClick={handleOpenFullscreenFesta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-[#D4AF37] text-slate-900 px-3 py-1.5 rounded-lg shadow-md hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <PartyPopper className="w-3.5 h-3.5 text-slate-900" /> Apri Maxischermo Festa ↗
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
