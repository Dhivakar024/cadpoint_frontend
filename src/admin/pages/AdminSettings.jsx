import React, { useState } from 'react';
import {
  UserCheck,
  KeyRound,
  Sun,
  Moon,
  Bell,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Server,
  Database,
  Lock
} from 'lucide-react';
import { changeAdminPassword } from '../services/adminApi';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useTheme } from '../../context/ThemeContext';
import { COMPANY_INFO } from '../../utils/constants';

export function AdminSettings() {
  const { user } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [leadAlerts, setLeadAlerts] = useState(true);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);
    try {
      await changeAdminPassword(currentPassword, newPassword);
      setMessage('Password changed successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || 'Failed to change password. Please verify current password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className={`pb-6 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <h1 className={`text-3xl sm:text-4xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Admin Settings & Security
        </h1>
        <p className="text-sm text-slate-500 font-medium mt-1">
          Manage administrator profile, credentials, and notification preferences
        </p>
      </div>

      {/* 1. ADMIN PROFILE */}
      <div className={`p-8 rounded-3xl border space-y-5 ${
        isDark ? 'glass-panel border-purple-500/30' : 'bg-white border-purple-200 shadow-md'
      }`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-purple-500" />
          Admin Profile Overview
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
          <div className={`p-5 rounded-2xl border space-y-1.5 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Admin Username / Email</span>
            <strong className={`block font-mono text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {user?.email || 'cadpointsalem001@gmail.com'}
            </strong>
          </div>
          <div className={`p-5 rounded-2xl border space-y-1.5 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
          }`}>
            <span className="text-slate-500 text-xs uppercase font-bold tracking-wider">Display Name & Authority</span>
            <strong className={`block font-heading text-base font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Salem Head Office Super Admin
            </strong>
          </div>
        </div>
      </div>

      {/* 2. SECURITY — CHANGE PASSWORD */}
      <div className={`p-8 rounded-3xl border space-y-5 ${
        isDark ? 'glass-panel border-red-500/30' : 'bg-white border-red-200 shadow-md'
      }`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-red-500" />
          Security — Change Password
        </h3>

        {message && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-5 text-sm">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Current Password *
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              required
              className={`w-full p-3.5 rounded-2xl text-sm transition-all ${
                isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-red-500'
              }`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                New Password *
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 6 chars)"
                required
                className={`w-full p-3.5 rounded-2xl text-sm transition-all ${
                  isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-red-500'
                }`}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Confirm New Password *
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className={`w-full p-3.5 rounded-2xl text-sm transition-all ${
                  isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-red-500'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-3.5 px-6 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors shadow-lg shadow-red-600/30 cursor-pointer disabled:opacity-50"
          >
            {submitting ? 'Updating Password...' : 'Update Admin Password'}
          </button>
        </form>
      </div>

      {/* 3. NOTIFICATION & SYSTEM PREFERENCES */}
      <div className={`p-8 rounded-3xl border space-y-5 ${
        isDark ? 'glass-panel border-emerald-500/30' : 'bg-white border-emerald-200 shadow-md'
      }`}>
        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <Bell className="w-5 h-5 text-emerald-500" />
          Live Alert Configuration
        </h3>
        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between">
            <div>
              <strong className={`block font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Email Lead Notifications
              </strong>
              <span className="text-xs text-slate-500">
                Receive transactional Resend emails for Contact & Registration submissions
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-5 h-5 text-emerald-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
            <div>
              <strong className={`block font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Instant WhatsApp Webhook Alerts
              </strong>
              <span className="text-xs text-slate-500">
                Forward Quick Admissions & Contact leads to WhatsApp 9566679928
              </span>
            </div>
            <input
              type="checkbox"
              checked={leadAlerts}
              onChange={(e) => setLeadAlerts(e.target.checked)}
              className="w-5 h-5 text-emerald-600 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
