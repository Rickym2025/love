"use client";

import React, { useState, useRef } from "react";
import { MoveHorizontal, X } from "lucide-react";
import AgencySidebar from "@/components/agency/AgencySidebar";
import AgencyConfigurator, { PartnerStore } from "@/components/agency/AgencyConfigurator";
import AgencyPreview from "@/components/agency/AgencyPreview";

export interface AgencyPageProps {
  params: {
    agencyId: string;
  };
}

export default function AgencyStudioPage({ params }: AgencyPageProps) {
  const agencySlug = params?.agencyId || "sposi-in-love";

  const [activeTab, setActiveTab] = useState<"list" | "create" | "brand">("create");
  
  // DRAG COLONNE TRASCINABILI
  const [col1Width, setCol1Width] = useState(22);
  const [col2Width, setCol2Width] = useState(45);

  // STATE CONFIGURAZIONE
  const [selectedTemplate, setSelectedTemplate] = useState<"A" | "B">("A");
  const [selectedColorScheme, setSelectedColorScheme] = useState("1");
  const [coupleNames, setCoupleNames] = useState("Elena & Davide");
  const [weddingDateDay, setWeddingDateDay] = useState("24");
  const [weddingDateMonth, setWeddingDateMonth] = useState("MAGGIO");
  const [weddingDateYear, setWeddingDateYear] = useState("2026");
  const [locationName, setLocationName] = useState("Villa del Balbianello");
  const [locationAddress, setLocationAddress] = useState("Via Salita Regina, 22, 22010 Lenno CO");
  const [audioUrl, setAudioUrl] = useState("https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3");
  const [waterImageUrl, setWaterImageUrl] = useState("https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80");
  const [selectedPhrasePreset, setSelectedPhrasePreset] = useState("0");
  const [customWelcomePhrase, setCustomWelcomePhrase] = useState("");
  const [dressCodeNotes, setDressCodeNotes] = useState("Abiti eleganti in tonalità pastello. Evitare il bordeaux.");
  const [selectedPaletteIdx, setSelectedPaletteIdx] = useState(0);
  const [showWeb3FormsModal, setShowWeb3FormsModal] = useState(false);

  const [partnerStores, setPartnerStores] = useState<PartnerStore[]>([
    { id: "1", name: "Gioielleria Valenza", url: "https://www.gioielleriavalenza.it", logoUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=200&q=80" },
    { id: "2", name: "Rinascente Milano", url: "https://www.rinascente.it", logoUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=200&q=80" },
  ]);

  const [modules, setModules] = useState<Record<string, boolean>>({
    busta3d: true,
    grattaData: true,
    effettoAcqua: true,
    nuvole3d: true,
    locationMappa: true,
    codiceAbbigliamento: true,
    negoziConvenzionati: true,
    listaNozzeAmazon: true,
    confermaRsvp: true,
  });

  const toggleModule = (key: string) => {
    setModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // DRAG DISIVORI COLONNE
  const isDraggingRef = useRef<"col1" | "col2" | null>(null);

  const handleMouseDown = (divider: "col1" | "col2") => {
    isDraggingRef.current = divider;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const currentPercent = (e.clientX / window.innerWidth) * 100;

    if (isDraggingRef.current === "col1" && currentPercent > 12 && currentPercent < 35) {
      setCol1Width(currentPercent);
    } else if (isDraggingRef.current === "col2") {
      const col2Val = currentPercent - col1Width;
      if (col2Val > 25 && currentPercent < 80) setCol2Width(col2Val);
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const welcomePhrase = selectedPhrasePreset === "9" ? customWelcomePhrase || "Frase personalizzata..." : "Due anime, un solo destino. Una storia scritta nel cuore.";

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] flex flex-col md:flex-row font-sans overflow-hidden">
      {/* ─── COLONNA 1: SIDEBAR ─── */}
      <AgencySidebar
        agencySlug={agencySlug}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenWeb3Forms={() => setShowWeb3FormsModal(true)}
        style={{ width: `${col1Width}%` }}
      />

      {/* DIVISORE 1 TRASCINABILE */}
      <div onMouseDown={() => handleMouseDown("col1")} className="w-2 bg-slate-200 hover:bg-[#D4AF37] cursor-col-resize flex items-center justify-center hidden md:flex transition-colors">
        <MoveHorizontal className="w-3 h-3 text-slate-400" />
      </div>

      {/* ─── COLONNA 2: CONFIGURATORE ─── */}
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
        modules={modules}
        toggleModule={toggleModule}
        style={{ width: `${col2Width}%` }}
      />

      {/* DIVISORE 2 TRASCINABILE */}
      <div onMouseDown={() => handleMouseDown("col2")} className="w-2 bg-slate-200 hover:bg-[#D4AF37] cursor-col-resize flex items-center justify-center hidden md:flex transition-colors">
        <MoveHorizontal className="w-3 h-3 text-slate-400" />
      </div>

      {/* ─── COLONNA 3: VERO INVITO LIVE PREVIEW ─── */}
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

      {/* MODALE WEB3FORMS */}
      {showWeb3FormsModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full border border-[#D4AF37] text-left shadow-2xl">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-[#1E293B]">Richiesta Brano Inedito — FF Edizioni</h3>
              <button type="button" onClick={() => setShowWeb3FormsModal(false)} className="text-slate-400 hover:text-black"><X className="w-5 h-5" /></button>
            </div>
            <form action="https://api.web3forms.com/submit" method="POST" className="space-y-3">
              <input type="hidden" name="access_key" value="9013a8d5-0901-42a0-b9e6-4c45553f960d" />
              <input type="hidden" name="subject" value="Richiesta Brano Inedito FF Edizioni - LOVE" />
              <input type="text" name="sposi" required placeholder="Nomi Sposi" className="w-full p-2.5 rounded-lg border border-slate-300 text-xs" />
              <input type="email" name="email" required placeholder="Email Agenzia" className="w-full p-2.5 rounded-lg border border-slate-300 text-xs" />
              <textarea name="note" required rows={3} placeholder="Dettagli sulla storia della coppia..." className="w-full p-2.5 rounded-lg border border-slate-300 text-xs resize-none" />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowWeb3FormsModal(false)} className="px-4 py-2 text-xs bg-slate-200 text-slate-700 rounded-lg">Annulla</button>
                <button type="submit" className="px-4 py-2 text-xs bg-[#D4AF37] text-slate-900 font-bold rounded-lg hover:bg-amber-400">Invia Richiesta 🚀</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
