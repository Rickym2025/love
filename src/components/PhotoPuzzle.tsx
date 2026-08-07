"use client";

import React, { useState, useEffect } from "react";
import { Puzzle, CheckCircle2, RefreshCw } from "lucide-react";

export interface PhotoPuzzleProps {
  imageSrc?: string;
}

export default function PhotoPuzzle({
  imageSrc = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
}: PhotoPuzzleProps) {
  const initialTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  // IMMAGINE DI DEFAULT LUMINOSA E CHIARA DEGLI SPOSI IN ABITO DA CERIMONIA
  const photoUrl = imageSrc || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80";

  const shuffleTiles = () => {
    const shuffled = [...initialTiles].sort(() => Math.random() - 0.5);
    setTiles(shuffled);
    setIsSolved(false);
    setSelectedIdx(null);
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
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-slate-900 text-white p-4 md:p-5 rounded-3xl border-2 border-[#D4AF37] shadow-2xl text-center space-y-3">
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
        <div className="p-4 bg-emerald-950/80 rounded-2xl border-2 border-emerald-500 text-emerald-200 space-y-1 animate-fade-in">
          <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-400" />
          <h5 className="font-serif font-bold text-sm text-white">Complimenti! Puzzle Risolto!</h5>
          <p className="text-[11px] font-serif text-emerald-300">Hai ricomposto perfettamente la foto degli sposi!</p>
        </div>
      ) : (
        <p className="text-[11px] font-serif italic text-slate-300">
          Tocca due tessere per scambiarle di posto e ricomporre la foto!
        </p>
      )}

      {/* GRIGLIA PUZZLE PROPORZIONATA PER DISPOSITIVI MOBILI */}
      <div className="grid grid-cols-3 gap-1.5 w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-black p-1 shadow-inner relative">
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
    </div>
  );
}
