import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, Trash2, AlertTriangle } from 'lucide-react';
import {
  fetchAdminPrivacyRequests,
  approvePrivacyDeletion,
  deletePrivacyRequestRecord
} from '../services/adminApi';

export function AdminPrivacyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [approveConfirmModal, setApproveConfirmModal] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null);

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

  const handleExecuteApproval = async () => {
    if (!approveConfirmModal) return;
    try {
      await approvePrivacyDeletion(
        approveConfirmModal.requestId,
        approveConfirmModal.email,
        approveConfirmModal.phone
      );
      setRequests(prev => prev.map(p => p.requestId === approveConfirmModal.requestId ? { ...p, status: 'Completed' } : p));
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
           (p.status || '').toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-gradient">Privacy Data Deletion Requests</h1>
          <p className="text-xs text-slate-400">Right to Erasure tickets generated via CADPOINT Privacy Center (`CAD-DEL-XXXXXX`)</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ID, name, status..."
            className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading privacy requests...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-xs text-slate-400 italic">No privacy data deletion requests found.</div>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">User Details</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Approval Workflow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((req, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-red-400">
                    {req.requestId}
                  </td>
                  <td className="py-3 px-4">
                    <strong className="text-white block">{req.name}</strong>
                    <span className="text-slate-400 text-[11px]">{req.email} | {req.phone}</span>
                    {req.reason && <p className="text-[10px] text-slate-400 italic mt-0.5">"{req.reason}"</p>}
                  </td>
                  <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                    {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      req.status === 'Completed'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : req.status === 'Rejected'
                        ? 'bg-slate-700 text-slate-300'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse'
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                    {req.status !== 'Completed' && (
                      <button
                        onClick={() => setApproveConfirmModal(req)}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer shadow-md"
                      >
                        Approve & Erase Data
                      </button>
                    )}
                    <button
                      onClick={() => setDeleteConfirmModal(req)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 cursor-pointer"
                      title="Delete Ticket"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {approveConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl p-6 glass-panel border border-red-500/40 text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Permanently Delete User Data?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to permanently delete personal database records for <strong className="text-white">{approveConfirmModal.name}</strong> ({approveConfirmModal.email})?
              <span className="block font-bold text-red-400 mt-1">This action cannot be undone and purges enquiries and registrations from the production database.</span>
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleExecuteApproval}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Erase Data
              </button>
              <button
                onClick={() => setApproveConfirmModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl p-6 glass-panel border border-slate-700 text-center space-y-4">
            <h3 className="text-lg font-bold text-white">Delete Ticket Record?</h3>
            <p className="text-xs text-slate-300">
              Remove request ticket <strong className="text-white font-mono">{deleteConfirmModal.requestId}</strong> from the privacy log?
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleExecuteDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Delete Ticket
              </button>
              <button
                onClick={() => setDeleteConfirmModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
