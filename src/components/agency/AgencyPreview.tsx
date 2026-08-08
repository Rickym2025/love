"use client";

import React, { useState } from "react";
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
import SocialCards, { type CardItem } from "@/components/ui/SocialCards";
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
  puzzlePrize?: string;
  scratchPrize?: string;
  quizPrize?: string;
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
  heroBgImage = "/sfondi/fiori.jpg",
  heroMediaImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  ricevimentoImage = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  puzzleImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
  scratchPhotoUrl = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  galleryStyle = "polaroid",
  quizQuestions = [],
  puzzlePrize = "💃 Hai vinto un ballo speciale con la Sposa!",
  scratchPrize = "🥂 Hai vinto un drink offerto dallo Sposo!",
  quizPrize = "📸 Hai vinto un selfie di gruppo con gli Sposi!",
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

  const getValidBg = (bg?: string) => {
    if (!bg || bg === "palette" || bg === "#FFFFFF" || !bg.includes("/")) {
      return selectedTemplate === "C" ? "/sfondi/carta_pergamena.jpg" : selectedTemplate === "B" ? "/sfondi/seta_rosa.jpg" : "/sfondi/fiori.jpg";
    }
    return bg;
  };

  const activeBg = getValidBg(heroBgImage);

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

  const containerBgStyle = { backgroundColor: bgMain, color: textColor };

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
      heroBgImage: activeBg,
      waterImageUrl,
      heroMediaImage,
      ricevimentoImage,
      puzzleImage,
      scratchPhotoUrl,
      galleryStyle,
      quizQuestions,
      puzzlePrize,
      scratchPrize,
      quizPrize,
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
    { imgUrl: scratchPhotoUrl || "", caption: "Il Primo Ballo", author: coupleNames || "Gli Sposi" },
    { imgUrl: puzzleImage || "", caption: "Taglio Torta", author: "Zii Rossi" },
  ];

  const previewPolaroidPhotos = [
    { id: "1", url: scratchPhotoUrl || "", caption: "Il Primo Ballo degli Sposi", author: coupleNames || "Gli Sposi" },
    { id: "2", url: puzzleImage || "", caption: "Taglio della Torta", author: "Zii Rossi" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 select-none">
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

      <div
        className="w-[350px] h-[680px] max-h-[82vh] rounded-[48px] border-[10px] border-slate-900 shadow-2xl overflow-y-auto overflow-x-hidden relative backdrop-blur-sm scrollbar-thin pointer-events-auto"
        style={containerBgStyle}
      >
        <div className="w-28 h-4 bg-slate-900 rounded-b-xl mx-auto sticky top-0 z-50 mb-2 border-b border-slate-800 shadow-xs pointer-events-none" />

        {/* SFONDO TEXTURE VISIBILE IN TRASPARENZA */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-50 transition-opacity"
          style={{ backgroundImage: `url(${activeBg})` }}
        />

        {(audioUrl || suonaMusica) && <AudioPlayer audioUrl={audioUrl} />}

        {selectedTemplate === "C" ? (
          /* TEMPLATE C COMPLETO */
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
            introStart={introStart}
            heroMediaImage={heroMediaImage}
            ricevimentoImage={ricevimentoImage}
            heroBgImage={activeBg}
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
            galleryStyle={galleryStyle}
            puzzleImage={puzzleImage}
            scratchPhotoUrl={scratchPhotoUrl}
            quizQuestions={quizQuestions}
            puzzlePrize={puzzlePrize}
            scratchPrize={scratchPrize}
            quizPrize={quizPrize}
            cleanSlug="giulia-e-marco"
            inline={true}
            playWeddingAudio={playWeddingAudio}
          />
        ) : (
          /* MODELLO A & B CON SCHEDE TRASLUCIDE PER MOSTRARE LO SFONDO */
          <div className="relative z-10 space-y-3 pb-6">
            {modules.dedicheMarquee && (
              <div className="py-1">
                <Marquee text={marqueeText} coupleNames={coupleNames} />
              </div>
            )}

            {introStart === "busta" && modules.busta3d && (
              <div className="p-2">
                <EnvelopeWax
                  coupleNames={coupleNames}
                  waxSealUrl={waterImageUrl || "/wax-seal.png"}
                  inline={true}
                  onOpen={playWeddingAudio}
                />
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
                    <img
                      src={waterImageUrl || "/wax-seal.png"}
                      alt="Sigillo Acqua"
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest mt-1 drop-shadow">
                    Tocca per Aprire
                  </span>
                </di
