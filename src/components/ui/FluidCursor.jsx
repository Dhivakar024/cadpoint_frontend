import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

export function FluidCursor() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only run on devices with a fine pointer (mouse), not touch-only devices
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!hasPointer || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates and trailing history
    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100, moving: false };
    const points = [];
    const maxPoints = 20;

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.moving = true;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      mouse.targetX = -100;
      mouse.targetY = -100;
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Main animation loop
    const render = () => {
      // Lerp mouse position for silky smooth movement
      const ease = 0.18;
      mouse.x += (mouse.targetX - mouse.x) * ease;
      mouse.y += (mouse.targetY - mouse.y) * ease;

      // Add current interpolated position to trail points
      if (mouse.x > 0 && mouse.y > 0) {
        points.unshift({
          x: mouse.x,
          y: mouse.y,
          age: 0,
          radius: isDark ? 28 : 24,
        });
      }

      if (points.length > maxPoints) {
        points.pop();
      }

      // Clear previous frame
      ctx.clearRect(0, 0, width, height);

      // Render fluid smoke / light trail
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age += 1;
        const progress = p.age / maxPoints;
        const alpha = Math.max(0, 1 - progress) * (isDark ? 0.3 : 0.22);
        const currentRadius = p.radius * (1 + progress * 1.5);

        // Soft fluid radial gradient (Emerald / Mint / Soft Green)
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentRadius
        );

        if (isDark) {
          gradient.addColorStop(0, `rgba(52, 211, 153, ${alpha * 1.2})`);
          gradient.addColorStop(0.4, `rgba(16, 185, 129, ${alpha * 0.8})`);
          gradient.addColorStop(0.8, `rgba(6, 95, 70, ${alpha * 0.3})`);
          gradient.addColorStop(1, 'rgba(6, 95, 70, 0)');
        } else {
          gradient.addColorStop(0, `rgba(16, 185, 129, ${alpha * 1.3})`);
          gradient.addColorStop(0.4, `rgba(5, 150, 105, ${alpha * 0.7})`);
          gradient.addColorStop(0.8, `rgba(209, 250, 229, ${alpha * 0.4})`);
          gradient.addColorStop(1, 'rgba(209, 250, 229, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render subtle lead glow dot
      if (mouse.x > 0 && mouse.y > 0) {
        const leadGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          isDark ? 16 : 14
        );
        leadGrad.addColorStop(0, isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(16, 185, 129, 0.55)');
        leadGrad.addColorStop(0.6, isDark ? 'rgba(52, 211, 153, 0.25)' : 'rgba(5, 150, 105, 0.25)');
        leadGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.fillStyle = leadGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, isDark ? 16 : 14, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isDark, isVisible]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[40] transition-opacity duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        mixBlendMode: isDark ? 'screen' : 'multiply',
      }}
      aria-hidden="true"
    />
  );
}
