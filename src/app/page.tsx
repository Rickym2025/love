'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScratchCard from '@/components/ScratchCard';
import OrbitWidget from '@/components/OrbitWidget';
import {
  Sparkles,
  Heart,
  CheckCircle2,
  Gift,
  Music,
  MapPin,
  Smartphone,
  Building2,
  ArrowRight,
  ChevronDown,
  Star,
  Users,
  BookOpen,
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'sposi' | 'agenzie'>('sposi');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3D39] selection:bg-[#8B1E24] selection:text-white">
      
      {/* NAVBAR */}
      <header className="border-b border-[#E5DACB] bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B1E24] to-[#D4AF37] flex items-center justify-center text-white shadow-md">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider text-[#4A3D39]">
              LOVE
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#8B1E24] border border-[#8B1E24]/20 px-2.5 py-0.5 rounded-full bg-[#8B1E24]/5 hidden sm:inline-block">
              RM Studio
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/elena-e-davide"
              className="text-xs text-[#8B1E24] hover:text-[#6E1216] transition-colors hidden md:block font-semibold"
            >
              Demo "Elena & Davide" ↗
            </Link>
            <Link
              href="/francesca-e-luca"
              className="text-xs text-[#1976D2] hover:text-[#1565C0] transition-colors hidden md:block font-semibold"
            >
              Demo "Francesca & Luca" ↗
            </Link>

            <a
              href="https://blogs.rmstudio.app/love/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#8B1E24] hover:underline flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blog</span>
            </a>

            <a
              href="#prezzi"
              className="px-6 py-2.5 rounded-full bg-[#8B1E24] text-white text-xs font-bold hover:bg-[#6E1216] transition-all shadow-md active:scale-95"
            >
              Crea Ora
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
        
        <div className="inline-flex p-1.5 rounded-full bg-[#F4EFE6] border border-[#E5DACB] mb-8 shadow-sm">
          <button
            onClick={() => setActiveTab('sposi')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'sposi'
                ? 'bg-[#8B1E24] text-white shadow-md'
                : 'text-[#9E8976] hover:text-[#4A3D39]'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Siete gli Sposi?
          </button>
          <button
            onClick={() => setActiveTab('agenzie')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'agenzie'
                ? 'bg-[#8B1E24] text-white shadow-md'
                : 'text-[#9E8976] hover:text-[#4A3D39]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Wedding Planner & Agenzie
          </button>
        </div>

        {activeTab === 'sposi' ? (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B1E24]/10 border border-[#8B1E24]/20 text-[#8B1E24] text-xs tracking-widest uppercase mb-6 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Partecipazioni Digitali d'Autore
            </div>
            <h1 className="font-serif text-4xl sm:text-7xl font-normal text-[#4A3D39] leading-tight mb-6 max-w-4xl">
              Stupisci i tuoi invitati con un'esperienza d'altri tempi.
            </h1>
            <p className="text-[#9E8976] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Busta d'epoca ricamata con sigillo in ceralacca, giochi interattivi come il Gratta e Scopri la Data, colonna sonora inedita e lista nozze integrata.
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B1E24]/10 border border-[#8B1E24]/20 text-[#8B1E24] text-xs tracking-widest uppercase mb-6 font-semibold">
              <Building2 className="w-3.5 h-3.5" />
              Soluzione White-Label B2B
            </div>
            <h1 className="font-serif text-4xl sm:text-7xl font-normal text-[#4A3D39] leading-tight mb-6 max-w-4xl">
              Aggiungi le Partecipazioni Digitali ai tuoi pacchetti.
            </h1>
            <p className="text-[#9E8976] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Offri ai tuoi clienti siti per matrimoni d'élite con il tuo brand nel footer. Gestione centralizzata degli invitati ed export Excel per il catering.
            </p>
          </>
        )}

        {/* DEMO BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link
            href="/elena-e-davide"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#8B1E24] text-white font-bold hover:bg-[#6E1216] transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Demo "Elena & Davide"</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/francesca-e-luca"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1976D2] text-white font-bold hover:bg-[#1565C0] transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>Demo "Francesca & Luca"</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* SISTEMA ORBITALE RM STUDIO */}
      <section className="py-12 border-t border-[#E5DACB]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">
            Ecosistema RM Studio
          </span>
          <h3 className="font-serif text-2xl text-[#4A3D39]">
            LOVE fa parte dei SaaS d'élite di RM Studio
          </h3>
          <OrbitWidget />
        </div>
      </section>

      {/* SEZIONE PREZZI */}
      <section id="prezzi" className="py-20 px-6 bg-[#F4EFE6] border-t border-[#E5DACB]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A3D39] mb-4">
              Piani Semplici. Zero Abbonamenti.
            </h2>
            <p className="text-[#9E8976] text-sm max-w-md mx-auto">
              Scegli la formula perfetta per le tue esigenze.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            <div className="bg-[#FAF7F2] border border-[#E5DACB] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">
                  Per la Coppia
                </span>
                <h3 className="font-serif text-3xl text-[#4A3D39] mb-2">Sposi Premium</h3>
                <p className="text-[#9E8976] text-xs mb-6">Tutto incluso per 1 anno completo dal matrimonio.</p>
                <div className="text-4xl font-serif text-[#8B1E24] mb-6">
                  €149 <span className="text-xs text-[#9E8976] font-sans font-normal">una tantum</span>
                </div>

                <ul className="space-y-3 text-sm text-[#4A3D39] mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B1E24]" /> Busta d'epoca con Ceralacca</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B1E24]" /> Modulo Conferma Partecipazione</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B1E24]" /> Gioco "Gratta per svelare la Data"</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B1E24]" /> Lista Nozze IBAN & Amazon Affiliata</li>
                </ul>
              </div>

              <a
                href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20vorrei%20informazioni%20per%20creare%20il%20sito%20Love%20per%20il%20mio%20matrimonio!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#8B1E24] text-white font-bold text-center hover:bg-[#6E1216] transition-all shadow-md uppercase tracking-wider text-xs"
              >
                Attiva per il tuo Matrimonio
              </a>
            </div>

            <div className="bg-[#FAF7F2] border-2 border-[#D4AF37] rounded-3xl p-8 flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">
                  Per Wedding Planner & Agenzie
                </span>
                <h3 className="font-serif text-3xl text-[#4A3D39] mb-2">Agency Hub</h3>
                <p className="text-[#9E8976] text-xs mb-6">Pannello multi-matrimonio White-Label.</p>
                <div className="text-4xl font-serif text-[#8B1E24] mb-6">
                  €490 <span className="text-xs text-[#9E8976] font-sans font-normal">/ anno (10 Matrimoni)</span>
                </div>

                <ul className="space-y-3 text-sm text-[#4A3D39] mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B1E24]" /> 10 Matrimoni Sbloccati inclusi</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B1E24]" /> Logo e Brand della tua Agenzia nel Footer</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#8B1E24]" /> Export Excel Liste Invitati per Catering</li>
                </ul>
              </div>

              <a
                href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20sono%20un'agenzia/wedding%20planner%20e%20vorrei%20maggiori%20informazioni%20sul%20piano%20Agency%20Hub%20per%20Love!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#8B1E24] text-white font-bold text-center hover:bg-[#6E1216] transition-all shadow-md uppercase tracking-wider text-xs"
              >
                Richiedi Licenza Agenzia
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-[#E5DACB] text-center text-xs text-[#9E8976]">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <Heart className="w-4 h-4 text-[#8B1E24] fill-[#8B1E24]" />
          <span className="font-serif text-[#4A3D39] font-bold">LOVE</span>
        </div>
        <p>© 2026 RM Studio di Riccardo Modena • Tutti i diritti riservati</p>

        <div className="flex justify-center gap-6 my-4 text-xs font-medium">
          <a href="https://blogs.rmstudio.app/love/" target="_blank" rel="noopener noreferrer" className="text-[#8B1E24] font-bold">
            Blog LOVE
          </a>
          <span>•</span>
          <a href="https://rmstudio.app/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="https://rmstudio.app/termini.html" target="_blank" rel="noopener noreferrer" className="hover:underline">
            Termini e Condizioni
          </a>
        </div>

        <p className="mt-1 opacity-60">Sito Ufficiale: https://rmstudio.app</p>
      </footer>

    </div>
  );
}
