import EnvelopeWax from '@/components/EnvelopeWax';

export default function Home() {
  return (
    <EnvelopeWax
      initials="R & L"
      coupleNames="Renzo & Lucia"
      weddingDate="28 Settembre 2026"
    >
      {/* SITO REALE DEGLI SPOSI (CHE APPARE DOPO AVER APERTO LA BUSTA) */}
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <span className="text-amber-400 text-sm uppercase tracking-widest mb-2">
          Benvenuti al nostro Matrimonio
        </span>
        <h1 className="font-serif text-5xl sm:text-7xl font-light mb-6 text-amber-100">
          Renzo & Lucia
        </h1>
        <p className="max-w-md text-slate-300 text-lg font-light italic mb-8">
          "L'amore non guarda con gli occhi, ma con l'anima."
        </p>
        <div className="inline-flex gap-4">
          <button className="px-6 py-3 rounded-full bg-amber-500 text-slate-950 font-medium hover:bg-amber-400 transition-colors shadow-lg">
            Conferma Presenza (RSVP)
          </button>
        </div>
      </div>
    </EnvelopeWax>
  );
}
