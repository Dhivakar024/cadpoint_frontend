import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO, DEPARTMENTS } from '../../utils/constants';

export function Footer() {
  return (
    <footer className="bg-[#040711] text-slate-400 border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Background Subtle Red & Navy Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* BRAND COLUMN WITH DIRECT STANDALONE LOGO IMAGE */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/cadpoint_logo.svg"
                alt="CADPOINT Authorized Training Centre - ISO 9001 : 2008 Certified"
                className="w-[220px] sm:w-[260px] h-auto object-contain shrink-0"
                style={{ preserveAspectRatio: 'xMidYMid meet' }}
              />
            </Link>
            
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {COMPANY_INFO.tagline}. Premier ISO Certified training & engineering solutions institute pioneering technology since 1993.
            </p>

            <div className="flex items-center gap-3 text-xs text-slate-300 font-medium pt-2">
              <ShieldCheck className="w-5 h-5 text-red-500 shrink-0" />
              <span>32 Years Track Record of Educational Excellence</span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-red-400 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-red-400 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-red-400 transition-colors">IT & Engineering Services</Link></li>
              <li><Link to="/courses" className="hover:text-red-400 transition-colors">Course Catalog (120+)</Link></li>
              <li><Link to="/ecosystem" className="hover:text-red-400 transition-colors">Group Ecosystem</Link></li>
              <li><Link to="/registration" className="hover:text-red-400 transition-colors">Online Registration</Link></li>
              <li><Link to="/contact" className="hover:text-red-400 transition-colors">Contact Helpline</Link></li>
            </ul>
          </div>

          {/* DEPARTMENTS */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Departments
            </h4>
            <ul className="space-y-2.5 text-xs">
              {DEPARTMENTS.map((dept) => (
                <li key={dept.id}>
                  <Link to="/courses" className="hover:text-red-400 transition-colors line-clamp-1">
                    {dept.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HEAD OFFICE CONTACT */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Salem Head Office
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors truncate">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL & COPYRIGHT */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>{COMPANY_INFO.copyright}</p>
          <div className="flex items-center gap-6 text-slate-500">
            <Link to="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link to="/refund-policy" className="hover:text-slate-300 transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
