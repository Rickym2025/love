import React from 'react';
import { supabase } from '@/lib/supabase';
import EnvelopeWax from '@/components/EnvelopeWax';
import ScratchDate from '@/components/ScratchDate';
import RsvpForm from '@/components/RsvpForm';
import { MapPin, Calendar, Heart, Gift, Music, Clock } from 'lucide-react';

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

  if (!experience) {
    if (slug === 'francesca-e-luca') {
      experience = {
        slug: 'francesca-e-luca',
        couple_names: 'Francesca & Luca',
        wax_initials: 'F & L',
        wedding_date: '14 Settembre 2026',
        theme_color: 'blue',
        audio_url: 'https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3',
        location_name: 'Villa Borghese - Puerto Vallarta',
        location_address: '118 Old East Neck Road, NY',
        iban: 'IT99 X 0123 4567 8901 2345 6789',
      };
    } else {
      experience = {
        slug: 'elena-e-davide',
        couple_names: 'Elena & Davide',
        wax_initials: 'E & D',
        wedding_date: '28 Settembre 2026',
        theme_color: 'pink',
        audio_url: 'https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3',
        location_name: 'Villa del Balbianello',
        location_address: 'Pescarenico, Lago di Como (CO)',
        iban: 'IT99 X 0123 4567 8901 2345 6789',
      };
    }
  }

  const isBlueTheme = experience.theme_color === 'blue';

  return (
    <EnvelopeWax
      initials={experience.wax_initials}
      coupleNames={experience.couple_names}
      weddingDate={experience.wedding_date}
      audioUrl={experience.audio_url}
      themeColor={experience.theme_color}
    >
      <div className={`min-h-screen ${isBlueTheme ? 'bg-[#F0F7FF] text-[#2C3E50]' : 'bg-[#FAF7F2] text-[#4A3D39]'} pb-20`}>
        
        {/* HERO SCENICA CON ARCO E PAESAGGIO */}
        <section className="relative py-20 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#BBDEFB] text-[#1976D2] text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#1976D2]" />
            <span>Benvenuto/a {guestName}!</span>
          </div>

          <p className="font-serif italic text-[#1976D2] text-2xl mb-2">Getting Married!</p>
          <h1 className="font-serif text-5xl sm:text-7xl font-normal mb-4 tracking-wide">
            {experience.couple_names}
          </h1>
          <p className="text-[#78909C] text-xs tracking-widest uppercase mb-10">
            {experience.wedding_date}
          </p>

          {/* CITAZIONE ROMANTICA SU SFONDO CARTA STRAPPATA */}
          <div className="bg-white/90 p-8 rounded-3xl border border-[#BBDEFB] max-w-xl mx-auto shadow-md relative mb-12">
            <p className="font-serif italic text-lg sm:text-xl text-[#37474F] leading-relaxed">
              "Due anime, un solo destino. Una vita scritta nel cuore da condividere con chi amiamo."
            </p>
          </div>

          {/* MODULO SCRATCH DATA (DA IMMAGINE 1) */}
          <ScratchDate day="14" month="Settembre" year="2026" />
        </section>

        {/* COLONNA SONORA INEDITA FF EDIZIONI */}
        <section className="py-8 px-6 max-w-xl mx-auto text-center">
          <div className="bg-white/90 p-6 rounded-2xl border border-[#D4AF37]/50 shadow-md">
            <Music className="w-6 h-6 text-[#1976D2] mx-auto mb-2 animate-bounce" />
            <span className="text-[10px] text-[#1976D2] uppercase tracking-widest font-bold">Colonna Sonora Inedita • FF Edizioni</span>
            <h3 className="font-serif text-xl my-1">La Nostra Melodia</h3>
            <p className="text-xs text-[#78909C] mb-4 italic">Composta da Fausto Fusetti per il nostro matrimonio</p>
            <audio controls className="w-full rounded-lg">
              <source src={experience.audio_url} type="audio/mpeg" />
            </audio>
          </div>
        </section>

        {/* SCHEDULE OF EVENTS (DA IMMAGINE 3 E 4) */}
        <section className="py-16 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-10">Schedule of Events</h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[#1976D2]/30">
            
            <div className="relative z-10 bg-white border border-[#BBDEFB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#1976D2] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> 16:30
              </span>
              <h3 className="font-serif text-lg mb-1">Guest Arrival</h3>
              <p className="text-xs text-[#78909C]">Accoglienza invitati e brindisi di benvenuto</p>
            </div>

            <div className="relative z-10 bg-white border border-[#BBDEFB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#1976D2] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> 17:00
              </span>
              <h3 className="font-serif text-lg mb-1">Ceremony</h3>
              <p className="text-xs text-[#78909C]">{experience.location_name}</p>
            </div>

            <div className="relative z-10 bg-white border border-[#BBDEFB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#1976D2] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> 18:00
              </span>
              <h3 className="font-serif text-lg mb-1">Cocktail & Dancing</h3>
              <p className="text-xs text-[#78909C]">Aperitivo al tramonto con musica dal vivo</p>
            </div>

            <div className="relative z-10 bg-white border border-[#BBDEFB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#1976D2] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> 20:00
              </span>
              <h3 className="font-serif text-lg mb-1">Dinner & Party</h3>
              <p className="text-xs text-[#78909C]">Cena e festeggiamenti fino a tarda notte</p>
            </div>

          </div>
        </section>

        {/* LOCATION & MAPPA */}
        <section className="py-12 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-3">Wedding Venue</h2>
          <p className="text-xs text-[#78909C] uppercase tracking-widest mb-6">{experience.location_name}</p>
          
          <div className="bg-white p-4 rounded-2xl border border-[#BBDEFB] shadow-sm mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2778.5!2d9.2!3d45.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDU0JzAwLjAiTiA5wrAxMicwMC4wIkU!5e0!3m2!1sit!2sit!4v1"
              width="100%"
              height="250"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
            />
          </div>
        </section>

        {/* LISTA NOZZE CON TAG AMAZON CORRETTO zero100store-21 */}
        <section className="py-12 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-2">Lista Nozze & Regali</h2>
          <p className="text-xs text-[#78909C] max-w-md mx-auto mb-8">
            La vostra presenza è il dono più grande. Per chi desiderasse farci un pensiero:
          </p>

          <div className="bg-white p-6 rounded-2xl border border-[#BBDEFB] shadow-sm text-center max-w-md mx-auto">
            <Gift className="w-6 h-6 text-[#1976D2] mx-auto mb-2" />
            <h4 className="font-serif text-lg mb-1">Lista Nozze Amazon</h4>
            <a
              href="https://www.amazon.it/baby-reg/homepage?tag=zero100store-21"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#1976D2] text-white hover:bg-[#1565C0] transition-all text-xs font-bold uppercase tracking-wider block mt-4"
            >
              Apri Lista Nozze Amazon ↗
            </a>
          </div>
        </section>

        {/* FORM DI CONFERMA PARTECIPAZIONE (SENZA RSVP) */}
        <section className="py-12 px-6">
          <RsvpForm experienceSlug={slug} />
        </section>

        <footer className="pt-16 pb-8 text-center text-xs text-[#78909C]">
          <Heart className="w-4 h-4 text-[#1976D2] fill-[#1976D2] mx-auto mb-2" />
          <p>{experience.couple_names} • {experience.wedding_date}</p>
          <p className="mt-1 opacity-60">Powered by LOVE • RM Studio</p>
        </footer>

      </div>
    </EnvelopeWax>
  );
}
