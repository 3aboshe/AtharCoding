import { useState, useCallback } from 'react';
import { validateSolutionWithAI } from '../lib/ai-validator';
import type { ValidationResult } from '../lib/ai-validator';

interface UseAIValidatorReturn {
  isValidation: boolean;
  error: string | null;
  validate: (params: {
    code: string;
    taskDescription: string;
    taskDescriptionAr: string;
    expectedOutput?: string;
    starterCode?: string;
  }) => Promise<ValidationResult>;
}

export function useAIValidator(): UseAIValidatorReturn {
  const [isValidation, setIsValidation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = useCallback(async (params: {
    code: string;
    taskDescription: string;
    taskDescriptionAr: string;
    expectedOutput?: string;
    starterCode?: string;
  }): Promise<ValidationResult> => {
    setIsValidation(true);
    setError(null);

    try {
      const result = await validateSolutionWithAI(params);
      return result;
    } catch (err: any) {
      const errorMessage = err?.message || 'Validation failed';
      setError(errorMessage);
      return {
        isCorrect: false,
        feedback: errorMessage,
        feedbackAr: 'فشل التحقق',
        confidence: 0,
      };
    } finally {
      setIsValidation(false);
    }
  }, []);

  return {
    isValidation,
    error,
    validate,
  };
}
