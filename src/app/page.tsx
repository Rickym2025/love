"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ScratchCard from "@/components/ScratchCard";
import Marquee from "@/components/Marquee";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Smartphone, Tv } from "lucide-react";

export default function Home() {
  const coupleNames = "Elena & Davide";
  const welcomePhrase = "Due anime, un solo destino. Una storia scritta nel cuore.";

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#1E293B] font-sans selection:bg-[#D4AF37] selection:text-white">
      
      {/* ─── HEADER MINIMALISTA ─── */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-5 border-b border-[#D4AF37]/20 bg-[#FAF7F2]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-widest uppercase text-[#1E293B] font-bold">
            RM Studio <span className="text-[#D4AF37]">• LOVE</span>
          </span>
        </div>
        <Link
          href="/agency/sposi-in-love"
          className="border border-[#D4AF37] text-[#1E293B] hover:bg-[#D4AF37] hover:text-slate-900 transition-all duration-300 px-5 py-2 text-[10px] tracking-widest uppercase font-bold rounded-full"
        >
          Area Agenzie B2B
        </Link>
      </header>

      {/* ─── HERO SECTION PRINCIPALE ─── */}
      <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto text-center relative">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] block mb-3">
          ✦ SAAS #16 RM STUDIO — LE PARTECIPAZIONI DIGITALI D&apos;AUTORE ✦
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-[#1E293B] leading-tight">
          Il Sito Matrimonio che Lascia il Segno
        </h1>
        <p className="text-base md:text-xl text-slate-600 font-serif italic mt-6 max-w-2xl mx-auto leading-relaxed">
          &quot;{welcomePhrase}&quot;
        </p>

        {/* BOTTONI ACCESSO DEMO */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link
            href="/elena-e-davide"
            className="px-8 py-4 bg-[#D4AF37] text-slate-900 font-bold rounded-full text-xs uppercase tracking-wider hover:bg-amber-400 transition shadow-lg flex items-center justify-center gap-2"
          >
            Esplora Demo 1 (Villa &amp; Lago di Como) <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/francesca-e-luca"
            className="px-8 py-4 bg-[#1E293B] text-white font-bold rounded-full text-xs uppercase tracking-wider hover:bg-slate-800 transition shadow-lg flex items-center justify-center gap-2"
          >
            Esplora Demo 2 (Cielo &amp; Nuvole 3D) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── MARQUEE DEDICHE SCORREVOLI ─── */}
      <div className="my-6">
        <Marquee text="✦ Busta con Ceralacca 3D • Gratta la Data col Dito • Musica FF Edizioni • Guest Photo Wall con Proiettore • Lista Nozze Amazon &amp; IBAN ✦" />
      </div>

      {/* ─── SEZIONE INTERATTIVA: PROVA IL GRATTA LA DATA ─── */}
      <section className="py-20 px-6 bg-white border-y border-[#D4AF37]/20 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37]">Test Interattivo</span>
          <h2 className="font-serif text-3xl font-bold text-[#1E293B]">Prova il Modulo &quot;Gratta la Data&quot; col Dito</h2>
          <p className="text-xs text-slate-500 mb-6">Trascina il cursore o il dito sul riquadro dorato per scoprire la data.</p>
          
          <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-[#D4AF37]/30 shadow-sm inline-block">
            <ScratchCard day="24" month="MAGGIO" year="2026" />
          </div>
        </div>
      </section>

      {/* ─── SEZIONE VALORE PER SPOSI & AGENZIE ─── */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4AF37] block mb-2">Perché Scegliere Love</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1E293B]">Ecosistema Tecnologico d&apos;Élite</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#D4AF37]">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E293B]">Busta 3D &amp; Ceralacca</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Un impatto visivo straordinario con busta materica, pieghe tridimensionali e sigillo in ceralacca personalizzato.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#D4AF37]">
              <Tv className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E293B]">Pagina Festa &amp; Maxischermo</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Il giorno delle nozze, gli ospiti caricano foto con 10 filtri d&apos;autore e giocano al Love Quiz proiettando tutto live.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-sm space-y-3">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1E293B]">Agency Hub White-Label</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pannello di controllo a colonne trascinabili per Wedding Planner, 10 crediti matrimoni all&apos;anno e logo agenzia nel footer.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION AGENZIA B2B ─── */}
      <section className="py-16 px-6 text-center max-w-3xl mx-auto mb-20">
        <div className="bg-[#1E293B] text-white p-10 md:p-14 rounded-[40px] border border-[#D4AF37] space-y-4 shadow-2xl">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.25em] block">✦ ACCESSO PROFESSIONALE B2B ✦</span>
          <h3 className="font-serif text-3xl font-bold">Sei un&apos;Agenzia o un Wedding Planner?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Configura in pochi click le partecipazioni dei tuoi clienti con il nostro Studio a 3 colonne ridimensionabili.
          </p>
          <div className="pt-2">
            <Link
              href="/agency/sposi-in-love"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-slate-900 font-bold rounded-full text-xs uppercase tracking-widest hover:bg-amber-400 transition shadow-lg"
            >
              Apri lo Studio Agenzia (Demo Live) 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 text-center border-t border-[#D4AF37]/20 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} RM Studio • Prodotto "LOVE" SaaS #16 • Tutti i diritti riservati</p>
      </footer>
    </main>
  );
}
