"use client";

import React from "react";
import Link from "next/link";
import { Star, ChevronRight, MapPin, Gift, Sparkles, Heart } from "lucide-react";
import RsvpForm from "@/components/RsvpForm";
import ScratchDate from "@/components/ScratchDate";
import PartnerStores from "@/components/PartnerStores";
import TimelineHowItWorks from "@/components/ui/TimelineHowItWorks";
import KineticGrid from "@/components/ui/kinetic-grid";
import ScrollExpandMedia from "@/components/ui/scroll-expand-media";
import EnvelopeWax from "@/components/EnvelopeWax";
import PartingClouds from "@/components/PartingClouds";
import WaterRippleImage from "@/components/ui/water-ripple-image";
import CosmosHero from "@/components/ui/CosmosHero";
import CircularGallery from "@/components/ui/CircularGallery";
import SocialCards, { CardItem } from "@/components/ui/SocialCards";
import PhotoWallSection from "@/components/PhotoWallSection";
import PhotoPuzzle from "@/components/PhotoPuzzle";
import ScratchPhoto from "@/components/ScratchPhoto";
import LoveQuiz from "@/components/LoveQuiz";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
}

export interface InvitationTemplateCProps {
  coupleNames: string;
  welcomePhrase: string;
  weddingDateDay: string;
  weddingDateMonth: string;
  weddingDateYear: string;
  locationName: string;
  locationAddress: string;
  outfitPhotos: string[];
  colors: string[];
  rsvpStyle: string;
  introStart?: string;
  heroMediaImage?: string;
  ricevimentoImage?: string;
  heroBgImage?: string;
  waterImageUrl?: string;
  dateMode?: string;
  scheduleSchema?: string;
  scheduleItems?: ScheduleItem[];
  dressCodeNotes?: string;
  customIban?: string;
  partnerStores?: any[];
  showAmazonAffiliate?: boolean;
  showGoogleMapIframe?: boolean;
  showMappa?: boolean;
  showDressCode?: boolean;
  showNegozi?: boolean;
  showListaNozze?: boolean;
  showHubGiochi?: boolean;
  galleryStyle?: string;
  puzzleImage?: string;
  scratchPhotoUrl?: string;
  quizQuestions?: any[];
  puzzlePrize?: string;
  scratchPrize?: string;
  quizPrize?: string;
  cleanSlug?: string;
  inline?: boolean;
  playWeddingAudio?: () => void;
}

