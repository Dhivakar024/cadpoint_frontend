import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { submitEnquiry } from '../services/api';
import { getWhatsAppShareUrl, sendContactEmailDirect } from '../services/directResend';
import { COMPANY_INFO } from '../utils/constants';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare, Building2, Navigation, ExternalLink } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { getOrganizationSchema, getBreadcrumbSchema, getFAQSchema } from '../utils/seoSchemas';
import { PrivacyAcknowledgement, getPrivacyMetadata } from '../components/common/PrivacyAcknowledgement';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!privacyChecked) {
      setPrivacyError(true);
      return;
    }

    setIsSubmitting(true);
    const payload = {
      ...formData,
      ...getPrivacyMetadata('contact-us'),
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

  const contactFaqs = [
    {
      question: "Where is CADPOINT Salem located?",
      answer: "CADPOINT Salem Head Office is located at 1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem - 636007, Tamil Nadu."
    },
    {
      question: "How can I contact CADPOINT Salem for admissions?",
      answer: "Call (+91) 95666 79928 or email cadpointsalem001@gmail.com for instant course counselor guidance."
    }
  ];

  const contactJsonLd = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Contact', url: '/contact' }
    ]),
    getFAQSchema(contactFaqs)
  ];

  return (
    <>
      <SEO
        title="Contact CADPOINT Salem | Phone, Address & Admission Helpline"
        description="Contact CADPOINT Salem Head Office at CPS Tower, Advaitha Ashram Road, Fairlands. Call (+91) 95666 79928 for course inquiries and counselor advice."
        keywords="Contact CADPOINT, CADPOINT Salem Address, CADPOINT Phone Number, CAD Institute Fairlands Salem, CADPOINT Admission Helpline"
        canonical="/contact"
        jsonLd={contactJsonLd}
      />
      <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Badge */}
        <div className="text-center pt-6 space-y-3">
          <Badge variant="red" className="mb-2">Get In Touch</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gradient font-heading tracking-tight">
            CONTACT CADPOINT SALEM
          </h1>
        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Send us your feedback or enquiries regarding our courses, corporate services, or project partnerships. We aim to respond quickly and ensure a smooth support experience.
        </p>
      </div>

      {/* Main Grid: Form + Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <Card className="p-8 border-red-500/30 shadow-2xl">
            <h2 className="text-2xl font-bold text-white font-heading mb-2 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-400" />
              Send Us a Message
            </h2>
            <p className="text-slate-400 text-xs mb-8">
              Fill out the form below and our counselor team will call you back within 2 business hours.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Kumar"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. student@example.com"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-2">Subject / Interest *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. CADD Course / Software Project"
                      className="w-full p-3.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Message Details *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your enquiry or question here..."
                    className="w-full p-3.5 rounded-xl glass-input text-sm"
                  />
                </div>

                <PrivacyAcknowledgement
                  id="contact-privacy"
                  checked={privacyChecked}
                  onChange={(e) => {
                    setPrivacyChecked(e.target.checked);
                    if (privacyError) setPrivacyError(false);
                  }}
                  error={privacyError}
                  errorMessage="Please acknowledge the Privacy Notice to submit your enquiry."
                />

                <Button type="submit" variant="primary" size="lg" className="w-full justify-center" isLoading={isSubmitting} icon={Send}>
                  Submit Enquiry
                </Button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">Enquiry Received & Dispatched!</h3>
                <p className="text-slate-300 text-xs max-w-sm mx-auto">
                  Thank you for reaching out. An official notification has been delivered to CADPOINT counselor team.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getWhatsAppShareUrl(formData, 'enquiry')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <span>💬 Send Direct WhatsApp Message to 9566679928</span>
                  </a>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Info Quick Contacts */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-8 border-slate-800 space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-400" />
              Corporate Contact Directory
            </h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Head Office Location</span>
                <p className="font-semibold text-white">{COMPANY_INFO.legalName}</p>
                <p className="text-slate-300">{COMPANY_INFO.address}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-red-400" /> Office Line
                  </span>
                  <p className="font-bold text-white">{COMPANY_INFO.phone}</p>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-400" /> Student Helpline
                  </span>
                  <p className="font-bold text-white">{COMPANY_INFO.helpline}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-cyan-400" /> Official Email
                </span>
                <p className="font-bold text-white">{COMPANY_INFO.email}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* =====================================================================
          REDESIGNED PREMIUM GOOGLE MAP & FLOATING GLASS OVERLAY SECTION
          ===================================================================== */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-[20px] overflow-hidden shadow-2xl border border-white/10 glass-panel"
      >
        {/* Interactive Google Map Embed (Full Width) */}
        <div className="relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-[20px]">
          <iframe
            src="https://www.google.com/maps?q=1st+Floor,+CPS+Tower,+Advaitha+Ashram+Road,+Fairlands,+Salem+636007&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CADPOINT Salem Office Location Google Map"
            className="w-full h-full filter contrast-[1.05] brightness-[0.95]"
          />
        </div>

        {/* Floating Glass Information Card Overlay */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            x: { duration: 0.6, delay: 0.2 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }}
          className="relative md:absolute md:left-6 md:top-1/2 md:-translate-y-1/2 z-10 w-full md:max-w-md p-6 rounded-[20px] backdrop-blur-[18px] bg-[#0a0f25]/85 border border-white/15 shadow-2xl space-y-4 my-4 md:my-0 mx-auto"
        >
          {/* Header & Title */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-500 shrink-0 animate-bounce" />
              <h3 className="text-base font-extrabold text-white font-heading">📍 CADPOINT Training Centre</h3>
            </div>
            <p className="text-xs font-semibold text-slate-300 flex items-center gap-1.5 pl-7">
              <Building2 className="w-3.5 h-3.5 text-cyan-400" /> 🏢 CADPOINT Authorized Training Centre
            </p>
          </div>

          {/* Address */}
          <div className="text-xs text-slate-300 leading-relaxed border-t border-white/10 pt-3 pl-7">
            <p className="font-semibold text-white">📍 1st Floor, CPS Tower,</p>
            <p>Advaitha Ashram Road, Fairlands,</p>
            <p className="font-semibold text-emerald-400">Salem – 636007</p>
          </div>

          {/* Working Hours */}
          <div className="space-y-1 text-xs border-t border-white/10 pt-3">
            <div className="flex items-center gap-2 text-slate-300">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-bold text-white">🕒 Working Hours</span>
            </div>
            <p className="text-slate-300 text-[11px] pl-6">Monday – Saturday: <strong className="text-white">9:00 AM – 7:00 PM</strong></p>
          </div>

          {/* Contact Directory */}
          <div className="space-y-2 text-xs border-t border-white/10 pt-3">
            <div className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span>📞 Office: <strong className="text-white">+91 95666 79928</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>📞 Helpline: <strong className="text-white">+91 95666 79958</strong></span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">✉ Email: <strong className="text-white">cadpointsalem001@gmail.com</strong></span>
            </div>
          </div>

          {/* Two Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href="https://www.google.com/maps/search/?api=1&query=1st+Floor+CPS+Tower+Advaitha+Ashram+Road+Fairlands+Salem+636007"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1"
              aria-label="Get Directions on Google Maps"
            >
              <Button variant="primary" size="sm" className="w-full justify-center gap-2 font-bold" icon={Navigation}>
                Get Directions
              </Button>
            </a>
            <a
              href="https://www.google.com/maps?q=1st+Floor,+CPS+Tower,+Advaitha+Ashram+Road,+Fairlands,+Salem+636007"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1"
              aria-label="View Larger Google Map"
            >
              <Button variant="outline" size="sm" className="w-full justify-center text-xs border-white/20 hover:bg-white/10">
                View Larger Map
              </Button>
            </a>
          </div>
        </motion.div>
      </motion.section>
    </div>
  </>
  );
}
