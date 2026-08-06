"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Gift, Sparkles, Calendar, Heart, Star } from "lucide-react";
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

  const mapQuery = encodeURIComponent((locationAddress || locationName || "Villa Rosa").trim());

  const wishes = [
    {
      name: "Sofia & Lorenzo",
      role: "Invitati",
      text: "Non vediamo l'ora di festeggiare insieme il vostro amore!",
      stars: 5,
    },
    {
      name: "Famiglia Rossi",
      role: "Zii",
      text: "Un augurio immenso di tanta felicità per il vostro percorso.",
      stars: 5,
    },
    {
      name: "Marco & Giulia",
      role: "Amici di Sempre",
      text: "Ci saremo tutti a brindare al giorno più bello!",
      stars: 5,
    },
  ];

  return (
    <div className="relative min-h-screen text-[#1E293B] select-none">
      {/* SFONDO LANDING PAGE AVORIO CON OVERLAY */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />

      <KineticGrid className="relative z-10 space-y-8 pb-12">
        {/* HEADER NAVBAR LANDING */}
        <header className="border-b border-[#D4AF37]/30 bg-[#FAF7F2]/90 backdrop-blur-md sticky top-0 z-40 shadow-xs">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/wax-seal.png" alt="Sigillo" className="w-8 h-8 object-contain drop-shadow" unoptimized />
              <span className="font-serif text-xl font-bold tracking-wider text-[#1E293B]">
                {coupleNames}
              </span>
            </div>
            <a
              href="#rsvp"
              className="px-5 py-2 rounded-full bg-[#D4AF37] text-slate-900 text-xs font-bold shadow-sm hover:bg-amber-400 transition"
            >
              Conferma Partecipazione
            </a>
          </div>
        </header>

        {/* HERO SECTION LANDING SUI DATI DEGLI SPOSI */}
        <section className="py-12 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block mb-2">
            Il Matrimonio di {coupleNames}
          </span>
          <h1 className="font-serif text-3xl sm:text-6xl font-normal text-[#1E293B] leading-tight mb-4">
            {coupleNames}
          </h1>
          <p className="text-slate-600 font-serif text-base sm:text-lg italic max-w-xl mx-auto mb-6">
            &quot;{welcomePhrase}&quot;
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-[#8B6508] mb-8">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear} • Presso {locationName}
          </p>
          <a
            href="#rsvp"
            className="px-8 py-3.5 rounded-full bg-[#D4AF37] text-slate-900 font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:bg-amber-400 transition"
          >
            <span>Conferma la Tua Presenza</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>

        {/* MARQUEE AUGURI INVITATI */}
        <section className="py-8 bg-white/80 backdrop-blur-sm border-y border-[#D4AF37]/30 shadow-xs">
          <div className="max-w-6xl mx-auto px-6 text-center mb-4">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold">Auguri &amp; Dediche degli Invitati</span>
          </div>
          <Marquee items={wishes} />
        </section>

        {/* SEZIONE ALTERNATA 1 (FOTO A SINISTRA | TESTO A DESTRA) */}
        <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={heroMediaImage}
              alt="Cerimonia"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-3">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block">La Cerimonia Solenne</span>
            <h3 className="font-serif text-3xl text-[#1E293B]">Il Sacro Sì</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              Vi aspettiamo il {weddingDateDay} {weddingDateMonth} {weddingDateYear} a {locationName} per celebrare con noi l'inizio di questa nuova avventura.
            </p>
          </div>
        </section>

        {/* SEZIONE ALTERNATA 2 (TESTO A SINISTRA | FOTO A DESTRA) */}
        <section className="py-12 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center border-t border-[#D4AF37]/20">
          <div className="order-2 md:order-1 space-y-3">
            <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold block">Ricevimento &amp; Party</span>
            <h3 className="font-serif text-3xl text-[#1E293B]">Cena di Gala e Festeggiamenti</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-serif">
              I festeggiamenti proseguiranno presso {locationAddress} tra cocktail hour, cena di gala, musica dal vivo e taglio della torta.
            </p>
          </div>
          <div className="order-1 md:order-2 h-72 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img
              src={outfitPhotos[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop"}
              alt="Ricevimento"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* DEMO GAMIFICATION GRATTA DATA */}
        {dateMode === "scratch" && (
          <section className="py-12 px-6 bg-white/80 backdrop-blur-sm border-y border-[#D4AF37]/30 text-center shadow-xs">
            <div className="max-w-3xl mx-auto space-y-2">
              <h2 className="font-serif text-2xl text-[#1E293B]">Gratta per scoprire la data ufficiale!</h2>
              <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
            </div>
          </section>
        )}

        {/* PROGRAMMA GIORNATA */}
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

        {/* LOCATION CON MAPPA GOOGLE */}
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

        {/* DRESS CODE */}
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
