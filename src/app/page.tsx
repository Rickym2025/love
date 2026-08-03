"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScratchCard from "@/components/ScratchCard";
import Marquee from "@/components/Marquee";
import KineticGrid from "@/components/ui/kinetic-grid";
import { ArrowRight, Sparkles, ShieldCheck, Heart, Smartphone, Tv, ChevronDown } from "lucide-react";

export default function Home() {
  const coupleNames = "Elena & Davide";
  const welcomePhrase = "Due anime, un solo destino. Una storia scritta nel cuore.";

  // Caricamento Dinamico Sistema Orbitale RM Studio
  const [orbitHtml, setOrbitHtml] = useState<string>("");

  useEffect(() => {
    fetch("https://love.rmstudio.app/orbit-template.html")
      .then((res) => res.text())
      .then((html) => setOrbitHtml(html))
      .catch((err) => console.log("Orbit load fallback:", err));
  }, []);

  // Stato per l'apertura interattiva delle 10 FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "1. Come funziona la Busta con Ceralacca 3D e l'apertura dell'invito?",
      a: "All'apertura del link personalizzato, l'invito si presenta come una raffinata busta d'epoca con carta materica in rilievo. Toccando il sigillo in ceralacca dorata o bordeaux, la busta si apre con un'animazione 3D fluida e si avvia in automatico la colonna sonora d'autore personalizzata (FF Edizioni)."
    },
    {
      q: "2. Cos'è la Pagina della Festa e come funziona il Proiettore Maxischermo?",
      a: "La Pagina della Festa è un hub esclusivo per il giorno delle nozze. Gli ospiti possono caricare foto e video dal proprio smartphone applicando 10 filtri d'autore e cornici. Attivando la modalità 'Maxischermo Proiettore', tutte le foto fluiscono automaticamente in tempo reale sulla TV o sul proiettore della sala ricevimenti."
    },
    {
      q: "3. Come accedono le Agenzie e i Wedding Planner all'Agency Hub?",
      a: "Tramite l'Agency Hub White-Label (/agency/sposi-in-love), i professionisti dispongono di un pannello a 3 colonne ridimensionabili, 10 crediti annuali per i matrimoni dei clienti, 10 temi grafici d'élite e la possibilità di inserire il proprio logo agenzia nel footer di ogni sito."
    },
    {
      q: "4. Posso inserire la Lista Nozze Amazon e l'IBAN per i regali?",
      a: "Certamente. Ogni partecipazione include un modulo Lista Nozze integrato con il tag affiliato Amazon e i campi rapidi per la condivisione sicura dell'IBAN bancario per il viaggio di nozze."
    },
    {
      q: "5. Come funziona il modulo 'Gratta la Data col Dito'?",
      a: "Sfrutta un motore HTML5 Canvas avanzato. Gli ospiti possono letteralmente grattare via con il dito o con il mouse la patina dorata protettiva per scoprire il giorno, il mese e l'anno del matrimonio."
    },
    {
      q: "6. Le risposte RSVP arrivano in tempo reale agli sposi?",
      a: "Sì. Le conferme di partecipazione, comprensive del numero di ospiti, delle preferenze di menu e delle intolleranze alimentari, vengono registrate su database protetto e inviate tramite email transazionali d'élite agli sposi."
    },
    {
      q: "7. Quanto tempo rimane attivo il sito del matrimonio?",
      a: "Il sito web rimane attivo per 1 anno intero a partire dalla data di pubblicazione, coprendo sia la fase dei preparativi che l'archivio digitale post-matrimonio."
    },
    {
      q: "8. I brani musicali FF Edizioni sono inclusi?",
      a: "Sì, ogni pacchetto B2C include la colonna sonora su misura creata in collaborazione con il Maestro Fausto Fusetti, utilizzabile sia per l'invito che per il primo ballo."
    },
    {
      q: "9. È possibile personalizzare i colori e lo stile grafico?",
      a: "Assolutamente. Lo Studio Agenzia e il configuratore sposi permettono di scegliere tra 10 palette cromatiche e 10 temi d'élite, azzerando completamente i colori rosso/marrone e puntando su avorio, oro bruciato e blu notte."
    },
    {
      q: "10. Come avviene l'assistenza e il supporto tecnico?",
      a: "Il sistema è basato su infrastruttura Cloudflare R2 e Vercel ad altissima affidabilità con uptime garantito al 99.9%. Per qualsiasi personalizzazione avanzata, il team RM Studio è sempre a disposizione."
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-x-hidden">
      
      {/* ─── SFONDO CINETICO A PUNTINI DORATI (KINETIC GRID) ─── */}
      <KineticGrid className="fixed inset-0 pointer-events-none opacity-30 z-0" />

      {/* ─── HEADER MINIMALISTA ─── */}
      <header className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-6 md:px-12 py-5 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg tracking-widest uppercase text-[#D4AF37] font-bold">
            RM Studio <span className="text-white">• LOVE</span>
          </span>
        </div>
        <Link
          href="/agency/sposi-in-love"
          className="border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 px-5 py-2 text-[10px] tracking-widest uppercase font-bold rounded-full font-mono"
        >
          Area Agenzie B2B
        </Link>
      </header>

      {/* ─── HERO SECTION GOOGLE WIREFRAME OPTIMIZED ─── */}
      <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto text-center relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#D4AF37] block mb-3 font-mono">
          ✦ SAAS #16 RM STUDIO — LE PARTECIPAZIONI DIGITALI D&apos;AUTORE ✦
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
          Il Sito Matrimonio che Lascia il Segno
        </h1>
        <p className="text-base md:text-xl text-slate-300 font-serif italic mt-6 max-w-2xl mx-auto leading-relaxed">
          &quot;{welcomePhrase}&quot;
        </p>

        {/* BOTTONI ACCESSO DEMO */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <Link
            href="/elena-e-davide"
            className="px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full text-xs uppercase tracking-wider hover:bg-white transition shadow-lg flex items-center justify-center gap-2 font-mono"
          >
            Esplora Demo 1 (Villa &amp; Lago di Como) <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/francesca-e-luca"
            className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-full text-xs uppercase tracking-wider hover:bg-white hover:text-black transition shadow-lg flex items-center justify-center gap-2 font-mono"
          >
            Esplora Demo 2 (Cielo &amp; Nuvole 3D) <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ─── MARQUEE DEDICHE SCORREVOLI ─── */}
      <div className="my-6 relative z-10">
        <Marquee text="✦ Busta con Ceralacca 3D • Gratta la Data col Dito • Musica FF Edizioni • Guest Photo Wall con Proiettore • Lista Nozze Amazon &amp; IBAN ✦" />
      </div>

      {/* ─── SEZIONE INTERATTIVA: PROVA IL GRATTA LA DATA ─── */}
      <section className="py-20 px-6 bg-black/60 border-y border-white/10 text-center relative z-10 backdrop-blur-md">
        <div className="max-w-2xl mx-auto space-y-4">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#D4AF37] font-mono">Test Interattivo</span>
          <h2 className="font-serif text-3xl font-bold text-white">Prova il Modulo &quot;Gratta la Data&quot; col Dito</h2>
          <p className="text-xs text-slate-400 mb-6">Trascina il cursore o il dito sul riquadro dorato per grattare via la vernice.</p>
          
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10 shadow-inner inline-block">
            <ScratchCard day="24" month="MAGGIO" year="2026" />
          </div>
        </div>
      </section>

      {/* ─── SISTEMA ORBITALE DINAMICO RM STUDIO ─── */}
      <section className="py-24 px-6 text-center relative z-10 max-w-4xl mx-auto">
        <span className="text-[10px] font-bold tracking-[0.3em] text-[#D4AF37] uppercase block mb-3 font-mono">Ecosistema Centrale</span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">La Rete di Soluzioni RM Studio</h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto mb-12">
          Esplora l&apos;ecosistema completo di SaaS verticali e assistenti AI sviluppati da Riccardo Modena.
        </p>

        {/* CONTENITORE ORBITALE */}
        <div className="flex justify-center items-center min-h-[420px]">
          {orbitHtml ? (
            <div dangerouslySetInnerHTML={{ __html: orbitHtml }} />
          ) : (
            <div className="w-[380px] h-[380px] rounded-full border border-white/20 flex items-center justify-center animate-pulse text-xs font-mono text-[#D4AF37]">
              Caricamento Sistema Orbitale...
            </div>
          )}
        </div>
      </section>

      {/* ─── SEZIONE 10 FAQ COMPLETE DI SETTORE ─── */}
      <section className="py-24 px-6 max-w-4xl mx-auto relative z-10 border-t border-white/10">
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-[#D4AF37] block mb-2 font-mono">Supporto &amp; Chiarimenti</span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white">Domande Frequenti (FAQ)</h2>
          <p className="text-xs text-slate-400 mt-2">Tutto quello che c&apos;è da sapere sulle partecipazioni digitali Love</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#D4AF37]/50"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
                >
                  <h3 className="font-serif text-lg md:text-xl font-bold text-white">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-6 text-xs md:text-sm text-slate-300 font-light leading-relaxed border-t border-white/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── CALL TO ACTION AGENZIA B2B ─── */}
      <section className="py-16 px-6 text-center max-w-3xl mx-auto mb-20 relative z-10">
        <div className="bg-gradient-to-b from-white/10 to-white/5 text-white p-10 md:p-14 rounded-[40px] border border-[#D4AF37]/50 space-y-4 shadow-2xl backdrop-blur-xl">
          <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-[0.25em] block font-mono">✦ ACCESSO PROFESSIONALE B2B ✦</span>
          <h3 className="font-serif text-3xl font-bold">Sei un&apos;Agenzia o un Wedding Planner?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
            Configura in pochi click le partecipazioni dei tuoi clienti con il nostro Studio a 3 colonne ridimensionabili.
          </p>
          <div className="pt-2">
            <Link
              href="/agency/sposi-in-love"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-bold rounded-full text-xs uppercase tracking-widest hover:bg-white transition shadow-lg font-mono"
            >
              Apri lo Studio Agenzia (Demo Live) 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-8 text-center border-t border-white/10 text-xs text-slate-500 font-mono relative z-10">
        <p>© {new Date().getFullYear()} RM Studio • Prodotto &quot;LOVE&quot; SaaS #16 • Tutti i diritti riservati</p>
      </footer>
    </main>
  );
}
