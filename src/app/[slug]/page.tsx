"use client";

import React, { Suspense } from "react";
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

function InvitationContent({ params }: { params?: { slug?: string } }) {
  const searchParams = useSearchParams();

  // Gestione sicura e protetta di params.slug (Evita TypeError su .replace)
  const slug = params?.slug || "elena-e-davide";
  const cleanSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "") || "elena-e-davide";

  const isTemplateB = cleanSlug === "francesca-e-luca" || searchParams?.get("template") === "B";

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
        isTemplateB ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"
      }`}
    >
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

      {modules.dedicheMarquee && <Marquee text={marqueeText} />}

      {modules.nuvole3d && <PartingClouds />}

      <main className="max-w-md mx-auto px-4 py-8 space-y-8 relative z-10">
        {modules.busta3d && (
          <div className="p-6 bg-[#F5EFE6] rounded-3xl border border-[#D4AF37]/30 text-center shadow-lg relative">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
              ✦ Partecipazione Digitale d&apos;Autore
            </span>
            <h2 className="font-serif font-bold text-xl text-[#1E293B]">{coupleNames}</h2>
            <div className="relative w-16 h-16 mx-auto my-3">
              <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
            </div>
            <p className="text-xs text-slate-500 font-serif">Siete invitati a celebrare il nostro matrimonio</p>
          </div>
        )}

        <div className="text-center space-y-3 pt-4">
          <span className="text-xs tracking-widest uppercase font-semibold text-[#D4AF37]">
            Wedding Celebration
          </span>
          <h1 className="text-4xl font-serif font-bold text-[#1E293B]">{coupleNames}</h1>
          <p className="text-sm font-bold text-slate-500">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear}
          </p>
          <blockquote className="text-sm italic font-serif opacity-80 px-4 mt-2">
            &quot;{welcomePhrase}&quot;
          </blockquote>
        </div>

        {modules.grattaData && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
              🎰 Scopri la Data Speciale
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {modules.locationMappa && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4" /> Location del Matrimonio
            </span>
            <h3 className="font-serif font-bold text-lg text-[#1E293B]">{locationName}</h3>
            <p className="text-xs text-slate-500">{locationAddress}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold bg-[#1E293B] text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Apri Mappa &amp; Indicazioni ↗
            </a>
          </div>
        )}

        {modules.codiceAbbigliamento && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">
              🎨 Codice Abbigliamento &amp; Palette
            </span>
            <p className="text-xs text-slate-600">{dressCodeNotes}</p>
            <div className="flex justify-center gap-2 pt-1">
              {activePalette.colors.map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border border-slate-300 shadow-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}

        {modules.listaNozzeAmazon && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block flex items-center justify-center gap-1.5">
              <Gift className="w-4 h-4" /> Lista Nozze &amp; Coordinate
            </span>
            <p className="text-xs text-slate-600">
              Il regalo più grande è la vostra presenza. Per chi desidera contribuire al nostro viaggio:
            </p>
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#1E293B] break-all">
              {customIban}
            </div>
          </div>
        )}

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
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] text-[#D4AF37] font-serif font-bold text-sm">
          Caricamento Invito in corso...
        </div>
      }
    >
      <InvitationContent params={params} />
    </Suspense>
  );
}
