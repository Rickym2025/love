'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScratchCard from '@/components/ScratchCard';
import {
  Sparkles,
  Heart,
  CheckCircle2,
  Gift,
  Music,
  MapPin,
  Calendar,
  Users,
  Smartphone,
  Building2,
  ArrowRight,
  ShieldCheck,
  Star,
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'sposi' | 'agenzie'>('sposi');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      
      {/* HEADER / NAVBAR */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-600 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/30">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider text-amber-100">
              LOVE
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 border border-slate-800 px-2 py-0.5 rounded-full ml-1 hidden sm:inline-block">
              RM Studio
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/renzo-e-lucia"
              className="text-xs text-amber-300 hover:text-amber-200 transition-colors hidden sm:block"
            >
              Guarda Demo Live ↗
            </Link>
            <a
              href="#prezzi"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-md active:scale-95"
            >
              Crea Ora
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
        
        {/* TAB SWITCHER: SPOSI VS AGENZIE */}
        <div className="inline-flex p-1.5 rounded-full bg-slate-900 border border-slate-800 mb-8 shadow-inner">
          <button
            onClick={() => setActiveTab('sposi')}
            className={`px-6 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === 'sposi'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Siete gli Sposi?
          </button>
          <button
            onClick={() => setActiveTab('agenzie')}
            className={`px-6 py-2.5 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
              activeTab === 'agenzie'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Wedding Planner & Agenzie
          </button>
        </div>

        {activeTab === 'sposi' ? (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Le Partecipazioni Digitali d'Autore
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-amber-100 leading-tight mb-6 max-w-3xl">
              Stupisci i tuoi invitati con un'esperienza da favola.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Busta interattiva con sigillo in ceralacca, conferma RSVP automatica con intolleranze, colonna sonora inedita e lista nozze integrata. Zero stress per il tuo matrimonio.
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs tracking-widest uppercase mb-6">
              <Building2 className="w-3.5 h-3.5" />
              Soluzione White-Label B2B
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl font-light text-amber-100 leading-tight mb-6 max-w-3xl">
              Aggiungi le Partecipazioni Digitali ai tuoi pacchetti nozze.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Offri ai tuoi clienti siti per matrimoni d'élite con il tuo brand nel footer. Gestione centralizzata degli invitati, export PDF per i catering e margine elevatissimo.
            </p>
          </>
        )}

        {/* DEMO BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link
            href="/renzo-e-lucia"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold hover:from-amber-400 hover:to-amber-500 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Apri Demo "Renzo & Lucia"</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/adamo-ed-eva"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 border border-slate-800 text-slate-200 font-medium hover:border-slate-700 transition-all text-center"
          >
            Demo "Adamo & Eva"
          </Link>
        </div>
      </section>

      {/* SHOWCASE ANTEPRIMA GAMIFICATION (SCRATCH CARD) */}
      <section className="py-16 px-6 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs text-amber-400 uppercase tracking-widest font-medium mb-2 block">
            Esperienza Interattiva
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-4">
            Provato il "Gratta e Scopri"?
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8">
            Gli invitati muovono il dito sullo schermo per svelare la data segreta e la chiesa. Coinvolgimento garantito prima e durante l'evento!
          </p>
          
          <ScratchCard
            revealText="28 SETTEMBRE 2026"
            subText="Chiesa di Pescarenico • Ore 11:00"
          />
        </div>
      </section>

      {/* VANTAGGI E MODULI CHIAVE */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl text-amber-100 mb-4">
            Tutto ciò che serve per il grande giorno
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Un ecosistema completo creato da RM Studio per azzerare l'attrito organizzativo.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2">Busta con Ceralacca 3D</h3>
            <p className="text-slate-400 text-sm">
              Iniziali personalizzate e animazione fluida con coriandoli al tap. Il modo più emozionante per aprire un invito.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2">RSVP & Intolleranze</h3>
            <p className="text-slate-400 text-sm">
              Raccogli presenze, accompagnatori, preferenze menu (carne/pesce/veg) e intolleranze con esportazione immediata per la cucina.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2">Colonna Sonora FF Edizioni</h3>
            <p className="text-slate-400 text-sm">
              Possibilità di integrare un brano musicale inedito e personalizzato, composto ed arrangiato dal Maestro Fausto Fusetti.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2">Lista Nozze Amazon</h3>
            <p className="text-slate-400 text-sm">
              Integrazione bonifico IBAN per il viaggio di nozze e lista desideri Amazon collegata al tuo account.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2">Cloudflare R2 Storage</h3>
            <p className="text-slate-400 text-sm">
              Gli ospiti caricano foto e ricordi della festa in tempo reale senza limiti di banda e alla massima velocità.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2">Mappa GPS & Calendario</h3>
            <p className="text-slate-400 text-sm">
              Pulsanti di avvio rapido per Google Maps, Waze e salvataggio automatico dell'evento sul calendario dello smartphone.
            </p>
          </div>

        </div>
      </section>

      {/* SEZIONE PREZZI */}
      <section id="prezzi" className="py-20 px-6 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl text-amber-100 mb-4">
              Piani Semplici. Zero Abbonamenti Ricorrenti per gli Sposi.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
              Scegli la formula perfetta per le tue esigenze.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            {/* PIANO SPOSI DIRECT */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
              <div>
                <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold block mb-2">
                  Per la Coppia
                </span>
                <h3 className="font-serif text-3xl text-amber-100 mb-2">Sposi Premium</h3>
                <p className="text-slate-400 text-xs mb-6">Tutto incluso per 1 anno completo dal matrimonio.</p>
                <div className="text-4xl font-serif text-amber-100 mb-6">
                  €149 <span className="text-xs text-slate-400 font-sans font-normal">una tantum</span>
                </div>

                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Busta con Ceralacca 3D
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Modulo RSVP e Gestione Menu
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Modulo Scratch Card ("Gratta e scopri")
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Lista Nozze IBAN & Amazon Affiliata
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Upload Foto Ospiti con Cloudflare R2
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20vorrei%20informazioni%20per%20creare%20il%20sito%20Love%20per%20il%20mio%20matrimonio!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-semibold text-center hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg"
              >
                Attiva per il tuo Matrimonio
              </a>
            </div>

            {/* PIANO AGENCY WHITE-LABEL */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 rounded-3xl p-8 flex flex-col justify-between relative shadow-2xl">
              <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Consigliato B2B
              </div>

              <div>
                <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold block mb-2">
                  Per Wedding Planner & Agenzie
                </span>
                <h3 className="font-serif text-3xl text-amber-100 mb-2">Agency Hub</h3>
                <p className="text-slate-400 text-xs mb-6">Pannello multi-matrimonio White-Label.</p>
                <div className="text-4xl font-serif text-amber-100 mb-6">
                  €490 <span className="text-xs text-slate-400 font-sans font-normal">/ anno (Pack 10 Matrimoni)</span>
                </div>

                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> 10 Matrimoni Sbloccati inclusi
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Logo e Brand della tua Agenzia nel Footer
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Export PDF Liste Invitati per Catering
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Puntamento Domini Personalizzati dei Clienti
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" /> Supporto Prioritario Dedicato RM Studio
                  </li>
                </ul>
              </div>

              <a
                href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20sono%20un'agenzia/wedding%20planner%20e%20vorrei%20maggiori%20informazioni%20sul%20piano%20Agency%20Hub%20per%20Love!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-amber-500 text-slate-950 font-semibold text-center hover:bg-amber-400 transition-all shadow-lg"
              >
                Richiedi Licenza Agenzia
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER UFFICIALE */}
      <footer className="py-12 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span className="font-serif text-slate-300 font-bold">LOVE</span>
        </div>
        <p>© 2026 RM Studio di Riccardo Modena • Tutti i diritti riservati</p>
        <p className="mt-1 opacity-60">Sito Ufficiale: https://rmstudio.app</p>

        <div className="flex justify-center gap-6 my-4 text-xs text-slate-400">
          <a
            href="https://rmstudio.app/privacy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors"
          >
            Privacy Policy
          </a>
          <span>•</span>
          <a
            href="https://rmstudio.app/termini.html"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors"
          >
            Termini e Condizioni
          </a>
        </div>
        
      </footer>

    </div>
  );
}
