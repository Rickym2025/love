import React from 'react';
import { supabase } from '@/lib/supabase';
import EnvelopeWax from '@/components/EnvelopeWax';
import RsvpForm from '@/components/RsvpForm';
import { MapPin, Calendar, Heart, Gift, Music, ShoppingBag, Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExperiencePage({
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
  } catch (e) {
    console.error('Supabase Fetch Error:', e);
  }

  // FALLBACK D'EMERGENZA ANTI-404
  if (!experience) {
    if (slug === 'adamo-ed-eva') {
      experience = {
        slug: 'adamo-ed-eva',
        couple_names: 'Adamo & Eva',
        wax_initials: 'A & E',
        wedding_date: '10 Ottobre 2026',
        location_name: "Il Giardino dell'Eden",
        location_address: 'Valle Terrestre',
        amazon_affiliate_tag: 'rmstudio-21',
        iban: 'IT99 X 0123 4567 8901 2345 6789',
      };
    } else {
      experience = {
        slug: slug || 'renzo-e-lucia',
        couple_names: 'Renzo & Lucia',
        wax_initials: 'R & L',
        wedding_date: '28 Settembre 2026',
        location_name: 'Chiesa di Pescarenico & Villa del Balbianello',
        location_address: 'Pescarenico, Lecco (LC)',
        amazon_affiliate_tag: 'rmstudio-21',
        iban: 'IT99 X 0123 4567 8901 2345 6789',
      };
    }
  }

  const amazonTag = experience.amazon_affiliate_tag || 'rmstudio-21';

  return (
    <EnvelopeWax
      initials={experience.wax_initials || 'R & L'}
      coupleNames={experience.couple_names}
      weddingDate={experience.wedding_date}
    >
      <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
        
        {/* HERO SECTION */}
        <section className="relative py-24 px-6 text-center max-w-4xl mx-auto flex flex-col items-center justify-center">
          <span className="text-amber-400 text-xs sm:text-sm uppercase tracking-widest mb-3 font-medium border border-amber-500/20 px-4 py-1.5 rounded-full bg-amber-500/10 backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            Il Nostro Matrimonio
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl font-light text-amber-100 mb-6 tracking-wide drop-shadow-[0_0_25px_rgba(251,191,36,0.2)]">
            {experience.couple_names}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-300 text-sm mb-10">
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-5 py-2.5 rounded-full shadow-lg">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{experience.wedding_date}</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-5 py-2.5 rounded-full shadow-lg">
              <MapPin className="w-4 h-4 text-rose-400" />
              <span>{experience.location_name}</span>
            </div>
          </div>
        </section>

        {/* PROGRAMMA */}
        <section className="py-12 px-6 max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-center text-amber-100 mb-10">
            Programma della Giornata
          </h2>
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-amber-500/40 before:to-rose-500/40">
            
            <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 max-w-sm mx-auto text-center shadow-xl hover:border-amber-500/40 transition-all">
              <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> Ore 11:00
              </span>
              <h3 className="font-serif text-xl text-slate-100 mb-1">La Cerimonia</h3>
              <p className="text-slate-400 text-xs">{experience.location_name} - {experience.location_address}</p>
            </div>

            <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 max-w-sm mx-auto text-center shadow-xl hover:border-amber-500/40 transition-all">
              <span className="inline-flex items-center gap-1 text-rose-400 text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> Ore 13:30
              </span>
              <h3 className="font-serif text-xl text-slate-100 mb-1">Aperitivo & Ricevimento</h3>
              <p className="text-slate-400 text-xs">Brindisi di benvenuto, pranzo d'autore e festa</p>
            </div>

            <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 max-w-sm mx-auto text-center shadow-xl hover:border-amber-500/40 transition-all">
              <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> Ore 18:00
              </span>
              <h3 className="font-serif text-xl text-slate-100 mb-1">Taglio Torta & Party</h3>
              <p className="text-slate-400 text-xs">Musica dal vivo, Open Bar e festeggiamenti</p>
            </div>

          </div>
        </section>

        {/* FF EDIZIONI CANZONE */}
        <section className="py-12 px-6 max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 border border-amber-500/30 rounded-3xl p-8 shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Music className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-xs text-amber-400 uppercase tracking-widest font-semibold">Colonna Sonora Ufficiale • FF Edizioni</span>
            <h3 className="font-serif text-2xl text-amber-100 my-2">Ascolta la Canzone Inedita degli Sposi</h3>
            <p className="text-slate-400 text-xs mb-6 max-w-md mx-auto italic">
              Una composizione d'autore scritta e prodotta da Fausto Fusetti in esclusiva per noi.
            </p>
            <audio controls className="w-full max-w-md mx-auto rounded-lg">
              <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
            </audio>
          </div>
        </section>

        {/* LISTA NOZZE */}
        <section className="py-12 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-amber-100 mb-3">Lista Nozze & Regali</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mb-8">
            La vostra presenza è per noi il dono più grande. Se desiderate farci un pensiero:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all">
              <Gift className="w-6 h-6 text-amber-400 mb-3" />
              <h4 className="font-serif text-lg text-amber-100 mb-1">Viaggio di Nozze</h4>
              <p className="text-slate-400 text-xs mb-3">Sostieni il nostro viaggio con un bonifico:</p>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-amber-300 break-all select-all">
                {experience.iban}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-rose-500/40 transition-all">
              <div>
                <ShoppingBag className="w-6 h-6 text-rose-400 mb-3" />
                <h4 className="font-serif text-lg text-amber-100 mb-1">Lista Nozze Amazon</h4>
                <p className="text-slate-400 text-xs mb-4">La nostra lista dei desideri per la casa:</p>
              </div>
              <a
                href={`https://www.amazon.it/baby-reg/homepage?tag=${amazonTag}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-all text-xs text-center font-medium block"
              >
                Apri Lista Nozze su Amazon ↗
              </a>
            </div>
          </div>
        </section>

        {/* RSVP */}
        <section className="py-12 px-6">
          <RsvpForm experienceSlug={slug} />
        </section>

        <footer className="pt-16 pb-8 text-center text-xs text-slate-500">
          <Heart className="w-4 h-4 text-rose-500 fill-rose-500 mx-auto mb-2" />
          <p>{experience.couple_names} • {experience.wedding_date}</p>
          <p className="mt-1 opacity-60">Powered by LOVE • RM Studio</p>
        </footer>

      </div>
    </EnvelopeWax>
  );
}
