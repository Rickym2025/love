"use client";

import React from "react";
import { MapPin } from "lucide-react";

export interface InvitationLocationProps {
  locationName: string;
  locationAddress: string;
  showGoogleMapIframe: boolean;
  accentColor: string;
  textColor: string;
  bgCard: string;
  borderCard: string;
}

export default function InvitationLocation({
  locationName,
  locationAddress,
  showGoogleMapIframe,
  accentColor,
  textColor,
  bgCard,
  borderCard,
}: InvitationLocationProps) {
  const rawAddress = locationAddress || locationName || "Villa Rosa";
  const mapQuery = encodeURIComponent(rawAddress.trim());

  return (
    <div className="p-6 rounded-3xl shadow-md border text-center space-y-3 bg-white border-slate-200">
      <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base flex items-center justify-center gap-1.5" style={{ color: accentColor }}>
        <MapPin className="w-4 h-4" style={{ color: accentColor }} /> Location del Matrimonio
      </span>
      {/* NOME E INDIRIZZO SEMPRE VISIBILI */}
      <h3 className="font-serif font-bold text-xl" style={{ color: textColor }}>{locationName}</h3>
      <p className="text-xs text-slate-600">{locationAddress}</p>

      {/* MAPPA GOOGLE IFRAME MOSTRATA SOLO SE ATTIVA */}
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
        className="inline-flex items-center gap-2 text-xs font-bold text-white px-4 py-2.5 rounded-xl transition-colors shadow-md"
        style={{ backgroundColor: textColor }}
      >
        <MapPin className="w-4 h-4 text-[#D4AF37]" /> Apri Mappa &amp; Indicazioni ↗
      </a>
    </div>
  );
}
