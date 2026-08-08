"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Heart, PartyPopper, ChevronDown, ChevronUp, Gift } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import AudioPlayer from "@/components/AudioPlayer";
import Marquee from "@/components/Marquee";
import PartnerStores from "@/components/PartnerStores";
import InvitationHero from "@/components/invitation/InvitationHero";
import InvitationSchedule from "@/components/invitation/InvitationSchedule";
import InvitationLocation from "@/components/invitation/InvitationLocation";
import InvitationTemplateC from "@/components/invitation/InvitationTemplateC";
import CircularGallery from "@/components/ui/CircularGallery";
import PhotoPuzzle from "@/components/PhotoPuzzle";
import ScratchPhoto from "@/components/ScratchPhoto";
import LoveQuiz from "@/components/LoveQuiz";
import { DRESS_CODE_PALETTES, DRESS_CODE_PHOTOS, BACKGROUND_PRESETS } from "@/components/agency/constants";

function InvitationContent({ params }: { params?: { slug?: string } }) {
  const searchParams = useSearchParams();

  const slug = params?.slug || "elena-e-davide";
  const cleanSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "") || "elena-e-davide";

  const template = searchParams?.get("template") || (cleanSlug === "francesca-e-luca" ? "B" : "A");
  const isTemplateC = template === "C";
  const isTemplateB = template === "B";

  const start = searchParams?.get("start") || (isTemplateB ? "nuvole" : "busta");
  const dateMode = searchParams?.get("dateMode") || "countdown";
  const schedule = searchParams?.get("schedule") || "classico";
  const rsvpStyle = searchParams?.get("rsvpStyle") || "classico";

  const coupleNames = searchParams?.get("couple") || (isTemplateC ? "Giulia & Marco" : isTemplateB ? "Francesca & Luca" : "Elena & Davide");
  const weddingDateDay = searchParams?.get("day") || "15";
  const weddingDateMonth = searchParams?.get("month") || "Settembre";
  const weddingDateYear = searchParams?.get("year") || "2026";
  const locationName = searchParams?.get("location") || "Villa Rosa";
  const locationAddress = searchParams?.get("address") || "Via Roma 1, Roma";
  const welcomePhrase = searchParams?.get("phrase") || "Due anime, un solo destino. Una storia scritta nel cuore.";
  const heroBgParam = searchParams?.get("heroBg") || "/sfondi/fiori.jpg";
  const waterImageUrl = searchParams?.get("water") || "";
  const heroMediaImage = searchParams?.get("heroMedia") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80";
  const puzzleImage = searchParams?.get("puzzle") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80";
  const scratchPhotoUrl = searchParams?.get("scratch") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80";
  const galleryStyle = searchParams?.get("gallery") || "polaroid";

  const rawQuiz = searchParams?.get("quiz");
  let quizQuestions = [
    {
      question: "Dove ci siamo conosciuti per la prima volta?",
      optionA: "In università",
      optionB: "In discoteca",
      optionC: "Al mare in vacanza",
      optionD: "Tramite amici comuni",
      correctOptionIdx: 0,
    },
  ];

  if (rawQuiz) {
    try {
      const parsedQuiz = JSON.parse(decodeURIComponent(rawQuiz));
      if (Array.isArray(parsedQuiz) && parsedQuiz.length > 0) {
        quizQuestions = parsedQuiz;
      }
    } catch (e) {
      // fallback
    }
  }

  const defaultAudioUrl = isTemplateB
    ? "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3"
    : "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3";
    
  const audioUrl = searchParams?.get("audio") || defaultAudioUrl;
  const dressCodeNotes = searchParams?.get("dress") || "Abiti eleganti nei toni cromatici della palette";
  const paletteIdxStr = searchParams?.get("palette") || "0";
  const paletteIdx = parseInt(paletteIdxStr, 10) || 0;

  const [suonaMusica, setSuonaMusica] = useState(false);
  const [apertoAcqua, setApertoAcqua] = useState(false);
  const [apertoCosmos, setApertoCosmos] = useState(false);

  const quizEncoded = rawQuiz ? rawQuiz : encodeURIComponent(JSON.stringify(quizQuestions));
  const festaDynamicUrl = `/${cleanSlug}/festa?gallery=${encodeURIComponent(
    galleryStyle
  )}&puzzle=${encodeURIComponent(puzzleImage)}&scratch=${encodeURIComponent(
    scratchPhotoUrl
  )}&couple=${encodeURIComponent(coupleNames)}&audio=${encodeURIComponent(
    audioUrl
  )}&quiz=${quizEncoded}`;

  const isWeddingDayOverride = searchParams?.get("isWeddingDay") === "true";
  const today = new Date();
  const currentDay = today.getDate().toString();

  const isTodayWedding = isWeddingDayOverride || (currentDay === weddingDateDay && today.getFullYear().toString() === weddingDateYear);
  const [invitationCollapsed, setInvitationCollapsed] = useState(isTodayWedding);

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
    colors: ["#FAF7F2", "#FFFFFF", "#E9D5FF", "#8B5CF6", "#3B0764"],
    textColor: "#1E293B",
    accentColor: "#8B6508",
  };

  const safeIdx = Math.max(0, Math.min(paletteIdx, (palettesList.length || 1) - 1));
  const activePalette = palettesList[safeIdx] || fallbackPalette;

  const colorsList = Array.isArray(activePalette?.colors) && activePalette.colors.length >= 3
    ? activePalette.colors
    : ["#FAF7F2", "#FFFFFF", "#E6C687", "#8B5CF6", "#3B0764"];

  const bgMain = colorsList[0] || "#FAF7F2";
  const borderCard = colorsList[2] || "#E6C687";

  const currentPreset = (BACKGROUND_PRESETS || []).find((p) => p.url === heroBgParam);
  const isDarkBg = currentPreset?.isDark;

  const textColor = isDarkBg ? "#FFFFFF" : ((activePalette as any)?.textColor || "#1E293B");
  const accentColor = isDarkBg ? "#D4AF37" : ((activePalette as any)?.accentColor || "#8B6508");

  const isWhiteBg = heroBgParam === "#FFFFFF";
  const isPaletteSync = heroBgParam === "palette" || !heroBgParam;

  const photosMap = DRESS_CODE_PHOTOS || {};
  const outfitPhotos: string[] =
    Array.isArray((activePalette as any)?.images) && (activePalette as any).images.length > 0
      ? (activePalette as any).images
      : photosMap[safeIdx] || photosMap[safeIdx % 8] || photosMap[0] || [];

  const marqueeText = searchParams?.get("marquee") || `✦ IL MATRIMONIO DI ${coupleNames.toUpperCase()} ✦ BENVENUTI AL NOSTRO GIORNO SPECIALE ✦`;
  const customIban = searchParams?.get("iban") || "IT60 X 05428 11101 000000123456";

  const showBusta = searchParams?.get("busta3d") !== "false";
  const showGrattaData = searchParams?.get("grattaData") !== "false";
  const showNuvole = searchParams?.get("nuvole3d") !== "false";
  const showMappa = searchParams?.get("locationMappa") !== "false";
  const showGoogleMapIframe = searchParams?.get("showOnlyMap") !== "false";
  const showDressCode = searchParams?.get("codiceAbbigliamento") !== "false";
  const showNegozi = searchParams?.get("negoziConvenzionati") !== "false";
  const showListaNozze = searchParams?.get("listaNozzeAmazon") !== "false";
  const showMarquee = searchParams?.get("dedicheMarquee") !== "false";
  const showHubGiochi = searchParams?.get("hubGiochiFesta") !== "false";
  const showRsvp = searchParams?.get("confermaRsvp") !== "false";
  const showFregi = searchParams?.get("fregiStelle") !== "false";

  const scheduleItems = [
    { id: "1", time: "16:30", title: "Arrivo ed Accoglienza Ospiti" },
    { id: "2", time: "17:00", title: "Cerimonia Solenne di Nozze" },
    { id: "3", time: "18:30", title: "Aperitivo & Cocktail Hour in Giardino" },
    { id: "4", time: "20:00", title: "Cena di Gala & Taglio Torta" },
    { id: "5", time: "22:00", title: "Festa, DJ Set & Open Bar" },
  ];

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden transition-colors relative"
      style={{ backgroundColor: isWhiteBg ? "#FFFFFF" : bgMain, color: textColor }}
    >
      {/* 1. OVERLAY BUSTA 3D / HERO START (OVERLAY A SCHERMO INTERO) */}
      {!isTemplateC && (
        <InvitationHero
          start={start}
          coupleNames={coupleNames}
          weddingDateDay={weddingDateDay}
          weddingDateMonth={weddingDateMonth}
          weddingDateYear={weddingDateYear}
          heroBgParam={heroBgParam}
          heroMediaImage={heroMediaImage}
          waterImageUrl={waterImageUrl}
          showBusta={showBusta}
          showNuvole={showNuvole}
          apertoAcqua={apertoAcqua}
          apertoCosmos={apertoCosmos}
          playWeddingAudio={playWeddingAudio}
          setApertoAcqua={setApertoAcqua}
          setApertoCosmos={setApertoCosmos}
        />
      )}

      {!isWhiteBg && !isPaletteSync && (
        <div
          className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 transition-opacity"
          style={{ backgroundImage: `url(${heroBgParam})` }}
        />
      )}

      {(audioUrl || suonaMusica) && <AudioPlayer audioUrl={audioUrl || defaultAudioUrl} />}

      {showMarquee && <Marquee text={marqueeText} coupleNames={coupleNames} />}

      {isTodayWedding && (
        <div className="max-w-xl mx-auto px-4 pt-6 space-y-4 relative z-20">
          <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl text-center space-y-4 animate-fade-in">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center justify-center gap-2">
              <PartyPopper className="w-5 h-5 text-[#D4AF37]" /> OGGI È IL GRANDE GIORNO! FESTA &amp; MAXISCHERMO
            </span>
            <h2 className="text-2xl font-serif font-bold text-white">{coupleNames}</h2>
            <p className="text-xs text-slate-300">
              Benvenuti al ricevimento! Partecipa ai giochi della festa, rispondi al Quiz e carica le tue foto!
            </p>

            {galleryStyle === "circular" && <CircularGallery />}
            <div className="py-2"><PhotoPuzzle imageSrc={puzzleImage} /></div>
            <div className="py-2"><ScratchPhoto imageSrc={scratchPhotoUrl} /></div>
            <div className="py-2"><LoveQuiz questions={quizQuestions} /></div>

            <Link
              href={festaDynamicUrl}
              className="inline-flex items-center gap-2 text-xs font-bold bg-[#D4AF37] text-slate-900 px-6 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
            >
              <Heart className="w-4 h-4 fill-slate-900" /> Carica Foto per il Maxischermo ↗
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setInvitationCollapsed(!invitationCollapsed)}
            className="w-full py-3 bg-white/90 backdrop-blur-md text-[#8B6508] border border-[#D4AF37] rounded-2xl font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:bg-amber-50 cursor-pointer"
          >
            {invitationCollapsed ? (
              <>✦ Mostra Dettagli Invito &amp; Location <ChevronDown className="w-4 h-4 text-[#D4AF37]" /></>
            ) : (
              <>✦ Richiudi Dettagli Invito <ChevronUp className="w-4 h-4 text-[#D4AF37]" /></>
            )}
          </button>
        </div>
      )}

      {(!isTodayWedding || !invitationCollapsed) && (
        <>
          {isTemplateC ? (
            <InvitationTemplateC
              coupleNames={coupleNames}
              welcomePhrase={welcomePhrase}
              weddingDateDay={weddingDateDay}
              weddingDateMonth={weddingDateMonth}
              weddingDateYear={weddingDateYear}
              locationName={locationName}
              locationAddress={locationAddress}
              outfitPhotos={outfitPhotos}
              colors={colorsList}
              rsvpStyle={rsvpStyle}
              introStart={start}
              heroBgImage={heroBgParam}
              waterImageUrl={waterImageUrl}
              dateMode={dateMode}
              scheduleSchema={schedule}
              scheduleItems={scheduleItems}
              dressCodeNotes={dressCodeNotes}
              customIban={customIban}
              showGoogleMapIframe={showGoogleMapIframe}
              showMappa={showMappa}
              showDressCode={showDressCode}
              showNegozi={showNegozi}
              showListaNozze={showListaNozze}
              showHubGiochi={showHubGiochi}
              cleanSlug={cleanSlug}
              playWeddingAudio={playWeddingAudio}
            />
          ) : (
            <main className="max-w-md mx-auto px-4 py-8 space-y-6 relative z-10">
              <div className="text-center space-y-3 pt-2">
                <span className="text-xs uppercase tracking-widest font-bold" style={{ color: accentColor }}>
                  Il Matrimonio di {coupleNames}
                </span>
                <h1 className="text-4xl font-serif font-bold drop-shadow-xs" style={{ color: textColor }}>{coupleNames}</h1>
                <p className="text-sm font-bold text-slate-700">{weddingDateDay} {weddingDateMonth} {weddingDateYear}</p>
                <blockquote className="text-sm italic font-serif opacity-90 px-4 mt-2 font-medium" style={{ color: textColor }}>
                  &quot;{welcomePhrase}&quot;
                </blockquote>
              </div>

              {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

              {dateMode === "countdown" && (
                <div className="p-6 rounded-3xl shadow-md border text-center space-y-2 bg-white/90 backdrop-blur-xs" style={{ borderColor: borderCard }}>
                  <span className="text-xs font-bold uppercase tracking-wider block font-serif" style={{ color: accentColor }}>
                    ⏳ Il nostro grande giorno inizia tra
                  </span>
                  <div className="flex justify-center gap-4 font-serif font-bold text-xl" style={{ color: textColor }}>
                    <div><span className="block text-2xl" style={{ color: accentColor }}>129</span><span className="text-[10px] uppercase text-slate-600 font-sans">Giorni</span></div>
                    <span>:</span>
                    <div><span className="block text-2xl" style={{ color: accentColor }}>14</span><span className="text-[10px] uppercase text-slate-600 font-sans">Ore</span></div>
                    <span>:</span>
                    <div><span className="block text-2xl" style={{ color: accentColor }}>23</span><span className="text-[10px] uppercase text-slate-600 font-sans">Minuti</span></div>
                    <span>:</span>
                    <div><span className="block text-2xl" style={{ color: accentColor }}>17</span><span className="text-[10px] uppercase text-slate-600 font-sans">Secondi</span></div>
                  </div>
                </div>
              )}

              {dateMode === "scratch" && showGrattaData && (
                <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider block font-serif" style={{ color: accentColor }}>
                    🎰 Gratta col dito per scoprire la data
                  </span>
                  <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
                </div>
              )}

              {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

              <InvitationSchedule
                schedule={schedule}
                scheduleItems={scheduleItems}
                accentColor={accentColor}
                textColor={textColor}
                bgCard={bgMain}
                borderCard={borderCard}
              />

              {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

              {showMappa && (
                <InvitationLocation
                  locationName={locationName}
                  locationAddress={locationAddress}
                  showGoogleMapIframe={showGoogleMapIframe}
                  accentColor={accentColor}
                  textColor={textColor}
                  bgCard={bgMain}
                  borderCard={borderCard}
                />
              )}

              {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

              {showDressCode && (
                <div className="p-6 rounded-3xl shadow-md border text-center space-y-4 bg-white border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: accentColor }}>
                    Dress Code &amp; Palette
                  </span>
                  <p className="text-xs font-serif leading-relaxed" style={{ color: textColor }}>{dressCodeNotes}</p>

                  <div className="flex justify-center gap-2">
                    {colorsList.map((color, i) => (
                      <div
                        key={i}
                        className="w-7 h-7 rounded-full border border-slate-300 shadow-sm"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">
                      Esempi di Abbigliamento Consigliati (Scorri ➔)
                    </span>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                      {outfitPhotos.map((imgUrl, idx) => (
                        <div key={idx} className="w-32 h-44 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 snap-center">
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

              {showNegozi && <PartnerStores stores={[]} showAmazonAffiliate={true} />}

              {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

              {showListaNozze && (
                <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white border-slate-200">
                  <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5" style={{ color: accentColor }}>
                    <Gift className="w-4 h-4" style={{ color: accentColor }} /> Lista Nozze &amp; Coordinate IBAN
                  </span>
                  <p className="text-xs text-slate-600 font-serif">
                    Il regalo più grande è la vostra presenza. Per chi desidera contribuire al nostro viaggio di nozze:
                  </p>
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#1E293B] break-all">
                    {customIban}
                  </div>
                </div>
              )}

              {showFregi && <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest">✦ ✦ ✦</div>}

              {showRsvp && (
                <div className="pt-2">
                  <RsvpForm
                    coupleNames={coupleNames}
                    paletteColors={colorsList}
                    rsvpStyle={rsvpStyle}
                  />
                </div>
              )}

              {showHubGiochi && (
                <div className="p-6 bg-gradient-to-br from-[#1E293B] to-slate-800 text-white rounded-3xl shadow-xl text-center space-y-3">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block flex items-center justify-center gap-1.5">
                    <Heart className="w-4 h-4 text-[#D4AF37]" /> Hub della Festa &amp; Maxischermo
                  </span>
                  <p className="text-xs text-slate-300">
                    Partecipa al Quiz degli sposi, gioca al Puzzle e carica le tue foto sul Photo Wall!
                  </p>
                  <Link
                    href={festaDynamicUrl}
                    className="inline-flex items-center gap-2 text-xs font-bold bg-[#D4AF37] text-slate-950 px-5 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
                  >
                    <Heart className="w-4 h-4 fill-slate-950" /> Entra nella Pagina della Festa ↗
                  </Link>
                </div>
              )}
            </main>
          )}
        </>
      )}
    </div>
  );
}

export default function InvitationPage({ params }: { params?: { slug?: string } }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] text-[#8B6508] font-serif font-bold text-sm">
          Caricamento Invito in corso...
        </div>
      }
    >
      <InvitationContent params={params} />
    </Suspense>
  );
}
