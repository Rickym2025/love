"use client";

import React, { useState } from "react";
import { Camera, Download, X, Sparkles, Image as ImageIcon } from "lucide-react";

export interface PhotoWallItem {
  id: string;
  url: string;
  caption?: string;
  author?: string;
}

export interface PhotoWallSectionProps {
  photos?: PhotoWallItem[];
}

export const POLAROID_FILTERS = [
  { id: "normal", name: "1. Originale", filterCss: "none" },
  { id: "sepia", name: "2. Vintage Sepia", filterCss: "sepia(0.8) contrast(1.1) brightness(0.95)" },
  { id: "bw", name: "3. Bianco & Nero", filterCss: "grayscale(1) contrast(1.2)" },
  { id: "warm", name: "4. Warm Sunset", filterCss: "sepia(0.4) saturate(1.4) hue-rotate(-10deg)" },
  { id: "cool", name: "5. Cool Drama", filterCss: "contrast(1.2) saturate(0.8) hue-rotate(15deg)" },
  { id: "retro", name: "6. Retro Film", filterCss: "contrast(1.3) sepia(0.3) saturate(1.2)" },
  { id: "vivid", name: "7. Vivid Color", filterCss: "saturate(1.8) contrast(1.1)" },
  { id: "glam", name: "8. Soft Glamour", filterCss: "brightness(1.1) contrast(0.9) saturate(1.1)" },
  { id: "noir", name: "9. Cinema Noir", filterCss: "grayscale(1) contrast(1.6) brightness(0.9)" },
  { id: "gold", name: "10. Golden Hour", filterCss: "sepia(0.5) brightness(1.05) saturate(1.3)" },
];

export default function PhotoWallSection({
  photos = [
    { id: "1", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", caption: "Il primo ballo degli sposi", author: "Marco & Sara" },
    { id: "2", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", caption: "Taglio della Torta", author: "Zii Rossi" },
    { id: "3", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", caption: "Brindisi in Giardino", author: "Amici di Sempre" },
  ]
}: PhotoWallSectionProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWallItem | null>(null);
  const [activeFilterId, setActiveFilterId] = useState("normal");

  const currentFilter = POLAROID_FILTERS.find((f) => f.id === activeFilterId) || POLAROID_FILTERS[0];

  const handleDownloadFilteredPhoto = () => {
    if (!selectedPhoto) return;
    const link = document.createElement("a");
    link.href = selectedPhoto.url;
    link.target = "_blank";
    link.download = `Foto_Sposi_Polaroid_${selectedPhoto.id}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-4 text-center">
      <div className="space-y-1">
        <h3 className="text-base font-serif font-bold text-[#8B6508] flex items-center justify-center gap-1.5 uppercase">
          <Camera className="w-5 h-5 text-[#D4AF37]" /> Album Fotografico degli Sposi &amp; Invitati
        </h3>
        <p className="text-xs font-serif italic text-slate-600">
          Clicca su qualsiasi foto dell&apos;album per aprirla a tutto schermo e applicare i 10 Filtri Polaroid!
        </p>
      </div>

      {/* GRIGLIA FOTO ALBUM POLAROID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        {photos.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setSelectedPhoto(item);
              setActiveFilterId("normal");
            }}
            className="p-2 bg-white rounded-2xl border-2 border-[#D4AF37]/50 shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer group"
          >
            <div className="w-full h-36 rounded-xl overflow-hidden relative border border-slate-200">
              <img src={item.url} alt={item.caption || "Foto Album"} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="pt-2 text-left space-y-0.5">
              <p className="text-[10px] font-bold font-serif text-[#1E293B] truncate">{item.caption || "Foto del Matrimonio"}</p>
              <p className="text-[9px] text-[#8B6508] font-bold block truncate">- {item.author || "Invitato"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL LIGHTBOX FULLSCREEN PER FOTO + 10 FILTRI POLAROID */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-fade-in">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 p-2 bg-slate-800 text-white rounded-full hover:bg-slate-700 cursor-pointer shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-md w-full bg-white p-4 rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-4 text-center">
            <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Anteprima Foto &amp; 10 Filtri Polaroid
            </span>

            {/* FOTO CON FILTRO CSS APPLICATO LIVE */}
            <div className="w-full h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
              <img
                src={selectedPhoto.url}
                alt="Foto Filtro"
                className="w-full h-full object-cover transition-all duration-300"
                style={{ filter: currentFilter.filterCss }}
              />
            </div>

            <p className="text-xs font-serif font-bold text-[#1E293B]">{selectedPhoto.caption}</p>

            {/* BARRA SELEZIONE 10 FILTRI POLAROID */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5">
                Seleziona Filtro Polaroid (10 Opzioni):
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {POLAROID_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilterId(f.id)}
                    className={`px-2.5 py-1.5 text-[10px] font-bold rounded-lg shrink-0 border transition-all cursor-pointer ${
                      activeFilterId === f.id
                        ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-md"
                        : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={handleDownloadFilteredPhoto}
                className="flex-1 py-2.5 bg-[#D4AF37] text-slate-900 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Download className="w-4 h-4" /> Scarica Foto
              </button>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-2.5 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
