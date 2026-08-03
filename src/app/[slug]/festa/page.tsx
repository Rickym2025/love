"use client";

import React, { useState } from "react";
import PhotoWallSection from "@/components/PhotoWallSection";
import LoveQuiz from "@/components/LoveQuiz";
import PhotoPuzzle from "@/components/PhotoPuzzle";
import ScratchPhoto from "@/components/ScratchPhoto";
import { PartyPopper, Gamepad2, Tv, Sparkles } from "lucide-react";

export default function PartyPage({ params }: { params: { slug: string } }) {
  const coupleNames = params?.slug === "francesca-e-luca" ? "Francesca & Luca" : "Elena & Davide";
  const [activeTab, setActiveTab] = useState<"games" | "photowall">("photowall");

  return (
    <div className="min-h-screen bg-[#1E293B] text-white font-sans pb-24">
      
      {/* HEADER FESTA */}
      <header className="py-12 px-6 text-center border-b border-slate-700 bg-slate-900/60 backdrop-blur-md">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] block mb-2">
          ✦ WEDDING PARTY HUB ✦
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white tracking-wide">
          La Festa di {coupleNames}
        </h1>
        <p className="text-xs text-slate-400 mt-2">Gioca, scatta e condividi i tuoi ricordi in tempo reale sul maxischermo!</p>

        {/* SWITCH TAB GIOCHI / PHOTO WALL */}
        <div className="flex justify-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab("photowall")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "photowall" ? "bg-[#D4AF37] text-slate-900" : "bg-slate-800 text-slate-300"
            }`}
          >
            📸 Guest Photo Wall (10 Filtri)
          </button>
          <button
            onClick={() => setActiveTab("games")}
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
              activeTab === "games" ? "bg-[#D4AF37] text-slate-900" : "bg-slate-800 text-slate-300"
            }`}
          >
            🎮 Hub Giochi Sposi
          </button>
        </div>
      </header>

      {/* ─── TAB 1: GUEST PHOTO WALL ─── */}
      {activeTab === "photowall" && (
        <main className="py-8">
          <PhotoWallSection coupleNames={coupleNames} />
        </main>
      )}

      {/* ─── TAB 2: HUB GIOCHI SPOSI CON PREMI ─── */}
      {activeTab === "games" && (
        <main className="py-8 max-w-4xl mx-auto px-6 space-y-12">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-bold text-[#D4AF37]">Sfida gli altri Invitati!</h2>
            <p className="text-xs text-slate-400 mt-1">Vinci premi esclusivi offerti dagli sposi per la serata.</p>
          </div>

          {/* GAME 1: LOVE QUIZ */}
          <div className="bg-slate-800/80 p-6 rounded-3xl border border-[#D4AF37]/30 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-[#D4AF37]">
              <Gamepad2 className="w-5 h-5" />
              <h3 className="font-serif text-xl font-bold">1. Il Love Quiz della Coppia</h3>
            </div>
            <p className="text-xs text-slate-300 mb-4">Rispondi alle 3 domande sulla storia degli sposi per vincere un 🍹 Drink al Bar!</p>
            <LoveQuiz coupleNames={coupleNames} />
          </div>

          {/* GAME 2: PUZZLE FOTO SPOSI */}
          <div className="bg-slate-800/80 p-6 rounded-3xl border border-[#D4AF37]/30 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-[#D4AF37]">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif text-xl font-bold">2. Puzzle Foto Sposi</h3>
            </div>
            <p className="text-xs text-slate-300 mb-4">Ricomponi le tessere del puzzle 3x3 nel minor tempo possibile per aggiudicarti un 💃 Ballo con la Sposa o 🕺 Ballo con lo Sposo!</p>
            <PhotoPuzzle />
          </div>

          {/* GAME 3: GRATTA LA FOTO */}
          <div className="bg-slate-800/80 p-6 rounded-3xl border border-[#D4AF37]/30 shadow-xl">
            <div className="flex items-center gap-2 mb-4 text-[#D4AF37]">
              <PartyPopper className="w-5 h-5" />
              <h3 className="font-serif text-xl font-bold">3. Gratta e Scopri la Foto Segreta</h3>
            </div>
            <ScratchPhoto />
          </div>
        </main>
      )}
    </div>
  );
}
