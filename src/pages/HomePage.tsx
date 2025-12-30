import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Terminal, Code2, Shield, Rocket, Play, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui';
import { useApp } from '../contexts/AppContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { levels } from '../data/tasks';

export function HomePage() {
  const { language } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const journeyScale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section - Extraordinary Design */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

          {/* Large flowing gradient blobs */}
          <motion.div
            className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-cyan-500/30 to-emerald-500/20 blur-[100px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-[100px]"
            animate={{
              x: [0, -80, 0],
              y: [0, -60, 0],
              scale: [1.2, 1, 1.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Floating code symbols */}
          {['def', 'if', 'for', 'print', 'class', 'return', 'import', 'async'].map((code, i) => (
            <motion.span
              key={code}
              className="absolute font-mono text-xl text-white/5"
              style={{
                left: `${10 + (i * 12)}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {code}
            </motion.span>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ y: heroY }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          {/* Logo with glow */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', duration: 1 }}
            className="mb-8 inline-block relative"
          >
            <img src="/logo.png" alt="Athar" className="w-24 h-24 mx-auto" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full blur-2xl opacity-50"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          {/* Main headline with typewriter effect */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-6"
          >
            <span className="block text-white">Learn to</span>
            <motion.span
              className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              Code
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
          >
            {language === 'ar'
              ? 'ابدأ رحلتك في البرمجة مع دروس تفاعلية وتحديات حقيقية'
              : 'Start your journey with interactive lessons, real challenges, and become a Python master'
            }
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/level/level-1')}
              className="group"
            >
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {language === 'ar' ? 'ابدأ الآن' : 'Start Learning'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats ticker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 flex justify-center gap-8 md:gap-16"
          >
            {[
              { value: '17+', label: 'Challenges' },
              { value: '6', label: 'Levels' },
              { value: '∞', label: 'Possibilities' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </section>

      {/* Journey Path Section - NOT Cards */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent" />

        <motion.div
          style={{ scale: journeyScale }}
          className="relative max-w-6xl mx-auto"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-display font-bold text-4xl md:text-5xl text-white mb-4"
          >
            {language === 'ar' ? 'رحلتك التعليمية' : 'Your Learning Journey'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-gray-400 mb-20 max-w-2xl mx-auto"
          >
            {language === 'ar'
              ? 'اتبع المسار من المبتدئ إلى المحترف'
              : 'Follow the path from beginner to expert. Each step builds on the last.'
            }
          </motion.p>

          {/* Winding path visualization */}
          <div className="relative">
            {/* SVG Path Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: `${levels.length * 180}px` }}>
              <motion.path
                d={levels.map((_, i) => {
                  const x = i % 2 === 0 ? '20%' : '80%';
                  const y = i * 180 + 90;
                  const prevX = i % 2 === 0 ? '80%' : '20%';
                  return i === 0
                    ? `M ${x} ${y}`
                    : `C ${prevX} ${y - 90}, ${x} ${y - 90}, ${x} ${y}`;
                }).join(' ')}
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="3"
                strokeDasharray="10 10"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#00ff88" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>

            {/* Level nodes */}
            <div className="relative" style={{ height: `${levels.length * 180}px` }}>
              {levels.map((level, i) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className={`absolute flex items-center gap-6 ${i % 2 === 0 ? 'left-0 md:left-[10%]' : 'right-0 md:right-[10%] flex-row-reverse'
                    }`}
                  style={{ top: `${i * 180}px` }}
                >
                  {/* Level circle */}
                  <motion.button
                    onClick={() => navigate(`/level/${level.id}`)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-white/20 flex items-center justify-center text-4xl hover:border-cyan-500/50 transition-colors shadow-xl"
                  >
                    {level.icon}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.button>

                  {/* Level info */}
                  <div className={`max-w-xs ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
                    <h3 className="font-display font-bold text-xl text-white mb-1">
                      {language === 'ar' ? level.titleAr : level.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      {language === 'ar' ? level.descriptionAr : level.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className="px-2 py-0.5 rounded-full bg-white/5">
                        {level.tasks.length} tasks
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400">
                        {level.xp} XP
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section - Minimal Icons, No Cards */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center font-display font-bold text-4xl md:text-5xl text-white mb-20"
          >
            {language === 'ar' ? 'لماذا أثر كودنج؟' : 'Why Athar Coding?'}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: Terminal,
                title: language === 'ar' ? 'تعلم بالممارسة' : 'Learn by Doing',
                description: language === 'ar'
                  ? 'اكتب كود حقيقي في المتصفح مباشرة'
                  : 'Write real Python code directly in your browser',
                gradient: 'from-cyan-500 to-blue-500',
              },
              {
                icon: Rocket,
                title: language === 'ar' ? 'من الصفر للاحتراف' : 'Zero to Hero',
                description: language === 'ar'
                  ? 'ابدأ بالأساسيات واصل حتى الأمن السيبراني'
                  : 'Start with basics, advance to cybersecurity',
                gradient: 'from-emerald-500 to-cyan-500',
              },
              {
                icon: Shield,
                title: language === 'ar' ? 'الأمن السيبراني' : 'Cybersecurity',
                description: language === 'ar'
                  ? 'تعلم تقنيات الحماية الحقيقية'
                  : 'Learn real-world security techniques',
                gradient: 'from-purple-500 to-pink-500',
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} items-center justify-center mb-6 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="font-display font-bold text-xl text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
              {language === 'ar' ? 'جرب الآن' : 'Try It Now'}
            </h2>
            <p className="text-gray-400">
              {language === 'ar'
                ? 'اكتب الكود في المحرر أدناه وشاهد النتيجة'
                : 'Write code in the editor below and see the result'
              }
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border-b border-white/10">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-sm text-gray-400 font-mono">hello.py</span>
            </div>

            {/* Code preview */}
            <div className="p-6 font-mono text-sm">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-purple-400">print</span>
                <span className="text-white">(</span>
                <span className="text-emerald-400">"Hello, World! 🚀"</span>
                <span className="text-white">)</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="mt-4 pt-4 border-t border-white/10"
              >
                <span className="text-gray-500"># Output:</span>
                <div className="text-cyan-400 mt-1">Hello, World! 🚀</div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <Button
              variant="accent"
              size="lg"
              onClick={() => navigate('/level/level-1')}
            >
              <Code2 className="w-5 h-5" />
              {language === 'ar' ? 'ابدأ أول تحدي' : 'Start Your First Challenge'}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Athar" className="w-10 h-10" />
            <span className="font-display font-bold text-white">Athar Coding</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 Athar Coding. {language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
          </p>
        </div>
      </footer>
    </div>
  );
}
