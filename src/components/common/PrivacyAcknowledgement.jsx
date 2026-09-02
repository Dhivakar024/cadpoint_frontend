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
  compact = false,
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
    <div className={`space-y-1.5 ${className}`}>
      {/* Review Instruction Banner */}
      {!hasReadPrivacyNotice ? (
        <div className={`flex items-center justify-between gap-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 ${compact ? 'p-1.5 px-2 text-[10px]' : 'p-2.5 text-[11px]'}`}>
          <span className="flex items-center gap-1.5 font-medium">
            <Lock className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} shrink-0 text-amber-400`} />
            <span>Please review Privacy Notice to enable consent.</span>
          </span>
          <button
            type="button"
            onClick={handleLinkClick}
            className="font-bold text-cyan-400 hover:text-cyan-300 underline shrink-0 cursor-pointer flex items-center gap-0.5"
          >
            Read
            <ArrowUpRight className="w-2.5 h-2.5" />
          </button>
        </div>
      ) : (
        <div className={`flex items-center gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium ${compact ? 'p-1 px-2 text-[10px]' : 'px-2.5 py-1.5 text-[11px]'}`}>
          <CheckCircle2 className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} shrink-0 text-emerald-400`} />
          <span>Privacy Notice reviewed. Consent unlocked.</span>
        </div>
      )}

      {/* Checkbox Input Container */}
      <div
        className={`flex items-start gap-2.5 rounded-xl border transition-all ${compact ? 'p-2' : 'p-3'} ${
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
          className={`mt-0.5 ${compact ? 'w-3.5 h-3.5' : 'w-4 h-4'} rounded border-slate-600 text-purple-600 focus:ring-purple-500 ${
            !hasReadPrivacyNotice ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        />
        <label
          htmlFor={id}
          className={`leading-relaxed text-slate-300 select-none ${compact ? 'text-[10px]' : 'text-xs'} ${
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
          and understand how my data will be processed.
        </label>
      </div>

      {/* Error Message */}
      {error && (
        <p className={`font-medium text-red-400 flex items-center gap-1.5 pt-0.5 pl-1 animate-shake ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
}
