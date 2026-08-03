"use client";

import React, { useState, useEffect } from "react";
import EnvelopeWax from "@/components/EnvelopeWax";
import AudioPlayer from "@/components/AudioPlayer";
import PhotoWallSection from "@/components/PhotoWallSection";
import ScratchDate from "@/components/ScratchDate";
import { Calendar, MapPin, Heart, Clock, Gift, Sparkles, Check } from "lucide-react";

export default function WeddingPage({ params }: { params: { slug: string } }) {
  const isDemo2 = params?.slug === "francesca-e-luca";

  // Nomi e Dati Dinamici della Coppia
  const coupleNames = isDemo2 ? "Francesca & Luca" : "Zohan & Rose";
  const weddingDate = isDemo2 ? "12 SETTEMBRE 2026" : "27 SETTEMBRE 2026";
  const locationName = isDemo2 ? "Villa Borghese, Puerto Vallarta" : "Islamic Center of Melville";

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 129, hours: 14, minutes: 22, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        return { ...prev, seconds: 59, minutes: prev.minutes - 1 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] font-sans selection:bg-[#D4AF37] selection:text-white pb-20">
      
      {/* 1. BUSTA D'EPOCA CON CERALACCA */}
      <EnvelopeWax coupleNames={coupleNames} weddingDate={weddingDate} initials={isDemo2 ? "F&L" : "R&Z"} />

      {/* 2. PLAYER MUSICALE FISSO */}
      <AudioPlayer songTitle={`Brano d'Autore Inedito — ${coupleNames}`} />

      {/* ─── SEZIONE 1: HERO ARCO ROMANO E LAGO CON CIGNI ANIMATI ─── */}
      <section className="relative min-h-screen flex flex-col items-center justify-between p-6 text-center bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]">
        
        {/* Cornice Arco Architettonico */}
        <div className="w-full max-w-xl mx-auto border-8 border-double border-[#D4AF37]/40 rounded-t-[180px] p-8 bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2] shadow-2xl mt-6">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#D4AF37] block mb-2">
            IL GIORNO DEL NOSTRO MATRIMONIO
          </span>
          <p className="text-sm font-serif italic text-slate-500 mb-4">{weddingDate}</p>

          <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#1E293B] tracking-wide my-4">
            {coupleNames}
          </h1>

          <p className="text-xs tracking-[0.2em] uppercase text-[#D4AF37] font-bold mt-6 animate-pulse">
            Scorri verso il basso ↓
          </p>

          {/* LAGO CON CIGNI ANIMATI IN CSS (Come Immagine 2) */}
          <div className="relative w-full h-64 mt-8 rounded-b-2xl overflow-hidden border border-[#D4AF37]/30 shadow-inner bg-gradient-to-b from-sky-100 via-amber-50 to-blue-200">
            {/* Specchio d'Acqua Animato */}
            <div className="absolute inset-0 opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100/50 via-sky-200/30 to-blue-300/40 animate-pulse" />

            {/* CIGNI CHE GALLEGGIANO (ANIMAZIONE CSS) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 animate-[float_4s_ease-in-out_infinite]">
              {/* Cigno Sinistra */}
              <div className="text-4xl transform -scale-x-100 drop-shadow-md">🦢</div>
              {/* Cuore Sospeso */}
              <div className="text-xs text-rose-400 animate-ping">❤️</div>
              {/* Cigno Destra */}
              <div className="text-4xl drop-shadow-md">🦢</div>
            </div>

            {/* Riflesso sull'Acqua */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-2 bg-white/40 blur-sm rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ─── SEZIONE 2: DEDICA SU CARTA STRAPPATA E COUNTDOWN ─── */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center">
        {/* Scheda Carta Strappata Vintage */}
        <div 
          className="bg-[#FFFDF9] p-8 md:p-12 rounded-3xl border border-[#D4AF37]/40 shadow-xl relative"
          style={{
            boxShadow: "0 20px 40px rgba(212,175,55,0.08)"
          }}
        >
          <span className="text-xs font-serif italic text-[#D4AF37] text-lg block mb-2">
            "Due Anime, Un Solo Destino. Una vita scritta nel cuore."
          </span>
          <p className="text-sm text-slate-600 font-serif leading-relaxed my-4">
            Cari parenti e amici, unitevi a noi per una serata piena d'amore, gioia, benedizioni e ricordi indimenticabili mentre iniziamo il nostro per sempre insieme.
          </p>

          {/* COUNTDOWN TIMER VINTAGE ORO (Come Immagine 3) */}
          <div className="pt-8 border-t border-[#D4AF37]/20 mt-8">
            <h3 className="font-serif italic text-2xl text-[#1E293B] mb-6">La Celebrazione Inizia Tra</h3>
            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
              <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#D4AF37]/30">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">{timeLeft.days}</span>
                <span className="block text-[10px] font-bold uppercase text-slate-400 mt-1">Giorni</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#D4AF37]/30">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">{timeLeft.hours}</span>
                <span className="block text-[10px] font-bold uppercase text-slate-400 mt-1">Ore</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#D4AF37]/30">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">{timeLeft.minutes}</span>
                <span className="block text-[10px] font-bold uppercase text-slate-400 mt-1">Minuti</span>
              </div>
              <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#D4AF37]/30">
                <span className="font-serif text-2xl font-bold text-[#D4AF37]">{timeLeft.seconds}</span>
                <span className="block text-[10px] font-bold uppercase text-slate-400 mt-1">Secondi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEZIONE 3: PROGRAMMA ORARI DELLA GIORNATA (TIMELINE) ─── */}
      <section className="py-16 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#D4AF37]/30 shadow-lg">
          <h2 className="font-serif text-3xl text-[#1E293B] mb-8 italic">Programma della Giornata</h2>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[#D4AF37]/30">
            <div className="flex items-center justify-between relative z-10">
              <span className="font-serif text-xl font-bold text-[#D4AF37] w-1/3 text-right pr-4">17:00</span>
              <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white shadow-md" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] w-1/3 text-left pl-4">Arrivo Ospiti</span>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <span className="font-serif text-xl font-bold text-[#D4AF37] w-1/3 text-right pr-4">18:00</span>
              <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white shadow-md" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] w-1/3 text-left pl-4">Cerimonia di Nozze</span>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <span className="font-serif text-xl font-bold text-[#D4AF37] w-1/3 text-right pr-4">19:00</span>
              <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white shadow-md" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] w-1/3 text-left pl-4">Aperitivo sul Lago</span>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <span className="font-serif text-xl font-bold text-[#D4AF37] w-1/3 text-right pr-4">20:00</span>
              <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white shadow-md" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] w-1/3 text-left pl-4">Cena di Galà</span>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <span className="font-serif text-xl font-bold text-[#D4AF37] w-1/3 text-right pr-4">22:00</span>
              <div className="w-4 h-4 rounded-full bg-[#D4AF37] border-4 border-white shadow-md" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E293B] w-1/3 text-left pl-4">Taglio Torta & Party</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SEZIONE 4: LOCATION & MAPPA ─── */}
      <section className="py-12 px-6 max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-3xl text-[#1E293B] mb-2 italic">La Location</h2>
        <p className="text-xs uppercase font-bold text-[#D4AF37] tracking-widest mb-6">{locationName}</p>

        <div className="rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-xl bg-white p-2">
          <iframe
            title="Mappa Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.821!2d9.2558!3d45.9872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4784360e22700001%3A0x7d28734208a5d3f1!2sVilla%20del%20Balbianello!5e0!3m2!1sit!2sit!4v1650000000000"
            className="w-full h-80 rounded-2xl border-0"
            loading="lazy"
          />
        </div>
      </section>

      {/* ─── SEZIONE 5: DRESS CODE & LISTA NOZZE ─── */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center">
        <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md space-y-6">
          <div>
            <h3 className="font-serif text-2xl text-[#1E293B] italic">Dress Code & Palette Colori</h3>
            <p className="text-xs text-slate-600 mt-2">
              Chiediamo gentilmente agli ospiti di indossare abiti eleganti in toni pastello ed evitare i colori rosso scuro e bordeaux.
            </p>
          </div>

          <div className="pt-4 border-t border-[#D4AF37]/20">
            <h3 className="font-serif text-2xl text-[#1E293B] italic">Preferenza Regali / Lista Nozze</h3>
            <p className="text-xs text-slate-600 mt-2">
              Il regalo più bello è la vostra presenza. Per chi desidera contribuire al nostro viaggio di nozze, è disponibile l'IBAN o la Lista Nozze Amazon.
            </p>
          </div>
        </div>
      </section>

      {/* ─── SEZIONE 6: GUEST PHOTO WALL DELLA FESTA ─── */}
      <PhotoWallSection coupleNames={coupleNames} />

      {/* Keyframe per l'animazione dei Cigni */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}
