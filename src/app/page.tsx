"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart, Gift, MapPin, Smartphone, CheckCircle, ArrowRight, Music, UserCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] font-sans selection:bg-[#D4AF37] selection:text-slate-900">
      
      {/* HEADER / NAVBAR */}
      <header className="w-full border-b border-[#D4AF37]/30 bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="LOVE Logo" fill className="object-contain" priority />
            </div>
            <div>
              <span className="font-serif font-bold text-xl tracking-tight text-[#1E293B] block">LOVE</span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#B8860B] block">Le Partecipazioni Digitali d&apos;Autore</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-600">
            <a href="#features" className="hover:text-[#B8860B] transition-colors">Funzionalità</a>
            <a href="#demo" className="hover:text-[#B8860B] transition-colors">Esempi Invito</a>
            <a href="#pricing" className="hover:text-[#B8860B] transition-colors">Prezzi</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/agency/sposi-in-love"
              className="text-xs font-bold bg-[#1E293B] text-white px-4 py-2.5 rounded-xl hover:bg-slate-800 transition-all shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Studio Agenzia B2B
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/50 shadow-sm">
          <Sparkles className="w-4 h-4 text-[#B8860B]" />
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">
            Ecosistema d&apos;Autore per Matrimoni Unici
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1E293B] leading-tight">
          L&apos;Invito Digitale che Trasforma il tuo Matrimonio in un&apos;Esperienza Indimenticabile
        </h1>

        <p className="text-base md:text-lg text-slate-600 font-serif max-w-2xl mx-auto leading-relaxed">
          Busta d&apos;epoca 3D con vera ceralacca, grattabile interattivo della data, colonne sonore inedite, lista nozze Amazon ed RSVP avanzato.
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4" id="demo">
          <Link
            href="/elena-e-davide"
            target="_blank"
            className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-slate-900 text-sm font-bold rounded-2xl shadow-xl hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
          >
            Guarda Demo Template A (Arco &amp; Cigni) <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/francesca-e-luca?template=B"
            target="_blank"
            className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-300 text-[#1E293B] text-sm font-bold rounded-2xl hover:border-[#D4AF37] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            Guarda Demo Template B (Cielo &amp; Nuvole)
          </Link>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-16 px-6 bg-white border-y border-slate-200" id="features">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">Funzionalità Esclusive</span>
            <h2 className="text-3xl font-serif font-bold text-[#1E293B]">Tutto ciò che serve per il tuo Matrimonio Digitale</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-[#B8860B]">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Busta 3D &amp; Ceralacca</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Sigillo in ceralacca bordeaux con logo ed animazione fluida d&apos;apertura busta d&apos;epoca.</p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-[#B8860B]">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Gratta la Data col Dito</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Vernice dorata da grattare via con gesture touch per scoprire il giorno del matrimonio.</p>
            </div>

            <div className="p-6 bg-[#FAF7F2] rounded-3xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-2xl flex items-center justify-center text-[#B8860B]">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Mappa Integrata &amp; Indicazioni</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Mappa Google interattiva integrata senza uscire dall&apos;invito + pulsante indicazioni stradali.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-16 px-6 max-w-5xl mx-auto space-y-12" id="pricing">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B]">Piani Commerciali</span>
          <h2 className="text-3xl font-serif font-bold text-[#1E293B]">Scegli la Soluzione Perfetta per Te</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* B2C SPOSI */}
          <div className="p-8 bg-white rounded-3xl border-2 border-slate-200 shadow-md space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block">B2C — Per gli Sposi</span>
              <h3 className="font-serif font-bold text-2xl text-[#1E293B]">Invito Singolo Sposi</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-serif font-bold text-[#1E293B]">€149</span>
                <span className="text-xs text-slate-500 font-bold">/ una tantum</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#B8860B]" /> Sito matrimonio attivo per 1 anno</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#B8860B]" /> Busta 3D con Ceralacca d&apos;Autore</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#B8860B]" /> Modulo RSVP con intolleranze</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#B8860B]" /> Lista Nozze Amazon &amp; IBAN</li>
              </ul>
            </div>
            <Link href="/agency/sposi-in-love" className="w-full text-center py-3.5 bg-[#1E293B] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all block">
              Crea Invito Sposi
            </Link>
          </div>

          {/* B2B AGENZIE */}
          <div className="p-8 bg-white rounded-3xl border-2 border-[#D4AF37] shadow-xl space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-[#D4AF37] text-slate-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
              Consigliato
            </div>
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-[#B8860B] block">B2B — Agency Hub</span>
              <h3 className="font-serif font-bold text-2xl text-[#1E293B]">Wedding Planner &amp; Agenzie</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-serif font-bold text-[#1E293B]">€490</span>
                <span className="text-xs text-slate-500 font-bold">/ anno</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#B8860B]" /> 10 Matrimoni inclusi all&apos;anno</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#B8860B]" /> Studio a 3 colonne ridimensionabili</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#B8860B]" /> Logo agenzia White-Label</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-[#B8860B]" /> Export Excel per Catering</li>
              </ul>
            </div>
            <Link href="/agency/sposi-in-love" className="w-full text-center py-3.5 bg-[#D4AF37] text-slate-900 text-xs font-bold rounded-xl hover:bg-amber-400 transition-all block shadow-md">
              Accedi allo Studio Agenzia
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} LOVE — Le Partecipazioni Digitali d&apos;Autore. All rights reserved.</p>
      </footer>
    </div>
  );
}
