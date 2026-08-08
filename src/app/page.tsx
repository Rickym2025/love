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
  ArrowRight,
  ChevronDown,
  BookOpen,
  UserCheck,
  Wand2,
  Gift,
  ShieldCheck,
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
      text: 'Abbiamo scelto il servizio "Chiavi in Mano" e Riccardo ha pensato a tutto lui in meno di 24 ore. Spettacolare!',
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: 'Posso provare a creare la mia partecipazione gratuitamente?',
      a: 'Certamente! Puoi accedere liberamente al configuratore, provare i colori, la musica, i quiz e la busta 3D senza inserire alcuna carta di credito. Pagherai solo quando vorrai sbloccare il link definitivo da inviare su WhatsApp.',
    },
    {
      q: 'Come funziona il servizio "Chiavi in Mano" (€249)?',
      a: 'Pensiamo a tutto noi! Ti basterà inviarci via WhatsApp le foto di coppia, i dettagli della location e le info: il team di RM Studio imposterà la grafica, ritaglierà le immagini e ti consegnerà il link pronto all\'uso in 24 ore.',
    },
    {
      q: 'Come funziona l\'invio della partecipazione agli invitati?',
      a: 'Riceverai un link unico e personalizzato (es: love.rmstudio.app/elena-e-davide). Potrai inviarlo con un tap su WhatsApp tramite la nostra dashboard o tramite QR Code sulle partecipazioni fisiche.',
    },
    {
      q: 'Gli invitati devono scaricare un\'applicazione?',
      a: 'No! LOVE è una Web-App nativa ultra-veloce. Si apre dal browser di qualsiasi smartphone senza nessuna installazione.',
    },
    {
      q: 'Dove trovo la Dashboard Risultati & Catering?',
      a: 'Ogni matrimonio ha la sua Dashboard riservata dove vedere la lista conferme, la scelta del menu (carne/pesce/veg), la tabella intolleranze alimentari da scaricare per lo chef ed inviare i messaggi WhatsApp.',
    },
    {
      q: 'Come funziona la canzone personalizzata di FF Edizioni?',
      a: 'Creiamo un brano d\'autore inedito (in collaborazione con il Maestro Fausto Fusetti, iscritto SIAE) cucito sulla vostra storia d\'amore.',
    },
    {
      q: 'Come funziona la pagina "La Festa" e il Maxischermo?',
      a: 'Gli invitati accedono alla pagina /festa il giorno delle nozze, scattano foto dal telefono che vengono proiettate in diretta sul maxischermo della sala.',
    },
    {
      q: 'Se sono un\'agenzia, posso mettere il mio logo?',
      a: 'Sì! Con il piano Agency Hub il footer e le schermate mostreranno esclusivamente il logo e i contatti della tua agenzia.',
    },
    {
      q: 'Il sito scade dopo il matrimonio?',
      a: 'No, rimane attivo per 1 anno completo dopo le nozze per permettere a parenti ed amici di rivedere la galleria fotografica.',
    },
    {
      q: 'Come posso procedere con l\'acquisto?',
      a: 'Puoi creare la tua bozza gratis subito cliccando su "Crea Bozza Gratuita" o contattarci su WhatsApp se desideri la realizzazione Chiavi in Mano!',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1E293B]">
      
      {/* SFONDO CONTINUO */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      <KineticGrid className="relative z-10">
        
        {/* NAVBAR */}
        <header className="border-b border-[#D4AF37]/30 bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-40 shadow-sm">
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
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold">
                  RM STUDIO
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden lg:flex items-center gap-4 text-xs font-bold">
                <Link href="/elena-e-davide" className="text-[#D4AF37] hover:underline">
                  Modello A ↗
                </Link>
                <Link href="/francesca-e-luca" className="text-slate-700 hover:underline">
                  Modello B ↗
                </Link>
                <Link href="/giulia-e-marco" className="text-[#8B6508] hover:underline font-serif">
                  Modello C (Landing) ↗
                </Link>
              </div>

              <a href="https://blogs.rmstudio.app/love/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#D4AF37] hidden sm:flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5" /> Blog
              </a>

              <Link href="/login" className="px-4 py-2 rounded-full border border-[#D4AF37] text-[#8B6508] text-xs font-bold hover:bg-amber-100 transition flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> Login Agenzie
              </Link>

              <Link href="/agency/sposi-in-love" className="px-5 py-2 rounded-full bg-[#D4AF37] text-slate-900 text-xs font-bold shadow-md hover:bg-amber-400 transition">
                Crea Bozza Gratis
              </Link>
            </div>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="py-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex p-1 rounded-full bg-white border border-[#D4AF37]/30 mb-8 shadow-sm">
            <button
              onClick={() => setActiveTab('sposi')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'sposi' ? 'bg-[#D4AF37] text-slate-900 shadow-md' : 'text-slate-600'
              }`}
            >
              💍 Per gli Sposi
            </button>
            <button
              onClick={() => setActiveTab('agenzie')}
              className={`px-6 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'agenzie' ? 'bg-[#D4AF37] text-slate-900 shadow-md' : 'text-slate-600'
              }`}
            >
              💼 Per Wedding Planner
            </button>
          </div>

          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block mb-3">
            Cosa Fai? • Le Partecipazioni Digitali d'Autore
          </span>
          <h1 className="font-serif text-4xl sm:text-7xl font-normal text-[#1E293B] leading-tight mb-6 max-w-4xl">
            Stupisci i tuoi invitati con un'esperienza da favola.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Busta d'epoca con sigillo in ceralacca 3D, giochi come lo Scratch della Data, colonna sonora inedita e spedizione 1-Tap su WhatsApp.
          </p>

          {/* PULSANTI ACTION */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl mb-4">
            <Link href="/agency/sposi-in-love" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4AF37] text-slate-900 font-bold text-xs shadow-lg flex items-center justify-center gap-2 hover:bg-amber-400 transition cursor-pointer">
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Crea Bozza Gratuita (Senza Carta)</span>
            </Link>

            <a href="https://wa.me/3904251675950?text=Ciao%20Riccardo,%20vorrei%20il%20servizio%20Chiavi%20in%20Mano%20per%20la%20nostra%20partecipazione%20Love!" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1E293B] text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition cursor-pointer">
              <Wand2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Richiedi "Chiavi in Mano" (€249)</span>
            </a>
          </div>

          <p className="text-xs text-slate-500 font-serif italic">
            ✦ Prova gratis il configuratore • Paghi solo quando vuoi sbloccare il link definitivo ✦
          </p>
        </section>

        {/* RECENSIONI SCORREVOLI */}
        <section className="py-12 bg-white/80 backdrop-blur-sm border-y border-[#D4AF37]/30 overflow-hidden shadow-sm">
          <div className="max-w-6xl mx-auto px-6 text-center mb-6">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold">Recensioni Sposi &amp; Agenzie</span>
          </div>
          <Marquee items={testimonials} />
        </section>

        {/* SEZIONE BUSTA CERALACCA */}
        <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="h-80 sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
              alt="Busta Ceralacca"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block mb-2">Busta D'Epoca &amp; Ceralacca 3D</span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#1E293B] mb-4">Un'emozione al primo tocco</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              L'invitato fully immersivo tocca il sigillo dorato sullo schermo del telefono: la busta si apre con musica d'autore e pioggia di petali animati.
            </p>
            <Link href="/elena-e-davide" className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Prova la Busta Live →
            </Link>
          </div>
        </section>

        {/* GAMIFICATION DEMO */}
        <section className="py-16 px-6 bg-white/80 backdrop-blur-sm border-y border-[#D4AF37]/30 text-center shadow-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-[#1E293B] mb-4">Prova il "Gratta e Scopri" con il dito!</h2>
            <ScratchCard revealText="28 SETTEMBRE 2026" subText="Chiesa di Pescarenico • Ore 11:00" />
          </div>
        </section>

        {/* 10 FAQ COMPLETE */}
        <section className="py-24 px-6 max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B] text-center mb-16">Domande Frequenti</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => toggleFaq(index)} className="w-full p-6 text-left font-serif text-lg text-[#1E293B] flex items-center justify-between">
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ECOSISTEMA RM STUDIO */}
        <section className="py-12 border-t border-[#D4AF37]/30 bg-white/40">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block mb-2">Ecosistema RM Studio</span>
            <OrbitWidget />
          </div>
        </section>

        {/* NUOVA GRIGLIA A 3 PREZZI E PIANI */}
        <section id="prezzi" className="py-20 px-6 bg-white/80 backdrop-blur-sm border-t border-[#D4AF37]/30 shadow-inner">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-2 mb-16">
              <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block">Piani Semplici &amp; Trasparenti</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B]">Scegli come realizzare il tuo Invito</h2>
              <p className="text-xs text-slate-500 italic font-serif">Nessun abbonamento. Il sito rimane attivo per 1 anno completo dopo le nozze.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* PIANO 1: SPOSI SELF-SERVICE */}
              <div className="bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-[#D4AF37] transition-all relative">
                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold block mb-1">Per la Coppia (Fai Da Te)</span>
                  <h3 className="font-serif text-2xl text-[#1E293B] mb-2">Sposi Self-Service</h3>
                  <div className="text-3xl font-serif text-[#1E293B] mb-4">€149 <span className="text-xs text-slate-600 font-normal">una tantum</span></div>
                  
                  <ul className="space-y-2.5 text-xs text-[#1E293B] mb-8 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Creazione autonoma sul Configuratore</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Busta d'epoca con Ceralacca 3D</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Modulo RSVP con Menu &amp; Intolleranze</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Gioco "Gratta e Scopri la Data"</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Colonna Sonora Inedita FF Edizioni</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Lista Nozze IBAN &amp; Amazon Affiliata</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Spedizione 1-Tap via WhatsApp</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Export Excel Liste per Catering</li>
                  </ul>
                </div>

                <Link href="/agency/sposi-in-love" className="w-full py-3 rounded-xl bg-[#D4AF37] text-slate-900 font-bold text-center text-xs uppercase tracking-wider block shadow-md hover:bg-amber-400 transition cursor-pointer">
                  Crea Bozza Gratis ora
                </Link>
              </div>

              {/* PIANO 2: SPOSI CHIAVI IN MANO (NOVITÀ CON LAUREL BADGE) */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border-2 border-[#D4AF37] rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative scale-102">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-slate-950 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-950" /> Consigliato • Servizio VIP
                </div>

                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold block mb-1 mt-2">Pensiamo a tutto noi</span>
                  <h3 className="font-serif text-2xl text-white mb-2">Sposi "Chiavi in Mano"</h3>
                  <div className="text-3xl font-serif text-[#D4AF37] mb-4">€249 <span className="text-xs text-slate-300 font-normal">una tantum</span></div>
                  
                  <ul className="space-y-2.5 text-xs text-slate-200 mb-8 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> <strong className="text-amber-300">Tutto incluso del piano Premium</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> <strong className="text-amber-300">Configurazione completa gestita dal team RM Studio</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Fotoritocco &amp; ottimizzazione immagini smartphone</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Inserimento lista invitati e numeri WhatsApp</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Impostazione Quiz personalizzato &amp; Premi</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Selezione colonna sonora d'autore su misura</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Assistenza telefonica e WhatsApp prioritaria</li>
                  </ul>
                </div>

                <a href="https://wa.me/3904251675950?text=Ciao%20Riccardo,%20desidero%20maggiori%20informazioni%20sul%20servizio%20Chiavi%20in%20Mano%20per%20il%20nostro%20matrimonio!" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-center text-xs uppercase tracking-wider block shadow-md hover:bg-amber-400 transition cursor-pointer">
                  Richiedi "Chiavi in Mano" ↗
                </a>
              </div>

              {/* PIANO 3: AGENCY HUB WHITE-LABEL */}
              <div className="bg-[#1E293B] text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-slate-700">
                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold block mb-1">Per Wedding Planner &amp; Agenzie</span>
                  <h3 className="font-serif text-2xl text-white mb-2">Agency Hub B2B</h3>
                  <div className="text-3xl font-serif text-[#D4AF37] mb-4">€490 <span className="text-xs text-slate-300 font-normal">/ anno (10 Matrimoni)</span></div>
                  
                  <ul className="space-y-2.5 text-xs text-slate-200 mb-8 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> 10 Matrimoni Sbloccati inclusi</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Logo della tua Agenzia nel Footer</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Selezione tra 10 Temi Grafici d'Élite</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Studio Configuratore a 3 Colonne</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Modulo Spedizione 1-Tap WhatsApp</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Export Excel Liste Invitati per Catering</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Puntamento Domini Personalizzati dei Clienti</li>
                  </ul>
                </div>

                <a href="https://wa.me/3904251675950?text=Ciao%20RM%20Studio,%20sono%20un'agenzia%20e%20vorrei%20maggiori%20informazioni!" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-slate-800 text-white border border-[#D4AF37]/50 font-bold text-center text-xs uppercase tracking-wider block shadow-md hover:bg-slate-700 transition cursor-pointer">
                  Richiedi Licenza Agenzia
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-[#D4AF37]/30 bg-white text-center text-xs text-slate-600">
          <div className="max-w-4xl mx-auto px-6 space-y-3">
            <div className="flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
              <span className="font-serif text-[#1E293B] font-bold text-lg">LOVE</span>
            </div>
            <p>© 2026 RM Studio di Riccardo Modena • P.IVA: 01659990299</p>

            <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-[#1E293B]">
              <a href="https://rmstudio.app/privacy.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="https://rmstudio.app/termini.html" target="_blank" rel="noopener noreferrer" className="hover:underline">Cookie Policy &amp; Termini</a>
              <span>•</span>
              <a href="mailto:info@rmstudio.app" className="text-[#D4AF37] hover:underline">info@rmstudio.app</a>
            </div>
          </div>
        </footer>

      </KineticGrid>
    </div>
  );
} 
