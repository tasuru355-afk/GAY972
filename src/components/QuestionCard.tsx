import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, Clock, ArrowRight, Lightbulb, Bot, SkipForward } from 'lucide-react';
import { Question, TeamColor } from '../types';

interface QuestionCardProps {
  teamColor: TeamColor;
  teamName: string;
  questionNumber: number;
  totalQuestions: number;
  question: Question;
  timeLimit: number; // in seconds, 0 = unlimited
  isBot?: boolean;
  disabled?: boolean;
  isTurnActive?: boolean;
  onAnswer: (selectedIndex: number, isCorrect: boolean) => void;
  onNext: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  teamColor,
  teamName,
  questionNumber,
  totalQuestions,
  question,
  timeLimit,
  isBot = false,
  disabled = false,
  isTurnActive = true,
  onAnswer,
  onNext,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(timeLimit > 0 ? timeLimit : 20);
  const [autoNextCountdown, setAutoNextCountdown] = useState<number | null>(null);

  const isBlue = teamColor === 'blue';
  const themeClasses = isBlue
    ? {
        border: isTurnActive ? 'border-blue-400 ring-2 ring-blue-300 shadow-lg' : 'border-blue-200',
        bgHeader: 'bg-blue-600',
        badge: 'bg-blue-100 text-blue-800 border-blue-200',
        accent: 'text-blue-700',
        btnHover: 'hover:border-blue-500 hover:bg-blue-50/70',
        timerFill: 'bg-blue-600',
      }
    : {
        border: isTurnActive ? 'border-red-400 ring-2 ring-rose-300 shadow-lg' : 'border-red-200',
        bgHeader: 'bg-red-600',
        badge: 'bg-red-100 text-red-800 border-red-200',
        accent: 'text-red-700',
        btnHover: 'hover:border-red-500 hover:bg-red-50/70',
        timerFill: 'bg-red-600',
      };

  // Reset local state when question changes
  useEffect(() => {
    setSelectedIndex(null);
    setHasAnswered(false);
    setTimeLeft(timeLimit > 0 ? timeLimit : 20);
    setAutoNextCountdown(null);
  }, [question.id, timeLimit]);

