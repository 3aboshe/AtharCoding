import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import type { ToastMessage } from '../../types';
import { cn } from '../../lib/utils';
import { useApp } from '../../contexts/AppContext';

const toastIcons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const toastStyles = {
  success: 'toast-success',
  error: 'toast-error',
  info: 'toast-info',
};

export function ToastContainer() {
  const { toasts, removeToast, language } = useApp();

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onRemove={() => removeToast(toast.id)}
            language={language}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastProps {
  toast: ToastMessage;
  onRemove: () => void;
  language: 'en' | 'ar';
}

function Toast({ toast, onRemove, language }: ToastProps) {
  const Icon = toastIcons[toast.type];
  const message = language === 'ar' && toast.messageAr ? toast.messageAr : toast.message;

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(onRemove, toast.duration);
      return () => clearTimeout(timer);
    }
  }, [toast.duration, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'toast pointer-events-auto glass-card flex items-center gap-3 px-4 py-3 min-w-[300px] max-w-md',
        toastStyles[toast.type]
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="flex-1 text-sm">{message}</p>
      <button
        onClick={onRemove}
        className="flex-shrink-0 p-1 hover:bg-white/10 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
