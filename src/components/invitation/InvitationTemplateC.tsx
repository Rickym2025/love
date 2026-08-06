"use client";

import React from "react";
import Image from "next/image";
import { Star, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import RsvpForm from "@/components/RsvpForm";

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
  heroMediaImage?: string;
  heroBgImage?: string;
  customIban?: string;
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
  heroMediaImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  heroBgImage = "palette",
}: InvitationTemplateCProps) {
  const accentColor = colors[3] || "#8B6508";
  const textColor = colors[4] || "#1E293B";
  const bgCard = colors[1] || "#FFFFFF";

  const hasCustomBg = heroBgImage && heroBgImage !== "palette" && heroBgImage !== "#FFFFFF";

  return (
    <main className="max-w-3xl mx-auto px-4 py-6 space-y-8 relative z-10 text-left">
      {/* 1. HEADER / NAVBAR (LOGO A SINISTRA - MENU A DESTRA) */}
      <header className="flex justify-between items-center p-4 bg-white/95 rounded-2xl border border-slate-200/80 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 shrink-0">
            <Image src="/logo.png" alt="Logo Sposi" fill className="object-contain" priority unoptimized />
          </div>
          <span className="font-serif font-bold text-sm text-[#1E293B]">{coupleNames}</span>
        </div>
        <nav className="flex items-center gap-4 text-xs font-bold text-[#8B6508]">
          <a href="#dettagli" className="hover:text-amber-600 transition-colors">Dettagli</a>
          <a href="#rsvp" className="px-3 py-1.5 bg-[#D4AF37] text-slate-900 rounded-lg shadow-xs hover:bg-amber-400 transition-colors">RSVP</a>
        </nav>
      </header>

      {/* 2. SLIDE INIZIALE HERO (COSA FAI - A CHI TI RIVOLGI - CTA DIRETTA) */}
      <section
        className="p-8 rounded-3xl border-2 border-[#D4AF37] text-center space-y-4 shadow-xl relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: hasCustomBg ? `url(${heroBgImage})` : undefined,
          backgroundColor: bgCard,
        }}
      >
        {hasCustomBg && <div className="absolute inset-0 bg-white/85 backdrop-blur-xs pointer-events-none" />}

        <div className="relative z-10 space-y-3">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#8B6508] block">
            ✦ IL MATRIMONIO DI {coupleNames.toUpperCase()} ✦
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1E293B] leading-tight">
            {coupleNames}
          </h1>
          <p className="text-sm md:text-base font-serif italic text-slate-700 max-w-lg mx-auto">
            &quot;{welcomePhrase}&quot;
          </p>
          <div className="pt-3">
            <a
              href="#rsvp"
              className="inline-flex items-center gap-2 text-xs md:text-sm font-bold bg-[#D4AF37] text-slate-900 px-6 py-3 rounded-xl shadow-lg hover:bg-amber-400 transition-all cursor-pointer transform hover:scale-105"
            >
              CONFERMA LA TUA PARTECIPAZIONE <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. RECENSIONI / AUGURI DEGLI INVITATI (3 CARD VERDI / ACCENTO SIDE-BY-SIDE) */}
      <section className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block text-center">
          Auguri &amp; Pensieri degli Invitati
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 shadow-sm text-center space-y-1">
            <div className="flex justify-center text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
            <p className="text-xs italic font-serif text-slate-800">&quot;Non vediamo l&apos;ora di festeggiare insieme a voi!&quot;</p>
            <span className="text-[10px] font-bold text-emerald-800 block mt-1">- Marco &amp; Sara</span>
          </div>

          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 shadow-sm text-center space-y-1">
            <div className="flex justify-center text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
            <p className="text-xs italic font-serif text-slate-800">&quot;Un giorno speciale per una coppia straordinaria.&quot;</p>
            <span className="text-[10px] font-bold text-emerald-800 block mt-1">- Zii Rossi</span>
          </div>

          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 shadow-sm text-center space-y-1">
            <div className="flex justify-center text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
            <p className="text-xs italic font-serif text-slate-800">&quot;Ci saremo tutti per brindare alla vostra felicità!&quot;</p>
            <span className="text-[10px] font-bold text-emerald-800 block mt-1">- Amici di Sempre</span>
          </div>
        </div>
      </section>

      {/* 4. BLOCCO ALTERNATO 1: IMMAGINE A SINISTRA - DESCRIZIONE A DESTRA */}
      <section id="dettagli" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 bg-white/95 rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-full h-56 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs">
          <img src={heroMediaImage} alt="Cerimonia Sposi" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-3 text-left">
          <span className="text-xs font-bold uppercase text-[#8B6508] tracking-wider block">
            📍 La Cerimonia Solenne
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1E293B]">{locationName}</h3>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            Vi aspettiamo il <strong>{weddingDateDay} {weddingDateMonth} {weddingDateYear}</strong> presso {locationName}. La cerimonia si terrà alle ore 16:30.
          </p>
          <p className="text-xs text-slate-500 font-mono">{locationAddress}</p>
        </div>
      </section>

      {/* 5. BLOCCO ALTERNATO 2: DESCRIZIONE A SINISTRA - IMMAGINE A DESTRA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 bg-white/95 rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-3 text-left order-2 md:order-1">
          <span className="text-xs font-bold uppercase text-[#8B6508] tracking-wider block">
            🍷 Ricevimento &amp; Gran Gala
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1E293B]">Cena &amp; Open Bar</h3>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            A seguire festeggeremo insieme con un aperitivo di benvenuto nei giardini della villa, la cena di gala e la festa con DJ Set fino a tarda notte.
          </p>
        </div>
        <div className="w-full h-56 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs order-1 md:order-2">
          <img
            src={outfitPhotos[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"}
            alt="Ricevimento"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 6. MODULO RSVP PARTECIPAZIONE */}
      <section id="rsvp" className="pt-2">
        <RsvpForm coupleNames={coupleNames} paletteColors={colors} rsvpStyle={rsvpStyle} />
      </section>

      {/* 7. LANDING FOOTER STRUTTURATO (P.IVA - PRIVACY POLICY - COOKIE POLICY - CONTATTI DIRETTI) */}
      <footer className="p-6 bg-slate-900 text-slate-400 rounded-3xl text-xs text-center space-y-3 shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-serif font-bold text-sm">
            <Image src="/logo.png" alt="Logo Footer" width={24} height={28} className="object-contain" unoptimized />
            <span>{coupleNames}</span>
          </div>
          <div className="flex gap-4 text-[10px] text-slate-300">
            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#D4AF37]" /> info@matrimonio.it</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#D4AF37]" /> +39 06 1234567</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#D4AF37]" /> {locationName}</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[10px]">
          <p>© {new Date().getFullYear()} {coupleNames} — Tutti i diritti riservati.</p>
          <div className="flex gap-3 text-slate-400 underline">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="/termini" className="hover:text-white transition-colors">Cookie Policy</a>
            <span>P.IVA / C.F. 01234567890</span>
          </div>
        </div>
        <p className="text-[#D4AF37] text-[9px] pt-1">Powered by LOVE White-Label Hub d&apos;Autore</p>
      </footer>
    </main>
  );
}
