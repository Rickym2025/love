import React from "react";
import Link from "next/link";
import ScratchCard from "@/components/ScratchCard";
import { Sparkles, Heart, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1E293B] font-sans">
      {/* HERO LANDING PAGE */}
      <section className="py-20 px-6 max-w-4xl mx-auto text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#D4AF37] block mb-3">
          ✦ RM STUDIO SAAS #16 ✦
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-[#1E293B]">
          LOVE — Partecipazioni Digitali d&apos;Autore
        </h1>
        <p className="text-base md:text-lg text-slate-600 font-serif italic mt-4 max-w-2xl mx-auto">
          Crea inviti di nozze unici con Busta 3D in Ceralacca, Gratta la Data, Nuvole 3D e Guest Photo Wall con Proiettore Maxischermo.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            href="/elena-e-davide"
            className="px-6 py-3.5 bg-[#D4AF37] text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 transition shadow-md flex items-center justify-center gap-2"
          >
            Guarda Demo 1 (Elena &amp; Davide) <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/francesca-e-luca"
            className="px-6 py-3.5 bg-sky-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-sky-600 transition shadow-md flex items-center justify-center gap-2"
          >
            Guarda Demo 2 (Francesca &amp; Luca) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* DEMO INTERATTIVA SCRATCH CARD */}
      <section className="py-12 px-6 bg-white border-y border-slate-200 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#1E293B]">Prova il Modulo &quot;Gratta la Data&quot;</h2>
          <ScratchCard revealText="24 MAGGIO 2026" subText="Villa del Balbianello • Lago di Como" />
        </div>
      </section>

      {/* ACCESS HUB AGENZIA */}
      <section className="py-16 px-6 text-center max-w-xl mx-auto">
        <div className="bg-[#1E293B] text-white p-8 rounded-3xl border border-[#D4AF37] space-y-3 shadow-xl">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-widest block">✦ AREA AGENZIE &amp; WEDDING PLANNER ✦</span>
          <h3 className="font-serif text-2xl font-bold">Studio Configuratore White-Label</h3>
          <p className="text-xs text-slate-300">
            Crea e gestisci fino a 10 matrimoni all&apos;anno con il tuo logo agenzia e il pannello a 3 colonne trascinabili.
          </p>
          <Link
            href="/agency/sposi-in-love"
            className="inline-block px-6 py-3 bg-[#D4AF37] text-slate-900 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-amber-400 transition mt-2"
          >
            Entra nello Studio Agenzia 🚀
          </Link>
        </div>
      </section>
    </main>
  );
}
