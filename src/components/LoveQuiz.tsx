"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle2, XCircle, RefreshCw, Trophy } from "lucide-react";

export interface QuizQuestionItem {
  id?: string;
  question: string;
  answer: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  correctOptionIdx?: number;
}

export interface LoveQuizProps {
  questions?: QuizQuestionItem[];
}

export default function LoveQuiz({
  questions = [
    {
      id: "1",
      question: "Dove ci siamo conosciuti per la prima volta?",
      answer: "In università",
      optionA: "In università",
      optionB: "In discoteca",
      optionC: "Al mare in vacanza",
      optionD: "Tramite amici comuni",
      correctOptionIdx: 0,
    },
    {
      id: "2",
      question: "Chi ha fatto la proposta di nozze?",
      answer: "Davide",
      optionA: "Elena",
      optionB: "Davide",
      optionC: "Insieme a Parigi",
      optionD: "I genitori",
      correctOptionIdx: 1,
    },
  ],
}: LoveQuizProps) {
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const activeQuestion = questions[currentQIdx] || questions[0];

  const optionsList = [
    activeQuestion.optionA || activeQuestion.answer || "Opzione A",
    activeQuestion.optionB || "In viaggio",
    activeQuestion.optionC || "A cena",
    activeQuestion.optionD || "In vacanza",
  ];

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    const isCorrect = idx === (activeQuestion.correctOptionIdx ?? 0);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQIdx < questions.length - 1) {
        setCurrentQIdx((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        setIsFinished(true);
      }
    }, 1200);
  };

  const restartQuiz = () => {
    setCurrentQIdx(0);
    setSelectedOption(null);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-slate-900 text-white p-5 rounded-3xl border-2 border-[#D4AF37] shadow-xl text-center space-y-4">
      <div className="flex justify-between items-center border-b border-slate-700 pb-2">
        <h4 className="text-xs font-serif font-bold text-[#D4AF37] flex items-center gap-1.5 uppercase">
          <HelpCircle className="w-4 h-4 text-[#D4AF37]" /> Quiz degli Sposi
        </h4>
        <span className="text-[10px] font-mono font-bold text-slate-300">
          {currentQIdx + 1} / {questions.length}
        </span>
      </div>

      {isFinished ? (
        <div className="p-6 bg-slate-800 rounded-2xl border border-[#D4AF37] space-y-3 animate-fade-in">
          <Trophy className="w-10 h-10 mx-auto text-[#D4AF37]" />
          <h5 className="font-serif font-bold text-base text-white">Quiz Completato!</h5>
          <p className="text-xs text-slate-300">
            Hai indovinato <strong className="text-[#D4AF37] text-sm">{score}</strong> risposte su {questions.length}!
          </p>
          <button
            type="button"
            onClick={restartQuiz}
            className="px-4 py-2 bg-[#D4AF37] text-slate-900 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-1 mx-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Gioca di Nuovo
          </button>
        </div>
      ) : (
        <div className="space-y-4 text-left">
          <h5 className="text-sm font-serif font-bold text-white text-center leading-snug">
            {activeQuestion.question}
          </h5>

          {/* 4 OPZIONI INTERATTIVE A, B, C, D */}
          <div className="grid grid-cols-1 gap-2 pt-1">
            {optionsList.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === (activeQuestion.correctOptionIdx ?? 0);

              let buttonStyle = "bg-slate-800 text-slate-200 border-slate-700 hover:border-[#D4AF37]";
              if (selectedOption !== null) {
                if (isCorrect) {
                  buttonStyle = "bg-emerald-600 text-white border-emerald-500 shadow-md";
                } else if (isSelected) {
                  buttonStyle = "bg-rose-600 text-white border-rose-500 shadow-md";
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={selectedOption !== null}
                  onClick={() => handleSelectOption(idx)}
                  className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all cursor-pointer ${buttonStyle}`}
                >
                  <span>{String.fromCharCode(65 + idx)}. {opt}</span>
                  {selectedOption !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                  {selectedOption !== null && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
