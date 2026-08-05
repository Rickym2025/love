"use client";

import React from "react";
import Image from "next/image";
import { ShoppingBag, ExternalLink } from "lucide-react";

export interface PartnerStoreItem {
  id: string;
  name: string;
  url: string;
  logoUrl?: string;
}

export interface PartnerStoresProps {
  stores?: PartnerStoreItem[];
  showAmazonAffiliate?: boolean;
}

export default function PartnerStores({
  stores = [],
  showAmazonAffiliate = true,
}: PartnerStoresProps) {
  // DEDUPLICAZIONE RIGOROSA DI AMAZON PER EVITARE DOPPI PULSANTI
  const hasAmazonInStores = (stores || []).some(
    (s) => s.id === "amazon-default" || (s.name && s.name.toLowerCase().includes("amazon"))
  );

  const defaultAmazonStore: PartnerStoreItem = {
    id: "amazon-default",
    name: "Lista Nozze Ufficiale Amazon",
    url: "https://www.amazon.it/baby-reg/homepage?tag=zero100store-21",
    logoUrl: "/logo.png",
  };

  const storeList = [
    ...(showAmazonAffiliate && !hasAmazonInStores ? [defaultAmazonStore] : []),
    ...(stores || []),
  ];

  if (storeList.length === 0) return null;

  return (
    <div className="mx-3 my-3 p-4 rounded-2xl text-center border shadow-sm space-y-3 bg-white border-slate-200">
      <span className="text-[10px] font-bold uppercase block font-serif text-[#8B6508] flex items-center justify-center gap-1">
        <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" /> Negozi Convenzionati &amp; Lista Nozze
      </span>

      <div className="space-y-2">
        {storeList.map((store, idx) => (
          <a
            key={store.id || idx}
            href={store.url || "#"}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-[#FAF7F2] hover:border-[#D4AF37] transition-all group pointer-events-auto cursor-pointer"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="relative w-6 h-6 shrink-0">
                <Image
                  src={store.logoUrl || "/logo.png"}
                  alt={store.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <span className="text-xs font-bold text-[#1E293B] truncate">{store.name}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-[#8B6508] group-hover:scale-110 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
}
