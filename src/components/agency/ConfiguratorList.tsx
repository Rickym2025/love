"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FolderHeart, ExternalLink, Trash2, Edit3, FileSpreadsheet, Calendar, Sparkles } from "lucide-react";

export interface CreatedInvitation {
  id: string;
  coupleNames: string;
  date: string;
  template: string;
  paletteName: string;
  slug: string;
  status: "Attivo" | "Bozza";
}

export default function ConfiguratorList() {
  const [invitations, setInvitations] = useState<CreatedInvitation[]>([
    {
      id: "1",
      coupleNames: "Elena & Davide",
      date: "15 Settembre 2026",
      template: "Modello A",
      paletteName: "Oro Bruciato & Champagne",
      slug: "elena-e-davide",
      status: "Attivo",
    },
    {
      id: "2",
      coupleNames: "Francesca & Luca",
      date: "20 Giugno 2026",
      template: "Modello B",
      paletteName: "Rosa Cipria & Seta",
      slug: "francesca-e-luca",
      status: "Attivo",
    },
    {
      id: "3",
      coupleNames: "Giulia & Marco",
      date: "10 Ottobre 2026",
      template: "Modello A",
      paletteName: "Lavanda & Lillà",
      slug: "giulia-e-marco",
      status: "Bozza",
    },
  ]);

  // FUNZIONE DI ELIMINAZIONE INVITO
  const handleDeleteInvitation = (id: string, coupleNames: string) => {
    if (window.confirm(`Sei sicuro di voler eliminare definitivamente l'invito per ${coupleNames}?`)) {
      setInvitations((prev) => prev.filter((item) => item.id !== id));
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(`love_invitation_${coupleNames.toLowerCase().replace(/[^a-z0-9]/g, "-")}`);
        } catch {}
      }
    }
  };

  return (
    <div className="w-full space-y-6 text-[#1E293B]">
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-base font-serif font-bold text-[#8B6508] flex items-center gap-2">
            <FolderHeart className="w-5 h-5 text-[#D4AF37]" /> Inviti Già Creati ({invitations.length})
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-serif">
            Gestisci, modifica ed esporta la lista catering dei matrimoni della tua agenzia.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {invitations.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md hover:border-[#D4AF37] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-serif font-bold text-[#1E293B]">{item.coupleNames}</span>
                <span
                  className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                    item.status === "Attivo"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-serif">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" /> {item.date}
                </span>
                <span>• {item.template}</span>
                <span>• {item.paletteName}</span>
              </div>
            </div>

            {/* AZIONI E PULSANTE ELIMINA */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <Link
                href={`/${item.slug}`}
                target="_blank"
                className="px-3 py-1.5 text-xs font-bold bg-[#FAF7F2] text-[#8B6508] border border-[#D4AF37]/40 rounded-xl hover:bg-amber-100 transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Apri Invito ↗
              </Link>

              <button
                type="button"
                onClick={() => handleDeleteInvitation(item.id, item.coupleNames)}
                className="px-3 py-1.5 text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Elimina Invito"
              >
                <Trash2 className="w-3.5 h-3.5" /> Elimina
              </button>
            </div>
          </div>
        ))}

        {invitations.length === 0 && (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 font-serif text-sm">
            Nessun invito salvato nell&apos;archivio agenzia.
          </div>
        )}
      </div>
    </div>
  );
}
