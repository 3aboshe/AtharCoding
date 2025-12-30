import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { Button } from '../ui';
import { useApp } from '../../contexts/AppContext';
import type { ValidationResult } from '../../types';

interface SubmitPanelProps {
  isSubmitting: boolean;
  validation: ValidationResult | null;
  onSubmit: () => void;
}

export function SubmitPanel({ isSubmitting, validation, onSubmit }: SubmitPanelProps) {
  const { language } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 space-y-4"
    >
      {/* Submit button */}
      <Button
        variant="accent"
        size="lg"
        onClick={onSubmit}
        isLoading={isSubmitting}
        className="w-full"
      >
        <Sparkles className="w-5 h-5" />
        <span className="text-lg">
          {language === 'ar' ? 'إرسال للحصول على الموافقة' : 'Submit for Approval'}
        </span>
      </Button>

      {/* Validation result */}
      {validation && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={cn(
            'p-4 rounded-xl border',
            validation.isCorrect
              ? 'bg-green-500/10 border-green-500/30'
              : 'bg-red-500/10 border-red-500/30'
          )}
        >
          <div className="flex items-start gap-3">
            <div className={cn(
              'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
              validation.isCorrect ? 'bg-green-500/30' : 'bg-red-500/30'
            )}>
              {validation.isCorrect ? (
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <p className={cn(
                'font-medium mb-2',
                validation.isCorrect ? 'text-green-300' : 'text-red-300'
              )}>
                {language === 'ar' ? validation.feedbackAr : validation.feedback}
              </p>
              {(validation.suggestions && validation.suggestions.length > 0) && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">
                    {language === 'ar' ? 'اقتراحات:' : 'Suggestions:'}
                  </p>
                  {(language === 'ar' ? validation.suggestionsAr : validation.suggestions)?.map((suggestion, i) => (
                    <p key={i} className="text-sm text-gray-300">
                      • {suggestion}
                    </p>
                  ))}
                </div>
              )}
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      validation.confidence > 0.7 ? 'bg-green-500' : 'bg-yellow-500'
                    )}
                    style={{ width: `${validation.confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-gray-400">
                  {Math.round(validation.confidence * 100)}% {language === 'ar' ? 'ثقة' : 'confidence'}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
