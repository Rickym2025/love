"use client";

import React, { useState, useEffect } from "react";
import { Puzzle, CheckCircle2, RefreshCw } from "lucide-react";

export interface PhotoPuzzleProps {
  imageSrc?: string;
}

export default function PhotoPuzzle({
  imageSrc = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
}: PhotoPuzzleProps) {
  const initialTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

  const photoUrl = imageSrc || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80";

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
    <div className="w-full max-w-lg mx-auto bg-slate-900 text-white p-5 rounded-3xl border-2 border-[#D4AF37] shadow-2xl text-center space-y-4">
      <div className="flex justify-between items-center border-b border-slate-800 pb-3">
        <h4 className="text-sm font-serif font-bold text-[#D4AF37] flex items-center gap-2 uppercase tracking-wider">
          <Puzzle className="w-5 h-5 text-[#D4AF37]" /> Puzzle 3x3 degli Sposi
        </h4>
        <button
          type="button"
          onClick={shuffleTiles}
          className="px-3 py-1.5 bg-slate-800 text-[#D4AF37] border border-[#D4AF37]/50 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-slate-700 cursor-pointer transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Mescola
        </button>
      </div>

      {isSolved ? (
        <div className="p-6 bg-emerald-950/80 rounded-2xl border-2 border-emerald-500 text-emerald-200 space-y-2 animate-fade-in">
          <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-400" />
          <h5 className="font-serif font-bold text-lg text-white">Complimenti! Puzzle Risolto!</h5>
          <p className="text-xs font-serif text-emerald-300">Hai ricomposto perfettamente la foto degli sposi!</p>
        </div>
      ) : (
        <p className="text-xs font-serif italic text-slate-300">
          Tocca due tessere per scambiarle di posto e ricomporre la foto!
        </p>
      )}

      {/* GRIGLIA PUZZLE HD */}
      <div className="grid grid-cols-3 gap-1.5 w-full h-80 md:h-96 rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-black p-1.5 shadow-inner relative">
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
