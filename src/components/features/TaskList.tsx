import { motion } from 'framer-motion';
import { CheckCircle2, Lock, ChevronRight } from 'lucide-react';
import type { Task } from '../../types';
import { Badge } from '../ui';
import { cn } from '../../lib/utils';
import { useApp } from '../../contexts/AppContext';

interface TaskListProps {
  tasks: Task[];
  onTaskSelect: (task: Task) => void;
  currentTaskId: string;
}

export function TaskList({ tasks, onTaskSelect, currentTaskId }: TaskListProps) {
  const { userProgress, language } = useApp();

  return (
    <div className="space-y-2">
      {tasks.map((task, index) => {
        const isCompleted = userProgress.completedTasks.includes(task.id);
        const isCurrent = task.id === currentTaskId;
        const isLocked = !isCompleted && !isCurrent && index > 0 &&
          !userProgress.completedTasks.includes(tasks[index - 1].id);

        return (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={isLocked ? undefined : () => onTaskSelect(task)}
            className={cn(
              'task-item glass-card-interactive p-4 cursor-pointer flex items-center gap-4',
              isCompleted && 'completed opacity-75 hover:opacity-100',
              isCurrent && 'current',
              isLocked && 'locked cursor-not-allowed opacity-50'
            )}
          >
            {/* Status icon */}
            <div className="flex-shrink-0">
              {isCompleted ? (
                <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
              ) : isLocked ? (
                <div className="w-10 h-10 rounded-full bg-gray-500/20 border border-gray-500/30 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
              ) : isCurrent ? (
                <div className="w-10 h-10 rounded-full bg-athar-accent/20 border border-athar-accent/50 flex items-center justify-center animate-pulse-glow">
                  <span className="text-athar-accent font-bold">{index + 1}</span>
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="text-gray-400 font-semibold">{index + 1}</span>
                </div>
              )}
            </div>

            {/* Task info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-white truncate">
                  {language === 'ar' ? task.titleAr : task.title}
                </h4>
                <Badge variant="difficulty" difficulty={task.difficulty} size="sm" />
              </div>
              <p className="text-sm text-gray-400 line-clamp-1">
                {language === 'ar' ? task.descriptionAr : task.description}
              </p>
            </div>

            {/* XP indicator */}
            {!isLocked && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-amber-400 font-medium">{task.xp} XP</span>
                {!isCompleted && (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                )}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
