import { HTMLAttributes } from 'react';
import { cn, getDifficultyColor, getDifficultyBg } from '../../lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'difficulty' | 'xp' | 'success';
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({
  variant = 'default',
  difficulty,
  size = 'md',
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-full border';

  const variants = {
    default: 'bg-athar-accent/10 border-athar-accent/30 text-athar-accent-glow',
    difficulty: difficulty
      ? `${getDifficultyBg(difficulty)} ${getDifficultyColor(difficulty)}`
      : 'bg-gray-500/20 border-gray-500/30 text-gray-300',
    xp: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300',
    success: 'bg-green-500/20 border-green-500/30 text-green-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
}

export function XPBadge({ xp, className }: { xp: number; className?: string }) {
  return (
    <Badge variant="xp" className={cn('xp-badge gap-1.5', className)}>
      <span className="font-bold">XP</span>
      <span>{xp}</span>
    </Badge>
  );
}
