import React from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Building2, Users, Download, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AgencyPage({
  params,
}: {
  params: { agencyId: string };
}) {
  const { agencyId } = params;
  const agencyName = agencyId.replace(/-/g, ' ').toUpperCase();

  // Carica tutti i matrimoni gestiti da questa agenzia da Supabase
  const { data: experiences } = await supabase
    .from('love_experiences')
    .select('*')
    .order('created_at', { ascending: false });

  const clientList = experiences || [
    { slug: 'elena-e-davide', couple_names: 'Elena & Davide', wedding_date: '28 Settembre 2026' },
    { slug: 'francesca-e-luca', couple_names: 'Francesca & Luca', wedding_date: '14 Settembre 2026' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E293B] p-6 sm:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* HEADER AGENZIA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Pannello Multi-Matrimonio White-Label
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1E293B] font-bold">{agencyName}</h1>
            <p className="text-xs text-[#64748B] mt-1">Gestione clienti e partecipazioni digitali attive</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 text-xs font-bold">
              10 Licenze Incorporate
            </span>
          </div>
        </div>

        {/* GRIGLIA MATRIMONI GESTITI DALL'AGENZIA */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {clientList.map((client) => (
            <div key={client.slug} className="bg-white border border-[#E2E8F0] p-6 rounded-3xl shadow-sm hover:border-[#D4AF37] transition-all flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold block mb-1">
                  Cliente Agenzia
                </span>
                <h3 className="font-serif text-2xl text-[#1E293B] mb-1">{client.couple_names}</h3>
                <p className="text-xs text-[#64748B] mb-6">Data Evento: {client.wedding_date}</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-[#E2E8F0]">
                <Link
                  href={`/${client.slug}`}
                  target="_blank"
                  className="flex-1 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E2E8F0] text-center text-xs font-bold text-[#1E293B] hover:border-[#8B1E24]"
                >
                  Apri Invito ↗
                </Link>
                <Link
                  href={`/dashboard/${client.slug}`}
                  className="flex-1 py-2.5 rounded-xl bg-[#8B1E24] text-white text-center text-xs font-bold uppercase tracking-wider hover:bg-[#6E1216]"
                >
                  Dashboard Risultati 📊
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
