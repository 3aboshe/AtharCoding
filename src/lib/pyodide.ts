/**
 * Pyodide integration for Python code execution in browser
 */

let pyodideInstance: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

export interface PyodideConfig {
  indexURL?: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  error: string | null;
  success: boolean;
}

/**
 * Initialize Pyodide with caching
 */
export async function initPyodide(config: PyodideConfig = {}): Promise<any> {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (isLoading && loadPromise) {
    return loadPromise;
  }

  isLoading = true;
  loadPromise = (async () => {
    try {
      // Wait for the script to load
      await new Promise((resolve) => {
        if (typeof (window as any).loadPyodide === 'function') {
          resolve(0);
        } else {
          const checkInterval = setInterval(() => {
            if (typeof (window as any).loadPyodide === 'function') {
              clearInterval(checkInterval);
              resolve(0);
            }
          }, 100);
        }
      });

      pyodideInstance = await (window as any).loadPyodide({
        indexURL: config.indexURL || 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });

      // Install common packages
      await pyodideInstance.loadPackage(['micropip']);

      return pyodideInstance;
    } catch (error) {
      console.error('Failed to load Pyodide:', error);
      throw new Error('Failed to initialize Python environment');
    } finally {
      isLoading = false;
    }
  })();

  return loadPromise;
}

/**
 * Execute Python code with timeout
 */
export async function executePython(
  code: string,
  timeout: number = 5000
): Promise<ExecutionResult> {
  if (!pyodideInstance) {
    await initPyodide();
  }

  let stdout: string[] = [];
  let stderr: string[] = [];

  // Redirect stdout and stderr
  pyodideInstance.setStdout({
    batched: (text: string) => stdout.push(text),
  });

  pyodideInstance.setStderr({
    batched: (text: string) => stderr.push(text),
  });

  try {
    // Wrap code in a try-except for better error handling
    const wrappedCode = `
import sys
from io import StringIO

# Capture stdout
old_stdout = sys.stdout
sys.stdout = StringIO()

try:
${code.split('\n').map(line => '    ' + line).join('\n')}

finally:
    output = sys.stdout.getvalue()
    sys.stdout = old_stdout
    print(output, end='')
`;

    // Run with timeout using Promise.race
    const result = await Promise.race([
      pyodideInstance.runPythonAsync(wrappedCode),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Execution timeout')), timeout)
      ),
    ]);

    const output = stdout.join('') || result?.toString() || '';

    return {
      stdout: output,
      stderr: stderr.join(''),
      error: null,
      success: true,
    };
  } catch (error: any) {
    return {
      stdout: stdout.join(''),
      stderr: stderr.join(''),
      error: error.message || error.toString(),
      success: false,
    };
  }
}

/**
 * Check if Pyodide is ready
 */
export function isPyodideReady(): boolean {
  return pyodideInstance !== null;
}

/**
 * Reset Pyodide instance
 */
export function resetPyodide(): void {
  pyodideInstance = null;
  isLoading = false;
  loadPromise = null;
}

/**
 * Install Python package
 */
export async function installPackage(packageName: string): Promise<void> {
  if (!pyodideInstance) {
    await initPyodide();
  }

  try {
    await pyodideInstance.loadPackage(packageName);
  } catch (error) {
    console.error(`Failed to install package ${packageName}:`, error);
    throw error;
  }
}
