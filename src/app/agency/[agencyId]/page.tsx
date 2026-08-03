"use client";

import React, { useState, useEffect } from "react";
import AgencySidebar from "@/components/agency/AgencySidebar";
import AgencyConfigurator from "@/components/agency/AgencyConfigurator";
import AgencyPreview from "@/components/agency/AgencyPreview";

export default function AgencyStudioPage({ params }: { params?: { agencyId?: string } }) {
  const rawAgencyId = params?.agencyId || "sposi-in-love";
  const agencyId = (rawAgencyId || "").replace(/[^a-zA-Z0-9-]/g, "") || "sposi-in-love";

  // Colonne Ridimensionabili con Drag & Drop Mouse
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [configuratorWidth, setConfiguratorWidth] = useState(440);
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingConfigurator, setIsResizingConfigurator] = useState(false);

  // Stati Configurazione Invito
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState<"A" | "B">("A");
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
  const [dressCodeNotes, setDressCodeNotes] = useState("Abiti eleganti nei toni della palette");
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

  // Gestione Eventi Mouse per Trascinamento Colonne
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar) {
        const newWidth = Math.max(200, Math.min(380, e.clientX));
        setSidebarWidth(newWidth);
      } else if (isResizingConfigurator) {
        const newWidth = Math.max(320, Math.min(650, e.clientX - sidebarWidth));
        setConfiguratorWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
      setIsResizingConfigurator(false);
    };

    if (isResizingSidebar || isResizingConfigurator) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizingSidebar, isResizingConfigurator, sidebarWidth]);

  return (
    <div className="flex h-screen w-full bg-[#FAF7F2] overflow-hidden font-sans">
      {/* COLONNA 1: SIDEBAR AGENZIA */}
      <AgencySidebar
        agencyId={agencyId}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        style={{ width: `${sidebarWidth}px` }}
      />

      {/* SEPARATORE RIDIMENSIONABILE 1 */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizingSidebar(true);
        }}
        className="w-1.5 cursor-col-resize bg-[#D4AF37]/20 hover:bg-[#D4AF37] transition-colors flex-shrink-0 select-none h-full"
        title="Trascina per ridimensionare Sidebar"
      />

      {/* COLONNA 2: CONFIGURATORE CENTRALE */}
      <AgencyConfigurator
        style={{ width: `${configuratorWidth}px` }}
        activeTab={activeTab}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
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

      {/* SEPARATORE RIDIMENSIONABILE 2 */}
      <div
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizingConfigurator(true);
        }}
        className="w-1.5 cursor-col-resize bg-[#D4AF37]/20 hover:bg-[#D4AF37] transition-colors flex-shrink-0 select-none h-full"
        title="Trascina per ridimensionare Configuratore"
      />

      {/* COLONNA 3: PREVIEW SMARTPHONE LIVE */}
      <AgencyPreview
        selectedTemplate={selectedTemplate}
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
  );
}
