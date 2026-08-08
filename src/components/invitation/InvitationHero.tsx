"use client";

import React from "react";
import Image from "next/image";
import EnvelopeWax from "@/components/EnvelopeWax";
import PartingClouds from "@/components/PartingClouds";
import WaterRippleImage from "@/components/ui/water-ripple-image";
import ScrollExpandMedia from "@/components/ui/scroll-expand-media";
import CosmosHero from "@/components/ui/CosmosHero";

export interface InvitationHeroProps {
  start?: string;
  coupleNames?: string;
  weddingDateDay?: string;
  weddingDateMonth?: string;
  weddingDateYear?: string;
  heroBgParam?: string;
  heroMediaImage?: string;
  waterImageUrl?: string;
  showBusta?: boolean;
  showNuvole?: boolean;
  apertoAcqua?: boolean;
  apertoCosmos?: boolean;
  playWeddingAudio?: () => void;
  setApertoAcqua?: (val: boolean) => void;
  setApertoCosmos?: (val: boolean) => void;
}

export default function InvitationHero({
  start = "busta",
  coupleNames = "Elena & Davide",
  weddingDateDay = "15",
  weddingDateMonth = "Settembre",
  weddingDateYear = "2026",
  heroBgParam = "/sfondi/fiori.jpg",
  heroMediaImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  waterImageUrl = "",
  showBusta = true,
  showNuvole = true,
  apertoAcqua = false,
  apertoCosmos = false,
  playWeddingAudio,
  setApertoAcqua,
  setApertoCosmos,
}: InvitationHeroProps) {
  return (
    <div className="w-full relative z-10">
      {/* 1. EFFETTO BUSTA 3D CON SIGILLO PERSONALIZZATO */}
      {start === "busta" && showBusta && (
        <EnvelopeWax
          coupleNames={coupleNames}
          waxSealUrl={waterImageUrl || "/wax-seal.png"}
          onOpen={playWeddingAudio}
        />
      )}

      {/* 2. EFFETTO NUVOLE 3D */}
      {start === "nuvole" && showNuvole && (
        <PartingClouds onOpen={playWeddingAudio} />
      )}

      {/* 3. EFFETTO SPECCHIO D'ACQUA LAGO */}
      {start === "lago" && !apertoAcqua && (
        <div className="relative w-full h-56 md:h-64 overflow-hidden border-b-2 border-[#D4AF37]">
          <WaterRippleImage
            src={waterImageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"}
            onClick={() => {
              if (typeof playWeddingAudio === "function") playWeddingAudio();
              if (typeof setApertoAcqua === "function") setApertoAcqua(true);
            }}
          />
        </div>
      )}

      {/* 4. ZOOM MULTIMEDIALE ALLO SCROLL */}
      {start === "expand" && (
        <div className="py-2 px-4">
          <ScrollExpandMedia
            bgImageSrc={heroBgParam || "/sfondi/fiori.jpg"}
            mediaSrc={heroMediaImage}
            title={coupleNames}
            date={`${weddingDateDay} ${weddingDateMonth} ${weddingDateYear}`}
            onExpand={playWeddingAudio}
          />
        </div>
      )}

      {/* 5. ORIZZONTE COSMICO 3D */}
      {start === "cosmos" && !apertoCosmos && (
        <div className="relative w-full h-[320px]">
          <CosmosHero
            coupleNames={coupleNames}
            weddingDate={`${weddingDateDay} ${weddingDateMonth} ${weddingDateYear}`}
            onEnter={() => {
              if (typeof playWeddingAudio === "function") playWeddingAudio();
              if (typeof setApertoCosmos === "function") setApertoCosmos(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
