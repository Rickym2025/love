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

  const testimonials = [
    {
      name: 'Sofia & Lorenzo',
      role: 'Sposi 2025',
      text: 'I nostri invitati sono impazziti per il sigillo in ceralacca! Abbiamo raccolto tutte le intolleranze alcoliche e alimentari in 2 giorni senza dovere chiamare nessuno.',
      stars: 5,
    },
    {
      name: 'Elena Valenti',
      role: 'Wedding Planner (Milano)',
      text: 'Agency Hub mi ha permesso di offrire la partecipazione digitale nei miei pacchetti Luxury. Il catering mi ringrazia ogni volta per il report CSV in 1-click!',
      stars: 5,
    },
    {
      name: 'Marco & Giulia',
      role: 'Sposi 2026',
      text: 'La canzone su misura prodotta con FF Edizioni ha fatto piangere tutti all\'apertura del sito. Vale 10 volte il prezzo pagato.',
      stars: 5,
    },
    {
      name: 'Alessia R.',
      role: 'Event Designer',
      text: 'La modalità proiettore con foto dal vivo proiettate al locale durante il taglio torta è stata una sorpresa meravigliosa per gli sposi.',
      stars: 5,
    },
  ];

  const faqs = [
    {
      q: 'Come funziona l\'invio della partecipazione agli invitati?',
      a: 'Riceverai un link unico e personalizzato (es: love.rmstudio.app/marco-e-giulia) o sul tuo dominio personale. Potrai inviarlo con un semplice tap su WhatsApp, e-mail o tramite un QR Code stampato sulle partecipazioni cartacee.',
    },
    {
      q: 'Gli invitati devono scaricare un\'applicazione per vedere il sito o fare l\'RSVP?',
      a: 'Assolutamente no! LOVE è una Web-App nativa ultra-veloce. Gli invitati aprono il link dal cellulare o computer con un clic, aprono la busta con ceralacca e confermano la presenza senza alcuna registrazione.',
    },
    {
      q: 'Posso esportare la lista degli invitati con le intolleranze per la location/catering?',
      a: 'Certamente. Dalla tua Dashboard riservata potrai scaricare in qualsiasi momento il file Excel/CSV completo con i nomi dei confermati, il numero di persone per tavolo, il menu scelto (carne/pesce/veg) e le intolleranze alimentari evidenziate.',
    },
    {
      q: 'Come funziona la canzone personalizzata di FF Edizioni?',
      a: 'Sfruttiamo l\'esperienza musicale del Maestro Fausto Fusetti (iscrizione SIAE). Creiamo un brano d\'autore inedito cucito sulla vostra storia d\'amore da usare come colonna sonora del sito e per il vostro primo ballo.',
    },
    {
      q: 'Se sono un\'agenzia o Wedding Planner, come funziona la soluzione White-Label?',
      a: 'Con il piano Agency Hub avrai un pannello di controllo multi-matrimonio per creare fino a 10 partecipazioni digitali all\'anno. Il footer del sito e le schermate mostreranno il logo e i contatti della TUA agenzia.',
    },
    {
      q: 'I crediti o il sito scade dopo il matrimonio?',
      a: 'No! Il sito rimane attivo ed accessibile per 1 anno completo dopo la data delle nozze, consentendo a parenti ed amici di rivedere la galleria fotografica e scaricare i ricordi della festa.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 overflow-x-hidden relative">
      
      {/* EFFETTI GLOW SFONDO */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-amber-500/15 via-rose-500/20 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* NAVBAR */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-500 via-amber-500 to-amber-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wider text-amber-100 drop-shadow">
              LOVE
            </span>
            <span className="text-[10px] uppercase tracking-widest text-amber-400/80 border border-amber-500/20 px-2.5 py-0.5 rounded-full bg-amber-500/5 hidden sm:inline-block">
              RM Studio
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/renzo-e-lucia"
              className="text-xs text-amber-300 hover:text-amber-200 transition-colors hidden md:block font-medium"
            >
              Guarda Demo Live ↗
            </Link>

            {/* LINK BLOG COME DRIVEMOTION */}
            <a
              href="https://blogs.rmstudio.app/love/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-amber-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Blog</span>
            </a>

            <a
              href="#prezzi"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 text-xs font-bold hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all active:scale-95"
            >
              Crea Ora
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
        
        {/* TOGGLE SPOSI / AGENZIE */}
        <div className="inline-flex p-1.5 rounded-full bg-slate-900/90 border border-slate-800 mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <button
            onClick={() => setActiveTab('sposi')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'sposi'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            Siete gli Sposi?
          </button>
          <button
            onClick={() => setActiveTab('agenzie')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'agenzie'
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Wedding Planner & Agenzie
          </button>
        </div>

        {activeTab === 'sposi' ? (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(225,29,72,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              Le Partecipazioni Digitali d'Autore
            </div>
            <h1 className="font-serif text-4xl sm:text-7xl font-light text-amber-100 leading-tight mb-6 max-w-4xl tracking-wide">
              Stupisci i tuoi invitati con un'esperienza da favola.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Busta interattiva con sigillo in ceralacca 3D, conferma RSVP automatica con intolleranze, colonna sonora inedita e lista nozze integrata. Zero stress per il tuo matrimonio.
            </p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Building2 className="w-3.5 h-3.5" />
              Soluzione White-Label B2B
            </div>
            <h1 className="font-serif text-4xl sm:text-7xl font-light text-amber-100 leading-tight mb-6 max-w-4xl tracking-wide">
              Aggiungi le Partecipazioni Digitali ai tuoi pacchetti nozze.
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light max-w-2xl mx-auto mb-10 leading-relaxed">
              Offri ai tuoi clienti siti per matrimoni d'élite con il tuo brand nel footer. Gestione centralizzata degli invitati, export PDF per i catering e margine elevatissimo.
            </p>
          </>
        )}

        {/* BOTTONI DEMO LIVE */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          <Link
            href="/renzo-e-lucia"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95"
          >
            <span>Apri Demo "Renzo & Lucia"</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/adamo-ed-eva"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 border border-slate-800 text-slate-200 font-medium hover:border-amber-500/40 hover:text-amber-200 transition-all text-center"
          >
            Demo "Adamo & Eva"
          </Link>
        </div>
      </section>

      {/* SHOWCASE GAMIFICATION (SCRATCH CARD) */}
      <section className="py-16 px-6 bg-slate-900/30 border-y border-slate-800/80 relative">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold mb-2 block">
            Esperienza Interattiva
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-amber-100 mb-4">
            Prova il "Gratta e Scopri" con il dito!
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8">
            Gli invitati muovono il dito sullo schermo del cellulare per svelare la data e la chiesa. Coinvolgimento garantito!
          </p>
          
          <ScratchCard
            revealText="28 SETTEMBRE 2026"
            subText="Chiesa di Pescarenico • Ore 11:00"
          />
        </div>
      </section>

      {/* CASELLE TUTTO CIÒ CHE SERVE (CON RETRO-ILLUMINAZIONE HOVER) */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold block mb-2">Ecosistema Completo</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-amber-100 mb-4">
            Tutto ciò che serve per il grande giorno
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
            Passa il mouse sulle caselle per attivare la retro-illuminazione.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2 font-medium">Busta con Ceralacca 3D</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Iniziali personalizzate e animazione fluida con coriandoli al tap. Il modo più emozionante per aprire un invito.
            </p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-rose-500/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(225,29,72,0.25)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2 font-medium">RSVP & Intolleranze</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Raccogli presenze, accompagnatori, preferenze menu (carne/pesce/veg) e intolleranze con esportazione immediata per la cucina.
            </p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2 font-medium">Colonna Sonora FF Edizioni</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Possibilità di integrare un brano musicale inedito e personalizzato, composto ed arrangiato dal Maestro Fausto Fusetti.
            </p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-rose-500/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(225,29,72,0.25)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2 font-medium">Lista Nozze Amazon</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Integrazione bonifico IBAN per il viaggio di nozze e lista desideri Amazon collegata al tuo account.
            </p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-amber-500/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2 font-medium">Cloudflare R2 Storage</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Gli ospiti caricano foto e ricordi della festa in tempo reale senza limiti di banda e alla massima velocità.
            </p>
          </div>

          <div className="group relative p-8 rounded-3xl bg-slate-900/80 border border-slate-800/80 hover:border-rose-500/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_0_35px_rgba(225,29,72,0.25)] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl text-amber-100 mb-2 font-medium">Mappa GPS & Calendario</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Pulsanti di avvio rapido per Google Maps, Waze e salvataggio automatico dell'evento sul calendario dello smartphone.
            </p>
          </div>

        </div>
      </section>

      {/* STRISCIA SCORREVOLE COMMENTI DEGLI UTENTI */}
      <section className="py-16 bg-slate-900/40 border-y border-slate-800/80 overflow-hidden relative">
        <div className="max-w-6xl mx-auto text-center mb-10 px-6">
          <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold block mb-2">Recensioni & Feedback</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-amber-100">Cosa dicono Sposi e Wedding Planner</h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="animate-marquee flex gap-6">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="w-80 sm:w-96 flex-shrink-0 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-amber-500/40 transition-all"
              >
                <div className="flex items-center gap-1 mb-3 text-amber-400">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 italic mb-4 leading-relaxed font-light">"{t.text}"</p>
                <div>
                  <h4 className="font-serif text-sm font-medium text-amber-100">{t.name}</h4>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE FAQ DETTAGLIATA */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold block mb-2">Domande Frequenti</span>
          <h2 className="font-serif text-3xl sm:text-5xl text-amber-100 mb-4">
            Tutto quello che vuoi sapere
          </h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Risposte chiare per sposi e agenzie prima di iniziare.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-900/80 border border-slate-800/80 rounded-2xl overflow-hidden transition-all hover:border-slate-700"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 text-left font-serif text-lg text-amber-100 flex items-center justify-between gap-4 focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-amber-400 transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/40 pt-4 font-light">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SISTEMA ORBITALE RM STUDIO INIETTATO */}
      <section className="py-12 border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold block mb-2">
            Ecosistema RM Studio
          </span>
          <h3 className="font-serif text-2xl text-amber-100">
            LOVE fa parte dei SaaS d'élite di RM Studio
          </h3>
          <OrbitWidget />
        </div>
      </section>

      {/* SEZIONE PREZZI */}
      <section id="prezzi" className="py-20 px-6 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl sm:text-5xl text-amber-100 mb-4">
              Piani Semplici. Zero Abbonamenti per gli Sposi.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
              Scegli la formula perfetta per le tue esigenze.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden hover:border-amber-500/40 transition-all">
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

            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-amber-950/20 border-2 border-amber-500/40 rounded-3xl p-8 flex flex-col justify-between relative shadow-[0_0_40px_rgba(245,158,11,0.15)]">
              <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
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

      {/* FOOTER UFFICIALE CON LINK LEGALI E BLOG RM STUDIO */}
      <footer className="py-12 border-t border-slate-800/80 text-center text-xs text-slate-500">
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
          <span className="font-serif text-slate-300 font-bold">LOVE</span>
        </div>
        <p>© 2026 RM Studio di Riccardo Modena • Tutti i diritti riservati</p>

        <div className="flex justify-center gap-6 my-4 text-xs text-slate-400 font-medium">
          <a
            href="https://blogs.rmstudio.app/love/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-300 transition-colors font-bold text-amber-400"
          >
            Blog LOVE
          </a>
          <span>•</span>
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

        <p className="mt-1 opacity-60">Sito Ufficiale: https://rmstudio.app</p>
      </footer>

    </div>
  );
}
