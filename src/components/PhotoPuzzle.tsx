"use client";

import React, { useState, useEffect } from "react";
import { Puzzle, CheckCircle2, RefreshCw, Trophy, X, Gift } from "lucide-react";

export interface PhotoPuzzleProps {
  imageSrc?: string;
  puzzlePrize?: string;
}

export default function PhotoPuzzle({
  imageSrc = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
  puzzlePrize = "💃 Hai vinto un ballo speciale con la Sposa!",
}: PhotoPuzzleProps) {
  const initialTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [showPrizeModal, setShowPrizeModal] = useState(false);

  const photoUrl = imageSrc || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80";

  const shuffleTiles = () => {
    const shuffled = [...initialTiles].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setIsSolved(false);
    setSelectedIdx(null);
    setShowPrizeModal(false);
  };

  useEffect(() => {
    shuffleTiles();
  }, [imageSrc]);

  const handleTileClick = (index: number) => {
    if (isSolved) return;

    if (selectedIdx === null) {
      setSelectedIdx(index);
    } else {
      const newTiles = [...tiles];
      const temp = newTiles[selectedIdx];
      newTiles[selectedIdx] = newTiles[index];
      newTiles[index] = temp;

      setTiles(newTiles);
      setSelectedIdx(null);

      const solved = newTiles.every((val, i) => val === i);
      if (solved) {
        setIsSolved(true);
        setShowPrizeModal(true);
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 text-white p-4 md:p-5 rounded-3xl border-2 border-[#D4AF37] shadow-2xl text-center space-y-3 relative">
      <div className="flex justify-between items-center border-b border-slate-800 pb-2.5">
        <h4 className="text-xs md:text-sm font-serif font-bold text-[#D4AF37] flex items-center gap-1.5 uppercase tracking-wider">
          <Puzzle className="w-4 h-4 text-[#D4AF37]" /> Puzzle 3x3 degli Sposi
        </h4>
        <button
          type="button"
          onClick={shuffleTiles}
          className="px-2.5 py-1 bg-slate-800 text-[#D4AF37] border border-[#D4AF37]/50 rounded-xl text-[10px] md:text-xs font-bold flex items-center gap-1 hover:bg-slate-700 cursor-pointer transition-all"
        >
          <RefreshCw className="w-3 h-3" /> Mescola
        </button>
      </div>

      {isSolved ? (
        <div className="p-3 bg-emerald-950/80 rounded-2xl border border-emerald-500 text-emerald-200 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2 text-left">
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h5 className="font-serif font-bold text-xs text-white">Puzzle Risolto!</h5>
              <p className="text-[10px] text-emerald-300">Complimenti! Hai ricomposto la foto!</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPrizeModal(true)}
            className="px-3 py-1.5 bg-[#D4AF37] text-slate-950 font-bold text-[10px] rounded-lg shadow-md hover:bg-amber-400 cursor-pointer"
          >
            🎁 Vedi Premio
          </button>
        </div>
      ) : (
        <p className="text-[11px] font-serif italic text-slate-300">
          Tocca due tessere per scambiarle di posto e ricomporre la foto!
        </p>
      )}

      {/* GRIGLIA PUZZLE QUADRATA PROPORZIONATA (ASPECT-SQUARE) */}
      <div className="w-full aspect-square max-w-[280px] sm:max-w-[320px] md:max-w-[380px] mx-auto grid grid-cols-3 gap-1.5 rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-black p-1.5 shadow-inner relative">
        {tiles.map((tilePos, currentIdx) => {
          const row = Math.floor(tilePos / 3);
          const col = tilePos % 3;
          const isSelected = selectedIdx === currentIdx;

          return (
            <div
              key={currentIdx}
              onClick={() => handleTileClick(currentIdx)}
              className={`relative w-full h-full cursor-pointer overflow-hidden rounded-xl transition-all duration-200 ${
                isSelected ? "ring-4 ring-[#D4AF37] scale-95 z-20 shadow-2xl" : "hover:opacity-90"
              }`}
            >
              <div
                className="w-[300%] h-[300%] absolute"
                style={{
                  backgroundImage: `url(${photoUrl})`,
                  backgroundSize: "300% 300%",
                  backgroundPosition: `${col * 50}% ${row * 50}%`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* POPUP POP-UP DI VITTORIA CON IL PREMIO IMPOSTATO IN DASHBOARD */}
      {showPrizeModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="max-w-sm w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-2 border-[#D4AF37] p-6 rounded-3xl text-center space-y-4 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowPrizeModal(false)}
              className="absolute top-3 right-3 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-14 h-14 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-full flex items-center justify-center mx-auto text-[#D4AF37]">
              <Trophy className="w-8 h-8 animate-bounce" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">🎉 COMPLIMENTI!</span>
              <h4 className="text-lg font-serif font-bold text-white">Puzzle Completato con Successo!</h4>
            </div>

            <div className="p-4 bg-slate-950/80 rounded-2xl border border-[#D4AF37]/50 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block flex items-center justify-center gap-1">
                <Gift className="w-3.5 h-3.5 text-[#D4AF37]" /> IL TUO PREMIO D&apos;AMORE:
              </span>
              <p className="text-sm font-serif font-bold text-amber-300 leading-snug">
                {puzzlePrize || "💃 Hai vinto un ballo speciale con la Sposa!"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowPrizeModal(false)}
              className="w-full py-3 bg-[#D4AF37] text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-lg cursor-pointer"
            >
              ✦ Ritira Premio &amp; Continua la Festa
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
