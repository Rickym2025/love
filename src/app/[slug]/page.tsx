"use client";

import React from "react";
import Link from "next/link";
import EnvelopeWax from "@/components/EnvelopeWax";
import AudioPlayer from "@/components/AudioPlayer";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import PartingClouds from "@/components/PartingClouds";
import { ShoppingBag, PartyPopper, Store } from "lucide-react";

export default function InvitationPage({ params }: { params: { slug: string } }) {
  const isDemo2 = params?.slug === "francesca-e-luca";

  // DATI DEMO 1 vs DEMO 2
  const coupleNames = isDemo2 ? "Francesca & Luca" : "Elena & Davide";
  const weddingDate = isDemo2 ? "12 SETTEMBRE 2026" : "24 MAGGIO 2026";
  const locationName = isDemo2 ? "Villa Borromeo, Stresa" : "Villa del Balbianello, Lago di Como";
  
  // URL Brani Inediti FF Edizioni
  const customAudioUrl = isDemo2
    ? "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    : "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  // Negozi Convenzionati
  const partnerStoreName = "Gioielleria Valenza — Lista Nozze in Corso";

  return (
    <div className={`min-h-screen ${isDemo2 ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"} font-sans pb-24 selection:bg-[#D4AF37] selection:text-white`}>
      {/* 1. BUSTA D'EPOCA CON VERA CERALACCA LOGO */}
      <EnvelopeWax coupleNames={coupleNames} weddingDate={weddingDate} initials={isDemo2 ? "F&L" : "E&D"} />

      {/* 2. AUDIO PLAYER CON BRANO INEDITO FF EDIZIONI */}
      <AudioPlayer audioUrl={customAudioUrl} songTitle={`Brano Inedito per ${coupleNames} — FF Edizioni`} />

      {/* HERO ANNOUNCEMENT */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center relative">
        <div className={`border-4 border-double ${isDemo2 ? "border-sky-300 bg-white" : "border-[#D4AF37]/40 bg-white/90"} rounded-t-[180px] p-8 md:p-14 shadow-2xl backdrop-blur-sm`}>
          <span className="text-[10px] tracking-[0.3em] font-bold text-[#D4AF37] uppercase block mb-2">
            ✦ PARTECIPAZIONE DI MATRIMONIO ✦
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide my-4 text-[#1E293B]">
            {coupleNames}
          </h1>
          <p className="text-sm font-serif italic text-slate-500 mb-6">{weddingDate}</p>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">{locationName}</p>
        </div>
      </section>

      {/* TEMPLATE B: EFFETTO NUVOLE 3D CON TIMELINE APERTA ALLO SCROLL */}
      {isDemo2 && (
        <section className="py-4">
          <PartingClouds />
        </section>
      )}

      {/* MODULO GRATTIAMO LA DATA (3 TILES SCRATCH DATE) */}
      <section className="py-12 px-6 max-w-xl mx-auto text-center">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-3">
            🎰 Gratta col Dito per Scoprire la Data delle Nozze!
          </span>
          <ScratchDate day={isDemo2 ? "12" : "24"} month={isDemo2 ? "SETTEMBRE" : "MAGGIO"} year="2026" />
        </div>
      </section>

      {/* PROGRAMMA DELLA GIORNATA (TIMELINE CONTINUA VERTICALE) */}
      {!isDemo2 && (
        <section className="py-12 px-6 max-w-2xl mx-auto text-center">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
            <h3 className="font-serif text-3xl font-bold text-[#1E293B] mb-8">Programma dell&apos;Evento</h3>
            
            <div className="relative border-l-2 border-[#D4AF37] ml-1/2 left-1/2 -translate-x-1/2 space-y-8 pl-6 text-left">
              <div>
                <span className="font-serif text-lg font-bold text-[#D4AF37] block">16:30</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E293B]">Apertura Porte &amp; Accoglienza Ospiti</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-[#D4AF37] block">17:30</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E293B]">Cerimonia Solenne di Nozze</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-[#D4AF37] block">19:00</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E293B]">Aperitivo Vista Lago &amp; Cocktail</span>
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-[#D4AF37] block">20:30</span>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#1E293B]">Cena di Gala &amp; Taglio Torta</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* DRESS CODE CON CERCHI COLORE */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-2">Dress Code &amp; Palette Colori</h3>
          <p className="text-xs text-slate-600 mb-4">
            Vi invitiamo ad indossare abiti eleganti in armonia con le sfumature della nostra palette:
          </p>
          <div className="flex justify-center items-center gap-3 my-4">
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 bg-[#FAF7F2] shadow-md" />
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 bg-[#FDE68A] shadow-md" />
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 bg-[#FCA5A5] shadow-md" />
            <div className="w-8 h-8 rounded-full border-2 border-slate-200 bg-[#93C5FD] shadow-md" />
          </div>
        </div>
      </section>

      {/* LISTA NOZZE, AMAZON & NEGOZI CONVENZIONATI */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B]">Lista Nozze &amp; Regali</h3>
          <p className="text-xs text-slate-600">
            Per chi desidera farci un pensiero, è possibile consultare la Lista Nozze Amazon, i negozi convenzionati o contribuire al nostro viaggio:
          </p>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 text-xs text-slate-700 flex items-center justify-center gap-2">
            <Store className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-bold">{partnerStoreName}</span>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a
              href="https://www.amazon.it/baby-reg/homepage?tag=zero100store-21"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#FF9900] text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-amber-500 transition shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              Lista Nozze Amazon ↗
            </a>

            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#1E293B] flex items-center justify-center">
              IBAN: IT60 X 0542 8111 0000 0012 3456
            </div>
          </div>
        </div>
      </section>

      {/* MODULO RSVP */}
      <section className="py-12 px-6">
        <RsvpForm coupleNames={coupleNames} experienceSlug={params.slug} />
      </section>

      {/* BANNER FESTA */}
      <section className="py-12 px-6 max-w-xl mx-auto text-center">
        <div className="bg-[#1E293B] text-white p-8 rounded-3xl shadow-2xl border border-[#D4AF37] space-y-4">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
            ✦ GIOCHI &amp; PHOTO WALL DELLA FESTA ✦
          </span>
          <h3 className="font-serif text-2xl font-bold">Accedi alla Festa del Matrimonio!</h3>
          <p className="text-xs text-slate-300">
            Il giorno delle nozze entra nell&apos;Hub Giochi e carica le tue foto con i 10 filtri per la proiezione live dal vivo!
          </p>

          <Link
            href={`/${params.slug}/festa`}
            className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 transition shadow-lg"
          >
            <PartyPopper className="w-4 h-4" />
            Entra nella Pagina della Festa 🎉
          </Link>
        </div>
      </section>
    </div>
  );
}
