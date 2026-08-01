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
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-xl">
        <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-bounce" />
        <h3 className="font-serif text-2xl text-emerald-200 mb-2">
          Conferma Ricevuta!
        </h3>
        <p className="text-slate-300 text-sm italic">
          Grazie {guestName}, la tua risposta è stata registrata con successo. Non vediamo l'ora di festeggiare insieme!
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/60 backdrop-blur-md border border-amber-500/20 rounded-2xl p-6 sm:p-8 max-w-lg mx-auto text-left shadow-2xl"
    >
      <h3 className="font-serif text-2xl text-amber-100 mb-1 text-center">
        Conferma la tua Presenza (RSVP)
      </h3>
      <p className="text-xs text-slate-400 text-center mb-6 uppercase tracking-wider">
        Rispondi entro il 15 Luglio 2026
      </p>

      {/* Nome e Cognome */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
          Il tuo Nome e Cognome *
        </label>
        <input
          type="text"
          required
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Es. Mario Rossi"
          className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {/* Presenza */}
      <div className="mb-5">
        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
          Partecipazione
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setAttending(true)}
            className={`py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
              attending
                ? 'bg-amber-500/20 border-amber-500 text-amber-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            Sì, ci sarò! 🎉
          </button>
          <button
            type="button"
            onClick={() => setAttending(false)}
            className={`py-2.5 px-4 rounded-xl border text-sm font-medium transition-all ${
              !attending
                ? 'bg-rose-500/20 border-rose-500 text-rose-200'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            Purtroppo no
          </button>
        </div>
      </div>

      {attending && (
        <>
          {/* Numero di persone */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Numero di Partecipanti
            </label>
            <select
              value={guestsCount}
              onChange={(e) => setGuestsCount(Number(e.target.value))}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500"
            >
              <option value={1}>Solo io (1 persona)</option>
              <option value={2}>Io + 1 accompagnatore (2 persone)</option>
              <option value={3}>Famiglia (3 persone)</option>
              <option value={4}>Famiglia (4 persone)</option>
            </select>
          </div>

          {/* Preferenza Menu */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-400" />
              Preferenza Menu
            </label>
            <select
              value={menuPreference}
              onChange={(e) => setMenuPreference(e.target.value)}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-amber-500"
            >
              <option value="carne">Menu Carne / Tradizionale</option>
              <option value="pesce">Menu Pesce</option>
              <option value="vegetariano">Menu Vegetariano / Vegano</option>
              <option value="bimbi">Menu Bambini</option>
            </select>
          </div>

          {/* Intolleranze o allergie */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">
              Allergie o Intolleranze Alimentari
            </label>
            <textarea
              rows={2}
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
              placeholder="Es. Celiachia, intolleranza al lattosio..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>

          {/* Richiesta Canzone per la Festa */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-rose-400" />
              Che canzone ti farebbe ballare alla festa?
            </label>
            <input
              type="text"
              value={songRequest}
              onChange={(e) => setSongRequest(e.target.value)}
              placeholder="Es. Titolo della tua canzone preferita"
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
      >
        <Send className="w-4 h-4" />
        {loading ? 'Invio in corso...' : 'Invia Conferma'}
      </button>
    </form>
  );
}
