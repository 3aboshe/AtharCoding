import { motion } from 'framer-motion';
import { Languages, Trophy, Flame, Home, BookOpen } from 'lucide-react';
import { Logo, XPBadge } from '../ui';
import { useApp } from '../../contexts/AppContext';
import { formatXP } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
  const { language, toggleLanguage, userProgress } = useApp();
  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 glass-card border-t-0 border-x-0 rounded-none px-6 py-3"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <Logo size="md" />
        </div>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
          >
            <Home className="w-4 h-4" />
            <span>{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
          </button>
          <button
            onClick={() => navigate('/levels')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
          >
            <BookOpen className="w-4 h-4" />
            <span>{language === 'ar' ? 'المستويات' : 'Levels'}</span>
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Streak */}
          {userProgress.streak > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/20 border border-orange-500/30 rounded-full">
              <Flame className="w-4 h-4 text-orange-400" />
              <span className="text-orange-300 font-semibold">{userProgress.streak}</span>
            </div>
          )}

          {/* Total XP */}
          <XPBadge xp={userProgress.totalXP} />

          {/* Language toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
            title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <Languages className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">
              {language === 'ar' ? 'AR' : 'EN'}
            </span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
