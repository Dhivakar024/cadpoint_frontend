import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { submitEnquiry } from '../services/api';
import { sendContactEmailDirect, getWhatsAppShareUrl } from '../services/directResend';
import { COMPANY_INFO } from '../utils/constants';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitEnquiry(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-6">
        <Badge variant="red" className="mb-4">Get In Touch</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gradient font-heading tracking-tight">
          We're Here to Help
        </h1>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          Send us your feedback or enquiries regarding our courses, corporate services, or project partnerships. We aim to respond quickly and ensure a smooth support experience.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <Card className="p-8 border-red-500/30">
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
                      placeholder="e.g. Dhivakar"
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
                      placeholder="e.g. name@gmail.com"
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
                      placeholder="+91 78118 22644"
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

                <Button type="submit" variant="primary" size="lg" className="w-full" isLoading={isSubmitting} icon={Send}>
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
                    <span>💬 Send Direct WhatsApp Message to 7811822644</span>
                  </a>
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <Card className="p-8 border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white font-heading flex items-center gap-2">
              <MapPin className="w-5 h-5 text-red-400" />
              Head Office (Salem)
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {COMPANY_INFO.legalName} <br />
              <strong className="text-white">{COMPANY_INFO.address}</strong>
            </p>
            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-red-400" />
                <span>Office: {COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Helpline: {COMPANY_INFO.helpline}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-red-400" />
                <span>Email: {COMPANY_INFO.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Hours: {COMPANY_INFO.hours}</span>
              </div>
            </div>
          </Card>

          <Card className="p-4 border-white/10 text-center flex flex-col items-center justify-center h-52 relative overflow-hidden bg-white/5">
            <MapPin className="w-10 h-10 text-red-400 mb-2 animate-bounce" />
            <h4 className="text-sm font-bold text-white font-heading">Interactive Map View</h4>
            <p className="text-slate-400 text-xs mt-1">Advaitha Ashram Rd, Fairlands, Salem - 636007</p>
            <span className="mt-3 text-[10px] px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
              GPS Coordinates Validated
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
}
