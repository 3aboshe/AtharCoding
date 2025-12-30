import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu, Flame, Trophy, Target, Check } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { levels } from '../../data/tasks';
import { cn, calculateProgress } from '../../lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { language, userProgress } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLevelClick = (levelId: string) => {
    navigate(`/level/${levelId}`);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={isOpen ? { x: '-100%' } : false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={cn(
          'fixed top-0 left-0 bottom-0 w-80 glass-card border-t-0 border-b-0 border-l-0 rounded-none z-50',
          'md:relative md:translate-x-0 md:z-30 md:border-r',
          !isOpen && 'md:block hidden'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="font-display font-bold text-xl text-white">
            {language === 'ar' ? 'المسار التعليمي' : 'Learning Path'}
          </h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Stats */}
        <div className="p-6 grid grid-cols-3 gap-4 border-b border-white/10">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-lg font-bold text-white">{userProgress.streak}</span>
            </div>
            <p className="text-xs text-gray-400">
              {language === 'ar' ? 'السلسلة' : 'Streak'}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-lg font-bold text-white">{userProgress.completedLevels.length}</span>
            </div>
            <p className="text-xs text-gray-400">
              {language === 'ar' ? 'المكتمل' : 'Completed'}
            </p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="w-4 h-4 text-athar-accent" />
              <span className="text-lg font-bold text-white">{userProgress.completedTasks.length}</span>
            </div>
            <p className="text-xs text-gray-400">
              {language === 'ar' ? 'المهام' : 'Tasks'}
            </p>
          </div>
        </div>

        {/* Levels list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {levels.map((level) => {
            const completedTasks = level.tasks.filter(task =>
              userProgress.completedTasks.includes(task.id)
            ).length;
            const progress = calculateProgress(completedTasks, level.tasks.length);
            const isActive = location.pathname.includes(level.id);

            return (
              <motion.button
                key={level.id}
                onClick={() => handleLevelClick(level.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'w-full p-4 rounded-xl border text-left transition-all',
                  isActive
                    ? 'bg-athar-accent/10 border-athar-accent/50'
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                )}
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-2xl">{level.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm truncate">
                      {language === 'ar' ? level.titleAr : level.title}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {completedTasks}/{level.tasks.length} {language === 'ar' ? 'مهام' : 'tasks'}
                    </p>
                  </div>
                  {progress === 100 && (
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  )}
                </div>
                <div className="h-1.5 bg-athar-navy-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-athar-accent to-athar-accent-glow rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.aside>
    </>
  );
}
