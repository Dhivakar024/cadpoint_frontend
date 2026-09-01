import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, ArrowDownCircle, Lock, Mail, Phone, MapPin } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieConsentContext';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../ui/Button';
import { COMPANY_INFO } from '../../utils/constants';

export function PrivacyNoticeModal() {
  const {
    isPrivacyNoticeModalOpen,
    closePrivacyNoticeModal,
    hasReadPrivacyNotice,
    markPrivacyNoticeAsRead,
  } = useCookieConsent();

  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const contentRef = useRef(null);
  const [reachedBottom, setReachedBottom] = useState(hasReadPrivacyNotice);

  useEffect(() => {
    setReachedBottom(hasReadPrivacyNotice);
  }, [hasReadPrivacyNotice, isPrivacyNoticeModalOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isPrivacyNoticeModalOpen) {
        closePrivacyNoticeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPrivacyNoticeModalOpen, closePrivacyNoticeModal]);

  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    // Check if scrolled within 24px of bottom
    if (scrollTop + clientHeight >= scrollHeight - 24) {
      if (!reachedBottom) {
        setReachedBottom(true);
        markPrivacyNoticeAsRead();
      }
    }
  };

  if (!isPrivacyNoticeModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 border shadow-2xl flex flex-col max-h-[85vh] overflow-hidden ${
            isDark
              ? 'bg-[#0B132B] border-purple-500/30 text-white shadow-purple-950/40'
              : 'bg-white border-emerald-300 text-slate-900 shadow-xl'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-xl font-extrabold font-heading tracking-tight">
                  Privacy Notice & Data Processing Disclosure
                </h3>
                <p className="text-xs text-slate-400">
                  CADPOINT Authorized Training Centre
                </p>
              </div>
            </div>
            <button
              onClick={closePrivacyNoticeModal}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Privacy Notice"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Privacy Content */}
          <div
            ref={contentRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto my-4 pr-2 space-y-6 text-xs leading-relaxed text-slate-300 custom-scrollbar"
          >
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-200">
              <p className="font-semibold text-xs flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400 shrink-0" />
                Instruction: Please scroll to the bottom of this Privacy Notice to enable the consent checkbox in your form.
              </p>
            </div>

            <section className="space-y-2">
              <h4 className="text-sm font-bold text-white">1. Overview & Data Controller</h4>
              <p>
                CADPOINT Authorized Training Centre ("CADPOINT", "we", "us") collects and processes personal data provided by prospective students, course applicants, and website visitors. We are committed to processing your data transparently, securely, and solely for legitimate educational and counseling purposes.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="text-sm font-bold text-white">2. Personal Data We Collect</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Identification Details:</strong> Full Name, Email Address, Phone Number, WhatsApp Contact, City/Location.</li>
                <li><strong>Academic & Career Profile:</strong> Qualification, Institution Name, Year of Passing, Course Interest, Training Mode Preference (Online/Offline/Hybrid), Preferred Batch Time.</li>
                <li><strong>Enquiry Details:</strong> Specific messages, course queries, or callback requests.</li>
                <li><strong>Technical Cookies & Preferences:</strong> Browser metadata, session identifiers, and cookie preference selections.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h4 className="text-sm font-bold text-white">3. Purpose of Processing</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Providing free career counseling and responding to specific course enquiries.</li>
                <li>Processing student online applications and assigning registration reference numbers.</li>
                <li>Generating ISO 9001:2008 certified course completion credentials and digital verification.</li>
                <li>Sending administrative notifications, batch updates, and offer details via email or WhatsApp.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h4 className="text-sm font-bold text-white">4. Consent & Right to Withdraw</h4>
              <p>
                Your personal data is collected on the basis of your affirmative consent. You have the right to withdraw consent for optional marketing communications at any time. Withdrawal does not affect lawful processing conducted prior to withdrawal.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="text-sm font-bold text-white">5. Data Retention & Security</h4>
              <p>
                We retain personal records only for as long as necessary to fulfill academic counseling, student onboarding, and ISO certification verification standards. Data is protected with SSL/TLS encryption, secure database access control, and strict administrative protocols. We do not sell or trade student data to third-party data brokers.
              </p>
            </section>

            <section className="space-y-2">
              <h4 className="text-sm font-bold text-white">6. Contact Information & Grievances</h4>
              <p>For any privacy queries, correction requests, or data updates, please contact our Salem Head Office team:</p>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email: <strong className="text-white">{COMPANY_INFO.email}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Phone / Helpline: <strong className="text-white">{COMPANY_INFO.phone}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Address: <strong className="text-white">{COMPANY_INFO.address}</strong></span>
                </div>
              </div>
            </section>

            {/* Bottom Target Indicator */}
            <div className="p-4 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-center font-semibold text-xs">
              End of Privacy Notice Document
            </div>
          </div>

          {/* Footer Status Bar & Action Button */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-2 text-xs">
              {reachedBottom ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Privacy Notice reviewed completely. You may now provide consent.</span>
                </span>
              ) : (
                <span className="text-amber-400 font-medium flex items-center gap-1.5 animate-pulse">
                  <ArrowDownCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Scroll down to the end of the notice to enable consent.</span>
                </span>
              )}
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={closePrivacyNoticeModal}
              className="w-full sm:w-auto justify-center px-6"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
