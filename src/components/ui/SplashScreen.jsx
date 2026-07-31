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
          {/* Soft Breathing Red & Navy Blue Ambient Glows Behind Logo */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [0.98, 1.05, 0.98],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"
          />
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1.02, 0.95, 1.02],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-blue-900/20 rounded-full blur-[160px] pointer-events-none"
          />

          {/* Minimal Floating Micro Particles Behind/Around Logo */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: (i % 4) * 100 - 150 + Math.random() * 50,
                  y: Math.random() * 300 - 150,
                  opacity: 0.1,
                }}
                animate={{
                  y: ['-10px', '10px', '-10px'],
                  opacity: [0.1, 0.35, 0.1],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/40"
              />
            ))}
          </div>

          {/* Thin Light Sweep Line Behind the Image */}
          <motion.div
            initial={{ x: '-150%' }}
            animate={{ x: '150%' }}
            transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 6.8 }}
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10"
          />

          {/* UNCHANGED OFFICIAL CADPOINT LOGO IMAGE (Direct 380px Desktop Width, Height: Auto, Object Contain) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [-2, 2, -2], // 2px subtle float
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative z-20 flex items-center justify-center p-2"
          >
            <img
              src="/cadpoint_logo.svg"
              alt="CADPOINT Authorized Training Centre"
              className="w-[280px] sm:w-[380px] h-auto object-contain shrink-0"
              style={{ preserveAspectRatio: 'xMidYMid meet' }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
