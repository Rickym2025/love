import React from 'react';
import { supabase } from '@/lib/supabase';
import { Download, CheckCircle2, XCircle, AlertTriangle, Settings, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function DashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

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
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3D39] p-6 sm:p-10">
      
      {/* HEADER DASHBOARD */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5DACB]">
        <div>
          <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold">Pannello Gestione Agenzia & Sposi</span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#4A3D39] font-normal">{experience.couple_names}</h1>
          <p className="text-xs text-[#9E8976] mt-1">Data Matrimonio: {experience.wedding_date}</p>
        </div>

        {/* Esportazione CSV Catering */}
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(
            'Nome,Partecipa,Persone,Menu,Intolleranze\n' +
              guestList
                .map(
                  (g) =>
                    `"${g.guest_name}","${g.attending ? 'SI' : 'NO'}","${g.guests_count}","${g.menu_preference}","${g.dietary_notes || ''}"`
                )
                .join('\n')
          )}`}
          download={`invitati_${slug}.csv`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#8B1E24] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#6E1216] transition-all shadow-md"
        >
          <Download className="w-4 h-4" />
          Esporta Lista per Catering (CSV)
        </a>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ATTIVAZIONE MODULI AGENZIA */}
        <div className="bg-white border border-[#E5DACB] p-6 rounded-3xl shadow-sm">
          <h3 className="font-serif text-xl text-[#4A3D39] mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#D4AF37]" />
            Configurazione Moduli Interattivi (White-Label)
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs font-semibold">
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DACB] flex items-center justify-between">
              <span>Busta d'Epoca con Ceralacca</span>
              <span className="text-emerald-600 font-bold">🟢 Attivo</span>
            </div>
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DACB] flex items-center justify-between">
              <span>Scratch Date ("Gratta e scopri")</span>
              <span className="text-emerald-600 font-bold">🟢 Attivo</span>
            </div>
            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E5DACB] flex items-center justify-between">
              <span>Colonna Sonora FF Edizioni</span>
              <span className="text-emerald-600 font-bold">🟢 Attivo</span>
            </div>
          </div>
        </div>

        {/* STATISTICHE RISPOSTE */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E5DACB] p-5 rounded-2xl shadow-sm">
            <span className="text-[#9E8976] text-xs uppercase tracking-wider font-medium">Totale Risposte</span>
            <div className="font-serif text-3xl text-[#4A3D39] mt-2">{totalResponses}</div>
          </div>

          <div className="bg-white border border-emerald-500/30 p-5 rounded-2xl shadow-sm">
            <span className="text-emerald-700 text-xs uppercase tracking-wider font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Confermati
            </span>
            <div className="font-serif text-3xl text-emerald-800 mt-2">{totalAttending} persone</div>
          </div>

          <div className="bg-white border border-rose-500/30 p-5 rounded-2xl shadow-sm">
            <span className="text-rose-700 text-xs uppercase tracking-wider font-medium flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5" /> Assenti
            </span>
            <div className="font-serif text-3xl text-rose-800 mt-2">{totalDeclined}</div>
          </div>

          <div className="bg-white border border-[#D4AF37]/40 p-5 rounded-2xl shadow-sm">
            <span className="text-[#8B1E24] text-xs uppercase tracking-wider font-medium flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> Intolleranze
            </span>
            <div className="font-serif text-3xl text-[#8B1E24] mt-2">{dietaryAlerts.length} segnalazioni</div>
          </div>
        </div>

        {/* TABELLA REGISTRO INVITATI */}
        <div className="bg-white border border-[#E5DACB] rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#E5DACB] flex items-center justify-between">
            <h3 className="font-serif text-xl text-[#4A3D39]">Registro Risposte Partecipazione</h3>
            <span className="text-xs text-[#9E8976]">{guestList.length} risposte registrate</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-[#9E8976] uppercase tracking-wider border-b border-[#E5DACB]">
                <tr>
                  <th className="p-4">Nome Invitato</th>
                  <th className="p-4">Stato</th>
                  <th className="p-4">Coperti</th>
                  <th className="p-4">Menu Scelto</th>
                  <th className="p-4">Intolleranze Alimentari</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5DACB]">
                {guestList.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-[#9E8976] italic">
                      Nessuna risposta registrata per questa demo.
                    </td>
                  </tr>
                ) : (
                  guestList.map((g) => (
                    <tr key={g.id} className="hover:bg-[#FAF7F2] transition-colors">
                      <td className="p-4 font-bold text-[#4A3D39]">{g.guest_name}</td>
                      <td className="p-4">
                        {g.attending ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-bold border border-emerald-500/20">
                            Confermato
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-700 border border-rose-500/20">
                            Assente
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-bold">{g.attending ? g.guests_count || 1 : 0}</td>
                      <td className="p-4 uppercase text-[#4A3D39]">{g.menu_preference || 'carne'}</td>
                      <td className="p-4">
                        {g.dietary_notes ? (
                          <span className="text-[#8B1E24] font-bold bg-rose-500/10 border border-rose-500/20 px-2 py-1 rounded-md">
                            ⚠️ {g.dietary_notes}
                          </span>
                        ) : (
                          <span className="text-[#9E8976] italic">Nessuna</span>
                        )}
                      </td>
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
