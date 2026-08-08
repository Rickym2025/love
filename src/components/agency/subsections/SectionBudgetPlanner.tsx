"use client";

import React, { useState, useEffect } from "react";
import { Gift, Plus, CheckCircle2, Trash2, DollarSign } from "lucide-react";
import { fetchLoveBudgets, addLoveBudgetItem } from "@/lib/supabase";

export interface SectionBudgetPlannerProps {
  coupleNames?: string;
  slug?: string;
}

export function SectionBudgetPlanner({
  coupleNames = "Elena & Davide",
  slug = "elena-e-davide",
}: SectionBudgetPlannerProps) {
  const [items, setItems] = useState<any[]>([]);
  const [category, setCategory] = useState("location");
  const [supplierName, setSupplierName] = useState("");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [actualCost, setActualCost] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cleanSlug = (slug || coupleNames || "elena-e-davide").toLowerCase().replace(/[^a-z0-9]/g, "-");

  const loadBudgetData = async () => {
    setIsLoading(true);
    const res = await fetchLoveBudgets(cleanSlug);
    if (res.success && res.data) {
      setItems(res.data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadBudgetData();
  }, [cleanSlug]);

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supplierName.trim()) return;

    const newItem = {
      experience_slug: cleanSlug,
      category,
      supplier_name: supplierName.trim(),
      estimated_cost: Number(estimatedCost) || 0,
      actual_cost: Number(actualCost) || Number(estimatedCost) || 0,
      is_paid: isPaid,
    };

    const res = await addLoveBudgetItem(newItem);
    if (res.success) {
      setSupplierName("");
      setEstimatedCost("");
      setActualCost("");
      loadBudgetData();
    }
  };

  const totalEstimated = items.reduce((acc, i) => acc + (Number(i.estimated_cost) || 0), 0);
  const totalActual = items.reduce((acc, i) => acc + (Number(i.actual_cost) || 0), 0);

  return (
    <div className="p-6 bg-white rounded-3xl border-2 border-[#D4AF37]/50 shadow-xl space-y-6 text-left text-slate-800">
      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#8B6508] flex items-center gap-1.5 mb-0.5">
            <Gift className="w-4 h-4 text-[#D4AF37]" /> Controllo Spese &amp; Budget Planner
          </span>
          <h3 className="text-lg font-serif font-bold text-slate-900">
            Preventivo Matrimonio {coupleNames}
          </h3>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-400 uppercase block">Totale Spesa:</span>
          <span className="text-base font-serif font-bold text-[#8B6508]">€ {totalActual.toLocaleString()}</span>
        </div>
      </div>

      {/* FORM AGGIUNTA VOCE DI SPESA */}
      <form onSubmit={handleAddItem} className="p-4 bg-[#FAF7F2] rounded-2xl border border-slate-200 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Categoria</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-bold cursor-pointer"
            >
              <option value="location">📍 Location &amp; Villa</option>
              <option value="catering">🥩 Catering &amp; Banqueting</option>
              <option value="fotografo">📸 Fotografo &amp; Video</option>
              <option value="fiori">🌹 Allestimenti Floreali</option>
              <option value="musica">🎵 Musica &amp; DJ Set</option>
              <option value="abito">👗 Abito da Sposa / Sposo</option>
              <option value="altro">✨ Altro Fornitore</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Fornitore / Descrizione *</label>
            <input
              type="text"
              required
              placeholder="Es. Villa Borromeo"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Costo Effettivo (€)</label>
            <input
              type="number"
              placeholder="Es. 3500"
              value={actualCost}
              onChange={(e) => setActualCost(e.target.value)}
              className="w-full text-xs p-2 rounded-xl border border-slate-300 bg-white font-bold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-md flex items-center justify-center gap-1 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Aggiungi Spesa Fornitore
        </button>
      </form>

      {/* TABELLA VOCE SPESE */}
      <div className="divide-y divide-slate-100 max-h-[350px] overflow-y-auto">
        {items.map((item) => (
          <div key={item.id} className="py-3 flex justify-between items-center text-xs">
            <div>
              <span className="font-bold text-slate-900 block">{item.supplier_name}</span>
              <span className="text-[10px] text-slate-500 uppercase">{item.category}</span>
            </div>
            <span className="font-bold font-mono text-sm text-[#8B6508]">€ {Number(item.actual_cost || 0).toLocaleString()}</span>
          </div>
        ))}

        {items.length === 0 && (
          <p className="text-xs text-slate-400 italic font-serif text-center py-4">
            Nessun fornitore ancora registrato nel budget planner.
          </p>
        )}
      </div>
    </div>
  );
}
