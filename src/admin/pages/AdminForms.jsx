import React, { useState, useEffect } from 'react';
import { MessageSquare, UserCheck, Zap, Search, Eye, Trash2, X, Download, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  fetchAdminEnquiries,
  updateEnquiryStatus,
  deleteEnquiryRecord,
  fetchAdminRegistrations,
  updateRegistrationStatus,
  deleteRegistrationRecord
} from '../services/adminApi';

export function AdminForms() {
  const [activeTab, setActiveTab] = useState('contact'); // 'contact' | 'registration' | 'quick'
  const [enquiries, setEnquiries] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewModal, setViewModal] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [enqRes, regRes] = await Promise.all([
        fetchAdminEnquiries().catch(() => ({ enquiries: [] })),
        fetchAdminRegistrations().catch(() => ({ registrations: [] }))
      ]);
      setEnquiries(enqRes.enquiries || []);
      setRegistrations(regRes.registrations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const contactOnly = enquiries.filter(e => e.formSource !== 'quick-admission-enquiry');
  const quickAdmissionOnly = enquiries.filter(e => e.formSource === 'quick-admission-enquiry');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const handleEnquiryStatus = async (id, status) => {
    try {
      await updateEnquiryStatus(id, status);
      setEnquiries(prev => prev.map(e => (e.id === id || e.email === id) ? { ...e, status } : e));
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegStatus = async (id, status) => {
    try {
      await updateRegistrationStatus(id, status);
      setRegistrations(prev => prev.map(r => r.registrationId === id ? { ...r, status } : r));
    } catch (err) {
      console.error(err);
    }
  };

  const handleExecuteDelete = async () => {
    if (!deleteConfirmModal) return;
    const { type, id } = deleteConfirmModal;
    try {
      if (type === 'enquiry') {
        await deleteEnquiryRecord(id);
        setEnquiries(prev => prev.filter(e => (e.id || e.email) !== id));
      } else if (type === 'registration') {
        await deleteRegistrationRecord(id);
        setRegistrations(prev => prev.filter(r => r.registrationId !== id));
      }
      showToast('Record deleted successfully.');
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setDeleteConfirmModal(null);
    }
  };

  const filteredContact = contactOnly.filter(e => (e.name || '').toLowerCase().includes(search.toLowerCase()) || (e.email || '').toLowerCase().includes(search.toLowerCase()));
  const filteredQuick = quickAdmissionOnly.filter(q => (q.name || '').toLowerCase().includes(search.toLowerCase()) || (q.email || '').toLowerCase().includes(search.toLowerCase()));
  const filteredRegs = registrations.filter(r => (r.fullName || r.name || '').toLowerCase().includes(search.toLowerCase()) || (r.email || '').toLowerCase().includes(search.toLowerCase()) || (r.registrationId || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 relative">
      {/* 2-Second Top Corner Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[200] flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0F172A] border border-emerald-500/50 shadow-2xl text-emerald-400 text-xs font-bold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-gradient">Forms & Submissions Hub</h1>
          <p className="text-xs text-slate-400">All submissions from Contact Us, Quick Admissions, and Course Registration</p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads & applications..."
            className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>
      </div>

      {/* TABS */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'contact' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Contact Enquiries ({contactOnly.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('registration')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'registration' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Register Now ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quick')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === 'quick' ? 'bg-purple-600 text-white shadow-md' : 'bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quick Admissions ({quickAdmissionOnly.length})</span>
        </button>
      </div>

      {/* TAB CONTENTS */}
      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading submission records...</div>
      ) : (
        <div className="overflow-x-auto custom-scrollbar">
          {activeTab === 'contact' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Subject & Message</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredContact.map((enq, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <strong className="text-white block">{enq.name}</strong>
                      <span className="text-slate-400 text-[11px]">{enq.email} | {enq.phone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-cyan-400 block">{enq.subject || 'Enquiry'}</strong>
                      <p className="text-slate-300 text-[11px] line-clamp-1">{enq.message}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={enq.status || 'New'}
                        onChange={(e) => handleEnquiryStatus(enq.id || enq.email, e.target.value)}
                        className="px-2 py-1 rounded-lg glass-input text-[11px] bg-[#0F172A]"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => setViewModal({ type: 'enquiry', data: enq })} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmModal({
                          type: 'enquiry',
                          id: enq.id || enq.email,
                          title: enq.name || enq.email
                        })}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        title="Delete Enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'registration' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Ref ID & Student</th>
                  <th className="py-3 px-4">Course Applied</th>
                  <th className="py-3 px-4">Resume / CV</th>
                  <th className="py-3 px-4">Qualification</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredRegs.map((reg, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <span className="text-purple-400 font-bold text-[11px] block">{reg.registrationId}</span>
                      <strong className="text-white block">{reg.fullName || reg.name}</strong>
                      <span className="text-slate-400 text-[11px]">{reg.email} | {reg.phone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <strong className="text-cyan-400 block">{reg.courseName}</strong>
                      <span className="text-slate-300 text-[11px]">{reg.mode} ({reg.batchPreference || 'Morning'})</span>
                    </td>
                    <td className="py-3 px-4">
                      {reg.resumeUrl ? (
                        <a
                          href={reg.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={reg.resumeOriginalName || 'resume.pdf'}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[11px] font-semibold transition-colors cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[120px]">{reg.resumeOriginalName || 'Download Resume'}</span>
                        </a>
                      ) : (
                        <span className="text-slate-500 text-[11px] italic">No Resume Uploaded</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {reg.qualification} ({reg.passoutYear})
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={reg.status || 'Pending'}
                        onChange={(e) => handleRegStatus(reg.registrationId, e.target.value)}
                        className="px-2 py-1 rounded-lg glass-input text-[11px] bg-[#0F172A]"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => setViewModal({ type: 'registration', data: reg })} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmModal({
                          type: 'registration',
                          id: reg.registrationId,
                          title: reg.fullName || reg.name || reg.registrationId
                        })}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        title="Delete Registration"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'quick' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Student & Contact</th>
                  <th className="py-3 px-4">Course Interested</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredQuick.map((qa, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <strong className="text-white block">{qa.name}</strong>
                      <span className="text-slate-400 text-[11px]">{qa.email} | {qa.phone}</span>
                    </td>
                    <td className="py-3 px-4 text-cyan-400 font-semibold">{qa.subject}</td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                      {qa.createdAt ? new Date(qa.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={qa.status || 'New'}
                        onChange={(e) => handleEnquiryStatus(qa.id || qa.email, e.target.value)}
                        className="px-2 py-1 rounded-lg glass-input text-[11px] bg-[#0F172A]"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button onClick={() => setViewModal({ type: 'enquiry', data: qa })} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 cursor-pointer">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmModal({
                          type: 'enquiry',
                          id: qa.id || qa.email,
                          title: qa.name || qa.email
                        })}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 cursor-pointer"
                        title="Delete Quick Enquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl p-6 glass-panel border border-cyan-500/40 space-y-4 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold font-heading text-white">Submission Details</h3>
              <button onClick={() => setViewModal(null)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2.5 text-slate-300">
              {viewModal.type === 'enquiry' && (
                <>
                  <p><strong>Name:</strong> {viewModal.data.name}</p>
                  <p><strong>Email:</strong> {viewModal.data.email}</p>
                  <p><strong>Phone:</strong> {viewModal.data.phone}</p>
                  <p><strong>Subject / Course:</strong> {viewModal.data.subject}</p>
                  <p><strong>Message:</strong> {viewModal.data.message || 'No additional message.'}</p>
                </>
              )}
              {viewModal.type === 'registration' && (
                <>
                  <p><strong>Ref ID:</strong> {viewModal.data.registrationId}</p>
                  <p><strong>Student Name:</strong> {viewModal.data.fullName || viewModal.data.name}</p>
                  <p><strong>Email:</strong> {viewModal.data.email}</p>
                  <p><strong>Phone / WhatsApp:</strong> {viewModal.data.phone} / {viewModal.data.whatsapp}</p>
                  <p><strong>Course Applied:</strong> {viewModal.data.courseName} ({viewModal.data.mode})</p>
                  <p><strong>Qualification & College:</strong> {viewModal.data.qualification} — {viewModal.data.institution}</p>
                  
                  {/* RESUME DOWNLOAD SECTION */}
                  <div className="pt-2 border-t border-white/10">
                    <strong className="block text-slate-200 mb-1.5">Resume / CV Document:</strong>
                    {viewModal.data.resumeUrl ? (
                      <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            Resume Available
                          </span>
                          <span className="text-slate-400 font-mono text-[10px] truncate max-w-[150px]">
                            {viewModal.data.resumeOriginalName || 'resume.pdf'}
                          </span>
                        </div>
                        <a
                          href={viewModal.data.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={viewModal.data.resumeOriginalName || 'resume.pdf'}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Resume</span>
                        </a>
                      </div>
                    ) : (
                      <p className="text-slate-400 text-xs italic">No Resume Uploaded</p>
                    )}
                  </div>
                </>
              )}
            </div>
            <button onClick={() => setViewModal(null)} className="w-full py-2 rounded-xl bg-white/10 text-white font-semibold text-xs cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-sm rounded-3xl p-6 glass-panel border border-red-500/40 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-white font-heading">Are you sure?</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Are you sure you want to delete this record (<strong>{deleteConfirmModal.title}</strong>)? This will permanently remove the record from the database.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmModal(null)}
                className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteDelete}
                className="py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
