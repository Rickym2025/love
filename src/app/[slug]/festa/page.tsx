"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, Heart, ArrowLeft } from "lucide-react";
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
  const galleryStyle = searchParams?.get("gallery") || "polaroid";
  const puzzleImage = searchParams?.get("puzzle") || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";
  const scratchPhotoUrl = searchParams?.get("scratch") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80";
  const audioUrl = searchParams?.get("audio") || "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3";

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden font-sans pb-12 select-none">
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

      {/* HEADER FESTA */}
      <header className="p-4 bg-slate-900/90 border-b border-[#D4AF37]/40 flex justify-between items-center backdrop-blur-md sticky top-0 z-40">
        <Link
          href={`/${cleanSlug}`}
          className="text-xs font-bold text-[#D4AF37] hover:text-white flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-xl border border-[#D4AF37]/30 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Torna all&apos;Invito
        </Link>
        <span className="text-xs font-serif font-bold text-white flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Pagina Festa &amp; Maxischermo
        </span>
      </header>

      <main className="max-w-xl mx-auto px-4 py-8 space-y-8 text-center relative z-10">
        {/* HERO FESTA */}
        <div className="space-y-2 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border-2 border-[#D4AF37] shadow-2xl">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">🎉 RICEVIMENTO &amp; PARTY</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">{coupleNames}</h1>
          <p className="text-xs text-slate-300 font-serif">
            Partecipa ai giochi, scatta una foto per il Maxischermo e divertiti insieme agli sposi!
          </p>
        </div>

        {/* GALLERIA FOTOGRAFICA SELEZIONATA (3D CIRCOLARE O POLAROID) */}
        <div className="p-4 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl">
          {galleryStyle === "circular" ? (
            <div className="space-y-2">
              <span className="text-xs font-serif font-bold text-[#D4AF37] uppercase block">🎡 Galleria 3D Circolare Ruotante</span>
              <CircularGallery />
            </div>
          ) : (
            <PhotoWallSection />
          )}
        </div>

        <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-2">✦ ✦ ✦ DIVISORIO GIOCHI FESTA ✦ ✦ ✦</div>

        {/* GIOCHI FESTA CON DIVISORI */}
        <div className="space-y-6">
          <PhotoPuzzle imageSrc={puzzleImage} />
          <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-2">✦ ✦ ✦</div>
          <ScratchPhoto imageSrc={scratchPhotoUrl} />
          <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-2">✦ ✦ ✦</div>
          <LoveQuiz />
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
