'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScratchCard from '@/components/ScratchCard';
import OrbitWidget from '@/components/OrbitWidget';
import Marquee from '@/components/Marquee';
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
      a: 'Ogni matrimonio ha la sua Dashboard riservata raggiungibile all\'indirizzo love.rmstudio.app/dashboard/elena-e-davide dove scaricare l\'Excel per il catering.',
    },
    {
      q: 'Come funziona la canzone personalizzata di FF Edizioni?',
      a: 'Creiamo un brano d\'autore inedito (in collaborazione con il Maestro Fausto Fusetti, iscritto SIAE) cucito sulla vostra storia d\'amore.',
    },
    {
      q: 'Posso personalizzare i colori e le immagini?',
      a: 'Certamente! Ogni matrimonio può avere la sua palette colori, le foto di coppia e la scelta della busta.',
    },
    {
      q: 'Come funziona la pagina "La Festa" e il Maxischermo?',
      a: 'Gli invitati accedono alla pagina /festa il giorno delle nozze, scattano foto dal telefono che vengono proiettate in diretta sul maxischermo del locale.',
    },
    {
      q: 'Se sono un\'agenzia, posso mettere il mio logo?',
      a: 'Sì! Con il piano Agency Hub il footer e le schermate mostreranno esclusivamente il logo e i contatti della tua agenzia.',
    },
    {
      q: 'I dati delle allergie alimentari sono protetti?',
      a: 'Sì, rispettiamo il regolamento GDPR. I dati delle preferenze alimentari sono visibili solo agli sposi e all\'agenzia.',
    },
    {
      q: 'Il sito scade dopo il matrimonio?',
      a: 'No, rimane attivo per 1 anno completo dopo le nozze per permettere a parenti ed amici di rivedere la galleria fotografica.',
    },
    {
      q: 'Come posso procedere con l\'acquisto?',
      a: 'Clicca su "Crea Ora" o contattaci su WhatsApp: attiveremo la bozza della tua partecipazione in pochi minuti!',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1E293B]">
      
      {/* SFONDO CONTINUO SU TUTTO IL SITO (STILE DRIVEMOTION) */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      <div className="relative z-10">
        
        {/* HEADER / NAVBAR: LOGO (SINISTRA) | MENU (DESTRA) - COME SCHEMA GOOGLE */}
        <header className="border-b border-[#E2E8F0] bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/wax-seal.png"
                alt="LOVE Logo"
                className="w-10 h-10 object-contain drop-shadow"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-wider text-[#1E293B] block leading-none">
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
              <a href="#prezzi" className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-white text-xs font-bold shadow-md hover:bg-[#B59226]">
                Crea Ora
              </a>
            </div>
          </div>
        </header>

        {/* 1. SLIDE INIZIALE / HERO: COSA FAI? - A CHI TI RIVOLGI? - CTA DIRETTI */}
        <section className="py-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex p-1 rounded-full bg-white border border-[#E2E8F0] mb-8 shadow-sm">
            <button
              onClick={() => setActiveTab('sposi')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'sposi' ? 'bg-[#8B1E24] text-white shadow-md' : 'text-[#64748B]'
              }`}
            >
              💍 Per gli Sposi
            </button>
            <button
              onClick={() => setActiveTab('agenzie')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'agenzie' ? 'bg-[#8B1E24] text-white shadow-md' : 'text-[#64748B]'
              }`}
            >
              💼 Per Wedding Planner
            </button>
          </div>

          <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-3">
            Cosa Fai? • Le Partecipazioni Digitali d'Autore
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-normal text-[#1E293B] leading-tight mb-6 max-w-4xl">
            Stupisci i tuoi invitati con un'esperienza da favola.
          </h1>
          <p className="text-[#64748B] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Busta d'epoca con sigillo in ceralacca dorata, giochi come lo Scratch della Data, colonna sonora inedita e lista nozze integrata.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <Link href="/elena-e-davide" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#8B1E24] text-white font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-[#6E1216]">
              <span>Demo "Elena & Davide"</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/francesca-e-luca" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1976D2] text-white font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-[#1565C0]">
              <span>Demo "Francesca & Luca"</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 2. STRISCIA 3 RECENSIONI (COME DA WIREFRAME GOOGLE) */}
        <section className="py-12 bg-white/80 border-y border-[#E2E8F0]">
          <div className="max-w-6xl mx-auto px-6 text-center mb-6">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold">Recensioni Sposi & Agenzie</span>
          </div>
          <Marquee items={testimonials} />
        </section>

        {/* 3. SEZIONE ALTERNATA: IMMAGINE (SINISTRA) | DESCRIZIONE (DESTRA) */}
        <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" alt="Busta" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">Busta D'Epoca & Ceralacca</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1E293B] mb-4">Un'emozione unica al primo tocco</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              L'invitato tocca il sigillo dorato sullo schermo del telefono: la busta si apre con musica e pioggia di petali.
            </p>
          </div>
        </section>

        {/* 4. SEZIONE ALTERNATA: DESCRIZIONE (SINISTRA) | IMMAGINE (DESTRA) */}
        <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center border-t border-[#E2E8F0]">
          <div className="order-2 md:order-1">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block mb-2">La Festa & Maxischermo</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#1E293B] mb-4">I ricordi scattati dagli invitati</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Gli amici scattano foto dal loro cellulare ed inviano gli scatti direttamente sul proiettore della sala.
            </p>
          </div>
          <div className="order-1 md:order-2 aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" alt="Festa" className="w-full h-full object-cover" />
          </div>
        </section>

        {/* GAMIFICATION DEMO */}
        <section className="py-16 px-6 bg-white/90 border-y border-[#E2E8F0] text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-[#1E293B] mb-4">Prova il "Gratta e Scopri" con il dito!</h2>
            <ScratchCard revealText="28 SETTEMBRE 2026" subText="Chiesa di Pescarenico • Ore 11:00" />
          </div>
        </section>

        {/* FAQ 10 DOMANDE */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B] text-center mb-16">Domande Frequenti</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => toggleFaq(index)} className="w-full p-6 text-left font-serif text-lg text-[#1E293B] flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-[#64748B] border-t border-[#E2E8F0] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SISTEMA ORBITALE RM STUDIO */}
        <section className="py-12 border-t border-[#E2E8F0]">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">Ecosistema RM Studio</span>
            <OrbitWidget />
          </div>
        </section>

        {/* PREZZI */}
        <section id="prezzi" className="py-20 px-6 bg-white/90 border-t border-[#E2E8F0]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B] text-center mb-16">Piani Semplici. Zero Abbonamenti.</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#FAF7F2] border border-[#E2E8F0] rounded-3xl p-8 flex flex-col justify-between shadow-sm">
                <div>
                  <span className="text-xs text-[#8B1E24] uppercase font-bold block mb-2">Per la Coppia</span>
                  <h3 className="font-serif text-3xl text-[#1E293B] mb-2">Sposi Premium</h3>
                  <div className="text-4xl font-serif text-[#8B1E24] mb-6">€149 <span className="text-xs text-[#64748B] font-normal">una tantum</span></div>
                </div>
                <a href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20vorrei%20informazioni%20per%20creare%20il%20sito%20Love!" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-white font-bold text-center text-xs uppercase tracking-wider block shadow-md">
                  Attiva per il tuo Matrimonio
                </a>
              </div>

              <div className="bg-[#FAF7F2] border-2 border-[#D4AF37] rounded-3xl p-8 flex flex-col justify-between shadow-md">
                <div>
                  <span className="text-xs text-[#8B1E24] uppercase font-bold block mb-2">Per Wedding Planner & Agenzie</span>
                  <h3 className="font-serif text-3xl text-[#1E293B] mb-2">Agency Hub</h3>
                  <div className="text-4xl font-serif text-[#8B1E24] mb-6">€490 <span className="text-xs text-[#64748B] font-normal">/ anno (10 Matrimoni)</span></div>
                </div>
                <a href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20sono%20un'agenzia%20e%20vorrei%20maggiori%20informazioni!" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl bg-[#8B1E24] text-white font-bold text-center text-xs uppercase tracking-wider block shadow-md">
                  Richiedi Licenza Agenzia
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER: P.IVA - PRIVACY POLICY - COOKIE POLICY - CONTATTI DIRETTI */}
        <footer className="py-12 border-t border-[#E2E8F0] bg-white text-center text-xs text-[#64748B]">
          <div className="max-w-4xl mx-auto px-6 space-y-3">
            <div className="flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4 text-[#8B1E24] fill-[#8B1E24]" />
              <span className="font-serif text-[#1E293B] font-bold text-lg">LOVE</span>
            </div>
            <p>© 2026 RM Studio di Riccardo Modena • P.IVA: 01659990299</p>

            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-[#1E293B]">
              <a href="https://rmstudio.app/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="https://rmstudio.app/termini.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Cookie Policy & Termini</a>
              <span>•</span>
              <a href="mailto:info@rmstudio.app" className="text-[#8B1E24] hover:underline">info@rmstudio.app</a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
