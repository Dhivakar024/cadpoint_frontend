import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

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
  errorMessage = 'Please read and accept the Privacy Notice before submitting.',
  id = 'privacy-acknowledgement',
  className = '',
}) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div
        className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all ${
          error
            ? 'border-red-500/80 bg-red-500/10'
            : isDark
            ? 'border-white/10 bg-white/5 hover:border-white/20'
            : 'border-emerald-200 bg-emerald-50/50 hover:border-emerald-300'
        }`}
      >
        <input
          type="checkbox"
          id={id}
          checked={Boolean(checked)}
          onChange={onChange}
          className="mt-0.5 w-4 h-4 rounded border-slate-600 text-purple-600 focus:ring-purple-500 cursor-pointer shrink-0"
        />
        <label htmlFor={id} className="text-xs leading-relaxed text-slate-300 cursor-pointer select-none">
          I have read the{' '}
          <Link
            to="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            Privacy Notice
          </Link>{' '}
          and understand how my personal data will be processed for this enquiry/registration.
        </label>
      </div>

      {error && (
        <p className="text-[11px] font-medium text-red-400 flex items-center gap-1.5 pt-0.5 pl-1 animate-shake">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </p>
      )}
    </div>
  );
}
