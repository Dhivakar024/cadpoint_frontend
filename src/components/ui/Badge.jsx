import React from 'react';

export function Badge({ children, variant = 'red', className = '' }) {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide backdrop-blur-md border';

  const variants = {
    red: 'bg-red-500/10 text-red-400 border-red-500/30',
    navy: 'bg-slate-900/80 text-blue-300 border-blue-500/30',
    purple: 'bg-red-500/10 text-red-300 border-red-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.red} ${className}`}>
      {children}
    </span>
  );
}
