'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

export default function PhotoPuzzle({
  photoUrl = 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop',
  onWin,
}: {
  photoUrl?: string;
  onWin?: () => void;
}) {
  const [tiles, setTiles] = useState([2, 0, 1, 5, 3, 4, 6, 7, 8]);
  const [isSolved, setIsSolved] = useState(false);

  const swapTiles = (index: number) => {
    if (isSolved) return;
    const newTiles = [...tiles];
    const emptyIndex = newTiles.indexOf(8);

    // Controlla se il tassello è adiacente allo spazio vuoto
    const isAdjacent =
      (Math.abs(index - emptyIndex) === 1 && Math.floor(index / 3) === Math.floor(emptyIndex / 3)) ||
      Math.abs(index - emptyIndex) === 3;

    if (isAdjacent) {
      newTiles[emptyIndex] = newTiles[index];
      newTiles[index] = 8;
      setTiles(newTiles);

      // Verifica se risolto
      const solved = newTiles.every((val, idx) => val === idx);
      if (solved) {
        setIsSolved(true);
        confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        if (onWin) onWin();
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-[#E2E8F0] shadow-md max-w-xs mx-auto text-center">
      <p className="font-serif text-lg font-bold text-[#1E293B] mb-1">Puzzle Foto Sposi</p>
      <p className="text-xs text-[#64748B] mb-4">Clicca sui tasselli per ricomporre la foto!</p>

      <div className="grid grid-cols-3 gap-1 w-64 h-64 mx-auto rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-slate-200">
        {tiles.map((tileVal, idx) => {
          if (tileVal === 8) {
            return <div key={idx} className="bg-slate-100" />;
          }
          const row = Math.floor(tileVal / 3);
          const col = tileVal % 3;

          return (
            <button
              key={idx}
              onClick={() => swapTiles(idx)}
              className="relative w-full h-full overflow-hidden border border-white focus:outline-none transition-transform active:scale-95"
            >
              <div
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${photoUrl})`,
                  backgroundSize: '192px 192px',
                  backgroundPosition: `-${col * 64}px -${row * 64}px`,
                }}
              />
            </button>
          );
        })}
      </div>

      {isSolved && (
        <p className="text-xs font-bold text-emerald-600 mt-4 animate-bounce">
          🎉 Puzzle Risolto con successo!
        </p>
      )}
    </div>
  );
}
