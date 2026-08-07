"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, Building2, Plus, RefreshCw, ExternalLink, Power, Users, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export interface AgencyMasterRecord {
  id: string;
  agency_id: string;
  agency_name: string;
  email: string;
  used_count: number;
  limit_count: number;
  status: string;
  created_at: string;
}

export default function MasterAdminPage() {
  const [agencies, setAgencies] = useState<AgencyMasterRecord[]>([
    {
      id: "1",
      agency_id: "sposi-in-love",
      agency_name: "SPOSI IN LOVE DEMO",
      email: "riccardo@rmstudio.app",
      used_count: 3,
      limit_count: 10,
      status: "attivo",
      created_at: new Date().toISOString(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadAgenciesFromSupabase = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("love_agencies")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data && data.length > 0) {
      setAgencies(data as any);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadAgenciesFromSupabase();
  }, []);

  // SBLOCCO +10 MATRIMONI DOPO IL PAGAMENTO STRIPE/BONIFICO
  const handleAddQuota = async (agency: AgencyMasterRecord) => {
    const newLimit = agency.limit_count + 10;
    const { error } = await supabase
      .from("love_agencies")
      .update({ limit_count: newLimit })
      .eq("id", agency.id);

    if (!error) {
      setAgencies((prev) =>
        prev.map((a) => (a.id === agency.id ? { ...a, limit_count: newLimit } : a))
      );
      alert(`Aggiunti +10 Matrimoni a "${agency.agency_name}". Nuovo limite: ${newLimit}`);
    }
  };

  // CAMBIO STATO OPERATIVO (ATTIVO / SOSPESO)
  const handleToggleStatus = async (agency: AgencyMasterRecord) => {
    const newStatus = agency.status === "attivo" ? "sospeso" : "attivo";
    const { error } = await supabase
      .from("love_agencies")
      .update({ status: newStatus })
      .eq("id", agency.id);

    if (!error) {
      setAgencies((prev) =>
        prev.map((a) => (a.id === agency.id ? { ...a, status: newStatus } : a))
      );
    }
  };

  const filteredAgencies = agencies.filter(
    (a) =>
      a.agency_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.agency_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white p-6 md:p-10 font-sans select-none space-y-8">
      {/* HEADER PANNELLO MASTER ADMIN */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" /> Master Control Center • Riccardo Modena
          </span>
          <h1 className="text-3xl font-serif font-bold text-white mt-1">LOVE — Monitoraggio Agenzie B2B</h1>
          <p className="text-xs text-slate-400 font-serif">
            Gestisci i crediti matrimoni delle agenzie, abilita le licenze e accedi ai loro pannelli per assistenza.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={loadAgenciesFromSupabase}
            className="px-4 py-2.5 bg-slate-800 text-[#D4AF37] border border-[#D4AF37]/40 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-slate-700 cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} /> Aggiorna Dati DB
          </button>

          <Link
            href="/"
            className="px-4 py-2.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-md"
          >
            Torna alla Landing ↗
          </Link>
        </div>
      </div>

      {/* RIEPILOGO METRICHE AMMINISTRATIVE */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Totale Agenzie B2B</span>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#D4AF37]" /> {agencies.length}
          </h3>
        </div>

        <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Matrimoni Totali Sbloccati</span>
          <h3 className="text-2xl font-bold text-amber-400 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />{" "}
            {agencies.reduce((acc, a) => acc + (a.limit_count || 10), 0)}
          </h3>
        </div>

        <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400">Matrimoni Attualmente Creati</span>
          <h3 className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <Users className="w-6 h-6 text-emerald-400" />{" "}
            {agencies.reduce((acc, a) => acc + (a.used_count || 0), 0)}
          </h3>
        </div>
      </div>

      {/* TABELLA MONITORAGGIO AGENZIE */}
      <div className="max-w-6xl mx-auto bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-slate-800 flex justify-between items-center">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            Elenco Registro Agenzie White-Label
          </span>
          <input
            type="text"
            placeholder="Cerca agenzia per nome o ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-xs p-2 px-3 bg-slate-950 border border-slate-700 rounded-xl text-white w-64 focus:border-[#D4AF37] outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[#D4AF37] uppercase font-mono text-[10px]">
              <tr>
                <th className="p-4">Agenzia</th>
                <th className="p-4">ID Unico Slug</th>
                <th className="p-4">Matrimoni Utilizzati</th>
                <th className="p-4">Stato Piano</th>
                <th className="p-4 text-right">Azioni Master Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredAgencies.map((agency) => (
                <tr key={agency.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4 font-bold text-white">
                    {agency.agency_name}
                    <span className="block text-[10px] text-slate-400 font-normal">{agency.email}</span>
                  </td>

                  <td className="p-4 font-mono text-amber-300">{agency.agency_id}</td>

                  <td className="p-4">
                    <span className="font-bold text-white">
                      {agency.used_count || 0} / {agency.limit_count || 10}
                    </span>
                    <div className="w-24 bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1 border border-slate-700">
                      <div
                        className="bg-[#D4AF37] h-full transition-all"
                        style={{
                          width: `${Math.min(100, ((agency.used_count || 0) / (agency.limit_count || 10)) * 100)}%`,
                        }}
                      />
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        agency.status === "attivo"
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                          : "bg-rose-950 text-rose-400 border border-rose-800"
                      }`}
                    >
                      {agency.status === "attivo" ? "✓ Attivo" : "✕ Sospeso"}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* PULSANTE SBLOCCO +10 MATRIMONI POST-PAGAMENTO */}
                      <button
                        type="button"
                        onClick={() => handleAddQuota(agency)}
                        className="px-3 py-1.5 bg-[#D4AF37] text-slate-950 font-bold text-[10px] rounded-lg hover:bg-amber-400 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Aggiungi +10 Matrimoni dopo il pagamento"
                      >
                        <Plus className="w-3.5 h-3.5" /> +10 Matrimoni
                      </button>

                      {/* ENTRA NEL PANNELLO AGENZIA */}
                      <Link
                        href={`/agency/${agency.agency_id}`}
                        target="_blank"
                        className="px-3 py-1.5 bg-slate-800 text-white font-bold text-[10px] rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1 border border-slate-700"
                        title="Accedi al configuratore dell'agenzia per assistenza"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" /> Apri Studio ↗
                      </Link>

                      {/* TOGGLE ATTIVO / SOSPESO */}
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(agency)}
                        className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                          agency.status === "attivo"
                            ? "text-rose-400 border-rose-900 hover:bg-rose-950"
                            : "text-emerald-400 border-emerald-900 hover:bg-emerald-950"
                        }`}
                        title={agency.status === "attivo" ? "Sospendi Agenzia" : "Riapri Agenzia"}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
