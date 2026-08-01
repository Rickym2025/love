'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScratchCard from '@/components/ScratchCard';
import OrbitWidget from '@/components/OrbitWidget';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import KineticGrid from '@/components/ui/kinetic-grid';
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
      q: 'Posso esportare la lista per la location/catering?',
      a: 'Certamente. Dalla tua Dashboard riservata potrai scaricare in ogni momento il file Excel/CSV completo con presenze, menu ed intolleranze alimentari.',
    },
    {
      q: 'Come funziona la canzone personalizzata di FF Edizioni?',
      a: 'Creiamo un brano d\'autore inedito (in collaborazione con il Maestro Fausto Fusetti, iscritto SIAE) cucito sulla vostra storia d\'amore.',
    },
  ];

  return (
    <KineticGrid className="min-h-screen bg-[#FAF7F2] text-[#4A3D39]">
      
      {/* NAVBAR */}
      <header className="border-b border-[#E5DACB] bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#8B1E24] flex items-center justify-center text-white shadow-md">
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
              className="text-xs text-[#8B1E24] hover:underline font-bold hidden md:block"
            >
              Demo "Elena & Davide" ↗
            </Link>
            <Link
              href="/francesca-e-luca"
              className="text-xs text-[#1976D2] hover:underline font-bold hidden md:block"
            >
              Demo "Francesca & Luca" ↗
            </Link>

            <a
              href="https://blogs.rmstudio.app/love/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Blog</span>
            </a>

            <a
              href="#prezzi"
              className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-white text-xs font-bold hover:bg-[#B59226] transition-all shadow-md active:scale-95"
            >
              Crea Ora
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION CON ANIMATED GRADIENT AURORA */}
      <section className="relative pt-16 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
        
        <AnimatedGradient config={{ preset: 'Aurora' }} radius="100px" className="px-6 py-2 mb-8">
          <div className="inline-flex p-1 rounded-full bg-white/80 border border-[#E5DACB]">
            <button
              onClick={() => setActiveTab('sposi')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
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
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'agenzie'
                  ? 'bg-[#8B1E24] text-white shadow-md'
                  : 'text-[#9E8976] hover:text-[#4A3D39]'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Wedding Planner & Agenzie
            </button>
          </div>
        </AnimatedGradient>

        {activeTab === 'sposi' ? (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8B1E24]/10 border border-[#8B1E24]/20 text-[#8B1E24] text-xs tracking-widest uppercase mb-6 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Partecipazioni Digitali d'Autore
            </div>
            <h1 className="font-serif text-4xl sm:text-7xl font-normal text-[#4A3D39] leading-tight mb-6 max-w-4xl">
              Stupisci i tuoi invitati con un'esperienza da favola.
            </h1>
            <p className="text-[#9E8976] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
              Busta d'epoca con sigillo in ceralacca dorata, giochi come lo Scratch della Data, colonna sonora inedita e lista nozze integrata.
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

      {/* GAMIFICATION SHOWCASE */}
      <section className="py-16 px-6 bg-[#F4EFE6]/90 border-y border-[#E5DACB]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold mb-2 block">
            Esperienza Interattiva
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3D39] mb-4">
            Prova il "Gratta e Scopri" con il dito!
          </h2>
          <p className="text-[#9E8976] text-sm max-w-lg mx-auto mb-8">
            Gli invitati muovono il dito sullo schermo del cellulare per svelare la data e la chiesa. Coinvolgimento garantito!
          </p>
          
          <ScratchCard
            revealText="28 SETTEMBRE 2026"
            subText="Chiesa di Pescarenico • Ore 11:00"
          />
        </div>
      </section>

      {/* STRISCIA SCORREVOLE COMMENTI */}
      <section className="py-16 bg-[#FAF7F2] border-b border-[#E5DACB] overflow-hidden">
        <div className="max-w-6xl mx-auto text-center mb-10 px-6">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold block mb-2">Recensioni & Feedback</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#4A3D39]">Cosa dicono Sposi e Wedding Planner</h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex gap-6">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="w-80 sm:w-96 flex-shrink-0 bg-white border border-[#E5DACB] p-6 rounded-2xl shadow-sm"
              >
                <div className="flex items-center gap-1 mb-3 text-[#D4AF37]">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <p className="text-xs text-[#4A3D39] italic mb-4 leading-relaxed font-light">"{t.text}"</p>
                <div>
                  <h4 className="font-serif text-sm font-medium text-[#4A3D39]">{t.name}</h4>
                  <span className="text-[10px] text-[#9E8976] uppercase tracking-wider">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE FAQ DETTAGLIATA */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-semibold block mb-2">Domande Frequenti</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#4A3D39] mb-4">
            Tutto quello che vuoi sapere
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-[#E5DACB] rounded-2xl overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 text-left font-serif text-lg text-[#4A3D39] flex items-center justify-between gap-4 focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-[#9E8976] leading-relaxed border-t border-[#E5DACB]/50 pt-4 font-light">
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
          <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">
            Ecosistema RM Studio
          </span>
          <h3 className="font-serif text-2xl text-[#4A3D39]">
            LOVE fa parte dei SaaS d'élite di RM Studio
          </h3>
          <OrbitWidget />
        </div>
      </section>

      {/* PREZZI */}
      <section id="prezzi" className="py-20 px-6 bg-[#F4EFE6] border-t border-[#E5DACB]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#4A3D39] mb-4">
              Piani Semplici. Zero Abbonamenti.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            <div className="bg-[#FAF7F2] border border-[#E5DACB] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
              <div>
                <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">
                  Per la Coppia
                </span>
                <h3 className="font-serif text-3xl text-[#4A3D39] mb-2">Sposi Premium</h3>
                <div className="text-4xl font-serif text-[#8B1E24] mb-6">
                  €149 <span className="text-xs text-[#9E8976] font-sans font-normal">una tantum</span>
                </div>

                <ul className="space-y-3 text-sm text-[#4A3D39] mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Busta d'epoca con Ceralacca</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Modulo Conferma Partecipazione</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Gioco "Gratta per svelare la Data"</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Lista Nozze IBAN & Amazon Affiliata</li>
                </ul>
              </div>

              <a
                href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20vorrei%20informazioni%20per%20creare%20il%20sito%20Love%20per%20il%20mio%20matrimonio!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-white font-bold text-center hover:bg-[#B59226] transition-all shadow-md uppercase tracking-wider text-xs"
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
                <div className="text-4xl font-serif text-[#8B1E24] mb-6">
                  €490 <span className="text-xs text-[#9E8976] font-sans font-normal">/ anno (10 Matrimoni)</span>
                </div>

                <ul className="space-y-3 text-sm text-[#4A3D39] mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> 10 Matrimoni Sbloccati inclusi</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Logo della tua Agenzia nel Footer</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Export Excel Liste Invitati per Catering</li>
                </ul>
              </div>

              <a
                href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20sono%20un'agenzia/wedding%20planner%20e%20vorrei%20maggiori%20informazioni%20sul%20piano%20Agency%20Hub%20per%20Love!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-white font-bold text-center hover:bg-[#B59226] transition-all shadow-md uppercase tracking-wider text-xs"
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

    </KineticGrid>
  );
}
