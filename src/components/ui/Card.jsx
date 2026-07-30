import React from 'react';
import { motion } from 'framer-motion';

export function Card({
  children,
  className = '',
  hoverGlow = true,
  onClick,
  ...props
}) {
  return (
    <motion.div
      whileHover={hoverGlow ? { y: -6, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 relative overflow-hidden group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent group-hover:via-cyan-400/60 transition-all duration-500" />
      {children}
    </motion.div>
  );
}
