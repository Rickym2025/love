"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, MapPin, Store } from "lucide-react";
import ScratchDate from "@/components/ScratchDate";
import RsvpForm from "@/components/RsvpForm";
import PartingClouds from "@/components/PartingClouds";

export interface PartnerStore {
  id: string;
  name: string;
  url: string;
  logoUrl: string;
}

interface AgencyPreviewProps {
  selectedTemplate: "A" | "B";
  selectedColorScheme: string;
  coupleNames: string;
  weddingDateDay: string;
  weddingDateMonth: string;
  weddingDateYear: string;
  locationName: string;
  locationAddress: string;
  welcomePhrase: string;
  dressCodeNotes: string;
  partnerStores: PartnerStore[];
  modules: Record<string, boolean>;
  audioUrl: string;
}

export default function AgencyPreview({
  selectedTemplate,
  selectedColorScheme,
  coupleNames,
  weddingDateDay,
  weddingDateMonth,
  weddingDateYear,
  locationName,
  locationAddress,
  welcomePhrase,
  dressCodeNotes,
  partnerStores,
  modules,
  audioUrl,
}: AgencyPreviewProps) {
  // Genera URL dinamico con tutti i parametri per sincronizzare il Fullscreen
  const fullscreenDynamicUrl = `/${
    selectedTemplate === "A" ? "elena-e-davide" : "francesca-e-luca"
  }?day=${encodeURIComponent(weddingDateDay)}&month=${encodeURIComponent(
    weddingDateMonth
  )}&year=${encodeURIComponent(weddingDateYear)}&couple=${encodeURIComponent(
    coupleNames
  )}&location=${encodeURIComponent(locationName)}&phrase=${encodeURIComponent(
    welcomePhrase
  )}&audio=${encodeURIComponent(audioUrl)}`;

  return (
    <div className="flex-1 p-6 bg-[#1E293B] flex flex-col items-center justify-center min-w-[340px]">
      <div className="flex justify-between items-center w-full max-w-[340px] mb-3 text-white">
        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> VERO Invito Live Sincronizzato
        </span>
        <Link href={fullscreenDynamicUrl} target="_blank" className="text-[11px] text-slate-300 hover:text-white flex items-center gap-1 font-bold">
          Apri Fullscreen ↗
        </Link>
      </div>

      {/* FRAME SMARTPHONE MOCKUP */}
      <div className={`w-[340px] h-[600px] rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-y-auto ${
        selectedTemplate === "B" || selectedColorScheme === "2" ? "bg-[#F0F7FF] text-[#1976D2]" : "bg-[#FAF7F2] text-[#1E293B]"
      }`}>
        
        {/* BUSTA D'EPOCA CON VERA CERALACCA */}
        {modules.busta3d && (
          <div className="p-4 bg-[#F5EFE6] border-b border-[#D4AF37]/30 text-center relative shadow-sm">
            <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">✦ Partecipazione Digitale</span>
            <p className="font-serif font-bold text-sm text-[#1E293B]">{coupleNames}</p>
            <div className="relative w-12 h-12 mx-auto my-2">
              <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority />
            </div>
            <span className="text-[9px] uppercase font-bold text-slate-400 animate-pulse">Tocca per Aprire</span>
          </div>
        )}

        {/* INTRO HERO */}
        <div className="text-center pt-6 px-4">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">Wedding Day</span>
          <p className="text-xs font-bold text-slate-400 mt-0.5">{weddingDateDay} {weddingDateMonth} {weddingDateYear}</p>
          <h3 className="text-2xl font-serif font-bold mt-1 text-[#1E293B]">{coupleNames}</h3>
          <p className="text-xs italic mt-2 px-2 font-serif opacity-80">&quot;{welcomePhrase}&quot;</p>
          <p className="text-xs font-bold text-[#D4AF37] mt-2 uppercase">{locationName}</p>
        </div>

        {/* GRATTIAMO LA DATA */}
        {modules.grattaData && (
          <div className="my-4 mx-3 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2">🎰 Gratta col Dito per Scoprire la Data</span>
            <ScratchDate day={weddingDateDay} month={weddingDateMonth} year={weddingDateYear} />
          </div>
        )}

        {/* LOCATION & MAPPA GOOGLE / INDICAZIONI GRATUITE */}
        {modules.locationMappa && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-center shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase block">📍 Location &amp; Indicazioni</span>
            <p className="font-bold text-xs text-[#1E293B]">{locationName}</p>
            <p className="text-[10px] text-slate-500 mb-2">{locationAddress}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-bold bg-[#1E293B] text-white px-3 py-1.5 rounded-lg hover:bg-slate-800"
            >
              <MapPin className="w-3 h-3 text-[#D4AF37]" /> Indicazioni Mappa ↗
            </a>
          </div>
        )}

        {/* DRESS CODE */}
        {modules.codiceAbbigliamento && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl text-center border border-slate-200 shadow-sm">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">Dress Code &amp; Palette</span>
            <p className="text-[10px] text-slate-500 mb-2">{dressCodeNotes}</p>
          </div>
        )}

        {/* NEGOZI CONVENZIONATI */}
        {modules.negoziConvenzionati && (
          <div className="mx-3 my-4 p-4 bg-white rounded-2xl border border-slate-200 text-xs shadow-sm space-y-2">
            <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">🏪 Negozi Convenzionati</span>
            {partnerStores.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-[#FAF7F2] rounded-xl text-[10px] font-bold text-[#1E293B] flex items-center gap-2 border border-slate-200 hover:border-[#D4AF37] block">
                <Store className="w-3.5 h-3.5 text-[#D4AF37] flex-shrink-0" />
                <span className="truncate">{s.name} ↗</span>
              </a>
            ))}
          </div>
        )}

        {/* CONFEMA PARTECIPAZIONE RSVP */}
        {modules.confermaRsvp && (
          <div className="p-3">
            <RsvpForm coupleNames={coupleNames} />
          </div>
        )}
      </div>
    </div>
  );
}
