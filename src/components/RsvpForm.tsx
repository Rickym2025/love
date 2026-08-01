'use client';

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { CheckCircle2, Send, Utensils, Users, Music } from 'lucide-react';

export default function RsvpForm({ experienceSlug }: { experienceSlug: string }) {
  const [guestName, setGuestName] = useState('');
  const [attending, setAttending] = useState(true);
  const [guestsCount, setGuestsCount] = useState(1);
  const [menuPreference, setMenuPreference] = useState('carne');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setLoading(true);

    const { error } = await supabase.from('love_rsvps').insert([
      {
        experience_slug: experienceSlug,
        guest_name: guestName,
        attending: attending,
        guests_count: guestsCount,
        menu_preference: menuPreference,
        dietary_notes: dietaryNotes,
        song_request: songRequest,
      },
    ]);

    setLoading(false);

    if (!error) {
      setSubmitted(true);
    } else {
      alert("Si è verificato un errore durante l'invio. Riprova!");
    }
  };

  if (submitted) {
    return (
      <div className="paper-card border border-[#D4AF37]/50 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-md">
        <CheckCircle2 className="w-12 h-12 text-[#8B1E24] mx-auto mb-3" />
        <h3 className="font-serif text-2xl text-[#4A3D39] mb-2">
          Conferma Ricevuta!
        </h3>
        <p className="text-xs text-[#9E8976] italic">
          Grazie {guestName}, la tua risposta è stata registrata con successo. Non vediamo l'ora di festeggiare insieme!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="paper-card border border-[#E5DACB] rounded-2xl p-6 sm:p-8 max-w-lg mx-auto text-left shadow-md"
    >
      <h3 className="font-serif text-2xl text-[#4A3D39] mb-1 text-center">
        Conferma la tua Partecipazione
      </h3>
      <p className="text-[10px] text-[#9E8976] text-center mb-6 uppercase tracking-wider">
        Rispondi per aiutarci con la cucina
      </p>

      <div className="mb-4">
        <label className="block text-xs font-semibold text-[#4A3D39] uppercase tracking-wider mb-2">
          Il tuo Nome e Cognome *
        </label>
        <input
          type="text"
          required
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Es. Mario Rossi"
          className="w-full bg-[#FAF7F2] border border-[#D8CBB7] rounded-xl px-4 py-3 text-[#4A3D39] text-sm focus:outline-none focus:border-[#8B1E24]"
        />
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-[#4A3D39] uppercase tracking-wider mb-2">
          Sarai dei nostri?
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
              attending
                ? 'bg-[#8B1E24] text-white border-[#8B1E24]'
                : 'bg-[#FAF7F2] border-[#D8CBB7] text-[#9E8976]'
            }`}
          >
            Sì, ci sarò con gioia! 🎉
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all ${
              !attending
                ? 'bg-[#8B1E24] text-white border-[#8B1E24]'
                : 'bg-[#FAF7F2] border-[#D8CBB7] text-[#9E8976]'
            }`}
          >
            Purtroppo no
          </button>
        </div>
      </div>

      {attending && (
        <>
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#4A3D39] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#8B1E24]" />
              Numero di Partecipanti
            </label>
            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(Number(e.target.value))}
              className="w-full bg-[#FAF7F2] border border-[#D8CBB7] rounded-xl px-4 py-3 text-[#4A3D39] text-sm focus:outline-none"
            >
              <option value={1}>Solo io (1 persona)</option>
              <option value={2}>Io + 1 accompagnatore (2 persone)</option>
              <option value={3}>Famiglia (3 persone)</option>
              <option value={4}>Famiglia (4 persone)</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#4A3D39] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#8B1E24]" />
              Preferenza Menu
            </label>
            <select
              value={menuPreference}
              onChange={(e) => setMenuPreference(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#D8CBB7] rounded-xl px-4 py-3 text-[#4A3D39] text-sm focus:outline-none"
            >
              <option value="carne">Menu Carne / Tradizionale</option>
              <option value="pesce">Menu Pesce</option>
              <option value="vegetariano">Menu Vegetariano / Vegano</option>
              <option value="bimbi">Menu Bambini</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#4A3D39] uppercase tracking-wider mb-2">
              Allergie o Intolleranze Alimentari
            </label>
            <textarea
              rows={2}
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
              placeholder="Es. Celiachia, intolleranza al lattosio..."
              className="w-full bg-[#FAF7F2] border border-[#D8CBB7] rounded-xl px-4 py-3 text-[#4A3D39] text-xs focus:outline-none"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-[#8B1E24] text-[#FAF7F2] font-bold text-xs uppercase tracking-widest hover:bg-[#6E1216] transition-all shadow-md flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50 mt-4"
      >
        <Send className="w-3.5 h-3.5" />
        {loading ? 'Inviando...' : 'Invia Conferma'}
      </button>
    </form>
  );
}
