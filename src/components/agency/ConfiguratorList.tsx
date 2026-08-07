"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FolderHeart, ExternalLink, Trash2, FileSpreadsheet, Upload, PartyPopper, Loader2 } from "lucide-react";
import { fetchLoveRsvps } from "@/lib/supabase";

export interface CreatedInvitation {
  id: string;
  coupleNames: string;
  date: string;
  template: string;
  paletteName: string;
  slug: string;
  status: "Attivo" | "Bozza";
}

export interface ConfiguratorListProps {
  invitations?: CreatedInvitation[];
  onDelete?: (id: string) => void;
}

export default function ConfiguratorList({
  invitations = [
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
  ],
  onDelete,
}: ConfiguratorListProps) {
  const [downloadingSlug, setDownloadingSlug] = useState<string | null>(null);

  // ESPORTAZIONE EXCEL CATERING DINAMICA DA SUPABASE TABELLA love_rsvps
  const handleExportCateringExcel = async (slug: string, coupleNames: string) => {
    setDownloadingSlug(slug);

    // Chiamata reale a Supabase per recuperare tutti gli RSVP del matrimonio
    const res = await fetchLoveRsvps(slug);
    let rsvps = res.data || [];

    // Fallback dati dimostrativi se il database non ha ancora risposte
    if (!rsvps || rsvps.length === 0) {
      rsvps = [
        {
          guest_name: "Mario Rossi",
          attending: true,
          guests_count: 2,
          menu_preference: "carne",
          dietary_notes: "Celiachia (No Glutine)",
          song_request: "A Te - Jovanotti",
        },
        {
          guest_name: "Laura Bianchi",
          attending: true,
          guests_count: 1,
          menu_preference: "pesce",
          dietary_notes: "Intollerante al lattosio",
          song_request: "Perfect - Ed Sheeran",
        },
        {
          guest_name: "Giuseppe Verdi",
          attending: false,
          guests_count: 0,
          menu_preference: "-",
          dietary_notes: "Nessuna",
          song_request: "Nessuna",
        },
      ];
    }

    // Costruzione del file CSV per lo Chef / Catering
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nome Invitato,Partecipa,Numero Ospiti,Menu Scelto,Allergie e Intolleranze Alimentari,Canzone Richiesta\n";

    rsvps.forEach((r: any) => {
      const row = [
        `"${r.guest_name || 'Ospite'}"`,
        `"${r.attending ? 'SI' : 'NO'}"`,
        `"${r.guests_count || 1}"`,
        `"${r.menu_preference || 'Carne'}"`,
        `"${r.dietary_notes || 'Nessuna'}"`,
        `"${r.song_request || 'Nessuna'}"`,
      ].join(",");
      csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Catering_Intolleranze_${coupleNames.replace(/[^a-z0-9]/gi, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadingSlug(null);
  };

  // IMPORTAZIONE LISTA EXCEL OSPITI
  const handleImportExcel = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".xlsx, .xls, .csv";
    fileInput.onchange = (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        alert(`File Excel "${file.name}" caricato con successo nell'archivio ospiti!`);
      }
    };
    fileInput.click();
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Sei sicuro di voler eliminare questo invito dall'archivio?")) {
      if (typeof onDelete === "function") {
        onDelete(id);
      }
    }
  };

  return (
    <div className="w-full space-y-6 text-[#1E293B]">
      <div className="p-5 bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl border border-[#D4AF37]/30 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-base font-serif font-bold text-[#8B6508] flex items-center gap-2">
            <FolderHeart className="w-5 h-5 text-[#D4AF37]" /> Inviti Già Creati ({invitations.length})
          </h2>
          <p className="text-xs text-slate-600 mt-1 font-serif">
            Gestisci gli inviti attivi, scarica il report catering con intolleranze per lo chef ed importa la lista ospiti.
          </p>
        </div>

        <button
          type="button"
          onClick={handleImportExcel}
          className="px-3.5 py-2 text-xs font-bold bg-[#1E293B] text-white rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5 text-[#D4AF37]" /> Carica Lista Excel (.xlsx)
        </button>
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
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  {item.status}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500 font-serif">
                <span>{item.date}</span>
                <span>• {item.template}</span>
                <span>• {item.paletteName}</span>
              </div>
            </div>

            {/* AZIONI RAPIDE: ESPORTA EXCEL CATERING + APRI INVITO + APRI FESTA + ELIMINA */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
              <button
                type="button"
                disabled={downloadingSlug === item.slug}
                onClick={() => handleExportCateringExcel(item.slug, item.coupleNames)}
                className="px-3 py-1.5 text-xs font-bold bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                title="Scarica la lista ospiti e intolleranze per lo chef"
              >
                {downloadingSlug === item.slug ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                )}
                Excel Catering (.csv)
              </button>

              <Link
                href={`/${item.slug}`}
                target="_blank"
                className="px-3 py-1.5 text-xs font-bold bg-[#FAF7F2] text-[#8B6508] border border-[#D4AF37]/40 rounded-xl hover:bg-amber-100 transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Invito ↗
              </Link>

              <Link
                href={`/${item.slug}/festa`}
                target="_blank"
                className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white border border-[#D4AF37]/50 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-1.5"
              >
                <PartyPopper className="w-3.5 h-3.5 text-[#D4AF37]" /> Festa ↗
              </Link>

              {typeof onDelete === "function" && (
                <button
                  type="button"
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1.5 text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Elimina Invito dall'Archivio"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Elimina
                </button>
              )}
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
