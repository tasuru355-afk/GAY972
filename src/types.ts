export type TeamColor = 'blue' | 'red';

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  category?: string;
}

export type GameMode = 'turn-based' | 'split-screen' | 'vs-bot';
export type BotDifficulty = 'easy' | 'medium' | 'hard';

export interface TeamState {
  name: string;
  color: TeamColor;
  score: number;
  currentQuestionIndex: number;
  correctAnswers: number;
  wrongAnswers: number;
  questions: Question[];
  isPulling: boolean;
  isStumbling: boolean;
  streak: number;
}

export interface GameSettings {
  questionsPerTeam: number;
  timePerQuestion: number; // in seconds, 0 for no limit
  pointsCorrect: number;
  pointsWrong: number;
  pullStep: number; // rope shift percentage per normal correct answer
  winThreshold: number; // percentage offset from center to trigger instant win (e.g. 50%)
  category: string;
  sameQuestions?: boolean;
}

export type GameStatus = 'idle' | 'playing' | 'round-result' | 'game-over';
