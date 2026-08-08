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
    // Primary: CADPOINT Red button with soft elevation
    primary: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white shadow-md shadow-red-600/20 border border-red-500/30 hover:shadow-lg hover:shadow-red-600/30 hover:-translate-y-0.5',
    
    // Secondary: Clean glass/slate button
    secondary: 'bg-slate-800/90 border border-slate-700 hover:border-red-500/50 hover:bg-slate-800 text-white shadow-sm hover:-translate-y-0.5',
    
    // Outline & Accent
    outline: 'border border-red-500/40 text-red-600 dark:text-red-400 hover:bg-red-500/10 hover:border-red-500',
    accent: 'bg-gradient-to-r from-red-600 to-red-700 text-white font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5',
    ghost: 'text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5',
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
