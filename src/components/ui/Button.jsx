import React from 'react';
import { motion } from 'framer-motion';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#7C3AED] via-[#9333EA] to-[#06B6D4] text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-600/40 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-white/10 text-white backdrop-blur-md border border-white/10 hover:bg-white/15 hover:border-purple-500/50 hover:scale-[1.02] active:scale-[0.98]",
    outline: "bg-transparent text-white border border-purple-500/50 hover:bg-purple-600/10 hover:border-purple-400 hover:scale-[1.02] active:scale-[0.98]",
    ghost: "bg-transparent text-slate-300 hover:text-white hover:bg-white/5",
    accent: "bg-gradient-to-r from-[#06B6D4] to-[#38BDF8] text-slate-950 font-semibold shadow-lg shadow-cyan-900/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98]"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs gap-1.5",
    md: "px-6 py-3 text-sm gap-2",
    lg: "px-8 py-4 text-base gap-2.5 font-semibold"
  };

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full hover:animate-shimmer pointer-events-none" />

      {isLoading ? (
        <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
        </>
      )}
    </motion.button>
  );
}
