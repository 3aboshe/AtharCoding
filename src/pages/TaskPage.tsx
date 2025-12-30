import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, AlertCircle } from 'lucide-react';
import { TaskDescription, CodeEditor, CodeOutput } from '../components/features';
import { Button } from '../components/ui';
import { useApp } from '../contexts/AppContext';
import { usePyodide } from '../hooks/usePyodide';
import { useAIValidator } from '../hooks/useAIValidator';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskById, levels } from '../data/tasks';
import type { Task, ValidationResult } from '../types';
import { cn } from '../lib/utils';

// Confetti effect
const createConfetti = () => {
  const colors = ['#00d4ff', '#00ff88', '#ffcc00', '#ff6b6b', '#a855f7'];
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));
  return confetti;
};

export function TaskPage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { language, userProgress, completeTask, addToast, updateProgress } = useApp();
  const { isReady: pyodideReady, init: initPyodide, executeCode } = usePyodide();
  const { validate, isValidation } = useAIValidator();

  const [task, setTask] = useState<Task | null>(null);
  const [code, setCode] = useState('');
  const [starterCode, setStarterCode] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (taskId) {
      const foundTask = getTaskById(taskId);
      if (foundTask) {
        setTask(foundTask);
        setStarterCode(foundTask.starterCode);
        // Load saved code from localStorage
        const savedCode = localStorage.getItem(`athar-code-${taskId}`);
        setCode(savedCode || foundTask.starterCode);
        updateProgress({ currentTask: taskId });
      }
    }
  }, [taskId, updateProgress]);

  // Save code to localStorage
  useEffect(() => {
    if (taskId && code !== starterCode) {
      localStorage.setItem(`athar-code-${taskId}`, code);
    }
  }, [taskId, code, starterCode]);

  // Initialize Pyodide on mount
  useEffect(() => {
    initPyodide();
  }, [initPyodide]);

  // Clear validation result when code changes
  useEffect(() => {
    if (validationResult) {
      setValidationResult(null);
    }
    // Only clear when actually typing, not on initial load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const handleRunCode = async () => {
    if (!pyodideReady) {
      await initPyodide();
    }

    setIsRunning(true);
    setError(null);
    setValidationResult(null); // Clear validation result when running code

    try {
      const result = await executeCode(code);
      if (result.error) {
        setError(result.error);
        setOutput('');
      } else {
        setOutput(result.stdout);
        setError(null);
      }
    } catch (err: any) {
      setError(err?.message || 'Execution failed');
      setOutput('');
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (!task) return;

    setIsSubmitting(true);
    setValidationResult(null);

    try {
      const result = await validate({
        code,
        taskDescription: task.description,
        taskDescriptionAr: task.descriptionAr,
        expectedOutput: task.expectedOutput,
        starterCode: task.starterCode,
      });

      setValidationResult(result);

      if (result.isCorrect) {
        // Mark task as complete
        completeTask(task.id, task.xp);

        // Show success toast
        addToast({
          type: 'success',
          message: `Congratulations! You earned ${task.xp} XP!`,
          messageAr: `تهانينا! حصلت على ${task.xp} نقطة خبرة!`,
        });

        // Trigger confetti
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);

        // Find next task
        const level = levels.find(l => l.id === task.levelId);
        const nextTask = level?.tasks.find(t => !userProgress.completedTasks.includes(t.id));

        if (nextTask) {
          setTimeout(() => {
            navigate(`/task/${nextTask.id}`);
          }, 3000);
        }
      }
      // If incorrect, the result is stored and will be displayed in the UI
    } catch (err: any) {
      addToast({
        type: 'error',
        message: err?.message || 'Validation failed. Please try again.',
        messageAr: err?.message || 'فشل التحقق. يرجى المحاولة مرة أخرى.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCode(starterCode);
    setOutput('');
    setError(null);
    setValidationResult(null);
  };

  const handleBack = () => {
    navigate(`/level/${task?.levelId}`);
  };

  if (!task) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-white mb-4">
            {language === 'ar' ? 'المهمة غير موجودة' : 'Task not found'}
          </h2>
          <Button onClick={() => navigate('/')}>
            {language === 'ar' ? 'العودة للرئيسية' : 'Go Home'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && createConfetti().map((confetti) => (
          <motion.div
            key={confetti.id}
            initial={{ y: -100, rotate: 0 }}
            animate={{ y: window.innerHeight + 100, rotate: 720 }}
            transition={{
              duration: 3,
              delay: confetti.delay,
              ease: 'easeOut',
            }}
            style={{
              position: 'fixed',
              left: confetti.x,
              top: 0,
              width: 10,
              height: 10,
              backgroundColor: confetti.color,
              borderRadius: '50%',
              zIndex: 100,
            }}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBack}
            className="mb-4"
          >
            <ArrowLeft className={cn('w-4 h-4', language === 'ar' ? 'rotate-180' : '')} />
            {language === 'ar' ? 'العودة للمستوى' : 'Back to Level'}
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="font-display font-bold text-2xl text-white">
                  {language === 'ar' ? task.titleAr : task.title}
                </h1>
              </div>
              <p className="text-gray-400">
                {language === 'ar' ? 'اكتب الحل في المحرر وشغّل الكود' : 'Write your solution in the editor and run the code'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full text-sm">
                {task.xp} XP
              </span>
            </div>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left column - Task description only */}
          <div className="lg:col-span-2">
            <TaskDescription task={task} />
          </div>

          {/* Right column - Code editor and output */}
          <div className="lg:col-span-3 space-y-6">
            <CodeEditor
              value={code}
              onChange={setCode}
              onReset={handleReset}
              language="python"
              minHeight="450px"
            />
            <CodeOutput
              output={output}
              error={error}
              isRunning={isRunning}
              onRun={handleRunCode}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              onClear={() => { setOutput(''); setError(null); }}
            />

            {/* AI Validation Result Display */}
            <AnimatePresence>
              {validationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={cn(
                    'rounded-xl overflow-hidden border',
                    validationResult.isCorrect
                      ? 'border-green-500/30 bg-green-500/5'
                      : 'border-orange-500/30 bg-orange-500/5'
                  )}
                >
                  {/* Header */}
                  <div className={cn(
                    'flex items-center gap-3 px-4 py-3 border-b',
                    validationResult.isCorrect
                      ? 'border-green-500/20 bg-green-500/10'
                      : 'border-orange-500/20 bg-orange-500/10'
                  )}>
                    {validationResult.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    )}
                    <span className={cn(
                      'font-semibold',
                      validationResult.isCorrect ? 'text-green-300' : 'text-orange-300'
                    )}>
                      {validationResult.isCorrect
                        ? (language === 'ar' ? 'إجابة صحيحة!' : 'Correct Answer!')
                        : (language === 'ar' ? 'يحتاج إلى تحسين' : 'Needs Improvement')
                      }
                    </span>
                  </div>

                  {/* Feedback Content */}
                  <div className="p-4 space-y-4">
                    {/* English Feedback */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          Feedback
                        </span>
                      </div>
                      <p className="text-gray-200">
                        {validationResult.feedback}
                      </p>
                    </div>

                    {/* Arabic Feedback */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                          ملاحظات
                        </span>
                      </div>
                      <p className="text-gray-200" dir="rtl">
                        {validationResult.feedbackAr}
                      </p>
                    </div>

                    {/* Suggestions (if any) */}
                    {validationResult.suggestions && validationResult.suggestions.length > 0 && (
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Lightbulb className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium text-yellow-400">
                            {language === 'ar' ? 'اقتراحات للتحسين:' : 'Suggestions for improvement:'}
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {validationResult.suggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                              <span className="text-gray-500">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                        {validationResult.suggestionsAr && validationResult.suggestionsAr.length > 0 && (
                          <ul className="space-y-2 mt-3" dir="rtl">
                            {validationResult.suggestionsAr.map((suggestion, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                <span className="text-gray-500">•</span>
                                <span>{suggestion}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

