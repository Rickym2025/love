import React from 'react';
import { supabase } from '@/lib/supabase';
import EnvelopeWax from '@/components/EnvelopeWax';
import ScratchDate from '@/components/ScratchDate';
import RsvpForm from '@/components/RsvpForm';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { AnimatedGradient } from '@/components/ui/animated-gradient';
import KineticGrid from '@/components/ui/kinetic-grid';
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
      <KineticGrid className={`min-h-screen ${isBlueTheme ? 'bg-[#F0F7FF] text-[#2C3E50]' : 'bg-[#FAF7F2] text-[#4A3D39]'} pb-20 relative overflow-hidden`}>
        
        {/* HERO SCENICA CON ANIMATED GRADIENT AURORA */}
        <section className="relative py-20 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
          
          <AnimatedGradient config={{ preset: isBlueTheme ? 'SkyBlue' : 'WarmGold' }} radius="100px" className="px-5 py-2 mb-6">
            <div className="inline-flex items-center gap-2 text-[#8B1E24] text-xs font-semibold uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5 fill-[#8B1E24]" />
              <span>Benvenuto/a {guestName}!</span>
            </div>
          </AnimatedGradient>

          <p className="font-serif italic text-[#D4AF37] text-2xl mb-2">Getting Married!</p>
          <h1 className="font-serif text-5xl sm:text-7xl font-normal mb-4 tracking-wide">
            {experience.couple_names}
          </h1>
          <p className="text-[#78909C] text-xs tracking-widest uppercase mb-10">
            {experience.wedding_date}
          </p>

          <div className="bg-white/90 p-8 rounded-3xl border border-[#D4AF37]/30 max-w-xl mx-auto shadow-md relative mb-12">
            <p className="font-serif italic text-lg sm:text-xl text-[#37474F] leading-relaxed">
              "Due anime, un solo destino. Una vita scritta nel cuore da condividere con chi amiamo."
            </p>
          </div>

          <ScratchDate day="14" month="Settembre" year="2026" />
        </section>

        {/* COMPONENTE 3D CONTAINER SCROLL DENTRO LA DEMO */}
        <section className="-mt-16 mb-12">
          <ContainerScroll
            titleComponent={
              <div className="flex flex-col items-center mb-6">
                <span className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold mb-2">
                  La Nostra Favola
                </span>
                <h3 className="text-3xl font-serif text-[#4A3D39]">
                  {experience.location_name}
                </h3>
              </div>
            }
          >
            <img
              src={isBlueTheme ? "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1600&auto=format&fit=crop" : "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1600&auto=format&fit=crop"}
              alt="Location Matrimonio"
              className="w-full h-full object-cover rounded-2xl"
            />
          </ContainerScroll>
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

        {/* PROGRAMMA DEGLI EVENTI */}
        <section className="py-16 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-10">Schedule of Events</h2>
          
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-[#D4AF37]/40">
            
            <div className="relative z-10 bg-white border border-[#E5DACB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#D4AF37] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> 16:30
              </span>
              <h3 className="font-serif text-lg mb-1">Guest Arrival</h3>
              <p className="text-xs text-[#78909C]">Accoglienza invitati e aperitivo di benvenuto</p>
            </div>

            <div className="relative z-10 bg-white border border-[#E5DACB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#8B1E24] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> 17:00
              </span>
              <h3 className="font-serif text-lg mb-1">Cerimonia</h3>
              <p className="text-xs text-[#78909C]">{experience.location_name}</p>
            </div>

            <div className="relative z-10 bg-white border border-[#E5DACB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#D4AF37] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> 18:00
              </span>
              <h3 className="font-serif text-lg mb-1">Cocktail & Dancing</h3>
              <p className="text-xs text-[#78909C]">Brindisi al tramonto e musica dal vivo</p>
            </div>

            <div className="relative z-10 bg-white border border-[#E5DACB] rounded-2xl p-6 max-w-sm mx-auto shadow-sm">
              <span className="inline-flex items-center gap-1 text-[#8B1E24] text-xs font-bold uppercase mb-1">
                <Clock className="w-3.5 h-3.5" /> 21:00
              </span>
              <h3 className="font-serif text-lg mb-1">Party & Open Bar</h3>
              <p className="text-xs text-[#78909C]">Taglio torta e festeggiamenti</p>
            </div>

          </div>
        </section>

        {/* DRESS CODE & PALETTE COLORI */}
        <section className="py-16 px-6 max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-3">Dress Code & Palette</h2>
          <p className="text-xs text-[#78909C] max-w-md mx-auto mb-8">
            Vi chiediamo gentilmente di ispirarvi alla palette colori dell'evento:
          </p>

          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D8CBB7] shadow-sm" />
            <span className="w-8 h-8 rounded-full bg-[#F5E6D3] border border-[#D8CBB7] shadow-sm" />
            <span className="w-8 h-8 rounded-full bg-[#F2C4CE] border border-[#D8CBB7] shadow-sm" />
            <span className="w-8 h-8 rounded-full bg-[#BBDEFB] border border-[#D8CBB7] shadow-sm" />
            <span className="w-8 h-8 rounded-full bg-[#64B5F6] border border-[#D8CBB7] shadow-sm" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&q=80" alt="Outfit 1" className="w-full h-48 object-cover rounded-2xl shadow-sm" />
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&q=80" alt="Outfit 2" className="w-full h-48 object-cover rounded-2xl shadow-sm" />
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80" alt="Outfit 3" className="w-full h-48 object-cover rounded-2xl shadow-sm" />
            <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&q=80" alt="Outfit 4" className="w-full h-48 object-cover rounded-2xl shadow-sm" />
          </div>
        </section>

        {/* LISTA NOZZE */}
        <section className="py-12 px-6 max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-2">Lista Nozze & Regali</h2>
          <p className="text-xs text-[#78909C] max-w-md mx-auto mb-8">
            La vostra presenza è il dono più grande. Per chi desiderasse farci un pensiero:
          </p>

          <div className="bg-white p-6 rounded-2xl border border-[#E5DACB] shadow-sm text-center max-w-md mx-auto">
            <Gift className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
            <h4 className="font-serif text-lg mb-1">Lista Nozze Amazon</h4>
            <a
              href="https://www.amazon.it/baby-reg/homepage?tag=zero100store-21"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-[#D4AF37] text-white hover:bg-[#B59226] transition-all text-xs font-bold uppercase tracking-wider block mt-4 shadow-sm"
            >
              Apri Lista Nozze Amazon ↗
            </a>
          </div>
        </section>

        {/* FORM DI CONFERMA PARTECIPAZIONE */}
        <section className="py-12 px-6">
          <RsvpForm experienceSlug={slug} />
        </section>

        <footer className="pt-16 pb-8 text-center text-xs text-[#78909C]">
          <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37] mx-auto mb-2" />
          <p>{experience.couple_names} • {experience.wedding_date}</p>
          <p className="mt-1 opacity-60">Powered by LOVE • RM Studio</p>
        </footer>

      </KineticGrid>
    </EnvelopeWax>
  );
}
