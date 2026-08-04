import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default theme is 'dark'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('cadpoint_theme');
      return savedTheme === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
      root.classList.add('light-theme');
    } else {
      root.setAttribute('data-theme', 'dark');
      root.classList.remove('light-theme');
    }
    localStorage.setItem('cadpoint_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setIsTransitioning(true);
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isTransitioning }}>
      {children}
      {/* Cinematic Transition Ambient Glow Sweep */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] pointer-events-none transition-opacity duration-500 bg-gradient-to-r from-transparent via-red-500/10 to-transparent animate-pulse" />
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
