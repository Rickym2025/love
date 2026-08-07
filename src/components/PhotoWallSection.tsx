"use client";

import React, { useState } from "react";
import { Camera, Download, X, Sparkles, Plus, Trash2, Heart } from "lucide-react";

export interface PhotoWallItem {
  id: string;
  url: string;
  caption?: string;
  author?: string;
  filterCss?: string;
}

export interface PhotoWallSectionProps {
  photos?: PhotoWallItem[];
  isAgencyDashboard?: boolean;
  onUpdatePhotos?: (photos: PhotoWallItem[]) => void;
}

export const POLAROID_FILTERS = [
  { id: "normal", name: "1. Originale", filterCss: "none" },
  { id: "sepia", name: "2. Vintage Sepia", filterCss: "sepia(0.8) contrast(1.1)" },
  { id: "bw", name: "3. Bianco & Nero", filterCss: "grayscale(1) contrast(1.2)" },
  { id: "warm", name: "4. Warm Sunset", filterCss: "sepia(0.4) saturate(1.5) hue-rotate(-10deg)" },
  { id: "cool", name: "5. Cool Drama", filterCss: "contrast(1.2) saturate(0.8) hue-rotate(15deg)" },
  { id: "retro", name: "6. Retro Film", filterCss: "contrast(1.3) sepia(0.3) saturate(1.2)" },
  { id: "vivid", name: "7. Vivid Color", filterCss: "saturate(1.8) contrast(1.1)" },
  { id: "glam", name: "8. Soft Glamour", filterCss: "brightness(1.1) contrast(0.9) saturate(1.1)" },
  { id: "noir", name: "9. Cinema Noir", filterCss: "grayscale(1) contrast(1.6) brightness(0.9)" },
  { id: "gold", name: "10. Golden Hour", filterCss: "sepia(0.5) brightness(1.05) saturate(1.3)" },
];

export const CAPTION_PRESETS = [
  "Momenti indimenticabili! ❤️",
  "Un brindisi agli sposi! 🥂",
  "Siete fantastici! ✨",
  "Viva gli sposi! 🎉",
  "Una giornata piena d'amore! 🌹",
  "Auguri di cuore! 💍",
];

