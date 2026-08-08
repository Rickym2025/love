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
  Music,
  Send,
  Award,
  Volume2,
  Smartphone,
  Users,
  Building2,
  Zap,
  FileSpreadsheet,
  Layers,
  Gamepad2,
  MessageSquare,
  MapPin,
  Calendar,
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
      text: 'I nostri invitati sono impazziti per il sigillo in ceralacca e per la comodità della mappa Google e della conferma menu con le allergie!',
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
      q: 'Come funziona l\'invio della partecipazione agli invitati?',
      a: 'Riceverai un link unico e personalizzato (es: love.rmstudio.app/elena-e-davide). Potrai inviarlo con un tap su WhatsApp tramite la nostra dashboard o tramite QR Code sulle partecipazioni fisiche.',
    },
    {
      q: 'Gli invitati devono scaricare un\'applicazione?',
      a: 'No! LOVE è una Web-App nativa ultra-veloce. Si apre dal browser di qualsiasi smartphone (iPhone o Android) senza alcuna installazione.',
    },
    {
      q: 'Dove trovo la Dashboard Risultati & Catering?',
      a: 'Ogni matrimonio ha la sua Dashboard riservata dove vedere la lista conferme, la scelta del menu (carne/pesce/veg), la tabella intolleranze alimentari da scaricare in formato Excel per lo chef ed inviare i messaggi WhatsApp.',
    },
    {
      q: 'Come funziona la canzone su misura (+€300)?',
      a: 'È un servizio d\'élite opzionale di FF Edizioni: il Maestro Fausto Fusetti (iscritto SIAE n. 189515) compone e incide in studio un brano d\'autore inedito in 2 varianti d\'ascolto, cucito sulla vostra storia d\'amore.',
    },
    {
      q: 'Posso provare a creare la mia partecipazione gratuitamente?',
      a: 'Certamente! Puoi accedere liberamente al configuratore, provare i colori, la musica strumentale, i quiz e la busta 3D senza inserire alcuna carta di credito. Pagherai solo quando vorrai sbloccare il link definitivo.',
    },
    {
      q: 'Come funziona il servizio "Chiavi in Mano" (€249)?',
      a: 'Pensiamo a tutto noi! Ti basterà inviarci via WhatsApp le foto di coppia, i dettagli della location e le info: il team di RM Studio imposterà la grafica, ritaglierà le immagini e ti consegnerà il link pronto all\'uso in 24 ore.',
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
      a: 'Puoi creare la tua bozza gratis subito cliccando su "Crea Bozza Gratuita" o scriverci dal form di contatto per richiedere il servizio Chiavi in Mano o la Licenza Agenzie!',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1E293B]">
      
      {/* SFONDO CONTINUO AVORIO */}
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
                src="/logo.png"
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

              <a href="#prezzi" className="px-5 py-2 rounded-full bg-[#D4AF37] text-slate-900 text-xs font-bold shadow-md hover:bg-amber-400 transition">
                Crea Ora
              </a>
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
            La tua partecipazione di nozze diventa un'esperienza indimenticabile.
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-light">
            Busta d'epoca con sigillo in ceralacca 3D, mappa GPS interattiva, conferma RSVP con scelta menu e allergie, giochi per gli invitati e spedizione 1-Tap su WhatsApp.
          </p>

          {/* PULSANTI ACTION */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl mb-4">
            <Link href="/agency/sposi-in-love" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4AF37] text-slate-900 font-bold text-xs shadow-lg flex items-center justify-center gap-2 hover:bg-amber-400 transition cursor-pointer">
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Crea Bozza Gratuita (Senza Carta)</span>
            </Link>

            <a href="#contatti" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1E293B] text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition cursor-pointer">
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

        {/* 🌟 NUOVA SEZIONE 1: PERCHÉ L'INVITO DIGITALE BATTE LA CARTA */}
        <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block">Zero Stress • Zero Carta Sprecata</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B]">Perché le coppie scelgono la Partecipazione Digitale LOVE</h2>
            <p className="text-sm text-slate-600 font-serif">
              Addio a mesi di attesa in tipografia, buste perse per posta e foglietti smarriti con le allergie degli invitati.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-3 text-left">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#8B6508]">
                <Zap className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Inizio Istantaneo &amp; 1-Tap WhatsApp</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                Spedisci l&apos;invito personalizzato con il nome di ciascun invitato in un secondo con 1-Tap su WhatsApp. Zero costi di spedizione o francobolli.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-3 text-left">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#8B6508]">
                <FileSpreadsheet className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">RSVP &amp; Excel Catering Automatico</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                Raccogli le conferme, il numero degli ospiti, le preferenze menu (Carne/Pesce/Veg) e la tabella delle allergie da scaricare in Excel per lo chef.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-3 text-left">
              <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#8B6508]">
                <MapPin className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Mappa GPS Navigatore Integrata</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-serif">
                Gli invitati non si perderanno mai: cliccano sul pulsante della villa ed il navigatore del loro smartphone li guida direttamente al parcheggio.
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 NUOVA SEZIONE 2: SEMPLICE ANCHE PER I NONNI */}
        <section className="py-20 px-6 max-w-6xl mx-auto bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl">
          <div className="grid md:grid-cols-2 gap-12 items-center text-left p-2 sm:p-6">
            <div className="space-y-4">
              <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#D4AF37]" /> Nessuna App da Scaricare
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Pensa a tutto il browser. Un tap ed è subito festa.
              </h2>
              <p className="text-sm text-slate-300 font-serif leading-relaxed">
                LOVE è stato progettato per garantire un&apos;usabilità perfetta su qualsiasi smartphone (iPhone o Android) con caratteri ampi, pulsanti visibili ed ad alto contrasto.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200 font-medium pt-2">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Si apre al volo dal link WhatsApp o dal QR Code stampato</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Caratteri senior-friendly chiari e leggibili per zii e nonni</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Mappa GPS, programma orari e conferma partecipazione in 1 schermata</li>
              </ul>
            </div>

            <div className="h-80 sm:h-[380px] w-full rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop"
                alt="Partecipazione Smartphone"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 🌟 NUOVA SEZIONE 3: COME FUNZIONA IN 3 PASSI */}
        <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block">Semplice • Veloce • Intuitivo</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B]">Come realizzare la tua Partecipazione in 3 Passi</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md text-left space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-sm flex items-center justify-center font-mono">1</span>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Crea la tua Bozza Gratis</h3>
              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Accedi al configuratore, prova i modelli preimpostati (A, B o C), seleziona la tua palette colori ed inserisci la location.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md text-left space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-sm flex items-center justify-center font-mono">2</span>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Personalizza Giochi &amp; Lista Nozze</h3>
              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Aggiungi lo Scratch col dito per svelare la data, imposta il Quiz della Coppia con i premi per gli ospiti e collega l&apos;IBAN o la lista Amazon.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md text-left space-y-3 relative">
              <span className="w-8 h-8 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-sm flex items-center justify-center font-mono">3</span>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Spedisci &amp; Ricevi le Conferme</h3>
              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Invia il link agli invitati su WhatsApp in 1-tap, proietta le foto della festa sul maxischermo e scarica il report catering in Excel.
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 NUOVA SEZIONE 4: VANTAGGI B2B PER WEDDING PLANNER */}
        <section className="py-20 px-6 max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl border border-[#D4AF37]/40 shadow-sm text-left">
          <div className="grid md:grid-cols-2 gap-12 items-center p-2 sm:p-6">
            <div className="space-y-4">
              <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#D4AF37]" /> Piattaforma B2B White-Label
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E293B] leading-tight">
                Sei una Wedding Planner? Offri le Partecipazioni nei tuoi Pacchetti Luxury
              </h2>
              <p className="text-xs text-slate-600 font-serif leading-relaxed">
                Con la licenza <strong>Agency Hub B2B</strong> potrai gestire fino a 10 matrimoni all&apos;anno col logo e i contatti della tua agenzia nel footer, configuratore B2B a 3 colonne e supporto dedicato.
              </p>
              <div className="pt-2">
                <a href="#prezzi" className="inline-flex items-center gap-2 text-xs font-bold bg-[#1E293B] text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition shadow-md">
                  Scopri la Licenza Agenzia B2B (€490) <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </a>
              </div>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-2xl border-2 border-[#D4AF37] space-y-3 shadow-xl">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block">💼 Incluso in Agency Hub:</span>
              <ul className="space-y-2 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> 10 Matrimoni Sbloccati all&apos;anno</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Logo ed intestazione della tua agenzia</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Studio Configuratore a 3 colonne per modifiche veloci</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Export Excel Liste Invitati per lo Chef</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Modulo Spedizione WhatsApp 1-Tap</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 🌟 NUOVA SEZIONE 5: BENTO GRID FUNZIONALITÀ D'ÉLITE */}
        <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block">Tutto Incluso</span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B]">I Moduli Unici della Partecipazione LOVE</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-2">
              <span className="text-2xl">💌</span>
              <h3 className="font-serif font-bold text-base text-[#1E293B]">Busta d'Epoca &amp; Ceralacca 3D</h3>
              <p className="text-xs text-slate-600 font-serif">L'invitato tocca il sigillo in ceralacca ed apre la busta con pioggia di petali animati.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-2">
              <span className="text-2xl">🎰</span>
              <h3 className="font-serif font-bold text-base text-[#1E293B]">Scratch Date "Gratta la Data"</h3>
              <p className="text-xs text-slate-600 font-serif">Gli invitati grattano lo strato dorato col dito sullo schermo per svelare giorno e ora.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-2">
              <span className="text-2xl">🥩</span>
              <h3 className="font-serif font-bold text-base text-[#1E293B]">RSVP con Menu &amp; Intolleranze</h3>
              <p className="text-xs text-slate-600 font-serif">Scelta del menu (Carne, Pesce, Veg) e segnalazione allergie da scaricare in Excel.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-2">
              <span className="text-2xl">🎁</span>
              <h3 className="font-serif font-bold text-base text-[#1E293B]">Lista Nozze IBAN &amp; Amazon</h3>
              <p className="text-xs text-slate-600 font-serif">Coordinate bancarie per regali e link diretto ai negozi convenzionati o lista Amazon.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-2">
              <span className="text-2xl">🎉</span>
              <h3 className="font-serif font-bold text-base text-[#1E293B]">Pagina Festa &amp; Maxischermo</h3>
              <p className="text-xs text-slate-600 font-serif">Foto scattate in sala proiettate in diretta sul maxischermo con Quiz e Puzzle.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-2">
              <span className="text-2xl">💬</span>
              <h3 className="font-serif font-bold text-base text-[#1E293B]">Spedizione 1-Tap su WhatsApp</h3>
              <p className="text-xs text-slate-600 font-serif">Pannello per inviare l'invito personalizzato su WhatsApp a ciascun contatto.</p>
            </div>
          </div>
        </section>

        {/* SEZIONE BUSTA CERALACCA DETAIL */}
        <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center border-t border-[#D4AF37]/20">
          <div className="h-80 sm:h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"
              alt="Busta Ceralacca"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left space-y-4">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block">Busta D'Epoca &amp; Ceralacca 3D</span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#1E293B]">Un'emozione al primo tocco</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              L'invitato tocca il sigillo dorato sullo schermo del telefono: la busta si apre con la vostra colonna sonora d'autore e pioggia di petali animati.
            </p>
            <Link href="/elena-e-davide" className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Prova la Busta Live →
            </Link>
          </div>
        </section>

        {/* FOCUS NEUROMARKETING: CANZONE SU MISURA CON DOPPIA PROPOSTA D'ASCOLTO */}
        <section id="canzone-inedita" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-8 relative overflow-hidden">
            <div className="max-w-3xl space-y-4 text-left">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4AF37]" /> FF EDIZIONI • PRODUZIONI MUSICALI D'AUTORE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Nessun'altra coppia al mondo avrà mai la vostra canzone.
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif">
                I brani di FF Edizioni non sono basi generiche da catalogo. Ogni canzone è un'opera d'arte unica ed irrepetibile, scritta partendo dai vostri ricordi reali: <strong>i vostri nomi, dove vi siete visti la prima volta, le avventure condivise, i vostri aneddoti ed i vostri modi unici di dirvi "ti amo"</strong>.
              </p>

              <div className="p-4 bg-slate-800/80 rounded-2xl border border-[#D4AF37]/50 text-xs space-y-2">
                <span className="font-bold text-amber-300 uppercase tracking-wider block flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-amber-300" /> LA GARANZIA DELLA DOPPIA SCELTA D'AUTORE:
                </span>
                <p className="text-slate-200 leading-normal font-serif">
                  Per ogni richiesta di canzone su misura, il Maestro <strong>Fausto Fusetti</strong> compone ed incide <strong>2 varianti musicali leggermente diverse</strong> (nell'arrangiamento e nel mood). Potrete ascoltarle entrambe in anteprima e scegliere la versione esatta che farà battere il vostro cuore.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-left space-y-1">
                <span className="text-xs text-slate-400 font-bold block">Integrazione nell'Invito Digitale &amp; CD / MP3 d'Autore</span>
                <span className="text-2xl font-serif font-bold text-[#D4AF37]">+ €300 <span className="text-xs text-slate-400 font-normal">/ brano inedito (2 Proposte incluse)</span></span>
              </div>

              <a
                href="#contatti"
                className="px-8 py-4 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-2xl hover:bg-amber-400 transition-colors shadow-xl uppercase tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <Music className="w-4 h-4 text-slate-950" /> Richiedi la Vostra Canzone Unica ↗
              </a>
            </div>
          </div>
        </section>

        {/* GAMIFICATION DEMO */}
        <section className="py-16 px-6 bg-white/80 backdrop-blur-sm border-y border-[#D4AF37]/30 text-center shadow-sm">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-[#1E293B] mb-4">Prova il "Gratta e Scopri" con il dito!</h2>
            <ScratchCard revealText="28 SETTEMBRE 2026" subText="Chiesa di Pescarenico • Ore 11:00" />
          </div>
        </section>

        {/* PREZZI COMPLETI */}
        <section id="prezzi" className="py-20 px-6 bg-white/80 backdrop-blur-sm border-t border-[#D4AF37]/30 shadow-inner">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block">Piani Semplici &amp; Trasparenti</span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#1E293B]">Scegli come realizzare il tuo Invito</h2>
              <p className="text-xs text-slate-500 italic font-serif">Nessun abbonamento. Il sito rimane attivo per 1 anno completo dopo le nozze.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* PIANO 1: SPOSI SELF-SERVICE */}
              <div className="bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-[#D4AF37] transition-all relative text-left">
                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold block mb-1">Per la Coppia (Fai Da Te)</span>
                  <h3 className="font-serif text-2xl text-[#1E293B] mb-2">Sposi Self-Service</h3>
                  <div className="text-3xl font-serif text-[#1E293B] mb-4">€149 <span className="text-xs text-slate-600 font-normal">una tantum</span></div>
                  
                  <ul className="space-y-2.5 text-xs text-[#1E293B] mb-8 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Creazione autonoma sul Configuratore</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Busta d'epoca con Ceralacca 3D</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Colonna Sonora Strumentale di Benvenuto</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Modulo RSVP con Menu &amp; Intolleranze</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Gioco "Gratta e Scopri la Data"</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Lista Nozze IBAN &amp; Amazon Affiliata</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Spedizione 1-Tap via WhatsApp</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Export Excel Liste per Catering</li>
                  </ul>
                </div>

                <Link href="/agency/sposi-in-love" className="w-full py-3 rounded-xl bg-[#D4AF37] text-slate-900 font-bold text-center text-xs uppercase tracking-wider block shadow-md hover:bg-amber-400 transition cursor-pointer">
                  Crea Bozza Gratis ora
                </Link>
              </div>

              {/* PIANO 2: SPOSI CHIAVI IN MANO */}
              <div className="bg-gradient-to-b from-slate-900 to-slate-950 text-white border-2 border-[#D4AF37] rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative scale-102 text-left">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-slate-950 text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-slate-950" /> Consigliato • Servizio VIP
                </div>

                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold block mb-1 mt-2">Pensiamo a tutto noi</span>
                  <h3 className="font-serif text-2xl text-white mb-2">Sposi "Chiavi in Mano"</h3>
                  <div className="text-3xl font-serif text-[#D4AF37] mb-4">€249 <span className="text-xs text-slate-300 font-normal">una tantum</span></div>
                  
                  <ul className="space-y-2.5 text-xs text-slate-200 mb-8 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> <strong className="text-amber-300">Tutto incluso del piano Premium</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> <strong className="text-amber-300">Configurazione gestita da RM Studio in 24h</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Fotoritocco &amp; ottimizzazione immagini smartphone</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Inserimento lista invitati e numeri WhatsApp</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Impostazione Quiz personalizzato &amp; Premi</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Assistenza telefonica e WhatsApp prioritaria</li>
                  </ul>
                </div>

                <a href="#contatti" className="w-full py-3 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-center text-xs uppercase tracking-wider block shadow-md hover:bg-amber-400 transition cursor-pointer">
                  Richiedi "Chiavi in Mano" ↗
                </a>
              </div>

              {/* PIANO 3: AGENCY HUB WHITE-LABEL */}
              <div className="bg-[#1E293B] text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-slate-700 text-left">
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
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Canale diretto per Canzoni Inedite FF Edizioni</li>
                  </ul>
                </div>

                <a href="#contatti" className="w-full py-3 rounded-xl bg-slate-800 text-white border border-[#D4AF37]/50 font-bold text-center text-xs uppercase tracking-wider block shadow-md hover:bg-slate-700 transition cursor-pointer">
                  Richiedi Licenza Agenzia
                </a>
              </div>

            </div>
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

        {/* FORM DI CONTATTO WEB3FORMS */}
        <section id="contatti" className="py-20 px-6 max-w-3xl mx-auto text-center space-y-6">
          <div className="space-y-2">
            <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block">Parla con il Team</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E293B]">Richiedi un Preventivo o un Progetto Su Misura</h2>
            <p className="text-xs text-slate-600 font-serif">
              Scrivici direttamente per richiedere la tua Canzone Inedita d'Autore (+€300) con le 2 varianti d'ascolto, il servizio Chiavi in Mano o la Licenza Agenzie.
            </p>
          </div>

          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="p-6 md:p-8 bg-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-4 text-left"
          >
            <input type="hidden" name="access_key" value="9013a8d5-0901-42a0-b9e6-4c45553f960d" />
            <input type="hidden" name="subject" value="Nuova Richiesta da LOVE Partecipazioni Digitali" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#D4AF37] mb-1">Il tuo Nome e Cognome *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Es. Mario Rossi / Nome Agenzia"
                  className="w-full text-xs p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#D4AF37] mb-1">La tua Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="es. info@matrimonio.it"
                  className="w-full text-xs p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono font-bold focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#D4AF37] mb-1">Oggetto della Richiesta</label>
              <select
                name="richiesta_tipo"
                className="w-full text-xs p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-medium focus:border-[#D4AF37] outline-none cursor-pointer"
              >
                <option value="Sposi Chiavi in Mano (€249)">💍 Servizio Sposi "Chiavi in Mano" (€249)</option>
                <option value="Canzone Inedita Su Misura (€300)">🎼 Canzone Inedita Su Misura (2 Varianti Incluse - €300)</option>
                <option value="Licenza Agency Hub B2B (€490)">💼 Licenza Agency Hub B2B Wedding Planner (€490)</option>
                <option value="Informazioni Generali">❓ Informazioni Generali</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#D4AF37] mb-1">Raccontaci la tua storia o la tua richiesta *</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Per la canzone su misura: come vi siete conosciuti, le vostre avventure, aneddoti e modi di dire..."
                className="w-full text-xs p-3.5 rounded-xl border border-slate-700 bg-slate-950 text-white font-serif font-medium focus:border-[#D4AF37] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4 text-slate-950" /> Invia Richiesta al Maestro &amp; Team
            </button>
          </form>
        </section>

        {/* ECOSISTEMA RM STUDIO */}
        <section className="py-12 border-t border-[#D4AF37]/30 bg-white/40">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block mb-2">Ecosistema RM Studio</span>
            <OrbitWidget />
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 border-t border-[#D4AF37]/30 bg-white text-center text-xs text-slate-600">
          <div className="max-w-4xl mx-auto px-6 space-y-4">
            
            <div className="flex items-center justify-center gap-3">
              <img
                src="/logo.png"
                alt="RM Studio Logo"
                className="w-9 h-9 object-contain drop-shadow"
                onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
              />
              <div className="text-left">
                <span className="font-serif text-xl font-bold tracking-wider text-[#1E293B] block leading-none">
                  LOVE
                </span>
                <span className="text-[8px] uppercase tracking-widest text-[#D4AF37] font-bold block">
                  RM STUDIO
                </span>
              </div>
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
