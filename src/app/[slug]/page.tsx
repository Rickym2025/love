import React from 'react';
import { supabase } from '@/lib/supabase';
import EnvelopeWax from '@/components/EnvelopeWax';
import ScratchDate from '@/components/ScratchDate';
import PartingClouds from '@/components/PartingClouds';
import LoveQuiz from '@/components/LoveQuiz';
import PhotoWallSection from '@/components/PhotoWallSection';
import RsvpForm from '@/components/RsvpForm';
import { WaterRippleImage } from '@/components/ui/water-ripple-image';
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

  const isFrancesca = slug === 'francesca-e-luca';

  return (
    <EnvelopeWax
      initials={experience.wax_initials}
      coupleNames={experience.couple_names}
      weddingDate={experience.wedding_date}
      audioUrl={experience.audio_url}
      themeColor={experience.theme_color}
    >
      <div className={`min-h-screen ${isFrancesca ? 'bg-[#F0F7FF] text-[#2C3E50]' : 'bg-[#FAF7F2] text-[#4A3D39]'} pb-20`}>
        
        {/* HERO SECTION */}
        <section className="relative py-16 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4AF37]/40 text-[#8B1E24] text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#8B1E24]" />
            <span>Benvenuto/a {guestName}!</span>
          </div>

          <p className="font-serif italic text-[#D4AF37] text-2xl mb-2">Getting Married!</p>
          <h1 className="font-serif text-5xl sm:text-7xl font-normal mb-4 tracking-wide">
            {experience.couple_names}
          </h1>
          <p className="text-[#78909C] text-xs tracking-widest uppercase mb-10">
            {experience.wedding_date}
          </p>

          {/* EFFETTO ONDE SULL'ACQUA PER ELENA & DAVIDE */}
          {!isFrancesca && (
            <div className="w-full max-w-2xl h-80 my-6">
              <WaterRippleImage src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" className="w-full h-full" />
            </div>
          )}
        </section>

        {/* DEMO FRANCESCA: NUVOLE CHE SI SCOSTANO + SCRATCH DATE */}
        {isFrancesca ? (
          <PartingClouds>
            <ScratchDate day="14" month="Settembre" year="2026" />
          </PartingClouds>
        ) : (
          /* DEMO ELENA: LOVE QUIZ INTERATTIVO */
          <LoveQuiz coupleNames={experience.couple_names} />
        )}

        {/* COLONNA SONORA FF EDIZIONI */}
        <section className="py-8 px-6 max-w-xl mx-auto text-center">
          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-md">
            <Music className="w-6 h-6 text-[#8B1E24] mx-auto mb-2 animate-bounce" />
            <span className="text-[10px] text-[#8B1E24] uppercase tracking-widest font-bold">Colonna Sonora Inedita • FF Edizioni</span>
            <h3 className="font-serif text-xl my-1">La Nostra Melodia</h3>
            <audio controls className="w-full rounded-lg mt-3">
              <source src={experience.audio_url} type="audio/mpeg" />
            </audio>
          </div>
        </section>

        {/* SEZIONE FOTO WALL & PROIETTORE MAXISCHERMO PER LA FESTA */}
        <PhotoWallSection coupleNames={experience.couple_names} />

        {/* LISTA NOZZE */}
        <section className="py-12 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-2">Lista Nozze & Regali</h2>
          <div className="bg-white p-6 rounded-2xl border border-[#E5DACB] shadow-sm text-center max-w-md mx-auto">
            <Gift className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
            <a
              href="https://www.amazon.it/baby-reg/homepage?tag=zero100store-21"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-white font-bold uppercase tracking-wider block mt-2 text-xs"
            >
              Apri Lista Nozze Amazon ↗
            </a>
          </div>
        </section>

        {/* FORM DI CONFERMA PARTECIPAZIONE */}
        <section className="py-12 px-6">
          <RsvpForm experienceSlug={slug} />
        </section>

      </div>
    </EnvelopeWax>
  );
}
