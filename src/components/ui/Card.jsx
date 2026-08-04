import React from 'react';

export function Card({ children, className = '', hover = true, ...props }) {
  return (
    <div
      className={`glass-card rounded-2xl p-6 shadow-xl ${
        hover ? 'hover:-translate-y-1.5 transition-all duration-300' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
