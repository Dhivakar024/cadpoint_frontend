import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function AccordionItem({ title, subtitle, children, isOpen, onToggle }) {
  return (
    <div className="glass-card rounded-2xl mb-4 overflow-hidden border border-white/10 transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
      >
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-cyan-400 mt-1 font-medium">{subtitle}</p>
          )}
        </div>
        <div className={`p-2 rounded-full bg-white/5 border border-white/10 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-purple-600/20 text-purple-400' : 'text-slate-400'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-2 text-slate-300 border-t border-white/5 text-base leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Accordion({ items, allowMultiple = false }) {
  const [openIndexes, setOpenIndexes] = useState([0]);

  const handleToggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          isOpen={openIndexes.includes(index)}
          onToggle={() => handleToggle(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
