"use client";

import React from "react";
import Image from "next/image";
import { Star, ChevronRight } from "lucide-react";
import RsvpForm from "@/components/RsvpForm";

export interface InvitationTemplateCProps {
  coupleNames: string;
  welcomePhrase: string;
  weddingDateDay: string;
  weddingDateMonth: string;
  weddingDateYear: string;
  locationName: string;
  locationAddress: string;
  outfitPhotos: string[];
  colors: string[];
  rsvpStyle: string;
}

export default function InvitationTemplateC({
  coupleNames,
  welcomePhrase,
  weddingDateDay,
  weddingDateMonth,
  weddingDateYear,
  locationName,
  locationAddress,
  outfitPhotos,
  colors,
  rsvpStyle,
}: InvitationTemplateCProps) {
  return (
    <main className="max-w-xl mx-auto px-4 py-8 space-y-6 relative z-10 text-left">
      {/* NAVBAR */}
      <div className="flex justify-between items-center p-4 bg-white/90 rounded-2xl border border-slate-200 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" unoptimized />
          <span className="font-serif font-bold text-sm text-[#1E293B]">{coupleNames}</span>
        </div>
        <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider">MENU ☰</span>
      </div>

      {/* HERO SLIDE INIZIALE */}
      <div className="p-6 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-3xl border-2 border-[#D4AF37] text-center space-y-3 shadow-md">
        <span className="text-xs uppercase font-bold tracking-widest text-[#8B6508]">IL NOSTRO GIORNO SPECIALE</span>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1E293B]">{coupleNames}</h1>
        <p className="text-sm italic font-serif opacity-90">&quot;{welcomePhrase}&quot;</p>
        <div className="pt-3">
          <a href="#rsvp" className="inline-flex items-center gap-2 text-xs font-bold bg-[#D4AF37] text-slate-900 px-5 py-2.5 rounded-xl shadow-md hover:bg-amber-400 transition-colors">
            CONFERMA PARTECIPAZIONE <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* TESTIMONIALS / AUGURI */}
      <div className="space-y-2 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block text-center">Auguri degli Invitati</span>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-center text-amber-400 mb-1"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
            <p className="text-xs italic font-serif">&quot;Non vediamo l&apos;ora!&quot;</p>
            <span className="text-[9px] font-bold text-slate-600 block mt-1.5">- Marco &amp; Sara</span>
          </div>
          <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-center text-amber-400 mb-1"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
            <p className="text-xs italic font-serif">&quot;Auguri immensi!&quot;</p>
            <span className="text-[9px] font-bold text-slate-600 block mt-1.5">- Zii Rossi</span>
          </div>
          <div className="p-3 bg-white/90 backdrop-blur-xs rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-center text-amber-400 mb-1"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
            <p className="text-xs italic font-serif">&quot;Ci saremo tutti!&quot;</p>
            <span className="text-[9px] font-bold text-slate-600 block mt-1.5">- Amici di Sempre</span>
          </div>
        </div>
      </div>

      {/* SEZIONE ALTERNATA 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-5 bg-white/90 backdrop-blur-xs rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs">
          <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80" alt="Sposi" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-[#8B6508] tracking-wider">La Cerimonia Solenne</span>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear} • Presso {locationName}
          </p>
        </div>
      </div>

      {/* SEZIONE ALTERNATA 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-5 bg-white/90 backdrop-blur-xs rounded-3xl border border-slate-200 shadow-sm">
        <div className="space-y-2 order-2 md:order-1">
          <span className="text-xs font-bold uppercase text-[#8B6508] tracking-wider">Ricevimento &amp; Gran Gala</span>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">{locationAddress}</p>
        </div>
        <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs order-1 md:order-2">
          <img src={outfitPhotos[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"} alt="Location" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* RSVP */}
      <div id="rsvp" className="pt-2">
        <RsvpForm coupleNames={coupleNames} paletteColors={colors} rsvpStyle={rsvpStyle} />
      </div>

      {/* FOOTER STRUTTURATO */}
      <footer className="p-6 bg-slate-900 text-slate-400 rounded-3xl text-xs text-center space-y-2 shadow-lg">
        <p className="font-bold text-white text-sm">© {new Date().getFullYear()} {coupleNames}</p>
        <p className="text-[10px]">P.IVA / C.F. 01234567890 • Privacy Policy • Cookie Policy</p>
        <p className="text-[#D4AF37] text-[10px]">Powered by LOVE White-Label Hub</p>
      </footer>
    </main>
  );
}
