import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  ShieldCheck,
  KeyRound,
  Sun,
  Moon,
  Bell,
  MapPin,
  Activity,
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

  // Notification toggles
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
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-extrabold font-heading text-gradient">Admin Settings & Configuration</h1>
        <p className="text-xs text-slate-400">Manage administrator profile, security, notifications, and website credentials</p>
      </div>

      {/* 1. ADMIN PROFILE */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-purple-400" />
          Admin Profile
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Username / Email</span>
            <strong className="text-white block font-mono text-sm">{user?.email || 'admin@cadpoint.co.in'}</strong>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Display Name & Authority</span>
            <strong className="text-white block font-heading text-sm">Salem Head Office Super Admin</strong>
          </div>
        </div>
      </div>

      {/* 2. SECURITY — CHANGE PASSWORD */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-red-500/30 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-red-400" />
          Security — Change Password
        </h3>

        {message && (
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 text-xs max-w-md">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Current Password *</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-3 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">New Password *</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-3 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">Confirm New Password *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-3 rounded-xl glass-input text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{submitting ? 'Updating Password...' : 'Update Password'}</span>
          </button>
        </form>
      </div>

      {/* 3. APPEARANCE */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
          <Sun className="w-4 h-4 text-cyan-400" />
          Appearance & Theme Preference
        </h3>
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <div>
            <strong className="text-white block font-semibold">CADPOINT Dashboard UI Theme</strong>
            <span className="text-slate-400 text-[11px]">Currently active: {isDark ? 'Dark Mode (Navy / Purple Glow)' : 'Light Mode (Clean White / Crimson Accent)'}</span>
          </div>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-200" />}
            <span>Switch Theme</span>
          </button>
        </div>
      </div>

      {/* 4. NOTIFICATIONS */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/30 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-400" />
          Notification Dispatch Controls
        </h3>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <strong className="text-white block font-semibold">Direct Email Notifications</strong>
              <span className="text-slate-400 text-[11px]">Send instant lead alerts to {COMPANY_INFO.email}</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-5 h-5 rounded text-emerald-500 focus:ring-emerald-400 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
            <div>
              <strong className="text-white block font-semibold">Course Application Alerts</strong>
              <span className="text-slate-400 text-[11px]">Log student online registrations with CAD reference IDs</span>
            </div>
            <input
              type="checkbox"
              checked={leadAlerts}
              onChange={(e) => setLeadAlerts(e.target.checked)}
              className="w-5 h-5 rounded text-emerald-500 focus:ring-emerald-400 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 5. WEBSITE INFORMATION */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-amber-400" />
          Website Information & Salem Head Office Credentials
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Headquarters Address</span>
            <strong className="text-white block leading-snug">{COMPANY_INFO.address}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Official Contact Email</span>
            <strong className="text-cyan-400 block font-mono">{COMPANY_INFO.email}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Helpline Phone Number</span>
            <strong className="text-emerald-400 block font-mono">{COMPANY_INFO.phone}</strong>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Working Hours</span>
            <strong className="text-white block">{COMPANY_INFO.hours}</strong>
          </div>
        </div>
      </div>

      {/* 6. SYSTEM STATUS */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" />
          System Status & Health Check
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="font-bold uppercase text-[10px]">Backend API</span>
              <Server className="w-4 h-4" />
            </div>
            <strong className="text-white block text-sm font-heading">Connected</strong>
            <span className="text-[10px] text-emerald-300 block">CADPOINT Flask API Online</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
            <div className="flex items-center justify-between text-emerald-400">
              <span className="font-bold uppercase text-[10px]">MongoDB Database</span>
              <Database className="w-4 h-4" />
            </div>
            <strong className="text-white block text-sm font-heading">Connected</strong>
            <span className="text-[10px] text-emerald-300 block">MongoDB Atlas Production DB</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between text-purple-400">
              <span className="font-bold uppercase text-[10px]">Authentication</span>
              <Lock className="w-4 h-4" />
            </div>
            <strong className="text-white block text-sm font-heading">Active</strong>
            <span className="text-[10px] text-purple-300 block">JWT Bearer Session Active</span>
          </div>
        </div>
      </div>
    </div>
  );
}
