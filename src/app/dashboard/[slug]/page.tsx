import React from 'react';
import { supabase } from '@/lib/supabase';
import { Download, CheckCircle2, XCircle, AlertTriangle, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SposiDashboardPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  let experience: any = null;
  try {
    const { data } = await supabase
      .from('love_experiences')
      .select('*')
      .eq('slug', slug)
      .single();
    experience = data;
  } catch (e) {}

  if (!experience) {
    experience = {
      couple_names: slug === 'francesca-e-luca' ? 'Francesca & Luca' : 'Elena & Davide',
      wedding_date: '2026',
    };
  }

  const { data: rsvps } = await supabase
    .from('love_rsvps')
    .select('*')
    .eq('experience_slug', slug)
    .order('created_at', { ascending: false });

  const guestList = rsvps || [];
  const totalResponses = guestList.length;
  const totalAttending = guestList.filter((g) => g.attending).reduce((sum, g) => sum + (g.guests_count || 1), 0);
  const totalDeclined = guestList.filter((g) => !g.attending).length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#4A3D39] p-6 sm:p-10">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E5DACB]">
        <div>
          <span className="text-xs text-[#8B1E24] uppercase tracking-widest font-bold">Dashboard Risultati Sposi</span>
          <h1 className="font-serif text-3xl text-[#4A3D39]">{experience.couple_names}</h1>
        </div>

        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(
            'Nome,Partecipa,Persone,Menu,Intolleranze\n' +
              guestList.map((g) => `"${g.guest_name}","${g.attending ? 'SI' : 'NO'}","${g.guests_count}","${g.menu_preference}","${g.dietary_notes || ''}"`).join('\n')
          )}`}
          download={`invitati_${slug}.csv`}
          className="px-5 py-3 rounded-xl bg-[#8B1E24] text-white text-xs font-bold uppercase tracking-wider block"
        >
          Esporta Lista Catering (CSV) ↗
        </a>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#E5DACB]">
          <span className="text-xs text-[#9E8976] uppercase font-bold">Totale Risposte</span>
          <div className="text-3xl font-serif mt-2">{totalResponses}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-emerald-500/30">
          <span className="text-xs text-emerald-700 uppercase font-bold">Confermati</span>
          <div className="text-3xl font-serif text-emerald-800 mt-2">{totalAttending} persone</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-rose-500/30">
          <span className="text-xs text-rose-700 uppercase font-bold">Assenti</span>
          <div className="text-3xl font-serif text-rose-800 mt-2">{totalDeclined}</div>
        </div>
      </div>
    </div>
  );
}
