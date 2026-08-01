import EnvelopeWax from '@/components/EnvelopeWax';

export default function Home() {
  return (
    <EnvelopeWax
      initials="R & L"
      coupleNames="Renzo & Lucia"
      weddingDate="28 Settembre 2026"
    >
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center">
        <span className="text-amber-400 text-xs sm:text-sm uppercase tracking-widest mb-2 font-medium">
          Benvenuti al nostro Matrimonio
        </span>
        <h1 className="font-serif text-4xl sm:text-7xl font-light mb-6 text-amber-100">
          Renzo & Lucia
        </h1>
        <p className="max-w-md text-slate-300 text-base sm:text-lg font-light italic mb-8">
          "L'amore non guarda con gli occhi, ma con l'anima."
        </p>
        <button className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-medium hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg shadow-amber-500/20 active:scale-95">
          Conferma Presenza (RSVP)
        </button>
      </div>
    </EnvelopeWax>
  );
}
