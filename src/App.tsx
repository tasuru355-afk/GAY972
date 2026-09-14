/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { ScoreBoard } from './components/ScoreBoard';
import { TugOfWarCanvas } from './components/TugOfWarCanvas';
import { QuestionCard } from './components/QuestionCard';
import { GameOverModal } from './components/GameOverModal';
import { RulesModal } from './components/RulesModal';
import { CustomQuestionsModal } from './components/CustomQuestionsModal';
import { DeployModal } from './components/DeployModal';
import { TeamState, GameMode, GameSettings, TeamColor } from './types';
import { prepareTeamQuestions } from './data/questions';
import { sound } from './utils/audio';

const DEFAULT_SETTINGS: GameSettings = {
  questionsPerTeam: 10,
  timePerQuestion: 20,
  pointsCorrect: 100,
  pointsWrong: 50,
  pullStep: 14, // rope shift percentage
  winThreshold: 85, // rope position needed for instant knockout
  category: 'all',
};

export default function App() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [gameMode, setGameMode] = useState<GameMode>('split-screen');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isDeployOpen, setIsDeployOpen] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<'blue' | 'red' | 'draw'>('draw');
  const [winReason, setWinReason] = useState<string>('');

  // Rope position: -100 (Full Blue win) to +100 (Full Red win)
  const [ropePosition, setRopePosition] = useState<number>(0);

  // Turn tracking for turn-based mode
  const [activeTurn, setActiveTurn] = useState<TeamColor>('blue');
  const [lastActionEffect, setLastActionEffect] = useState<{
    team: 'blue' | 'red';
    type: 'pull' | 'slip';
    text: string;
  } | null>(null);

  // Team states
  const [blueTeam, setBlueTeam] = useState<TeamState>(() => {
    const { blue } = prepareTeamQuestions(DEFAULT_SETTINGS.category, 10);
    return {
      name: 'Đội Xanh',
      color: 'blue',
      score: 0,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      questions: blue,
      isPulling: false,
      isStumbling: false,
      streak: 0,
    };
  });

  const [redTeam, setRedTeam] = useState<TeamState>(() => {
    const { red } = prepareTeamQuestions(DEFAULT_SETTINGS.category, 10);
    return {
      name: 'Đội Đỏ',
      color: 'red',
      score: 0,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      questions: red,
      isPulling: false,
      isStumbling: false,
      streak: 0,
    };
  });

  // Toggle sound
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
  };

  // Check game over condition
  const checkGameOver = useCallback(
    (currentRope: number, nextBlue: TeamState, nextRed: TeamState) => {
      // 1. Instant Knockout Win
      if (currentRope <= -settings.winThreshold) {
        setWinner('blue');
        setWinReason('Đội Xanh đã kéo sợi dây vượt qua vạch chiến thắng! Thắng Knockout ngoạn mục!');
        setIsGameOver(true);
        sound.playVictory();
        return true;
      }
      if (currentRope >= settings.winThreshold) {
        setWinner('red');
        setWinReason('Đội Đỏ đã kéo sợi dây vượt qua vạch chiến thắng! Thắng Knockout ngoạn mục!');
        setIsGameOver(true);
        sound.playVictory();
        return true;
      }

      // 2. Completed all 10 questions for both sides
      const blueDone = nextBlue.currentQuestionIndex >= settings.questionsPerTeam;
      const redDone = nextRed.currentQuestionIndex >= settings.questionsPerTeam;

      if (blueDone && redDone) {
        if (currentRope < 0) {
          setWinner('blue');
          setWinReason(`Sau 10 câu hỏi, Đội Xanh đã kéo dây về phía mình (${Math.abs(Math.round(currentRope))}%) và giành chiến thắng!`);
        } else if (currentRope > 0) {
          setWinner('red');
          setWinReason(`Sau 10 câu hỏi, Đội Đỏ đã kéo dây về phía mình (${Math.round(currentRope)}%) và giành chiến thắng!`);
        } else {
          // Rope exactly at center, decide by score
          if (nextBlue.score > nextRed.score) {
            setWinner('blue');
            setWinReason('Dây ở giữa nhưng Đội Xanh có tổng điểm cao hơn và giành chiến thắng!');
          } else if (nextRed.score > nextBlue.score) {
            setWinner('red');
            setWinReason('Dây ở giữa nhưng Đội Đỏ có tổng điểm cao hơn và giành chiến thắng!');
          } else {
            setWinner('draw');
            setWinReason('Hai đội ngang tài ngang sức sau 10 câu hỏi quyết liệt!');
          }
        }
        setIsGameOver(true);
        sound.playVictory();
        return true;
      }

      return false;
    },
    [settings]
  );

  // Restart match with fresh 10 questions
  const handleResetGame = useCallback(
    (
      category: string = settings.category,
      newBlueName?: string,
      newRedName?: string,
      sameQuestions: boolean = settings.sameQuestions || false
    ) => {
      const { blue, red } = prepareTeamQuestions(category, settings.questionsPerTeam, sameQuestions);
      setRopePosition(0);
      setActiveTurn('blue');
      setIsGameOver(false);
      setLastActionEffect(null);

      setBlueTeam((prev) => ({
        name: newBlueName || prev.name,
        color: 'blue',
        score: 0,
        currentQuestionIndex: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        questions: blue,
        isPulling: false,
        isStumbling: false,
        streak: 0,
      }));

      setRedTeam((prev) => ({
        name: newRedName || prev.name,
        color: 'red',
        score: 0,
        currentQuestionIndex: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        questions: red,
        isPulling: false,
        isStumbling: false,
        streak: 0,
      }));

      sound.playWhistle();
    },
    [settings.category, settings.questionsPerTeam, settings.sameQuestions]
  );

  // Handle Answer submitted by either team
  const handleAnswer = (team: TeamColor, isCorrect: boolean) => {
    let newRope = ropePosition;
    const isBlue = team === 'blue';

    if (isCorrect) {
      // Correct answer:
      // +Points, pull rope towards team!
      sound.playPullSuccess();

      if (isBlue) {
        const streakBonus = blueTeam.streak >= 2 ? 4 : 0;
        const pullDistance = settings.pullStep + streakBonus;
        newRope = Math.max(-100, ropePosition - pullDistance);

        setBlueTeam((prev) => ({
          ...prev,
          score: prev.score + settings.pointsCorrect + (prev.streak >= 2 ? 20 : 0),
          correctAnswers: prev.correctAnswers + 1,
          streak: prev.streak + 1,
          isPulling: true,
          isStumbling: false,
        }));
        setRedTeam((prev) => ({
          ...prev,
          isPulling: false,
          isStumbling: true,
        }));

        setLastActionEffect({
          team: 'blue',
          type: 'pull',
          text: `ĐỘI XANH TRẢ LỜI ĐÚNG! +${settings.pointsCorrect}đ & KÉO DÂY! 💥`,
        });
      } else {
        const streakBonus = redTeam.streak >= 2 ? 4 : 0;
        const pullDistance = settings.pullStep + streakBonus;
        newRope = Math.min(100, ropePosition + pullDistance);

        setRedTeam((prev) => ({
          ...prev,
          score: prev.score + settings.pointsCorrect + (prev.streak >= 2 ? 20 : 0),
          correctAnswers: prev.correctAnswers + 1,
          streak: prev.streak + 1,
          isPulling: true,
          isStumbling: false,
        }));
        setBlueTeam((prev) => ({
          ...prev,
          isPulling: false,
          isStumbling: true,
        }));

        setLastActionEffect({
          team: 'red',
          type: 'pull',
          text: `ĐỘI ĐỎ TRẢ LỜI ĐÚNG! +${settings.pointsCorrect}đ & KÉO DÂY! 💥`,
        });
      }
    } else {
      // Wrong answer:
      // -Points, stumble backwards, opponent pulls rope!
      sound.playWrongSlip();

      if (isBlue) {
        // Blue stumbled, rope shifts towards Red (right)
        const slipDistance = settings.pullStep * 0.75;
        newRope = Math.min(100, ropePosition + slipDistance);

        setBlueTeam((prev) => ({
          ...prev,
          score: Math.max(0, prev.score - settings.pointsWrong),
          wrongAnswers: prev.wrongAnswers + 1,
          streak: 0,
          isPulling: false,
          isStumbling: true,
        }));
        setRedTeam((prev) => ({
          ...prev,
          isPulling: true,
          isStumbling: false,
        }));

        setLastActionEffect({
          team: 'blue',
          type: 'slip',
          text: `ĐỘI XANH SAI! -${settings.pointsWrong}đ & BỊ LÙI BƯỚC! 💦`,
        });
      } else {
        // Red stumbled, rope shifts towards Blue (left)
        const slipDistance = settings.pullStep * 0.75;
        newRope = Math.max(-100, ropePosition - slipDistance);

        setRedTeam((prev) => ({
          ...prev,
          score: Math.max(0, prev.score - settings.pointsWrong),
          wrongAnswers: prev.wrongAnswers + 1,
          streak: 0,
          isPulling: false,
          isStumbling: true,
        }));
        setBlueTeam((prev) => ({
          ...prev,
          isPulling: true,
          isStumbling: false,
        }));

        setLastActionEffect({
          team: 'red',
          type: 'slip',
          text: `ĐỘI ĐỎ SAI! -${settings.pointsWrong}đ & BỊ LÙI BƯỚC! 💦`,
        });
      }
    }

    setRopePosition(newRope);

    // Reset character poses after 1.6s
    setTimeout(() => {
      setBlueTeam((prev) => ({ ...prev, isPulling: false, isStumbling: false }));
      setRedTeam((prev) => ({ ...prev, isPulling: false, isStumbling: false }));
    }, 1600);
  };

  // Next Question trigger for a team
  const handleNextQuestion = (team: TeamColor) => {
    sound.playClick();
    setLastActionEffect(null);

    let nextBlue = { ...blueTeam };
    let nextRed = { ...redTeam };

    if (team === 'blue') {
      nextBlue.currentQuestionIndex += 1;
      setBlueTeam(nextBlue);

      if (gameMode === 'turn-based' || gameMode === 'vs-bot') {
        // Switch turn to Red if Red still has questions
        if (nextRed.currentQuestionIndex < settings.questionsPerTeam) {
          setActiveTurn('red');
        }
      }
    } else {
      nextRed.currentQuestionIndex += 1;
      setRedTeam(nextRed);

      if (gameMode === 'turn-based' || gameMode === 'vs-bot') {
        // Switch turn to Blue if Blue still has questions
        if (nextBlue.currentQuestionIndex < settings.questionsPerTeam) {
          setActiveTurn('blue');
        }
      }
    }

    // Check if game has ended
    checkGameOver(ropePosition, nextBlue, nextRed);
  };

  // Calculate overall round number (max of both teams + 1)
  const currentRound = Math.max(blueTeam.currentQuestionIndex, redTeam.currentQuestionIndex) + 1;

  // Active question references
  const currentBlueQuestion = blueTeam.questions[blueTeam.currentQuestionIndex];
  const currentRedQuestion = redTeam.questions[redTeam.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col items-center selection:bg-amber-200">
      <main className="w-full max-w-6xl px-3 py-3 sm:py-5 flex flex-col gap-3 sm:gap-4 flex-1">
        {/* Header & Scoreboard */}
        <ScoreBoard
          blueTeam={blueTeam}
          redTeam={redTeam}
          currentRound={currentRound}
          totalRounds={settings.questionsPerTeam}
          gameMode={gameMode}
          onSetGameMode={(mode) => {
            setGameMode(mode);
            handleResetGame();
          }}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onResetGame={() => handleResetGame()}
          onOpenRules={() => setIsRulesOpen(true)}
          onOpenCustomQuestions={() => setIsSettingsOpen(true)}
          onOpenDeployModal={() => setIsDeployOpen(true)}
        />

        {/* Tug Of War Arena Stage */}
        <TugOfWarCanvas
          ropePosition={ropePosition}
          blueTeam={blueTeam}
          redTeam={redTeam}
          activeTurn={gameMode !== 'split-screen' ? activeTurn : undefined}
          lastActionEffect={lastActionEffect}
        />

        {/* Question Area: Always displays questions for both teams side-by-side */}
        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-6 items-stretch">
            {/* Blue Question Card (Left Side) */}
            <div className="flex flex-col h-full">
              {currentBlueQuestion ? (
                <QuestionCard
                  teamColor="blue"
                  teamName={blueTeam.name}
                  questionNumber={blueTeam.currentQuestionIndex + 1}
                  totalQuestions={settings.questionsPerTeam}
                  question={currentBlueQuestion}
                  timeLimit={settings.timePerQuestion}
                  isTurnActive={gameMode === 'split-screen' || activeTurn === 'blue'}
                  disabled={gameMode !== 'split-screen' && activeTurn !== 'blue'}
                  onAnswer={(_, isCorrect) => handleAnswer('blue', isCorrect)}
                  onNext={() => handleNextQuestion('blue')}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border-2 border-blue-200 text-center h-full shadow-sm">
                  <span className="text-4xl mb-2">🎉</span>
                  <h3 className="font-black text-lg text-blue-900">Đội Xanh Đã Hoàn Thành 10 Câu!</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Đúng: <span className="font-bold text-blue-600">{blueTeam.correctAnswers}</span> • Sai: <span className="font-bold text-slate-600">{blueTeam.wrongAnswers}</span>
                  </p>
                  {currentRedQuestion ? (
                    <div className="mt-3 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-semibold">
                      Đang đợi Đội Đỏ hoàn thành các câu còn lại...
                    </div>
                  ) : (
                    <div className="mt-3 text-xs text-slate-400">Đã kết thúc tất cả lượt thi</div>
                  )}
                </div>
              )}
            </div>

            {/* Red Question Card (Right Side) */}
            <div className="flex flex-col h-full">
              {currentRedQuestion ? (
                <QuestionCard
                  teamColor="red"
                  teamName={redTeam.name}
                  questionNumber={redTeam.currentQuestionIndex + 1}
                  totalQuestions={settings.questionsPerTeam}
                  question={currentRedQuestion}
                  timeLimit={settings.timePerQuestion}
                  isBot={gameMode === 'vs-bot'}
                  isTurnActive={gameMode === 'split-screen' || activeTurn === 'red'}
                  disabled={gameMode !== 'split-screen' && activeTurn !== 'red'}
                  onAnswer={(_, isCorrect) => handleAnswer('red', isCorrect)}
                  onNext={() => handleNextQuestion('red')}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border-2 border-red-200 text-center h-full shadow-sm">
                  <span className="text-4xl mb-2">🎉</span>
                  <h3 className="font-black text-lg text-red-900">Đội Đỏ Đã Hoàn Thành 10 Câu!</h3>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Đúng: <span className="font-bold text-red-600">{redTeam.correctAnswers}</span> • Sai: <span className="font-bold text-slate-600">{redTeam.wrongAnswers}</span>
                  </p>
                  {currentBlueQuestion ? (
                    <div className="mt-3 bg-red-50 text-red-700 px-3 py-1.5 rounded-xl text-xs font-semibold">
                      Đang đợi Đội Xanh hoàn thành các câu còn lại...
                    </div>
                  ) : (
                    <div className="mt-3 text-xs text-slate-400">Đã kết thúc tất cả lượt thi</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Rules Modal */}
      {isRulesOpen && <RulesModal onClose={() => setIsRulesOpen(false)} />}

      {/* Deploy to GitHub Pages Modal */}
      {isDeployOpen && <DeployModal onClose={() => setIsDeployOpen(false)} />}

      {/* Settings / Custom Questions Modal */}
      {isSettingsOpen && (
        <CustomQuestionsModal
          settings={settings}
          blueName={blueTeam.name}
          redName={redTeam.name}
          onSave={(newSettings, newBlue, newRed) => {
            setSettings(newSettings);
            handleResetGame(newSettings.category, newBlue, newRed, newSettings.sameQuestions);
          }}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Game Over Celebration Modal */}
      {isGameOver && (
        <GameOverModal
          winner={winner}
          winReason={winReason}
          blueTeam={blueTeam}
          redTeam={redTeam}
          ropePosition={ropePosition}
          onRestart={() => handleResetGame()}
        />
      )}
    </div>
  );
}
