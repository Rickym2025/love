"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, ShoppingBag } from "lucide-react";

export interface StoreItem {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
}

interface PartnerStoresProps {
  stores?: StoreItem[];
}

export default function PartnerStores({
  stores = [
    {
      id: "1",
      name: "Gioielleria Valenza",
      logoUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&q=80",
      websiteUrl: "https://www.gioielleriavalenza.it",
      description: "Lista nozze per argenteria, fedi e articoli per la casa.",
    },
    {
      id: "2",
      name: "Rinascente Milano",
      logoUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=200&q=80",
      websiteUrl: "https://www.rinascente.it",
      description: "Lista nozze design, elettrodomestici e arredamento.",
    },
  ],
}: PartnerStoresProps) {
  return (
    <div className="space-y-4 my-6">
      <h4 className="font-serif font-bold text-[#1E293B] text-lg text-center">
        🏪 Negozi Convenzionati in Città
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stores.map((store) => (
          <a
            key={store.id}
            href={store.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-[#D4AF37] hover:shadow-md transition flex items-center gap-4 text-left group"
          >
            <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
              <Image
                src={store.logoUrl}
                alt={store.name}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h5 className="font-bold text-xs text-[#1E293B] truncate group-hover:text-[#D4AF37] transition">
                  {store.name}
                </h5>
                <ExternalLink className="w-3 h-3 text-slate-400 flex-shrink-0" />
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{store.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
