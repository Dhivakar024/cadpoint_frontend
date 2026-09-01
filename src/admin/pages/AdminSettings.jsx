import React, { useState } from 'react';
import { Settings as SettingsIcon, Lock, KeyRound, CheckCircle2, AlertCircle, MapPin } from 'lucide-react';
import { changeAdminPassword } from '../services/adminApi';
import { useAdminAuth } from '../context/AdminAuthContext';

export function AdminSettings() {
  const { user } = useAdminAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

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
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl font-extrabold font-heading text-gradient">Admin Settings & Security</h1>
        <p className="text-xs text-slate-400">Manage admin security credentials and head office information</p>
      </div>

      {/* CHANGE PASSWORD CARD */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <KeyRound className="w-4 h-4 text-purple-400" />
          Change Admin Password
        </h3>

        {message && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-3.5 text-xs max-w-md">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Current Password *</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">New Password *</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Confirm New Password *</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="py-2.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs cursor-pointer shadow-md"
          >
            {submitting ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>

      {/* HEAD OFFICE INFO */}
      <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          Salem Head Office Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px]">Headquarters Address</span>
            <strong className="text-white block">1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem - 636007</strong>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px]">Admin Contact Email</span>
            <strong className="text-cyan-400 block">cadpointsalem001@gmail.com</strong>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px]">Helpline Phone Number</span>
            <strong className="text-emerald-400 block">(+91) 95666 79928</strong>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
            <span className="text-slate-400 text-[10px]">Business Working Hours</span>
            <strong className="text-white block">Mon - Sat: 9:00 AM - 7:30 PM</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
