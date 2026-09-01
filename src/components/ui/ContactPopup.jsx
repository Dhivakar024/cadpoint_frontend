import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, PhoneCall, ClipboardCheck } from 'lucide-react';
import { Button } from './Button';
import { submitEnquiry } from '../../services/api';
import { sendContactEmailDirect } from '../../services/directResend';
import { PrivacyAcknowledgement, getPrivacyMetadata } from '../common/PrivacyAcknowledgement';

export function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Website Popup Lead',
    message: '',
  });
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if popup was already closed in this session
    const hasSeenPopup = sessionStorage.getItem('cadpoint_popup_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // 1 second trigger
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('cadpoint_popup_seen', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!privacyChecked) {
      setPrivacyError(true);
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...formData,
      ...getPrivacyMetadata('quick-admission-enquiry'),
    };

    try {
      await submitEnquiry(payload);
      sendContactEmailDirect(payload);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      sendContactEmailDirect(payload);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl glass-panel p-6 sm:p-8 border border-purple-500/40 shadow-2xl overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-cyan-600/30 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close popup"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                    <ClipboardCheck className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
                    Quick Admission Enquiry
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white font-heading tracking-tight">
                    Get Free Career Counseling & Offer Details
                  </h3>
                  <p className="text-slate-300 text-xs mt-1">
                    Leave your details and our CADPOINT counselor will get in touch with you right away!
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Kumar"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="student@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Course Interested In *</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-[#111827]"
                    >
                      <option value="IT & Full Stack Development">IT & Full Stack Development</option>
                      <option value="Civil & Architecture CADD / BIM">Civil & Architecture CADD / BIM</option>
                      <option value="Mechanical & Aeronautical Design">Mechanical & Aeronautical Design</option>
                      <option value="Electrical & Automation">Electrical & Automation</option>
                      <option value="Multimedia, AR & VR">Multimedia, AR & VR</option>
                      <option value="Accounts, Tally & SAP ERP">Accounts, Tally & SAP ERP</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Message (Optional)</label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific questions or batch time preference?"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <PrivacyAcknowledgement
                    id="popup-privacy"
                    checked={privacyChecked}
                    onChange={(e) => {
                      setPrivacyChecked(e.target.checked);
                      if (privacyError) setPrivacyError(false);
                    }}
                    error={privacyError}
                    errorMessage="Please acknowledge the Privacy Notice to submit your enquiry."
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full justify-center mt-2"
                    isLoading={isSubmitting}
                    icon={Send}
                  >
                    Request Callback Now
                  </Button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">Callback Requested!</h3>
                <p className="text-slate-300 text-xs max-w-xs mx-auto">
                  Thank you! Our CADPOINT admissions team will call you within 2 hours.
                </p>
                <Button variant="outline" size="sm" onClick={handleClose}>
                  Close Window
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
