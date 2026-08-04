"use client";

import React from "react";
import Link from "next/link";
import { Plus, ExternalLink, Download, Edit3 } from "lucide-react";

export default function ConfiguratorList(props: any) {
  const { setCoupleNames, setActiveTab } = props;

  const sampleCreatedInvitations = [
    {
      id: "1",
      couple: "Elena & Davide",
      date: "15 Settembre 2026",
      location: "Villa Rosa (Roma)",
      template: "Template A (Classico)",
      slug: "elena-e-davide",
      status: "Attivo",
      rsvpCount: 84,
    },
    {
      id: "2",
      couple: "Francesca & Luca",
      date: "28 Ottobre 2026",
      location: "Castello Sforzesco (Milano)",
      template: "Template B (Cielo 3D)",
      slug: "francesca-e-luca",
      status: "Attivo",
      rsvpCount: 112,
    },
    {
      id: "3",
      couple: "Marco & Sofia",
      date: "10 Maggio 2027",
      location: "Tenuta Borgo Antico (Firenze)",
      template: "Template A (Smeraldo)",
      slug: "marco-e-giulia",
      status: "Bozza",
      rsvpCount: 45,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#1E293B]">I Tuoi Inviti Creati</h2>
          <p className="text-xs text-slate-500">Gestisci i matrimoni attivi della tua agenzia (3 di 10 sbloccati)</p>
        </div>
        {setActiveTab && (
          <button
            type="button"
            onClick={() => setActiveTab("create")}
            className="px-4 py-2 bg-[#D4AF37] text-slate-900 text-xs font-bold rounded-xl hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Crea Nuovo Invito
          </button>
        )}
      </div>

      <div className="space-y-3">
        {sampleCreatedInvitations.map((item) => (
          <div key={item.id} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-serif font-bold text-base text-[#1E293B]">{item.couple}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  item.status === "Attivo" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {item.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">📅 {item.date} • 📍 {item.location}</p>
              <p className="text-[10px] text-slate-400 font-bold">🎨 {item.template} • ✉️ {item.rsvpCount} Conferme RSVP</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
              <Link href={`/${item.slug}`} target="_blank" className="p-2 bg-[#FAF7F2] text-[#1E293B] hover:text-[#B8860B] rounded-xl border border-slate-200 text-xs font-bold flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5" /> Live
              </Link>
              <button
                type="button"
                onClick={() => {
                  if (setCoupleNames) setCoupleNames(item.couple);
                  if (setActiveTab) setActiveTab("create");
                }}
                className="p-2 bg-[#FAF7F2] text-[#1E293B] hover:text-[#B8860B] rounded-xl border border-slate-200 text-xs font-bold flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" /> Modifica
              </button>
              <button
                type="button"
                onClick={() => alert(`Download File Excel Catering per ${item.couple} avviato!`)}
                className="p-2 bg-[#1E293B] text-white hover:bg-slate-800 rounded-xl text-xs font-bold flex items-center gap-1"
                title="Export Excel Catering"
              >
                <Download className="w-3.5 h-3.5 text-[#D4AF37]" /> Excel Catering
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
