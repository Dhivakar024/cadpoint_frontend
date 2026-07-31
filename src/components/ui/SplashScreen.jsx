import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSweeping, setIsSweeping] = useState(false);

  useEffect(() => {
    // 3.6 Seconds loading duration + 0.4s fade out = 4.0 seconds total CADPOINT splash screen
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
    }, 3600);

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 8;
      const y = (e.clientY / innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onComplete]);

  // Synchronized 3% brightness boost during the 1.5s light sweep
  useEffect(() => {
    setIsSweeping(true);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#070B18] flex flex-col items-center justify-center overflow-hidden px-4 select-none"
        >
          {/* VERY LOW OPACITY SOFT RED AMBIENT GLOW (LEFT) */}
          <motion.div
            animate={{
              opacity: [0.25, 0.45, 0.25],
              x: mousePos.x * -0.3,
              y: mousePos.y * -0.3,
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none"
          />

          {/* VERY LOW OPACITY SOFT NAVY BLUE AMBIENT GLOW (RIGHT) */}
          <motion.div
            animate={{
              opacity: [0.25, 0.5, 0.25],
              x: mousePos.x * 0.3,
              y: mousePos.y * 0.3,
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute top-1/2 right-1/3 translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-blue-900/15 rounded-full blur-[140px] pointer-events-none"
          />

          {/* LOW OPACITY FLOATING MICRO PARTICLES */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: (i % 4) * 110 - 165 + Math.random() * 40,
                  y: Math.random() * 300 - 150,
                  opacity: 0.08,
                }}
                animate={{
                  y: ['-5px', '5px', '-5px'],
                  opacity: [0.08, 0.2, 0.08],
                }}
                transition={{
                  duration: 5 + (i % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.15,
                }}
                className={`absolute left-1/2 top-1/2 w-1.5 h-1.5 rounded-full ${
                  i % 2 === 0 ? 'bg-red-400/20' : 'bg-cyan-400/20'
                }`}
              />
            ))}
          </div>

          {/* LOGO CONTAINER WITH COMPACT SLEEK DIMENSIONS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x,
              y: mousePos.y + (Math.sin(Date.now() / 1000) * 1), // Gentle 2px float
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              x: { duration: 0.2, ease: 'out' },
              y: { duration: 0.2, ease: 'out' },
            }}
            className="relative z-20 flex items-center justify-center p-2 rounded-3xl overflow-hidden"
          >
            {/* UNCHANGED OFFICIAL CADPOINT LOGO IMAGE (Desktop 340px, Tablet 260px, Mobile 200px) */}
            <motion.img
              src="/cadpoint_logo.svg"
              alt="CADPOINT Authorized Training Centre - ISO Certified"
              animate={{
                filter: isSweeping
                  ? 'brightness(1.03) drop-shadow(0 10px 30px rgba(239,68,68,0.25))'
                  : 'brightness(1.00) drop-shadow(0 10px 30px rgba(239,68,68,0.18))',
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-[200px] sm:w-[260px] lg:w-[340px] h-auto object-contain shrink-0"
              style={{ preserveAspectRatio: 'xMidYMid meet' }}
            />

            {/* CINEMATIC LIGHT SWEEP (Continuous 3.5s smooth glide across full CADPOINT logo from C to T) */}
            <motion.div
              initial={{ x: '-150%' }}
              animate={{ x: '250%' }}
              transition={{
                duration: 3.5,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 w-[60px] sm:w-[90px] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[20deg] pointer-events-none mix-blend-overlay backdrop-blur-[2px]"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
