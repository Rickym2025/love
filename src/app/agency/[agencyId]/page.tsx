"use client";

import React, { useState } from "react";
import AgencySidebar from "@/components/agency/AgencySidebar";
import AgencyConfigurator from "@/components/agency/AgencyConfigurator";
import AgencyPreview from "@/components/agency/AgencyPreview";

export default function AgencyStudioPage({ params }: { params: { agencyId: string } }) {
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
  
  // DICHIARAZIONE FONDAMENTALE DELLO STATO marqueeText
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

  return (
    <div className="flex h-screen w-full bg-slate-900 overflow-hidden font-sans">
      {/* 1. SIDEBAR SINISTRA */}
      <AgencySidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. PANNELLO CONFIGURATORE CENTRALE */}
      <AgencyConfigurator
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

      {/* 3. ANTEPRIMA LIVE SMARTPHONE DESTRO */}
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