export default function PhotoWallSection({
  photos = [
    { id: "1", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", caption: "Il primo ballo degli sposi", author: "Marco & Sara" },
    { id: "2", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", caption: "Taglio della Torta", author: "Zii Rossi" },
    { id: "3", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80", caption: "Brindisi in Giardino", author: "Amici di Sempre" },
  ],
  isAgencyDashboard = false,
  onUpdatePhotos,
}: PhotoWallSectionProps) {
  const [albumPhotos, setAlbumPhotos] = useState<PhotoWallItem[]>(photos);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoWallItem | null>(null);
  const [activeFilterId, setActiveFilterId] = useState("normal");
  const [editAuthor, setEditAuthor] = useState("");
  const [editCaption, setEditCaption] = useState("");

  const currentFilter = POLAROID_FILTERS.find((f) => f.id === activeFilterId) || POLAROID_FILTERS[0];

  const handleOpenPhotoModal = (photo: PhotoWallItem) => {
    setSelectedPhoto(photo);
    setActiveFilterId("normal");
    setEditAuthor(photo.author || "Invitato");
    setEditCaption(photo.caption || "Foto del Matrimonio");
  };

  // SALVA COME NUOVA FOTO NELL'ALBUM (NON SOVRASCRIVE L'ORIGINALE)
  const handleSaveAsNewPhoto = () => {
    if (!selectedPhoto) return;

    const newPhotoItem: PhotoWallItem = {
      id: Date.now().toString(),
      url: selectedPhoto.url,
      caption: editCaption || "Nuovo Scatto d'Amore",
      author: editAuthor || "Invitato",
      filterCss: currentFilter.filterCss,
    };

    const updated = [newPhotoItem, ...albumPhotos];
    setAlbumPhotos(updated);
    if (typeof onUpdatePhotos === "function") {
      onUpdatePhotos(updated);
    }
    setSelectedPhoto(null);
  };

  // CANCELLAZIONE FOTO (RISERVATA SOLTANTO ALL'AGENZIA DALLA DASHBOARD)
  const handleDeletePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAgencyDashboard) return;

    if (window.confirm("Sei sicuro di voler eliminare questa foto dall'album?")) {
      const updated = albumPhotos.filter((p) => p.id !== id);
      setAlbumPhotos(updated);
      if (typeof onUpdatePhotos === "function") {
        onUpdatePhotos(updated);
      }
    }
  };

  return (
    <div className="w-full space-y-4 text-center">
      <div className="space-y-1">
        <h3 className="text-base font-serif font-bold text-[#8B6508] flex items-center justify-center gap-1.5 uppercase">
          <Camera className="w-5 h-5 text-[#D4AF37]" /> Album Fotografico degli Sposi &amp; Invitati
        </h3>
        <p className="text-xs font-serif italic text-slate-600">
          Tocca qualsiasi foto per ingrandirla, applicare i 10 Filtri Polaroid e aggiungere la tua dedica!
        </p>
      </div>

      {/* GRIGLIA FOTO ALBUM */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-2">
        {albumPhotos.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenPhotoModal(item)}
            className="p-2 bg-white rounded-2xl border-2 border-[#D4AF37]/50 shadow-md hover:shadow-xl hover:scale-105 transition-all cursor-pointer relative group"
          >
            {/* PULSANTE ELIMINA RISERVATO SOLO ALL'AGENZIA IN DASHBOARD */}
            {isAgencyDashboard && (
              <button
                type="button"
                onClick={(e) => handleDeletePhoto(item.id, e)}
                className="absolute top-3 right-3 z-20 p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-md cursor-pointer"
                title="Elimina Foto (Solo Dashboard Agenzia)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            <div className="w-full h-36 rounded-xl overflow-hidden relative border border-slate-200">
              <img
                src={item.url}
                alt={item.caption || "Foto Album"}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                style={{ filter: item.filterCss || "none" }}
              />
            </div>
            <div className="pt-2 text-left space-y-0.5">
              <p className="text-[10px] font-bold font-serif text-[#1E293B] truncate">{item.caption || "Foto del Matrimonio"}</p>
              <p className="text-[9px] text-[#8B6508] font-bold block truncate">- {item.author || "Invitato"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL LIGHTBOX HD PER MOBILE & 10 FILTRI POLAROID + STILE INSTAGRAM */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 md:p-6 animate-fade-in overflow-y-auto">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-50 p-2.5 bg-slate-800 text-white rounded-full hover:bg-slate-700 cursor-pointer shadow-lg"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-xl w-full bg-white p-4 md:p-6 rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-4 text-center my-auto">
            <span className="text-xs font-bold text-[#8B6508] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Anteprima Foto HD &amp; 10 Filtri Polaroid
            </span>

            {/* FOTO HD CON FILTRO LIVE APPLICATO */}
            <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner relative">
              <img
                src={selectedPhoto.url}
                alt="Foto Filtro"
                className="w-full h-full object-cover transition-all duration-300"
                style={{ filter: currentFilter.filterCss }}
              />
            </div>

            {/* CAMPI STILE INSTAGRAM: AUTORE & DEDICA */}
            <div className="space-y-2 text-left bg-[#FAF7F2] p-3 rounded-2xl border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-[#8B6508]">Chi ha scattato la foto?</label>
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-bold"
                    placeholder="Il tuo nome..."
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#8B6508]">Scegli una frase d&apos;auguri pronta:</label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) setEditCaption(e.target.value);
                    }}
                    className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
                  >
                    <option value="">-- Seleziona Frase --</option>
                    {CAPTION_PRESETS.map((cap, i) => (
                      <option key={i} value={cap}>{cap}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#8B6508]">Oppure scrivi la tua Dedica Stile Instagram:</label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-serif font-bold text-[#1E293B]"
                  placeholder="Scrivi la tua dedica..."
                />
              </div>
            </div>

            {/* SELEZIONE 10 FILTRI POLAROID */}
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5">
                Applica Filtro Polaroid:
              </span>
              <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                {POLAROID_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilterId(f.id)}
                    className={`px-3 py-1.5 text-[10px] font-bold rounded-lg shrink-0 border transition-all cursor-pointer ${
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

            {/* PULSANTI SALVA COME NUOVA FOTO */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleSaveAsNewPhoto}
                className="flex-1 py-3 bg-[#D4AF37] text-slate-900 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Salva come Nuova Foto nell&apos;Album
              </button>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="px-4 py-3 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
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
