import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Cookie, Sliders, Check, X } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

export function CookieConsentBanner() {
  const { hasMadeChoice, acceptAll, rejectOptional, openPreferencesModal } = useCookieConsent();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (hasMadeChoice) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-[90]"
      >
        <div
          className={`p-5 sm:p-6 rounded-3xl backdrop-blur-xl border shadow-2xl space-y-4 ${
            isDark
              ? 'bg-[#0B132B]/95 border-purple-500/30 text-white shadow-purple-950/40'
              : 'bg-white/95 border-emerald-300 text-slate-900 shadow-emerald-950/15'
          }`}
        >
          {/* Header Badge */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20">
                <Cookie className="w-4 h-4" />
              </span>
              <h4 className="text-sm font-bold font-heading tracking-wide">
                Cookie Preferences & Data Protection
              </h4>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              DPDP 2025 Ready
            </span>
          </div>

          {/* Explanation Text */}
          <p className="text-xs sm:text-xs leading-relaxed text-slate-300">
            We use necessary cookies to operate this website and, where applicable, optional cookies to improve functionality, understand website usage, or support relevant features. You can accept all, reject optional cookies, or manage your preferences.{' '}
            <Link
              to="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 underline font-semibold"
            >
              Read Privacy Notice
            </Link>.
          </p>

          {/* Action Buttons - All 3 Clearly Visible */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
            <Button
              variant="primary"
              size="sm"
              onClick={acceptAll}
              className="flex-1 justify-center text-xs py-2 font-semibold"
              icon={Check}
            >
              Accept All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={rejectOptional}
              className="flex-1 justify-center text-xs py-2 border-slate-600 hover:bg-white/10"
              icon={X}
            >
              Reject All
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={openPreferencesModal}
              className="flex-1 justify-center text-xs py-2"
              icon={Sliders}
            >
              Manage Preferences
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
