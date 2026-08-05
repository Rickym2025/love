"use client";

import React, { useState } from "react";

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
}

const DEFAULT_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Dove si sono conosciuti gli sposi?",
    options: ["In università", "Al mare in estate", "Tramite amici comuni", "In viaggio"],
    correct: 2,
  },
  {
    id: 2,
    question: "Chi ha fatto la proposta di matrimonio?",
    options: ["Davide durante una cena", "Elena durante un viaggio", "Insieme di comune accordo", "A sorpresa a Parigi"],
    correct: 0,
  },
];

export default function LoveQuiz({ questions = DEFAULT_QUESTIONS }: { questions?: Question[] }) {
  const safeQuestions = Array.isArray(questions) && questions.length > 0 ? questions : DEFAULT_QUESTIONS;
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleAnswer = (index: number) => {
    if (index === safeQuestions[current].correct) {
      setScore(score + 1);
    }
    if (current + 1 < safeQuestions.length) {
      setCurrent(current + 1);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div className="p-4 bg-slate-900 text-white rounded-2xl text-center space-y-2 border border-[#D4AF37]/40">
        <span className="text-xl">🏆</span>
        <h4 className="font-serif font-bold text-sm text-[#D4AF37]">Quiz Completato!</h4>
        <p className="text-xs text-slate-300">Hai risposto correttamente a {score} domande su {safeQuestions.length}.</p>
      </div>
    );
  }

  const q = safeQuestions[current];

  return (
    <div className="p-4 bg-slate-900 text-white rounded-2xl text-center space-y-3 border border-[#D4AF37]/40">
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] block">
        Domanda {current + 1} di {safeQuestions.length}
      </span>
      <p className="font-serif font-bold text-xs text-slate-100">{q.question}</p>
      <div className="grid grid-cols-1 gap-1.5 pt-1">
        {(q.options || []).map((opt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleAnswer(idx)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-bold border border-slate-700 transition-all text-left px-3"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
