"use client";

import React, { useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";
import {
  SectionDatiSposi,
  SectionModelliPreset,
  SectionColonnaSonora,
  SectionSfondoTextures,
  SectionDressCode,
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
    audioUrl = "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3",
    heroBgImage = "palette",
    selectedPaletteIdx = 0,
    dressCodeNotes = "Abiti eleganti nei toni cromatici della palette",
    selectedPhrasePreset = "0",
    customWelcomePhrase = "",
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

      {/* 5. DRESS CODE & PALETTE */}
      <SectionDressCode
        selectedPaletteIdx={selectedPaletteIdx}
        dressCodeNotes={dressCodeNotes}
        handleUpdate={handleUpdate}
        toggleModule={toggleModule}
        modules={modules}
      />
    </div>
  );
}