  // Auto-advance countdown when answered
  useEffect(() => {
    if (hasAnswered) {
      setAutoNextCountdown(3);
      const interval = setInterval(() => {
        setAutoNextCountdown((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(interval);
            onNext();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setAutoNextCountdown(null);
    }
  }, [hasAnswered, onNext]);

  // Timer effect - only ticks if this team is active and hasn't answered
  useEffect(() => {
    if (hasAnswered || timeLimit <= 0 || !isTurnActive || disabled) return;

    if (timeLeft <= 0) {
      // Time up! Treated as wrong answer
      handleSelect(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, hasAnswered, timeLimit, isTurnActive, disabled]);

  // Bot auto-play simulation
  useEffect(() => {
    if (isBot && !hasAnswered && !disabled && isTurnActive) {
      // Bot thinks for 1.2 to 2.5 seconds
      const botThinkingTime = 1200 + Math.random() * 1200;
      const timer = setTimeout(() => {
        // 75% chance correct for bot
        const willBeCorrect = Math.random() < 0.72;
        let chosenIdx = question.correctIndex;
        if (!willBeCorrect) {
          const wrongIndices = [0, 1, 2, 3].filter((i) => i !== question.correctIndex);
          chosenIdx = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
        }
        handleSelect(chosenIdx);
      }, botThinkingTime);

      return () => clearTimeout(timer);
    }
  }, [isBot, hasAnswered, disabled, isTurnActive, question]);

  const handleSelect = (idx: number) => {
    if (hasAnswered || disabled || !isTurnActive) return;
    setSelectedIndex(idx);
    setHasAnswered(true);

    const isCorrect = idx === question.correctIndex;
    onAnswer(idx, isCorrect);
  };

  const handleSkip = () => {
    if (hasAnswered || disabled || !isTurnActive) return;
    // User voluntarily skips: treated as wrong answer (points deducted, rope shifts)
    handleSelect(-1);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div
      className={`flex flex-col h-full bg-white rounded-2xl border-2 ${themeClasses.border} shadow-md overflow-hidden transition-all ${
        !isTurnActive && !hasAnswered ? 'opacity-85' : 'opacity-100'
      }`}
    >
      {/* Card Header */}
      <div className={`${themeClasses.bgHeader} px-4 py-2.5 text-white flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          {isBot ? (
            <Bot className="h-4 w-4 animate-bounce" />
          ) : (
            <span className="font-black text-xs px-2 py-0.5 rounded bg-white/20">
              {isBlue ? 'ĐỘI XANH (BÊN TRÁI)' : 'ĐỘI ĐỎ (BÊN PHẢI)'}
            </span>
          )}
          <span className="font-bold text-sm sm:text-base">
            {teamName} {isBot ? '(Máy tự động)' : ''}
          </span>
          {!isTurnActive && !hasAnswered && (
            <span className="text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-full animate-pulse">
              ⏳ Đang đợi lượt...
            </span>
          )}
          {isTurnActive && !hasAnswered && (
            <span className="text-[11px] font-black bg-amber-300 text-slate-900 px-2 py-0.5 rounded-full animate-pulse shadow-xs">
              ⚡ Đang đến lượt
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {timeLimit > 0 && (
            <div
              className={`flex items-center gap-1 text-xs font-mono font-bold px-2 py-0.5 rounded-full ${
                timeLeft <= 5 ? 'bg-amber-400 text-slate-900 animate-pulse' : 'bg-white/20 text-white'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>{timeLeft}s</span>
            </div>
          )}
          <span className="text-xs font-extrabold bg-white/20 px-2 py-0.5 rounded-full">
            Câu {questionNumber} / {totalQuestions}
          </span>
        </div>
      </div>

      {/* Timer progress line */}
      {timeLimit > 0 && !hasAnswered && (
        <div className="h-1.5 w-full bg-slate-100 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${themeClasses.timerFill}`}
            style={{ width: `${Math.max(0, (timeLeft / timeLimit) * 100)}%` }}
          />
        </div>
      )}

      {/* Question Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {question.category && (
            <span className="inline-block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              {question.category === 'dovui'
                ? '🧩 Đố vui trí tuệ'
                : question.category === 'khoahoc'
                ? '🔬 Khoa học & Tự nhiên'
                : question.category === 'lichsu_dialy'
                ? '🗺️ Lịch sử & Địa lý'
                : question.category === 'toan_logic'
                ? '📐 Toán học & Logic'
                : 'Trắc nghiệm'}
            </span>
          )}

          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-4">
            {question.question}
          </h3>

          {/* Options grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((option, idx) => {
              const letter = optionLetters[idx] || `${idx + 1}`;
              const isSelected = selectedIndex === idx;
              const isCorrect = idx === question.correctIndex;

              let btnStyle = 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-800';

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-300';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-300';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50/30 text-slate-400 opacity-60';
                }
              } else if (!disabled) {
                btnStyle = `border-slate-200 text-slate-800 ${themeClasses.btnHover} active:scale-[0.99]`;
              }

              return (
                <button
                  key={`opt-${idx}`}
                  id={`${teamColor}-option-${idx}`}
                  disabled={hasAnswered || disabled || isBot}
                  onClick={() => handleSelect(idx)}
                  className={`relative flex items-center justify-between w-full p-3 sm:p-3.5 rounded-xl border text-left text-sm font-medium transition-all ${btnStyle}`}
                >
                  <div className="flex items-center gap-2.5 pr-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                        hasAnswered && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : hasAnswered && isSelected && !isCorrect
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="leading-snug">{option}</span>
                  </div>

                  {/* Feedback icon */}
                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 ml-1" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 text-rose-600 shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Skip button when answering: voluntarily skip and take penalty */}
          {!hasAnswered && isTurnActive && !disabled && !isBot && (
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 italic">
                Không biết đáp án?
              </span>
              <button
                type="button"
                id={`skip-btn-${teamColor}`}
                onClick={handleSkip}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-rose-300 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                title="Bỏ qua câu này: Chấp nhận tính sai, trừ điểm và lùi lại"
              >
                <SkipForward className="h-3.5 w-3.5 text-slate-500" />
                <span>Qua câu (Tính sai & lùi lại)</span>
              </button>
            </div>
          )}
        </div>

        {/* Answer Explanation & Next Button */}
        <AnimatePresence>
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-3"
            >
              <div
                className={`p-3 rounded-xl text-xs sm:text-sm ${
                  selectedIndex === question.correctIndex
                    ? 'bg-emerald-50/90 border border-emerald-200 text-emerald-900'
                    : 'bg-rose-50/90 border border-rose-200 text-rose-900'
                }`}
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-1">
                      <span className="font-black text-sm">
                        {selectedIndex === question.correctIndex
                          ? '🎉 Chính xác! (+100 điểm & Kéo dây)'
                          : selectedIndex === -1
                          ? '⏭️ Đã qua câu! (-50 điểm & Bị lùi)'
                          : '❌ Chưa chính xác! (-50 điểm & Bị lùi)'}
                      </span>
                    </div>

                    {selectedIndex !== question.correctIndex && (
                      <p className="mt-1.5 text-xs font-bold text-slate-800 bg-white/80 px-2 py-1 rounded-md border border-rose-200 inline-block">
                        Đáp án đúng: <span className="text-emerald-700 font-black">{optionLetters[question.correctIndex]}. {question.options[question.correctIndex]}</span>
                      </p>
                    )}

                    {question.explanation && (
                      <p className="mt-1.5 text-xs text-slate-700 leading-relaxed">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs text-slate-500 font-medium">
                  {autoNextCountdown !== null && autoNextCountdown > 0 ? (
                    <span className="inline-flex items-center gap-1 font-semibold text-slate-600">
                      ⏱️ Tự động qua câu sau <strong className="text-indigo-600 font-black">{autoNextCountdown}s</strong>...
                    </span>
                  ) : null}
                </div>

                <button
                  id={`next-btn-${teamColor}`}
                  onClick={onNext}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm text-white shadow-md transition-all hover:scale-[1.02] active:scale-95 cursor-pointer ${
                    isBlue ? 'bg-blue-600 hover:bg-blue-700 ring-2 ring-blue-300' : 'bg-red-600 hover:bg-red-700 ring-2 ring-rose-300'
                  }`}
                >
                  <span>{questionNumber >= totalQuestions ? 'Xem kết quả chung cuộc 🏆' : 'Qua câu tiếp theo ➡️'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
