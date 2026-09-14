import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Award, CheckCircle, XCircle } from 'lucide-react';
import { TeamState } from '../types';

interface GameOverModalProps {
  winner: 'blue' | 'red' | 'draw';
  winReason: string;
  blueTeam: TeamState;
  redTeam: TeamState;
  ropePosition: number;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  winner,
  winReason,
  blueTeam,
  redTeam,
  ropePosition,
  onRestart,
}) => {
  useEffect(() => {
    // Fireworks confetti effect
    const duration = 3.5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 40 * (timeLeft / duration);

      if (winner === 'blue' || winner === 'draw') {
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: { x: 0.25, y: 0.6 },
          colors: ['#2563eb', '#38bdf8', '#fbbf24'],
        });
      }
      if (winner === 'red' || winner === 'draw') {
        confetti({
          particleCount,
          startVelocity: 30,
          spread: 360,
          origin: { x: 0.75, y: 0.6 },
          colors: ['#dc2626', '#f87171', '#fbbf24'],
        });
      }
    }, 300);

    return () => clearInterval(interval);
  }, [winner]);

  const isBlueWin = winner === 'blue';
  const isRedWin = winner === 'red';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 text-center overflow-hidden">
        {/* Decorative background glow */}
        <div
          className={`absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-72 rounded-full blur-3xl opacity-30 ${
            isBlueWin ? 'bg-blue-600' : isRedWin ? 'bg-red-600' : 'bg-amber-500'
          }`}
        />

        {/* Trophy icon */}
        <div className="relative mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-amber-900 shadow-lg ring-8 ring-amber-50">
          <Trophy className="h-10 w-10 animate-bounce" />
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
          {isBlueWin ? (
            <span className="text-blue-600">ĐỘI XANH CHIẾN THẮNG! 🏆</span>
          ) : isRedWin ? (
            <span className="text-red-600">ĐỘI ĐỎ CHIẾN THẮNG! 🏆</span>
          ) : (
            <span className="text-amber-600">TRẬN ĐẤU BẤT PHÂN THẮNG BẠI! 🤝</span>
          )}
        </h2>

        <p className="mt-1.5 text-sm font-semibold text-slate-600">
          {winReason}
        </p>

        {/* Score comparison card */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {/* Blue team stats */}
          <div
            className={`rounded-2xl p-4 border text-left transition-all ${
              isBlueWin
                ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-400 shadow-sm'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-black text-sm text-blue-900">
                {blueTeam.name}
              </span>
              {isBlueWin && (
                <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Quán quân
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-blue-950 font-mono mb-2">
              {blueTeam.score} <span className="text-xs font-bold text-blue-600">điểm</span>
            </div>
            <div className="space-y-1 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Trả lời đúng: {blueTeam.correctAnswers}/10</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-700">
                <XCircle className="h-3.5 w-3.5" />
                <span>Trả lời sai: {blueTeam.wrongAnswers}/10</span>
              </div>
            </div>
          </div>

          {/* Red team stats */}
          <div
            className={`rounded-2xl p-4 border text-left transition-all ${
              isRedWin
                ? 'bg-red-50/80 border-red-300 ring-2 ring-red-400 shadow-sm'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-black text-sm text-red-900">
                {redTeam.name}
              </span>
              {isRedWin && (
                <span className="text-xs font-extrabold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                  Quán quân
                </span>
              )}
            </div>
            <div className="text-2xl font-black text-red-950 font-mono mb-2">
              {redTeam.score} <span className="text-xs font-bold text-red-600">điểm</span>
            </div>
            <div className="space-y-1 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircle className="h-3.5 w-3.5" />
                <span>Trả lời đúng: {redTeam.correctAnswers}/10</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-700">
                <XCircle className="h-3.5 w-3.5" />
                <span>Trả lời sai: {redTeam.wrongAnswers}/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rope summary */}
        <div className="mt-4 p-3 rounded-xl bg-slate-100/70 border border-slate-200/80 text-xs font-medium text-slate-600">
          <span>Vị trí sợi dây chung cuộc: </span>
          <strong className="text-slate-800">
            {ropePosition === 0
              ? 'Ngay chính giữa (0%)'
              : ropePosition < 0
              ? `Kéo về phía Đội Xanh ${Math.abs(Math.round(ropePosition))}%`
              : `Kéo về phía Đội Đỏ ${Math.round(ropePosition)}%`}
          </strong>
        </div>

        {/* Action button */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <button
            id="play-again-btn"
            onClick={onRestart}
            className="flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-lg shadow-amber-500/25 transition-all active:scale-95"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Chơi Lại Trận Mới</span>
          </button>
        </div>
      </div>
    </div>
  );
};
