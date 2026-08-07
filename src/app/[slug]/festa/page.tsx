"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowLeft, Gamepad2, Image as ImageIcon } from "lucide-react";
import PhotoWallSection from "@/components/PhotoWallSection";
import CircularGallery from "@/components/ui/CircularGallery";
import LoveQuiz from "@/components/LoveQuiz";
import PhotoPuzzle from "@/components/PhotoPuzzle";
import ScratchPhoto from "@/components/ScratchPhoto";
import AudioPlayer from "@/components/AudioPlayer";

function FestaContent({ params }: { params?: { slug?: string } }) {
  const searchParams = useSearchParams();

  const slug = params?.slug || "elena-e-davide";
  const cleanSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "") || "elena-e-davide";
  const coupleNames = searchParams?.get("couple") || "Elena & Davide";
  const defaultGalleryMode = searchParams?.get("gallery") || "polaroid";

  // TOGGLE PER CAMBIARE DA POLAROID A GALLERIA 3D CIRCOLARE
  const [selectedGalleryStyle, setSelectedGalleryStyle] = useState<string>(defaultGalleryMode);

  const puzzleImage = searchParams?.get("puzzle") || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";
  const scratchPhotoUrl = searchParams?.get("scratch") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80";
  const audioUrl = searchParams?.get("audio") || "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3";

  // DOMANDE PARSATE DALL'URL O DEFAULTS
  let quizQuestions = [
    {
      question: "Dove ci siamo conosciuti per la prima volta?",
      optionA: "In università",
      optionB: "In discoteca",
      optionC: "Al mare in vacanza",
      optionD: "Tramite amici comuni",
      correctOptionIdx: 0,
    },
    {
      question: "Chi ha fatto la proposta di nozze?",
      optionA: "Elena",
      optionB: "Davide",
      optionC: "Insieme a Parigi",
      optionD: "I genitori",
      correctOptionIdx: 1,
    },
  ];

  try {
    const rawQuiz = searchParams?.get("quiz");
    if (rawQuiz) {
      quizQuestions = JSON.parse(decodeURIComponent(rawQuiz));
    }
  } catch (e) {
    // fallback
  }

  // FOTO PER LA GALLERIA 3D CIRCOLARE
  const circularGalleryItems = [
    {
      common: coupleNames,
      binomial: "Il nostro primo ballo",
      photo: { url: scratchPhotoUrl, text: "Ballo Sposi", by: "Invitati" },
    },
    {
      common: "Taglio della Torta",
      binomial: "Momento Dolce",
      photo: { url: puzzleImage, text: "Torta Nozze", by: "Fotografo" },
    },
    {
      common: "Brindisi con gli Amici",
      binomial: "Festa & Party",
      photo: { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", text: "Brindisi", by: "Amici" },
    },
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden font-sans pb-16 select-none">
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

      {/* HEADER FESTA */}
      <header className="p-4 bg-slate-900/90 border-b border-[#D4AF37]/40 flex justify-between items-center backdrop-blur-md sticky top-0 z-40">
        <Link
          href={`/${cleanSlug}`}
          className="text-xs font-bold text-[#D4AF37] hover:text-white flex items-center gap-1.5 bg-slate-800 px-3.5 py-2 rounded-xl border border-[#D4AF37]/30 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Torna all&apos;Invito
        </Link>
        <span className="text-xs font-serif font-bold text-white flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Pagina Festa &amp; Maxischermo
        </span>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-10 text-center relative z-10">
        {/* HERO FESTA */}
        <div className="space-y-3 p-6 md:p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border-2 border-[#D4AF37] shadow-2xl">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">🎉 RICEVIMENTO &amp; PARTY</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">{coupleNames}</h1>
          <p className="text-xs md:text-sm text-slate-300 font-serif max-w-md mx-auto">
            Partecipa ai giochi, scatta una foto per l&apos;Album del Maxischermo e divertiti insieme agli sposi!
          </p>
        </div>

        {/* CONTROLLO SWITCH GALLERIA (POLAROID vs 3D CIRCOLARE) */}
        <div className="p-5 bg-slate-900 rounded-3xl border-2 border-[#D4AF37]/60 shadow-2xl space-y-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <button
              type="button"
              onClick={() => setSelectedGalleryStyle("polaroid")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedGalleryStyle === "polaroid"
                  ? "bg-[#D4AF37] text-slate-950 shadow-lg scale-105"
                  : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
              }`}
            >
              <ImageIcon className="w-4 h-4" /> Galleria Polaroid
            </button>
            <button
              type="button"
              onClick={() => setSelectedGalleryStyle("circular")}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                selectedGalleryStyle === "circular"
                  ? "bg-[#D4AF37] text-slate-950 shadow-lg scale-105"
                  : "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
              }`}
            >
              <Sparkles className="w-4 h-4" /> Galleria 3D Ruotante
            </button>
          </div>

          {selectedGalleryStyle === "circular" ? (
            <div className="space-y-3 pt-2">
              <span className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-wider block">🎡 Galleria 3D Circolare Ruotante</span>
              <CircularGallery items={circularGalleryItems} />
            </div>
          ) : (
            <PhotoWallSection />
          )}
        </div>

        {/* DIVISORE LUXURY TRA GALLERIA E GIOCHI */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#D4AF37]/40"></div></div>
          <div className="relative px-6 py-2 bg-slate-900 border-2 border-[#D4AF37] rounded-full text-[#D4AF37] font-serif text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl">
            <Gamepad2 className="w-4 h-4 text-[#D4AF37]" /> GIOCHI DELLA FESTA <Gamepad2 className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>

        {/* GIOCHI FESTA CON DIVISORI ELEGANTI */}
        <div className="space-y-8">
          {/* GIOCO 1: PUZZLE */}
          <PhotoPuzzle imageSrc={puzzleImage} />

          <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-serif text-xs tracking-widest opacity-80 my-4">
            <span>✦ ✦ ✦</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Prossimo Gioco</span>
            <span>✦ ✦ ✦</span>
          </div>

          {/* GIOCO 2: GRATTA E SCOPRI */}
          <ScratchPhoto imageSrc={scratchPhotoUrl} />

          <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-serif text-xs tracking-widest opacity-80 my-4">
            <span>✦ ✦ ✦</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Prossimo Gioco</span>
            <span>✦ ✦ ✦</span>
          </div>

          {/* GIOCO 3: QUIZ SPOSI */}
          <LoveQuiz questions={quizQuestions} />
        </div>
      </main>
    </div>
  );
}

export default function FestaPage({ params }: { params?: { slug?: string } }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-[#D4AF37] font-serif font-bold text-sm">
          Caricamento Pagina Festa...
        </div>
      }
    >
      <FestaContent params={params} />
    </Suspense>
  );
}
