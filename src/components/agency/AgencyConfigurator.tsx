"use client";

import React from "react";
import ConfiguratorForm from "./ConfiguratorForm";
import ConfiguratorList from "./ConfiguratorList";
import ConfiguratorBrand from "./ConfiguratorBrand";

export interface AgencyConfiguratorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTemplate: "A" | "B";
  setSelectedTemplate: (val: "A" | "B") => void;
  introStart: string;
  setIntroStart: (val: string) => void;
  dateDisplayMode: string;
  setDateDisplayMode: (val: string) => void;
  scheduleSchema: string;
  setScheduleSchema: (val: string) => void;
  rsvpStyle: string;
  setRsvpStyle: (val: string) => void;
  eventThemePreset: string;
  setEventThemePreset: (val: string) => void;
  customEventTheme: string;
  setCustomEventTheme: (val: string) => void;
  selectedColorScheme: string;
  setSelectedColorScheme: (val: string) => void;
  coupleNames: string;
  setCoupleNames: (val: string) => void;
  weddingDateDay: string;
  setWeddingDateDay: (val: string) => void;
  weddingDateMonth: string;
  setWeddingDateMonth: (val: string) => void;
  weddingDateYear: string;
  setWeddingDateYear: (val: string) => void;
  locationName: string;
  setLocationName: (val: string) => void;
  locationAddress: string;
  setLocationAddress: (val: string) => void;
  audioUrl: string;
  setAudioUrl: (val: string) => void;
  waterImageUrl: string;
  setWaterImageUrl: (val: string) => void;
  selectedPhrasePreset: string;
  setSelectedPhrasePreset: (val: string) => void;
  customWelcomePhrase: string;
  setCustomWelcomePhrase: (val: string) => void;
  dressCodeNotes: string;
  setDressCodeNotes: (val: string) => void;
  selectedPaletteIdx: number;
  setSelectedPaletteIdx: (val: number) => void;
  scheduleItems?: any[];
  setScheduleItems?: (items: any[]) => void;
  localStoreName?: string;
  setLocalStoreName?: (val: string) => void;
  localStoreUrl?: string;
  setLocalStoreUrl?: (val: string) => void;
  partnerStores?: any[];
  setPartnerStores?: (stores: any[]) => void;
  marqueeText: string;
  setMarqueeText: (val: string) => void;
  customIban: string;
  setCustomIban: (val: string) => void;
  modules: Record<string, boolean>;
  toggleModule: (key: string) => void;
}

export default function AgencyConfigurator(props: AgencyConfiguratorProps) {
  const { activeTab } = props;

  // GESTORE GENERICO DI AGGIORNAMENTO STATO
  const handleUpdate = (field: string, value: any) => {
    if (field === "selectedTemplate") props.setSelectedTemplate(value);
    if (field === "introStart") props.setIntroStart(value);
    if (field === "dateDisplayMode") props.setDateDisplayMode(value);
    if (field === "scheduleSchema") props.setScheduleSchema(value);
    if (field === "rsvpStyle") props.setRsvpStyle(value);
    if (field === "eventThemePreset") props.setEventThemePreset(value);
    if (field === "customEventTheme") props.setCustomEventTheme(value);
    if (field === "coupleNames") props.setCoupleNames(value);
    if (field === "weddingDateDay") props.setWeddingDateDay(value);
    if (field === "weddingDateMonth") props.setWeddingDateMonth(value);
    if (field === "weddingDateYear") props.setWeddingDateYear(value);
    if (field === "locationName") props.setLocationName(value);
    if (field === "locationAddress") props.setLocationAddress(value);
    if (field === "audioUrl") props.setAudioUrl(value);
    if (field === "selectedPhrasePreset") props.setSelectedPhrasePreset(value);
    if (field === "customWelcomePhrase") props.setCustomWelcomePhrase(value);
    if (field === "dressCodeNotes") props.setDressCodeNotes(value);
    if (field === "selectedPaletteIdx") props.setSelectedPaletteIdx(value);
    if (field === "customIban") props.setCustomIban(value);
    if (field === "marqueeText") props.setMarqueeText(value);
    if (field === "localStoreName" && props.setLocalStoreName) props.setLocalStoreName(value);
    if (field === "localStoreUrl" && props.setLocalStoreUrl) props.setLocalStoreUrl(value);
    if (field === "scheduleItems" && props.setScheduleItems) props.setScheduleItems(value);
    if (field === "modules") {
      Object.keys(value).forEach((k) => {
        if (value[k] !== props.modules[k]) {
          props.toggleModule(k);
        }
      });
    }
  };

  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      {activeTab === "create" && (
        <ConfiguratorForm
          {...props}
          scheduleItems={props.scheduleItems}
          localStoreName={props.localStoreName}
          localStoreUrl={props.localStoreUrl}
          onUpdate={handleUpdate}
        />
      )}

      {activeTab === "list" && <ConfiguratorList />}

      {activeTab === "brand" && <ConfiguratorBrand />}
    </div>
  );
}
