import React from 'react';
import { SEO } from '../components/common/SEO';
import { getBreadcrumbSchema } from '../utils/seoSchemas';
import { ShieldCheck, Lock, Cookie, FileText, CheckCircle2, Mail, Phone, MapPin, Sliders } from 'lucide-react';
import { COMPANY_INFO } from '../utils/constants';
import { Button } from '../components/ui/Button';
import { useCookieConsent } from '../context/CookieConsentContext';
import { useTheme } from '../context/ThemeContext';

export function PrivacyPolicy() {
  const { openPreferencesModal } = useCookieConsent();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const privacyJsonLd = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Privacy Center', url: '/privacy-policy' }
    ])
  ];

  return (
    <>
      <SEO
        title="Privacy Center & DPDP Data Notice | CADPOINT Authorized Training Centre"
        description="Read CADPOINT's official Privacy Notice and Data Principal Rights in accordance with India's Digital Personal Data Protection Act, 2023 and DPDP Rules, 2025."
        keywords="CADPOINT Privacy Policy, DPDP Act 2023, CADPOINT Data Protection, Cookie Preferences, Privacy Notice Salem"
        canonical="/privacy-policy"
        jsonLd={privacyJsonLd}
      />

      <div className="space-y-12 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Header Section */}
        <div className="text-center space-y-4 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/30">
            <ShieldCheck className="w-4 h-4" />
            <span>DPDP Act 2023 & Rules 2025 Compliant</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gradient font-heading tracking-tight">
            CADPOINT PRIVACY CENTER
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Transparent information on how CADPOINT Authorized Training Centre collects, processes, protects, and manages your personal data.
          </p>
          <div className="text-xs text-slate-400 font-medium">
            Last Updated: August 2026 | Version 1.0
          </div>
        </div>

        {/* Interactive Cookie Bar inside Privacy Center */}
        <div
          className={`p-6 rounded-3xl border shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 ${
            isDark
              ? 'bg-[#0B132B] border-purple-500/30 text-white'
              : 'bg-white border-emerald-300 text-slate-900'
          }`}
        >
          <div className="space-y-1.5 text-left">
            <div className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold font-heading">Cookie Preferences & Consent Controls</h3>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              You can review, modify, or withdraw optional cookie consent choices at any time through our interactive preference manager.
            </p>
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={openPreferencesModal}
            className="w-full md:w-auto shrink-0 justify-center gap-2"
            icon={Sliders}
          >
            Manage Cookie Settings
          </Button>
        </div>

        {/* Notice Content Sections */}
        <div className="space-y-8 text-sm leading-relaxed">
          {/* Section 1 */}
          <section className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                01
              </div>
              <h2 className="text-xl font-bold font-heading text-white">
                Overview & Legal Compliance Scope
              </h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              CADPOINT Authorized Training Centre ("CADPOINT", "we", "us", or "our") is committed to safeguarding personal data entrusted to us by prospective students, course applicants, industrial trainees, and website visitors. This Privacy Notice is published in alignment with India's <strong>Digital Personal Data Protection Act, 2023 (DPDP Act)</strong> and the <strong>Digital Personal Data Protection Rules, 2025</strong>.
            </p>
          </section>

          {/* Section 2 */}
          <section className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                02
              </div>
              <h2 className="text-xl font-bold font-heading text-white">
                Personal Data We Collect
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p>We collect personal data only when voluntarily provided by you through our website forms or direct interactions:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                <li><strong>Identity & Contact Details:</strong> Full Name, Email Address, Phone Number, WhatsApp Number, City/Location.</li>
                <li><strong>Educational & Career Information:</strong> Qualification, College/Institution Name, Year of Passing, Course Interest, Mode of Training (Online/Offline), Batch Preference.</li>
                <li><strong>Enquiry Details:</strong> Specific messages, subject queries, callback requests submitted via Quick Admission Enquiry or Contact Us forms.</li>
                <li><strong>Technical Data:</strong> IP address, device type, browser metadata, and cookie preferences stored locally on your device.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                03
              </div>
              <h2 className="text-xl font-bold font-heading text-white">
                Purpose of Data Processing
              </h2>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-slate-300">
              <p>Your personal data is processed strictly for legitimate, educational, and service-related purposes:</p>
              <ul className="list-disc pl-5 space-y-1.5">
                <li>Providing free career counseling and responding to admission enquiries.</li>
                <li>Processing student course registrations, generating registration reference IDs, and scheduling training batches.</li>
                <li>Issuing official ISO 9001:2008 certified course completion credentials and digital verification.</li>
                <li>Facilitating internship placement support and corporate interview coordination.</li>
                <li>Sending administrative alerts via email or WhatsApp regarding course schedules and offer details.</li>
              </ul>
            </div>
          </section>

          {/* Section 4 */}
          <section className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                04
              </div>
              <h2 className="text-xl font-bold font-heading text-white">
                Data Principal Rights (Your Rights Under DPDP)
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <h4 className="font-bold text-cyan-400 text-xs">Right to Access & Summary</h4>
                <p className="text-[11px] text-slate-300">Request a summary of personal data being processed and third parties shared with.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <h4 className="font-bold text-cyan-400 text-xs">Right to Correction & Erasure</h4>
                <p className="text-[11px] text-slate-300">Request correction of inaccurate data or erasure when processing purpose is fulfilled.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <h4 className="font-bold text-cyan-400 text-xs">Right to Withdraw Consent</h4>
                <p className="text-[11px] text-slate-300">Withdraw consent for communication or optional processing at any time without penalty.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <h4 className="font-bold text-cyan-400 text-xs">Grievance Redressal</h4>
                <p className="text-[11px] text-slate-300">Contact our Data Principal Liaison for prompt resolution of privacy concerns.</p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                05
              </div>
              <h2 className="text-xl font-bold font-heading text-white">
                Data Retention & Security Measures
              </h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We retain personal enquiry and registration records only for as long as necessary to fulfill academic counseling, course delivery, and ISO certification record-keeping obligations. Data is stored on secure MongoDB database servers with SSL/TLS encryption. We do not store financial passwords, credit card numbers, or unnecessary sensitive data in browser storage.
            </p>
          </section>

          {/* Section 6 */}
          <section className={`p-6 sm:p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                06
              </div>
              <h2 className="text-xl font-bold font-heading text-white">
                Third-Party Service Providers
              </h2>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
              We use reputable technical service providers solely to operate website communications:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
              <li><strong>Resend API:</strong> Transactional email dispatch for lead alerts.</li>
              <li><strong>WhatsApp API / Direct Routing:</strong> Counseling notifications.</li>
              <li><strong>Render / Vercel Cloud:</strong> Secure application hosting.</li>
            </ul>
            <p className="text-slate-300 text-xs mt-3">We never sell, rent, or trade student personal data to third-party data brokers.</p>
          </section>

          {/* Section 7 */}
          <section className={`p-6 sm:p-8 rounded-3xl border border-red-500/30 bg-red-500/5 space-y-4`}>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-red-400 shrink-0" />
              <h2 className="text-xl font-bold font-heading text-white">
                Data Principal Contact & Grievance Liaison
              </h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              To exercise your Data Principal rights, request data correction/erasure, or raise a privacy query, please contact our designated Salem Head Office team:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:underline truncate">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:underline">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-white">Fairlands, Salem - 636007</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
