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
import EnvelopeWax from "@/components/EnvelopeWax";
import { DRESS_CODE_PALETTES, DRESS_CODE_PHOTOS, WELCOME_PHRASE_PRESETS } from "@/components/agency/constants";

function InvitationContent({ params }: { params?: { slug?: string } }) {
  const searchParams = useSearchParams();

  const slug = params?.slug || "elena-e-davide";
  const cleanSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "") || "elena-e-davide";

  const template = searchParams?.get("template") || (cleanSlug === "francesca-e-luca" ? "B" : "A");
  const isTemplateB = template === "B";

  const start = searchParams?.get("start") || (isTemplateB ? "nuvole" : "arco");
  const dateMode = searchParams?.get("dateMode") || "countdown";
  const schedule = searchParams?.get("schedule") || "classico";

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

      {start === "nuvole" && modules.nuvole3d && <PartingClouds />}

      <main className="max-w-md mx-auto px-4 py-8 space-y-8 relative z-10">
        
        {start === "busta" && modules.busta3d && (
          <EnvelopeWax coupleNames={coupleNames} />
        )}

        {start === "arco" && (
          <div className="relative w-full h-56 rounded-3xl overflow-hidden shadow-lg border border-[#D4AF37]/30">
            <Image src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" alt="Arco Romano" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/30 flex items-end justify-center pb-4">
              <span className="font-serif font-bold text-sm text-[#8B6508] uppercase tracking-widest bg-white/90 px-4 py-1 rounded-full border border-[#D4AF37]">
                Wedding Day
              </span>
            </div>
          </div>
        )}

        <div className="text-center space-y-3 pt-2">
          <h1 className="text-4xl font-serif font-bold text-[#1E293B] drop-shadow-xs">{coupleNames}</h1>
          <p className="text-sm font-bold text-slate-700">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear}
          </p>
          <blockquote className="text-sm italic font-serif text-[#1E293B] opacity-90 px-4 mt-2 font-medium">
            &quot;{welcomePhrase}&quot;
          </blockquote>
        </div>

        {dateMode === "countdown" && (
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

        {dateMode === "scratch" && modules.grattaData && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider block font-serif">
              🎰 Gratta col dito per scoprire la data
            </span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {/* PROGRAMMA DELLA GIORNATA DINAMICO (5 SCHEMI) */}
        {schedule === "classico" && (
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
        )}

        {schedule === "timeline" && (
          <div className="p-6 bg-white rounded-3xl shadow-sm border border-slate-200 text-center space-y-3">
            <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider block font-serif text-base">
              📍 Timeline Verticale Orari
            </span>
            <div className="relative pl-6 space-y-3 text-left border-l-2 border-[#D4AF37] text-sm text-[#1E293B]">
              <div><span className="font-bold text-[#8B6508]">16:30</span> — Accoglienza Ospiti</div>
              <div><span className="font-bold text-[#8B6508]">17:00</span> — Cerimonia Solenne</div>
              <div><span className="font-bold text-[#8B6508]">18:30</span> — Aperitivo in Giardino</div>
              <div><span className="font-bold text-[#8B6508]">20:00</span> — Cena &amp; Torta</div>
            </div>
          </div>
        )}

        {schedule === "nuvole" && (
          <div className="p-6 bg-sky-50 rounded-3xl shadow-sm border border-sky-200 text-center space-y-3">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider block font-serif text-base">
              ☁️ Programma tra le Nuvole 3D
            </span>
            <div className="space-y-2 text-sm text-[#1E293B]">
              <p><strong>16:30</strong> ☁️ Arrivo Ospiti</p>
              <p><strong>17:00</strong> ☁️ Cerimonia</p>
              <p><strong>18:30</strong> ☁️ Aperitivo</p>
              <p><strong>20:00</strong> ☁️ Cena di Gala</p>
            </div>
          </div>
        )}

        {schedule === "schede" && (
          <div className="grid grid-cols-2 gap-3 text-center text-xs">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 font-bold text-[#1E293B] shadow-sm">
              <span className="text-[#8B6508] block text-xs">16:30</span> Accoglienza
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 font-bold text-[#1E293B] shadow-sm">
              <span className="text-[#8B6508] block text-xs">17:00</span> Cerimonia
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 font-bold text-[#1E293B] shadow-sm">
              <span className="text-[#8B6508] block text-xs">18:30</span> Aperitivo
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 font-bold text-[#1E293B] shadow-sm">
              <span className="text-[#8B6508] block text-xs">20:00</span> Cena &amp; Torta
            </div>
          </div>
        )}

        {schedule === "minimal" && (
          <div className="p-4 text-center space-y-2 font-serif text-sm text-[#1E293B]">
            <p>16:30 • Accoglienza Ospiti</p>
            <p>17:00 • Cerimonia di Nozze</p>
            <p>18:30 • Aperitivo</p>
            <p>20:00 • Cena &amp; Torta</p>
          </div>
        )}

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
              Il regalo più grande è
