import React from 'react';
import { supabase } from '@/lib/supabase';
import EnvelopeWax from '@/components/EnvelopeWax';
import RsvpForm from '@/components/RsvpForm';
import { MapPin, Calendar, Heart, Gift, Music, ShoppingBag, Clock, Compass } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ExperiencePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { guest?: string };
}) {
  const { slug } = params;
  const guestName = searchParams.guest || 'Cara Famiglia / Amico';

  let experience: any = null;

  try {
    const { data } = await supabase
      .from('love_experiences')
      .select('*')
      .eq('slug', slug)
      .single();
    experience = data;
  } catch (e) {}

  // CONFIGURAZIONE LE 2 DEMO D'AUTORE
  if (!experience) {
    if (slug === 'francesca-e-luca') {
      experience = {
        slug: 'francesca-e-luca',
        couple_names: 'Francesca & Luca',
        wax_initials: 'F & L',
        wedding_date: '10 Ottobre 2026',
        audio_url: 'https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3',
        location_name: 'Tenuta Borgo San Pietro',
        location_address: 'Strada del Vino, Chianti (SI)',
        iban: 'IT99 X 0123 4567 8901 2345 6789',
      };
    } else {
      experience = {
        slug: 'elena-e-davide',
        couple_names: 'Elena & Davide',
        wax_initials: 'E & D',
        wedding_date: '28 Settembre 2026',
        audio_url: 'https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3',
        location_name: 'Villa del Balbianello',
        location_address: 'Pescarenico, Lago di Como (CO)',
        iban: 'IT99 X 0123 4567 8901 2345 6789',
      };
    }
  }

  return (
    <EnvelopeWax
      initials={experience.wax_initials}
      coupleNames={experience.couple_names}
      weddingDate={experience.wedding_date}
      audioUrl={experience.audio_url}
    >
      <div className="min-h-screen bg-[#FAF7F2] text-[#4A3D39] pb-20">
        
        {/* HERO ARCO ROMANTICO */}
        <section className="relative py-16 px-6 text-center max-w-3xl mx-auto flex flex-col items-center">
          
          {/* WELCOME PERSONALE DELL'INVITATO */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EFE6] border border-[#D8CBB7] text-[#8B1E24] text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#8B1E24]" />
            <span>{guestName}, sei invitato/a!</span>
          </div>

          <p className="font-serif italic text-[#8B1E24] text-lg mb-2">Wedding Day</p>
          <h1 className="font-serif text-5xl sm:text-7xl font-normal text-[#4A3D39] mb-4 tracking-wide">
            {experience.couple_names}
          </h1>
          <p className="text-[#9E8976] text-xs tracking-widest uppercase mb-10">
            {experience.wedding_date}
          </p>

          {/* CITAZIONE D'AUTORE */}
          <div className="paper-card p-8 rounded-2xl border border-[#E5DACB] max-w-xl mx-auto shadow-sm relative mb-12">
            <p className="font-serif italic text-lg sm:text-xl text-[#4A3D39] leading-relaxed">
              "Due anime, un solo destino. Una storia scritta nel cuore da vivere e festeggiare insieme a chi amiamo."
            </p>
          </div>
        </section>

        {/* COLONNA SONORA FF EDIZIONI */}
        <section className="py-8 px-6 max-w-xl mx-auto text-center">
          <div className="paper-card p-6 rounded-2xl border border-[#D4AF37]/40 shadow-md">
            <Music className="w-6 h-6 text-[#8B1E24] mx-auto mb-2 animate-bounce" />
            <span className="text-[10px] text-[#8B1E24] uppercase tracking-widest font-bold">Colonna Sonora Inedita • FF Edizioni</span>
            <h3 className="font-serif text-xl text-[#4A3D39] my-1">La Nostra Melodia</h3>
            <p className="text-xs text-[#9E8976] mb-4 italic">Composta da Fausto Fusetti in esclusiva per il nostro matrimonio</p>
            <audio controls className="w-full rounded-lg">
              <source src={experience.audio_url} type="audio/mpeg" />
            </audio>
          </div>
        </section>

        {/* PROGRAMMA DELLA GIORNATA */}
        <section className="py-16 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-[#4A3D39] mb-10">Programma della Giornata</h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[#D4AF37]/40">
            
            <div className="relative z-10 bg-[#F4EFE6] border border-[#E5DACB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#8B1E24] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> Ore 11:00
              </span>
              <h3 className="font-serif text-lg text-[#4A3D39] mb-1">La Cerimonia</h3>
              <p className="text-xs text-[#9E8976]">{experience.location_name} - {experience.location_address}</p>
            </div>

            <div className="relative z-10 bg-[#F4EFE6] border border-[#E5DACB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#D4AF37] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> Ore 13:30
              </span>
              <h3 className="font-serif text-lg text-[#4A3D39] mb-1">Aperitivo & Ricevimento</h3>
              <p className="text-xs text-[#9E8976]">Brindisi di benvenuto e pranzo d'autore</p>
            </div>

            <div className="relative z-10 bg-[#F4EFE6] border border-[#E5DACB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#8B1E24] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> Ore 18:00
              </span>
              <h3 className="font-serif text-lg text-[#4A3D39] mb-1">Taglio Torta & Party</h3>
              <p className="text-xs text-[#9E8976]">Musica, festeggiamenti e taglio della torta</p>
            </div>

          </div>
        </section>

        {/* LOCATION & MAPPA */}
        <section className="py-12 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-[#4A3D39] mb-3">La Location</h2>
          <p className="text-xs text-[#9E8976] uppercase tracking-widest mb-6">{experience.location_name}</p>
          
          <div className="paper-card p-4 rounded-2xl border border-[#E5DACB] shadow-sm mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.5!2d9.2!3d45.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDU0JzAwLjAiTiA5wrAxMicwMC4wIkU!5e0!3m2!1sit!2sit!4v1"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
            />
          </div>
        </section>

        {/* LISTA NOZZE */}
        <section className="py-12 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl text-[#4A3D39] mb-2">Pensiero per gli Sposi</h2>
          <p className="text-xs text-[#9E8976] max-w-md mx-auto mb-8">
            La vostra presenza è per noi il dono più grande. Per chi desiderasse contribuire al nostro viaggio di nozze:
          </p>

          <div className="paper-card p-6 rounded-2xl border border-[#E5DACB] shadow-sm text-center max-w-md mx-auto">
            <Gift className="w-6 h-6 text-[#8B1E24] mx-auto mb-2" />
            <h4 className="font-serif text-lg text-[#4A3D39] mb-1">Coordinate Bonifico Viaggio</h4>
            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E5DACB] text-xs font-mono text-[#8B1E24] select-all my-3 font-bold">
              {experience.iban}
            </div>
          </div>
        </section>

        {/* MODULO CONFERMA PARTECIPAZIONE (SENZA RSVP) */}
        <section className="py-12 px-6">
          <RsvpForm experienceSlug={slug} />
        </section>

        <footer className="pt-16 pb-8 text-center text-xs text-[#9E8976]">
          <Heart className="w-4 h-4 text-[#8B1E24] fill-[#8B1E24] mx-auto mb-2" />
          <p>{experience.couple_names} • {experience.wedding_date}</p>
          <p className="mt-1 opacity-60">Powered by LOVE • RM Studio</p>
        </footer>

      </div>
    </EnvelopeWax>
  );
}
