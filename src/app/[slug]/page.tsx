"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Heart, Sparkles, Gift } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import AudioPlayer from "@/components/AudioPlayer";
import Marquee from "@/components/Marquee";
import PartingClouds from "@/components/PartingClouds";
import { DRESS_CODE_PALETTES } from "@/components/agency/AgencyConfigurator";

const DRESS_CODE_PHOTOS: Record<number, string[]> = {
  0: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80",
  ],
  1: [
    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=500&q=80",
  ],
  2: [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=500&q=80",
  ],
};

function InvitationContent({ params }: { params?: { slug?: string } }) {
  const searchParams = useSearchParams();

  const slug = params?.slug || "elena-e-davide";
  const cleanSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "") || "elena-e-davide";

  const template = searchParams?.get("template") || (cleanSlug === "francesca-e-luca" ? "B" : "A");
  const isTemplateB = template === "B";

  const coupleNames =
    searchParams?.get("couple") || (isTemplateB ? "Francesca & Luca" : "Elena & Davide");
  const weddingDateDay = searchParams?.get("day") || "15";
  const weddingDateMonth = searchParams?.get("month") || "Settembre";
  const weddingDateYear = searchParams?.get("year") || "2026";
  const locationName = searchParams?.get("location") || "Villa Rosa";
  const locationAddress = searchParams?.get("address") || "Via Roma 1, Roma";
  const welcomePhrase =
    searchParams?.get("phrase") ||
    "Due anime, un solo destino. Una storia scritta nel cuore.";
  const audioUrl = searchParams?.get("audio") || "";
  const dressCodeNotes =
    searchParams?.get("dress") || "Abiti eleganti nei toni cromatici della palette";
  const paletteIdx = parseInt(searchParams?.get("palette") || "0", 10);
  const activePalette = DRESS_CODE_PALETTES[paletteIdx] || DRESS_CODE_PALETTES[0];
  const outfitPhotos = DRESS_CODE_PHOTOS[paletteIdx % 3] || DRESS_CODE_PHOTOS[0];

  const marqueeText =
    searchParams?.get("marquee") ||
    "✦ Viva gli Sposi! ✦ Auguri di cuore da tutti gli invitati ✦ Un giorno di festa e amore ✦";

  const customIban =
    searchParams?.get("iban") || "IT60 X 05428 11101 000000123456";

  const modules = {
    busta3d: searchParams?.get("busta3d") !== "false",
    grattaData: searchParams?.get("grattaData") !== "false",
    effettoAcqua: searchParams?.get("effettoAcqua") !== "false",
    nuvole3d: searchParams?.get("nuvole3d") !== "false",
    locationMappa: searchParams?.get("locationMappa") !== "false",
    codiceAbbigliamento: searchParams?.get("codiceAbbigliamento") !== "false",
    negoziConvenzionati: searchParams?.get("negoziConvenzionati") !== "false",
    listaNozzeAmazon: searchParams?.get("listaNozzeAmazon") !== "false",
    dedicheMarquee: searchParams?.get("dedicheMarquee") !== "false",
    hubGiochiFesta: searchParams?.get("hubGiochiFesta") !== "false",
    guestPhotoWall: searchParams?.get("guestPhotoWall") !== "false",
    confermaRsvp: searchParams?.get("confermaRsvp") !== "false",
  };

  const mapQuery = encodeURIComponent((locationAddress || locationName || "Villa Rosa").trim());

  return (
    <div
      className={`min-h-screen w-full overflow-x-hidden ${
        isTemplateB ? "bg-[#F0F7FF] text-[#1E293B]" : "bg-[#FAF7F2] text-[#1E293B]"
      }`}
    >
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

      {modules.dedicheMarquee && <Marquee text={marqueeText} />}

      {modules.nuvole3d && <PartingClouds />}

      <main className="max-w-md mx-auto px-4 py-8 space-y-8 relative z-10">
        
        {/* TEMPLATE A: BUSTA AVORIO CON VERA CERALACCA LOGO */}
        {!isTemplateB && modules.busta3d && (
          <div className="p-6 bg-[#F5EFE6] rounded-3xl border border-[#D4AF37]/30 text-center shadow-lg relative">
            <span className="text-[10px] font-bold text-[#B8860B] uppercase tracking-widest block mb-1">
              ✦ Partecipazione Digitale d&apos;Autore
            </span>
            <h2 className="font-serif font-bold text-2xl text-[#1E293B]">{coupleNames}</h2>
            <div className="relative w-20 h-20 mx-auto my-3 drop-shadow-md">
              <Image src="/logo.png" alt="Ceralacca Logo" fill className="object-contain" priority />
            </div>
            <p className="text-xs text-slate-600 font-serif">Siete invitati a celebrare il nostro matrimonio</p>
          </div>
        )}

        {/* HERO SPOSI AD ALTO CONTRASTO CROMATICO */}
        <div className="text-center space-y-3 pt-4">
          <span className="text-xs tracking-widest uppercase font-bold text-[#B8860B]">
            Wedding Celebration
          </span>
          <h1 className="text-4xl font-serif font-bold text-[#1E293B] drop-shadow-sm">{coupleNames}</h1>
          <p className="text-sm font-bold text-slate-600">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear}
          </p>
          <blockquote className="text-sm italic font-serif text-slate-700 opacity-90 px-4 mt-2">
            &quot;{welcomePhrase}&quot;
          </blockquote>
        </div>

        {/* COUNTDOWN TIMER REALE (TEMPLATE A) */}
        {!isTemplateB && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-[#D4AF37]/30 text-center space-y-2">
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider block">
              ⏳ Il grande giorno inizia tra
            </span>
            <div className="flex justify-center gap-4 text-[#1E293B] font-serif font-bold text-xl">
              <div><span className="block text-2xl text-[#B8860B]">129</span><span className="text-[10px] uppercase text-slate-500 font-sans">Giorni</span></div>
              <span>:</span>
              <div><span className="block text-2xl text-[#B8860B]">14</span><span className="text-[10px] uppercase text-slate-500 font-sans">Ore</span></div>
              <span>:</span>
              <div><span className="block text-2xl text-[#B8860B]">35</span><span className="text-[10px] uppercase text-slate-500 font-sans">Minuti</span></div>
            </div>
          </div>
        )}

        {/* GRATTIAMO LA DATA */}
        {modules.grattaData && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider block">
              🎰 Scopri la Data Speciale
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {/* PROGRAMMA DELLA GIORNATA */}
        <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
          <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider block">
            Schedule of Events
          </span>
          <div className="space-y-2 text-sm text-[#1E293B] font-serif pt-1">
            <p><strong className="text-[#B8860B] font-sans">16:30</strong> — Opening of the doors</p>
            <p><strong className="text-[#B8860B] font-sans">17:00</strong> — Ceremony</p>
            <p><strong className="text-[#B8860B] font-sans">18:00</strong> — Cocktail and dancing time</p>
            <p><strong className="text-[#B8860B] font-sans">20:00</strong> — Dinner</p>
            <p><strong className="text-[#B8860B] font-sans">21:00</strong> — Party and Open Bar</p>
          </div>
        </div>

        {/* LOCATION & MAPPA GOOGLE INTEGRATA + PULSANTE ESTERNO */}
        {modules.locationMappa && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider block flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#B8860B]" /> Location del Matrimonio
            </span>
            <h3 className="font-serif font-bold text-xl text-[#1E293B]">{locationName}</h3>
            <p className="text-xs text-slate-600">{locationAddress}</p>

            {/* MAPPA INTERATTIVA INTEGRATA DENTRO L'APP */}
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

            {/* PULSANTE ESTERNO GOOGLE MAPS */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold bg-[#1E293B] text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-md"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" /> Indicazioni Stradali su Google Maps ↗
            </a>
          </div>
        )}

        {/* DRESS CODE CON GALLERIA OUTFIT SCORREVOLE */}
        {modules.codiceAbbigliamento && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-4">
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider block">
              🎨 Dress Code &amp; Palette Cromatica
            </span>
            <p className="text-xs text-slate-600 font-serif">{dressCodeNotes}</p>

            {/* PALETTE COLORI */}
            <div className="flex justify-center gap-2">
              {activePalette.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border border-slate-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            {/* GALLERIA OUTFIT SCORREVOLE */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                Esempi di Outfit Consigliati (Scorri ➔)
              </span>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
                {outfitPhotos.map((imgUrl, idx) => (
                  <div key={idx} className="w-32 h-44 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 snap-center">
                    <Image src={imgUrl} alt={`Outfit Dress Code ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LISTA NOZE */}
        {modules.listaNozzeAmazon && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#B8860B] uppercase tracking-wider block flex items-center justify-center gap-1.5">
              <Gift className="w-4 h-4 text-[#B8860B]" /> Lista Nozze &amp; Coordinate
            </span>
            <p className="text-xs text-slate-600">
              Il regalo più grande è la vostra presenza. Per chi desidera contribuire al nostro viaggio:
            </p>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#1E293B] break-all">
              {customIban}
            </div>
          </div>
        )}

        {/* HUB FESTA */}
        {modules.hubGiochiFesta && (
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

        {/* MODULO RSVP CON CERALACCA */}
        {modules.confermaRsvp && (
          <div className="pt-2">
            <RsvpForm coupleNames={coupleNames} />
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
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] text-[#B8860B] font-serif font-bold text-sm">
          Caricamento Invito in corso...
        </div>
      }
    >
      <InvitationContent params={params} />
    </Suspense>
  );
}
