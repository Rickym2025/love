"use client";

import React, { useState, useEffect } from "react";
import { Puzzle, CheckCircle2, RefreshCw } from "lucide-react";

export interface PhotoPuzzleProps {
  imageSrc?: string;
}

export default function PhotoPuzzle({
  imageSrc = "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
}: PhotoPuzzleProps) {
  // PUZZLE 3x3 (9 TESSERE)
  const initialTiles = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isSolved, setIsSolved] = useState(false);

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
      // SCAMBIO TESSERE
      const newTiles = [...tiles];
      const temp = newTiles[selectedIdx];
      newTiles[selectedIdx] = newTiles[index];
      newTiles[index] = temp;

      setTiles(newTiles);
      setSelectedIdx(null);

      // VERIFICA VITTORIA
      const solved = newTiles.every((val, i) => val === i);
      if (solved) {
        setIsSolved(true);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-5 rounded-3xl border-2 border-[#D4AF37] shadow-xl text-center space-y-4">
      <div className="flex justify-between items-center border-b border-slate-100 pb-2">
        <h4 className="text-xs font-serif font-bold text-[#8B6508] flex items-center gap-1.5 uppercase">
          <Puzzle className="w-4 h-4 text-[#D4AF37]" /> Puzzle 3x3 degli Sposi
        </h4>
        <button
          type="button"
          onClick={shuffleTiles}
          className="p-1.5 bg-[#FAF7F2] text-[#8B6508] border border-[#D4AF37]/40 rounded-lg text-[10px] font-bold flex items-center gap-1 hover:bg-amber-100 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" /> Mescola
        </button>
      </div>

      {isSolved ? (
        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-300 text-emerald-800 space-y-2 animate-fade-in">
          <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-600" />
          <h5 className="font-serif font-bold text-base">Complimenti! Puzzle Risolto!</h5>
          <p className="text-xs font-serif">Hai ricomposto la foto del matrimonio degli sposi!</p>
        </div>
      ) : (
        <p className="text-[11px] font-serif italic text-slate-600">
          Tocca due tessere per scambiarle di posto e ricomporre l&apos;immagine!
        </p>
      )}

      {/* GRIGLIA PUZZLE INGRANDITA (h-72 / h-80) */}
      <div className="grid grid-cols-3 gap-1.5 w-full h-72 rounded-2xl overflow-hidden border-2 border-[#D4AF37] bg-slate-900 p-1 shadow-inner">
        {tiles.map((tilePos, currentIdx) => {
          const row = Math.floor(tilePos / 3);
          const col = tilePos % 3;
          const isSelected = selectedIdx === currentIdx;

          return (
            <div
              key={currentIdx}
              onClick={() => handleTileClick(currentIdx)}
              className={`relative w-full h-full cursor-pointer overflow-hidden rounded-xl transition-all duration-200 ${
                isSelected ? "ring-4 ring-[#D4AF37] scale-95 z-20 shadow-lg" : "hover:opacity-90"
              }`}
            >
              <div
                className="w-[300%] h-[300%] absolute"
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: "300% 300%",
                  left: `-${col * 100}%`,
                  top: `-${row * 100}%`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
