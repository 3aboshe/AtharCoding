// Core type definitions for Athar Coding Platform

export interface Task {
  id: string;
  levelId: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
  starterCode: string;
  expectedOutput?: string;
  testCases?: TestCase[];
  hints?: string[];
  hintsAr?: string[];
}

export interface TestCase {
  input?: string;
  expectedOutput: string;
  description: string;
  descriptionAr: string;
}

export interface Level {
  id: string;
  order: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  icon: string;
  xp: number;
  tasks: Task[];
  prerequisites?: string[];
}

export interface UserProgress {
  userId: string;
  currentLevel: string;
  currentTask: string;
  completedLevels: string[];
  completedTasks: string[];
  totalXP: number;
  streak: number;
  lastActivity: string;
}

export interface CodeExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
}

export interface AIValidationResult {
  isCorrect: boolean;
  feedback: string;
  feedbackAr: string;
  suggestions?: string[];
  suggestionsAr?: string[];
  confidence: number;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  messageAr: string;
  duration?: number;
}

export type Language = 'en' | 'ar';

export interface AppState {
  language: Language;
  userProgress: UserProgress;
  levels: Level[];
  isLoading: boolean;
  toasts: ToastMessage[];
}
