import { motion } from 'framer-motion';
import { Lock, CheckCircle2, PlayCircle } from 'lucide-react';
import type { Level } from '../../types';
import { Badge, XPBadge, ProgressBar } from '../ui';
import { cn, calculateProgress } from '../../lib/utils';
import { useApp } from '../../contexts/AppContext';

interface LevelCardProps {
  level: Level;
  onClick: () => void;
}

export function LevelCard({ level, onClick }: LevelCardProps) {
  const { userProgress, language } = useApp();

  const isCompleted = userProgress.completedLevels.includes(level.id);
  const isCurrent = userProgress.currentLevel === level.id;
  const isLocked = !isCompleted && !isCurrent && level.prerequisites?.some(
    prereq => !userProgress.completedLevels.includes(prereq)
  );

  const completedTasks = level.tasks.filter(task =>
    userProgress.completedTasks.includes(task.id)
  ).length;

  const progress = calculateProgress(completedTasks, level.tasks.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={!isLocked ? { y: -4 } : {}}
      onClick={isLocked ? undefined : onClick}
      className={cn(
        'level-card glass-card p-6 cursor-pointer relative overflow-hidden group',
        isCompleted && 'completed',
        isCurrent && 'current',
        isLocked && 'locked'
      )}
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-athar-accent/0 to-athar-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Header */}
      <div className="relative flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-4xl">{level.icon}</span>
          <div>
            <h3 className="font-display font-semibold text-xl text-white">
              {language === 'ar' ? level.titleAr : level.title}
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {language === 'ar' ? level.descriptionAr : level.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <XPBadge xp={level.xp} />
          {isLocked && (
            <span className="text-gray-500 text-xs flex items-center gap-1">
              <Lock className="w-3 h-3" />
              {language === 'ar' ? 'مقفل' : 'Locked'}
            </span>
          )}
        </div>
      </div>

      {/* Status indicator */}
      <div className="relative flex items-center gap-2 mb-4">
        {isCompleted ? (
          <>
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <span className="text-green-400 text-sm font-medium">
              {language === 'ar' ? 'مكتمل' : 'Completed'}
            </span>
          </>
        ) : isCurrent ? (
          <>
            <PlayCircle className="w-5 h-5 text-athar-accent animate-pulse" />
            <span className="text-athar-accent text-sm font-medium">
              {language === 'ar' ? 'جاري التقدم' : 'In Progress'}
            </span>
          </>
        ) : (
          <span className="text-gray-500 text-sm">
            {language === 'ar' ? `${completedTasks}/${level.tasks.length} مهام` : `${completedTasks}/${level.tasks.length} tasks`}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
          <span>{progress}%</span>
        </div>
        <ProgressBar progress={progress} />
      </div>

      {/* Locked overlay */}
      {isLocked && (
        <div className="absolute inset-0 bg-athar-navy-950/50 backdrop-blur-sm flex items-center justify-center">
          <Lock className="w-12 h-12 text-gray-500" />
        </div>
      )}
    </motion.div>
  );
}
