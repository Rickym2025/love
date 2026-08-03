"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import EnvelopeWax from "@/components/EnvelopeWax";
import AudioPlayer from "@/components/AudioPlayer";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import PartingClouds from "@/components/PartingClouds";
import PartnerStores from "@/components/PartnerStores";
import Marquee from "@/components/Marquee";
import { WaterRippleImage } from "@/components/ui/water-ripple-image";
import KineticGrid from "@/components/ui/kinetic-grid";
import { ShoppingBag, PartyPopper, MapPin } from "lucide-react";

function DynamicInvitationContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const isDemo2 = slug === "francesca-e-luca";

  // DATI DINAMICI (Legge dall'URL trasmesso da AgencyStudio o usa i default)
  const day = searchParams.get("day") || (isDemo2 ? "12" : "24");
  const month = searchParams.get("month") || (isDemo2 ? "SETTEMBRE" : "MAGGIO");
  const year = searchParams.get("year") || "2026";
  const coupleNames = searchParams.get("couple") || (isDemo2 ? "Francesca & Luca" : "Elena & Davide");
  const locationName = searchParams.get("location") || (isDemo2 ? "Villa Borromeo, Stresa" : "Villa del Balbianello, Lago di Como");
  const welcomePhrase = searchParams.get("phrase") || (isDemo2 ? "Un grande amore sotto le stelle." : "Due anime, un solo destino. Una storia scritta nel cuore.");
  const audioFromUrl = searchParams.get("audio");

  const weddingDate = `${day} ${month} ${year}`;

  const customAudioUrl =
    audioFromUrl ||
    (isDemo2
      ? "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3"
      : "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3");

  const dressCodeColors = isDemo2
    ? ["#FAF7F2", "#FDE68A", "#FCA5A5", "#93C5FD", "#60A5FA"]
    : ["#FAF7F2", "#D4AF37", "#E5DACB", "#1E293B", "#8B1E24"];

  return (
    <div className={`min-h-screen ${isDemo2 ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"} font-sans pb-24 relative`}>
      {isDemo2 && <KineticGrid className="fixed inset-0 pointer-events-none opacity-20 z-0" />}

      {/* 1. BUSTA CON VERA CERALACCA */}
      <EnvelopeWax coupleNames={coupleNames} weddingDate={weddingDate} initials={isDemo2 ? "F&L" : "E&D"} />

      {/* 2. PLAYER MUSICALE FISSO */}
      <AudioPlayer audioUrl={customAudioUrl} songTitle={`Brano Inedito per ${coupleNames} — FF Edizioni`} />

      {/* 3. MARQUEE SCORREVOLE */}
      <div className="relative z-10 my-2">
        <Marquee text="Evviva gli Sposi! 🎉 • Vi aspettiamo per festeggiare insieme • Un giorno unico ed indimenticabile •" />
      </div>

      {/* HERO INTRO ANNOUNCEMENT */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center relative z-10">
        <div className={`border-4 border-double ${isDemo2 ? "border-sky-300 bg-white" : "border-[#D4AF37]/40 bg-white/90"} rounded-t-[180px] p-8 md:p-12 shadow-2xl backdrop-blur-sm`}>
          {!isDemo2 && (
            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6 border border-[#D4AF37]/30 shadow-inner">
              <WaterRippleImage src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80" alt="Lago di Como" />
            </div>
          )}

          <span className="text-[10px] tracking-[0.3em] font-bold text-[#D4AF37] uppercase block mb-2">
            ✦ PARTECIPAZIONE DI MATRIMONIO ✦
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold tracking-wide my-3 text-[#1E293B]">{coupleNames}</h1>
          <p className="text-sm font-serif italic text-slate-500 mb-4">&quot;{welcomePhrase}&quot;</p>
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">{locationName}</p>
        </div>
      </section>

      {/* TEMPLATE B: NUVOLE 3D */}
      {isDemo2 && (
        <section className="py-4 relative z-10">
          <PartingClouds />
        </section>
      )}

      {/* GRATTIAMO LA DATA (DATA DINAMICA DALL'URL) */}
      <section className="py-10 px-6 max-w-xl mx-auto text-center relative z-10">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-lg">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] block mb-3">
            🎰 Gratta col Dito per Scoprire la Data delle Nozze!
          </span>
          <ScratchDate day={day} month={month} year={year} />
        </div>
      </section>

      {/* LOCATION MAPPA & INDICAZIONI GRATUITE */}
      <section className="py-10 px-6 max-w-2xl mx-auto text-center relative z-10">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-3">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B]">Location &amp; Indicazioni Stradali</h3>
          <p className="text-xs font-bold text-[#D4AF37] uppercase">{locationName}</p>
          <div className="pt-2">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1E293B] text-white rounded-xl text-xs font-bold uppercase hover:bg-slate-800 transition shadow-md"
            >
              <MapPin className="w-4 h-4 text-[#D4AF37]" /> Indicazioni Stradali su Google Maps ↗
            </a>
          </div>
        </div>
      </section>

      {/* DRESS CODE */}
      <section className="py-10 px-6 max-w-2xl mx-auto text-center relative z-10">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B] mb-2">Dress Code &amp; Palette Colori</h3>
          <div className="flex justify-center items-center gap-3 my-4">
            {dressCodeColors.map((color, idx) => (
              <div key={idx} className="w-8 h-8 rounded-full border-2 border-slate-200 shadow-md transform hover:scale-110 transition" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      </section>

      {/* LISTA NOZZE & NEGOZI CONVENZIONATI */}
      <section className="py-10 px-6 max-w-2xl mx-auto text-center relative z-10">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4">
          <h3 className="font-serif text-2xl font-bold text-[#1E293B]">Lista Nozze &amp; Regali</h3>
          <PartnerStores />
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            <a href="https://www.amazon.it/baby-reg/homepage?tag=zero100store-21" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#FF9900] text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-amber-500 shadow-md">
              <ShoppingBag className="w-4 h-4" /> Lista Nozze Amazon ↗
            </a>
          </div>
        </div>
      </section>

      {/* MODULO RSVP */}
      <section className="py-10 px-6 relative z-10">
        <RsvpForm coupleNames={coupleNames} experienceSlug={slug} />
      </section>

      {/* BANNER FESTA */}
      <section className="py-10 px-6 max-w-xl mx-auto text-center relative z-10">
        <div className="bg-[#1E293B] text-white p-8 rounded-3xl shadow-2xl border border-[#D4AF37] space-y-4">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">✦ GIOCHI &amp; PHOTO WALL DELLA FESTA ✦</span>
          <h3 className="font-serif text-2xl font-bold">Accedi alla Festa del Matrimonio!</h3>
          <Link href={`/${slug}/festa`} className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#D4AF37] text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 transition shadow-lg">
            <PartyPopper className="w-4 h-4" /> Entra nella Pagina della Festa 🎉
          </Link>
        </div>
      </section>
    </div>
  );
}

export default function InvitationPage({ params }: { params: { slug: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-xs font-bold text-[#D4AF37]">Caricamento Partecipazione...</div>}>
      <DynamicInvitationContent slug={params?.slug} />
    </Suspense>
  );
}
