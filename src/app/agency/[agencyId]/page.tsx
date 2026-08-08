"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Lock, LogIn, UserPlus, ShieldAlert } from "lucide-react";
import AgencySidebar from "@/components/agency/AgencySidebar";
import AgencyConfigurator from "@/components/agency/AgencyConfigurator";
import AgencyPreview from "@/components/agency/AgencyPreview";
import ConfiguratorList, { CreatedInvitation } from "@/components/agency/ConfiguratorList";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
}

export default function AgencyStudioPage({ params }: { params?: { agencyId?: string } }) {
  const rawAgencyId = params?.agencyId || "sposi-in-love";
  const agencyId = (rawAgencyId || "").replace(/[^a-zA-Z0-9-]/g, "") || "sposi-in-love";

  const isMasterDemo = agencyId === "sposi-in-love";

  const [isAuthorizedMaster, setIsAuthorizedMaster] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmail = (localStorage.getItem("love_user_email") || "").toLowerCase().trim();
      setUserEmail(storedEmail);

      const authorizedEmails = [
        "riccardo.modena@gmail.com",
        "riccardo@rmstudio.com",
        "riccardo@rmstudio.app",
      ];

      if (isMasterDemo) {
        const hasPermission = authorizedEmails.includes(storedEmail);
        setIsAuthorizedMaster(hasPermission);
      } else {
        setIsAuthorizedMaster(true);
      }
    }
  }, [agencyId, isMasterDemo]);

  // LARGHEZZA SIDEBAR IMPOSTATA A 350PX DI DEFAULT PER TESTO SU 1 SOLA RIGA
  const [sidebarWidth, setSidebarWidth] = useState(350);
  const [previewWidth, setPreviewWidth] = useState(390);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingPreview, setIsResizingPreview] = useState(false);

  const [createdInvitations, setCreatedInvitations] = useState<CreatedInvitation[]>([
    {
      id: "1",
      coupleNames: "Elena & Davide",
      date: "15 Settembre 2026",
      template: "Modello A",
      paletteName: "Oro Bruciato & Champagne",
      slug: "elena-e-davide",
      status: "Attivo",
    },
    {
      id: "2",
      coupleNames: "Francesca & Luca",
      date: "20 Giugno 2026",
      template: "Modello B",
      paletteName: "Rosa Cipria & Seta",
      slug: "francesca-e-luca",
      status: "Attivo",
    },
    {
      id: "3",
      coupleNames: "Giulia & Marco",
      date: "10 Ottobre 2026",
      template: "Modello C",
      paletteName: "Lavanda & Lillà",
      slug: "giulia-e-marco",
      status: "Bozza",
    },
  ]);

  const handleDeleteInvitationFromState = (id: string) => {
    setCreatedInvitations((prev) => prev.filter((item) => item.id !== id));
  };

  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState<"A" | "B" | "C">("A");
  const [introStart, setIntroStart] = useState("busta");
  const [dateDisplayMode, setDateDisplayMode] = useState("countdown");
  const [scheduleSchema, setScheduleSchema] = useState("classico");
  const [rsvpStyle, setRsvpStyle] = useState("classico");
  const [eventThemePreset, setEventThemePreset] = useState("Luxury Gold & Total White");
  const [customEventTheme, setCustomEventTheme] = useState("");
  const [selectedColorScheme, setSelectedColorScheme] = useState("1");
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [weddingDateDay, setWeddingDateDay] = useState("15");
  const [weddingDateMonth, setWeddingDateMonth] = useState("Settembre");
  const [weddingDateYear, setWeddingDateYear] = useState("2026");
  const [locationName, setLocationName] = useState("Villa Rosa");
  const [locationAddress, setLocationAddress] = useState("Via Roma 1, Roma");
  const [audioUrl, setAudioUrl] = useState(
    "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3"
  );
  const [waterImageUrl, setWaterImageUrl] = useState("");
  const [selectedPhrasePreset, setSelectedPhrasePreset] = useState("0");
  const [customWelcomePhrase, setCustomWelcomePhrase] = useState("");
  const [dressCodeNotes, setDressCodeNotes] = useState("Abiti eleganti nei toni cromatici della palette");
  const [selectedPaletteIdx, setSelectedPaletteIdx] = useState(0);
  
  const [heroBgImage, setHeroBgImage] = useState("/sfondi/fiori.jpg");
  const [heroMediaImage, setHeroMediaImage] = useState(
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80"
  );
  const [ricevimentoImage, setRicevimentoImage] = useState(
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
  );

  const [puzzleImage, setPuzzleImage] = useState(
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80"
  );
  const [scratchPhotoUrl, setScratchPhotoUrl] = useState(
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
  );
  const [puzzlePrize, setPuzzlePrize] = useState("💃 Hai vinto un ballo speciale con la Sposa!");
  const [scratchPrize, setScratchPrize] = useState("🥂 Hai vinto un drink offerto dallo Sposo!");
  const [quizPrize, setQuizPrize] = useState("📸 Hai vinto un selfie di gruppo con gli Sposi!");

  const [quizQuestions, setQuizQuestions] = useState([
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
  ]);
  const [galleryStyle, setGalleryStyle] = useState("polaroid");

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { id: "1", time: "16:30", title: "Arrivo ed Accoglienza Ospiti" },
    { id: "2", time: "17:00", title: "Cerimonia Solenne di Nozze" },
    { id: "3", time: "18:30", title: "Aperitivo & Cocktail Hour in Giardino" },
    { id: "4", time: "20:00", title: "Cena di Gala & Taglio Torta" },
    { id: "5", time: "22:00", title: "Festa, DJ Set & Open Bar" },
  ]);

  const [showAmazonAffiliate, setShowAmazonAffiliate] = useState(true);
  const [customStores, setCustomStores] = useState([
    { id: "1", name: "Gioielleria Rossi & Lista Nozze Locale", url: "https://gioielleriarossi.it", logoUrl: "/logo.png" }
  ]);

  const partnerStores = [
    ...(showAmazonAffiliate
      ? [
          {
            id: "amazon-default",
            name: "Lista Nozze Ufficiale Amazon",
            url: "https://www.amazon.it/baby-reg/homepage?tag=zero100store-21",
            logoUrl: "/logo.png",
          },
        ]
      : []),
    ...customStores.map((s) => ({ ...s, logoUrl: s.logoUrl || "/logo.png" })),
  ];

  const [marqueeText, setMarqueeText] = useState(
    "✦ VIVA GLI SPOSI! ✦ AUGURI DI CUORE DALLA NOSTRA AGENZIA ✦ UN GIORNO DI FESTA E AMORE ✦"
  );
  const [customIban, setCustomIban] = useState("IT60 X 05428 11101 000000123456");

  const [modules, setModules] = useState<Record<string, boolean>>({
    busta3d: true,
    grattaData: true,
    effettoAcqua: true,
    nuvole3d: true,
    locationMappa: true,
    showOnlyMap: true,
    codiceAbbigliamento: true,
    negoziConvenzionati: true,
    listaNozzeAmazon: true,
    dedicheMarquee: true,
    hubGiochiFesta: true,
    guestPhotoWall: true,
    confermaRsvp: true,
    fregiStelle: true,
  });

  function toggleModule(key: string) {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar) {
        const newWidth = Math.max(280, Math.min(450, e.clientX));
        setSidebarWidth(newWidth);
      } else if (isResizingPreview) {
        const newWidth = Math.max(320, Math.min(550, window.innerWidth - e.clientX));
        setPreviewWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
      setIsResizingPreview(false);
    };

    if (isResizingSidebar || isResizingPreview) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizingSidebar, isResizingPreview]);

  if (isMasterDemo && !isAuthorizedMaster) {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-white flex items-center justify-center p-6 relative overflow-hidden font-sans select-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />

        <div className="max-w-md w-full bg-slate-900/95 backdrop-blur-2xl border-2 border-[#D4AF37] p-8 rounded-3xl shadow-2xl space-y-6 relative z-10 text-center my-auto">
          <div className="w-16 h-16 bg-[#D4AF37]/20 border-2 border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37]">
            <Lock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center justify-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Studio Master Demo Riservato
            </span>
            <h2 className="text-2xl font-serif font-bold text-white">Accesso Riservato</h2>
            <p className="text-xs text-slate-300 font-serif leading-relaxed">
              Lo Studio Demo <strong className="text-amber-300">&quot;Sposi in Love&quot;</strong> è la matrice riservata esclusivamente a <strong>Riccardo Modena (RM Studio)</strong>.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href="/login"
              className="w-full py-3.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Accedi con la tua Agenzia
            </Link>

            <Link
              href="/login"
              className="w-full py-3.5 bg-slate-800 text-white font-bold text-xs rounded-xl hover:bg-slate-700 transition-colors border border-slate-700 flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4 text-[#D4AF37]" /> Registra Nuova Agenzia B2B
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-[#FAF7F2] overflow-hidden font-sans select-none">
      {/* 1. SIDEBAR AGENZIA */}
      <div style={{ width: `${sidebarWidth}px` }} className="flex-shrink-0 h-full overflow-hidden">
        <AgencySidebar
          agencyId={agencyId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          createdCount={createdInvitations.length}
        />
      </div>

      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizingSidebar(true);
        }}
        className="w-1.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37] cursor-col-resize flex-shrink-0 h-full z-30 transition-colors"
        title="Trascina per ridimensionare Sidebar"
      />

      {/* 2. CONFIGURATORE CENTRALE - SCROLL ISOLATO ED ESCLUSIVO */}
      <div className="flex-1 h-full overflow-y-auto overflow-x-hidden bg-[#FAF7F2] border-r border-[#D4AF37]/20 relative z-10 overscroll-contain">
        {activeTab === "list" ? (
          <div className="p-6">
            <ConfiguratorList
              invitations={createdInvitations}
              onDelete={handleDeleteInvitationFromState}
            />
          </div>
        ) : (
          <AgencyConfigurator
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            introStart={introStart}
            setIntroStart={setIntroStart}
            dateDisplayMode={dateDisplayMode}
            setDateDisplayMode={setDateDisplayMode}
            scheduleSchema={scheduleSchema}
            setScheduleSchema={setScheduleSchema}
            rsvpStyle={rsvpStyle}
            setRsvpStyle={setRsvpStyle}
            eventThemePreset={eventThemePreset}
            setEventThemePreset={setEventThemePreset}
            customEventTheme={customEventTheme}
            setCustomEventTheme={setCustomEventTheme}
            selectedColorScheme={selectedColorScheme}
            setSelectedColorScheme={setSelectedColorScheme}
            coupleNames={coupleNames}
            setCoupleNames={setCoupleNames}
            weddingDateDay={weddingDateDay}
            setWeddingDateDay={setWeddingDateDay}
            weddingDateMonth={weddingDateMonth}
            setWeddingDateMonth={setWeddingDateMonth}
            weddingDateYear={weddingDateYear}
            setWeddingDateYear={setWeddingDateYear}
            locationName={locationName}
            setLocationName={setLocationName}
            locationAddress={locationAddress}
            setLocationAddress={setLocationAddress}
            audioUrl={audioUrl}
            setAudioUrl={setAudioUrl}
            waterImageUrl={waterImageUrl}
            setWaterImageUrl={setWaterImageUrl}
            selectedPhrasePreset={selectedPhrasePreset}
            setSelectedPhrasePreset={setSelectedPhrasePreset}
            customWelcomePhrase={customWelcomePhrase}
            setCustomWelcomePhrase={setCustomWelcomePhrase}
            dressCodeNotes={dressCodeNotes}
            setDressCodeNotes={setDressCodeNotes}
            selectedPaletteIdx={selectedPaletteIdx}
            setSelectedPaletteIdx={setSelectedPaletteIdx}
            heroBgImage={heroBgImage}
            setHeroBgImage={setHeroBgImage}
            heroMediaImage={heroMediaImage}
            setHeroMediaImage={setHeroMediaImage}
            ricevimentoImage={ricevimentoImage}
            setRicevimentoImage={setRicevimentoImage}
            puzzleImage={puzzleImage}
            setPuzzleImage={setPuzzleImage}
            scratchPhotoUrl={scratchPhotoUrl}
            setScratchPhotoUrl={setScratchPhotoUrl}
            puzzlePrize={puzzlePrize}
            setPuzzlePrize={setPuzzlePrize}
            scratchPrize={scratchPrize}
            setScratchPrize={setScratchPrize}
            quizPrize={quizPrize}
            setQuizPrize={setQuizPrize}
            quizQuestions={quizQuestions}
            setQuizQuestions={setQuizQuestions}
            galleryStyle={galleryStyle}
            setGalleryStyle={setGalleryStyle}
            scheduleItems={scheduleItems}
            setScheduleItems={setScheduleItems}
            showAmazonAffiliate={showAmazonAffiliate}
            setShowAmazonAffiliate={setShowAmazonAffiliate}
            customStores={customStores}
            setCustomStores={setCustomStores}
            partnerStores={partnerStores}
            marqueeText={marqueeText}
            setMarqueeText={setMarqueeText}
            customIban={customIban}
            setCustomIban={setCustomIban}
            modules={modules}
            toggleModule={toggleModule}
          />
        )}
      </div>

      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizingPreview(true);
        }}
        className="w-1.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37] cursor-col-resize flex-shrink-0 h-full z-30 transition-colors"
        title="Trascina per ridimensionare Preview"
      />

      {/* 3. PREVIEW LIVE SMARTPHONE */}
      <div
        style={{ width: `${previewWidth}px` }}
        className="h-full bg-[#1E293B] overflow-hidden flex items-center justify-center p-4 flex-shrink-0"
      >
        <AgencyPreview
          selectedTemplate={selectedTemplate}
          introStart={introStart}
          dateDisplayMode={dateDisplayMode}
          scheduleSchema={scheduleSchema}
          rsvpStyle={rsvpStyle}
          eventThemePreset={eventThemePreset}
          customEventTheme={customEventTheme}
          selectedColorScheme={selectedColorScheme}
          coupleNames={coupleNames}
          weddingDateDay={weddingDateDay}
          weddingDateMonth={weddingDateMonth}
          weddingDateYear={weddingDateYear}
          locationName={locationName}
          locationAddress={locationAddress}
          audioUrl={audioUrl}
          waterImageUrl={waterImageUrl}
          selectedPhrasePreset={selectedPhrasePreset}
          customWelcomePhrase={customWelcomePhrase}
          dressCodeNotes={dressCodeNotes}
          selectedPaletteIdx={selectedPaletteIdx}
          heroBgImage={heroBgImage}
          heroMediaImage={heroMediaImage}
          ricevimentoImage={ricevimentoImage}
          puzzleImage={puzzleImage}
          scratchPhotoUrl={scratchPhotoUrl}
          puzzlePrize={puzzlePrize}
          scratchPrize={scratchPrize}
          quizPrize={quizPrize}
          galleryStyle={galleryStyle}
          quizQuestions={quizQuestions}
          partnerStores={partnerStores}
          showAmazonAffiliate={showAmazonAffiliate}
          scheduleItems={scheduleItems}
          marqueeText={marqueeText}
          customIban={customIban}
          modules={modules}
        />
      </div>
    </div>
  );
}
