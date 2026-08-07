"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart, Sparkles, Gift } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import AudioPlayer from "@/components/AudioPlayer";
import Marquee from "@/components/Marquee";
import PartnerStores from "@/components/PartnerStores";
import InvitationHero from "@/components/invitation/InvitationHero";
import InvitationSchedule from "@/components/invitation/InvitationSchedule";
import InvitationLocation from "@/components/invitation/InvitationLocation";
import InvitationTemplateC from "@/components/invitation/InvitationTemplateC";
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
  const heroBgParam = searchParams?.get("heroBg") || "palette";
  const waterImageUrl = searchParams?.get("water") || "";
  const heroMediaImage = searchParams?.get("heroMedia") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80";

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
  const bgCard = colorsList[1] || "#FFFFFF";
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
      {/* SFONDO PARALLAX SOFT */}
      {!isWhiteBg && !isPaletteSync && (
        <div
          className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 transition-opacity"
          style={{ backgroundImage: `url(${heroBgParam})` }}
        />
      )}

      {(audioUrl || suonaMusica) && <AudioPlayer audioUrl={audioUrl || defaultAudioUrl} />}

      {showMarquee && <Marquee text={marqueeText} coupleNames={coupleNames} />}

      {/* 1. HERO START INIZIALE ESEGUITO PER TUTTI I TEMPLATE (A, B, C) */}
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

      {/* 2. MODELLO C (LANDING STORYBOARD) */}
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
        />
      ) : (
        /* MODELLO A & B STANDARD */
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
            bgCard={bgCard}
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
              bgCard={bgCard}
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
                <Sparkles className="w-4 h-4" /> Hub della Festa &amp; Maxischermo
              </span>
              <p className="text-xs text-slate-300">
                Partecipa al Quiz degli sposi, gioca al Puzzle e carica le tue foto sul Photo Wall!
              </p>
              <Link
                href={`/${cleanSlug}/festa`}
                className="inline-flex items-center gap-2 text-xs font-bold bg-[#D4AF37] text-slate-900 px-5 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
              >
                <Heart className="w-4 h-4 fill-slate-900" /> Entra nella Pagina della Festa ↗
              </Link>
            </div>
          )}

          <footer className="text-center pt-8 pb-4 text-[11px] text-slate-400 border-t border-slate-200/60">
            <p>© {new Date().getFullYear()} {coupleNames} — Tutti i diritti riservati.</p>
            <p className="mt-1 text-[10px] text-slate-400">Powered by LOVE d&apos;Autore</p>
          </footer>
        </main>
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
