import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function SplashScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Total 4 seconds: 3.6s visible + 0.4s fade out
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => { if (onComplete) onComplete(); }, 400);
    }, 3600);

    // Smooth progress bar: fills from 0 → 100 in 3.5s
    const start = Date.now();
    const duration = 3500;
    let raf;
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Mouse parallax
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-[#04060F] flex flex-col items-center justify-center overflow-hidden px-4 select-none"
        >
          {/* ── BACKGROUND GRID ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          {/* ── RED AMBIENT GLOW LEFT ── */}
          <motion.div
            animate={{ opacity: [0.3, 0.55, 0.3], x: mousePos.x * -0.4, y: mousePos.y * -0.4 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/15 rounded-full blur-[140px] pointer-events-none"
          />

          {/* ── NAVY AMBIENT GLOW RIGHT ── */}
          <motion.div
            animate={{ opacity: [0.2, 0.45, 0.2], x: mousePos.x * 0.4, y: mousePos.y * 0.4 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[150px] pointer-events-none"
          />

          {/* ── SUBTLE TOP VIGNETTE ── */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#04060F] to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#04060F] to-transparent pointer-events-none" />

          {/* ── FLOATING MICRO PARTICLES ── */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(18)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  left: `${10 + (i * 5.2) % 80}%`,
                  top: `${15 + (i * 7.3) % 70}%`,
                  opacity: 0,
                }}
                animate={{
                  y: [0, -18, 0],
                  opacity: [0, i % 3 === 0 ? 0.35 : 0.15, 0],
                }}
                transition={{
                  duration: 3 + (i % 4) * 0.7,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.2,
                }}
                className={`absolute w-1 h-1 rounded-full ${
                  i % 3 === 0 ? 'bg-red-400' : i % 3 === 1 ? 'bg-slate-400' : 'bg-blue-300'
                }`}
              />
            ))}
          </div>

          {/* ── MAIN LOGO BLOCK ── */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: mousePos.x * 0.4, }}
            transition={{ opacity: { duration: 0.7 }, y: { duration: 0.7 }, scale: { duration: 0.7 }, x: { duration: 0.15 } }}
            className="relative z-20 flex flex-col items-center gap-5"
          >
            {/* LOGO WITH LIGHT SWEEP */}
            <div className="relative overflow-hidden rounded-2xl p-2">
              <motion.img
                src="/cadpoint_logo.svg"
                alt="CADPOINT Authorized Training Centre - ISO Certified"
                animate={{
                  filter: 'brightness(1.05) drop-shadow(0 0 40px rgba(239,68,68,0.30))',
                }}
                className="w-[200px] sm:w-[270px] lg:w-[360px] h-auto object-contain"
                style={{ preserveAspectRatio: 'xMidYMid meet' }}
              />

              {/* LIGHT SWEEP — C to T */}
              <motion.div
                initial={{ x: '-130%' }}
                animate={{ x: '260%' }}
                transition={{ duration: 3.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
                className="absolute inset-0 w-[70px] sm:w-[100px] h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-[20deg] pointer-events-none mix-blend-overlay"
              />
            </div>

            {/* TAGLINE — fades in at 1.2s */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
              className="text-[11px] sm:text-xs tracking-[0.28em] uppercase font-semibold text-slate-400 text-center"
            >
              Salem's Premier CAD & IT Training Institute
            </motion.p>

            {/* ISO BADGE — fades in at 1.8s */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.5, ease: 'easeOut' }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/25 bg-red-500/8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold">
                ISO 9001 : 2008 Certified · Est. 1993
              </span>
            </motion.div>
          </motion.div>

          {/* ── PROGRESS BAR ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 w-[200px] sm:w-[260px] space-y-2"
          >
            {/* Track */}
            <div className="relative h-[3px] rounded-full bg-white/8 overflow-hidden">
              {/* Fill */}
              <motion.div
                style={{ width: `${progress}%` }}
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-red-600 via-red-400 to-slate-300"
              />
              {/* Glow tip */}
              <motion.div
                style={{ left: `${Math.max(0, progress - 4)}%` }}
                className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_3px_rgba(239,68,68,0.7)]"
              />
            </div>
            {/* Percentage label */}
            <div className="flex justify-between items-center">
              <span className="text-[9px] tracking-widest uppercase text-slate-600">Loading</span>
              <span className="text-[9px] font-bold text-slate-500">{Math.round(progress)}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
