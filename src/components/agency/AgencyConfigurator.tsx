"use client";

import React from "react";
import ConfiguratorForm from "./ConfiguratorForm";
import ConfiguratorList from "./ConfiguratorList";
import ConfiguratorBrand from "./ConfiguratorBrand";
import WhatsAppSender from "./WhatsAppSender";

export interface AgencyConfiguratorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTemplate: "A" | "B" | "C";
  setSelectedTemplate: (val: "A" | "B" | "C") => void;
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
  heroBgImage?: string;
  setHeroBgImage?: (val: string) => void;
  heroMediaImage?: string;
  setHeroMediaImage?: (val: string) => void;
  puzzleImage?: string;
  setPuzzleImage?: (val: string) => void;
  scratchPhotoUrl?: string;
  setScratchPhotoUrl?: (val: string) => void;
  quizQuestions?: any[];
  setQuizQuestions?: (val: any[]) => void;
  galleryStyle?: string;
  setGalleryStyle?: (val: string) => void;
  puzzlePrize?: string;
  setPuzzlePrize?: (val: string) => void;
  scratchPrize?: string;
  setScratchPrize?: (val: string) => void;
  quizPrize?: string;
  setQuizPrize?: (val: string) => void;
  scheduleItems?: any[];
  setScheduleItems?: (items: any[]) => void;
  showAmazonAffiliate?: boolean;
  setShowAmazonAffiliate?: (val: boolean) => void;
  customStores?: any[];
  setCustomStores?: (stores: any[]) => void;
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

  // GESTORE DINAMICO E UNIVERSALE DI AGGIORNAMENTO STATO PER TUTTE LE PROPS
  const handleUpdate = (field: string, value: any) => {
    const setterName = `set${field.charAt(0).toUpperCase()}${field.slice(1)}`;
    if (typeof (props as any)[setterName] === "function") {
      (props as any)[setterName](value);
    }

    if (field === "heroBgImage" && props.setHeroBgImage) props.setHeroBgImage(value);
    if (field === "heroMediaImage" && props.setHeroMediaImage) props.setHeroMediaImage(value);
    if (field === "puzzleImage" && props.setPuzzleImage) props.setPuzzleImage(value);
    if (field === "scratchPhotoUrl" && props.setScratchPhotoUrl) props.setScratchPhotoUrl(value);
    if (field === "quizQuestions" && props.setQuizQuestions) props.setQuizQuestions(value);
    if (field === "galleryStyle" && props.setGalleryStyle) props.setGalleryStyle(value);
    if (field === "puzzlePrize" && props.setPuzzlePrize) props.setPuzzlePrize(value);
    if (field === "scratchPrize" && props.setScratchPrize) props.setScratchPrize(value);
    if (field === "quizPrize" && props.setQuizPrize) props.setQuizPrize(value);
    if (field === "showAmazonAffiliate" && props.setShowAmazonAffiliate) props.setShowAmazonAffiliate(value);
    if (field === "customStores" && props.setCustomStores) props.setCustomStores(value);
    if (field === "scheduleItems" && props.setScheduleItems) props.setScheduleItems(value);
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
      {/* SCHEDA 1: FORM CREAZIONE E MODIFICA */}
      {activeTab === "create" && (
        <ConfiguratorForm
          {...props}
          heroBgImage={props.heroBgImage}
          heroMediaImage={props.heroMediaImage}
          puzzleImage={props.puzzleImage}
          scratchPhotoUrl={props.scratchPhotoUrl}
          quizQuestions={props.quizQuestions}
          galleryStyle={props.galleryStyle}
          puzzlePrize={props.puzzlePrize}
          scratchPrize={props.scratchPrize}
          quizPrize={props.quizPrize}
          scheduleItems={props.scheduleItems}
          showAmazonAffiliate={props.showAmazonAffiliate}
          customStores={props.customStores}
          onUpdate={handleUpdate}
        />
      )}

      {/* SCHEDA 2: LISTA INVITI SALVATI */}
      {activeTab === "list" && <ConfiguratorList />}

      {/* SCHEDA 3: SPEDIZIONE WHATSAPP & LISTA INVITATI */}
      {activeTab === "whatsapp" && (
        <WhatsAppSender slug={props.coupleNames} coupleNames={props.coupleNames} />
      )}

      {/* SCHEDA 4: BRAND WHITE-LABEL */}
      {activeTab === "brand" && <ConfiguratorBrand />}
    </div>
  );
}
