import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ClipboardCheck } from 'lucide-react';
import { submitEnquiry } from '../../services/api';
import { sendContactEmailDirect } from '../../services/directResend';
import { PrivacyAcknowledgement, getPrivacyMetadata } from '../common/PrivacyAcknowledgement';

export function ContactPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'IT & Full Stack Development',
    message: '',
  });
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // 1.5 second natural delay on page load / reload
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative w-full max-w-[480px] rounded-3xl glass-panel p-6 sm:p-7 border border-purple-500/40 shadow-2xl max-h-[92vh] sm:max-h-[660px] overflow-y-auto overflow-x-hidden popup-scrollbar flex flex-col justify-between"
          >
            {/* Background Glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-cyan-600/25 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors cursor-pointer z-10"
              aria-label="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <div className="space-y-4">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      <ClipboardCheck className="w-4 h-4" />
                    </span>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                      Quick Admission Enquiry
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading tracking-tight leading-snug">
                    Get Free Career Counseling & Offer Details
                  </h3>
                  <p className="text-slate-300 text-xs mt-1 leading-relaxed">
                    Leave your details and our counselor will get in touch with you right away!
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
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
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Phone Number *
                      </label>
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
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Email Address *
                      </label>
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
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Course Interested In *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-[#0F172A] text-white"
                    >
                      <option value="IT & Full Stack Development">IT & Full Stack Development</option>
                      <option value="Civil & Architecture CADD / BIM">Civil & Architecture CADD / BIM</option>
                      <option value="Mechanical & Aeronautical Design">Mechanical & Aeronautical Design</option>
                      <option value="Electrical & Automation">Electrical & Automation</option>
                      <option value="Multimedia, AR & VR">Multimedia, AR & VR</option>
                      <option value="Accounts, Tally & SAP ERP">Accounts, Tally & SAP ERP</option>
                      <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                      Message (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any specific questions or batch preference?"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>

                  {/* Compact Privacy Notice Checkbox */}
                  <PrivacyAcknowledgement
                    id="popup-privacy"
                    compact={true}
                    checked={privacyChecked}
                    onChange={(e) => {
                      setPrivacyChecked(e.target.checked);
                      if (privacyError) setPrivacyError(false);
                    }}
                    error={privacyError}
                    errorMessage="Please review the Privacy Notice and provide consent."
                  />

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-red-600 via-purple-600 to-cyan-600 hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isSubmitting ? 'Sending Request...' : 'Request Callback Now'}</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 animate-bounce" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">Callback Requested!</h3>
                <p className="text-slate-300 text-xs max-w-xs mx-auto">
                  Thank you! Our CADPOINT admissions team will get in touch with you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer mt-2"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