export default function InvitationTemplateC({
  coupleNames = "Giulia & Marco",
  welcomePhrase = "Due anime, un solo destino. Vi aspettiamo per festeggiare insieme.",
  weddingDateDay = "15",
  weddingDateMonth = "Settembre",
  weddingDateYear = "2026",
  locationName = "Villa Rosa",
  locationAddress = "Via Roma 1, Roma",
  outfitPhotos = [],
  colors = ["#FAF7F2", "#FFFFFF", "#E6C687", "#8B5CF6", "#3B0764"],
  rsvpStyle = "classico",
  introStart = "expand",
  heroMediaImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  ricevimentoImage = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  heroBgImage = "/sfondi/carta_pergamena.jpg",
  waterImageUrl = "",
  dateMode = "countdown",
  scheduleSchema = "classico",
  scheduleItems = [
    { id: "1", time: "16:30", title: "Arrivo ed Accoglienza Ospiti" },
    { id: "2", time: "17:00", title: "Cerimonia Solenne di Nozze" },
    { id: "3", time: "18:30", title: "Aperitivo & Cocktail Hour in Giardino" },
    { id: "4", time: "20:00", title: "Cena di Gala & Taglio Torta" },
    { id: "5", time: "22:00", title: "Festa, DJ Set & Open Bar" },
  ],
  dressCodeNotes = "Abiti eleganti nei toni cromatici della palette",
  customIban = "IT60 X 05428 11101 000000123456",
  partnerStores = [],
  showAmazonAffiliate = true,
  showGoogleMapIframe = true,
  showMappa = true,
  showDressCode = true,
  showNegozi = true,
  showListaNozze = true,
  showHubGiochi = true,
  galleryStyle = "polaroid",
  puzzleImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
  scratchPhotoUrl = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  quizQuestions = [],
  puzzlePrize = "💃 Hai vinto un ballo speciale con la Sposa!",
  scratchPrize = "🥂 Hai vinto un drink offerto dallo Sposo!",
  quizPrize = "📸 Hai vinto un selfie di gruppo con gli Sposi!",
  cleanSlug = "giulia-e-marco",
  inline = false,
  playWeddingAudio,
}: InvitationTemplateCProps) {
  const colorsList = Array.isArray(colors) && colors.length >= 3
    ? colors
    : ["#FAF7F2", "#FFFFFF", "#E6C687", "#8B5CF6", "#3B0764"];

  const borderCard = colorsList[2] || "#E6C687";
  const accentColor = colorsList[3] || "#8B6508";
  const textColor = colorsList[4] || "#1E293B";

  const mapQuery = encodeURIComponent((locationAddress || locationName || "Villa Rosa").trim());

  // VALUTAZIONE RIGOROSA PER IMMAGINI DI SFONDO D'AUTORE
  const getValidBg = (bg?: string) => {
    if (!bg || bg === "palette" || bg === "#FFFFFF" || !bg.includes("/")) {
      return "/sfondi/carta_pergamena.jpg";
    }
    return bg;
  };

  const activeBg = getValidBg(heroBgImage);

  const safeHeroMedia = heroMediaImage && heroMediaImage.startsWith("http")
    ? heroMediaImage
    : "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80";

  const safeRicevimento = ricevimentoImage && ricevimentoImage.startsWith("http")
    ? ricevimentoImage
    : "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";

  const triggerAudioInteraction = () => {
    if (typeof playWeddingAudio === "function") {
      playWeddingAudio();
    }
  };

  const previewFanCards: CardItem[] = [
    { imgUrl: scratchPhotoUrl, caption: "Il Primo Ballo", author: coupleNames },
    { imgUrl: puzzleImage, caption: "Taglio Torta", author: "Zii Rossi" },
  ];

  return (
    <KineticGrid className="w-full min-h-screen">
      {/* 1. EFFETTO START INIZIALE OVERLAY PER MODELLO C */}
      {introStart === "busta" && (
        <EnvelopeWax
          coupleNames={coupleNames}
          waxSealUrl={waterImageUrl || "/wax-seal.png"}
          inline={inline}
          onOpen={triggerAudioInteraction}
        />
      )}

      {introStart === "nuvole" && (
        <PartingClouds inline={inline} onOpen={triggerAudioInteraction} />
      )}

      {introStart === "lago" && (
        <div className="relative w-full h-52 overflow-hidden border-2 border-sky-300 rounded-3xl">
          <WaterRippleImage
            src={waterImageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"}
            onClick={triggerAudioInteraction}
          />
        </div>
      )}

      {introStart === "cosmos" && (
        <div className="relative w-full h-[320px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]">
          <CosmosHero
            coupleNames={coupleNames}
            weddingDate={`${weddingDateDay} ${weddingDateMonth} ${weddingDateYear}`}
            inline={inline}
            onEnter={triggerAudioInteraction}
          />
        </div>
      )}

      <div className="relative w-full min-h-screen" onClick={triggerAudioInteraction}>
        {/* SFONDO TEXTURE D'AUTORE CARTA PERGAMENA SEMPRE PRESENTE */}
        <div
          className="fixed inset-0 z-0 bg-cover bg-center pointer-events-none opacity-25 transition-opacity"
          style={{ backgroundImage: `url(${activeBg})` }}
        />

        <main className="max-w-xl mx-auto px-4 py-8 space-y-6 relative z-10 text-left">
          
          {/* ZOOM MULTIMEDIALE CON FOTO 1 CERIMONIA & FOTO 2 RICEVIMENTO */}
          {introStart === "expand" && (
            <div className="py-2">
              <ScrollExpandMedia
                bgImageSrc={safeRicevimento}
                mediaSrc={safeHeroMedia}
                title={coupleNames}
                date={`${weddingDateDay} ${weddingDateMonth} ${weddingDateYear}`}
                onExpand={triggerAudioInteraction}
              />
            </div>
          )}

          {/* SLIDE INIZIALE HERO LANDING */}
          <div className="p-6 bg-gradient-to-br from-[#FAF7F2]/90 via-white/90 to-[#FDFBF7]/90 backdrop-blur-xs rounded-3xl border-2 border-[#D4AF37] text-center space-y-3 shadow-md">
            <span className="text-xs uppercase font-bold tracking-widest text-[#8B6508]">IL NOSTRO GIORNO SPECIALE</span>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1E293B]">{coupleNames}</h1>
            <p className="text-sm italic font-serif opacity-90">&quot;{welcomePhrase}&quot;</p>
            <p className="text-xs font-bold text-[#8B6508] uppercase pt-1">{weddingDateDay} {weddingDateMonth} {weddingDateYear}</p>
            <div className="pt-3">
              <a
                href="#rsvp"
                onClick={triggerAudioInteraction}
                className="inline-flex items-center gap-2 text-xs font-bold bg-[#D4AF37] text-slate-900 px-5 py-2.5 rounded-xl shadow-md hover:bg-amber-400 transition-colors cursor-pointer"
              >
                CONFERMA PARTECIPAZIONE <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* AUGURI DEGLI INVITATI */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block text-center">Auguri degli Invitati</span>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-center text-amber-400 mb-1"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
                <p className="text-xs italic font-serif">&quot;Non vediamo l&apos;ora!&quot;</p>
                <span className="text-[9px] font-bold text-slate-600 block mt-1.5">- Marco &amp; Sara</span>
              </div>
              <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-center text-amber-400 mb-1"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
                <p className="text-xs italic font-serif">&quot;Auguri immensi ragazzi!&quot;</p>
                <span className="text-[9px] font-bold text-slate-600 block mt-1.5">- Zii Rossi</span>
              </div>
              <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-center text-amber-400 mb-1"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
                <p className="text-xs italic font-serif">&quot;Ci saremo tutti a brindare!&quot;</p>
                <span className="text-[9px] font-bold text-slate-600 block mt-1.5">- Amici di Sempre</span>
              </div>
            </div>
          </div>

          {/* SEZIONE ALTERNATA 1: CERIMONIA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-5 bg-white/90 backdrop-blur-xs rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs bg-slate-100">
              <img src={safeHeroMedia} alt="Sposi Cerimonia" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-[#8B6508] tracking-wider">La Cerimonia Solenne</span>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">
                {weddingDateDay} {weddingDateMonth} {weddingDateYear} • Presso {locationName}
              </p>
            </div>
          </div>

          {/* SEZIONE ALTERNATA 2: RICEVIMENTO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-5 bg-white/90 backdrop-blur-xs rounded-3xl border border-slate-200 shadow-sm">
            <div className="space-y-2 order-2 md:order-1">
              <span className="text-xs font-bold uppercase text-[#8B6508] tracking-wider">Ricevimento &amp; Gran Gala</span>
              <p className="text-xs font-medium text-slate-600 leading-relaxed">{locationAddress}</p>
            </div>
            <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs order-1 md:order-2 bg-slate-100">
              <img src={safeRicevimento} alt="Ricevimento Festa" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* MODULO DATA & COUNTDOWN */}
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

          {dateMode === "scratch" && (
            <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white/90 backdrop-blur-xs border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif" style={{ color: accentColor }}>
                🎰 Gratta col dito per scoprire la data
              </span>
              <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
            </div>
          )}

          {/* PROGRAMMA DELLA GIORNATA */}
          {scheduleSchema === "howitworks" && (
            <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white/90 backdrop-blur-xs border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: accentColor }}>
                📍 Programma della Giornata
              </span>
              <TimelineHowItWorks items={scheduleItems} accentColor={accentColor} />
            </div>
          )}

          {scheduleSchema === "classico" && (
            <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white/90 backdrop-blur-xs border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: accentColor }}>
                Programma della Giornata
              </span>
              <div className="space-y-2 text-sm font-serif pt-1" style={{ color: textColor }}>
                {scheduleItems.map((item) => (
                  <p key={item.id}>
                    <strong className="font-sans" style={{ color: accentColor }}>{item.time}</strong> — {item.title}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* LOCATION CON MAPPA GOOGLE */}
          {showMappa && (
            <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white/90 backdrop-blur-xs border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5" style={{ color: accentColor }}>
                <MapPin className="w-4 h-4" style={{ color: accentColor }} /> Location del Matrimonio
              </span>
              <h3 className="font-serif font-bold text-xl" style={{ color: textColor }}>{locationName}</h3>
              <p className="text-xs text-slate-600">{locationAddress}</p>

              {showGoogleMapIframe && (
                <div className="w-full h-56 rounded-2xl overflow-hidden border border-slate-200 my-3 shadow-inner relative">
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
                className="inline-flex items-center gap-2 text-xs font-bold text-white px-4 py-2.5 rounded-xl transition-colors shadow-md"
                style={{ backgroundColor: textColor }}
              >
                <MapPin className="w-4 h-4 text-[#D4AF37]" /> Apri Mappa &amp; Indicazioni ↗
              </a>
            </div>
          )}

          {/* DRESS CODE & PALETTE */}
          {showDressCode && (
            <div className="p-6 rounded-3xl shadow-md border text-center space-y-4 bg-white/90 backdrop-blur-xs border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: accentColor }}>
                Dress Code &amp; Palette
              </span>
              <p className="text-xs font-serif leading-relaxed" style={{ color: textColor }}>{dressCodeNotes}</p>

              <div className="flex justify-center gap-2">
                {colorsList.map((color, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: color }} />
                ))}
              </div>

              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Esempi di Abbigliamento Consigliati (Scorri ➔)</span>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                  {outfitPhotos.map((imgUrl, idx) => (
                    <div key={idx} className="w-32 h-44 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 snap-center">
                      <img src={imgUrl} alt={`Outfit ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* NEGOZI CONVENZIONATI */}
          {showNegozi && <PartnerStores stores={partnerStores} showAmazonAffiliate={showAmazonAffiliate} />}

          {/* LISTA NOZZE IBAN */}
          {showListaNozze && (
            <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white/90 backdrop-blur-xs border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5" style={{ color: accentColor }}>
                <Gift className="w-4 h-4" style={{ color: accentColor }} /> Lista Nozze &amp; Coordinate IBAN
              </span>
              <p className="text-xs text-slate-600 font-serif">Il regalo più grande è la vostra presenza. Per chi desidera contribuire al nostro viaggio di nozze:</p>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#1E293B] break-all">{customIban}</div>
            </div>
          )}

          {/* RSVP */}
          <div id="rsvp" className="pt-2">
            <RsvpForm coupleNames={coupleNames} paletteColors={colorsList} rsvpStyle={rsvpStyle} slug={cleanSlug} />
          </div>

          {/* FESTA */}
          {showHubGiochi !== false && (
            <div className="p-6 bg-gradient-to-br from-[#1E293B] to-slate-800 text-white rounded-3xl shadow-2xl text-center space-y-5 border-2 border-[#D4AF37]">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Hub della Festa &amp; Maxischermo
              </span>
              <p className="text-xs text-slate-300">Partecipa al Quiz degli sposi, gioca al Puzzle e carica le tue foto sul Photo Wall!</p>

              <div className="py-2">
                {galleryStyle === "circular" ? (
                  <CircularGallery />
                ) : galleryStyle === "fan" ? (
                  <SocialCards cards={previewFanCards} />
                ) : (
                  <PhotoWallSection photos={[{ id: "1", url: scratchPhotoUrl, caption: "Il primo ballo", author: coupleNames }]} isAgencyDashboard={true} />
                )}
              </div>

              <div className="py-1"><PhotoPuzzle imageSrc={puzzleImage} puzzlePrize={puzzlePrize} /></div>
              <div className="py-1"><ScratchPhoto imageSrc={scratchPhotoUrl} /></div>
              <div className="py-1"><LoveQuiz questions={quizQuestions} /></div>

              <Link href={`/${cleanSlug}/festa`} className="inline-flex items-center gap-2 text-xs font-bold bg-[#D4AF37] text-slate-950 px-6 py-3.5 rounded-xl hover:bg-amber-400 transition-colors shadow-lg cursor-pointer">
                <Heart className="w-4 h-4 fill-slate-950" /> Entra nella Pagina della Festa ↗
              </Link>
            </div>
          )}
        </main>
      </div>
    </KineticGrid>
  );
}
