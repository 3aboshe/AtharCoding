import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { TaskList } from '../components/features';
import { Button } from '../components/ui';
import { useApp } from '../contexts/AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getLevelById, getTaskById } from '../data/tasks';
import type { Task } from '../types';
import { cn } from '../lib/utils';

export function LevelPage() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { language, userProgress, updateProgress } = useApp();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const level = levelId ? getLevelById(levelId) : null;

  useEffect(() => {
    if (level && !selectedTask) {
      // Find first incomplete or first task
      const firstIncomplete = level.tasks.find(
        t => !userProgress.completedTasks.includes(t.id)
      ) || level.tasks[0];
      setSelectedTask(firstIncomplete);
    }
  }, [level, selectedTask, userProgress.completedTasks]);

  useEffect(() => {
    if (levelId) {
      updateProgress({ currentLevel: levelId });
    }
  }, [levelId, updateProgress]);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!level) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">
            {language === 'ar' ? 'المستوى غير موجود' : 'Level not found'}
          </h2>
          <Button onClick={handleBack}>
            <ArrowLeft className={cn('w-4 h-4', language === 'ar' ? 'rotate-180' : '')} />
            {language === 'ar' ? 'العودة' : 'Go Back'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className={cn('w-4 h-4', language === 'ar' ? 'rotate-180' : '')} />
            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Button>

          <div className="flex items-start gap-6">
            <span className="text-6xl">{level.icon}</span>
            <div className="flex-1">
              <h1 className="font-display font-bold text-4xl text-white mb-2">
                {language === 'ar' ? level.titleAr : level.title}
              </h1>
              <p className="text-gray-400 text-lg">
                {language === 'ar' ? level.descriptionAr : level.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task list */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6">
              <h2 className="font-semibold text-xl text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-athar-accent" />
                {language === 'ar' ? 'المهام' : 'Tasks'}
              </h2>
              <TaskList
                tasks={level.tasks}
                onTaskSelect={handleTaskSelect}
                currentTaskId={selectedTask?.id || ''}
              />
            </div>
          </motion.div>

          {/* Task preview or continue */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            {selectedTask ? (
              <div className="space-y-6">
                {/* Task info */}
                <div className="glass-card p-6">
                  <h3 className="font-display font-bold text-2xl text-white mb-3">
                    {language === 'ar' ? selectedTask.titleAr : selectedTask.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {language === 'ar' ? selectedTask.descriptionAr : selectedTask.description}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-athar-accent/20 text-athar-accent rounded-full text-sm">
                      {language === 'ar' ? 'صعوبة:' : 'Difficulty:'} {selectedTask.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                      {selectedTask.xp} XP
                    </span>
                  </div>
                </div>

                {/* Continue button */}
                <Button
                  variant="accent"
                  size="lg"
                  className="w-full"
                  onClick={() => navigate(`/task/${selectedTask.id}`)}
                >
                  {language === 'ar' ? 'ابدأ المهمة' : 'Start Task'}
                </Button>
              </div>
            ) : (
              <div className="glass-card p-12 text-center">
                <p className="text-gray-400">
                  {language === 'ar' ? 'اختر مهمة للبدء' : 'Select a task to begin'}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
