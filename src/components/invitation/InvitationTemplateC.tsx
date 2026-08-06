"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronRight, MapPin, Gift, Sparkles, Calendar, Heart } from "lucide-react";
import RsvpForm from "@/components/RsvpForm";
import ScratchDate from "@/components/ScratchDate";
import PartnerStores from "@/components/PartnerStores";
import TimelineHowItWorks from "@/components/ui/TimelineHowItWorks";

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

  return (
    <main className="w-full max-w-xl mx-auto space-y-8 text-left py-6 px-2">
      {/* 1. HERO BANNER CONTINUO */}
      <section className="p-8 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FDFBF7] rounded-3xl border border-[#D4AF37]/40 text-center space-y-4 shadow-lg backdrop-blur-xs">
        <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#8B6508] block">✦ IL NOSTRO GIORNO SPECIALE ✦</span>
        <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1E293B] drop-shadow-xs">{coupleNames}</h1>
        <p className="text-sm font-bold text-[#8B6508] tracking-widest uppercase">{weddingDateDay} {weddingDateMonth} {weddingDateYear}</p>
        <blockquote className="text-xs italic font-serif text-slate-600 max-w-md mx-auto">&quot;{welcomePhrase}&quot;</blockquote>
        <div className="pt-2">
          <a href="#rsvp" className="inline-flex items-center gap-2 text-xs font-bold bg-[#D4AF37] text-slate-900 px-6 py-3 rounded-xl shadow-md hover:bg-amber-400 transition-colors uppercase tracking-wider">
            CONFERMA LA PARTECIPAZIONE <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 2. AUGURI DEGLI INVITATI */}
      <section className="space-y-2 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block text-center">Messaggi e Dediche degli Invitati</span>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex justify-center text-amber-400 mb-1"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
            <p className="text-xs italic font-serif">&quot;Non vediamo l&apos;ora!&quot;</p>
            <span className="text-[9px] font-bold text-slate-600 block mt-1.5">- Marco &amp; Sara</span>
          </div>
          <div className="p-3 bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex justify-center text-amber-400 mb-1"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
            <p className="text-xs italic font-serif">&quot;Auguri immensi ragazzi!&quot;</p>
            <span className="text-[9px] font-bold text-slate-600 block mt-1.5">- Zii Rossi</span>
          </div>
          <div className="p-3 bg-white/95 backdrop-blur-xs rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex justify-center text-amber-400 mb-1"><Star className="w-3.5 h-3.5 fill-amber-400" /></div>
            <p className="text-xs italic font-serif">&quot;Ci saremo tutti a brindare!&quot;</p>
            <span className="text-[9px] font-bold text-slate-600 block mt-1.5">- Amici di Sempre</span>
          </div>
        </div>
      </section>

      {/* 3. SEZIONE ALTERNATA 1: LA CERIMONIA SOLENNE */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-6 bg-gradient-to-r from-white via-[#FAF7F2] to-white rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="w-full h-52 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs">
          <img src={heroMediaImage} alt="Sposi" className="w-full h-full object-cover" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase text-[#8B6508] tracking-widest">La Cerimonia Solenne</span>
          <h3 className="text-lg font-serif font-bold text-[#1E293B]">Il Sacro Sì</h3>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            {weddingDateDay} {weddingDateMonth} {weddingDateYear} • Presso {locationName}
          </p>
        </div>
      </section>

      {/* 4. SEZIONE ALTERNATA 2: RICEVIMENTO & GRAN GALA */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-6 bg-gradient-to-r from-[#FAF7F2] via-white to-[#FAF7F2] rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="space-y-2 order-2 md:order-1">
          <span className="text-xs font-bold uppercase text-[#8B6508] tracking-widest">Ricevimento &amp; Party</span>
          <h3 className="text-lg font-serif font-bold text-[#1E293B]">Cena di Gala e Festeggiamenti</h3>
          <p className="text-xs font-medium text-slate-600 leading-relaxed">{locationAddress}</p>
        </div>
        <div className="w-full h-52 rounded-2xl overflow-hidden relative border border-slate-200 shadow-xs order-1 md:order-2">
          <img src={outfitPhotos[0] || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"} alt="Location" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* 5. MODULO DATA & COUNTDOWN */}
      {dateMode === "countdown" && (
        <section className="p-6 rounded-3xl shadow-md border text-center space-y-2 bg-gradient-to-b from-white to-[#FAF7F2] border-[#D4AF37]/30">
          <span className="text-xs font-bold uppercase tracking-wider block font-serif text-[#8B6508]">
            ⏳ Il nostro grande giorno inizia tra
          </span>
          <div className="flex justify-center gap-4 font-serif font-bold text-xl text-[#1E293B]">
            <div><span className="block text-2xl text-[#8B6508]">129</span><span className="text-[10px] uppercase text-slate-600 font-sans">Giorni</span></div>
            <span>:</span>
            <div><span className="block text-2xl text-[#8B6508]">14</span><span className="text-[10px] uppercase text-slate-600 font-sans">Ore</span></div>
            <span>:</span>
            <div><span className="block text-2xl text-[#8B6508]">23</span><span className="text-[10px] uppercase text-slate-600 font-sans">Minuti</span></div>
            <span>:</span>
            <div><span className="block text-2xl text-[#8B6508]">17</span><span className="text-[10px] uppercase text-slate-600 font-sans">Secondi</span></div>
          </div>
        </section>
      )}

      {dateMode === "scratch" && (
        <section className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider block font-serif text-[#8B6508]">
            🎰 Gratta col dito per scoprire la data
          </span>
          <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
        </section>
      )}

      {/* 6. PROGRAMMA DELLA GIORNATA */}
      <section id="programma">
        {scheduleSchema === "howitworks" && (
          <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base text-[#8B6508]">
              📍 Programma della Giornata
            </span>
            <TimelineHowItWorks items={scheduleItems} accentColor={accentColor} />
          </div>
        )}

        {scheduleSchema === "classico" && (
          <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base text-[#8B6508]">
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

      {/* 7. LOCATION CON MAPPA GOOGLE SEPARATA */}
      {showMappa && (
        <section id="location" className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5 text-[#8B6508]">
            <MapPin className="w-4 h-4 text-[#8B6508]" /> Location del Matrimonio
          </span>
          <h3 className="font-serif font-bold text-xl text-[#1E293B]">{locationName}</h3>
          <p className="text-xs text-slate-600">{locationAddress}</p>

          {showGoogleMapIframe && (
            <div className="w-full h-56 rounded-2xl overflow-hidden border border-slate-200 my-3 shadow-inner relative">
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
            className="inline-flex items-center gap-2 text-xs font-bold text-white px-5 py-2.5 rounded-xl transition-colors shadow-md bg-[#1E293B]"
          >
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> Apri Mappa &amp; Indicazioni ↗
          </a>
        </section>
      )}

      {/* 8. DRESS CODE & PALETTE */}
      {showDressCode && (
        <section id="dresscode" className="p-6 rounded-3xl shadow-md border text-center space-y-4 bg-white border-slate-200">
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
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
              {outfitPhotos.map((imgUrl, idx) => (
                <div key={idx} className="w-32 h-44 flex-shrink-0 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 snap-center">
                  <img src={imgUrl} alt={`Outfit ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. NEGOZI CONVENZIONATI */}
      {showNegozi && <PartnerStores stores={partnerStores} showAmazonAffiliate={showAmazonAffiliate} />}

      {/* 10. LISTA NOZZE IBAN */}
      {showListaNozze && (
        <section id="listanozze" className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5 text-[#8B6508]">
            <Gift className="w-4 h-4 text-[#8B6508]" /> Lista Nozze &amp; Coordinate IBAN
          </span>
          <p className="text-xs text-slate-600 font-serif">Il regalo più grande è la vostra presenza. Per chi desidera contribuire al nostro viaggio di nozze:</p>
          <div className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#1E293B] break-all">{customIban}</div>
        </section>
      )}

      {/* 11. RSVP COMPLETO CON INTOLLERANZE */}
      <section id="rsvp" className="pt-2">
        <RsvpForm coupleNames={coupleNames} paletteColors={colors} rsvpStyle={rsvpStyle} />
      </section>

      {/* 12. FESTA */}
      {showHubGiochi && (
        <section id="festa" className="p-6 bg-gradient-to-br from-[#1E293B] to-slate-800 text-white rounded-3xl shadow-xl text-center space-y-3">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Hub della Festa &amp; Maxischermo
          </span>
          <p className="text-xs text-slate-300">Partecipa al Quiz degli sposi, gioca al Puzzle e carica le tue foto sul Photo Wall!</p>
          <Link href={`/${cleanSlug}/festa`} className="inline-flex items-center gap-2 text-xs font-bold bg-[#D4AF37] text-slate-900 px-5 py-3 rounded-xl hover:bg-amber-400 transition-colors shadow-lg">
            <Heart className="w-4 h-4 fill-slate-900" /> Entra nella Pagina della Festa ↗
          </Link>
        </section>
      )}

      {/* 13. FOOTER STRUTTURATO D'AUTORE */}
      <footer className="p-6 bg-slate-900 text-slate-400 rounded-3xl text-xs text-center space-y-2 shadow-lg">
        <p className="font-bold text-white text-sm">© {new Date().getFullYear()} {coupleNames} — Sito Ufficiale del Matrimonio</p>
        <p className="text-[10px]">P.IVA / C.F. 01234567890 • Privacy Policy • Cookie Policy</p>
        <p className="text-[#D4AF37] text-[10px]">Powered by LOVE White-Label Hub</p>
      </footer>
    </main>
  );
}
