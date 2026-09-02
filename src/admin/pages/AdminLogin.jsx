import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useTheme } from '../../context/ThemeContext';

export function AdminLogin() {
  const { login, isAuthenticated } = useAdminAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [forgotModal, setForgotModal] = useState(false);

  // Fluid Cursor Smoke Border Effect State & Refs
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 200, y: 200 });
  const targetPos = useRef({ x: 200, y: 200 });
  const currentPos = useRef({ x: 200, y: 200 });
  const animFrameId = useRef(null);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Smooth lerp animation loop for fluid cursor smoke effect
  useEffect(() => {
    // Check if device is touch-only
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    let isRunning = true;

    const animateSmoke = () => {
      if (!isRunning) return;

      // Smooth interpolation (lerp)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.09;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.09;

      setMousePos({
        x: Math.round(currentPos.current.x * 10) / 10,
        y: Math.round(currentPos.current.y * 10) / 10,
      });

      animFrameId.current = requestAnimationFrame(animateSmoke);
    };

    animFrameId.current = requestAnimationFrame(animateSmoke);

    return () => {
      isRunning = false;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    if (!isHovered) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      targetPos.current = {
        x: rect.width / 2,
        y: rect.height / 2,
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(username, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      let errMsg = err?.response?.data?.error || err.message || 'Invalid username or password.';
      if (errMsg === 'Network Error') {
        errMsg = 'Unable to connect to CADPOINT Server. The backend service may be waking up — please click Sign In again.';
      }
      setError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 overflow-hidden relative ${
        isDark ? 'bg-[#070B18] text-[#F8FAFC]' : 'bg-slate-100 text-slate-900'
      }`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Card with Fluid Cursor Smoke Border */}
      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-md my-auto group"
      >
        {/* Layer 1: Outer Fluid Smoke Aura (Distortion & Soft Spread) */}
        <div
          className="absolute -inset-[10px] rounded-[34px] pointer-events-none transition-opacity duration-1000 z-0"
          style={{
            opacity: isHovered ? 0.6 : 0.2,
            background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.45), rgba(6, 182, 212, 0.25) 45%, rgba(239, 68, 68, 0.15) 70%, transparent 85%)`,
            filter: 'blur(16px)',
          }}
        />

        {/* Layer 2: Tight Border Smoke / Fluid Light Edge */}
        <div
          className="absolute -inset-[2.5px] rounded-[26px] pointer-events-none transition-opacity duration-500 z-0"
          style={{
            opacity: isHovered ? 1 : 0.45,
            background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, rgba(168, 85, 247, 0.9), rgba(6, 182, 212, 0.65) 40%, rgba(239, 68, 68, 0.4) 65%, transparent 80%)`,
            filter: 'blur(3px)',
          }}
        />

        {/* Layer 3: Solid Inner Card with High Readability */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`relative z-10 w-full rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 ${
            isDark
              ? 'bg-[#0B132B]/95 border-purple-500/30 text-white shadow-purple-950/40'
              : 'bg-white border-emerald-300 text-slate-900 shadow-xl'
          }`}
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 mx-auto shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 block pt-1">
              CADPOINT Authorized Training Centre
            </span>
            <h1 className="text-2xl font-black font-heading text-gradient">
              Admin Panel Authentication
            </h1>
            <p className="text-xs text-slate-400">
              Sign in to access CADPOINT administration dashboard.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">Admin Username / Email *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin Username / Email"
                  autoComplete="off"
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl glass-input text-xs"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-slate-300">Admin Password *</label>
                <button
                  type="button"
                  onClick={() => setForgotModal(true)}
                  className="text-[11px] text-cyan-400 hover:underline cursor-pointer font-medium"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  autoComplete="off"
                  className="w-full pl-10 pr-10 py-3 rounded-xl glass-input text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-cyan-600 hover:from-red-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Admin Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {forgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-sm rounded-3xl p-6 glass-panel border border-cyan-500/40 text-center space-y-4">
            <KeyRound className="w-8 h-8 text-cyan-400 mx-auto" />
            <h3 className="text-lg font-bold text-white font-heading">Reset Credentials</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Admin password resets must be issued by Salem Head Office IT Super-Admin:
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-200">
              <strong>cadpointsalem001@gmail.com</strong> | <strong>+91 95666 79928</strong>
            </div>
            <button
              onClick={() => setForgotModal(false)}
              className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
