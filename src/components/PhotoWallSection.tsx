"use client";

import React, { useState } from "react";
import { Camera, Sparkles, Plus, Trash2, X, Heart, MessageSquare, User } from "lucide-react";

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
    { id: "1", url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80", caption: "Il primo ballo degli sposi", author: "Marco & Sara" },
    { id: "2", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80", caption: "Taglio della Torta", author: "Zii Rossi" },
    { id: "3", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80", caption: "Brindisi in Giardino", author: "Amici di Sempre" },
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
    setEditCaption(photo.caption || "Momento del Matrimonio ❤️");
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
      <div className="space-y-1.5">
        <h3 className="text-lg md:text-xl font-serif font-bold text-[#D4AF37] flex items-center justify-center gap-2 uppercase tracking-wide">
          <Camera className="w-6 h-6 text-[#D4AF37]" /> Album Fotografico degli Sposi
        </h3>
        <p className="text-xs md:text-sm font-serif italic text-slate-300 max-w-lg mx-auto">
          Tocca una foto per ingrandirla, applicare i 10 Filtri Polaroid e personalizzare la dedica in stile Instagram!
        </p>
      </div>

      {/* GRIGLIA FOTO ALBUM - VISIBILE E AD ALTO CONTRASTO */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pt-2">
        {albumPhotos.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOpenPhotoModal(item)}
            className="p-2.5 bg-slate-900 rounded-2xl border-2 border-[#D4AF37]/60 shadow-lg hover:border-[#D4AF37] hover:scale-[1.02] transition-all cursor-pointer relative group flex flex-col justify-between"
          >
            {/* PULSANTE ELIMINA RISERVATO SOLO ALL'AGENZIA DALLA DASHBOARD */}
            {isAgencyDashboard && (
              <button
                type="button"
                onClick={(e) => handleDeletePhoto(item.id, e)}
                className="absolute top-3 right-3 z-30 p-2 bg-rose-600 text-white rounded-full hover:bg-rose-700 shadow-xl cursor-pointer"
                title="Elimina Foto (Riservato Agenzia)"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden relative border border-slate-700 bg-black">
              <img
                src={item.url}
                alt={item.caption || "Foto Album"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ filter: item.filterCss || "none" }}
              />
            </div>

            <div className="pt-2 text-left space-y-0.5">
              <p className="text-xs md:text-sm font-bold font-serif text-white truncate">{item.caption || "Foto del Matrimonio"}</p>
              <p className="text-[11px] md:text-xs text-[#D4AF37] font-bold block truncate">- {item.author || "Invitato"}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL LIGHTBOX HD E SENIOR-FRIENDLY CON STILE INSTAGRAM */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 md:p-6 overflow-y-auto">
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-50 p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 cursor-pointer shadow-2xl border border-slate-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-2xl w-full bg-slate-900 text-white p-4 md:p-6 rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
              <h4 className="text-base md:text-lg font-serif font-bold text-[#D4AF37] uppercase tracking-wider">
                Personalizza Foto &amp; Filtri Polaroid
              </h4>
            </div>

            {/* ANTEPRIMA GRANDE HD - ADATTA ANCHE AI PIÙ ANZIANI */}
            <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-inner bg-black relative">
              <img
                src={selectedPhoto.url}
                alt="Foto Ingrandita"
                className="w-full h-full object-contain md:object-cover transition-all duration-300"
                style={{ filter: currentFilter.filterCss }}
              />
            </div>

            {/* CAMPI STILE INSTAGRAM: AUTORE & DEDICA CON TESTO GRANDE */}
            <div className="space-y-3 text-left bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Chi ha scattato la foto?
                  </label>
                  <input
                    type="text"
                    value={editAuthor}
                    onChange={(e) => setEditAuthor(e.target.value)}
                    className="w-full text-sm p-3 rounded-xl border border-slate-600 bg-slate-950 text-white font-bold focus:border-[#D4AF37] outline-none"
                    placeholder="Il tuo nome o nickname..."
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                    <MessageSquare className="w-4 h-4" /> Scegli una frase pronta:
                  </label>
                  <select
                    onChange={(e) => {
                      if (e.target.value) setEditCaption(e.target.value);
                    }}
                    className="w-full text-sm p-3 rounded-xl border border-slate-600 bg-slate-950 text-white font-medium cursor-pointer focus:border-[#D4AF37] outline-none"
                  >
                    <option value="">-- Seleziona Frase d&apos;Auguri --</option>
                    {CAPTION_PRESETS.map((cap, i) => (
                      <option key={i} value={cap}>{cap}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1">
                  Oppure scrivi la tua Dedica Personalizzata (Stile Instagram):
                </label>
                <input
                  type="text"
                  value={editCaption}
                  onChange={(e) => setEditCaption(e.target.value)}
                  className="w-full text-sm p-3 rounded-xl border border-slate-600 bg-slate-950 text-white font-serif font-bold focus:border-[#D4AF37] outline-none"
                  placeholder="Scrivi qui la tua dedica per gli sposi..."
                />
              </div>
            </div>

            {/* SELEZIONE 10 FILTRI POLAROID INGRANDITA */}
            <div className="space-y-1.5 text-left">
              <span className="text-xs uppercase font-bold text-slate-400 block">
                Scegli il Filtro Polaroid:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {POLAROID_FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilterId(f.id)}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl shrink-0 border transition-all cursor-pointer ${
                      activeFilterId === f.id
                        ? "bg-[#D4AF37] text-slate-950 border-[#D4AF37] shadow-lg scale-105"
                        : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* PULSANTI DI AZIONE */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleSaveAsNewPhoto}
                className="flex-1 py-3.5 bg-[#D4AF37] text-slate-950 font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Plus className="w-5 h-5" /> Salva come Nuova Foto nell&apos;Album
              </button>
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="px-6 py-3.5 bg-slate-800 text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
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
