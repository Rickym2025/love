"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, Music } from "lucide-react";

interface AudioPlayerProps {
  audioUrl?: string;
  songTitle?: string;
}

export default function AudioPlayer({
  audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  songTitle = "Brano Inedito per gli Sposi — FF Edizioni",
}: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = document.getElementById("love-wedding-audio") as HTMLAudioElement;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const togglePlay = () => {
    const audio = document.getElementById("love-wedding-audio") as HTMLAudioElement;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => console.log("Riproduzione interrotta:", err));
    }
  };

  return (
    <>
      {/* Tag Audio Condiviso in Tutta la Pagina */}
      <audio id="love-wedding-audio" src={audioUrl} preload="auto" loop />

      {/* Widget Player Fisso in Basso a Destra */}
      <div className="fixed bottom-6 right-6 z-40 bg-[#1E293B]/90 backdrop-blur-md text-white border border-[#D4AF37]/40 px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-3 select-none">
        <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-slate-900 font-bold">
          <Music className={`w-4 h-4 ${isPlaying ? "animate-spin" : ""}`} />
        </div>

        <div className="text-left hidden sm:block max-w-[200px] truncate">
          <p className="text-[10px] uppercase font-bold text-[#D4AF37]">Colonna Sonora</p>
          <p className="text-xs text-slate-200 truncate font-serif">{songTitle}</p>
        </div>

        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-[#D4AF37] transition"
          title={isPlaying ? "Metti in Pausa" : "Riproduci Musica"}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
      </div>
    </>
  );
}
