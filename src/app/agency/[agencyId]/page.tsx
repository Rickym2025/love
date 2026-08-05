"use client";

import React, { useState, useEffect } from "react";
import AgencySidebar from "@/components/agency/AgencySidebar";
import AgencyConfigurator from "@/components/agency/AgencyConfigurator";
import AgencyPreview from "@/components/agency/AgencyPreview";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
}

export default function AgencyStudioPage({ params }: { params?: { agencyId?: string } }) {
  const rawAgencyId = params?.agencyId || "sposi-in-love";
  const agencyId = (rawAgencyId || "").replace(/[^a-zA-Z0-9-]/g, "") || "sposi-in-love";

  // Larghezze Ridimensionabili
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [previewWidth, setPreviewWidth] = useState(400);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingPreview, setIsResizingPreview] = useState(false);

  // Stati Configurazione Invito
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState<"A" | "B">("A");
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

  // Programma Orari Dinamico (Modificabile e Allungabile)
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { id: "1", time: "16:30", title: "Arrivo ed Accoglienza Ospiti" },
    { id: "2", time: "17:00", title: "Cerimonia Solenne di Nozze" },
    { id: "3", time: "18:30", title: "Aperitivo & Cocktail Hour in Giardino" },
    { id: "4", time: "20:00", title: "Cena di Gala & Taglio Torta" },
    { id: "5", time: "22:00", title: "Festa, DJ Set & Open Bar" },
  ]);

  // Negozio Locale Personalizzato
  const [localStoreName, setLocalStoreName] = useState("Gioielleria & Lista Nozze Locale");
  const [localStoreUrl, setLocalStoreUrl] = useState("https://www.amazon.it/baby-reg/homepage?tag=zero100store-21");

  // Negozi Convenzionati (Amazon Affiliato + Negozio Locale)
  const partnerStores = [
    {
      id: "amazon-default",
      name: "Lista Nozze Ufficiale Amazon",
      url: "https://www.amazon.it/baby-reg/homepage?tag=zero100store-21",
      logoUrl: "/logo.png",
    },
    ...(localStoreName
      ? [
          {
            id: "local-store",
            name: localStoreName,
            url: localStoreUrl || "#",
            logoUrl: "/logo.png",
          },
        ]
      : []),
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
    codiceAbbigliamento: true,
    negoziConvenzionati: true,
    listaNozzeAmazon: true,
    dedicheMarquee: true,
    hubGiochiFesta: true,
    guestPhotoWall: true,
    confermaRsvp: true,
  });

  function toggleModule(key: string) {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // Gestore Ridimensionamento Mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar) {
        const newWidth = Math.max(180, Math.min(360, e.clientX));
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

  return (
    <div className="flex h-screen w-screen bg-[#FAF7F2] overflow-hidden font-sans select-none">
      {/* 1. COLONNA SINISTRA: SIDEBAR AGENZIA */}
      <div style={{ width: `${sidebarWidth}px` }} className="flex-shrink-0 h-full overflow-hidden">
        <AgencySidebar
          agencyId={agencyId}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>

      {/* SEPARATORE TRASCINABILE 1 */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizingSidebar(true);
        }}
        className="w-1.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37] cursor-col-resize flex-shrink-0 h-full z-30 transition-colors"
        title="Trascina per ridimensionare Sidebar"
      />

      {/* 2. COLONNA CENTRALE: CONFIGURATORE (Spazio FLEX-1 CENTRALE) */}
      <div className="flex-1 h-full overflow-y-auto bg-[#FAF7F2] border-r border-[#D4AF37]/20">
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
          scheduleItems={scheduleItems}
          setScheduleItems={setScheduleItems}
          localStoreName={localStoreName}
          setLocalStoreName={setLocalStoreName}
          localStoreUrl={localStoreUrl}
          setLocalStoreUrl={setLocalStoreUrl}
          marqueeText={marqueeText}
          setMarqueeText={setMarqueeText}
          customIban={customIban}
          setCustomIban={setCustomIban}
          modules={modules}
          toggleModule={toggleModule}
        />
      </div>

      {/* SEPARATORE TRASCINABILE 2 */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizingPreview(true);
        }}
        className="w-1.5 bg-[#D4AF37]/30 hover:bg-[#D4AF37] cursor-col-resize flex-shrink-0 h-full z-30 transition-colors"
        title="Trascina per ridimensionare Preview"
      />

      {/* 3. COLONNA DESTRA: UNICA E SOLA PREVIEW LIVE SMARTPHONE */}
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
          partnerStores={partnerStores}
          scheduleItems={scheduleItems}
          marqueeText={marqueeText}
          customIban={customIban}
          modules={modules}
        />
      </div>
    </div>
  );
}
