import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 1.8 Seconds total duration for smooth 2s max transition
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
    }, 1800);

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 12; // Subtle 12px parallax range
      const y = (e.clientY / innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#070B18] flex flex-col items-center justify-center overflow-hidden px-4 select-none"
        >
          {/* 1. SOFT BRAND RED AMBIENT GLOW ON LEFT */}
          <motion.div
            animate={{
              opacity: [0.35, 0.65, 0.35],
              scale: [0.95, 1.05, 0.95],
              x: mousePos.x * -0.5,
              y: mousePos.y * -0.5,
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-red-600/20 rounded-full blur-[140px] pointer-events-none"
          />

          {/* 2. SOFT NAVY BLUE AMBIENT GLOW ON RIGHT */}
          <motion.div
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [1.03, 0.96, 1.03],
              x: mousePos.x * 0.5,
              y: mousePos.y * 0.5,
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-blue-900/30 rounded-full blur-[150px] pointer-events-none"
          />

          {/* 3. TINY FLOATING PARTICLES WITH LOW OPACITY */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(16)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: (i % 4) * 110 - 165 + Math.random() * 40,
                  y: Math.random() * 300 - 150,
                  opacity: 0.1,
                }}
                animate={{
                  y: ['-8px', '8px', '-8px'],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: 4.5 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
                className={`absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full ${
                  i % 2 === 0 ? 'bg-red-400/40' : 'bg-cyan-400/30'
                }`}
              />
            ))}
          </div>

          {/* 4. THIN CINEMATIC WHITE LIGHT SWEEP EVERY 8 SECONDS */}
          <motion.div
            initial={{ x: '-150%' }}
            animate={{ x: '150%' }}
            transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 6.8 }}
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10"
          />

          {/* 5. UNCHANGED OFFICIAL CADPOINT LOGO WITH GENTLE 2px FLOAT & MOUSE PARALLAX */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x,
              y: mousePos.y + (Math.sin(Date.now() / 1000) * 2), // Gentle 2px float
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              x: { duration: 0.2, ease: 'out' },
              y: { duration: 0.2, ease: 'out' },
            }}
            className="relative z-20 flex items-center justify-center p-2 filter drop-shadow-[0_12px_35px_rgba(239,68,68,0.25)] drop-shadow-[0_0_40px_rgba(30,58,138,0.2)]"
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
