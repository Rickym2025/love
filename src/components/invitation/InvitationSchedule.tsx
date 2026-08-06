"use client";

import React from "react";
import TimelineHowItWorks from "@/components/ui/TimelineHowItWorks";

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
}

export interface InvitationScheduleProps {
  schedule: string;
  scheduleItems: ScheduleItem[];
  accentColor: string;
  textColor: string;
  bgCard: string;
  borderCard: string;
}

export default function InvitationSchedule({
  schedule,
  scheduleItems,
  accentColor,
  textColor,
  bgCard,
  borderCard,
}: InvitationScheduleProps) {
  if (schedule === "howitworks") {
    return (
      <div className="p-6 rounded-3xl shadow-md border text-center space-y-3" style={{ backgroundColor: bgCard, borderColor: borderCard }}>
        <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: accentColor }}>
          📍 Programma della Giornata
        </span>
        <TimelineHowItWorks items={scheduleItems} accentColor={accentColor} />
      </div>
    );
  }

  if (schedule === "classico") {
    return (
      <div className="p-6 rounded-3xl shadow-md border text-center space-y-3" style={{ backgroundColor: bgCard, borderColor: borderCard }}>
        <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: accentColor }}>
          Programma della Giornata
        </span>
        <div className="space-y-2 text-sm font-serif pt-1" style={{ color: textColor }}>
          {scheduleItems.map((item) => (
            <p key={item.id}>
              <strong className="font-sans" style={{ color: accentColor }}>{item.time}</strong> — {item.title}
            </p>
          ))}
        </div>
      </div>
    );
  }

  if (schedule === "timeline") {
    return (
      <div className="p-6 rounded-3xl shadow-md border text-center space-y-3" style={{ backgroundColor: bgCard, borderColor: borderCard }}>
        <span className="text-xs font-bold uppercase tracking-wider block font-serif text-base" style={{ color: accentColor }}>
          📍 Timeline Verticale Orari
        </span>
        <div className="relative pl-6 space-y-3 text-left border-l-2 text-sm" style={{ borderColor: accentColor, color: textColor }}>
          {scheduleItems.map((item) => (
            <div key={item.id}>
              <span className="font-bold" style={{ color: accentColor }}>{item.time}</span> — {item.title}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (schedule === "schede") {
    return (
      <div className="grid grid-cols-2 gap-3 text-center text-xs">
        {scheduleItems.map((item) => (
          <div key={item.id} className="p-4 rounded-2xl border font-bold shadow-sm" style={{ backgroundColor: bgCard, borderColor: borderCard, color: textColor }}>
            <span className="block text-xs" style={{ color: accentColor }}>{item.time}</span> {item.title}
          </div>
        ))}
      </div>
    );
  }

  if (schedule === "minimal") {
    return (
      <div className="p-4 text-center space-y-2 font-serif text-sm bg-white/60 rounded-3xl border border-slate-200" style={{ color: textColor }}>
        {scheduleItems.map((item) => (
          <p key={item.id}>
            <strong className="font-sans" style={{ color: accentColor }}>{item.time}</strong> • {item.title}
          </p>
        ))}
      </div>
    );
  }

  return null;
}
