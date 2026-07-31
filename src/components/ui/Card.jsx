import React from 'react';

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 p-6 shadow-xl ${
        hover ? 'hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-950/30 hover:-translate-y-1 transition-all duration-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
