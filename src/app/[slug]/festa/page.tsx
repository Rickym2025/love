"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Sparkles, ArrowLeft, Gamepad2, Plus, X, User, MessageSquare } from "lucide-react";
import PhotoWallSection, { PhotoWallItem, POLAROID_FILTERS, CAPTION_PRESETS } from "@/components/PhotoWallSection";
import CircularGallery, { GalleryItem } from "@/components/ui/CircularGallery";
import SocialCards, { CardItem } from "@/components/ui/SocialCards";
import LoveQuiz from "@/components/LoveQuiz";
import PhotoPuzzle from "@/components/PhotoPuzzle";
import ScratchPhoto from "@/components/ScratchPhoto";
import AudioPlayer from "@/components/AudioPlayer";
import { fetchLoveGuestbookItems, saveLoveGuestbookItem } from "@/lib/supabase";

function FestaContent({ params }: { params?: { slug?: string } }) {
  const searchParams = useSearchParams();

  const slug = params?.slug || "elena-e-davide";
  const cleanSlug = (slug || "").replace(/[^a-zA-Z0-9-]/g, "") || "elena-e-davide";

  const [coupleNames, setCoupleNames] = useState(searchParams?.get("couple") || "Elena & Davide");
  const [galleryStyle, setGalleryStyle] = useState(searchParams?.get("gallery") || "polaroid");
  const [puzzleImage, setPuzzleImage] = useState(
    searchParams?.get("puzzle") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80"
  );
  const [scratchPhotoUrl, setScratchPhotoUrl] = useState(
    searchParams?.get("scratch") || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
  );
  const [audioUrl, setAudioUrl] = useState(
    searchParams?.get("audio") || "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3"
  );

  const [puzzlePrize, setPuzzlePrize] = useState("💃 Hai vinto un ballo speciale con la Sposa!");
  const [scratchPrize, setScratchPrize] = useState("🥂 Hai vinto un drink offerto dallo Sposo!");
  const [quizPrize, setQuizPrize] = useState("📸 Hai vinto un selfie di gruppo con gli Sposi!");

  const [quizQuestions, setQuizQuestions] = useState<any[]>([
    {
      question: "Dove ci siamo conosciuti per la prima volta?",
      optionA: "In università",
      optionB: "In discoteca",
      optionC: "Al mare in vacanza",
      optionD: "Tramite amici comuni",
      correctOptionIdx: 0,
    },
  ]);

  // LISTA FOTO DALLA TABELLA GUESTBOOK SUPABASE
  const [photosList, setPhotosList] = useState<PhotoWallItem[]>([
    { id: "1", url: scratchPhotoUrl, caption: "Il Primo Ballo degli Sposi", author: coupleNames },
    { id: "2", url: puzzleImage, caption: "Taglio della Torta Insieme", author: "Zii Rossi" },
  ]);

  // CARICAMENTO INIZIALE FOTO DA SUPABASE DATABASES
  useEffect(() => {
    async function loadGuestbookFromSupabase() {
      const res = await fetchLoveGuestbookItems(cleanSlug);
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        const mapped = res.data.map((item: any) => ({
          id: item.id,
          url: item.photo_url || scratchPhotoUrl,
          caption: item.message || "Foto del Matrimonio",
          author: item.author_name || "Invitato",
        }));
        setPhotosList(mapped);
      }
    }
    loadGuestbookFromSupabase();
  }, [cleanSlug, scratchPhotoUrl]);

  // BACKGROUND DINAMICO CHE CAMBIA OGNI 12 SECONDI
  const [bgImageIndex, setBgImageIndex] = useState(0);

  useEffect(() => {
    if (photosList.length === 0) return;
    const interval = setInterval(() => {
      setBgImageIndex((prev) => (prev + 1) % photosList.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [photosList]);

  // MODAL FILTRI & DEDICA
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<PhotoWallItem | null>(null);
  const [activeFilterId, setActiveFilterId] = useState("normal");
  const [editAuthor, setEditAuthor] = useState("");
  const [editCaption, setEditCaption] = useState("");

  const currentFilter = POLAROID_FILTERS.find((f) => f.id === activeFilterId) || POLAROID_FILTERS[0];

  const handleOpenPhotoModal = (url: string, caption?: string, author?: string) => {
    setSelectedPhotoModal({
      id: Date.now().toString(),
      url,
      caption: caption || "Momento del Matrimonio ❤️",
      author: author || "Invitato",
    });
    setActiveFilterId("normal");
    setEditAuthor(author || "Invitato");
    setEditCaption(caption || "Momento Speciale ❤️");
  };

  const handleSaveAsNewPhoto = async () => {
    if (!selectedPhotoModal) return;

    const newPhoto: PhotoWallItem = {
      id: Date.now().toString(),
      url: selectedPhotoModal.url,
      caption: editCaption || "Nuovo Scatto d'Amore",
      author: editAuthor || "Invitato",
      filterCss: currentFilter.filterCss,
    };

    setPhotosList((prev) => [newPhoto, ...prev]);

    // SALVATAGGIO REALE IN SUPABASE TABELLA love_guestbook
    await saveLoveGuestbookItem({
      experience_slug: cleanSlug,
      author_name: editAuthor || "Invitato",
      message: editCaption || "Foto del Matrimonio",
      photo_url: selectedPhotoModal.url,
    });

    setSelectedPhotoModal(null);
  };

  // ELEMENTI PER GALLERIE
  const circularItems: GalleryItem[] = photosList.map((item) => ({
    id: item.id,
    common: item.caption || coupleNames,
    binomial: item.author ? `- ${item.author}` : "Foto Album",
    photo: { url: item.url, text: item.caption || "Foto Sposi", by: item.author || "Invitato" },
  }));

  const fanCardItems: CardItem[] = photosList.map((item) => ({
    id: item.id,
    imgUrl: item.url,
    alt: item.caption,
    caption: item.caption || "Foto Sposi",
    author: item.author || "Invitato",
  }));

  const currentBgUrl = photosList[bgImageIndex]?.url || scratchPhotoUrl;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white overflow-x-hidden font-sans pb-16 select-none relative">
      {audioUrl && <AudioPlayer audioUrl={audioUrl} />}

      <div
        className="fixed inset-0 pointer-events-none z-0 transition-all duration-1000 bg-cover bg-center opacity-45 md:opacity-55 blur-sm scale-105"
        style={{ backgroundImage: `url(${currentBgUrl})` }}
      />
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-slate-950/60 via-slate-950/70 to-slate-950/90" />

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
        <div className="space-y-3 p-6 md:p-8 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md rounded-3xl border-2 border-[#D4AF37] shadow-2xl">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block">🎉 RICEVIMENTO &amp; PARTY</span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">{coupleNames}</h1>
          <p className="text-xs md:text-sm text-slate-300 font-serif max-w-md mx-auto">
            Partecipa ai giochi, scatta una foto per l&apos;Album del Maxischermo e divertiti insieme agli sposi!
          </p>
        </div>

        <div className="p-5 bg-slate-900/90 backdrop-blur-md rounded-3xl border-2 border-[#D4AF37]/60 shadow-2xl space-y-4">
          {galleryStyle === "circular" ? (
            <div className="space-y-3">
              <span className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Galleria 3D Circolare Ruotante
              </span>
              <CircularGallery items={circularItems} onItemClick={(item) => handleOpenPhotoModal(item.photo.url, item.common, item.photo.by)} />
            </div>
          ) : galleryStyle === "fan" ? (
            <div className="space-y-3">
              <span className="text-xs font-serif font-bold text-[#D4AF37] uppercase tracking-wider flex items-center justify-center gap-1.5">
                🎴 Galleria Carte a Ventaglio
              </span>
              <SocialCards cards={fanCardItems} onItemClick={(card) => handleOpenPhotoModal(card.imgUrl, card.caption, card.author)} />
            </div>
          ) : (
            <PhotoWallSection photos={photosList} onUpdatePhotos={(updated) => setPhotosList(updated)} />
          )}
        </div>

        {selectedPhotoModal && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 md:p-6 overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedPhotoModal(null)}
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

              <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-inner bg-black relative">
                <img src={selectedPhotoModal.url} alt="Foto Ingrandita" className="w-full h-full object-contain md:object-cover transition-all duration-300" style={{ filter: currentFilter.filterCss }} />
              </div>

              <div className="space-y-3 text-left bg-slate-800/90 p-4 rounded-2xl border border-slate-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                      <User className="w-4 h-4" /> Chi ha scattato la foto?
                    </label>
                    <input type="text" value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} className="w-full text-sm p-3 rounded-xl border border-slate-600 bg-slate-950 text-white font-bold focus:border-[#D4AF37] outline-none" placeholder="Il tuo nome..." />
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4" /> Scegli una frase pronta:
                    </label>
                    <select onChange={(e) => { if (e.target.value) setEditCaption(e.target.value); }} className="w-full text-sm p-3 rounded-xl border border-slate-600 bg-slate-950 text-white font-medium cursor-pointer focus:border-[#D4AF37] outline-none">
                      <option value="">-- Seleziona Frase --</option>
                      {CAPTION_PRESETS.map((cap, i) => (
                        <option key={i} value={cap}>{cap}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-bold text-[#D4AF37] mb-1">Dedica Personalizzata (Stile Instagram):</label>
                  <input type="text" value={editCaption} onChange={(e) => setEditCaption(e.target.value)} className="w-full text-sm p-3 rounded-xl border border-slate-600 bg-slate-950 text-white font-serif font-bold focus:border-[#D4AF37] outline-none" placeholder="Scrivi la tua dedica..." />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button type="button" onClick={handleSaveAsNewPhoto} className="flex-1 py-3.5 bg-[#D4AF37] text-slate-950 font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                  <Plus className="w-5 h-5" /> Salva Foto &amp; Invia a Supabase
                </button>
                <button type="button" onClick={() => setSelectedPhotoModal(null)} className="px-6 py-3.5 bg-slate-800 text-slate-300 font-bold text-sm rounded-xl hover:bg-slate-700 transition-colors cursor-pointer border border-slate-700">Chiudi</button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <PhotoPuzzle imageSrc={puzzleImage} puzzlePrize={puzzlePrize} />
          <ScratchPhoto imageSrc={scratchPhotoUrl} />
          <LoveQuiz questions={quizQuestions} />
        </div>
      </main>
    </div>
  );
}

export default function FestaPage({ params }: { params?: { slug?: string } }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-[#D4AF37] font-serif font-bold text-sm">Caricamento Pagina Festa...</div>}>
      <FestaContent params={params} />
    </Suspense>
  );
}
