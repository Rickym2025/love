"use client";

import React, { useState } from "react";
import { Check, Send, Heart, Utensils } from "lucide-react";

// Interfaccia Props flessibile per accettare sia coupleNames che experienceSlug
export interface RsvpFormProps {
  coupleNames?: string;
  experienceSlug?: string;
  onSuccess?: () => void;
}

export default function RsvpForm({
  coupleNames = "gli Sposi",
  experienceSlug = "elena-e-davide",
  onSuccess,
}: RsvpFormProps) {
  const [guestName, setGuestName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState(1);
  const [menuPreference, setMenuPreference] = useState("carne");
  const [dietaryNotes, setDietaryNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Invio al Webhook n8n / Supabase
      await fetch("https://n8n.rmstudio.app/webhook/love-notifica-conferma", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestName,
          attending,
          guestCount,
          menuPreference,
          dietaryNotes,
          coupleNames,
          experienceSlug,
        }),
      });
    } catch (err) {
      console.log("Notifica webhook:", err);
    } finally {
      setIsLoading(false);
      setIsSubmitted(true);
      if (onSuccess) onSuccess();
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#D4AF37] text-center shadow-xl max-w-lg mx-auto">
        <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
          <Check className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#1E293B]">Grazie per la Conferma!</h3>
        <p className="text-xs text-slate-600 mt-2">
          La tua risposta è stata inviata a <span className="font-bold">{coupleNames}</span>. Non vediamo l'ora di festeggiare insieme!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-xl max-w-lg mx-auto text-left">
      <div className="text-center mb-6">
        <span className="text-[10px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
          ✦ CONFERMA PARTECIPAZIONE ✦
        </span>
        <h3 className="font-serif text-3xl font-bold text-[#1E293B]">Sarai dei Nostri?</h3>
        <p className="text-xs text-slate-500 mt-1">Si prega di confermare entro la data indicata nell'invito.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-1">Nome e Cognome Invitato/i</label>
          <input
            type="text"
            required
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            placeholder="es. Marco Rossi e Famiglia"
            className="w-full p-3 rounded-xl border border-slate-300 text-xs bg-[#FAF7F2] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-[#1E293B] mb-2">Partecipazione</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAttending("yes")}
              className={`p-3 rounded-xl text-xs font-bold border transition ${
                attending === "yes"
                  ? "bg-[#D4AF37] text-slate-900 border-[#D4AF37]"
                  : "bg-[#FAF7F2] text-slate-600 border-slate-200"
              }`}
            >
              Confermo con Gioia 🎉
            </button>
            <button
              type="button"
              onClick={() => setAttending("no")}
              className={`p-3 rounded-xl text-xs font-bold border transition ${
                attending === "no"
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-[#FAF7F2] text-slate-600 border-slate-200"
              }`}
            >
              Non Potrò Esserci 😔
            </button>
          </div>
        </div>

        {attending === "yes" && (
          <>
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-1">Numero Partecipanti</label>
              <input
                type="number"
                min={1}
                max={10}
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs bg-[#FAF7F2]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-1">Preferenza Menu</label>
              <select
                value={menuPreference}
                onChange={(e) => setMenuPreference(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs bg-[#FAF7F2]"
              >
                <option value="carne">Menu Tradizionale (Carne/Pesce)</option>
                <option value="vegetariano">Menu Vegetariano</option>
                <option value="vegano">Menu Vegano</option>
                <option value="bambini">Menu Bambini</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-1">Allergie o Intolleranze Alimentari</label>
              <textarea
                rows={2}
                value={dietaryNotes}
                onChange={(e) => setDietaryNotes(e.target.value)}
                placeholder="es. Celiachia, intolleranza al lattosio..."
                className="w-full p-3 rounded-xl border border-slate-300 text-xs bg-[#FAF7F2] resize-none"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 bg-[#D4AF37] text-slate-900 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-amber-400 transition shadow-md flex items-center justify-center gap-2"
        >
          {isLoading ? "Invio in corso..." : "Invia Conferma Partecipazione 🚀"}
        </button>
      </form>
    </div>
  );
}
