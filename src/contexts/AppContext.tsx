import { createContext, useContext, useState, useEffect, useCallback, ReactNode, useMemo } from 'react';
import type { UserProgress, ToastMessage, Language } from '../types';
import { storage } from '../lib/utils';
import { levels, getFirstIncompleteTask } from '../data/tasks';
import { ToastContainer } from '../components/ui/Toast';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  userProgress: UserProgress;
  updateProgress: (updates: Partial<UserProgress>) => void;
  completeTask: (taskId: string, xp: number) => void;
  completeLevel: (levelId: string) => void;
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (toastId: string) => void;
  toasts: ToastMessage[];
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_PROGRESS: UserProgress = {
  userId: 'guest',
  currentLevel: 'level-1',
  currentTask: 'task-1-1',
  completedLevels: [],
  completedTasks: [],
  totalXP: 0,
  streak: 0,
  lastActivity: new Date().toISOString(),
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [userProgress, setUserProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const setIsLoadingCallback = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  // Load saved progress on mount
  useEffect(() => {
    const savedProgress = storage.get<UserProgress>('athar-progress', INITIAL_PROGRESS);
    const savedLanguage = storage.get<Language>('athar-language', 'en');

    setLanguage(savedLanguage);

    // Reset streak if more than 1 day has passed
    const streak = calculateStreak(savedProgress.lastActivity);
    const finalProgress = streak === 0 && savedProgress.streak > 0
      ? { ...savedProgress, streak: 0 }
      : savedProgress;

    setUserProgress(finalProgress);
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (userProgress !== INITIAL_PROGRESS) {
      storage.set('athar-progress', userProgress);
    }
  }, [userProgress]);

  // Save language preference
  useEffect(() => {
    storage.set('athar-language', language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  }, []);

  const updateProgress = useCallback((updates: Partial<UserProgress>) => {
    setUserProgress(prev => ({
      ...prev,
      ...updates,
      lastActivity: updates.lastActivity || new Date().toISOString(),
    }));
  }, []);

  const completeTask = useCallback((taskId: string, xp: number) => {
    setUserProgress(prev => {
      if (prev.completedTasks.includes(taskId)) {
        return prev;
      }

      const newCompletedTasks = [...prev.completedTasks, taskId];
      const newTotalXP = prev.totalXP + xp;

      // Find next incomplete task
      const nextTask = getFirstIncompleteTask(newCompletedTasks);

      // Check if level is complete
      const currentLevel = levels.find(l => l.id === prev.currentLevel);
      const levelComplete = currentLevel
        ? currentLevel.tasks.every(t => newCompletedTasks.includes(t.id))
        : false;

      let newCompletedLevels = [...prev.completedLevels];
      let newCurrentLevel = prev.currentLevel;

      if (levelComplete && !newCompletedLevels.includes(prev.currentLevel)) {
        newCompletedLevels = [...newCompletedLevels, prev.currentLevel];
        // Move to next level
        const nextLevel = levels.find(l => l.order === (currentLevel?.order || 0) + 1);
        newCurrentLevel = nextLevel?.id || prev.currentLevel;
      }

      return {
        ...prev,
        completedTasks: newCompletedTasks,
        completedLevels: newCompletedLevels,
        currentLevel: newCurrentLevel,
        currentTask: nextTask?.taskId || prev.currentTask,
        totalXP: newTotalXP,
        lastActivity: new Date().toISOString(),
        streak: calculateStreak(prev.lastActivity) + 1,
      };
    });
  }, []);

  const completeLevel = useCallback((levelId: string) => {
    setUserProgress(prev => {
      if (prev.completedLevels.includes(levelId)) {
        return prev;
      }

      const newCompletedLevels = [...prev.completedLevels, levelId];
      const nextLevel = levels.find(l => l.order === (levels.find(l => l.id === levelId)?.order || 0) + 1);

      return {
        ...prev,
        completedLevels: newCompletedLevels,
        currentLevel: nextLevel?.id || levelId,
        lastActivity: new Date().toISOString(),
      };
    });
  }, []);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 3000);
    }
  }, []);

  const removeToast = useCallback((toastId: string) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  }, []);

  const contextValue = useMemo(() => ({
    language,
    toggleLanguage,
    userProgress,
    updateProgress,
    completeTask,
    completeLevel,
    addToast,
    removeToast,
    toasts,
    isLoading,
    setIsLoading: setIsLoadingCallback,
  }), [language, toggleLanguage, userProgress, updateProgress, completeTask, completeLevel, addToast, removeToast, toasts, isLoading, setIsLoadingCallback]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}

export { ToastContainer };

function calculateStreak(lastActivity: string): number {
  const last = new Date(lastActivity);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - last.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 1 ? 1 : 0;
}
