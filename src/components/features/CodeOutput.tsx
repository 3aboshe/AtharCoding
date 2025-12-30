import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, CheckCircle2, XCircle, X, Send } from 'lucide-react';
import { Button } from '../ui';
import { useApp } from '../../contexts/AppContext';

interface CodeOutputProps {
  output: string;
  error: string | null;
  isRunning: boolean;
  onRun: () => void;
  onClear: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  className?: string;
}

export function CodeOutput({ output, error, isRunning, onRun, onClear, onSubmit, isSubmitting, className }: CodeOutputProps) {
  const { language } = useApp();

  const hasOutput = output.length > 0 || error !== null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 200 }}
      animate={{ opacity: 1, height: 'auto' }}
      className={className}
    >
      {/* Output header */}
      <div className="flex items-center justify-between px-4 py-2 bg-athar-navy-900/80 border-b border-white/10 rounded-t-xl">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-400">
            {language === 'ar' ? 'الخرج' : 'Output'}
          </span>
          {error && (
            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">
              {language === 'ar' ? 'خطأ' : 'Error'}
            </span>
          )}
          {!error && hasOutput && (
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
              {language === 'ar' ? 'نجح' : 'Success'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasOutput && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onClear}
              title={language === 'ar' ? 'مسح' : 'Clear'}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={onSubmit}
            isLoading={isSubmitting}
            disabled={isRunning || !output}
            title={language === 'ar' ? 'إرسال' : 'Submit'}
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">
              {language === 'ar' ? 'إرسال' : 'Submit'}
            </span>
          </Button>
          <Button
            variant="accent"
            size="sm"
            onClick={onRun}
            isLoading={isRunning}
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">
              {language === 'ar' ? 'تشغيل' : 'Run'}
            </span>
          </Button>
        </div>
      </div>

      {/* Output content */}
      <div className="bg-athar-navy-950/80 border border-white/10 border-t-0 rounded-b-xl overflow-hidden">
        <AnimatePresence mode="wait">
          {isRunning ? (
            <motion.div
              key="running"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12"
            >
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-athar-accent/30 border-t-athar-accent rounded-full animate-spin mx-auto" />
                <p className="text-gray-400">
                  {language === 'ar' ? 'جاري التشغيل...' : 'Running...'}
                </p>
              </div>
            </motion.div>
          ) : hasOutput ? (
            <motion.div
              key="output"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 max-h-64 overflow-y-auto"
            >
              {error ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-red-400">
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <span className="font-semibold">
                      {language === 'ar' ? 'حدث خطأ' : 'Error occurred'}
                    </span>
                  </div>
                  <pre className="text-red-300 text-sm whitespace-pre-wrap font-mono">
                    {error}
                  </pre>
                </div>
              ) : (
                <pre className={cn(
                  'text-sm whitespace-pre-wrap font-mono',
                  output.trim() ? 'text-green-400' : 'text-gray-400'
                )}>
                  {output || (language === 'ar' ? 'لا يوجد خرج' : 'No output')}
                </pre>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-12 text-gray-500"
            >
              <div className="text-center space-y-2">
                <Terminal className="w-12 h-12 mx-auto opacity-50" />
                <p className="text-sm">
                  {language === 'ar' ? 'اضغط تشغيل لتنفيذ الكود' : 'Press Run to execute code'}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
