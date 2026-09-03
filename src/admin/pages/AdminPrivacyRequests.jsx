import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  fetchAdminPrivacyRequests,
  approvePrivacyDeletion,
  deletePrivacyRequestRecord
} from '../services/adminApi';
import { useTheme } from '../../context/ThemeContext';

export function AdminPrivacyRequests() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [approveConfirmModal, setApproveConfirmModal] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminPrivacyRequests();
      if (res && res.privacyRequests) {
        setRequests(res.privacyRequests);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleExecuteApproval = async () => {
    if (!approveConfirmModal) return;
    try {
      await approvePrivacyDeletion(
        approveConfirmModal.requestId,
        approveConfirmModal.email,
        approveConfirmModal.phone
      );
      setRequests(prev => prev.map(p => p.requestId === approveConfirmModal.requestId ? { ...p, status: 'Completed' } : p));
      showToast('Privacy data erased and status updated to Completed.');
    } catch (err) {
      console.error(err);
    } finally {
      setApproveConfirmModal(null);
    }
  };

  const handleExecuteDelete = async () => {
    if (!deleteConfirmModal) return;
    try {
      await deletePrivacyRequestRecord(deleteConfirmModal.requestId);
      setRequests(prev => prev.filter(p => p.requestId !== deleteConfirmModal.requestId));
      showToast('Privacy request ticket deleted.');
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteConfirmModal(null);
    }
  };

  const filtered = requests.filter(p => {
    return (p.requestId || '').toLowerCase().includes(search.toLowerCase()) ||
           (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
           (p.email || '').toLowerCase().includes(search.toLowerCase()) ||
           (p.phone || '').includes(search) ||
           (p.status || '').toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-8 relative">
      {/* 2-Second Top Corner Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/50 shadow-2xl text-emerald-400 text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Privacy Data Deletion Requests
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Right to Erasure tickets generated via CADPOINT Privacy Center (<code>CAD-DEL-XXXXXX</code>)
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, name, status..."
            className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm transition-all ${
              isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-red-500'
            }`}
          />
        </div>
      </div>

      {/* TABLE LIST */}
      {loading ? (
        <div className="text-center py-20 text-sm text-slate-400">Loading privacy requests...</div>
      ) : filtered.length === 0 ? (
        <div className={`text-center py-20 rounded-3xl border space-y-2 ${
          isDark ? 'glass-panel border-white/10' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <p className="text-sm text-slate-400 italic">No privacy data deletion requests found.</p>
        </div>
      ) : (
        <div className={`overflow-x-auto custom-scrollbar rounded-3xl border ${
          isDark ? 'glass-panel border-white/10' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className={`border-b text-xs font-bold uppercase tracking-wider ${
                isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600 bg-slate-50/50'
              }`}>
                <th className="py-4 px-5">Request ID</th>
                <th className="py-4 px-5">User Details</th>
                <th className="py-4 px-5">Date</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Approval Workflow</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-200'}`}>
              {filtered.map((req, i) => (
                <tr key={i} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                  <td className="py-4 px-5 font-mono font-bold text-red-600 dark:text-red-400 text-xs">
                    {req.requestId}
                  </td>
                  <td className="py-4 px-5">
                    <strong className={`block text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      {req.name}
                    </strong>
                    <span className="text-xs text-slate-500">{req.email} | {req.phone}</span>
                    {req.reason && <p className="text-xs text-slate-400 italic mt-0.5">"{req.reason}"</p>}
                  </td>
                  <td className="py-4 px-5 text-slate-500 whitespace-nowrap text-xs font-medium">
                    {req.createdAt ? new Date(req.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                  </td>
                  <td className="py-4 px-5">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      req.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                        : req.status === 'Rejected'
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-red-500/20 text-red-600 dark:text-red-300 border border-red-500/30 animate-pulse'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                    {req.status !== 'Completed' && (
                      <button
                        onClick={() => setApproveConfirmModal(req)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-md transition-colors"
                      >
                        Approve & Erase Data
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteConfirmModal(req)}
                      className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                        isDark ? 'bg-white/5 hover:bg-red-500/20 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'
                      }`}
                      title="Delete Ticket"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* APPROVE CONFIRMATION MODAL */}
      {approveConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className={`relative w-full max-w-md rounded-3xl p-8 border text-center space-y-5 ${
            isDark ? 'glass-panel border-emerald-500/40' : 'bg-white border-emerald-300 shadow-2xl'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className={`text-lg font-bold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Execute Privacy Data Erasure
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to approve deletion for <strong>{approveConfirmModal.name}</strong> ({approveConfirmModal.requestId})? All matching enquiries, registrations, and contact data will be permanently wiped from the database.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => setApproveConfirmModal(null)}
                className={`py-3 px-5 rounded-2xl font-bold text-sm transition-colors cursor-pointer ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteApproval}
                className="py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                Approve & Erase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className={`relative w-full max-w-md rounded-3xl p-8 border text-center space-y-5 ${
            isDark ? 'glass-panel border-red-500/40' : 'bg-white border-red-300 shadow-2xl'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className={`text-lg font-bold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Confirm Ticket Deletion
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to delete privacy request <strong>{deleteConfirmModal.requestId}</strong> ({deleteConfirmModal.name})?
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmModal(null)}
                className={`py-3 px-5 rounded-2xl font-bold text-sm transition-colors cursor-pointer ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="py-3 px-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
