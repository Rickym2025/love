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
  Building2,
  ArrowRight,
  ChevronDown,
  Star,
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
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3D39] selection:bg-[#D4AF37] selection:text-white">
      
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

      {/* HERO SECTION CON FOTO DI SFONDO ROMANTICA E LUCE CALDA */}
      <section className="relative py-24 px-6 text-center max-w-5xl mx-auto flex flex-col items-center rounded-3xl my-6 overflow-hidden bg-cover bg-center shadow-2xl" style={{ backgroundImage: "linear-gradient(to bottom, rgba(250,247,242,0.85), rgba(250,247,242,0.95)), url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop')" }}>
        
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
      <section className="py-16 px-6 bg-[#F4EFE6] border-y border-[#E5DACB]">
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

      {/* SISTEMA ORBITALE RM STUDIO */}
      <section className="py-12 border-t border-[#E5DACB]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold block mb-2">Ecosistema RM Studio</span>
          <OrbitWidget />
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

    </div>
  );
}
