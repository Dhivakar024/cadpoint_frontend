import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1.8 Seconds total duration for smooth 2s max transition
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#070B18] flex flex-col items-center justify-center overflow-hidden px-4"
        >
          {/* Soft Breathing Red & Navy Blue Glowing Aura Behind Logo */}
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-red-600/25 via-purple-600/20 to-blue-600/25 rounded-full blur-[140px] pointer-events-none"
          />

          {/* Minimal Floating Micro Particles Around Logo */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: (i % 4) * 110 - 165 + Math.random() * 50,
                  y: Math.random() * 320 - 160,
                  opacity: 0.1,
                }}
                animate={{
                  y: ['-12px', '12px', '-12px'],
                  opacity: [0.15, 0.45, 0.15],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-red-400/50 shadow-md shadow-red-500/50"
              />
            ))}
          </div>

          {/* Thin Light Sweep Line Behind Logo */}
          <motion.div
            initial={{ x: '-150%' }}
            animate={{ x: '150%' }}
            transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 6.8 }}
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10"
          />

          {/* OFFICIAL CADPOINT LOGO WITH RADIANT GLOW EFFECT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [-3, 3, -3], // Subtle float
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative z-20 flex items-center justify-center p-2 filter drop-shadow-[0_0_25px_rgba(239,68,68,0.5)] drop-shadow-[0_0_50px_rgba(30,58,138,0.4)]"
          >
            <img
              src="/cadpoint_logo.svg"
              alt="CADPOINT Authorized Training Centre - ISO Certified"
              className="w-[240px] sm:w-[320px] lg:w-[440px] h-auto object-contain shrink-0"
              style={{ preserveAspectRatio: 'xMidYMid meet' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
