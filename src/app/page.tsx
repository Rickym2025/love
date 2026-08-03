"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScratchCard from "@/components/ScratchCard";
import Marquee from "@/components/Marquee";
import KineticGrid from "@/components/ui/kinetic-grid";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Smartphone, Tv, ChevronDown } from "lucide-react";

export default function Home() {
  const coupleNames = "Elena & Davide";
  const welcomePhrase = "Due anime, un solo destino. Una storia scritta nel cuore.";

  // Caricamento Dinamico Sistema Orbitale RM Studio
  const [orbitHtml, setOrbitHtml] = useState<string>("");

  useEffect(() => {
    fetch("https://love.rmstudio.app/orbit-template.html")
      .then((res) => res.text())
      .then((html) => setOrbitHtml(html))
      .catch((err) => console.log("Orbit load fallback:", err));
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-x-hidden">
      
      {/* ─── SFONDO CINETICO A PUNTINI DORATI (KINETIC GRID) ─── */}
      <KineticGrid className="fixed inset-0 pointer-events-none opacity-30 z-0" />

      {/* ─── HEADER MINIMALISTA ─── */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-widest uppercase text-[#D4AF37] font-bold">
            RM Studio <span className="text-white">• LOVE</span>
          </span>
        </div>
        <Link
          href="/agency/sposi-in-love"
          className="border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 px-5 py-2 text-[10px] tracking-widest uppercase font-bold rounded-full font-mono"
        >
          Area Agenzie B2B
        </Link>
      </header>

      {/* ─── HERO SECTION PRINCIPALE ─── */}
      <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto text-center relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] block mb-3 font-mono">
          ✦ SAAS #16 RM STUDIO — LE PARTECIPAZIONI DIGITALI D&apos;AUTORE ✦
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
          Il Sito Matrimonio che Lascia il Segno
        </h1>
        <p className="text-base md:text-xl text-slate-300 font-serif italic mt-6 max-w-2xl mx-auto leading-relaxed">
          &quot;{welcomePhrase}&quot;
        </p>

        {/* BOTTONI ACCESSO DEMO */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link
            href="/elena-e-davide"
            className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full text-xs uppercase tracking-wider hover:bg-white transition shadow-lg flex items-center justify-center gap-2 font-mono"
          >
            Esplora Demo 1 (Villa &amp; Lago di Como) <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/francesca-e-luca"
            className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-full text-xs uppercase tracking-wider hover:bg-white hover:text-black transition shadow-lg flex items-center justify-center gap-2 font-mono"
          >
            Esplora Demo 2 (Cielo &amp; Nuvole 3D) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── MARQUEE DEDICHE SCORREVOLI ─── */}
      <div className="my-6 relative z-10">
        <Marquee text="✦ Busta con Ceralacca 3D • Gratta la Data col Dito • Musica FF Edizioni • Guest Photo Wall con Proiettore • Lista Nozze Amazon &amp; IBAN ✦" />
      </div>

      {/* ─── SEZIONE INTERATTIVA: PROVA IL GRATTA LA DATA ─── */}
      <section className="py-20 px-6 bg-black/60 border-y border-white/10 text-center relative z-10 backdrop-blur-md">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] font-mono">Test Interattivo</span>
          <h2 className="font-serif text-3xl font-bold text-white">Prova il Modulo &quot;Gratta la Data&quot; col Dito</h2>
          <p className="text-xs text-slate-400 mb-6">Trascina il cursore o il dito sul riquadro dorato per grattare via la vernice.</p>
          
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 shadow-inner inline-block">
            <ScratchCard day="24" month="MAGGIO" year="2026" />
          </div>
        </div>
      </section>

      {/* ─── SISTEMA ORBITALE DINAMICO RM STUDIO ─── */}
      <section className="py-24 px-6 text-center relative z-10 max-w-4xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase block mb-3 font-mono">Ecosistema Centrale</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">La Rete di Soluzioni RM Studio</h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mb-12">
          Esplora l&apos;ecosistema completo di SaaS verticali e assistenti AI sviluppati da Riccardo Modena.
        </p>

        {/* CONTENITORE ORBITALE */}
        <div className="flex justify-center items-center min-h-[420px]">
          {orbitHtml ? (
            <div dangerouslySetInnerHTML={{ __html: orbitHtml }} />
          ) : (
            <div className="w-[380px] h-[380px] rounded-full border border-white/20 flex items-center justify-center animate-pulse text-xs font-mono text-[#D4AF37]">
              Caricamento Sistema Orbitale...
            </div>
          )}
        </div>
      </section>

      {/* ─── SEZIONE FAQ (DOMANDE FREQUENTI) ─── */}
      <section className="py-24 px-6 max-w-4xl mx-auto relative z-10 border-t border-white/10">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4AF37] block mb-2 font-mono">Supporto &amp; Chiarimenti</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">Domande Frequenti (FAQ)</h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37] mb-2">1. Come funziona la Busta con Ceralacca 3D?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              All&apos;apertura del link, gli ospiti visualizzano una busta d&apos;epoca materica con i nomi degli sposi. Toccando il sigillo in ceralacca dorata o bordeaux, la busta si apre con un&apos;animazione 3D fluida e si attiva contemporaneamente la colonna sonora personalizzata FF Edizioni.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37] mb-2">2. Cos&apos;è la Pagina della Festa e come funziona il Proiettore?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              La Pagina della Festa è dedicata interamente al giorno del matrimonio. Gli ospiti possono scattare foto dallo smartphone, applicare 10 filtri d&apos;autore e caricarle in tempo reale. Attivando la modalità &quot;Maxischermo Proiettore&quot;, le foto fluiscono automaticamente sulla TV o sul proiettore della sala ricevimenti.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-2xl border border-slate-300">
            <h3 className="font-serif text-lg font-bold text-[#D4AF37] mb-2">3. Come accedono le Agenzie e i Wedding Planner?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tramite l&apos;Agency Hub White-Label (`/agency/sposi-in-love`), i professionisti dispongono di 10 crediti annuali, pannello di controllo a colonne trascinabili, 10 temi grafici d&apos;élite e la possibilità di inserire il proprio logo agenzia nel footer.
            </p>
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION AGENZIA B2B ─── */}
      <section className="py-16 px-6 text-center max-w-3xl mx-auto mb-20 relative z-10">
        <div className="bg-gradient-to-b from-white/10 to-white/5 text-white p-10 md:p-14 rounded-[40px] border border-[#D4AF37]/50 space-y-4 shadow-2xl backdrop-blur-xl">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.25em] block font-mono">✦ ACCESSO PROFESSIONALE B2B ✦</span>
          <h3 className="font-serif text-3xl font-bold">Sei un&apos;Agenzia o un Wedding Planner?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Configura in pochi click le partecipazioni dei tuoi clienti con il nostro Studio a 3 colonne ridimensionabili.
          </p>
          <div className="pt-2">
            <Link
              href="/agency/sposi-in-love"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full text-xs uppercase tracking-widest hover:bg-white transition shadow-lg font-mono"
            >
              Apri lo Studio Agenzia (Demo Live) 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 text-center border-t border-white/10 text-xs text-slate-500 font-mono relative z-10">
        <p>© {new Date().getFullYear()} RM Studio • Prodotto &quot;LOVE&quot; SaaS #16 • Tutti i diritti riservati</p>
      </footer>
    </main>
  );
}
