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
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-900/40 rounded-full blur-[160px] pointer-events-none" />

          {/* Thin Traveling White Light Line */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-10"
          />

          {/* OFFICIAL CADPOINT LOGO IMAGE CONTAINER */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex flex-col items-center text-center z-20 p-6 rounded-3xl bg-white/95 shadow-2xl border border-white/20"
          >
            {/* Direct reference to the exact official CADPOINT logo image */}
            <img
              src="/cadpoint_logo.svg"
              alt="CADPOINT Authorized Training Centre"
              className="h-20 sm:h-28 w-auto object-contain"
            />

            {/* Subtle Light Sweep Pass Across Logo */}
            <motion.div
              initial={{ x: '-150%' }}
              animate={{ x: '150%' }}
              transition={{ duration: 1.0, delay: 0.6, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none rounded-3xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
