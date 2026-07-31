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
          {/* Soft Breathing Red & Navy Blue Ambient Glows */}
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

          {/* Minimal Floating Micro Particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: (i % 4) * 100 - 150 + Math.random() * 50,
                  y: Math.random() * 300 - 150,
                  opacity: 0.1,
                }}
                animate={{
                  y: ['-10px', '10px', '-10px'],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
                className="absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/40"
              />
            ))}
          </div>

          {/* PREMIUM FLOATING BRAND CARD (28px Radius, Pure White #FFFFFF, Increased Height) */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: [-2, 2, -2], // 2-3px slow floating movement
            }}
            transition={{
              scale: { duration: 0.5 },
              opacity: { duration: 0.5 },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative flex flex-col items-center justify-center text-center z-20 py-8 px-10 sm:py-10 sm:px-14 rounded-[28px] bg-[#FFFFFF] shadow-2xl border border-white/20 overflow-hidden"
          >
            {/* Direct reference to official CADPOINT logo with increased height & generous white space */}
            <img
              src="/cadpoint_logo.svg"
              alt="CADPOINT Authorized Training Centre - ISO 9001 : 2008 Certified"
              className="h-24 sm:h-32 w-auto object-contain shrink-0"
            />

            {/* Light Sweep Effect (Sweeping across card every 8 seconds) */}
            <motion.div
              animate={{
                x: ['-200%', '200%'],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                repeatDelay: 6.2, // Total cycle 8s
                ease: 'easeInOut',
              }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12 pointer-events-none"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
