"use client";

import React, { useState } from "react";
import ConfiguratorForm from "./ConfiguratorForm";
import AgencyPreview from "./AgencyPreview";

export default function AgencyConfigurator({ activeTab = "configurator" }: { activeTab?: string }) {
  // STATO UNIFICATO, REATTIVO E PERMANENTE
  const [formData, setFormData] = useState({
    selectedTemplate: "A",
    template: "A",
    introStart: "busta",
    start: "busta",
    dateDisplayMode: "countdown",
    dateMode: "countdown",
    scheduleSchema: "classico",
    schedule: "classico",
    rsvpStyle: "classico",
    eventThemePreset: "Luxury Gold & Total White",
    customEventTheme: "",
    coupleNames: "Elena & Davide",
    weddingDateDay: "15",
    weddingDateMonth: "Settembre",
    weddingDateYear: "2026",
    locationName: "Villa Rosa",
    locationAddress: "Via Roma 1, Roma",
    audioUrl: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3",
    audio: "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3",
    welcomePhrase: "Benvenuti al nostro matrimonio",
    selectedPhrasePreset: "0",
    phrasePreset: "0",
    customWelcomePhrase: "",
    dressCodeNotes: "Abiti eleganti nei toni cromatici della palette",
    selectedPaletteIdx: 0,
    palette: 0,
    customIban: "IT60 X 05428 11101 000000123456",
    marqueeText: "",
    modules: {
      busta3d: true,
      grattaData: true,
      nuvole3d: true,
      locationMappa: true,
      codiceAbbigliamento: true,
      negoziConvenzionati: true,
      listaNozzeAmazon: true,
      dedicheMarquee: true,
      hubGiochiFesta: true,
      confermaRsvp: true,
    }
  });

  // AGGIORNAMENTO FUNZIONALE E REATTIVO PERMUTABILE
  const handleUpdate = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
      ...(field === "selectedTemplate" ? { template: value } : {}),
      ...(field === "template" ? { selectedTemplate: value } : {}),
      ...(field === "introStart" ? { start: value } : {}),
      ...(field === "start" ? { introStart: value } : {}),
      ...(field === "dateDisplayMode" ? { dateMode: value } : {}),
      ...(field === "dateMode" ? { dateDisplayMode: value } : {}),
      ...(field === "scheduleSchema" ? { schedule: value } : {}),
      ...(field === "schedule" ? { scheduleSchema: value } : {}),
      ...(field === "selectedPaletteIdx" ? { palette: value } : {}),
      ...(field === "palette" ? { selectedPaletteIdx: value } : {}),
      ...(field === "selectedPhrasePreset" ? { phrasePreset: value } : {}),
      ...(field === "phrasePreset" ? { selectedPhrasePreset: value } : {}),
      ...(field === "audioUrl" ? { audio: value } : {}),
      ...(field === "audio" ? { audioUrl: value } : {}),
    }));
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 p-4 overflow-y-auto pointer-events-auto relative z-10 select-text">
      {/* COLONNA FORM CONFIGURATORE */}
      <div className="flex-1 min-w-[340px] max-w-2xl bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-[#D4AF37]/30 shadow-xl overflow-y-auto relative z-20 pointer-events-auto select-text">
        <ConfiguratorForm
          {...formData}
          onUpdate={handleUpdate}
          onChange={handleUpdate}
        />
      </div>

      {/* COLONNA ANTEPRIMA LIVE */}
      <div className="w-[360px] shrink-0 sticky top-4 self-start bg-slate-900/90 p-4 rounded-3xl border border-[#D4AF37]/40 shadow-2xl relative z-20 pointer-events-auto">
        <AgencyPreview
          {...formData}
        />
      </div>
    </div>
  );
}
