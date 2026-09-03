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
import { useTheme } from '../../context/ThemeContext';

export function AdminForms() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
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

  const filteredContact = contactOnly.filter(e => (e.name || '').toLowerCase().includes(search.toLowerCase()) || (e.email || '').toLowerCase().includes(search.toLowerCase()) || (e.phone || '').includes(search));
  const filteredQuick = quickAdmissionOnly.filter(q => (q.name || '').toLowerCase().includes(search.toLowerCase()) || (q.email || '').toLowerCase().includes(search.toLowerCase()) || (q.phone || '').includes(search) || (q.subject || '').toLowerCase().includes(search.toLowerCase()));
  const filteredRegs = registrations.filter(r => (r.fullName || r.name || '').toLowerCase().includes(search.toLowerCase()) || (r.email || '').toLowerCase().includes(search.toLowerCase()) || (r.registrationId || '').toLowerCase().includes(search.toLowerCase()) || (r.phone || '').includes(search));

  return (
    <div className="space-y-8 relative">
      {/* 2-Second Top Corner Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0F172A] border border-emerald-500/50 shadow-2xl text-emerald-400 text-sm font-bold animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Forms & Submissions Hub
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Real-time submissions from Contact Us, Quick Admissions popup, and Online Registration
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student, phone, email..."
            className={`w-full pl-11 pr-4 py-3 rounded-2xl text-sm transition-all ${
              isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-emerald-500'
            }`}
          />
        </div>
      </div>

      {/* TABS CONTROLS */}
      <div className={`flex flex-wrap items-center gap-3 pb-3 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <button
          onClick={() => setActiveTab('contact')}
          className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
            activeTab === 'contact'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
              : isDark
              ? 'bg-white/5 text-slate-400 hover:text-white'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Contact Enquiries ({contactOnly.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('registration')}
          className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
            activeTab === 'registration'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
              : isDark
              ? 'bg-white/5 text-slate-400 hover:text-white'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Register Now ({registrations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quick')}
          className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-2.5 cursor-pointer ${
            activeTab === 'quick'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/20'
              : isDark
              ? 'bg-white/5 text-slate-400 hover:text-white'
              : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-300" />
          <span>Quick Admissions ({quickAdmissionOnly.length})</span>
        </button>
      </div>

      {/* TAB CONTENTS */}
      {loading ? (
        <div className="text-center py-20 text-sm text-slate-400">Loading submission records...</div>
      ) : (
        <div className={`overflow-x-auto custom-scrollbar rounded-3xl border ${
          isDark ? 'glass-panel border-white/10' : 'bg-white border-slate-200 shadow-md'
        }`}>
          {activeTab === 'contact' && (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className={`border-b text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600 bg-slate-50/50'
                }`}>
                  <th className="py-4 px-5">Contact Details</th>
                  <th className="py-4 px-5">Subject & Message</th>
                  <th className="py-4 px-5">Date</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-200'}`}>
                {filteredContact.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400 italic">
                      No contact enquiries found.
                    </td>
                  </tr>
                ) : (
                  filteredContact.map((enq, i) => (
                    <tr key={i} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                      <td className="py-4 px-5">
                        <strong className={`block text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {enq.name}
                        </strong>
                        <span className="text-xs text-slate-500">{enq.email} | {enq.phone}</span>
                      </td>
                      <td className="py-4 px-5">
                        <strong className="text-cyan-600 dark:text-cyan-400 block text-xs font-bold">
                          {enq.subject || 'Enquiry'}
                        </strong>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{enq.message}</p>
                      </td>
                      <td className="py-4 px-5 text-slate-500 whitespace-nowrap text-xs font-medium">
                        {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                      </td>
                      <td className="py-4 px-5">
                        <select
                          value={enq.status || 'New'}
                          onChange={(e) => handleEnquiryStatus(enq.id || enq.email, e.target.value)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                            isDark ? 'bg-[#0F172A] text-white border border-white/10' : 'bg-white text-slate-900 border border-slate-300 shadow-sm'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow-up Required">Follow-up Required</option>
                          <option value="Interested">Interested</option>
                          <option value="Registered">Registered</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => setViewModal({ type: 'enquiry', data: enq })}
                          className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                            isDark ? 'bg-white/5 hover:bg-white/10 text-cyan-400' : 'bg-slate-100 hover:bg-slate-200 text-cyan-700'
                          }`}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmModal({
                            type: 'enquiry',
                            id: enq.id || enq.email,
                            title: enq.name || enq.email
                          })}
                          className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                            isDark ? 'bg-white/5 hover:bg-red-500/20 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'
                          }`}
                          title="Delete Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'registration' && (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className={`border-b text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600 bg-slate-50/50'
                }`}>
                  <th className="py-4 px-5">Ref ID & Student</th>
                  <th className="py-4 px-5">Course Applied</th>
                  <th className="py-4 px-5">Resume / CV</th>
                  <th className="py-4 px-5">Qualification</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-200'}`}>
                {filteredRegs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400 italic">
                      No registrations found.
                    </td>
                  </tr>
                ) : (
                  filteredRegs.map((reg, i) => (
                    <tr key={i} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                      <td className="py-4 px-5">
                        <span className="text-purple-600 dark:text-purple-400 font-bold text-xs block">{reg.registrationId}</span>
                        <strong className={`block text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {reg.fullName || reg.name}
                        </strong>
                        <span className="text-xs text-slate-500">{reg.email} | {reg.phone}</span>
                      </td>
                      <td className="py-4 px-5">
                        <strong className="text-emerald-600 dark:text-cyan-400 block text-xs font-bold">
                          {reg.courseName}
                        </strong>
                        <span className="text-xs text-slate-500">{reg.mode} ({reg.batchPreference || 'Morning'})</span>
                      </td>
                      <td className="py-4 px-5">
                        {reg.resumeUrl ? (
                          <a
                            href={reg.resumeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={reg.resumeOriginalName || 'resume.pdf'}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-bold transition-colors cursor-pointer"
                          >
                            <FileText className="w-4 h-4 shrink-0" />
                            <span className="truncate max-w-[130px]">{reg.resumeOriginalName || 'Download Resume'}</span>
                          </a>
                        ) : (
                          <span className="text-slate-400 text-xs italic">No Resume Uploaded</span>
                        )}
                      </td>
                      <td className="py-4 px-5 text-xs font-medium text-slate-600 dark:text-slate-300">
                        {reg.qualification} ({reg.passoutYear})
                      </td>
                      <td className="py-4 px-5">
                        <select
                          value={reg.status || 'Pending'}
                          onChange={(e) => handleRegStatus(reg.registrationId, e.target.value)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                            isDark ? 'bg-[#0F172A] text-white border border-white/10' : 'bg-white text-slate-900 border border-slate-300 shadow-sm'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => setViewModal({ type: 'registration', data: reg })}
                          className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                            isDark ? 'bg-white/5 hover:bg-white/10 text-cyan-400' : 'bg-slate-100 hover:bg-slate-200 text-cyan-700'
                          }`}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmModal({
                            type: 'registration',
                            id: reg.registrationId,
                            title: reg.fullName || reg.name || reg.registrationId
                          })}
                          className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                            isDark ? 'bg-white/5 hover:bg-red-500/20 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'
                          }`}
                          title="Delete Registration"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

          {activeTab === 'quick' && (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className={`border-b text-xs font-bold uppercase tracking-wider ${
                  isDark ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-600 bg-slate-50/50'
                }`}>
                  <th className="py-4 px-5">Student & Contact</th>
                  <th className="py-4 px-5">Course Interested</th>
                  <th className="py-4 px-5">Date</th>
                  <th className="py-4 px-5">Status</th>
                  <th className="py-4 px-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-200'}`}>
                {filteredQuick.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-slate-400 italic">
                      No quick admission enquiries found in database.
                    </td>
                  </tr>
                ) : (
                  filteredQuick.map((qa, i) => (
                    <tr key={i} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                      <td className="py-4 px-5">
                        <strong className={`block text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          {qa.name}
                        </strong>
                        <span className="text-xs text-slate-500">{qa.phone} {qa.email ? `| ${qa.email}` : ''}</span>
                      </td>
                      <td className="py-4 px-5">
                        <strong className="text-amber-600 dark:text-cyan-400 block text-xs font-bold">
                          {qa.subject || 'Course Enquiry'}
                        </strong>
                        {qa.message && <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{qa.message}</p>}
                      </td>
                      <td className="py-4 px-5 text-slate-500 whitespace-nowrap text-xs font-medium">
                        {qa.createdAt ? new Date(qa.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                      </td>
                      <td className="py-4 px-5">
                        <select
                          value={qa.status || 'New'}
                          onChange={(e) => handleEnquiryStatus(qa.id || qa.email, e.target.value)}
                          className={`px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                            isDark ? 'bg-[#0F172A] text-white border border-white/10' : 'bg-white text-slate-900 border border-slate-300 shadow-sm'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Follow-up Required">Follow-up Required</option>
                          <option value="Interested">Interested</option>
                          <option value="Registered">Registered</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-4 px-5 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => setViewModal({ type: 'enquiry', data: qa })}
                          className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                            isDark ? 'bg-white/5 hover:bg-white/10 text-cyan-400' : 'bg-slate-100 hover:bg-slate-200 text-cyan-700'
                          }`}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmModal({
                            type: 'enquiry',
                            id: qa.id || qa.email,
                            title: qa.name || qa.email
                          })}
                          className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                            isDark ? 'bg-white/5 hover:bg-red-500/20 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'
                          }`}
                          title="Delete Quick Enquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* VIEW DETAILS MODAL */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`relative w-full max-w-lg rounded-3xl p-8 border space-y-5 text-sm ${
            isDark ? 'glass-panel border-cyan-500/40' : 'bg-white border-slate-200 shadow-2xl'
          }`}>
            <div className={`flex justify-between items-center pb-3 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <h3 className={`text-lg font-bold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Submission Details
              </h3>
              <button
                onClick={() => setViewModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className={`space-y-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              {viewModal.type === 'enquiry' && (
                <>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Student Name:</strong> {viewModal.data.name}</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Email:</strong> {viewModal.data.email || 'Not Provided'}</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Phone:</strong> {viewModal.data.phone}</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Subject / Course:</strong> {viewModal.data.subject}</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Source:</strong> {viewModal.data.formSource === 'quick-admission-enquiry' ? 'Quick Admission Popup' : 'Contact Us Form'}</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Message:</strong> {viewModal.data.message || 'No additional message.'}</p>
                </>
              )}
              {viewModal.type === 'registration' && (
                <>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Ref ID:</strong> {viewModal.data.registrationId}</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Student Name:</strong> {viewModal.data.fullName || viewModal.data.name}</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Email:</strong> {viewModal.data.email}</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Phone / WhatsApp:</strong> {viewModal.data.phone} / {viewModal.data.whatsapp}</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Course Applied:</strong> {viewModal.data.courseName} ({viewModal.data.mode})</p>
                  <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Qualification & College:</strong> {viewModal.data.qualification} — {viewModal.data.institution}</p>
                  
                  {/* RESUME DOWNLOAD SECTION */}
                  <div className={`pt-3 border-t ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                    <strong className={`block mb-2 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Resume / CV Document:</strong>
                    {viewModal.data.resumeUrl ? (
                      <div className={`p-4 rounded-2xl border space-y-3 ${
                        isDark ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-cyan-50 border-cyan-200'
                      }`}>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-cyan-700 dark:text-cyan-300 font-bold flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Resume Attached
                          </span>
                          <span className="text-slate-500 font-mono text-xs truncate max-w-[180px]">
                            {viewModal.data.resumeOriginalName || 'resume.pdf'}
                          </span>
                        </div>
                        <a
                          href={viewModal.data.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          download={viewModal.data.resumeOriginalName || 'resume.pdf'}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Resume Document</span>
                        </a>
                      </div>
                    ) : (
                      <p className="text-slate-400 text-xs italic">No Resume Uploaded</p>
                    )}
                  </div>
                </>
              )}
            </div>
            <button
              onClick={() => setViewModal(null)}
              className={`w-full py-3 rounded-2xl font-bold text-sm transition-colors cursor-pointer ${
                isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              Close
            </button>
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
                Are you sure?
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to delete this record (<strong>{deleteConfirmModal.title}</strong>)? This will permanently remove the record from the MongoDB database.
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
