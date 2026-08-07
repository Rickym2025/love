"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowLeft, Gamepad2, Camera, Plus, X, User, MessageSquare } from "lucide-react";
import PhotoWallSection, { PhotoWallItem, POLAROID_FILTERS, CAPTION_PRESETS } from "@/components/PhotoWallSection";
import CircularGallery, { GalleryItem } from "@/components/ui/CircularGallery";
import LoveQuiz from "@/components/LoveQuiz";
import PhotoPuzzle from "@/components/PhotoPuzzle";
import ScratchPhoto from "@/components/ScratchPhoto";
import AudioPlayer from "@/components/AudioPlayer";

function FestaContent({ params }: { params?: { slug?: string } }) {
  const searchParams = useSearchParams();

  const slug = params?.slug || "elena-e-davide";
  const cleanSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "") || "elena-e-davide";
  const coupleNames = searchParams?.get("couple") || "Elena & Davide";
  
  // SOLTANTO LA GALLERIA SELEZIONATA IN DASHBOARD (NO TOGGLE IN FESTA)
  const galleryStyle = searchParams?.get("gallery") || "polaroid";

  const puzzleImage = searchParams?.get("puzzle") || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";
  const scratchPhotoUrl = searchParams?.get("scratch") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80";
  const audioUrl = searchParams?.get("audio") || "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3";

  // LISTA FOTO CONDIVISA PER BACKGROUND DINAMICO & GALLERIE
  const [photosList, setPhotosList] = useState<PhotoWallItem[]>([
    { id: "1", url: scratchPhotoUrl, caption: "Il Primo Ballo degli Sposi", author: coupleNames },
    { id: "2", url: puzzleImage, caption: "Taglio della Torta Insieme", author: "Zii Rossi" },
    { id: "3", url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80", caption: "Brindisi in Giardino", author: "Amici di Sempre" },
  ]);

  // BACKGROUND DINAMICO RANDOM OGNI 5 SECONDI
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    if (photosList.length === 0) return;
    const interval = setInterval(() => {
      setBgImageIndex((prev) => (prev + 1) % photosList.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [photosList]);

  // MODAL FILTRI E DEDICA PER LA GALLERIA 3D CIRCOLARE
  const [selectedPhoto3D, setSelectedPhoto3D] = useState<PhotoWallItem | null>(null);
  const [activeFilterId, setActiveFilterId] = useState("normal");
  const [editAuthor, setEditAuthor] = useState("");
  const [editCaption, setEditCaption] = useState("");

  const currentFilter = POLAROID_FILTERS.find((f) => f.id === activeFilterId) || POLAROID_FILTERS[0];

  const handleOpen3DPhotoModal = (galleryItem: GalleryItem) => {
    setSelectedPhoto3D({
      id: galleryItem.id || Date.now().toString(),
      url: galleryItem.photo.url,
      caption: galleryItem.common,
      author: galleryItem.photo.by,
    });
    setActiveFilterId("normal");
    setEditAuthor(galleryItem.photo.by || "Invitato");
    setEditCaption(galleryItem.common || "Momento Speciale ❤️");
  };

  const handleSave3DAsNewPhoto = () => {
    if (!selectedPhoto3D) return;
    const newPhoto: PhotoWallItem = {
      id: Date.now().toString(),
      url: selectedPhoto3D.url,
      caption: editCaption || "Nuovo Scatto d'Amore",
      author: editAuthor || "Invitato",
      filterCss: currentFilter.filterCss,
    };
    setPhotosList((prev) => [newPhoto, ...prev]);
    setSelectedPhoto3D(null);
  };

  // PARSING DOMANDE QUIZ DA DASHBOARD
  let quizQuestions = [
    {
      question: "Dove ci siamo conosciuti per la prima volta?",
      optionA: "In università",
      optionB: "In discoteca",
      optionC: "Al mare in vacanza",
      optionD: "Tramite amici comuni",
      correctOptionIdx: 0,
    },
    {
      question: "Chi ha fatto la proposta di nozze?",
      optionA: "Elena",
      optionB: "Davide",
      optionC: "Insieme a Parigi",
      optionD: "I genitori",
      correctOptionIdx: 1,
    },
  ];

  try {
    const rawQuiz = searchParams?.get("quiz");
    if (rawQuiz) {
      const parsed = JSON.parse(decodeURIComponent(rawQuiz));
      if (Array.isArray(parsed) && parsed.length > 0) {
        quizQuestions = parsed;
      }
    }
  } catch (e) {
    // fallback se non in formato JSON
  }

  // TRASFORMAZIONE FOTO PER LA GALLERIA 3D CIRCOLARE
  const circularItems: GalleryItem[] = photosList.map((item) => ({
    id: item.id,
    common: item.caption || coupleNames,
    binomial: item.author ? `- ${item.author}` : "Foto Album",
    photo: {
      url: item.url,
      text: item.caption || "Foto Sposi",
      by: item.author || "Invitato",
    },
  }));

  const currentBgUrl = photosList[bgImageIndex]?.url || scratchPhotoUrl;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden font-sans pb-16 select-none relative">
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

      {/* BACKGROUND DINAMICO CHE CAMBIA OGNI 5 SECONDI */}
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000 bg-cover bg-center opacity-20 blur-md scale-105"
        style={{ backgroundImage: `url(${currentBgUrl})` }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950" />

      {/* HEADER FESTA */}
      <header className="p-4 bg-slate-900/90 border-b border-[#D4AF37]/40 flex justify-between items-center backdrop-blur-md sticky top-0 z-40">
        <Link
          href={`/${cleanSlug}`}
          className="text-xs font-bold text-[#D4AF37] hover:text-white flex items-center gap-1.5 bg-slate-800 px-3.5 py-2 rounded-xl border border-[#D4AF37]/30 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Torna all&apos;Invito
        </Link>
        <span className="text-xs font-serif font-bold text-white flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Pagina Festa &amp; Maxischermo
        </span>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-10 text-center relative z-10">
        {/* HERO FESTA */}
        <div className="space-y-3 p-6 md:p-8 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-3xl border-2 border-[#D4AF37] shadow-2xl">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">🎉 RICEVIMENTO &amp; PARTY</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">{coupleNames}</h1>
          <p className="text-xs md:text-sm text-slate-300 font-serif max-w-md mx-auto">
            Partecipa ai giochi, scatta una foto per l&apos;Album del Maxischermo e divertiti insieme agli sposi!
          </p>
        </div>

        {/* RENDERING ESCLUSIVO DELLA GALLERIA SELEZIONATA IN DASHBOARD */}
        <div className="p-5 bg-slate-900/90 backdrop-blur-md rounded-3xl border-2 border-[#D4AF37]/60 shadow-2xl space-y-4">
          {galleryStyle === "circular" ? (
            <div className="space-y-3">
              <span className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Galleria 3D Circolare Ruotante
              </span>
              <p className="text-xs font-serif italic text-slate-300">
                Tocca qualsiasi foto per aprirla, applicare i filtri e personalizzare la dedica!
              </p>
              <CircularGallery
                items={circularItems}
                onItemClick={(item) => handleOpen3DPhotoModal(item)}
              />
            </div>
          ) : (
            <PhotoWallSection
              photos={photosList}
              onUpdatePhotos={(updated) => setPhotosList(updated)}
            />
          )}
        </div>

        {/* MODAL LIGHTBOX PER GALLERIA 3D CIRCOLARE */}
        {selectedPhoto3D && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 md:p-6 overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedPhoto3D(null)}
              className="absolute top-4 right-4 z-50 p-3 bg-slate-800 text-white rounded-full hover:bg-slate-700 cursor-pointer shadow-2xl border border-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-2xl w-full bg-slate-900 text-white p-4 md:p-6 rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-5 my-auto max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-center gap-2 border-b border-slate-800 pb-3">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="text-base md:text-lg font-serif font-bold text-[#D4AF37] uppercase tracking-wider">
                  Personalizza Foto 3D &amp; Filtri Polaroid
                </h4>
              </div>

              <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-inner bg-black relative">
                <img
                  src={selectedPhoto3D.url}
                  alt="Foto Ingrandita"
                  className="w-full h-full object-contain md:object-cover transition-all duration-300"
                  style={{ filter: currentFilter.filterCss }}
                />
              </div>

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

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleSave3DAsNewPhoto}
                  className="flex-1 py-3.5 bg-[#D4AF37] text-slate-950 font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Plus className="w-5 h-5" /> Salva come Nuova Foto
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPhoto3D(null)}
                  className="px-6 py-3.5 bg-slate-800 text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700"
                >
                  Chiudi
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DIVISORE LUXURY TRA GALLERIA E GIOCHI */}
        <div className="relative my-8 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#D4AF37]/40"></div></div>
          <div className="relative px-6 py-2 bg-slate-900 border-2 border-[#D4AF37] rounded-full text-[#D4AF37] font-serif text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl">
            <Gamepad2 className="w-4 h-4 text-[#D4AF37]" /> GIOCHI DELLA FESTA <Gamepad2 className="w-4 h-4 text-[#D4AF37]" />
          </div>
        </div>

        {/* GIOCHI FESTA CON DIVISORI ELEGANTI */}
        <div className="space-y-8">
          {/* GIOCO 1: PUZZLE */}
          <PhotoPuzzle imageSrc={puzzleImage} />

          <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-serif text-xs tracking-widest opacity-80 my-4">
            <span>✦ ✦ ✦</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Prossimo Gioco</span>
            <span>✦ ✦ ✦</span>
          </div>

          {/* GIOCO 2: GRATTA E SCOPRI */}
          <ScratchPhoto imageSrc={scratchPhotoUrl} />

          <div className="flex items-center justify-center gap-2 text-[#D4AF37] font-serif text-xs tracking-widest opacity-80 my-4">
            <span>✦ ✦ ✦</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Prossimo Gioco</span>
            <span>✦ ✦ ✦</span>
          </div>

          {/* GIOCO 3: QUIZ SPOSI */}
          <LoveQuiz questions={quizQuestions} />
        </div>
      </main>
    </div>
  );
}

export default function FestaPage({ params }: { params?: { slug?: string } }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-[#D4AF37] font-serif font-bold text-sm">
          Caricamento Pagina Festa...
        </div>
      }
    >
      <FestaContent params={params} />
    </Suspense>
  );
}
