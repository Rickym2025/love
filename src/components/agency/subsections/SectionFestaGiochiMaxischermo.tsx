"use client";

import React from "react";
import { PartyPopper, Upload, Gift, HelpCircle, Plus, Trash2, CheckCircle2 } from "lucide-react";

export const QUIZ_PRESET_QUESTIONS = [
  {
    question: "Dove ci siamo conosciuti per la prima volta?",
    optionA: "In università",
    optionB: "In discoteca",
    optionC: "Al mare in vacanza",
    optionD: "Tramite amici comuni",
    correctOptionIdx: 0,
  },
  {
    question: "Chi ha fatto la proposta di nozze?",
    optionA: "Elena",
    optionB: "Davide",
    optionC: "Insieme a Parigi",
    optionD: "I genitori",
    correctOptionIdx: 1,
  },
  {
    question: "Qual è il nostro piatto preferito da mangiare insieme?",
    optionA: "Pizza Margherita",
    optionB: "Sushi & Sashimi",
    optionC: "Pasta alla Carbonara",
    optionD: "Grigliata di Carne",
    correctOptionIdx: 1,
  },
  {
    question: "Dove andremo in viaggio di nozze?",
    optionA: "Giappone e Polinesia",
    optionB: "Stati Uniti & Caraibi",
    optionC: "Safari in Africa",
    optionD: "Tour delle capitali europee",
    correctOptionIdx: 0,
  },
];

