"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Gift, Sparkles, Calendar, Heart } from "lucide-react";
import RsvpForm from "@/components/RsvpForm";
import ScratchDate from "@/components/ScratchDate";
import PartnerStores from "@/components/PartnerStores";
import TimelineHowItWorks from "@/components/ui/TimelineHowItWorks";
import Marquee from "@/components/Marquee";
import KineticGrid from "@/components/ui/kinetic-grid";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
}

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
  heroMediaImage?: string;
  heroBgImage?: string;
  dateMode?: string;
  scheduleSchema?: string;
  scheduleItems?: ScheduleItem[];
  dressCodeNotes?: string;
  customIban?: string;
  partnerStores?: any[];
  showAmazonAffiliate?: boolean;
  showGoogleMapIframe?: boolean;
  showMappa?: boolean;
  showDressCode?: boolean;
  showNegozi?: boolean;
  showListaNozze?: boolean;
  showHubGiochi?: boolean;
  cleanSlug?: string;
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
  heroMediaImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  heroBgImage = "palette",
  dateMode = "countdown",
  scheduleSchema = "classico",
  scheduleItems = [
    { id: "1", time: "16:30", title: "Arrivo ed Accoglienza Ospiti" },
    { id: "2", time: "17:00", title: "Cerimonia Solenne di Nozze" },
    { id: "3", time: "18:30", title: "Aperitivo & Cocktail Hour in Giardino" },
    { id: "4", time: "20:00", title: "Cena di Gala & Taglio Torta" },
    { id: "5", time: "22:00", title: "Festa, DJ Set & Open Bar" },
  ],
  dressCodeNotes = "Abiti eleganti nei toni cromatici della palette",
  customIban = "IT60 X 05428 11101 000000123456",
  partnerStores = [],
  showAmazonAffiliate = true,
  showGoogleMapIframe = true,
  showMappa = true,
  showDressCode = true,
  showNegozi = true,
  showListaNozze = true,
  showHubGiochi = true,
  cleanSlug = "elena-e-davide",
}: InvitationTemplateCProps) {
  const accentColor = colors[3] || "#8B6508";
  const textColor = colors[4] || "#1E293B";
  const bgCard = colors[1] || "#FFFFFF";
  const borderCard = colors[2] || "#E6C687";

  const mapQuery = encodeURIComponent((locationAddress || locationName || "Villa Rosa").trim());

  const testimonials = [
    {
      name: "Sofia & Lorenzo",
      role: "Invitati",
      text: "Un matrimonio unico da favola, emozionante al primo tocco!",
      stars: 5,
    },
    {
      name: "Elena Valenti",
      role: "Wedding Staff",
      text: "Un'organizzazione impeccabile con dettagli coordinati in ogni momento.",
      stars: 5,
    },
    {
      name: "Marco & Giulia",
      role: "Amici di Sempre",
      text: "La festa ed il maxischermo sono stati spettacoli indimenticabili.",
      stars: 5,
    },
  ];

  return (
    <div className="relative min-h-screen text-[#1E293B] select-none">
      <KineticGrid className="relative z-10 space-y-12 pb-12">
        {/* HERO SECTION DALLA LANDING PAGE LOVE */}
        <section className="pt-16 pb-8 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 p-1.5 px-4 rounded-full bg-white border border-[#D4AF37]/40 mb-6 shadow-sm">
            <Image src="/wax-seal.png" alt="LOVE Wax" width={20} height={20} className="object-contain" unoptimized />
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#8B6508]">
              IL MATRIMONIO DI {coupleNames.toUpperCase()}
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-7xl font-normal text-[#1E293B] leading-tight mb-6 max-w-4xl drop-shadow-xs">
            {coupleNames}
          </h1>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-serif italic">
            &quot;{welcomePhrase}&quot;
          </p>

          <p className="text-sm font-bold text-[#8B6508] tracking-widest uppercase mb-8">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear} • Presso {locationName}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
            <a
              href="#rsvp"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4AF37] text-slate-900 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 hover:bg-amber-400 transition cursor-pointer"
            >
              <span>Conferma Partecipazione</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* RECENSIONI / STRISCIA MARQUEE INVITATI */}
        <section className="py-8 bg-white/80 backdrop-blur-sm border-y border-[#D4AF37]/30 overflow-hidden shadow-xs">
          <div className="max-w-6xl mx-auto px-6 text-center mb-4">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold">Auguri &amp; Messaggi degli Invitati</span>
          </div>
          <Marquee items={testimonials} />
        </section>

        {/* SEZIONE ALTERNATA 1 (IMMAGINE SINISTRA | DESCRIZIONE DESTRA) */}
        <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="h-80 sm:h-[380px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={heroMediaImage}
              alt="Cerimonia Sposi"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-4">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block">La Cerimonia Solenne</span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#1E293B]">Un&apos;emozione al primo tocco</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-serif">
              Vi aspettiamo il {weddingDateDay} {weddingDateMonth} {weddingDateYear} per celebrare insieme il nostro sì.
            </p>
          </div>
        </section>

        {/* SEZIONE ALTERNATA 2 (DESCRIZIONE SINISTRA | IMMAGINE DESTRA) */}
        <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center border-t border-[#D4AF37]/20">
          <div className="order-2 md:order-1 space-y-4">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block font-serif">Ricevimento &amp; Gran Gala</span>
            <h3 className="font-serif text-3xl sm:text-5xl text-[#1E293B]">I ricordi più belli da condividere</h3>
            <p className="text-sm text-slate-600 leading-relaxed font-serif">
              I festeggiamenti proseguiranno presso {locationName} ({locationAddress}) tra cocktail hour, cena di gala e open bar.
            </p>
          </div>
          <div className="order-1 md:order-2 h-80 sm:h-[380px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={outfitPhotos[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"}
              alt="Ricevimento"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* GAMIFICATION DEMO GRATTA LA DATA */}
        {dateMode === "scratch" && (
          <section className="py-12 px-6 bg-white/80 backdrop-blur-sm border-y border-[#D4AF37]/30 text-center shadow-xs">
            <div className="max-w-3xl mx-auto space-y-2">
              <h2 className="font-serif text-2xl text-[#1E293B]">Prova il "Gratta e Scopri" con il dito!</h2>
              <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
            </div>
          </section>
        )}

        {/* PROGRAMMA DELLA GIORNATA */}
        <section id="programma" className="py-10 px-6 max-w-4xl mx-auto text-center space-y-4">
          {scheduleSchema === "howitworks" && (
            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-[#8B6508] mb-2">
                📍 Programma della Giornata
              </span>
              <TimelineHowItWorks items={scheduleItems} accentColor={accentColor} />
            </div>
          )}

          {scheduleSchema === "classico" && (
            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-[#8B6508]">
                Programma della Giornata
              </span>
              <div className="space-y-2 text-sm font-serif pt-1 text-[#1E293B]">
                {scheduleItems.map((item) => (
                  <p key={item.id}>
                    <strong className="font-sans text-[#8B6508]">{item.time}</strong> — {item.title}
                  </p>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* LOCATION CON MAPPA GOOGLE SEPARATA */}
        {showMappa && (
          <section id="location" className="py-10 px-6 max-w-4xl mx-auto text-center">
            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5 text-[#8B6508]">
                <MapPin className="w-4 h-4 text-[#8B6508]" /> Location del Matrimonio
              </span>
              <h3 className="font-serif font-bold text-xl text-[#1E293B]">{locationName}</h3>
              <p className="text-xs text-slate-600">{locationAddress}</p>

              {showGoogleMapIframe && (
                <div className="w-full h-64 rounded-2xl overflow-hidden border border-slate-200 my-3 shadow-inner relative">
                  <iframe
                    title="Mappa Location"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://maps.google.com/maps?q=${mapQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  />
                </div>
              )}

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-900 px-6 py-3 rounded-xl transition-colors shadow-md bg-[#D4AF37] hover:bg-amber-400"
              >
                <MapPin className="w-4 h-4 text-slate-900" /> Apri Mappa &amp; Indicazioni ↗
              </a>
            </div>
          </section>
        )}

        {/* DRESS CODE & PALETTE */}
        {showDressCode && (
          <section id="dresscode" className="py-10 px-6 max-w-4xl mx-auto text-center">
            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base text-[#8B6508]">
                Dress Code &amp; Palette
              </span>
              <p className="text-xs font-serif leading-relaxed text-[#1E293B]">{dressCodeNotes}</p>

              <div className="flex justify-center gap-2">
                {colors.map((color, i) => (
                  <div key={i} className="w-7 h-7 rounded-full border border-slate-300 shadow-sm" style={{ backgroundColor: color }} />
                ))}
              </div>

              <div className="pt-2">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-2">Esempi di Abbigliamento Consigliati (Scorri ➔)</span>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x justify-center">
                  {outfitPhotos.map((imgUrl, idx) => (
                    <div key={idx} className="w-28 h-36 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 snap-center">
                      <img src={imgUrl} alt={`Outfit ${idx + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* NEGOZI CONVENZIONATI */}
        {showNegozi && (
          <section className="py-6 px-6 max-w-4xl mx-auto">
            <PartnerStores stores={partnerStores} showAmazonAffiliate={showAmazonAffiliate} />
          </section>
        )}

        {/* LISTA NOZZE IBAN */}
        {showListaNozze && (
          <section id="listanozze" className="py-10 px-6 max-w-4xl mx-auto text-center">
            <div className="p-6 bg-white rounded-3xl border border-[#D4AF37]/30 shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5 text-[#8B6508]">
                <Gift className="w-4 h-4 text-[#8B6508]" /> Lista Nozze &amp; Coordinate IBAN
              </span>
              <p className="text-xs text-slate-600 font-serif">Il regalo più grande è la vostra presenza. Per chi desidera contribuire al nostro viaggio di nozze:</p>
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#1E293B] break-all">{customIban}</div>
            </div>
          </section>
        )}

        {/* MODULO RSVP COMPLETO CON INTOLLERANZE */}
        <section id="rsvp" className="py-10 px-6 max-w-3xl mx-auto">
          <RsvpForm coupleNames={coupleNames} paletteColors={colors} rsvpStyle={rsvpStyle} />
        </section>

        {/* FESTA & MAXISCHERMO */}
        {showHubGiochi && (
          <section id="festa" className="py-10 px-6 max-w-4xl mx-auto text-center">
            <div className="p-6 bg-gradient-to-br from-[#1E293B] to-slate-800 text-white rounded-3xl shadow-xl space-y-3">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Hub della Festa &amp; Maxischermo
              </span>
              <p className="text-xs text-slate-300">Partecipa al Quiz degli sposi, gioca al Puzzle e carica le tue foto sul Photo Wall!</p>
              <Link href={`/${cleanSlug}/festa`} className="inline-flex items-center gap-2 text-xs font-bold bg-[#D4AF37] text-slate-900 px-5 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-lg">
                <Heart className="w-4 h-4 fill-slate-900" /> Entra nella Pagina della Festa ↗
              </Link>
            </div>
          </section>
        )}
      </KineticGrid>
    </div>
  );
}
