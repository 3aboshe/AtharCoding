import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Maximize2, Minimize2, RotateCcw } from 'lucide-react';
import { Button } from '../ui';
import { useApp } from '../../contexts/AppContext';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
  language?: string;
  readOnly?: boolean;
  minHeight?: string;
}

export function CodeEditor({
  value,
  onChange,
  onReset,
  language = 'python',
  readOnly = false,
  minHeight = '400px',
}: CodeEditorProps) {
  const { language: appLanguage } = useApp();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const editorRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEditorMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Define custom dark theme using monaco instance
    monaco.editor.defineTheme('athar-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569cd6' },
        { token: 'string', foreground: 'ce9178' },
        { token: 'number', foreground: 'b5cea8' },
        { token: 'type', foreground: '4ec9b0' },
        { token: 'function', foreground: 'dcdcaa' },
        { token: 'variable', foreground: '9cdcfe' },
        { token: 'operator', foreground: 'd4d4d4' },
      ],
      colors: {
        'editor.background': '#0a0f1a',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#151b2b',
        'editorLineNumber.foreground': '#4a5268',
        'editorLineNumber.activeForeground': '#9cdcfe',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#1f2838',
        'editorCursor.foreground': '#9cdcfe',
        'editorBracketMatch.background': '#151b2b',
        'editorBracketMatch.border': '#4a5268',
      },
    });
    monaco.editor.setTheme('athar-dark');

    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      fontFamily: "'IBM Plex Mono', 'Fira Code', monospace",
      fontLigatures: true,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      renderLineHighlight: 'all',
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      smoothScrolling: true,
      padding: { top: 16, bottom: 16 },
      lineNumbers: 'on',
      glyphMargin: false,
      folding: true,
      lineDecorationsWidth: 10,
      lineNumbersMinChars: 3,
      bracketPairColorization: { enabled: true },
    });

    // Force layout after mount to ensure proper sizing
    setTimeout(() => {
      editor.layout();
    }, 100);
  };

  // Trigger layout when fullscreen changes
  useEffect(() => {
    if (editorRef.current) {
      const timer = setTimeout(() => {
        editorRef.current?.layout();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isFullscreen]);

  const containerClass = isFullscreen
    ? 'fixed inset-0 z-50 bg-athar-navy-950'
    : 'relative';

  return (
    <div ref={containerRef} className={containerClass}>
      {/* Editor toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-athar-navy-900/80 border-b border-white/10 rounded-t-xl">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            {appLanguage === 'ar' ? 'محرر الكود' : 'Code Editor'}
          </span>
          <span className="px-2 py-0.5 bg-athar-accent/20 text-athar-accent text-xs rounded">
            {language}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onReset}
            title={appLanguage === 'ar' ? 'إعادة تعيين' : 'Reset'}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen
              ? (appLanguage === 'ar' ? 'خروج من ملء الشاشة' : 'Exit Fullscreen')
              : (appLanguage === 'ar' ? 'ملء الشاشة' : 'Fullscreen')
            }
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div
        className="rounded-b-xl overflow-hidden"
        style={{ height: isFullscreen ? 'calc(100% - 52px)' : minHeight }}
      >
        <Editor
          height="100%"
          language={language}
          value={value}
          onChange={(newValue) => onChange(newValue || '')}
          onMount={handleEditorMount}
          theme="athar-dark"
          options={{
            readOnly,
            automaticLayout: false,
            scrollBeyondLastLine: false,
          }}
          loading={
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-athar-accent/30 border-t-athar-accent rounded-full animate-spin mx-auto" />
                <p className="text-gray-400">
                  {appLanguage === 'ar' ? 'جاري تحميل المحرر...' : 'Loading editor...'}
                </p>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
