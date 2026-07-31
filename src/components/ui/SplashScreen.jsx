import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1.8 Seconds total duration for sleek enterprise feel
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 500); // Fade transition duration
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#070B18] flex flex-col items-center justify-center overflow-hidden px-4"
        >
          {/* Subtle Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[160px] pointer-events-none" />

          {/* Thin Traveling White Light Sweep Line */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10"
          />

          {/* BRAND LOGO EMBLEM CONTAINER */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col items-center text-center z-20"
          >
            {/* Bold Brand Red Header */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-[#EF4444] font-heading drop-shadow-[0_4px_20px_rgba(239,68,68,0.3)]">
              CADPOINT
            </h1>

            {/* Dark Navy Blue Bar */}
            <div className="mt-1 px-4 py-1 bg-[#0F172A] border border-[#1E3A8A] rounded-sm shadow-md">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-white">
                AUTHORIZED TRAINING CENTRE
              </span>
            </div>

            {/* ISO Subtitle */}
            <div className="mt-1 text-[9px] sm:text-[11px] font-semibold text-slate-400 tracking-widest uppercase">
              ISO 9001 : 2008 CERTIFIED COMPANY
            </div>

            {/* Soft Light Sweep Shine Effect */}
            <motion.div
              initial={{ x: '-150%' }}
              animate={{ x: '150%' }}
              transition={{ duration: 1.0, delay: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            />
          </motion.div>

          {/* TAGLINE FADE IN */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mt-8 text-xs sm:text-sm font-semibold tracking-widest uppercase text-cyan-400 font-heading z-20 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span>Empowering Future Professionals</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
