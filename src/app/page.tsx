'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ScratchCard from '@/components/ScratchCard';
import OrbitWidget from '@/components/OrbitWidget';
import KineticGrid from '@/components/ui/kinetic-grid';
import Marquee from '@/components/Marquee';
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
  Building2,
  Zap,
  FileSpreadsheet,
  MapPin,
  Star,
  Quote,
} from 'lucide-react';

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<'sposi' | 'agenzie'>('sposi');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 8 TESTIMONIANZE RICCHE, DETTAGLIATE ED INFORMATIVE
  const richTestimonials = [
    {
      names: 'Sofia & Lorenzo',
      location: 'Sposi a Villa Borromeo (Milano)',
      date: 'Matrimonio Settembre 2025',
      stars: 5,
      highlight: '🎯 130 Conferme Ricevute in 24 Ore',
      comment:
        'I nostri invitati sono rimasti a bocca aperta quando hanno toccato la ceralacca 3D sullo schermo ed è partita la nostra canzone! La cosa più comoda in assoluto è stata raccogliere le conferme delle intolleranze alimentari: lo chef del catering ci ha ringraziato per la tabella Excel perfetta.',
    },
    {
      names: 'Elena Valenti',
      location: 'Wedding Planner d\'Élite (Milano & Lago di Como)',
      date: 'Gestione 12 Matrimoni / Anno',
      stars: 5,
      highlight: '💼 Servizio Impeccabile per le Agenzie',
      comment:
        'Agency Hub ha rivoluzionato il mio lavoro. Creare partecipazioni con il logo della mia agenzia nel footer mi dà un posizionamento di altissimo livello. L\'export automatico delle liste invitati ed il modulo WhatsApp ad un tocco azzerano giorni di stress.',
    },
    {
      names: 'Marco & Giulia',
      location: 'Sposi a Villa Rosa (Roma)',
      date: 'Matrimonio Giugno 2026',
      stars: 5,
      highlight: '🎵 Canzone Inedita Commovente',
      comment:
        'Abbiamo scelto il servizio "Chiavi in Mano" e la Canzone Personalizzata del Maestro Fausto Fusetti. Ricevere 2 arrangiamenti diversi tra cui scegliere è stato emozionante. Quando parenti ed amici hanno aperto l\'invito hanno vissuto un momento di commozione pura.',
    },
    {
      names: 'Davide & Francesca',
      location: 'Sposi a Tenuta Castel Venezze (Rovigo)',
      date: 'Matrimonio Maggio 2025',
      stars: 5,
      highlight: '🎰 Gioco Scratch della Data Virale',
      comment:
        'Tutti i nostri amici ci hanno fatto i complimenti per il gioco "Gratta la Data" col dito sullo schermo! La mappa navigatore GPS integrata ha guidato tutti direttamente al parcheggio della villa senza una sola telefonata di indicazioni.',
    },
    {
      names: 'Chiara & Alessandro',
      location: 'Sposi a Villa Miani (Roma)',
      date: 'Matrimonio Ottobre 2025',
      stars: 5,
      highlight: '🎉 Maxischermo Festa Spettacolare',
      comment:
        'Durante il ricevimento gli invitati scattavano foto dal loro telefono e le vedevamo proiettate in diretta sul maxischermo della sala insieme alla classifica del Quiz degli Sposi. Una festa davvero indimenticabile per tutti!',
    },
    {
      names: 'Roberto & Valentina',
      location: 'Sposi a Castello di Guarene (Cuneo)',
      date: 'Matrimonio Luglio 2025',
      stars: 5,
      highlight: '🥩 Gestione Intolleranze per lo Chef',
      comment:
        'Avendo molti invitati celiaci e vegetariani, temevamo ritardi con la cucina. Grazie alla tabella Excel scaricata dalla dashboard, il catering aveva già tutti i piatti speciali pronti. Servizio impeccabile.',
    },
    {
      names: 'Silvia Moretti',
      location: 'Wedding Planner & Event Designer (Firenze)',
      date: 'Gestione Eventi Luxury',
      stars: 5,
      highlight: '✨ Impatto Emozionale Unico',
      comment:
        'I miei clienti cercano l\'eccellenza. LOVE offre quell\'effetto WOW che la carta non potrà mai dare, mantenendo al tempo stesso la classe e la raffinatezza della busta d\'epoca. Indispensabile per ogni agenzia.',
    },
    {
      names: 'Gianluca & Beatrice',
      location: 'Sposi a Villa Cordevigo (Verona)',
      date: 'Matrimonio Aprile 2026',
      stars: 5,
      highlight: '💬 Spedizione WhatsApp Istantanea',
      comment:
        'Inviare 150 partecipazioni personalizzate con il nome dell\'invitato direttamente su WhatsApp dal pannello ha richiesto meno di 10 minuti. Risposte arrivate tutte entro 48 ore!',
    },
  ];

  const faqs = [
    {
      q: 'Come funziona la Canzone Inedita Su Misura (+€300)?',
      a: 'È un\'opera d\'arte unica al mondo prodotta da FF Edizioni. Ci racconterete la vostra storia: come vi siete conosciuti, le vostre avventure, i vostri aneddoti ed i vostri modi di dire. Il Maestro Fausto Fusetti (iscritto SIAE n. 189515) scriverà ed inciderà in studio un brano irrepetibile con i vostri nomi.',
    },
    {
      q: 'Perché fornite 2 versioni del brano tra cui scegliere?',
      a: 'Per garantirvi la perfezione assoluta! Per ogni richiesta componiamo 2 arrangiamenti musicali con sfumature e sonorità leggermente diverse, così potrete ascoltarli entrambi e scegliere la melodia esatta che fa battere il vostro cuore.',
    },
    {
      q: 'Una canzone su misura può essere riutilizzata da altri sposi?',
      a: 'Mai! Ogni brano contiene i vostri nomi, le vostre date, la vostra città ed i vostri ricordi personali. È un\'opera d\'autore esclusiva e protetta che appartiene solo a voi.',
    },
    {
      q: 'Posso provare a creare la mia partecipazione gratuitamente?',
      a: 'Certamente! Puoi accedere liberamente al configuratore, provare i temi grafici, le melodie strumentali di benvenuto, i giochi e la busta 3D senza inserire alcuna carta di credito. Pagherai solo quando vorrai sbloccare il link definitivo.',
    },
    {
      q: 'Come funziona il servizio "Chiavi in Mano" (€249)?',
      a: 'Pensiamo a tutto noi! Ti basterà inviarci via WhatsApp le foto di coppia, i dettagli della location e le info: il team di RM Studio imposterà la grafica, ritaglierà le immagini e ti consegnerà il link pronto all\'uso in 24 ore.',
    },
    {
      q: 'Come funziona l\'invio della partecipazione agli invitati?',
      a: 'Riceverai un link unico e personalizzato (es: love.rmstudio.app/elena-e-davide). Potrai inviarlo con un semplice tocco su WhatsApp tramite la nostra dashboard o tramite QR Code sulle partecipazioni fisiche.',
    },
    {
      q: 'Gli invitati devono scaricare un\'applicazione?',
      a: 'No! LOVE è una Piattaforma Web nativa ultra-veloce. Si apre direttamente dal browser di qualsiasi smartphone (iPhone o Android) senza nessuna installazione.',
    },
    {
      q: 'Dove trovo la Dashboard Risultati & Tabelle Catering?',
      a: 'Ogni matrimonio ha la sua Dashboard riservata dove vedere la lista conferme, la scelta del menu (carne/pesce/veg), la tabella intolleranze alimentari da scaricare in formato Excel per lo chef ed inviare i messaggi WhatsApp.',
    },
    {
      q: 'Come funziona la pagina "La Festa" e il Maxischermo?',
      a: 'Gli invitati accedono alla pagina /festa il giorno delle nozze, scattano foto dal telefono che vengono proiettate in diretta sul maxischermo della sala.',
    },
    {
      q: 'Se sono un\'agenzia, posso inserire la canzone su misura per i miei clienti?',
      a: 'Assolutamente sì! Con Agency Hub potrai richiedere i brani inediti su misura per le tue coppie e proporre loro le 2 varianti d\'ascolto in anteprima.',
    },
    {
      q: 'Il sito scade dopo il matrimonio?',
      a: 'No, rimane attivo per 1 anno completo dopo le nozze per permettere a parenti ed amici di rivedere la galleria fotografica ed ascoltare la vostra canzone.',
    },
    {
      q: 'Come posso procedere con l\'acquisto?',
      a: 'Puoi creare la tua bozza gratis subito cliccando su "Crea Bozza Gratuita" o scriverci dal form di contatto per richiedere la canzone su misura o il servizio Chiavi in Mano!',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1E293B] text-base leading-relaxed">
      
      {/* SFONDO CONTINUO AVORIO */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      <KineticGrid className="relative z-10">
        
        {/* NAVBAR UFFICIALE */}
        <header className="border-b-2 border-[#D4AF37]/40 bg-[#FAF7F2]/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
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
                <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mt-0.5">
                  RM STUDIO
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 sm:gap-6">
              <div className="hidden lg:flex items-center gap-5 text-sm font-bold">
                <Link href="/elena-e-davide" className="text-[#D4AF37] hover:underline flex items-center gap-1">
                  Modello A ↗
                </Link>
                <Link href="/francesca-e-luca" className="text-slate-700 hover:underline flex items-center gap-1">
                  Modello B ↗
                </Link>
                <Link href="/giulia-e-marco" className="text-[#8B6508] hover:underline font-serif flex items-center gap-1">
                  Modello C (Landing) ↗
                </Link>
              </div>

              <a href="https://blogs.rmstudio.app/love/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#D4AF37] hidden sm:flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> Blog
              </a>

              <Link href="/login" className="px-4 py-2.5 rounded-full border-2 border-[#D4AF37] text-[#8B6508] text-xs font-bold hover:bg-amber-100 transition flex items-center gap-1.5 shadow-xs">
                <UserCheck className="w-4 h-4" /> Area Agenzie
              </Link>

              <a href="#prezzi" className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-slate-950 text-xs font-bold shadow-md hover:bg-amber-400 transition cursor-pointer">
                Crea Ora
              </a>
            </div>
          </div>
        </header>

        {/* HERO SECTION CON LEVA EMOZIONALE */}
        <section className="py-20 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex p-1 rounded-full bg-white border-2 border-[#D4AF37]/40 mb-8 shadow-sm">
            <button
              onClick={() => setActiveTab('sposi')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sposi' ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-slate-600'
              }`}
            >
              💍 Per gli Sposi
            </button>
            <button
              onClick={() => setActiveTab('agenzie')}
              className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'agenzie' ? 'bg-[#D4AF37] text-slate-950 shadow-md' : 'text-slate-600'
              }`}
            >
              💼 Per Wedding Planner
            </button>
          </div>

          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block mb-3 flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Le Partecipazioni Digitali d'Autore
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-[#1E293B] leading-tight mb-6 max-w-4xl">
            La vostra storia d'amore diventa un'opera d'arte.
          </h1>
          <p className="text-slate-700 text-base sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-serif">
            Busta d'epoca con sigillo in ceralacca 3D, mappa navigatore GPS, risposta al menu con allergie, giochi per gli invitati e spedizione istantanea con un semplice tocco su WhatsApp.
          </p>

          {/* PULSANTI ACTION AD ALTO CONTRASTO */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl mb-4">
            <Link href="/agency/sposi-in-love" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-sm shadow-xl flex items-center justify-center gap-2.5 hover:bg-amber-400 transition cursor-pointer">
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Crea Bozza Gratuita (Senza Carta)</span>
            </Link>

            <a href="#canzone-inedita" className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1E293B] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2.5 hover:bg-slate-800 transition cursor-pointer">
              <Music className="w-5 h-5 text-[#D4AF37]" />
              <span>Canzone Inedita su Misura (+€300)</span>
            </a>
          </div>

          <p className="text-sm text-slate-600 font-serif italic pt-2">
            ✦ Prova gratis il configuratore • Paghi solo quando vuoi sbloccare il link definitivo ✦
          </p>
        </section>

        {/* 🌟 SEZIONE RECENSIONI SCORREVOLI IN LOOP CONTINUO (21ST.DEV MARQUEE) */}
        <section className="py-20 bg-slate-900 text-white border-y-2 border-[#D4AF37] relative shadow-2xl overflow-hidden">
          <div className="max-w-6xl mx-auto space-y-8 relative z-10">
            <div className="text-center space-y-2 max-w-3xl mx-auto px-6">
              <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block flex items-center justify-center gap-2">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" /> Storie d'Amore &amp; Testimonianze Reali
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">Cosa dicono le Coppie ed i Wedding Planner</h2>
              <p className="text-base text-slate-300 font-serif">
                Passa il mouse sopra per mettere in pausa lo scorrimento e leggere i racconti completi.
              </p>
            </div>

            {/* SCORRIMENTO INFINITO IN LOOP DA DESTRA A SINISTRA */}
            <Marquee pauseOnHover repeat={4} className="[--duration:50s]">
              {richTestimonials.map((item, idx) => (
                <div
                  key={idx}
                  className="w-[360px] sm:w-[420px] shrink-0 p-8 bg-slate-950/90 rounded-3xl border-2 border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col justify-between space-y-5 hover:border-[#D4AF37] transition-all relative group text-left my-2"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1 text-amber-400">
                        {[...Array(item.stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-[#D4AF37]/30 group-hover:text-[#D4AF37] transition-colors" />
                    </div>

                    <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-amber-300 text-xs font-bold rounded-full">
                      {item.highlight}
                    </span>

                    <p className="text-base text-slate-200 font-serif leading-relaxed italic">
                      &quot;{item.comment}&quot;
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-1">
                    <h4 className="font-serif font-bold text-lg text-white">{item.names}</h4>
                    <p className="text-xs text-[#D4AF37] font-bold">{item.location}</p>
                    <p className="text-[11px] text-slate-400">{item.date}</p>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>
        </section>

        {/* 🌟 SEZIONE 1: PERCHÉ L'INVITO DIGITALE BATTE LA CARTA */}
        <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block">Zero Stress • Zero Carta Sprecata</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E293B]">Perché le coppie scelgono la Partecipazione Digitale LOVE</h2>
            <p className="text-base text-slate-600 font-serif">
              Addio a mesi di attesa in tipografia, buste perse per posta e foglietti smarriti con le allergie degli invitati.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-3xl border-2 border-[#D4AF37]/40 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all space-y-3 text-left">
              <div className="w-12 h-12 bg-amber-50 border border-[#D4AF37] rounded-2xl flex items-center justify-center text-[#8B6508]">
                <Zap className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1E293B]">Spedizione Istantanea con un Tocco</h3>
              <p className="text-base text-slate-600 leading-relaxed font-serif">
                Spedisci l&apos;invito personalizzato con il nome di ciascun invitato in un secondo con un semplice tocco su WhatsApp. Zero costi di spedizione o francobolli.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border-2 border-[#D4AF37]/40 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all space-y-3 text-left">
              <div className="w-12 h-12 bg-amber-50 border border-[#D4AF37] rounded-2xl flex items-center justify-center text-[#8B6508]">
                <FileSpreadsheet className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1E293B]">Conferme &amp; Tabella Excel per lo Chef</h3>
              <p className="text-base text-slate-600 leading-relaxed font-serif">
                Raccogli le risposte, il numero degli ospiti, le preferenze menu (Carne/Pesce/Veg) e la tabella delle allergie da scaricare in Excel per la cucina.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border-2 border-[#D4AF37]/40 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all space-y-3 text-left">
              <div className="w-12 h-12 bg-amber-50 border border-[#D4AF37] rounded-2xl flex items-center justify-center text-[#8B6508]">
                <MapPin className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#1E293B]">Mappa GPS Navigatore Integrata</h3>
              <p className="text-base text-slate-600 leading-relaxed font-serif">
                Gli invitati non si perderanno mai: toccano il pulsante della villa ed il navigatore dello smartphone li guida direttamente al parcheggio.
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 SEZIONE 2: SEMPLICE ANCHE PER I NONNI */}
        <section className="py-20 px-6 max-w-6xl mx-auto bg-gradient-to-br from-[#0F172A] via-slate-900 to-[#0F172A] text-white rounded-3xl border-2 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.25)]">
          <div className="grid md:grid-cols-2 gap-12 items-center text-left p-2 sm:p-6">
            <div className="space-y-5">
              <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-[#D4AF37]" /> Nessuna Applicazione da Scaricare
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Pensa a tutto il browser. Un tocco ed è subito festa.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 font-serif leading-relaxed">
                LOVE è stato progettato per garantire un&apos;usabilità perfetta su qualsiasi smartphone (iPhone o Android) con caratteri ampi, pulsanti visibili ed ad alto contrasto.
              </p>
              <ul className="space-y-3 text-base text-slate-200 font-medium pt-2">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Si apre al volo dal link WhatsApp o dal QR Code stampato</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Caratteri chiari e leggibili anche per zii e nonni</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Mappa GPS, programma orari e conferma partecipazione in un&apos;unica schermata</li>
              </ul>
            </div>

            <div className="h-80 sm:h-[400px] w-full rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop"
                alt="Partecipazione Smartphone"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* 🌟 SEZIONE 3: COME FUNZIONA IN 3 PASSI */}
        <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block">Semplice • Veloce • Intuitivo</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E293B]">Come realizzare la tua Partecipazione in 3 Passi</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 bg-white rounded-3xl border-2 border-[#D4AF37]/40 shadow-md text-left space-y-3 relative">
              <span className="w-10 h-10 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-base flex items-center justify-center font-mono">1</span>
              <h3 className="font-serif font-bold text-xl text-[#1E293B]">Crea la tua Bozza Gratis</h3>
              <p className="text-base text-slate-600 font-serif leading-relaxed">
                Accedi al configuratore, prova i modelli d&apos;autore preimpostati (Modello A, B o C), seleziona la tua palette colori ed inserisci la location.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border-2 border-[#D4AF37]/40 shadow-md text-left space-y-3 relative">
              <span className="w-10 h-10 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-base flex items-center justify-center font-mono">2</span>
              <h3 className="font-serif font-bold text-xl text-[#1E293B]">Personalizza Giochi &amp; Lista Nozze</h3>
              <p className="text-base text-slate-600 font-serif leading-relaxed">
                Aggiungi lo Scratch col dito per svelare la data, imposta il Quiz della Coppia con i premi per gli ospiti e collega l&apos;IBAN o la lista Amazon.
              </p>
            </div>

            <div className="p-8 bg-white rounded-3xl border-2 border-[#D4AF37]/40 shadow-md text-left space-y-3 relative">
              <span className="w-10 h-10 rounded-full bg-[#D4AF37] text-slate-950 font-bold text-base flex items-center justify-center font-mono">3</span>
              <h3 className="font-serif font-bold text-xl text-[#1E293B]">Spedisci &amp; Ricevi le Conferme</h3>
              <p className="text-base text-slate-600 font-serif leading-relaxed">
                Invia l&apos;invito agli invitati su WhatsApp con un tocco, proietta le foto della festa sul maxischermo e scarica il report catering in Excel.
              </p>
            </div>
          </div>
        </section>

        {/* 🌟 SEZIONE 4: VANTAGGI B2B PER WEDDING PLANNER */}
        <section className="py-20 px-6 max-w-6xl mx-auto bg-white border-2 border-[#D4AF37]/50 rounded-3xl shadow-lg text-left">
          <div className="grid md:grid-cols-2 gap-12 items-center p-2 sm:p-6">
            <div className="space-y-5">
              <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#D4AF37]" /> Piattaforma B2B riservata alle Agenzie
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E293B] leading-tight">
                Sei una Wedding Planner? Offri le Partecipazioni nei tuoi Pacchetti Luxury
              </h2>
              <p className="text-base text-slate-600 font-serif leading-relaxed">
                Con la licenza <strong>Agency Hub B2B</strong> potrai gestire fino a 10 matrimoni all&apos;anno con il logo e i contatti della tua agenzia nel footer, configuratore B2B a 3 colonne e supporto dedicato.
              </p>
              <div className="pt-2">
                <a href="#prezzi" className="inline-flex items-center gap-2 text-sm font-bold bg-[#1E293B] text-white px-8 py-4 rounded-xl hover:bg-slate-800 transition shadow-md cursor-pointer">
                  Scopri la Licenza Agenzia B2B (€490) <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </a>
              </div>
            </div>

            <div className="p-8 bg-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] space-y-4 shadow-xl">
              <span className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider block">💼 Incluso in Agency Hub:</span>
              <ul className="space-y-3 text-sm text-slate-300 font-medium">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> 10 Matrimoni Sbloccati all&apos;anno</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Logo ed intestazione della tua agenzia nel footer</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Studio Configuratore a 3 colonne per modifiche veloci</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Export Excel Liste Invitati per lo Chef</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" /> Modulo Spedizione WhatsApp con un tocco</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 🌟 SEZIONE 5: GRIGLIA FUNZIONALITÀ D'ÉLITE */}
        <section className="py-20 px-6 max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-3xl mx-auto">
            <span className="text-xs text-[#D4AF37] uppercase font-bold tracking-widest block">Tutto Incluso</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#1E293B]">I Moduli Unici della Partecipazione LOVE</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/40 shadow-md space-y-2">
              <span className="text-3xl">💌</span>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Busta d'Epoca &amp; Ceralacca 3D</h3>
              <p className="text-base text-slate-600 font-serif">L&apos;invitato tocca il sigillo in ceralacca ed apre la busta con pioggia di petali animati.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/40 shadow-md space-y-2">
              <span className="text-3xl">🎰</span>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Scratch Date "Gratta la Data"</h3>
              <p className="text-base text-slate-600 font-serif">Gli invitati grattano lo strato dorato col dito sullo schermo per svelare giorno e ora.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/40 shadow-md space-y-2">
              <span className="text-3xl">🥩</span>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Conferma con Menu &amp; Intolleranze</h3>
              <p className="text-base text-slate-600 font-serif">Scelta del menu (Carne, Pesce, Veg) e segnalazione allergie da scaricare in Excel.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/40 shadow-md space-y-2">
              <span className="text-3xl">🎁</span>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Lista Nozze IBAN &amp; Amazon</h3>
              <p className="text-base text-slate-600 font-serif">Coordinate bancarie per regali e link diretto ai negozi convenzionati o lista Amazon.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/40 shadow-md space-y-2">
              <span className="text-3xl">🎉</span>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Pagina Festa &amp; Maxischermo</h3>
              <p className="text-base text-slate-600 font-serif">Foto scattate in sala proiettate in diretta sul maxischermo con Quiz e Puzzle.</p>
            </div>

            <div className="p-8 bg-white rounded-3xl border border-[#D4AF37]/40 shadow-md space-y-2">
              <span className="text-3xl">💬</span>
              <h3 className="font-serif font-bold text-lg text-[#1E293B]">Spedizione WhatsApp Istantanea</h3>
              <p className="text-base text-slate-600 font-serif">Pannello per inviare l&apos;invito personalizzato su WhatsApp a ciascun contatto.</p>
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
            <p className="text-base text-slate-600 leading-relaxed font-serif">
              L&apos;invitato tocca il sigillo dorato sullo schermo del telefono: la busta si apre con la vostra colonna sonora d&apos;autore e pioggia di petali animati.
            </p>
            <Link href="/elena-e-davide" className="inline-flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
              Prova la Busta Live →
            </Link>
          </div>
        </section>

        {/* FOCUS NEUROMARKETING: CANZONE SU MISURA CON DOPPIA PROPOSTA D'ASCOLTO */}
        <section id="canzone-inedita" className="py-20 px-6 max-w-6xl mx-auto">
          <div className="p-8 sm:p-12 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.35)] space-y-8 relative overflow-hidden">
            <div className="max-w-3xl space-y-4 text-left">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4AF37]" /> FF EDIZIONI • PRODUZIONI MUSICALI D'AUTORE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
                Nessun'altra coppia al mondo avrà mai la vostra canzone.
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-serif">
                I brani di FF Edizioni non sono basi generiche da catalogo. Ogni canzone è un&apos;opera d&apos;arte unica ed irrepetibile, scritta partendo dai vostri ricordi reali: <strong>i vostri nomi, dove vi siete visti la prima volta, le avventure condivise, i vostri aneddoti ed i vostri modi unici di dirvi "ti amo"</strong>.
              </p>

              <div className="p-5 bg-slate-800/80 rounded-2xl border border-[#D4AF37]/50 text-sm space-y-2">
                <span className="font-bold text-amber-300 uppercase tracking-wider block flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-amber-300" /> LA GARANZIA DELLA DOPPIA SCELTA D'AUTORE:
                </span>
                <p className="text-slate-200 leading-normal font-serif text-base">
                  Per ogni richiesta di canzone su misura, il Maestro <strong>Fausto Fusetti</strong> compone ed incide <strong>2 varianti musicali leggermente diverse</strong> (nell&apos;arrangiamento e nel mood). Potrete ascoltarle entrambe in anteprima e scegliere la versione esatta che farà battere il vostro cuore.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="text-left space-y-1">
                <span className="text-xs text-slate-400 font-bold block">Integrazione nell&apos;Invito Digitale &amp; CD / MP3 d&apos;Autore</span>
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
              <p className="text-sm text-slate-500 italic font-serif">Nessun abbonamento. Il sito rimane attivo per 1 anno completo dopo le nozze.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              
              {/* PIANO 1: SPOSI SELF-SERVICE */}
              <div className="bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-3xl p-6 flex flex-col justify-between shadow-sm hover:border-[#D4AF37] transition-all relative text-left">
                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold block mb-1">Per la Coppia (Fai Da Te)</span>
                  <h3 className="font-serif text-2xl text-[#1E293B] mb-2">Sposi Autonomi</h3>
                  <div className="text-3xl font-serif text-[#1E293B] mb-4">€149 <span className="text-xs text-slate-600 font-normal">una tantum</span></div>
                  
                  <ul className="space-y-3 text-sm text-[#1E293B] mb-8 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Creazione autonoma sul Configuratore</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Busta d'epoca con Ceralacca 3D</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Colonna Sonora Strumentale di Benvenuto</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Modulo Risposta con Menu &amp; Intolleranze</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Gioco "Gratta e Scopri la Data"</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Lista Nozze IBAN &amp; Amazon Affiliata</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Spedizione WhatsApp con un tocco</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Export Excel Liste per Catering</li>
                  </ul>
                </div>

                <Link href="/agency/sposi-in-love" className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-center text-xs uppercase tracking-wider block shadow-md hover:bg-amber-400 transition cursor-pointer">
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
                  
                  <ul className="space-y-3 text-sm text-slate-200 mb-8 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> <strong className="text-amber-300">Tutto incluso del piano Premium</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> <strong className="text-amber-300">Configurazione gestita da RM Studio in 24h</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Fotoritocco &amp; ottimizzazione immagini smartphone</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Inserimento lista invitati e numeri WhatsApp</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Impostazione Quiz personalizzato &amp; Premi</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Assistenza telefonica e WhatsApp prioritaria</li>
                  </ul>
                </div>

                <a href="#contatti" className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-slate-950 font-bold text-center text-xs uppercase tracking-wider block shadow-md hover:bg-amber-400 transition cursor-pointer">
                  Richiedi "Chiavi in Mano" ↗
                </a>
              </div>

              {/* PIANO 3: AGENCY HUB WHITE-LABEL */}
              <div className="bg-[#1E293B] text-white rounded-3xl p-6 flex flex-col justify-between shadow-xl border border-slate-700 text-left">
                <div>
                  <span className="text-[10px] text-[#D4AF37] uppercase font-bold block mb-1">Per Wedding Planner &amp; Agenzie</span>
                  <h3 className="font-serif text-2xl text-white mb-2">Agency Hub B2B</h3>
                  <div className="text-3xl font-serif text-[#D4AF37] mb-4">€490 <span className="text-xs text-slate-300 font-normal">/ anno (10 Matrimoni)</span></div>
                  
                  <ul className="space-y-3 text-sm text-slate-200 mb-8 font-medium">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> 10 Matrimoni Sbloccati inclusi</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Logo della tua Agenzia nel Footer</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Selezione tra 10 Temi Grafici d'Élite</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Studio Configuratore a 3 Colonne</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Modulo Spedizione WhatsApp con un tocco</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Export Excel Liste Invitati per Catering</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" /> Canale diretto per Canzoni Inedite FF Edizioni</li>
                  </ul>
                </div>

                <a href="#contatti" className="w-full py-3.5 rounded-xl bg-slate-800 text-white border border-[#D4AF37]/50 font-bold text-center text-xs uppercase tracking-wider block shadow-md hover:bg-slate-700 transition cursor-pointer">
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
                  <div className="px-6 pb-6 text-base text-slate-600 border-t border-slate-100 pt-4">
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
            <p className="text-base text-slate-600 font-serif">
              Scrivici direttamente per richiedere la tua Canzone Inedita d'Autore (+€300) con le 2 varianti d'ascolto, il servizio Chiavi in Mano o la Licenza Agenzie.
            </p>
          </div>

          <form
            action="https://api.web3forms.com/submit"
            method="POST"
            className="p-6 md:p-8 bg-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-5 text-left"
          >
            <input type="hidden" name="access_key" value="9013a8d5-0901-42a0-b9e6-4c45553f960d" />
            <input type="hidden" name="subject" value="Nuova Richiesta da LOVE Partecipazioni Digitali" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-[#D4AF37] mb-1">Il tuo Nome e Cognome *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Es. Mario Rossi / Nome Agenzia"
                  className="w-full text-base p-4 rounded-xl border border-slate-700 bg-slate-950 text-white font-bold focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#D4AF37] mb-1">La tua Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="es. info@matrimonio.it"
                  className="w-full text-base p-4 rounded-xl border border-slate-700 bg-slate-950 text-white font-mono font-bold focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#D4AF37] mb-1">Oggetto della Richiesta</label>
              <select
                name="richiesta_tipo"
                className="w-full text-base p-4 rounded-xl border border-slate-700 bg-slate-950 text-white font-medium focus:border-[#D4AF37] outline-none cursor-pointer"
              >
                <option value="Canzone Inedita Su Misura (+€300)">🎼 Canzone Inedita Su Misura (2 Varianti Incluse - €300)</option>
                <option value="Sposi Chiavi in Mano (€249)">💍 Servizio Sposi "Chiavi in Mano" (€249)</option>
                <option value="Licenza Agency Hub B2B (€490)">💼 Licenza Agency Hub B2B Wedding Planner (€490)</option>
                <option value="Informazioni Generali">❓ Informazioni Generali</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#D4AF37] mb-1">Raccontaci la tua storia o la tua richiesta *</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Per la canzone su misura: come vi siete conosciuti, le vostre avventure, aneddoti e modi di dire..."
                className="w-full text-base p-4 rounded-xl border border-slate-700 bg-slate-950 text-white font-serif font-medium focus:border-[#D4AF37] outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#D4AF37] text-slate-950 font-bold text-sm uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer"
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
        <footer className="py-12 border-t border-[#D4AF37]/30 bg-white text-center text-sm text-slate-600">
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
