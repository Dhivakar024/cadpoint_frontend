import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Cookie, Check, Sliders, Info, Lock } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';

export function CookiePreferencesModal() {
  const {
    isModalOpen,
    closePreferencesModal,
    categories,
    acceptAll,
    rejectOptional,
    saveCustomPreferences,
  } = useCookieConsent();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [localCategories, setLocalCategories] = useState({
    necessary: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    if (categories) {
      setLocalCategories({
        necessary: true,
        analytics: Boolean(categories.analytics),
        functional: Boolean(categories.functional),
        marketing: Boolean(categories.marketing),
      });
    }
  }, [categories, isModalOpen]);

  if (!isModalOpen) return null;

  const handleToggle = (key) => {
    if (key === 'necessary') return; // Cannot disable necessary
    setLocalCategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    saveCustomPreferences(localCategories);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 border shadow-2xl overflow-hidden my-8 ${
            isDark
              ? 'bg-[#0B132B] border-purple-500/30 text-white shadow-purple-950/40'
              : 'bg-white border-emerald-300 text-slate-900 shadow-xl'
          }`}
        >
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closePreferencesModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <Sliders className="w-5 h-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                Privacy & Preference Center
              </span>
            </div>
            <h3 className="text-2xl font-extrabold font-heading tracking-tight">
              Manage Cookie Consent & Preferences
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              In accordance with the Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025, you can customize your cookie preferences below. Necessary cookies are required for site security and basic operation.
            </p>
          </div>

          {/* Category List */}
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
            {/* Category 1: Necessary Cookies */}
            <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <h4 className="text-sm font-bold">1. Necessary Cookies</h4>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Always Active
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed pl-6">
                Essential for core website features, secure navigation, form submission integrity, and session handling. These cookies cannot be disabled.
              </p>
            </div>

            {/* Category 2: Analytics Cookies */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-sm font-bold">2. Analytics Cookies</h4>
                <button
                  type="button"
                  onClick={() => handleToggle('analytics')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    localCategories.analytics ? 'bg-purple-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      localCategories.analytics ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Helps us understand aggregated visitor traffic, page views, and overall site performance to continuously improve your learning experience.
              </p>
            </div>

            {/* Category 3: Functional / Preference Cookies */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-sm font-bold">3. Functional / Preference Cookies</h4>
                <button
                  type="button"
                  onClick={() => handleToggle('functional')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    localCategories.functional ? 'bg-purple-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      localCategories.functional ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Remembers user interface preferences such as dark/light theme choice, regional course recommendations, and filter states.
              </p>
            </div>

            {/* Category 4: Marketing Cookies */}
            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-2">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-sm font-bold">4. Marketing & Communication Cookies</h4>
                <button
                  type="button"
                  onClick={() => handleToggle('marketing')}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    localCategories.marketing ? 'bg-purple-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      localCategories.marketing ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Used strictly when consented to deliver relevant course updates, campaign communications, and specialized career counseling offers.
              </p>
            </div>
          </div>

          {/* Buttons Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 mt-4 border-t border-white/10">
            <Button
              variant="primary"
              size="md"
              onClick={handleSave}
              className="flex-1 justify-center text-xs font-semibold"
              icon={Check}
            >
              Save Preferences
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={acceptAll}
              className="flex-1 justify-center text-xs"
            >
              Accept All
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={rejectOptional}
              className="flex-1 justify-center text-xs border-slate-600 hover:bg-white/10"
            >
              Reject Optional
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
