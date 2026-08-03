{/* ─── ANTEPRIMA LIVE REALE DELL'INVITO ─── */}
<div className="flex-1 p-6 bg-[#1E293B] flex flex-col items-center justify-center">
  <div className="flex justify-between items-center w-full max-w-[320px] mb-3 text-white">
    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
      Anteprima Reale Invito
    </span>
    <a href="/elena-e-davide" target="_blank" className="text-[11px] text-slate-300 hover:text-white">
      Apri Fullscreen ↗
    </a>
  </div>

  {/* Frame Smartphone Reattivo */}
  <div className="w-[320px] h-[580px] rounded-[40px] border-8 border-slate-800 bg-[#FAF7F2] text-[#1E293B] shadow-2xl overflow-y-auto">
    
    {/* 1. MODULO BUSTA E SIGILLO CERALACCA */}
    {modules.envelope && (
      <div className="m-3 p-4 bg-[#F5EFE6] rounded-2xl border border-[#D4AF37]/30 text-center relative shadow-sm">
        <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest block mb-1">
          ✦ Busta d'Epoca & Sigillo
        </span>
        <p className="font-serif font-bold text-sm">{coupleNames}</p>
        <div className="relative w-12 h-12 mx-auto my-2">
          <img src="/wax-seal.png" alt="Sigillo" className="w-full h-full object-contain" />
        </div>
        <span className="text-[9px] uppercase font-bold text-slate-500 animate-pulse">Tocca per Aprire</span>
      </div>
    )}

    {/* 2. INTRO HERO CON EFFETTO ACQUA (WATER RIPPLE) */}
    <div className={`p-6 text-center relative ${modules.waterRipple ? "bg-gradient-to-b from-blue-50 to-[#FAF7F2]" : ""}`}>
      {modules.waterRipple && (
        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-1">
          💧 Effetto Rifrazione Acqua Attivo
        </span>
      )}
      <span className="text-[10px] tracking-widest uppercase font-semibold text-[#D4AF37]">Wedding Day</span>
      <h3 className="text-2xl font-serif font-bold mt-1">{coupleNames}</h3>
      <p className="text-xs italic mt-2 font-serif opacity-80">&quot;{welcomePhrase}&quot;</p>
      <p className="text-xs font-bold mt-2 text-[#D4AF37]">{locationName}</p>
    </div>

    {/* 3. MODULO GRATTA LA DATA (SCRATCH DATE) */}
    {modules.scratchDate && (
      <div className="my-4 mx-3 p-3 bg-white rounded-xl text-center border border-slate-200 shadow-sm">
        <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-2">🎰 Gratta per Scoprire la Data</span>
        <div className="flex justify-center gap-2">
          <div className="w-14 h-12 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-center text-xs font-bold">24</div>
          <div className="w-14 h-12 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-center text-xs font-bold">MAG</div>
          <div className="w-14 h-12 bg-amber-50 rounded-lg border border-amber-200 flex items-center justify-center text-xs font-bold">2026</div>
        </div>
      </div>
    )}

    {/* 4. MODULO NUVOLE (PARTING CLOUDS SCHEDULE) */}
    {modules.clouds && (
      <div className="mx-3 my-4 p-3 bg-sky-50/80 rounded-xl border border-sky-200 text-xs">
        <span className="text-[10px] font-bold text-sky-700 uppercase block text-center mb-1">☁️ Effetto Nuvole Programma</span>
        <div className="space-y-1 text-[11px] text-slate-700">
          <p>16:30 — Arrivo Ospiti a Villa del Balbianello</p>
          <p>17:30 — Cerimonia e Scambio degli Anelli</p>
          <p>19:00 — Aperitivo & Festa di Nozze</p>
        </div>
      </div>
    )}

    {/* 5. MODULO GUEST PHOTO WALL */}
    {modules.photoWall && (
      <div className="mx-3 my-4 p-3 bg-white rounded-xl border border-slate-200 text-center">
        <span className="text-[10px] font-bold text-[#D4AF37] uppercase block mb-1">📸 Photo Wall della Festa (10 Filtri)</span>
        <p className="text-[11px] text-slate-500">Gli ospiti possono scattare e proiettare foto dal vivo sul maxischermo!</p>
      </div>
    )}

    {/* BOTTONE CONFERMA PARTECIPAZIONE */}
    <div className="p-4">
      <button className="w-full py-3 bg-[#D4AF37] text-slate-900 font-bold rounded-full text-xs shadow-md uppercase tracking-wider">
        Conferma Partecipazione
      </button>
    </div>
  </div>
</div>
