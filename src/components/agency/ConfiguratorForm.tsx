"use client";

import React, { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import {
  SectionDatiSposi,
  SectionModelliPreset,
  SectionColonnaSonora,
  SectionSfondoTextures,
  SectionEffettoStart,
  SectionDataMatrimonio,
  SectionProgrammaGiornata,
  SectionLocationMappa,
  SectionDressCode,
  SectionListaNozze,
  SectionRsvpFesta,
  ScheduleItem,
  PartnerStoreItem,
} from "./FormSubSections";

export interface ConfiguratorFormProps {
  selectedTemplate?: "A" | "B" | "C";
  introStart?: string;
  dateDisplayMode?: string;
  scheduleSchema?: string;
  rsvpStyle?: string;
  eventThemePreset?: string;
  customEventTheme?: string;
  coupleNames?: string;
  weddingDateDay?: string;
  weddingDateMonth?: string;
  weddingDateYear?: string;
  locationName?: string;
  locationAddress?: string;
  audioUrl?: string;
  welcomePhrase?: string;
  selectedPhrasePreset?: string;
  customWelcomePhrase?: string;
  dressCodeNotes?: string;
  selectedPaletteIdx?: number;
  customIban?: string;
  heroBgImage?: string;
  heroMediaImage?: string;
  waterImageUrl?: string;
  scheduleItems?: ScheduleItem[];
  showAmazonAffiliate?: boolean;
  customStores?: PartnerStoreItem[];
  modules?: Record<string, boolean>;
  onUpdate?: (field: string, value: any) => void;
}

export default function ConfiguratorForm(props: ConfiguratorFormProps) {
  const {
    coupleNames = "Elena & Davide",
    selectedTemplate = "A",
    introStart = "busta",
    dateDisplayMode = "countdown",
    scheduleSchema = "classico",
    rsvpStyle = "classico",
    eventThemePreset = "Luxury Gold & Total White",
    customEventTheme = "",
    weddingDateDay = "15",
    weddingDateMonth = "Settembre",
    weddingDateYear = "2026",
    locationName = "Villa Rosa",
    locationAddress = "Via Roma 1, Roma",
    audioUrl = "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3",
    heroBgImage = "palette",
    heroMediaImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    waterImageUrl = "",
    selectedPaletteIdx = 0,
    dressCodeNotes = "Abiti eleganti nei toni cromatici della palette",
    selectedPhrasePreset = "0",
    customWelcomePhrase = "",
    customIban = "IT60 X 05428 11101 000000123456",
    scheduleItems = [
      { id: "1", time: "16:30", title: "Arrivo ed Accoglienza Ospiti" },
      { id: "2", time: "17:00", title: "Cerimonia Solenne di Nozze" },
      { id: "3", time: "18:30", title: "Aperitivo & Cocktail Hour in Giardino" },
      { id: "4", time: "20:00", title: "Cena di Gala & Taglio Torta" },
      { id: "5", time: "22:00", title: "Festa, DJ Set & Open Bar" },
    ],
    showAmazonAffiliate = true,
    customStores = [
      { id: "1", name: "Gioielleria Rossi & Lista Nozze Locale", url: "https://gioielleriarossi.it", logoUrl: "/logo.png" }
    ],
    modules = {},
    onUpdate,
  } = props;

  const [salvatoState, setSalvatoState] = useState(false);

  const handleUpdate = (field: string, value: any) => {
    if (typeof onUpdate === "function") {
      onUpdate(field, value);
    }
  };

  const handleManualSave = () => {
    setSalvatoState(true);
    setTimeout(() => setSalvatoState(false), 2500);
  };

  const toggleModule = (key: string) => {
    const currentModules = modules || {};
    handleUpdate("modules", { ...currentModules, [key]: !currentModules[key] });
  };

  const applyTemplateA = () => {
    handleUpdate("selectedTemplate", "A");
    handleUpdate("coupleNames", "Elena & Davide");
    handleUpdate("introStart", "busta");
    handleUpdate("dateDisplayMode", "countdown");
    handleUpdate("scheduleSchema", "classico");
    handleUpdate("selectedPaletteIdx", 0);
  };

  const applyTemplateB = () => {
    handleUpdate("selectedTemplate", "B");
    handleUpdate("coupleNames", "Francesca & Luca");
    handleUpdate("introStart", "nuvole");
    handleUpdate("dateDisplayMode", "scratch");
    handleUpdate("scheduleSchema", "howitworks");
    handleUpdate("selectedPaletteIdx", 1);
  };

  const applyTemplateC = () => {
    handleUpdate("selectedTemplate", "C");
    handleUpdate("coupleNames", "Giulia & Marco");
    handleUpdate("introStart", "expand");
    handleUpdate("dateDisplayMode", "countdown");
    handleUpdate("scheduleSchema", "timeline");
    handleUpdate("selectedPaletteIdx", 2);
  };

  const addScheduleItem = () => {
    const newItem: ScheduleItem = {
      id: Date.now().toString(),
      time: "23:00",
      title: "Nuovo Momento della Festa",
    };
    handleUpdate("scheduleItems", [...scheduleItems, newItem]);
  };

  const updateScheduleItem = (id: string, field: "time" | "title", value: string) => {
    const updated = scheduleItems.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    handleUpdate("scheduleItems", updated);
  };

  const removeScheduleItem = (id: string) => {
    const updated = scheduleItems.filter((item) => item.id !== id);
    handleUpdate("scheduleItems", updated);
  };

  const addCustomStore = () => {
    const newStore: PartnerStoreItem = {
      id: Date.now().toString(),
      name: "Nuovo Negozio Locale",
      url: "https://",
      logoUrl: "/logo.png",
    };
    handleUpdate("customStores", [...customStores, newStore]);
  };

  const updateCustomStore = (id: string, field: "name" | "url" | "logoUrl", value: string) => {
    const updated = customStores.map((s) => (s.id === id ? { ...s, [field]: value } : s));
    handleUpdate("customStores", updated);
  };

  const removeCustomStore = (id: string) => {
    const updated = customStores.filter((s) => s.id !== id);
    handleUpdate("customStores", updated);
  };

  return (
    <div className="w-full space-y-6 text-[#1E293B]">
      {/* BARRA SALVATAGGIO AUTOMATICO */}
      <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl border border-[#D4AF37] flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-200">
            Salvataggio Automatico Attivo <span className="text-[#D4AF37] font-mono text-[10px] ml-1">({coupleNames})</span>
          </span>
        </div>
        <button
          type="button"
          onClick={handleManualSave}
          className="px-4 py-2 bg-[#D4AF37] text-slate-900 font-bold text-xs rounded-xl hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-md cursor-pointer active:scale-95"
        >
          <Save className="w-3.5 h-3.5" />
          {salvatoState ? "✓ Invito Salvato!" : "✦ Salva Invito"}
        </button>
      </div>

      {/* 1. DATI SPOSI & FRASE BENVENUTO (PRIMO MODULO) */}
      <SectionDatiSposi
        coupleNames={coupleNames}
        selectedPhrasePreset={selectedPhrasePreset}
        customWelcomePhrase={customWelcomePhrase}
        modules={modules}
        toggleModule={toggleModule}
        handleUpdate={handleUpdate}
      />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 2. MODELLI PREIMPOSTATI */}
      <SectionModelliPreset
        selectedTemplate={selectedTemplate}
        applyTemplateA={applyTemplateA}
        applyTemplateB={applyTemplateB}
        applyTemplateC={applyTemplateC}
      />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 3. COLONNA SONORA D'AUTORE */}
      <SectionColonnaSonora audioUrl={audioUrl} handleUpdate={handleUpdate} />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 4. SFONDO DELL'INVITO & TEXTURES */}
      <SectionSfondoTextures heroBgImage={heroBgImage} handleUpdate={handleUpdate} />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 5. EFFETTO START INIZIALE */}
      <SectionEffettoStart
        introStart={introStart}
        eventThemePreset={eventThemePreset}
        customEventTheme={customEventTheme}
        heroMediaImage={heroMediaImage}
        waterImageUrl={waterImageUrl}
        handleUpdate={handleUpdate}
        toggleModule={toggleModule}
        modules={modules}
      />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 6. DATA DEL MATRIMONIO */}
      <SectionDataMatrimonio
        weddingDateDay={weddingDateDay}
        weddingDateMonth={weddingDateMonth}
        weddingDateYear={weddingDateYear}
        dateDisplayMode={dateDisplayMode}
        handleUpdate={handleUpdate}
        toggleModule={toggleModule}
        modules={modules}
      />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 7. PROGRAMMA GIORNATA & ORARI */}
      <SectionProgrammaGiornata
        scheduleSchema={scheduleSchema}
        scheduleItems={scheduleItems}
        addScheduleItem={addScheduleItem}
        updateScheduleItem={updateScheduleItem}
        removeScheduleItem={removeScheduleItem}
        handleUpdate={handleUpdate}
      />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 8. LOCATION & MAPPA GOOGLE */}
      <SectionLocationMappa
        locationName={locationName}
        locationAddress={locationAddress}
        handleUpdate={handleUpdate}
        toggleModule={toggleModule}
        modules={modules}
      />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 9. DRESS CODE & PALETTE */}
      <SectionDressCode
        selectedPaletteIdx={selectedPaletteIdx}
        dressCodeNotes={dressCodeNotes}
        handleUpdate={handleUpdate}
        toggleModule={toggleModule}
        modules={modules}
      />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 10. LISTA NOZZE & NEGOZI LOCALI CON LOGO */}
      <SectionListaNozze
        customIban={customIban}
        showAmazonAffiliate={showAmazonAffiliate}
        customStores={customStores}
        addCustomStore={addCustomStore}
        updateCustomStore={updateCustomStore}
        removeCustomStore={removeCustomStore}
        handleUpdate={handleUpdate}
        toggleModule={toggleModule}
        modules={modules}
      />

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* 11. RSVP & FESTA */}
      <SectionRsvpFesta
        rsvpStyle={rsvpStyle}
        handleUpdate={handleUpdate}
        toggleModule={toggleModule}
        modules={modules}
      />
    </div>
  );
}
