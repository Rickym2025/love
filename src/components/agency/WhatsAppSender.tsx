"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare, Send, CheckCircle2, Plus, Trash2, Upload, Sparkles, RefreshCw, QrCode } from "lucide-react";
import { supabase } from "@/lib/supabase";

export interface GuestItem {
  id?: string;
  guest_name: string;
  phone_number: string;
  status: "da_inviare" | "inviato";
  sent_at?: string;
}

export interface WhatsAppSenderProps {
  slug?: string;
  coupleNames?: string;
}

const TEMPLATE_PRESETS = [
  {
    id: "formale",
    title: "1. Formale & Elegante",
    text: "Carissimo/a {nome}, con grande gioia {sposi} hanno il piacere di invitarti al loro matrimonio! ✨\n\nGuarda la partecipazione digitale con la location, il programma e la conferma di partecipazione qui:\n{link}",
  },
  {
    id: "amici",
    title: "2. Caldo & Informale (Amici)",
    text: "Ciao {nome}! 🎉 Ci sposiamo! 🥂\n\nEcco tutti i dettagli del nostro matrimonio, la mappa della villa e i giochi per la festa sul nostro sito ufficiale:\n{link}\n\nRicordati di confermare il menu e le intolleranze! ❤️",
  },
  {
    id: "sollecito",
    title: "3. Promemoria / Sollecito RSVP",
    text: "Ciao {nome}! ⌛ Manca pochissimo al nostro grande giorno!\n\nSe non l'hai ancora fatto, ricordati di confermare la tua presenza e la scelta del menu qui:\n{link}\n\nUn abbraccio da {sposi}! ❤️",
  },
];

