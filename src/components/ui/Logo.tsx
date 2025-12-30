import { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface LogoProps extends HTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

const LOGO_URL = 'https://maas-log-prod.cn-wlcb.ufileos.com/anthropic/38159199-9346-4ebe-8e90-f7e3990696a8/Logo-1-.png?UCloudPublicKey=TOKEN_e15ba47a-d098-4fbd-9afc-a0dcf0e4e621&Expires=1767109900&Signature=JGX7PIlA0JXv2thiqC8Y2g6Xjz0=';

export function Logo({ size = 'md', showText = true, className, ...props }: LogoProps) {
  const sizes = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
    xl: 'h-16 w-auto',
  };

  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      <img
        src={LOGO_URL}
        alt="Athar Coding"
        className={cn('object-contain', sizes[size])}
      />
      {showText && (
        <span className="font-display font-bold text-xl bg-gradient-to-r from-white to-athar-accent bg-clip-text text-transparent">
          Athar
        </span>
      )}
    </div>
  );
}
