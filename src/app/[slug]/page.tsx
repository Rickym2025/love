"use client";

import React from "react";
import Link from "next/link";
import EnvelopeWax from "@/components/EnvelopeWax";
import AudioPlayer from "@/components/AudioPlayer";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import PartingClouds from "@/components/PartingClouds";
import PartnerStores from "@/components/PartnerStores";
import Marquee from "@/components/Marquee";
import WaterRippleImage from "@/components/ui/water-ripple-image";
import KineticGrid from "@/components/ui/kinetic-grid";
import { ShoppingBag, PartyPopper } from "lucide-react";

export default function InvitationPage({ params }: { params: { slug: string } }) {
  const isDemo2 = params?.slug === "francesca-e-luca";

  // DATI DEMO 1 vs DEMO 2
  const coupleNames = isDemo2 ? "Francesca & Luca" : "Elena & Davide";
  const weddingDate = isDemo2 ? "12 SETTEMBRE 2026" : "24 MAGGIO 2026";
  const locationName = isDemo2 ? "Villa Borromeo, Stresa" : "Villa del Balbianello, Lago di Como";
  
  // MP3 REALI R2 PER FF EDIZIONI
  const customAudioUrl = isDemo2
    ? "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3"
    : "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3";

  // Palette Cerchi Colore Dress Code
  const dressCodeColors = isDemo2
    ? ["#FAF7F2", "#FDE68A", "#FCA5A5", "#93C5FD", "#60A5FA"]
    : ["#FAF7F2", "#D4AF37", "#E5DACB", "#1E293B", "#8B1E24"];

  return (
    <div className={`min-h-screen ${isDemo2 ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"} font-sans pb-24 selection:bg-[#D4AF37] selection:text-white relative`}>
      
      {/* KINETIC GRID: SFONDO CINETICO PER TEMA 2 */}
      {isDemo2 && <KineticGrid className="fixed inset-0 pointer-events-none opacity-20 z-0" />}

      {/* 1. BUSTA CON VERA CERALACCA LOGO public/wax-seal.png */}
      <EnvelopeWax coupleNames={coupleNames} weddingDate={weddingDate} initials={isDemo2 ? "F&L" : "E&D"} />

      {/* 2. AUDIO PLAYER CON BRANO REALE R2 */}
      <AudioPlayer audioUrl={customAudioUrl} songTitle={`Brano Inedito per ${coupleNames} — FF Edizioni`} />

      {/* 3. MARQUEE SCORREVOLE DEDICHE */}
      <div className="relative z-10 my-2">
        <Marquee text="Evviva gli Sposi! 🎉 • Vi aspettiamo per festeggiare insieme • Un giorno unico ed indimenticabile •" />
      </div>

      {/* HERO INTRO ANNOUNCEMENT CON WATER RIPPLE PER TEMA 1 */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center relative z-10">
        <div className={`border-4 border-double ${isDemo2 ? "border-sky-300 bg-white" : "border-[#D4AF37]/40 bg-white/90"} rounded-t-[180px] p-8 md:p-12 shadow-2xl backdrop-blur-sm`}>
          
          {/* WATER RIPPLE IMAGE: RIFRAZIONE ACQUA LAGO DI COMO PER DEMO 1 */}
          {!isDemo2 && (
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 border border-[#D4AF37]/30 shadow-inner">
              <WaterRippleImage src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" alt="Lago di Como" />
            </div>
          )}

          <span className="text-[10px] tracking-[0.3em] font-bold text-[#D4AF37] uppercase block mb-2">
            ✦ PARTECIPAZIONE DI MATRIMONIO ✦
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide my-3 text-[#1E293B]">
            {coupleNames}
          </h1>
          <p className="text-sm font-serif italic text-slate-500 mb-4">{weddingDate}</p>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">{locationName}</p>
        </div>
      </section>

      {/* TEMA 2: EFFETTO NUVOLE 3D (PARTING CLOUDS) */}
      {isDemo2 && (
        <section className="py-4 relative z-10">
          <PartingClouds />
        </section>
      )}

      {/* MODULO GRATTIAMO LA DATA (SCRATCH DATE) */}
      <section className="py-10 px-6 max-w-xl mx-auto text-center relative z-10">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-3">
            🎰 Gratta col Dito per Scoprire la Data delle Nozze!
          </span>
          <ScratchDate day={isDemo2 ? "12" : "24"} month={isDemo2 ? "SETTEMBRE" : "MAGGIO"} year="2026" />
        </div>
      </section>

      {/* PROGRAMMA DELLA GIORNATA (TIMELINE VERTICALE PER TEMA 1) */}
      {!isDemo2 && (
        <section className="py-10 px-6 max-w-2xl mx-auto text-center relative z-10">
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
      <section className="py-10 px-6 max-w-2xl mx-auto text-center relative z-10">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-2">Dress Code &amp; Palette Colori</h3>
          <p className="text-xs text-slate-600 mb-4">
            Vi invitiamo ad indossare abiti eleganti in armonia con le sfumature della nostra palette:
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

      {/* LISTA NOZZE & NEGOZI CONVENZIONATI */}
      <section className="py-10 px-6 max-w-2xl mx-auto text-center relative z-10">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B]">Lista Nozze &amp; Regali</h3>
          <p className="text-xs text-slate-600">
            Per chi desidera farci un pensiero, è possibile consultare i negozi convenzionati in città, la Lista Nozze Amazon o il nostro IBAN:
          </p>

          {/* NEGOZI CONVENZIONATI CLICCABILI CON LOGO */}
          <PartnerStores />

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
      <section className="py-10 px-6 relative z-10">
        <RsvpForm coupleNames={coupleNames} experienceSlug={params.slug} />
      </section>

      {/* BANNER FESTA CON HUB GIOCHI & PHOTO WALL */}
      <section className="py-10 px-6 max-w-xl mx-auto text-center relative z-10">
        <div className="bg-[#1E293B] text-white p-8 rounded-3xl shadow-2xl border border-[#D4AF37] space-y-4">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">
            ✦ GIOCHI &amp; PHOTO WALL DELLA FESTA ✦
          </span>
          <h3 className="font-serif text-2xl font-bold">Accedi alla Festa del Matrimonio!</h3>
          <p className="text-xs text-slate-300">
            Entra nell&apos;Hub Giochi (Love Quiz, Puzzle Foto, Gratta Foto) e partecipa al Guest Photo Wall con 10 filtri!
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
