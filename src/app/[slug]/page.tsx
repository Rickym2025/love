"use client";

import React from "react";
import Link from "next/link";
import EnvelopeWax from "@/components/EnvelopeWax";
import AudioPlayer from "@/components/AudioPlayer";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import { Calendar, MapPin, Gift, ShoppingBag, Sparkles, PartyPopper } from "lucide-react";

export default function InvitationPage({ params }: { params: { slug: string } }) {
  const isDemo2 = params?.slug === "francesca-e-luca";

  // Dati Demo 1 (Elena & Davide) e Demo 2 (Francesca & Luca)
  const coupleNames = isDemo2 ? "Francesca & Luca" : "Elena & Davide";
  const weddingDate = isDemo2 ? "12 SETTEMBRE 2026" : "24 MAGGIO 2026";
  const locationName = isDemo2 ? "Villa Borromeo, Stresa" : "Villa del Balbianello, Lago di Como";
  const themeBg = isDemo2 ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]";
  const goldAccent = "#D4AF37";

  // Palette Cerchi Colore Dress Code
  const dressCodeColors = isDemo2
    ? ["#E0F2FE", "#BAE6FD", "#7DD3FC", "#38BDF8", "#0284C7"]
    : ["#FAF7F2", "#FDE68A", "#FCA5A5", "#93C5FD", "#60A5FA"];

  return (
    <div className={`min-h-screen ${themeBg} font-sans pb-24 selection:bg-[#D4AF37] selection:text-white`}>
      {/* 1. BUSTA D'EPOCO CON VERA CERALACCA /wax-seal.png */}
      <EnvelopeWax coupleNames={coupleNames} weddingDate={weddingDate} initials={isDemo2 ? "F&L" : "E&D"} />

      {/* 2. AUDIO PLAYER UNICO */}
      <AudioPlayer songTitle={`Brano Inedito per ${coupleNames} — FF Edizioni`} />

      {/* ─── HERO ANNOUNCEMENT ─── */}
      <section className="py-20 px-6 max-w-3xl mx-auto text-center">
        <div className="border-4 border-double border-[#D4AF37]/40 rounded-t-[180px] p-8 md:p-14 bg-white/80 shadow-2xl backdrop-blur-sm">
          <span className="text-[10px] tracking-[0.3em] font-bold text-[#D4AF37] uppercase block mb-2">
            ✦ PARTECIPAZIONE DI MATRIMONIO ✦
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-[#1E293B] tracking-wide my-4">
            {coupleNames}
          </h1>
          <p className="text-sm font-serif italic text-slate-500 mb-6">{weddingDate}</p>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">{locationName}</p>
        </div>
      </section>

      {/* ─── MODULO: GRATTIAMO LA DATA (SCRATCH DATE) ─── */}
      <section className="py-12 px-6 max-w-xl mx-auto text-center">
        <div className="bg-white p-6 rounded-3xl border border-[#D4AF37]/30 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-2">
            🎰 Gratta col Dito per Scoprire la Data!
          </span>
          <ScratchDate day="24" month="MAGGIO" year="2026" />
        </div>
      </section>

      {/* ─── PROGRAMMA DELLA GIORNATA ─── */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-6">Programma della Giornata</h3>
          <div className="space-y-4 text-xs font-medium text-slate-700">
            <p>16:30 — Arrivo degli Invitati presso {locationName}</p>
            <p>17:30 — Cerimonia di Nozze e Scambio degli Anelli</p>
            <p>19:00 — Aperitivo di Benvenuto vista Lago</p>
            <p>20:30 — Cena di Galà e Taglio della Torta</p>
          </div>
        </div>
      </section>

      {/* ─── DRESS CODE CON PALETTE CERCHI COLORE ─── */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-2">Dress Code & Palette Colori</h3>
          <p className="text-xs text-slate-600 mb-4">
            Saremmo felici se il vostro outfit fosse in armonia con le tonalità del nostro matrimonio:
          </p>
          {/* Cerchi Colore */}
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
        <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B]">Lista Nozze & Regali</h3>
          <p className="text-xs text-slate-600">
            La vostra presenza è per noi il dono più grande. Se desiderate farci un pensiero, potete consultare la nostra Lista Nozze Amazon o contribuire al nostro Viaggio di Nozze:
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            {/* Bottone Amazon Affiliato (tag zero100store-21) */}
            <a
              href="https://www.amazon.it/baby-reg/homepage?tag=zero100store-21"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#FF9900] text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-amber-500 transition shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              Lista Nozze Amazon ↗
            </a>

            {/* IBAN Sposi */}
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#1E293B] flex items-center justify-center">
              IBAN: IT60 X 0542 8111 0000 0012 3456
            </div>
          </div>
        </div>
      </section>

      {/* ─── MODULO CONFERMA PARTECIPAZIONE (RSVP) ─── */}
      <section className="py-12 px-6">
        <RsvpForm coupleNames={coupleNames} />
      </section>

      {/* ─── BANNER ACCESSO ALLA PAGINA FESTA GIOCHI & PHOTO WALL ─── */}
      <section className="py-12 px-6 max-w-xl mx-auto text-center">
        <div className="bg-[#1E293B] text-white p-8 rounded-3xl shadow-2xl border border-[#D4AF37] space-y-4">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
            ✦ PARTY HUB GIORNO DELLE NOZZE ✦
          </span>
          <h3 className="font-serif text-2xl font-bold">Partecipa alla Festa!</h3>
          <p className="text-xs text-slate-300">
            Il giorno del matrimonio accedi all'Hub Giochi (Love Quiz, Puzzle Foto Sposi) e al Guest Photo Wall per proiettare le tue foto dal vivo!
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
