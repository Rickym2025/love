"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import EnvelopeWax from "@/components/EnvelopeWax";
import AudioPlayer from "@/components/AudioPlayer";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import PartingClouds from "@/components/PartingClouds";
import { ShoppingBag, PartyPopper, Calendar, MapPin, Sparkles } from "lucide-react";

export default function InvitationPage({ params }: { params: { slug: string } }) {
  const isDemo2 = params?.slug === "francesca-e-luca";

  // DATI TEMA 1 vs TEMA 2
  const coupleNames = isDemo2 ? "Francesca & Luca" : "Elena & Davide";
  const weddingDate = isDemo2 ? "12 SETTEMBRE 2026" : "24 MAGGIO 2026";
  const locationName = isDemo2 ? "Villa Borromeo, Stresa" : "Villa del Balbianello, Lago di Como";
  
  // Palette Cerchi Colore Dress Code
  const dressCodeColors = isDemo2
    ? ["#FAF7F2", "#FDE68A", "#FCA5A5", "#93C5FD", "#60A5FA"]
    : ["#FAF7F2", "#D4AF37", "#E5DACB", "#1E293B", "#8B1E24"];

  return (
    <div className={`min-h-screen ${isDemo2 ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"} font-sans pb-24 selection:bg-[#D4AF37] selection:text-white`}>
      {/* 1. BUSTA CON VERA CERALACCA public/wax-seal.png */}
      <EnvelopeWax coupleNames={coupleNames} weddingDate={weddingDate} initials={isDemo2 ? "F&L" : "E&D"} />

      {/* 2. PLAYER MUSICALE FISSO */}
      <AudioPlayer songTitle={`Brano Inedito per ${coupleNames} — FF Edizioni`} />

      {/* ─── HERO INTRO ANNOUNCEMENT ─── */}
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

      {/* ─── TEMA 2: EFFETTO NUVOLE 3D (PARTING CLOUDS) ─── */}
      {isDemo2 && (
        <section className="py-8">
          <PartingClouds>
            <div className="text-center space-y-2">
              <p className="text-xs font-bold text-sky-700">16:30 — Apertura Porte a Villa Borromeo</p>
              <p className="text-xs font-bold text-sky-700">17:30 — Cerimonia e Scambio degli Anelli</p>
            </div>
          </PartingClouds>
        </section>
      )}

      {/* ─── MODULO GRATTIAMO LA DATA (3 TILES SCRATCH DATE) ─── */}
      <section className="py-12 px-6 max-w-xl mx-auto text-center">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-3">
            🎰 Gratta per Scoprire la Data delle Nozze!
          </span>
          <ScratchDate day={isDemo2 ? "12" : "24"} month={isDemo2 ? "SETTEMBRE" : "MAGGIO"} year="2026" />
        </div>
      </section>

      {/* ─── PROGRAMMA FESTEGGIAMENTI COLORATO E VIVACE ─── */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="font-serif text-3xl font-bold text-[#1E293B] mb-4">Programma della Giornata</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/60">
              <span className="text-lg block mb-1">🚪</span>
              <span className="text-xs font-bold text-[#D4AF37] uppercase block">16:30 — Apertura Porte</span>
              <p className="text-xs text-slate-600 mt-1">Accoglienza degli invitati presso {locationName}.</p>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200/60">
              <span className="text-lg block mb-1">💍</span>
              <span className="text-xs font-bold text-rose-600 uppercase block">17:30 — Rito di Nozze</span>
              <p className="text-xs text-slate-600 mt-1">Cerimonia solenne e scambio degli anelli.</p>
            </div>

            <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200/60">
              <span className="text-lg block mb-1">🥂</span>
              <span className="text-xs font-bold text-sky-600 uppercase block">19:00 — Aperitivo sul Lago</span>
              <p className="text-xs text-slate-600 mt-1">Cocktail di benvenuto e intrattenimento musicale.</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200/60">
              <span className="text-lg block mb-1">💃</span>
              <span className="text-xs font-bold text-emerald-600 uppercase block">20:30 — Cena di Galà & Party</span>
              <p className="text-xs text-slate-600 mt-1">Taglio della torta, brindisi e open bar.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DRESS CODE CON GALLERIA & PALETTE CERCHI COLORE ─── */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-2">Dress Code & Palette Colori</h3>
          <p className="text-xs text-slate-600 mb-4">
            Vi invitiamo a scegliere outfit in armonia con le sfumature della nostra palette:
          </p>

          <div className="flex justify-center items-center gap-3 my-4">
            {dressCodeColors.map((color, idx) => (
              <div
                key={idx}
                className="w-8 h-8 rounded-full border-2 border-slate-200 shadow-md transform hover:scale-110 transition"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── LISTA NOZZE AMAZON AFFILIATO & IBAN ─── */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B]">Lista Nozze & Regali</h3>
          <p className="text-xs text-slate-600">
            Per chi desidera farci un pensiero, è possibile consultare la Lista Nozze Amazon o contribuire al nostro viaggio di nozze:
          </p>

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

      {/* ─── MODULO RSVP CONFERMA PARTECIPAZIONE ─── */}
      <section className="py-12 px-6">
        <RsvpForm coupleNames={coupleNames} experienceSlug={params.slug} />
      </section>

      {/* ─── BANNER FESTA E PHOTO WALL GIOCHI ─── */}
      <section className="py-12 px-6 max-w-xl mx-auto text-center">
        <div className="bg-[#1E293B] text-white p-8 rounded-3xl shadow-2xl border border-[#D4AF37] space-y-4">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
            ✦ GIOCHI & PHOTO WALL DELLA FESTA ✦
          </span>
          <h3 className="font-serif text-2xl font-bold">Accedi alla Festa del Matrimonio!</h3>
          <p className="text-xs text-slate-300">
            Il giorno del matrimonio entra nell'Hub Giochi (Love Quiz, Puzzle Foto) e carica le tue foto con i 10 filtri sul proiettore maxischermo!
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