export default function WhatsAppSender({
  slug = "elena-e-davide",
  coupleNames = "Elena & Davide",
}: WhatsAppSenderProps) {
  const [guests, setGuests] = useState<GuestItem[]>([
    { id: "1", guest_name: "Marco Rossi", phone_number: "+39 340 1234567", status: "da_inviare" },
    { id: "2", guest_name: "Laura Bianchi", phone_number: "+39 333 9876543", status: "inviato" },
  ]);

  const [selectedTemplateId, setSelectedTemplateId] = useState("formale");
  const [customText, setCustomText] = useState(TEMPLATE_PRESETS[0].text);
  const [newGuestName, setNewGuestName] = useState("");
  const [newGuestPhone, setNewGuestPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cleanSlug = (slug || "elena-e-davide").toLowerCase().replace(/[^a-z0-9]/g, "-");
  const invitationLink = `https://love.rmstudio.app/${cleanSlug}`;

  // CARICAMENTO INVITA DA SUPABASE
  useEffect(() => {
    async function loadGuests() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("love_guests")
        .select("*")
        .eq("experience_slug", cleanSlug)
        .order("created_at", { ascending: true });

      if (!error && data && data.length > 0) {
        setGuests(data as any);
      }
      setIsLoading(false);
    }
    loadGuests();
  }, [cleanSlug]);

  // AGGIUNTA SINGOLO INVITATO
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !newGuestPhone.trim()) return;

    const newGuest: GuestItem = {
      guest_name: newGuestName.trim(),
      phone_number: newGuestPhone.trim(),
      status: "da_inviare",
    };

    setGuests((prev) => [...prev, newGuest]);
    setNewGuestName("");
    setNewGuestPhone("");

    // Salva su Supabase
    await supabase.from("love_guests").insert([
      {
        experience_slug: cleanSlug,
        guest_name: newGuest.guest_name,
        phone_number: newGuest.phone_number,
        status: "da_inviare",
      },
    ]);
  };

  // ELIMINAZIONE INVITATO
  const handleDeleteGuest = async (id?: string, idx?: number) => {
    if (id) {
      await supabase.from("love_guests").delete().eq("id", id);
    }
    setGuests((prev) => prev.filter((_, i) => i !== idx));
  };

  // APERTURA WHATSAPP E SEGNA COME INVIATO
  const handleSendWhatsApp = async (guest: GuestItem, idx: number) => {
    // Pulizia numero di telefono (solo cifre e prefisso +)
    let cleanPhone = guest.phone_number.replace(/[^0-9]/g, "");
    if (!cleanPhone.startsWith("39") && cleanPhone.length === 10) {
      cleanPhone = "39" + cleanPhone;
    }

    // Sostituzione tag dinamici
    let messageText = customText
      .replace(/{nome}/g, guest.guest_name)
      .replace(/{sposi}/g, coupleNames)
      .replace(/{link}/g, invitationLink);

    // URL nativo WhatsApp Web / Mobile
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`;

    // Segna come inviato in locale
    const updated = [...guests];
    updated[idx] = { ...updated[idx], status: "inviato", sent_at: new Date().toISOString() };
    setGuests(updated);

    // Aggiorna stato su Supabase
    if (guest.id) {
      await supabase
        .from("love_guests")
        .update({ status: "inviato", sent_at: new Date().toISOString() })
        .eq("id", guest.id);
    }

    // Apri WhatsApp
    window.open(waUrl, "_blank");
  };

  // CARICAMENTO EXCEL CSV LISTA INVITATI
  const handleImportCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const text = evt.target?.result as string;
      if (text) {
        const lines = text.split("\n");
        const newGuests: GuestItem[] = [];

        lines.forEach((line) => {
          const parts = line.split(",");
          if (parts.length >= 2) {
            const name = parts[0].replace(/"/g, "").trim();
            const phone = parts[1].replace(/"/g, "").trim();
            if (name && phone && !name.toLowerCase().includes("nome")) {
              newGuests.push({
                guest_name: name,
                phone_number: phone,
                status: "da_inviare",
              });
            }
          }
        });

        if (newGuests.length > 0) {
          setGuests((prev) => [...prev, ...newGuests]);

          // Scrittura batch su Supabase
          const insertPayload = newGuests.map((g) => ({
            experience_slug: cleanSlug,
            guest_name: g.guest_name,
            phone_number: g.phone_number,
            status: "da_inviare",
          }));
          await supabase.from("love_guests").insert(insertPayload);

          alert(`Caricati ${newGuests.length} invitati dalla lista Excel/CSV!`);
        }
      }
    };
    reader.readAsText(file);
  };

  const pendingGuests = guests.filter((g) => g.status === "da_inviare");

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-left text-slate-800">
      {/* TESTATA SEZIONE WHATSAPP HUB */}
      <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl border-2 border-[#D4AF37] shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> WhatsApp Sender &amp; Invito 1-Tap
          </span>
          <h2 className="text-xl font-serif font-bold text-white">Spedizione Partecipazioni via WhatsApp</h2>
          <p className="text-xs text-slate-300 font-serif">
            Invia l&apos;invito personalizzato con il nome dell&apos;ospite direttamente su WhatsApp senza rischio di ban.
          </p>
        </div>

        <div className="flex gap-2">
          <label className="px-3.5 py-2 text-xs font-bold bg-[#D4AF37] text-slate-950 rounded-xl hover:bg-amber-400 transition-all flex items-center gap-1.5 shadow-md cursor-pointer">
            <Upload className="w-3.5 h-3.5" /> Carica Lista Excel (.csv)
            <input type="file" accept=".csv, .txt" onChange={handleImportCsv} className="hidden" />
          </label>

          <a
            href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(invitationLink)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-xs font-bold bg-slate-800 text-white border border-[#D4AF37]/50 rounded-xl hover:bg-slate-700 transition-all flex items-center gap-1.5 shadow-md"
          >
            <QrCode className="w-3.5 h-3.5 text-[#D4AF37]" /> Scarica QR Code
          </a>
        </div>
      </div>

      {/* SELEZIONE TEMPLATE MESSAGGIO WHATSAPP */}
      <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-md space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#8B6508] flex items-center gap-1.5">
          <MessageSquare className="w-4 h-4 text-[#D4AF37]" /> Scegli o Personalizza il Messaggio WhatsApp
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {TEMPLATE_PRESETS.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => {
                setSelectedTemplateId(tpl.id);
                setCustomText(tpl.text);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedTemplateId === tpl.id
                  ? "border-[#D4AF37] bg-[#FAF7F2] shadow-md ring-2 ring-[#D4AF37]"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <span className="text-xs font-bold block text-[#1E293B]">{tpl.title}</span>
            </button>
          ))}
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Testo del Messaggio (Usa i tag: <code className="text-[#8B6508] bg-amber-50 px-1 font-mono">{`{nome}`}</code>, <code className="text-[#8B6508] bg-amber-50 px-1 font-mono">{`{sposi}`}</code>, <code className="text-[#8B6508] bg-amber-50 px-1 font-mono">{`{link}`}</code>):
          </label>
          <textarea
            rows={4}
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full text-xs p-3 rounded-xl border border-slate-300 bg-white font-serif focus:border-[#D4AF37] outline-none"
          />
        </div>
      </div>

      {/* AGGIUNTA MANUALE INVITATO */}
      <form onSubmit={handleAddGuest} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-2 items-center">
        <input
          type="text"
          placeholder="Nome e Cognome Invitato..."
          value={newGuestName}
          onChange={(e) => setNewGuestName(e.target.value)}
          className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-bold"
        />
        <input
          type="text"
          placeholder="Cellulare (es. +39 340 1234567)..."
          value={newGuestPhone}
          onChange={(e) => setNewGuestPhone(e.target.value)}
          className="w-full md:w-56 text-xs p-2.5 rounded-xl border border-slate-300 bg-white font-mono"
        />
        <button
          type="submit"
          className="w-full md:w-auto px-4 py-2.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-1 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" /> Aggiungi Invitato
        </button>
      </form>

      {/* TABELLA GESTIONE INVITATI & PULSANTE SPERDIZIONE 1-TAP */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <div className="p-4 bg-slate-900 text-white flex justify-between items-center">
          <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
            Lista Invitati ({guests.length}) • Da Inviare: {pendingGuests.length}
          </span>
          {pendingGuests.length > 0 && (
            <button
              type="button"
              onClick={() => {
                const nextGuestIdx = guests.findIndex((g) => g.status === "da_inviare");
                if (nextGuestIdx !== -1) {
                  handleSendWhatsApp(guests[nextGuestIdx], nextGuestIdx);
                }
              }}
              className="px-3 py-1.5 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Send className="w-3.5 h-3.5" /> Invia al Prossimo Invitato ↗
            </button>
          )}
        </div>

        <div className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
          {guests.map((g, idx) => (
            <div key={g.id || idx} className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{g.guest_name}</span>
                  <span
                    className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                      g.status === "inviato"
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-amber-100 text-amber-800 border border-amber-300"
                    }`}
                  >
                    {g.status === "inviato" ? "✓ Inviato" : "⚪ Da Inviare"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-mono">{g.phone_number}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSendWhatsApp(g, idx)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    g.status === "inviato"
                      ? "bg-slate-100 text-slate-600 hover:bg-emerald-600 hover:text-white"
                      : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  {g.status === "inviato" ? "Reinvia WhatsApp" : "Invia WhatsApp ↗"}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteGuest(g.id, idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Elimina invitato"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {guests.length === 0 && (
            <div className="p-8 text-center text-slate-400 text-xs italic font-serif">
              Nessun invitato inserito nella lista. Aggiungine uno a mano o carica un file Excel/CSV.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
