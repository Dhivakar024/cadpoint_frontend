import React from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCookieConsent } from '../../context/CookieConsentContext';

export const getPrivacyMetadata = (formSource) => ({
  privacyAcknowledged: true,
  privacyNoticeVersion: '1.0',
  privacyAcknowledgedAt: new Date().toISOString(),
  formSource: formSource || 'website-form',
});

export function PrivacyAcknowledgement({
  checked = false,
  onChange,
  error = false,
  errorMessage = 'Please review the Privacy Notice and provide your consent before submitting.',
  id = 'privacy-acknowledgement',
  className = '',
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { hasReadPrivacyNotice, openPrivacyNoticeModal } = useCookieConsent();

  const handleLinkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openPrivacyNoticeModal();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Review Instruction Banner */}
      {!hasReadPrivacyNotice ? (
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
          <span className="flex items-center gap-1.5 font-medium">
            <Lock className="w-3.5 h-3.5 shrink-0 text-amber-400" />
            <span>Please review the Privacy Notice completely to enable consent.</span>
          </span>
          <button
            type="button"
            onClick={handleLinkClick}
            className="font-bold text-cyan-400 hover:text-cyan-300 underline shrink-0 cursor-pointer flex items-center gap-0.5"
          >
            Read Notice
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] text-emerald-300 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
          <span>Privacy Notice reviewed. You may now provide consent below.</span>
        </div>
      )}

      {/* Checkbox Input Container */}
      <div
        className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
          !hasReadPrivacyNotice
            ? 'opacity-60 bg-white/5 border-white/10 cursor-not-allowed'
            : error
            ? 'border-red-500/80 bg-red-500/10'
            : isDark
            ? 'border-white/10 bg-white/5 hover:border-white/20'
            : 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-300'
        }`}
      >
        <input
          type="checkbox"
          id={id}
          disabled={!hasReadPrivacyNotice}
          checked={Boolean(checked)}
          onChange={onChange}
          className={`mt-0.5 w-4 h-4 rounded border-slate-600 text-purple-600 focus:ring-purple-500 ${
            !hasReadPrivacyNotice ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        />
        <label
          htmlFor={id}
          className={`text-xs leading-relaxed text-slate-300 select-none ${
            !hasReadPrivacyNotice ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          I have read the{' '}
          <button
            type="button"
            onClick={handleLinkClick}
            className="font-semibold text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-0.5 cursor-pointer"
          >
            Privacy Notice
          </button>{' '}
          and understand how my personal data will be processed for this enquiry/registration.
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-[11px] font-medium text-red-400 flex items-center gap-1.5 pt-0.5 pl-1 animate-shake">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
}
