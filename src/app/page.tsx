'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScratchCard from '@/components/ScratchCard';
import OrbitWidget from '@/components/OrbitWidget';
import Marquee from '@/components/Marquee';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import KineticGrid from '@/components/ui/kinetic-grid';
import {
  Sparkles,
  Heart,
  CheckCircle2,
  Building2,
  ArrowRight,
  ChevronDown,
  BookOpen,
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'sposi' | 'agenzie'>('sposi');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const testimonials = [
    {
      name: 'Sofia & Lorenzo',
      role: 'Sposi 2025',
      text: 'I nostri invitati sono impazziti per il sigillo in ceralacca e per il gioco dello Scratch per scoprire la data!',
      stars: 5,
    },
    {
      name: 'Elena Valenti',
      role: 'Wedding Planner (Milano)',
      text: 'Agency Hub mi ha permesso di offrire le partecipazioni digitali nei miei pacchetti Luxury con l\'export Excel per i catering.',
      stars: 5,
    },
    {
      name: 'Marco & Giulia',
      role: 'Sposi 2026',
      text: 'La canzone su misura prodotta con FF Edizioni ha fatto commuovere tutti all\'apertura del sito.',
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: 'Come funziona l\'invio della partecipazione agli invitati?',
      a: 'Riceverai un link unico e personalizzato (es: love.rmstudio.app/elena-e-davide?guest=Mario+Rossi). Potrai inviarlo con un tap su WhatsApp, e-mail o tramite QR Code sulle partecipazioni fisiche.',
    },
    {
      q: 'Gli invitati devono scaricare un\'applicazione?',
      a: 'No! LOVE è una Web-App nativa ultra-veloce. Si apre dal browser di qualsiasi smartphone senza alcuna installazione.',
    },
    {
      q: 'Dove trovo la Dashboard Risultati?',
      a: 'Ogni matrimonio ha una sua Dashboard riservata raggiungibile all\'indirizzo love.rmstudio.app/dashboard/elena-e-davide dove scaricare l\'Excel per il catering.',
    },
  ];

  return (
    <KineticGrid className="min-h-screen bg-[#F7F3E9] text-[#4A3D39]">
      
      {/* NAVBAR CON LOGO 3 DA PUBLIC/LOGO.PNG */}
      <header className="border-b border-[#E5DACB] bg-[#F7F3E9]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="LOVE RM Studio"
              className="w-10 h-10 object-contain rounded-xl shadow-md"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <span className="font-serif text-2xl font-bold tracking-wider text-[#4A3D39] block leading-none">
                LOVE
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#8B1E24] font-bold">
                RM STUDIO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/elena-e-davide" className="text-xs text-[#8B1E24] hover:underline font-bold hidden md:block">
              Demo "Elena & Davide" ↗
            </Link>
            <Link href="/francesca-e-luca" className="text-xs text-[#1976D2] hover:underline font-bold hidden md:block">
              Demo "Francesca & Luca" ↗
            </Link>
            <a href="https://blogs.rmstudio.app/love/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#D4AF37] flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Blog
            </a>
            <a href="#prezzi" className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-white text-xs font-bold shadow-md">
              Crea Ora
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION CON ANIMATED GRADIENT */}
      <section className="relative pt-16 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
        <AnimatedGradient config={{ preset: 'WarmGold' }} radius="100px" className="px-6 py-2 mb-8">
          <div className="inline-flex p-1 rounded-full bg-white/90 border border-[#E5DACB]">
            <button
              onClick={() => setActiveTab('sposi')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'sposi' ? 'bg-[#8B1E24] text-white shadow-md' : 'text-[#9E8976]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" /> Siete gli Sposi?
            </button>
            <button
              onClick={() => setActiveTab('agenzie')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'agenzie' ? 'bg-[#8B1E24] text-white shadow-md' : 'text-[#9E8976]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Wedding Planner & Agenzie
            </button>
          </div>
        </AnimatedGradient>

        <h1 className="font-serif text-4xl sm:text-7xl font-normal text-[#4A3D39] leading-tight mb-6 max-w-4xl">
          Stupisci i tuoi invitati con un'esperienza da favola.
        </h1>
        <p className="text-[#9E8976] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Busta d'epoca con sigillo in ceralacca dorata, giochi come lo Scratch della Data, colonna sonora inedita e lista nozze integrata.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link href="/elena-e-davide" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#8B1E24] text-white font-bold shadow-lg flex items-center justify-center gap-2">
            <span>Demo "Elena & Davide"</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/francesca-e-luca" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1976D2] text-white font-bold shadow-lg flex items-center justify-center gap-2">
            <span>Demo "Francesca & Luca"</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* GAMIFICATION SHOWCASE */}
      <section className="py-16 px-6 bg-[#EFE7D8]/80 border-y border-[#E5DACB]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-2 block">
            Esperienza Interattiva
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3D39] mb-4">
            Prova il "Gratta e Scopri" con il dito!
          </h2>
          <ScratchCard revealText="28 SETTEMBRE 2026" subText="Chiesa di Pescarenico • Ore 11:00" />
        </div>
      </section>

      {/* STRISCIA SCORREVOLE AUTOMATICA COMMENTI UTENTI */}
      <section className="py-16 bg-[#F7F3E9] border-b border-[#E5DACB]">
        <div className="max-w-6xl mx-auto text-center mb-6 px-6">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold block mb-2">Recensioni & Feedback</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3D39]">Cosa dicono Sposi e Wedding Planner</h2>
        </div>
        <Marquee items={testimonials} />
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#4A3D39] mb-4">Domande Frequenti</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white border border-[#E5DACB] rounded-2xl overflow-hidden shadow-sm">
              <button onClick={() => toggleFaq(index)} className="w-full p-6 text-left font-serif text-lg text-[#4A3D39] flex items-center justify-between">
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-[#9E8976] border-t border-[#E5DACB]/50 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SISTEMA ORBITALE RM STUDIO */}
      <section className="py-12 border-t border-[#E5DACB]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">Ecosistema RM Studio</span>
          <OrbitWidget />
        </div>
      </section>

      {/* PREZZI */}
      <section id="prezzi" className="py-20 px-6 bg-[#EFE7D8]/80 border-t border-[#E5DACB]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A3D39] mb-4">Piani Semplici. Zero Abbonamenti.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#F7F3E9] border border-[#E5DACB] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">Per la Coppia</span>
                <h3 className="font-serif text-3xl text-[#4A3D39] mb-2">Sposi Premium</h3>
                <div className="text-4xl font-serif text-[#8B1E24] mb-6">€149 <span className="text-xs text-[#9E8976] font-normal">una tantum</span></div>
                <ul className="space-y-3 text-sm text-[#4A3D39] mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Busta d'epoca con Ceralacca</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Modulo Conferma Partecipazione</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Gioco "Gratta per svelare la Data"</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Lista Nozze IBAN & Amazon Affiliata</li>
                </ul>
              </div>
              <a href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20vorrei%20informazioni%20per%20creare%20il%20sito%20Love!" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-white font-bold text-center text-xs uppercase tracking-wider block shadow-md">
                Attiva per il tuo Matrimonio
              </a>
            </div>

            <div className="bg-[#F7F3E9] border-2 border-[#D4AF37] rounded-3xl p-8 flex flex-col justify-between shadow-md">
              <div>
                <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">Per Wedding Planner & Agenzie</span>
                <h3 className="font-serif text-3xl text-[#4A3D39] mb-2">Agency Hub</h3>
                <div className="text-4xl font-serif text-[#8B1E24] mb-6">€490 <span className="text-xs text-[#9E8976] font-normal">/ anno (10 Matrimoni)</span></div>
                <ul className="space-y-3 text-sm text-[#4A3D39] mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> 10 Matrimoni Sbloccati inclusi</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Logo della tua Agenzia nel Footer</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Export Excel Liste Invitati per Catering</li>
                </ul>
              </div>
              <a href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20sono%20un'agenzia%20e%20vorrei%20maggiori%20informazioni!" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl bg-[#8B1E24] text-white font-bold text-center text-xs uppercase tracking-wider block shadow-md">
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
      </footer>

    </KineticGrid>
  );
}
