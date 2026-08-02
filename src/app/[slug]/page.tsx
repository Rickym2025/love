'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import EnvelopeWax from '@/components/EnvelopeWax';
import ScratchDate from '@/components/ScratchDate';
import PartingClouds from '@/components/PartingClouds';
import RsvpForm from '@/components/RsvpForm';
import { WaterRippleImage } from '@/components/ui/water-ripple-image';
import { Heart, Gift, Music, Sparkles } from 'lucide-react';

export default function ExperiencePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { guest?: string };
}) {
  const slug = params.slug;
  const guestName = searchParams?.guest || 'Cara Famiglia / Amico';
  const isFrancesca = slug === 'francesca-e-luca';

  const defaultData = isFrancesca
    ? {
        slug: 'francesca-e-luca',
        couple_names: 'Francesca & Luca',
        wax_initials: 'F & L',
        wedding_date: '14 Settembre 2026',
        theme_color: 'blue',
        audio_url: 'https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Francesca%20e%20Luca:%20Quella%20Fotografia%20B.mp3',
        location_name: 'Villa Borghese',
        location_address: 'Chianti, Toscana',
        iban: 'IT99 X 0123 4567 8901 2345 6789',
      }
    : {
        slug: 'elena-e-davide',
        couple_names: 'Elena & Davide',
        wax_initials: 'E & D',
        wedding_date: '28 Settembre 2026',
        theme_color: 'pink',
        audio_url: 'https://pub-89945f8350374b50818d716fdc3c108b.r2.dev/Matrimonio/Elena%20e%20Davide:%20La%20Nostra%20Melodia%20A.mp3',
        location_name: 'Villa del Balbianello',
        location_address: 'Lago di Como (CO)',
        iban: 'IT99 X 0123 4567 8901 2345 6789',
      };

  const [experience, setExperience] = useState<any>(defaultData);

  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await supabase.from('love_experiences').select('*').eq('slug', slug).single();
        if (data) setExperience(data);
      } catch (e) {}
    }
    loadData();
  }, [slug]);

  return (
    <EnvelopeWax
      initials={experience.wax_initials}
      coupleNames={experience.couple_names}
      weddingDate={experience.wedding_date}
      audioUrl={experience.audio_url}
      themeColor={experience.theme_color}
    >
      <div className={`min-h-screen ${isFrancesca ? 'bg-[#F0F7FF] text-[#1E293B]' : 'bg-[#FAF7F2] text-[#1E293B]'} pb-20`}>
        
        {/* HERO SECTION */}
        <section className="relative py-16 px-6 text-center max-w-3xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4AF37]/40 text-[#8B1E24] text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm">
            <Heart className="w-3.5 h-3.5 fill-[#8B1E24]" />
            <span>Benvenuto/a {guestName}!</span>
          </div>

          <p className="font-serif italic text-[#D4AF37] text-2xl mb-2">Getting Married!</p>
          <h1 className="font-serif text-5xl sm:text-7xl font-normal mb-4 tracking-wide">{experience.couple_names}</h1>
          <p className="text-[#64748B] text-xs tracking-widest uppercase mb-8">{experience.wedding_date}</p>

          {/* FOTO PROPORZIONATA SENZA TAGLI ALLE TESTE */}
          <div className="w-full max-w-md h-auto rounded-3xl overflow-hidden shadow-2xl my-4 border-4 border-white">
            {!isFrancesca ? (
              <WaterRippleImage src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop" className="w-full h-80" />
            ) : (
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop" alt="Coppia" className="w-full h-80 object-cover" />
            )}
          </div>
        </section>

        {/* DEMO FRANCESCA: NUVOLE + SCRATCH | DEMO ELENA: CITAZIONE D'AUTORE */}
        {isFrancesca ? (
          <PartingClouds>
            <ScratchDate day="14" month="Settembre" year="2026" />
          </PartingClouds>
        ) : (
          <div className="max-w-xl mx-auto px-6 text-center my-8">
            <div className="bg-white p-8 rounded-3xl border border-[#D4AF37]/30 shadow-md">
              <p className="font-serif italic text-lg text-[#1E293B] leading-relaxed">
                "Due anime, un solo destino. Una vita scritta nel cuore da condividere con chi amiamo."
              </p>
            </div>
          </div>
        )}

        {/* PLAYER AUDIO UNICO */}
        <section className="py-8 px-6 max-w-xl mx-auto text-center">
          <div className="bg-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-md">
            <Music className="w-6 h-6 text-[#8B1E24] mx-auto mb-2 animate-bounce" />
            <span className="text-[10px] text-[#8B1E24] uppercase tracking-widest font-bold">Colonna Sonora Inedita • FF Edizioni</span>
            <h3 className="font-serif text-xl my-1">La Nostra Melodia</h3>
            
            <button
              onClick={() => {
                const el = document.getElementById('love-wedding-audio') as HTMLAudioElement;
                if (el) {
                  if (el.paused) el.play();
                  else el.pause();
                }
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-[#8B1E24] text-white text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#6E1216]"
            >
              Play / Pausa Musica 🎵
            </button>
          </div>
        </section>

        {/* FORM DI CONFERMA PARTECIPAZIONE */}
        <section className="py-12 px-6">
          <RsvpForm experienceSlug={slug} />
        </section>

        {/* LINK CRONOLOGICO A "LA FESTA" IN FONDO ALLA PAGINA */}
        <section className="py-12 px-6 max-w-md mx-auto text-center border-t border-[#E2E8F0] mt-12">
          <div className="bg-white border-2 border-[#D4AF37] p-8 rounded-3xl shadow-lg">
            <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
            <h3 className="font-serif text-2xl text-[#1E293B] mb-2">La Festa</h3>
            <p className="text-xs text-[#64748B] mb-6">Il giorno delle nozze scatta foto e video dal tuo telefono per trasmetterle in tempo reale sul maxischermo del locale!</p>
            
            <Link
              href={`/${slug}/festa`}
              className="w-full py-3.5 rounded-xl bg-[#8B1E24] text-white font-bold text-xs uppercase tracking-widest block shadow-md hover:bg-[#6E1216]"
            >
              Apri Pagina della Festa 📸
            </Link>
          </div>
        </section>

      </div>
    </EnvelopeWax>
  );
}
