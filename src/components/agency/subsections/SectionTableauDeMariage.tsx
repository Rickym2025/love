"use client";

import React, { useState, useEffect } from "react";
import { Users, Plus, Utensils, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { fetchLoveRsvps, fetchLoveTables, addLoveTable, updateGuestTable } from "@/lib/supabase";

export interface SectionTableauDeMariageProps {
  coupleNames?: string;
  slug?: string;
}

export function SectionTableauDeMariage({
  coupleNames = "Elena & Davide",
  slug = "elena-e-davide",
}: SectionTableauDeMariageProps) {
  const [guests, setGuests] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);
  const [newTableName, setNewTableName] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const cleanSlug = (slug || coupleNames || "elena-e-davide").toLowerCase().replace(/[^a-z0-9]/g, "-");

  const loadTableauData = async () => {
    setIsLoading(true);
    const [resRsvps, resTables] = await Promise.all([
      fetchLoveRsvps(cleanSlug),
      fetchLoveTables(cleanSlug),
    ]);

    if (resRsvps.success && resRsvps.data) {
      // Filtra solo gli invitati che hanno confermato la presenza
      setGuests(resRsvps.data.filter((g: any) => g.attending !== false));
    }
    if (resTables.success && resTables.data) {
      setTables(resTables.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadTableauData();
  }, [cleanSlug]);

  // CREAZIONE NUOVO TAVOLO
  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim()) return;

    const res = await addLoveTable(cleanSlug, newTableName.trim(), newTableCapacity);
    if (res.success) {
      setNewTableName("");
      loadTableauData();
    }
  };

  // ASSEGNAZIONE INVITATO A TAVOLO
  const handleAssignTable = async (rsvpId: string, tableName: string) => {
    await updateGuestTable(rsvpId, tableName);
    setGuests((prev) =>
      prev.map((g) => (g.id === rsvpId ? { ...g, table_name: tableName } : g))
    );
  };

  return (
    <div className="p-6 bg-[#FAF7F2] rounded-3xl border-2 border-[#D4AF37]/50 shadow-xl space-y-6 text-left text-slate-800">
      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B6508] flex items-center gap-1.5 mb-0.5">
            <Users className="w-4 h-4 text-[#D4AF37]" /> Gestore Disposizione Tavoli
          </span>
          <h3 className="text-lg font-serif font-bold text-slate-900">
            Tableau de Mariage per {coupleNames}
          </h3>
        </div>

        <button
          type="button"
          onClick={loadTableauData}
          className="p-2 bg-white text-[#8B6508] border border-[#D4AF37]/50 rounded-xl text-xs font-bold flex items-center gap-1 hover:bg-amber-50 cursor-pointer shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} /> Aggiorna
        </button>
      </div>

      {/* CREAZIONE NUOVO TAVOLO */}
      <form onSubmit={handleAddTable} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-2 items-center">
        <input
          type="text"
          placeholder="Nome Tavolo (es. Tavolo Sposi / Tavolo Parigi)..."
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
          className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-bold"
        />
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600">Posti:</span>
          <input
            type="number"
            min={2}
            max={20}
            value={newTableCapacity}
            onChange={(e) => setNewTableCapacity(Number(e.target.value))}
            className="w-16 text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-bold text-center"
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Crea Tavolo
        </button>
      </form>

      {/* VISUALIZZAZIONE TAVOLI & INVITATI ASSEGNATI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tables.map((tbl) => {
          const seatedGuests = guests.filter((g) => g.table_name === tbl.table_name);
          return (
            <div key={tbl.id} className="p-4 bg-white rounded-2xl border-2 border-[#D4AF37]/40 shadow-sm space-y-3">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <h4 className="font-serif font-bold text-sm text-[#8B6508]">{tbl.table_name}</h4>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {seatedGuests.length} / {tbl.seats_capacity} Posti Occupati
                </span>
              </div>

              <div className="space-y-1.5 min-h-[60px]">
                {seatedGuests.map((g) => (
                  <div key={g.id} className="p-2 bg-[#FAF7F2] rounded-xl border border-slate-200 text-xs flex justify-between items-center">
                    <span className="font-bold text-slate-900">{g.guest_name}</span>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="font-bold text-[#8B6508] uppercase">{g.menu_preference}</span>
                      {g.dietary_notes && (
                        <span className="text-rose-600 font-bold flex items-center gap-0.5" title={g.dietary_notes}>
                          <AlertCircle className="w-3 h-3" /> {g.dietary_notes}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {seatedGuests.length === 0 && (
                  <p className="text-[11px] text-slate-400 italic font-serif text-center pt-2">
                    Nessun invitato ancora assegnato a questo tavolo.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* LISTA INVITATI DA ASSEGNARE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-sm">
        <h4 className="font-serif font-bold text-xs uppercase text-[#8B6508]">
          Assegna Invitati ai Tavoli ({guests.length} Confermati)
        </h4>

        <div className="divide-y divide-slate-100 max-h-[300px] overflow-y-auto">
          {guests.map((g) => (
            <div key={g.id} className="py-2.5 flex items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-slate-900 block">{g.guest_name}</span>
                <span className="text-[10px] text-slate-500">
                  Menu: {g.menu_preference} {g.dietary_notes ? `• ${
