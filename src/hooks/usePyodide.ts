import { useState, useEffect, useCallback, useRef } from 'react';
import { initPyodide, executePython, isPyodideReady } from '../lib/pyodide';

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  error: string | null;
  success: boolean;
}

interface UsePyodideReturn {
  isReady: boolean;
  isLoading: boolean;
  error: string | null;
  executeCode: (code: string, timeout?: number) => Promise<ExecutionResult>;
  init: () => Promise<void>;
}

export function usePyodide(): UsePyodideReturn {
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const initPromiseRef = useRef<Promise<void> | null>(null);

  const init = useCallback(async () => {
    if (isPyodideReady()) {
      setIsReady(true);
      return;
    }

    if (initPromiseRef.current) {
      return initPromiseRef.current;
    }

    setIsLoading(true);
    setError(null);

    initPromiseRef.current = (async () => {
      try {
        await initPyodide();
        setIsReady(true);
        setError(null);
      } catch (err: any) {
        const errorMessage = err?.message || 'Failed to initialize Python environment';
        setError(errorMessage);
        console.error('Pyodide init error:', err);
      } finally {
        setIsLoading(false);
        initPromiseRef.current = null;
      }
    })();

    return initPromiseRef.current;
  }, []);

  const executeCode = useCallback(async (code: string, timeout = 5000): Promise<ExecutionResult> => {
    if (!isPyodideReady()) {
      await init();
    }

    try {
      const result = await executePython(code, timeout);
      return result;
    } catch (err: any) {
      return {
        stdout: '',
        stderr: '',
        error: err?.message || 'Execution failed',
        success: false,
      };
    }
  }, [init]);

  return {
    isReady,
    isLoading,
    error,
    executeCode,
    init,
  };
}
