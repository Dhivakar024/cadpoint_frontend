import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useCounter } from '../../hooks/useCounter';

export function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const { ref, isInView } = useScrollReveal({ amount: 0.5 });
  const count = useCounter(end, duration, isInView);

  return (
    <span ref={ref} className="font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-200 to-cyan-400">
      {count.toLocaleString()}{suffix}
    </span>
  );
}
