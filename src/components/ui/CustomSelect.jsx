import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function CustomSelect({ options, value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`relative min-w-[160px] ${className}`}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-[18px] text-sm cursor-pointer transition-all shadow-md ${
          isDark
            ? 'bg-[#0F172A] border border-slate-700 hover:border-red-500/50 text-white'
            : 'bg-white border border-[#D1FAE5] hover:border-[#10B981] text-[#0F172A]'
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
          isDark ? 'text-red-400' : 'text-emerald-600'
        } ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Custom Floating Dropdown Menu */}
      {isOpen && (
        <div className={`absolute right-0 top-full mt-2 w-full min-w-[170px] max-h-64 py-1.5 rounded-[18px] shadow-2xl backdrop-blur-2xl z-[100] overflow-y-auto ${
          isDark
            ? 'bg-[#0F172A] border border-red-500/40 text-white'
            : 'bg-white border border-[#D1FAE5] text-[#0F172A]'
        }`}>
          {options.map((opt) => {
            const isSelected = value === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold transition-colors text-left cursor-pointer ${
                  isSelected
                    ? isDark
                      ? 'bg-gradient-to-r from-red-600 to-slate-900 text-white font-bold'
                      : 'bg-[#10B981] text-white font-bold'
                    : isDark
                      ? 'text-slate-300 hover:bg-red-600/20 hover:text-white'
                      : 'text-slate-700 hover:bg-[#ECFDF5] hover:text-[#0F172A]'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <Check className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-red-400' : 'text-white'}`} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
