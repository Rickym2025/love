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
import PartingClouds from "@/components/PartingClouds";
import PartnerStores from "@/components/PartnerStores";
import EnvelopeWax from "@/components/EnvelopeWax";
import WaterRippleImage from "@/components/ui/water-ripple-image";
import ScrollExpandMedia from "@/components/ui/scroll-expand-media";
import { DRESS_CODE_PALETTES, DRESS_CODE_PHOTOS } from "@/components/agency/constants";

function InvitationContent({ params }: { params?: { slug?: string } }) {
  const searchParams = useSearchParams();

  const slug = params?.slug || "elena-e-davide";
  const cleanSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "") || "elena-e-davide";

  const template = searchParams?.get("template") || (cleanSlug === "francesca-e-luca" ? "B" : "A");
  const isTemplateB = template === "B";

  const start = searchParams?.get("start") || (isTemplateB ? "nuvole" : "busta");
  const dateMode = searchParams?.get("dateMode") || "countdown";
  const schedule = searchParams?.get("schedule") || "classico";

  const coupleNames = searchParams?.get("couple") || (isTemplateB ? "Francesca & Luca" : "Elena & Davide");
  const weddingDateDay = searchParams?.get("day") || "15";
  const weddingDateMonth = searchParams?.get("month") || "Settembre";
  const weddingDateYear = searchParams?.get("year") || "2026";
  const locationName = searchParams?.get("location") || "Villa Rosa";
  const locationAddress = searchParams?.get("address") || "Via Roma 1, Roma";
  const welcomePhrase = searchParams?.get("phrase") || "Due anime, un solo destino. Una storia scritta nel cuore.";
  
  const defaultAudioUrl = isTemplateB
    ? "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3"
    : "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3";
    
  const audioUrl = searchParams?.get("audio") || defaultAudioUrl;
  const dressCodeNotes = searchParams?.get("dress") || "Abiti eleganti nei toni cromatici della palette";
  const paletteIdxStr = searchParams?.get("palette") || "0";
  const paletteIdx = parseInt(paletteIdxStr, 10) || 0;

  const [suonaMusica, setSuonaMusica] = useState(false);

  const palettes = DRESS_CODE_PALETTES || [
    { id: "1", name: "Pastello Romantico", colors: ["#FAF7F2", "#FFF0F5", "#FDE2E4", "#E2F0CB", "#B5E2FA"] },
  ];
  const activePalette = palettes[paletteIdx] || palettes[0];

  const photosMap = DRESS_CODE_PHOTOS || {};
  const outfitPhotos = (photosMap[paletteIdx % 8] || photosMap[0] || []);

  const marqueeText = searchParams?.get("marquee") || `✦ IL MATRIMONIO DI ${coupleNames.toUpperCase()} ✦ BENVENUTI AL NOSTRO GIORNO SPECIALE ✦`;
  const customIban = searchParams?.get("iban") || "IT60 X 05428 11101 000000123456";

  const showBusta = searchParams?.get("busta3d") !== "false";
  const showGrattaData = searchParams?.get("grattaData") !== "false";
  const showNuvole = searchParams?.get("nuvole3d") !== "false";
  const showMappa = searchParams?.get("locationMappa") !== "false";
  const showDressCode = searchParams?.get("codiceAbbigliamento") !== "false";
  const showNegozi = searchParams?.get("negoziConvenzionati") !== "false";
  const showListaNozze = searchParams?.get("listaNozzeAmazon") !== "false";
  const showMarquee = searchParams?.get("dedicheMarquee") !== "false";
  const showHubGiochi = searchParams?.get("hubGiochiFesta") !== "false";
  const showRsvp = searchParams?.get("confermaRsvp") !== "false";

  const rawAddress = locationAddress || locationName || "Villa Rosa";
  const mapQuery = encodeURIComponent(rawAddress.trim());

  return (
    <div
      className="min-h-screen w-full overflow-x-hidden transition-colors"
      style={{ backgroundColor: (activePalette?.colors && activePalette.colors[0]) || "#FAF7F2", color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}
    >
      {(audioUrl || suonaMusica) && (
        <AudioPlayer audioUrl={audioUrl || defaultAudioUrl} />
      )}

      {showMarquee && <Marquee text={marqueeText} coupleNames={coupleNames} />}

      {start === "nuvole" && showNuvole && <PartingClouds onOpen={() => setSuonaMusica(true)} />}

      {start === "expand" && (
        <ScrollExpandMedia
          bgImageSrc="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
          mediaSrc="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
          title={coupleNames}
          date={`${weddingDateDay} ${weddingDateMonth} ${weddingDateYear}`}
          scrollToExpand="Scorri per Ingrandire"
        />
      )}

      <main className="max-w-md mx-auto px-4 py-8 space-y-8 relative z-10">
        {start === "busta" && showBusta && (
          <EnvelopeWax coupleNames={coupleNames} onOpen={() => setSuonaMusica(true)} />
        )}

        {start === "lago" && (
          <div className="w-full h-64 rounded-3xl overflow-hidden shadow-xl border border-sky-300 relative">
            <WaterRippleImage src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80" />
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setSuonaMusica(true)}>
              <div className="relative w-20 h-20 drop-shadow-2xl animate-pulse">
                <Image src="/wax-seal.png" alt="Sigillo Ceralacca Acqua" fill className="object-contain" priority />
              </div>
            </div>
          </div>
        )}

        <div className="text-center space-y-3 pt-2">
          <span className="text-xs uppercase tracking-widest font-bold" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>
            Il Matrimonio di {coupleNames}
          </span>
          <h1 className="text-4xl font-serif font-bold drop-shadow-xs" style={{ color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>{coupleNames}</h1>
          <p className="text-sm font-bold text-slate-700">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear}
          </p>
          <blockquote className="text-sm italic font-serif opacity-90 px-4 mt-2 font-medium" style={{ color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>
            &quot;{welcomePhrase}&quot;
          </blockquote>
        </div>

        {dateMode === "countdown" && (
          <div className="p-6 rounded-3xl shadow-sm border text-center space-y-2" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687" }}>
            <span className="text-xs font-bold uppercase tracking-wider block font-serif" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>
              ⏳ Il nostro grande giorno inizia tra
            </span>
            <div className="flex justify-center gap-4 font-serif font-bold text-xl" style={{ color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>
              <div><span className="block text-2xl" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>129</span><span className="text-[10px] uppercase text-slate-600 font-sans">Giorni</span></div>
              <span>:</span>
              <div><span className="block text-2xl" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>14</span><span className="text-[10px] uppercase text-slate-600 font-sans">Ore</span></div>
              <span>:</span>
              <div><span className="block text-2xl" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>23</span><span className="text-[10px] uppercase text-slate-600 font-sans">Minuti</span></div>
              <span>:</span>
              <div><span className="block text-2xl" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>17</span><span className="text-[10px] uppercase text-slate-600 font-sans">Secondi</span></div>
            </div>
          </div>
        )}

        {dateMode === "scratch" && showGrattaData && (
          <div className="p-6 rounded-3xl shadow-sm border text-center space-y-3" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687" }}>
            <span className="text-xs font-bold uppercase tracking-wider block font-serif" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>
              🎰 Gratta col dito per scoprire la data
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {/* PROGRAMMA DELLA GIORNATA SUI COLORI DELLA PALETTE */}
        {schedule === "classico" && (
          <div className="p-6 rounded-3xl shadow-sm border text-center space-y-3" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687" }}>
            <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>
              Programma della Giornata
            </span>
            <div className="space-y-2 text-sm font-serif pt-1" style={{ color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>
              <p><strong className="font-sans" style={{ color: activePalette?.colors?.[3] }}>16:30</strong> — Arrivo ed Accoglienza Ospiti</p>
              <p><strong className="font-sans" style={{ color: activePalette?.colors?.[3] }}>17:00</strong> — Cerimonia di Nozze</p>
              <p><strong className="font-sans" style={{ color: activePalette?.colors?.[3] }}>18:30</strong> — Aperitivo &amp; Cocktail Hour</p>
              <p><strong className="font-sans" style={{ color: activePalette?.colors?.[3] }}>20:00</strong> — Cena di Gala &amp; Taglio Torta</p>
              <p><strong className="font-sans" style={{ color: activePalette?.colors?.[3] }}>22:00</strong> — Festa &amp; Open Bar</p>
            </div>
          </div>
        )}

        {schedule === "timeline" && (
          <div className="p-6 rounded-3xl shadow-sm border text-center space-y-3" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687" }}>
            <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>
              📍 Timeline Verticale Orari
            </span>
            <div className="relative pl-6 space-y-3 text-left border-l-2 text-sm" style={{ borderColor: (activePalette?.colors && activePalette.colors[3]) || "#D4AF37", color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>
              <div><span className="font-bold" style={{ color: activePalette?.colors?.[3] }}>16:30</span> — Accoglienza Ospiti</div>
              <div><span className="font-bold" style={{ color: activePalette?.colors?.[3] }}>17:00</span> — Cerimonia Solenne</div>
              <div><span className="font-bold" style={{ color: activePalette?.colors?.[3] }}>18:30</span> — Aperitivo in Giardino</div>
              <div><span className="font-bold" style={{ color: activePalette?.colors?.[3] }}>20:00</span> — Cena &amp; Torta</div>
            </div>
          </div>
        )}

        {schedule === "schede" && (
          <div className="grid grid-cols-2 gap-3 text-center text-xs">
            <div className="p-4 rounded-2xl border font-bold shadow-sm" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687", color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>
              <span className="block text-xs" style={{ color: activePalette?.colors?.[3] }}>16:30</span> Accoglienza
            </div>
            <div className="p-4 rounded-2xl border font-bold shadow-sm" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687", color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>
              <span className="block text-xs" style={{ color: activePalette?.colors?.[3] }}>17:00</span> Cerimonia
            </div>
            <div className="p-4 rounded-2xl border font-bold shadow-sm" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687", color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>
              <span className="block text-xs" style={{ color: activePalette?.colors?.[3] }}>18:30</span> Aperitivo
            </div>
            <div className="p-4 rounded-2xl border font-bold shadow-sm" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687", color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>
              <span className="block text-xs" style={{ color: activePalette?.colors?.[3] }}>20:00</span> Cena &amp; Torta
            </div>
          </div>
        )}

        {schedule === "minimal" && (
          <div className="p-4 text-center space-y-2 font-serif text-sm" style={{ color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>
            <p>16:30 • Accoglienza Ospiti</p>
            <p>17:00 • Cerimonia di Nozze</p>
            <p>18:30 • Aperitivo</p>
            <p>20:00 • Cena &amp; Torta</p>
          </div>
        )}

        {showMappa && (
          <div className="p-6 rounded-3xl shadow-sm border text-center space-y-3" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687" }}>
            <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>
              <MapPin className="w-4 h-4" style={{ color: activePalette?.colors?.[3] }} /> Location del Matrimonio
            </span>
            <h3 className="font-serif font-bold text-xl" style={{ color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>{locationName}</h3>
            <p className="text-xs text-slate-600">{locationAddress}</p>

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

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-white px-4 py-2.5 rounded-xl transition-colors shadow-md"
              style={{ backgroundColor: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" /> Apri Mappa &amp; Indicazioni ↗
            </a>
          </div>
        )}

        {showDressCode && (
          <div className="p-6 rounded-3xl shadow-sm border text-center space-y-4" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#D4AF37" }}>
            <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>
              Dress Code &amp; Palette
            </span>
            <p className="text-xs font-serif leading-relaxed" style={{ color: (activePalette?.colors && activePalette.colors[4]) || "#1E293B" }}>{dressCodeNotes}</p>

            <div className="flex justify-center gap-2">
              {(activePalette?.colors || []).map((color, i) => (
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
                {(outfitPhotos || []).map((imgUrl, idx) => (
                  <div key={idx} className="w-32 h-44 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 snap-center">
                    <Image src={imgUrl} alt={`Outfit Dress Code ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showNegozi && (
          <PartnerStores stores={[]} />
        )}

        {showListaNozze && (
          <div className="p-6 rounded-3xl shadow-sm border text-center space-y-3" style={{ backgroundColor: (activePalette?.colors && activePalette.colors[1]) || "#FFFFFF", borderColor: (activePalette?.colors && activePalette.colors[2]) || "#E6C687" }}>
            <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5" style={{ color: (activePalette?.colors && activePalette.colors[3]) || "#8B6508" }}>
              <Gift className="w-4 h-4" style={{ color: activePalette?.colors?.[3] }} /> Lista Nozze &amp; Coordinate IBAN
            </span>
            <p className="text-xs text-slate-600 font-serif">
              Il regalo più grande è la vostra presenza. Per chi desidera contribuire al nostro viaggio di nozze:
            </p>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#1E293B] break-all">
              {customIban}
            </div>
          </div>
        )}

        {/* MODULO RSVP DINAMICO SULLE PALETTE COLORI */}
        {showRsvp && (
          <div className="pt-2">
            <RsvpForm coupleNames={coupleNames} paletteColors={activePalette?.colors} />
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
