"use client";

import React from "react";
import { Palette, Gift, MessageSquare, ShoppingBag, Plus, Trash2 } from "lucide-react";
import { DRESS_CODE_PALETTES, RSVP_STYLES } from "../constants";

export function SectionDressCode({
  selectedPaletteIdx,
  dressCodeNotes,
  handleUpdate,
  toggleModule,
  modules,
}: any) {
  const palettesList = Array.isArray(DRESS_CODE_PALETTES)
    ? DRESS_CODE_PALETTES
    : Object.values(DRESS_CODE_PALETTES || {});

  return (
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
  );
}

export function SectionListaNozze({
  customIban,
  showAmazonAffiliate,
  customStores,
  addCustomStore,
  updateCustomStore,
  removeCustomStore,
  handleUpdate,
  toggleModule,
  modules,
}: any) {
  return (
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
          {(customStores || []).map((store: any) => (
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
  );
}

export function SectionRsvpFesta({
  rsvpStyle,
  handleUpdate,
  toggleModule,
  modules,
}: any) {
  return (
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
              ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
              : "bg-slate-100 text-slate-500 border-slate-200"
          }`}
        >
          {modules?.fregiStelle !== false ? "✓ Attivo" : "✕ Disattivo"}
        </button>
      </div>
    </div>
  );
}
