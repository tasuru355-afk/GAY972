import React from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Settings, Award } from 'lucide-react';
import { TeamState, GameMode } from '../types';

interface ScoreBoardProps {
  blueTeam: TeamState;
  redTeam: TeamState;
  currentRound: number;
  totalRounds: number;
  gameMode: GameMode;
  onSetGameMode: (mode: GameMode) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetGame: () => void;
  onOpenRules: () => void;
  onOpenCustomQuestions: () => void;
  onOpenDeployModal?: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  blueTeam,
  redTeam,
  currentRound,
  totalRounds,
  gameMode,
  onSetGameMode,
  soundEnabled,
  onToggleSound,
  onResetGame,
  onOpenRules,
  onOpenCustomQuestions,
  onOpenDeployModal,
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm p-3.5 sm:p-4 transition-all">
      {/* Top utility row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white shadow-sm font-black text-lg">
            ⚡
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-800">
              KÉO CO XANH - ĐỎ
            </h1>
            <p className="text-[11px] text-slate-500 font-medium">
              Đấu trí 10 câu hỏi • Đúng kéo mạnh, sai lùi bước
            </p>
          </div>
        </div>

        {/* Game Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          <button
            id="mode-split-screen-btn"
            onClick={() => onSetGameMode('split-screen')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              gameMode === 'split-screen'
                ? 'bg-white text-blue-900 shadow-sm font-black'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Song Đấu (2 Bên Cùng Lúc)
          </button>
          <button
            id="mode-turn-based-btn"
            onClick={() => onSetGameMode('turn-based')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              gameMode === 'turn-based'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lần Lượt (2 Bên Luân Phiên)
          </button>
          <button
            id="mode-vs-bot-btn"
            onClick={() => onSetGameMode('vs-bot')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              gameMode === 'vs-bot'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đấu Với Máy 🤖
          </button>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-1.5">
          <button
            id="rules-btn"
            onClick={onOpenRules}
            title="Luật chơi kéo co"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
          <button
            id="custom-questions-btn"
            onClick={onOpenCustomQuestions}
            title="Tùy chỉnh câu hỏi"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Settings className="h-4 w-4" />
          </button>
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
              soundEnabled
                ? 'border-amber-200 bg-amber-50 text-amber-700'
                : 'border-slate-200 text-slate-400 hover:bg-slate-50'
            }`}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
          {onOpenDeployModal && (
            <button
              id="deploy-github-btn"
              onClick={onOpenDeployModal}
              title="Hướng dẫn & File HTML/CSS/JS deploy lên GitHub Pages"
              className="flex items-center gap-1 h-8 px-2.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>🚀 Deploy GitHub</span>
            </button>
          )}
          <button
            id="restart-game-btn"
            onClick={onResetGame}
            title="Chơi lại ván mới"
            className="flex items-center gap-1 h-8 px-2.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700 text-xs font-semibold transition-colors shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Ván mới</span>
          </button>
        </div>
      </div>

      {/* Main Scoreboard: Blue vs Red */}
      <div className="grid grid-cols-12 items-center gap-2 sm:gap-4">
        {/* Team Blue Card */}
        <div className="col-span-5 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/60 border border-blue-200/90 p-2.5 sm:p-3 shadow-xs">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-600 text-white text-xs font-black shadow-xs">
                X
              </span>
              <span className="font-extrabold text-blue-900 text-sm sm:text-base">
                {blueTeam.name}
              </span>
            </div>
            {blueTeam.streak > 1 && (
              <span className="rounded-full bg-blue-600 text-white px-2 py-0.5 text-[10px] font-black animate-pulse">
                🔥 Chuỗi x{blueTeam.streak}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xl sm:text-2xl font-black text-blue-800 font-mono tracking-tight">
                {blueTeam.score}
              </span>
              <span className="text-[11px] font-bold text-blue-600 ml-1">điểm</span>
            </div>
            <div className="text-[11px] text-blue-700 font-semibold">
              Đúng: <span className="text-emerald-600 font-bold">{blueTeam.correctAnswers}</span> | Sai: <span className="text-rose-600 font-bold">{blueTeam.wrongAnswers}</span>
            </div>
          </div>
        </div>

        {/* Center Round Indicator */}
        <div className="col-span-2 text-center flex flex-col items-center justify-center">
          <span className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider">
            Tiến độ
          </span>
          <div className="flex items-center gap-1 my-0.5">
            <Award className="h-4 w-4 text-amber-500 hidden sm:block" />
            <span className="text-sm sm:text-base font-black text-slate-800 font-mono">
              {Math.min(currentRound, totalRounds)} / {totalRounds}
            </span>
          </div>
          <span className="text-[10px] font-bold text-slate-500">câu hỏi</span>
        </div>

        {/* Team Red Card */}
        <div className="col-span-5 rounded-xl bg-gradient-to-l from-red-50 to-red-100/60 border border-red-200/90 p-2.5 sm:p-3 shadow-xs text-right">
          <div className="flex items-center justify-between flex-row-reverse mb-1">
            <div className="flex items-center gap-1.5 flex-row-reverse">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-600 text-white text-xs font-black shadow-xs">
                Đ
              </span>
              <span className="font-extrabold text-red-900 text-sm sm:text-base">
                {redTeam.name}
              </span>
            </div>
            {redTeam.streak > 1 && (
              <span className="rounded-full bg-red-600 text-white px-2 py-0.5 text-[10px] font-black animate-pulse">
                🔥 Chuỗi x{redTeam.streak}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between flex-row-reverse">
            <div>
              <span className="text-xl sm:text-2xl font-black text-red-800 font-mono tracking-tight">
                {redTeam.score}
              </span>
              <span className="text-[11px] font-bold text-red-600 mr-1">điểm</span>
            </div>
            <div className="text-[11px] text-red-700 font-semibold">
              Đúng: <span className="text-emerald-600 font-bold">{redTeam.correctAnswers}</span> | Sai: <span className="text-rose-600 font-bold">{redTeam.wrongAnswers}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
