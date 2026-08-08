import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    // Primary: Red -> Navy Gradient with soft glow & premium hover lift
    primary: 'bg-gradient-to-r from-red-600 via-red-700 to-slate-900 hover:from-red-500 hover:to-slate-800 text-white shadow-lg shadow-red-950/50 border border-red-500/30 hover:shadow-red-900/60 hover:-translate-y-0.5',
    
    // Secondary: Glass button with thin Navy border & red hover highlight
    secondary: 'bg-slate-900/70 border border-slate-700/80 hover:border-red-500/50 hover:bg-slate-800/80 text-white shadow-md hover:-translate-y-0.5',
    
    // Outline & Accent
    outline: 'border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500',
    accent: 'bg-gradient-to-r from-red-600 to-blue-900 text-white font-bold shadow-lg hover:shadow-red-600/40 hover:-translate-y-0.5',
    ghost: 'text-slate-300 hover:text-white hover:bg-white/5',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3.5 text-base gap-2.5 font-bold',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
