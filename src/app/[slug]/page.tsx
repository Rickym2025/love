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
import PartnerStores from "@/components/PartnerStores";
import { DRESS_CODE_PALETTES, DRESS_CODE_PHOTOS, WELCOME_PHRASE_PRESETS } from "@/components/agency/constants";

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

  const palettes = DRESS_CODE_PALETTES || [
    { id: "1", name: "Pastello Romantico", colors: ["#FAF7F2", "#FDE68A", "#FCA5A5", "#93C5FD", "#60A5FA"] },
  ];
  const activePalette = palettes[paletteIdx] || palettes[0];

  const photosMap = DRESS_CODE_PHOTOS || {};
  const outfitPhotos = photosMap[paletteIdx % 8] || photosMap[0] || [];

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
        {!isTemplateB && modules.busta3d && (
          <div className="p-6 bg-[#F5EFE6] rounded-3xl border border-[#D4AF37]/40 text-center shadow-lg relative">
            <span className="text-[10px] font-bold text-[#8B6508] uppercase tracking-widest block mb-1">
              ✦ Partecipazione Digitale d&apos;Autore
            </span>
            <h2 className="font-serif font-bold text-2xl text-[#1E293B]">{coupleNames}</h2>
            <div className="relative w-20 h-20 mx-auto my-3 drop-shadow-md">
              <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
            </div>
            <p className="text-xs text-slate-600 font-serif">Siete invitati a celebrare il nostro matrimonio</p>
          </div>
        )}

        <div className="text-center space-y-3 pt-4">
          <span className="text-xs tracking-widest uppercase font-bold text-[#8B6508]">
            Wedding Celebration
          </span>
          <h1 className="text-4xl font-serif font-bold text-[#1E293B] drop-shadow-xs">{coupleNames}</h1>
          <p className="text-sm font-bold text-slate-700">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear}
          </p>
          <blockquote className="text-sm italic font-serif text-[#1E293B] opacity-90 px-4 mt-2 font-medium">
            &quot;{welcomePhrase}&quot;
          </blockquote>
        </div>

        {!isTemplateB && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-[#D4AF37]/40 text-center space-y-2">
            <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider block font-serif">
              ⏳ Il nostro grande giorno inizia tra
            </span>
            <div className="flex justify-center gap-4 text-[#1E293B] font-serif font-bold text-xl">
              <div><span className="block text-2xl text-[#8B6508]">129</span><span className="text-[10px] uppercase text-slate-600 font-sans">Giorni</span></div>
              <span>:</span>
              <div><span className="block text-2xl text-[#8B6508]">14</span><span className="text-[10px] uppercase text-slate-600 font-sans">Ore</span></div>
              <span>:</span>
              <div><span className="block text-2xl text-[#8B6508]">23</span><span className="text-[10px] uppercase text-slate-600 font-sans">Minuti</span></div>
              <span>:</span>
              <div><span className="block text-2xl text-[#8B6508]">17</span><span className="text-[10px] uppercase text-slate-600 font-sans">Secondi</span></div>
            </div>
          </div>
        )}

        {modules.grattaData && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider block font-serif">
              🎰 Gratta col dito per scoprire la data
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
          <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider block font-serif text-base">
            Programma della Giornata
          </span>
          <div className="space-y-2 text-sm text-[#1E293B] font-serif pt-1">
            <p><strong className="text-[#8B6508] font-sans">16:30</strong> — Arrivo ed Accoglienza Ospiti</p>
            <p><strong className="text-[#8B6508] font-sans">17:00</strong> — Cerimonia di Nozze</p>
            <p><strong className="text-[#8B6508] font-sans">18:30</strong> — Aperitivo &amp; Cocktail Hour</p>
            <p><strong className="text-[#8B6508] font-sans">20:00</strong> — Cena di Gala &amp; Taglio Torta</p>
            <p><strong className="text-[#8B6508] font-sans">22:00</strong> — Festa &amp; Open Bar</p>
          </div>
        </div>

        {modules.locationMappa && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#8B6508]" /> Location del Matrimonio
            </span>
            <h3 className="font-serif font-bold text-xl text-[#1E293B]">{locationName}</h3>
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
              className="inline-flex items-center gap-2 text-xs font-bold bg-[#1E293B] text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-colors shadow-md"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" /> Apri Mappa &amp; Indicazioni ↗
            </a>
          </div>
        )}

        {modules.codiceAbbigliamento && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-4">
            <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider block font-serif text-base">
              Dress Code &amp; Palette
            </span>
            <p className="text-xs text-slate-700 font-serif leading-relaxed">{dressCodeNotes}</p>

            <div className="flex justify-center gap-2">
              {activePalette.colors.map((color, i) => (
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
                    <Image src={imgUrl} alt={`Outfit Dress Code ${idx}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {modules.negoziConvenzionati && (
          <PartnerStores stores={[]} />
        )}

        {modules.listaNozzeAmazon && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5">
              <Gift className="w-4 h-4 text-[#8B6508]" /> Lista Nozze &amp; Coordinate IBAN
            </span>
            <p className="text-xs text-slate-600 font-serif">
              Il regalo più grande è la vostra presenza. Per chi desidera contribuire al nostro viaggio di nozze:
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
        <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] text-[#8B6508] font-serif font-bold text-sm">
          Caricamento Invito in corso...
        </div>
      }
    >
      <InvitationContent params={params} />
    </Suspense>
  );
}
