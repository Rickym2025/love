'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle2, Heart } from 'lucide-react';

export default function LoveQuiz({ coupleNames = 'Elena & Davide' }: { coupleNames?: string }) {
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const questions = [
    {
      q: 'Dove si sono conosciuti per la prima volta?',
      options: ['In università', 'Al mare in vacanza', 'Ad una festa di amici'],
      correct: 1,
    },
    {
      q: 'Chi ha fatto la proposta di matrimonio?',
      options: [coupleNames.split('&')[0].trim(), coupleNames.split('&')[1].trim(), 'Insieme a Parigi!'],
      correct: 1,
    },
    {
      q: 'Qual è la loro destinazione per il viaggio di nozze?',
      options: ['Giappone', 'Polinesia', 'Maldive'],
      correct: 0,
    },
  ];

  const handleSelect = (qIdx: number, optIdx: number) => {
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const calculateScore = () => {
    let pts = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correct) pts++;
    });
    setScore(pts);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#8B1E24', '#ffffff'],
    });
  };

  return (
    <div className="bg-white border border-[#E5DACB] p-8 rounded-3xl shadow-md max-w-xl mx-auto my-12 text-center">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider mb-3">
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
        Love Quiz
      </div>
      <h3 className="font-serif text-2xl text-[#4A3D39] mb-6">Quanto conosci {coupleNames}?</h3>

      {score === null ? (
        <div className="space-y-6 text-left">
          {questions.map((q, qIdx) => (
            <div key={qIdx} className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E5DACB]">
              <p className="font-serif text-sm font-bold text-[#4A3D39] mb-3">{i + 1}. {q.q}</p>
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleSelect(qIdx, optIdx)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      answers[qIdx] === optIdx
                        ? 'bg-[#8B1E24] text-white font-bold'
                        : 'bg-white border border-[#E5DACB] text-[#4A3D39] hover:border-[#8B1E24]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={calculateScore}
            disabled={Object.keys(answers).length < questions.length}
            className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#B59226] transition-all shadow-md disabled:opacity-40"
          >
            Scopri il Punteggio 🎉
          </button>
        </div>
      ) : (
        <div className="py-6">
          <Heart className="w-12 h-12 text-[#8B1E24] fill-[#8B1E24] mx-auto mb-3 animate-bounce" />
          <h4 className="font-serif text-2xl text-[#4A3D39] mb-2">Risultato: {score} su 3 Corrette!</h4>
          <p className="text-xs text-[#9E8976] italic">
            {score === 3 ? 'Sei un vero esperto della coppia!' : 'Conosci bene la loro storia, ora non resta che festeggiare!'}
          </p>
        </div>
      )}
    </div>
  );
}
