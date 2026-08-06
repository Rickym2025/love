"use client";

import React, { useState } from "react";
import { Sparkles, Calendar, Music, MapPin, Palette, Gift, Heart, MessageSquare, Plus, Trash2, ShoppingBag, Image as ImageIcon, Save, CheckCircle2, Layers } from "lucide-react";
import {
  DRESS_CODE_PALETTES,
  WELCOME_PHRASE_PRESETS,
  DATE_DISPLAY_MODES,
  SCHEDULE_SCHEMAS,
  EVENT_THEMES,
  INTRO_START_OPTIONS,
  RSVP_STYLES,
  AUDIO_DEMOS,
  BACKGROUND_PRESETS,
} from "./constants";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
}

export interface PartnerStoreItem {
  id: string;
  name: string;
  url: string;
  logoUrl?: string;
}

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
    selectedTemplate = "A",
    introStart = "busta",
    dateDisplayMode = "countdown",
    scheduleSchema = "classico",
    rsvpStyle = "classico",
    eventThemePreset = "Luxury Gold & Total White",
    customEventTheme = "",
    coupleNames = "Elena & Davide",
    weddingDateDay = "15",
    weddingDateMonth = "Settembre",
    weddingDateYear = "2026",
    locationName = "Villa Rosa",
    locationAddress = "Via Roma 1, Roma",
    audioUrl = "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3",
    selectedPhrasePreset = "0",
    customWelcomePhrase = "",
    dressCodeNotes = "Abiti eleganti nei toni cromatici della palette",
    selectedPaletteIdx = 0,
    customIban = "IT60 X 05428 11101 000000123456",
    heroBgImage = "palette",
    heroMediaImage = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
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
    modules = {
      busta3d: true,
      grattaData: true,
      nuvole3d: true,
      locationMappa: true,
      showOnlyMap: true,
      codiceAbbigliamento: true,
      negoziConvenzionati: true,
      listaNozzeAmazon: true,
      dedicheMarquee: true,
      hubGiochiFesta: true,
      confermaRsvp: true,
      fregiStelle: true,
    },
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
    handleUpdate("audioUrl", "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3");
    handleUpdate("selectedPaletteIdx", 0);
  };

  const applyTemplateB = () => {
    handleUpdate("selectedTemplate", "B");
    handleUpdate("coupleNames", "Francesca & Luca");
    handleUpdate("introStart", "nuvole");
    handleUpdate("dateDisplayMode", "scratch");
    handleUpdate("scheduleSchema", "howitworks");
    handleUpdate("audioUrl", "https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3");
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

  const palettesList = Array.isArray(DRESS_CODE_PALETTES)
    ? DRESS_CODE_PALETTES
    : Object.values(DRESS_CODE_PALETTES || {});

  return (
    <div className="w-full space-y-6 text-[#1E293B]">
      {/* BARRA STATO SALVATAGGIO AUTOMATICO */}
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

      {/* ✦ MODULO 1: DATI SPOSI & FRASE BENVENUTO (PRIMO MODULO) ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border-2 border-[#D4AF37]/40 shadow-md space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-[#D4AF37]" /> Dati Sposi &amp; Frase d&apos;Accoglienza
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("dedicheMarquee")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.dedicheMarquee
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {modules?.dedicheMarquee ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Nomi degli Sposi</label>
          <input
            type="text"
            value={coupleNames}
            onChange={(e) => handleUpdate("coupleNames", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif font-bold text-[#1E293B]"
          />
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Frase d&apos;Accoglienza Preset</label>
          <select
            value={selectedPhrasePreset}
            onChange={(e) => handleUpdate("selectedPhrasePreset", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-serif cursor-pointer"
          >
            {(WELCOME_PHRASE_PRESETS || []).map((phrase, idx) => (
              <option key={idx} value={String(idx)}>
                {idx === 9 ? "✍️ Personalizzato (digita la tua frase)" : `"${phrase}"`}
              </option>
            ))}
          </select>

          {selectedPhrasePreset === "9" && (
            <textarea
              rows={2}
              placeholder="Scrivi la tua frase speciale d'accoglienza..."
              value={customWelcomePhrase}
              onChange={(e) => handleUpdate("customWelcomePhrase", e.target.value)}
              className="mt-2 w-full text-xs p-2 rounded-xl border border-[#D4AF37] bg-white font-serif font-bold"
            />
          )}
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 2: MODELLI PREIMPOSTATI A / B / C ✦ */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Modello Preimpostato
        </h3>

        <div className="grid grid-cols-3 gap-2 pt-1">
          <button
            type="button"
            onClick={applyTemplateA}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTemplate === "A"
                ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xs font-bold block text-[#1E293B]">Modello A</span>
            <span className="text-[9px] text-slate-500 mt-1 block">Elena &amp; Davide</span>
          </button>

          <button
            type="button"
            onClick={applyTemplateB}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTemplate === "B"
                ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xs font-bold block text-[#1E293B]">Modello B</span>
            <span className="text-[9px] text-slate-500 mt-1 block">Francesca &amp; Luca</span>
          </button>

          <button
            type="button"
            onClick={applyTemplateC}
            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
              selectedTemplate === "C"
                ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                : "border-slate-200 bg-white hover:border-slate-300"
            }`}
          >
            <span className="text-xs font-bold block text-[#8B6508]">Modello C (Landing)</span>
            <span className="text-[9px] text-slate-500 mt-1 block">Giulia &amp; Marco</span>
          </button>
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 3: COLONNA SONORA D'AUTORE / UPLOAD MP3 ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Music className="w-4 h-4 text-[#D4AF37]" /> Colonna Sonora d&apos;Autore &amp; Upload MP3
        </h3>

        <div>
          <label className="block text-[11px] font-bold mb-1">Seleziona Brano o Incolla MP3</label>
          <select
            value={audioUrl}
            onChange={(e) => handleUpdate("audioUrl", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
          >
            {(AUDIO_DEMOS || []).map((track) => (
              <option key={track.id} value={track.url}>
                {track.title}
              </option>
            ))}
            <option value="custom">Incolla Link MP3 Personalizzato / Cloud</option>
          </select>

          {audioUrl === "custom" && (
            <div className="mt-2 space-y-1">
              <label className="block text-[10px] font-bold text-[#8B6508]">URL File MP3 Personalizzato</label>
              <input
                type="text"
                placeholder="https://mio-server.com/musica-sposi.mp3"
                onChange={(e) => handleUpdate("audioUrl", e.target.value)}
                className="w-full text-xs p-2 rounded-xl border border-[#D4AF37] bg-white font-mono"
              />
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 4: SFONDO DELL'INVITO & TEXTURES ✦ */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#D4AF37]" /> Sfondo dell&apos;Invito &amp; Textures (10 Preset + Palette)
        </h3>

        <div>
          <label className="block text-[11px] font-bold mb-2">Scegli la Texture di Sfondo dell&apos;Invito</label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {(BACKGROUND_PRESETS || []).map((preset) => {
              const isSelected = heroBgImage === preset.url;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleUpdate("heroBgImage", preset.url)}
                  className={`p-1.5 rounded-xl border text-center transition-all cursor-pointer overflow-hidden ${
                    isSelected
                      ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="w-full h-12 rounded-lg overflow-hidden relative mb-1 border border-black/10">
                    <img src={preset.thumbnail} alt={preset.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[9px] font-bold block leading-tight truncate text-[#1E293B]">{preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Oppure Incolla URL Sfondo Personalizzato / Upload</label>
          <input
            type="text"
            placeholder="https://images.unsplash.com/photo-..."
            value={heroBgImage}
            onChange={(e) => handleUpdate("heroBgImage", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
          />
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 5: EFFETTO START INIZIALE ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> Effetto Start Iniziale
          </h3>
          <button
            type="button"
            onClick={() => {
              toggleModule("busta3d");
              toggleModule("nuvole3d");
            }}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.busta3d || modules?.nuvole3d
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {modules?.busta3d || modules?.nuvole3d ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold mb-1">Effetto Start Iniziale</label>
            <select
              value={introStart}
              onChange={(e) => handleUpdate("introStart", e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
            >
              {(INTRO_START_OPTIONS || []).map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label === "Scroll Expand Media a Tutto Schermo" ? "Zoom Multimediale allo Scroll" : opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold mb-1">Tema dell&apos;Evento</label>
            <select
              value={eventThemePreset}
              onChange={(e) => handleUpdate("eventThemePreset", e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
            >
              {(EVENT_THEMES || []).map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {eventThemePreset === "Personalizzato (digita a mano)" && (
          <div>
            <label className="block text-[11px] font-bold mb-1 text-[#8B6508]">Scrivi il tuo Tema Personalizzato</label>
            <input
              type="text"
              placeholder="Es. Country Chic Vintage, Mare & Coralli..."
              value={customEventTheme}
              onChange={(e) => handleUpdate("customEventTheme", e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-[#D4AF37] bg-white font-bold"
            />
          </div>
        )}

        <div>
          <label className="block text-[10px] font-bold mb-1">URL Foto Principale Sposi (Zoom / Hero)</label>
          <input
            type="text"
            placeholder="https://images.unsplash.com/photo-..."
            value={heroMediaImage}
            onChange={(e) => handleUpdate("heroMediaImage", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-mono"
          />
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 6: DATA DEL MATRIMONIO ✦ */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> Data del Matrimonio
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("grattaData")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.grattaData
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {modules?.grattaData ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-bold mb-1">Giorno</label>
            <input
              type="text"
              value={weddingDateDay}
              onChange={(e) => handleUpdate("weddingDateDay", e.target.value)}
              className="w-full text-xs p-2 text-center rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold mb-1">Mese</label>
            <input
              type="text"
              value={weddingDateMonth}
              onChange={(e) => handleUpdate("weddingDateMonth", e.target.value)}
              className="w-full text-xs p-2 text-center rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold mb-1">Anno</label>
            <input
              type="text"
              value={weddingDateYear}
              onChange={(e) => handleUpdate("weddingDateYear", e.target.value)}
              className="w-full text-xs p-2 text-center rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Modulo Visualizzazione Data</label>
          <select
            value={dateDisplayMode}
            onChange={(e) => handleUpdate("dateDisplayMode", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
          >
            {(DATE_DISPLAY_MODES || []).map((mode) => (
              <option key={mode.id} value={mode.id}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 7: PROGRAMMA GIORNATA ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#D4AF37]" /> Programma della Giornata &amp; Orari Modificabili
          </h3>
          <button
            type="button"
            onClick={addScheduleItem}
            className="px-2.5 py-1 text-[10px] font-bold bg-[#D4AF37] text-slate-900 rounded-lg flex items-center gap-1 hover:bg-amber-400 cursor-pointer shadow-xs"
          >
            <Plus className="w-3 h-3" /> Aggiungi Orario
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-2">Schema Grafico Visualizzazione Orari</label>
          <select
            value={scheduleSchema}
            onChange={(e) => handleUpdate("scheduleSchema", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer mb-3"
          >
            {(SCHEDULE_SCHEMAS || []).map((item) => (
              <option key={item.id} value={item.id}>
                {item.label} — {item.description}
              </option>
            ))}
          </select>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-700">Modifica Orari e Momenti:</label>
            {scheduleItems.map((item) => (
              <div key={item.id} className="flex gap-2 items-center bg-white p-2 rounded-xl border border-slate-200">
                <input
                  type="text"
                  value={item.time}
                  onChange={(e) => updateScheduleItem(item.id, "time", e.target.value)}
                  className="w-20 text-xs p-1.5 font-bold text-center border border-slate-300 rounded-lg text-[#8B6508]"
                  placeholder="16:30"
                />
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateScheduleItem(item.id, "title", e.target.value)}
                  className="flex-1 text-xs p-1.5 font-medium border border-slate-300 rounded-lg"
                  placeholder="Descrizione momento..."
                />
                <button
                  type="button"
                  onClick={() => removeScheduleItem(item.id)}
                  className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                  title="Elimina orario"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 8: LOCATION & MAPPA GOOGLE CON PULSANTE DEDICATO NASCONDI SOLO MAPPA ✦ */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#D4AF37]" /> Location del Matrimonio &amp; Mappa Google
          </h3>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => toggleModule("locationMappa")}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                modules?.locationMappa !== false
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
            >
              {modules?.locationMappa !== false ? "✓ Modulo Attivo" : "✕ Modulo Disattivo"}
            </button>
            <button
              type="button"
              onClick={() => toggleModule("showOnlyMap")}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                modules?.showOnlyMap !== false
                  ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                  : "bg-amber-100 text-amber-800 border-amber-300"
              }`}
            >
              {modules?.showOnlyMap !== false ? "✓ Mappa Google Visibile" : "✕ Nascondi Solo Mappa"}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold mb-1">Nome della Location / Villa (Sempre Visibile)</label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => handleUpdate("locationName", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold mb-1">Indirizzo per Navigatore / Google Maps (Sempre Visibile)</label>
            <input
              type="text"
              value={locationAddress}
              onChange={(e) => handleUpdate("locationAddress", e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 9: DRESS CODE & PALETTE ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-[#D4AF37]" /> Dress Code &amp; Palette CROMATICA
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("codiceAbbigliamento")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.codiceAbbigliamento
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {modules?.codiceAbbigliamento ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-2">Seleziona Palette (8 Opzioni Coordinate)</label>
          <div className="grid grid-cols-2 gap-2">
            {palettesList.map((p: any, idx: number) => {
              const isSelected = selectedPaletteIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleUpdate("selectedPaletteIdx", idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <span className="text-[10px] font-bold block mb-1.5 truncate">{p.name}</span>
                  <div className="flex gap-1">
                    {(p.colors || []).map((c: string, cIdx: number) => (
                      <span
                        key={cIdx}
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Note per il Dress Code</label>
          <input
            type="text"
            value={dressCodeNotes}
            onChange={(e) => handleUpdate("dressCodeNotes", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white"
          />
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 10: LISTA NOZZE & NEGOZI LOCALI CON LOGO ✦ */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <Gift className="w-4 h-4 text-[#D4AF37]" /> Lista Nozze &amp; Coordinate IBAN
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("listaNozzeAmazon")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.listaNozzeAmazon
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {modules?.listaNozzeAmazon ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Codice IBAN per Contributi</label>
          <input
            type="text"
            value={customIban}
            onChange={(e) => handleUpdate("customIban", e.target.value)}
            className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-mono font-bold"
          />
        </div>

        <div className="p-3 bg-amber-50/60 rounded-xl border border-[#D4AF37]/40 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#8B6508]" />
            <span className="text-xs font-bold text-[#1E293B]">Pulsante Lista Nozze Amazon Affiliato</span>
          </div>
          <button
            type="button"
            onClick={() => handleUpdate("showAmazonAffiliate", !showAmazonAffiliate)}
            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              showAmazonAffiliate
                ? "bg-rose-500 text-white border-rose-600 shadow-xs"
                : "bg-emerald-600 text-white border-emerald-700"
            }`}
          >
            {showAmazonAffiliate ? "✕ Rimuovi Link Amazon" : "＋ Ripristina Link Amazon"}
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#8B6508]">Negozi Locali Convenzionati (Aggiungi Multipli):</span>
            <button
              type="button"
              onClick={addCustomStore}
              className="px-2.5 py-1 text-[10px] font-bold bg-[#D4AF37] text-slate-900 rounded-lg flex items-center gap-1 hover:bg-amber-400 cursor-pointer shadow-xs"
            >
              <Plus className="w-3 h-3" /> Aggiungi Negozio
            </button>
          </div>

          <div className="space-y-3">
            {customStores.map((store) => (
              <div key={store.id} className="p-3 bg-[#FAF7F2] rounded-xl border border-slate-200 space-y-2">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Nome Negozio (es. Gioielleria Rossi)..."
                    value={store.name}
                    onChange={(e) => updateCustomStore(store.id, "name", e.target.value)}
                    className="flex-1 text-xs p-1.5 font-bold border border-slate-300 rounded-lg bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeCustomStore(store.id)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="Elimina negozio"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Link Sito / E-commerce..."
                    value={store.url}
                    onChange={(e) => updateCustomStore(store.id, "url", e.target.value)}
                    className="text-xs p-1.5 font-mono border border-slate-300 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    placeholder="URL Logo (lascia vuoto per logo default)..."
                    value={store.logoUrl || ""}
                    onChange={(e) => updateCustomStore(store.id, "logoUrl", e.target.value)}
                    className="text-xs p-1.5 font-mono border border-slate-300 rounded-lg bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-[#D4AF37] font-serif text-xs tracking-widest my-1">✦ ✦ ✦</div>

      {/* ✦ MODULO 11: CONFERMA PARTECIPAZIONE (RSVP) & FESTA & FREGI ✦ */}
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] via-white to-[#FDFBF7] rounded-2xl border border-[#D4AF37]/30 shadow-md space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> Conferma Partecipazione (RSVP) &amp; Opzioni
          </h3>
          <button
            type="button"
            onClick={() => toggleModule("confermaRsvp")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.confermaRsvp
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {modules?.confermaRsvp ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

        <div>
          <label className="block text-[11px] font-bold mb-1">Stile Modulo RSVP (6 Stili Formali &amp; Interattivi)</label>
          <select
            value={rsvpStyle}
            onChange={(e) => handleUpdate("rsvpStyle", e.target.value)}
            className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-medium cursor-pointer"
          >
            {(RSVP_STYLES || []).map((style) => (
              <option key={style.id} value={style.id}>
                {style.label}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold">Stelle e Fregi Divisori (✦ ✦ ✦)</span>
          <button
            type="button"
            onClick={() => toggleModule("fregiStelle")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.fregiStelle !== false
                ? "bg-[#D4AF37] text-[#1E293B] border-[#D4AF37]"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {modules?.fregiStelle !== false ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold">Giochi della Festa per Invitati</span>
          <button
            type="button"
            onClick={() => toggleModule("hubGiochiFesta")}
            className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
              modules?.hubGiochiFesta
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                : "bg-slate-100 text-slate-500 border-slate-200"
            }`}
          >
            {modules?.hubGiochiFesta ? "✓ Attivo" : "✕ Disattivo"}
          </button>
        </div>
      </div>
    </div>
  );
}
