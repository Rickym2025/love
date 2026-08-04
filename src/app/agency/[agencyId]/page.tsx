"use client";

import React, { useState, useEffect } from "react";
import AgencySidebar from "@/components/agency/AgencySidebar";
import AgencyConfigurator from "@/components/agency/AgencyConfigurator";
import AgencyPreview from "@/components/agency/AgencyPreview";

export default function AgencyStudioPage({ params }: { params?: { agencyId?: string } }) {
  const rawAgencyId = params?.agencyId || "sposi-in-love";
  const agencyId = (rawAgencyId || "").replace(/[^a-zA-Z0-9-]/g, "") || "sposi-in-love";

  // Larghezze Pannelli (Sidebar e Preview fixed/resizable, Configuratore FLEX-1 CENTRALE)
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [previewWidth, setPreviewWidth] = useState(400);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingPreview, setIsResizingPreview] = useState(false);

  // Stati Configurazione Invito
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState<"A" | "B">("A");
  const [introStart, setIntroStart] = useState("arco");
  const [dateDisplayMode, setDateDisplayMode] = useState("countdown");
  const [scheduleSchema, setScheduleSchema] = useState("classico");
  const [eventThemePreset, setEventThemePreset] = useState("Luxury Gold & Total White");
  const [customEventTheme, setCustomEventTheme] = useState("");
  const [selectedColorScheme, setSelectedColorScheme] = useState("1");
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [weddingDateDay, setWeddingDateDay] = useState("15");
  const [weddingDateMonth, setWeddingDateMonth] = useState("Settembre");
  const [weddingDateYear, setWeddingDateYear] = useState("2026");
  const [locationName, setLocationName] = useState("Villa Rosa");
  const [locationAddress, setLocationAddress] = useState("Via Roma 1, Roma");
  const [audioUrl, setAudioUrl] = useState("");
  const [waterImageUrl, setWaterImageUrl] = useState("");
  const [selectedPhrasePreset, setSelectedPhrasePreset] = useState("0");
  const [customWelcomePhrase, setCustomWelcomePhrase] = useState("");
  const [dressCodeNotes, setDressCodeNotes] = useState("Abiti eleganti nei toni cromatici della palette");
  const [selectedPaletteIdx, setSelectedPaletteIdx] = useState(0);
  const [partnerStores, setPartnerStores] = useState<any[]>([]);
  const [marqueeText, setMarqueeText] = useState(
    "✦ Viva gli Sposi! ✦ Auguri di cuore da tutti gli invitati ✦ Un giorno di festa e amore ✦"
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

      {/* 2. COLONNA CENTRALE: CONFIGURATORE / LISTA INVITI (Spazio CENTRALE Flex-1) */}
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
          partnerStores={partnerStores}
          setPartnerStores={setPartnerStores}
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

      {/* 3. COLONNA DESTRE: PREVIEW LIVE SMARTPHONE */}
      <div
        style={{ width: `${previewWidth}px` }}
        className="h-full bg-[#1E293B] overflow-hidden flex items-center justify-center p-4 flex-shrink-0"
      >
        <AgencyPreview
          selectedTemplate={selectedTemplate}
          introStart={introStart}
          dateDisplayMode={dateDisplayMode}
          scheduleSchema={scheduleSchema}
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
          marqueeText={marqueeText}
          customIban={customIban}
          modules={modules}
        />
      </div>
    </div>
  );
}