export function SectionFestaGiochiMaxischermo({
  quizQuestions = [],
  galleryStyle = "polaroid",
  puzzleImage = "",
  scratchPhotoUrl = "",
  puzzlePrize = "💃 Hai vinto un ballo speciale con la Sposa!",
  scratchPrize = "🥂 Hai vinto un drink offerto dallo Sposo!",
  quizPrize = "📸 Hai vinto un selfie di gruppo con gli Sposi!",
  handleUpdate,
  toggleModule,
  modules,
}: any) {
  const addQuizQuestion = (presetObj?: any) => {
    const currentQ = Array.isArray(quizQuestions) ? quizQuestions : [];
    const newQ = presetObj
      ? { ...presetObj, id: Date.now().toString() }
      : {
          id: Date.now().toString(),
          question: "Nuova Domanda del Quiz...",
          optionA: "Opzione A",
          optionB: "Opzione B",
          optionC: "Opzione C",
          optionD: "Opzione D",
          correctOptionIdx: 0,
        };
    handleUpdate("quizQuestions", [...currentQ, newQ]);
  };

  const removeQuizQuestion = (idx: number) => {
    const currentQ = Array.isArray(quizQuestions) ? quizQuestions : [];
    const updated = currentQ.filter((_: any, i: number) => i !== idx);
    handleUpdate("quizQuestions", updated);
  };

  const updateQuizQuestionField = (idx: number, field: string, val: any) => {
    const currentQ = Array.isArray(quizQuestions) ? quizQuestions : [];
    const updated = currentQ.map((q: any, i: number) => (i === idx ? { ...q, [field]: val } : q));
    handleUpdate("quizQuestions", updated);
  };

  const handlePuzzleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleUpdate("puzzleImage", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScratchFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleUpdate("scratchPhotoUrl", event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-5 text-left">
      <div className="flex justify-between items-center border-b border-slate-700/80 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
          <PartyPopper className="w-5 h-5 text-[#D4AF37]" /> Festa, Giochi &amp; Maxischermo (Sezione Separata)
        </h3>
        <button
          type="button"
          onClick={() => toggleModule("hubGiochiFesta")}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
            modules?.hubGiochiFesta !== false
              ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-md"
              : "bg-slate-800 text-slate-400 border-slate-700"
          }`}
        >
          {modules?.hubGiochiFesta !== false ? "✓ Festa Attiva" : "✕ Disattiva"}
        </button>
      </div>

      {/* SELETTORE DELLE 3 TIPOLOGIE DI GALLERIA FOTOGRAFICA FESTA */}
      <div className="space-y-2">
        <label className="block text-[11px] font-bold text-[#D4AF37]">Tipologia Galleria Fotografica Festa (Scegli tra 3 Stili)</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleUpdate("galleryStyle", "polaroid")}
            className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
              galleryStyle === "polaroid" || !galleryStyle
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-md"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            📸 Photo Wall Polaroid
          </button>

          <button
            type="button"
            onClick={() => handleUpdate("galleryStyle", "circular")}
            className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
              galleryStyle === "circular"
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-md"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            🎡 Galleria 3D Circolare
          </button>

          <button
            type="button"
            onClick={() => handleUpdate("galleryStyle", "fan")}
            className={`p-2.5 rounded-xl border text-xs font-bold text-center cursor-pointer transition-all ${
              galleryStyle === "fan"
                ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37] shadow-md"
                : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
            }`}
          >
            🎴 Carte a Ventaglio GSAP
          </button>
        </div>
      </div>

      {/* CAMPI FOTO GIOCHI PUZZLE & GRATTA LA FOTO */}
      <div className="pt-3 border-t border-slate-700/80 space-y-3">
        <span className="text-xs font-bold text-[#D4AF37] block">📷 Immagini Personalizzate dei Giochi:</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="block text-[10px] text-slate-300 font-bold">Foto per il Puzzle 3x3</label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/photo-..."
              value={puzzleImage || ""}
              onChange={(e) => handleUpdate("puzzleImage", e.target.value)}
              className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
            />
            <label className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-[#D4AF37] bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-700">
              <Upload className="w-3 h-3" /> Carica dal tuo Dispositivo
              <input type="file" accept="image/*" onChange={handlePuzzleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="space-y-1">
            <label className="block text-[10px] text-slate-300 font-bold">Foto per il Gratta e Scopri</label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/photo-..."
              value={scratchPhotoUrl || ""}
              onChange={(e) => handleUpdate("scratchPhotoUrl", e.target.value)}
              className="w-full text-xs p-2 bg-slate-800 border border-slate-700 rounded-lg text-white font-mono"
            />
            <label className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-[#D4AF37] bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 cursor-pointer hover:bg-slate-700">
              <Upload className="w-3 h-3" /> Carica dal tuo Dispositivo
              <input type="file" accept="image/*" onChange={handleScratchFileUpload} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      {/* SEZIONE PREMI DI VITTORIA DEI GIOCHI */}
      <div className="pt-3 border-t border-slate-700/80 space-y-3">
        <span className="text-xs font-bold text-[#D4AF37] block flex items-center gap-1.5">
          <Gift className="w-4 h-4 text-[#D4AF37]" /> Premi di Vittoria (Messaggi Pop-up per gli Invitati)
        </span>

        <div className="space-y-3">
          <div>
            <label className="block text-[10px] text-slate-300 font-bold mb-1">Premio Vittoria Puzzle 3x3</label>
            <input
              type="text"
              value={puzzlePrize}
              onChange={(e) => handleUpdate("puzzlePrize", e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-amber-300 font-bold"
              placeholder="Es. 💃 Hai vinto un ballo speciale con la Sposa!"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-300 font-bold mb-1">Premio Vittoria Gratta e Scopri</label>
            <input
              type="text"
              value={scratchPrize}
              onChange={(e) => handleUpdate("scratchPrize", e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-amber-300 font-bold"
              placeholder="Es. 🥂 Hai vinto un drink offerto dallo Sposo!"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-300 font-bold mb-1">Premio Vittoria Quiz Sposi</label>
            <input
              type="text"
              value={quizPrize}
              onChange={(e) => handleUpdate("quizPrize", e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-amber-300 font-bold"
              placeholder="Es. 📸 Hai vinto un selfie di gruppo con gli Sposi!"
            />
          </div>
        </div>
      </div>

      {/* EDITOR QUIZ SPOSI CON 4 RISPOSTE */}
      <div className="pt-3 border-t border-slate-700/80 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#D4AF37]" /> Quiz della Coppia (Domande &amp; 4 Risposte)
          </span>
          <button
            type="button"
            onClick={() => addQuizQuestion()}
            className="px-2.5 py-1 text-[10px] font-bold bg-[#D4AF37] text-slate-900 rounded-lg flex items-center gap-1 hover:bg-amber-400 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Nuova Domanda
          </button>
        </div>

        <div className="space-y-4">
          {(quizQuestions || []).map((q: any, idx: number) => {
            const correctIdx = q.correctOptionIdx ?? 0;
            return (
              <div key={q.id || idx} className="p-3.5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-2.5">
                <div className="flex gap-2 items-center">
                  <span className="text-xs font-bold text-[#D4AF37]">{idx + 1}.</span>
                  <input
                    type="text"
                    value={q.question || ""}
                    onChange={(e) => updateQuizQuestionField(idx, "question", e.target.value)}
                    className="flex-1 text-xs p-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-bold"
                    placeholder="Scrivi la domanda..."
                  />
                  <button
                    type="button"
                    onClick={() => removeQuizQuestion(idx)}
                    className="p-1.5 text-rose-400 hover:bg-rose-950 rounded-lg cursor-pointer"
                    title="Elimina domanda"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Opzione A</label>
                    <input
                      type="text"
                      value={q.optionA || q.answer || ""}
                      onChange={(e) => updateQuizQuestionField(idx, "optionA", e.target.value)}
                      className="w-full text-xs p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-medium"
                      placeholder="Risposta A..."
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Opzione B</label>
                    <input
                      type="text"
                      value={q.optionB || ""}
                      onChange={(e) => updateQuizQuestionField(idx, "optionB", e.target.value)}
                      className="w-full text-xs p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-medium"
                      placeholder="Risposta B..."
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Opzione C</label>
                    <input
                      type="text"
                      value={q.optionC || ""}
                      onChange={(e) => updateQuizQuestionField(idx, "optionC", e.target.value)}
                      className="w-full text-xs p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-medium"
                      placeholder="Risposta C..."
                    />
                  </div>

                  <div>
                    <label className="block text-[9px] font-bold text-slate-400 mb-0.5">Opzione D</label>
                    <input
                      type="text"
                      value={q.optionD || ""}
                      onChange={(e) => updateQuizQuestionField(idx, "optionD", e.target.value)}
                      className="w-full text-xs p-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white font-medium"
                      placeholder="Risposta D..."
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 bg-slate-900/60 p-2 rounded-xl border border-slate-700/60">
                  <span className="text-[10px] font-bold text-[#D4AF37] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Risposta corretta:
                  </span>
                  <select
                    value={correctIdx}
                    onChange={(e) => updateQuizQuestionField(idx, "correctOptionIdx", Number(e.target.value))}
                    className="text-xs p-1 bg-slate-800 border border-slate-600 text-emerald-400 font-bold rounded-lg cursor-pointer"
                  >
                    <option value={0}>Opzione A</option>
                    <option value={1}>Opzione B</option>
                    <option value={2}>Opzione C</option>
                    <option value={3}>Opzione D</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
