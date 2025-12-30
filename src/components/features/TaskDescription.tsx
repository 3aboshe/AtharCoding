import { motion } from 'framer-motion';
import { Lightbulb, Code2, Target } from 'lucide-react';
import type { Task } from '../../types';
import { Badge, Button, XPBadge } from '../ui';
import { useApp } from '../../contexts/AppContext';
import { getHintFromAI } from '../../lib/ai-validator';
import { useState } from 'react';

interface TaskDescriptionProps {
  task: Task;
  onShowHint?: () => void;
}

export function TaskDescription({ task, onShowHint }: TaskDescriptionProps) {
  const { language } = useApp();
  const [loadingHint, setLoadingHint] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);

  const title = language === 'ar' ? task.titleAr : task.title;
  const description = language === 'ar' ? task.descriptionAr : task.description;
  const hints = language === 'ar' ? task.hintsAr : task.hints;

  const handleGetHint = async () => {
    setLoadingHint(true);
    try {
      const hint = await getHintFromAI({
        taskDescription: task.description,
        taskDescriptionAr: task.descriptionAr,
      });
      setAiHint(language === 'ar' ? hint.hintAr : hint.hint);
    } catch (error) {
      console.error('Failed to get hint:', error);
    } finally {
      setLoadingHint(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="font-display font-bold text-2xl text-white">{title}</h2>
            <Badge variant="difficulty" difficulty={task.difficulty} />
          </div>
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <XPBadge xp={task.xp} />
        </div>
      </div>

      {/* Task info cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Expected output */}
        {task.expectedOutput && (
          <div className="bg-athar-navy-900/50 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-athar-accent" />
              <span className="text-sm font-medium text-gray-300">
                {language === 'ar' ? 'المخرجات المتوقعة' : 'Expected Output'}
              </span>
            </div>
            <code className="text-sm text-green-400 font-mono">{task.expectedOutput}</code>
          </div>
        )}

        {/* Test cases count */}
        {task.testCases && task.testCases.length > 0 && (
          <div className="bg-athar-navy-900/50 rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Code2 className="w-4 h-4 text-athar-accent" />
              <span className="text-sm font-medium text-gray-300">
                {language === 'ar' ? 'حالات الاختبار' : 'Test Cases'}
              </span>
            </div>
            <span className="text-sm text-white">
              {task.testCases.length} {language === 'ar' ? 'اختبارات' : 'tests'}
            </span>
          </div>
        )}
      </div>

      {/* Hints section */}
      {(hints && hints.length > 0) && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold text-white">
                {language === 'ar' ? 'تلميحات' : 'Hints'}
              </span>
            </div>
            {!aiHint && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleGetHint}
                isLoading={loadingHint}
              >
                {language === 'ar' ? 'احصل على تلميح ذكي' : 'Get AI Hint'}
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {aiHint && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-athar-accent/10 border border-athar-accent/30 rounded-xl p-4"
              >
                <p className="text-sm text-athar-accent-glow">{aiHint}</p>
              </motion.div>
            )}
            {hints.map((hint, index) => (
              <div
                key={index}
                className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
              >
                <p className="text-sm text-yellow-200">{hint}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
