import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Check, X, Sliders, ArrowUpRight } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

export function CookieConsentBanner() {
  const {
    hasMadeChoice,
    acceptAll,
    rejectOptional,
    openPreferencesModal,
    openPrivacyNoticeModal,
  } = useCookieConsent();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (hasMadeChoice) return null;

  const handlePrivacyNoticeClick = (e) => {
    e.preventDefault();
    openPrivacyNoticeModal();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-3 left-3 right-3 md:left-1/2 md:-translate-x-1/2 md:max-w-4xl z-[90]"
      >
        <div
          className={`px-4 py-3.5 sm:px-6 sm:py-4 rounded-2xl backdrop-blur-xl border shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-6 ${
            isDark
              ? 'bg-[#0B132B]/95 border-purple-500/30 text-white shadow-purple-950/40'
              : 'bg-white/95 border-emerald-300 text-slate-900 shadow-emerald-950/15'
          }`}
        >
          {/* Info Side */}
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Cookie className="w-3.5 h-3.5" />
              </span>
              <h4 className="text-xs font-bold font-heading tracking-wide">
                Cookie Preferences & Data Protection
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs leading-tight text-slate-300">
              We use necessary cookies for site security and optional cookies to improve performance and features.{' '}
              <button
                type="button"
                onClick={handlePrivacyNoticeClick}
                className="text-cyan-400 hover:text-cyan-300 underline font-semibold cursor-pointer inline-flex items-center gap-0.5"
              >
                Read Privacy Notice
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </p>
          </div>

          {/* Action Buttons - Shorter & Wide Bar */}
          <div className="flex flex-row items-center gap-2 w-full md:w-auto shrink-0 justify-end pt-1 md:pt-0">
            <Button
              variant="primary"
              size="sm"
              onClick={acceptAll}
              className="flex-1 md:flex-initial justify-center text-[11px] py-1.5 px-3 font-semibold h-8"
              icon={Check}
            >
              Accept All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={rejectOptional}
              className="flex-1 md:flex-initial justify-center text-[11px] py-1.5 px-3 border-slate-600 hover:bg-white/10 h-8"
              icon={X}
            >
              Reject All
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={openPreferencesModal}
              className="flex-1 md:flex-initial justify-center text-[11px] py-1.5 px-3 h-8"
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
