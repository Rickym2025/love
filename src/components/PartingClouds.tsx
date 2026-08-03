"use client";

import React from "react";

// Interfaccia con children opzionale
export interface PartingCloudsProps {
  children?: React.ReactNode;
}

export default function PartingClouds({ children }: PartingCloudsProps) {
  return (
    <div className="relative overflow-hidden w-full py-8 text-center">
      {/* Effetto Visivo Nuvole 3D */}
      <div className="max-w-xl mx-auto p-6 bg-sky-50/80 rounded-3xl border border-sky-200/80 shadow-lg backdrop-blur-sm">
        <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
          ☁️ Programma tra le Nuvole ☁️
        </span>
        {children || (
          <p className="text-xs text-slate-600 italic">
            Scorri per vedere le nuvole scostarsi al passaggio dell&apos;orario della cerimonia!
          </p>
        )}
      </div>
    </div>
  );
}
