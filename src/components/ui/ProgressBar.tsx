import { cn } from '../../lib/utils';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function ProgressBar({ progress, showLabel = false, label, size = 'md', className }: ProgressBarProps) {
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm text-gray-300">{label}</span>}
          {showLabel && <span className="text-sm font-semibold text-athar-accent-glow">{clampedProgress}%</span>}
        </div>
      )}
      <div className={cn('progress-bar', sizes[size])}>
        <div
          className="progress-fill"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
