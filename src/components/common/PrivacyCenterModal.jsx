import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Cookie, Eye, Trash2, CheckCircle2, Lock, ArrowUpRight, Search, AlertCircle, FileText, Send, User, Mail, Phone, Calendar } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { COMPANY_INFO } from '../../utils/constants';
import { submitPrivacyDeletionRequest, fetchMyPersonalData } from '../../services/api';

export function PrivacyCenterModal() {
  const {
    isPrivacyCenterModalOpen,
    closePrivacyCenterModal,
    categories,
    acceptAll,
    rejectOptional,
    saveCustomPreferences,
    markPrivacyNoticeAsRead,
    hasReadPrivacyNotice,
  } = useCookieConsent();

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeTab, setActiveTab] = useState('notice'); // 'notice' | 'cookies' | 'view' | 'deletion'

  // Cookie local state
  const [localCategories, setLocalCategories] = useState({
    necessary: true,
    analytics: Boolean(categories?.analytics),
    functional: Boolean(categories?.functional),
    marketing: Boolean(categories?.marketing),
  });

  // View My Data Form state
  const [viewInput, setViewInput] = useState({ email: '', phone: '' });
  const [viewLoading, setViewLoading] = useState(false);
  const [userRecords, setUserRecords] = useState(null);
  const [viewError, setViewError] = useState('');

  // Deletion Request Form state
  const [deletionInput, setDeletionInput] = useState({ name: '', email: '', phone: '', reason: '' });
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [deletionSuccess, setDeletionSuccess] = useState(null); // { message, requestId }
  const [deletionError, setDeletionError] = useState('');

  // Scroll ref for Notice reading
  const noticeContentRef = useRef(null);
  const [reachedNoticeBottom, setReachedNoticeBottom] = useState(hasReadPrivacyNotice);

  if (!isPrivacyCenterModalOpen) return null;

  const handleNoticeScroll = () => {
    if (!noticeContentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = noticeContentRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 24) {
      if (!reachedNoticeBottom) {
        setReachedNoticeBottom(true);
        markPrivacyNoticeAsRead();
      }
    }
  };

  const handleCookieToggle = (key) => {
    if (key === 'necessary') return;
    setLocalCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCookieSave = () => {
    saveCustomPreferences(localCategories);
    closePrivacyCenterModal();
  };

  const handleViewDataSubmit = async (e) => {
    e.preventDefault();
    setViewLoading(true);
    setViewError('');
    setUserRecords(null);

    try {
      const res = await fetchMyPersonalData(viewInput.email, viewInput.phone);
      if (res && res.success) {
        setUserRecords(res.data);
      } else {
        setViewError(res?.error || 'No records found matching the provided Email and Phone Number.');
      }
    } catch (err) {
      console.error(err);
      setViewError('Unable to retrieve records. Please ensure your Email and Phone Number match your previous submission.');
    } finally {
      setViewLoading(false);
    }
  };

  const handleDeletionSubmit = async (e) => {
    e.preventDefault();
    setDeletionLoading(true);
    setDeletionError('');
    setDeletionSuccess(null);

    try {
      const res = await submitPrivacyDeletionRequest(deletionInput);
      if (res && res.success) {
        setDeletionSuccess({
          message: res.message,
          requestId: res.requestId
        });
      } else {
        setDeletionError(res?.error || 'Failed to submit data deletion request.');
      }
    } catch (err) {
      console.error(err);
      setDeletionError('Network error. Please try again.');
    } finally {
      setDeletionLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-4xl rounded-3xl p-5 sm:p-7 border shadow-2xl flex flex-col max-h-[90vh] overflow-hidden ${
            isDark
              ? 'bg-[#0B132B] border-purple-500/30 text-white shadow-purple-950/40'
              : 'bg-white border-emerald-300 text-slate-900 shadow-xl'
          }`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <span className="p-2.5 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold font-heading tracking-tight">
                  CADPOINT Privacy Center
                </h3>
                <p className="text-xs text-slate-400">
                  Data Protection & Privacy Self-Service Portal
                </p>
              </div>
            </div>
            <button
              onClick={closePrivacyCenterModal}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Privacy Center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 pt-3 pb-2 border-b border-white/10 overflow-x-auto shrink-0 custom-scrollbar">
            <button
              onClick={() => setActiveTab('notice')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'notice'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Privacy Notice</span>
            </button>

            <button
              onClick={() => setActiveTab('cookies')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'cookies'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Cookie Preferences</span>
            </button>

            <button
              onClick={() => setActiveTab('view')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'view'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>View My Data</span>
            </button>

            <button
              onClick={() => setActiveTab('deletion')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'deletion'
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Request Data Deletion</span>
            </button>
          </div>

          {/* TAB CONTENT AREA */}
          <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">

            {/* TAB 1: PRIVACY NOTICE */}
            {activeTab === 'notice' && (
              <div
                ref={noticeContentRef}
                onScroll={handleNoticeScroll}
                className="space-y-5 text-xs leading-relaxed text-slate-300 pr-1 max-h-[55vh] overflow-y-auto custom-scrollbar"
              >
                <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-200">
                  <p className="font-semibold text-xs flex items-center gap-2">
                    <Lock className="w-4 h-4 text-purple-400 shrink-0" />
                    Please scroll to the bottom of this document to mark the Privacy Notice as reviewed.
                  </p>
                </div>

                <section className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white">1. Overview & Data Controller</h4>
                  <p>
                    CADPOINT Authorized Training Centre ("CADPOINT") is dedicated to protecting personal information voluntarily provided by our students and site visitors. Data processing is carried out lawfully, transparently, and strictly for legitimate course counseling and academic onboarding.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white">2. Personal Data We Collect</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Contact Information:</strong> Full Name, Email, Phone Number, WhatsApp Number, City.</li>
                    <li><strong>Academic Profile:</strong> Qualification, College/Institution Name, Year of Passing, Course Interest, Batch Preference.</li>
                    <li><strong>Enquiry Details:</strong> Form messages and callback requests.</li>
                  </ul>
                </section>

                <section className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white">3. Data Retention & Security</h4>
                  <p>
                    Submitted records are retained in encrypted MongoDB databases for course administrative tracking and ISO 9001:2008 certification verification. We do not sell or trade student data to third-party advertisers.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="text-sm font-bold text-white">4. User Rights & Contact</h4>
                  <p>
                    You have the right to request a summary of your stored data or request deletion via the self-service tabs in this Privacy Center. Helpline contact: <strong>{COMPANY_INFO.email}</strong> | <strong>{COMPANY_INFO.phone}</strong>.
                  </p>
                </section>

                <div className="p-3 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-center font-semibold text-xs">
                  End of Privacy Notice Document
                </div>
              </div>
            )}

            {/* TAB 2: COOKIE PREFERENCES */}
            {activeTab === 'cookies' && (
              <div className="space-y-4 pr-1 max-h-[55vh] overflow-y-auto custom-scrollbar">
                <p className="text-xs text-slate-300">
                  Configure your optional cookie preference categories below. Necessary cookies are required for basic site security and form operation.
                </p>

                {/* Necessary */}
                <div className="p-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">1. Necessary Cookies</h4>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Always Active</span>
                  </div>
                  <p className="text-[11px] text-slate-300">Required for website navigation, form token integrity, and security checks.</p>
                </div>

                {/* Analytics */}
                <div className="p-3.5 rounded-2xl border border-white/10 bg-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">2. Analytics Cookies</h4>
                    <button
                      type="button"
                      onClick={() => handleCookieToggle('analytics')}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                        localCategories.analytics ? 'bg-purple-600' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${localCategories.analytics ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300">Measures anonymous traffic statistics to optimize website performance.</p>
                </div>

                {/* Functional */}
                <div className="p-3.5 rounded-2xl border border-white/10 bg-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">3. Functional Cookies</h4>
                    <button
                      type="button"
                      onClick={() => handleCookieToggle('functional')}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                        localCategories.functional ? 'bg-purple-600' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${localCategories.functional ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300">Saves your theme preference (Dark/Light) and regional settings.</p>
                </div>

                {/* Marketing */}
                <div className="p-3.5 rounded-2xl border border-white/10 bg-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">4. Marketing Cookies</h4>
                    <button
                      type="button"
                      onClick={() => handleCookieToggle('marketing')}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                        localCategories.marketing ? 'bg-purple-600' : 'bg-slate-700'
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200 ${localCategories.marketing ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-300">Allows customized course updates and promotional notifications.</p>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="primary" size="sm" onClick={handleCookieSave} className="text-xs">Save Preferences</Button>
                  <Button variant="secondary" size="sm" onClick={() => { acceptAll(); closePrivacyCenterModal(); }} className="text-xs">Accept All</Button>
                  <Button variant="outline" size="sm" onClick={() => { rejectOptional(); closePrivacyCenterModal(); }} className="text-xs">Reject Optional</Button>
                </div>
              </div>
            )}

            {/* TAB 3: VIEW MY DATA (SECURE LOOKUP) */}
            {activeTab === 'view' && (
              <div className="space-y-5 pr-1">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-cyan-400" />
                    Secure Data Verification Lookup
                  </h4>
                  <p className="text-xs text-slate-300">
                    To securely view the personal data you have previously submitted to CADPOINT, enter the exact Email Address and Phone Number used during enquiry or registration.
                  </p>
                </div>

                <form onSubmit={handleViewDataSubmit} className="space-y-3 max-w-lg">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={viewInput.email}
                        onChange={(e) => setViewInput({ ...viewInput, email: e.target.value })}
                        placeholder="student@example.com"
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={viewInput.phone}
                        onChange={(e) => setViewInput({ ...viewInput, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    isLoading={viewLoading}
                    icon={Search}
                    className="text-xs justify-center"
                  >
                    Verify & View Records
                  </Button>
                </form>

                {viewError && (
                  <p className="text-xs text-red-400 font-medium flex items-center gap-1.5 p-3 rounded-xl bg-red-500/10 border border-red-500/30">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{viewError}</span>
                  </p>
                )}

                {/* RESULT DISPLAY */}
                {userRecords && (
                  <div className="space-y-4 pt-3 border-t border-white/10">
                    <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Verification Successful! Your Saved Database Records:
                    </h4>

                    {/* Enquiries */}
                    <div className="space-y-2">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Submitted Enquiries ({userRecords.enquiries?.length || 0})</h5>
                      {userRecords.enquiries?.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No enquiry records found for this email/phone.</p>
                      ) : (
                        userRecords.enquiries.map((e, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                            <div className="flex justify-between text-slate-400 text-[11px]">
                              <span>Source: <strong className="text-cyan-400">{e.formSource || 'Contact Enquiry'}</strong></span>
                              <span>Date: {e.createdAt ? new Date(e.createdAt).toLocaleDateString() : 'N/A'}</span>
                            </div>
                            <p className="text-slate-200"><strong>Name:</strong> {e.name}</p>
                            <p className="text-slate-200"><strong>Subject / Course:</strong> {e.subject}</p>
                            {e.message && <p className="text-slate-300 italic">"{e.message}"</p>}
                          </div>
                        ))
                      )}
                    </div>

                    {/* Registrations */}
                    <div className="space-y-2 pt-2">
                      <h5 className="text-xs font-bold text-white uppercase tracking-wider">Course Registrations ({userRecords.registrations?.length || 0})</h5>
                      {userRecords.registrations?.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No course registration records found for this email/phone.</p>
                      ) : (
                        userRecords.registrations.map((r, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs space-y-1">
                            <div className="flex justify-between text-slate-400 text-[11px]">
                              <span>Ref ID: <strong className="text-purple-400">{r.registrationId}</strong></span>
                              <span>Status: <strong className="text-emerald-400">{r.status}</strong></span>
                            </div>
                            <p className="text-slate-200"><strong>Student Name:</strong> {r.fullName}</p>
                            <p className="text-slate-200"><strong>Course Applied:</strong> {r.courseName} ({r.mode})</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: REQUEST DATA DELETION */}
            {activeTab === 'deletion' && (
              <div className="space-y-5 pr-1">
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 space-y-2 text-xs text-slate-300">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-red-400" />
                    Right to Erasure & Data Deletion
                  </h4>
                  <p>
                    Submit a formal request to remove your personal records from CADPOINT databases. Upon review and approval by our Salem Head Office administration team, your data will be permanently erased.
                  </p>
                </div>

                {!deletionSuccess ? (
                  <form onSubmit={handleDeletionSubmit} className="space-y-3.5 max-w-lg">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={deletionInput.name}
                        onChange={(e) => setDeletionInput({ ...deletionInput, name: e.target.value })}
                        placeholder="e.g. Rahul Kumar"
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={deletionInput.email}
                          onChange={(e) => setDeletionInput({ ...deletionInput, email: e.target.value })}
                          placeholder="student@example.com"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={deletionInput.phone}
                          onChange={(e) => setDeletionInput({ ...deletionInput, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Reason for Request (Optional)</label>
                      <textarea
                        rows={2}
                        value={deletionInput.reason}
                        onChange={(e) => setDeletionInput({ ...deletionInput, reason: e.target.value })}
                        placeholder="e.g. Course completed / Privacy preference"
                        className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                      />
                    </div>

                    {deletionError && (
                      <p className="text-xs text-red-400 font-medium">{deletionError}</p>
                    )}

                    <Button
                      type="submit"
                      variant="accent"
                      size="sm"
                      isLoading={deletionLoading}
                      icon={Trash2}
                      className="text-xs justify-center bg-red-600 hover:bg-red-700 text-white"
                    >
                      Request Data Deletion
                    </Button>
                  </form>
                ) : (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6 animate-bounce" />
                    </div>
                    <h4 className="text-base font-bold text-white">Deletion Request Logged</h4>
                    <p className="text-xs text-slate-300 max-w-md mx-auto">
                      {deletionSuccess.message}
                    </p>
                    <div className="p-3 rounded-xl bg-purple-900/40 border border-purple-500/30 max-w-xs mx-auto text-xs">
                      <span className="text-slate-400 block text-[10px]">Unique Request Reference ID:</span>
                      <strong className="text-cyan-400 text-lg font-black font-heading mt-0.5 block">{deletionSuccess.requestId}</strong>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Footer Bar */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs shrink-0">
            <span className="text-slate-400 text-[11px]">
              CADPOINT Privacy Office | Salem Head Office
            </span>
            <Button variant="secondary" size="sm" onClick={closePrivacyCenterModal} className="text-xs px-4">
              Close Portal
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
