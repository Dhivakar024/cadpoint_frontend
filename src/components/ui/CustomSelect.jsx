import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export function CustomSelect({ options, value, onChange, className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

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
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl glass-input text-sm cursor-pointer border border-slate-700 hover:border-red-500/50 bg-[#0F172A] text-white transition-all shadow-md"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={`w-4 h-4 text-red-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Custom Floating Dropdown Menu (High z-index: z-[100] & max-h-60 overflow-y-auto so no items are hidden) */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-full min-w-[170px] max-h-64 py-1.5 bg-[#0F172A] border border-red-500/40 rounded-xl shadow-2xl backdrop-blur-2xl z-[100] overflow-y-auto animate-fadeIn">
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
                    ? 'bg-gradient-to-r from-red-600 to-slate-900 text-white font-bold'
                    : 'text-slate-300 hover:bg-red-600/20 hover:text-white'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
