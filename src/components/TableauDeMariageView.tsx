"use client";

import React, { useState, useEffect } from "react";
import { Users, Utensils, AlertCircle } from "lucide-react";
import { fetchLoveRsvps, fetchLoveTables } from "@/lib/supabase";

export interface TableauDeMariageViewProps {
  slug?: string;
  coupleNames?: string;
}

export default function TableauDeMariageView({
  slug = "elena-e-davide",
  coupleNames = "Elena & Davide",
}: TableauDeMariageViewProps) {
  const [tables, setTables] = useState<any[]>([]);
  const [guests, setGuests] = useState<any[]>([]);

  useEffect(() => {
    async function loadTableau() {
      const [resTables, resRsvps] = await Promise.all([
        fetchLoveTables(slug),
        fetchLoveRsvps(slug),
      ]);

      if (resTables.success && resTables.data) setTables(resTables.data);
      if (resRsvps.success && resRsvps.data) setGuests(resRsvps.data.filter((g: any) => g.attending !== false));
    }
    loadTableau();
  }, [slug]);

  if (tables.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-slate-900 text-white rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-6 text-center">
      <div className="space-y-1 border-b border-slate-800 pb-3">
        <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest block flex items-center justify-center gap-1.5">
          <Users className="w-4 h-4 text-[#D4AF37]" /> Tableau de Mariage Ufficiale
        </span>
        <h3 className="text-xl font-serif font-bold text-white">Disposizione Tavoli Ricevimento</h3>
        <p className="text-xs text-slate-300 font-serif italic">Trova il tuo tavolo e accomodati con gli sposi!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        {tables.map((tbl) => {
          const seated = guests.filter((g) => g.table_name === tbl.table_name);
          return (
            <div key={tbl.id} className="p-4 bg-slate-950 rounded-2xl border border-[#D4AF37]/60 space-y-2">
              <h4 className="font-serif font-bold text-sm text-[#D4AF37] border-b border-slate-800 pb-1">
                {tbl.table_name}
              </h4>
              <ul className="space-y-1">
                {seated.map((g) => (
                  <li key={g.id} className="text-xs text-slate-200 flex justify-between items-center">
                    <span>{g.guest_name}</span>
                    {g.dietary_notes && (
                      <span className="text-[10px] text-rose-400 font-bold flex items-center gap-0.5">
                        <AlertCircle className="w-3 h-3" /> {g.dietary_notes}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
