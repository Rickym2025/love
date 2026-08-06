"use client";

import React from "react";
import Image from "next/image";
import PartingClouds from "@/components/PartingClouds";
import EnvelopeWax from "@/components/EnvelopeWax";
import WaterRippleImage from "@/components/ui/water-ripple-image";
import ScrollExpandMedia from "@/components/ui/scroll-expand-media";
import CosmosHero from "@/components/ui/CosmosHero";

export interface InvitationHeroProps {
  start: string;
  coupleNames: string;
  weddingDateDay: string;
  weddingDateMonth: string;
  weddingDateYear: string;
  heroBgParam: string;
  heroMediaImage: string;
  waterImageUrl?: string;
  showBusta: boolean;
  showNuvole: boolean;
  apertoAcqua: boolean;
  apertoCosmos: boolean;
  playWeddingAudio: () => void;
  setApertoAcqua: (val: boolean) => void;
  setApertoCosmos: (val: boolean) => void;
}

export default function InvitationHero({
  start,
  coupleNames,
  weddingDateDay,
  weddingDateMonth,
  weddingDateYear,
  heroBgParam,
  heroMediaImage,
  waterImageUrl = "",
  showBusta,
  showNuvole,
  apertoAcqua,
  apertoCosmos,
  playWeddingAudio,
  setApertoAcqua,
  setApertoCosmos,
}: InvitationHeroProps) {
  const isWhiteBg = heroBgParam === "#FFFFFF";
  const isPaletteSync = heroBgParam === "palette" || !heroBgParam;

  return (
    <>
      {start === "nuvole" && showNuvole && <PartingClouds onOpen={playWeddingAudio} />}

      {start === "expand" && (
        <ScrollExpandMedia
          bgImageSrc={isPaletteSync || isWhiteBg ? "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80" : heroBgParam}
          mediaSrc={heroMediaImage || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"}
          title={coupleNames}
          date={`${weddingDateDay} ${weddingDateMonth} ${weddingDateYear}`}
          scrollToExpand="Scorri per Ingrandire"
          onExpand={playWeddingAudio}
        />
      )}

      {start === "lago" && !apertoAcqua && (
        <div className="fixed inset-0 z-50 w-screen h-screen bg-slate-900">
          <WaterRippleImage src={waterImageUrl || (isPaletteSync || isWhiteBg ? "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" : heroBgParam)} />
          <div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-black/30 hover:bg-black/20 transition-colors"
            onClick={() => {
              playWeddingAudio();
              setApertoAcqua(true);
            }}
          >
            <div className="relative w-24 h-24 drop-shadow-2xl animate-pulse">
              <Image src="/wax-seal.png" alt="Sigillo Ceralacca" fill className="object-contain" priority unoptimized />
            </div>
            <p className="mt-4 text-[#D4AF37] font-serif font-bold text-sm tracking-widest uppercase drop-shadow">
              Tocca il Sigillo per Entrare
            </p>
          </div>
        </div>
      )}

      {start === "cosmos" && !apertoCosmos && (
        <CosmosHero
          coupleNames={coupleNames}
          weddingDate={`${weddingDateDay} ${weddingDateMonth} ${weddingDateYear}`}
          onEnter={() => {
            playWeddingAudio();
            setApertoCosmos(true);
          }}
        />
      )}

      {start === "busta" && showBusta && (
        <EnvelopeWax coupleNames={coupleNames} onOpen={playWeddingAudio} />
      )}
    </>
  );
}
