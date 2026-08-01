import React from 'react';
import { supabase } from '@/lib/supabase';
import { Users, CheckCircle2, XCircle, AlertTriangle, Download, Utensils, Music, Search } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  // Carica esperienza e lista risposte RSVP da Supabase
  const { data: experience } = await supabase
    .from('love_experiences')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!experience) notFound();

  const { data: rsvps } = await supabase
    .from('love_rsvps')
    .select('*')
    .eq('experience_slug', slug)
    .order('created_at', { ascending: false });

  const guestList = rsvps || [];
  const totalResponses = guestList.length;
  const totalAttending = guestList.filter((g) => g.attending).reduce((sum, g) => sum + (g.guests_count || 1), 0);
  const totalDeclined = guestList.filter((g) => !g.attending).length;
  const dietaryAlerts = guestList.filter((g) => g.dietary_notes && g.dietary_notes.trim().length > 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 sm:p-10">
      
      {/* HEADER DASHBOARD */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs text-amber-400 uppercase tracking-widest font-bold">Pannello Gestione Risultati</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 font-light">{experience.couple_names}</h1>
          <p className="text-xs text-slate-400 mt-1">Data Matrimonio: {experience.wedding_date}</p>
        </div>

        {/* Pulsante Export CSV per la cucina */}
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(
            'Nome,Partecipa,Persone,Menu,Intolleranze,Canzone\n' +
              guestList
                .map(
                  (g) =>
                    `"${g.guest_name}","${g.attending ? 'SI' : 'NO'}","${g.guests_count}","${g.menu_preference}","${g.dietary_notes || ''}","${g.song_request || ''}"`
                )
                .join('\n')
          )}`}
          download={`invitati_${slug}.csv`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all shadow-lg"
        >
          <Download className="w-4 h-4" />
          Esporta Lista per Catering (CSV)
        </a>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
            <span className="text-slate-400 text-xs uppercase tracking-wider font-medium">Totale Risposte</span>
            <div className="font-serif text-3xl text-amber-100 mt-2">{totalResponses}</div>
          </div>

          <div className="bg-slate-900 border border-emerald-500/30 p-5 rounded-2xl">
            <span className="text-emerald-400 text-xs uppercase tracking-wider font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Confermati
            </span>
            <div className="font-serif text-3xl text-emerald-200 mt-2">{totalAttending} persone</div>
          </div>

          <div className="bg-slate-900 border border-rose-500/30 p-5 rounded-2xl">
            <span className="text-rose-400 text-xs uppercase tracking-wider font-medium flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Assenti
            </span>
            <div className="font-serif text-3xl text-rose-200 mt-2">{totalDeclined}</div>
          </div>

          <div className="bg-slate-900 border border-amber-500/30 p-5 rounded-2xl">
            <span className="text-amber-400 text-xs uppercase tracking-wider font-medium flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Intolleranze
            </span>
            <div className="font-serif text-3xl text-amber-200 mt-2">{dietaryAlerts.length} segnalazioni</div>
          </div>
        </div>

        {/* TABELLA DETTAGLIATA INVITATI */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <h3 className="font-serif text-xl text-amber-100">Registro Dettagliato Risposte</h3>
            <span className="text-xs text-slate-400">{guestList.length} elementi salvati</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Nome Invitato</th>
                  <th className="p-4">Stato</th>
                  <th className="p-4">Coperti</th>
                  <th className="p-4">Menu Scelto</th>
                  <th className="p-4">Intolleranze / Note</th>
                  <th className="p-4">Canzone Richiesta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {guestList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500 italic">
                      Nessuna risposta RSVP ancora registrata per questa demo.
                    </td>
                  </tr>
                ) : (
                  guestList.map((g) => (
                    <tr key={g.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-4 font-medium text-amber-100">{g.guest_name}</td>
                      <td className="p-4">
                        {g.attending ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                            Confermato
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                            Assente
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-bold">{g.attending ? g.guests_count || 1 : 0}</td>
                      <td className="p-4 uppercase text-slate-300">{g.menu_preference || 'carne'}</td>
                      <td className="p-4">
                        {g.dietary_notes ? (
                          <span className="text-amber-300 font-medium bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-md">
                            ⚠️ {g.dietary_notes}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic">Nessuna</span>
                        )}
                      </td>
                      <td className="p-4 italic text-slate-400">{g.song_request || '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
