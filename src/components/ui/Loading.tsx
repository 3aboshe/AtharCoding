import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  textAr?: string;
  showText?: boolean;
}

export function Loading({ size = 'md', text, textAr, showText = true }: LoadingProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
  };

  const dotSizes = {
    sm: 'w-1.5 h-1.5',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className={cn(sizes[size], 'relative')}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn('absolute bg-athar-accent rounded-full', dotSizes[size])}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
            style={{
              top: '50%',
              left: `${25 + i * 25}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
      {showText && (text || textAr) && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-400 text-sm"
        >
          {textAr || text}
        </motion.p>
      )}
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading text="Loading Athar..." textAr="جاري تحميل أثر..." size="lg" />
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded', className)} />;
}
