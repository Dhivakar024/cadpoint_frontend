import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, ShieldCheck, Instagram, Facebook, MessageCircle, Linkedin, Youtube } from 'lucide-react';
import { COMPANY_INFO, DEPARTMENTS, SOCIAL_LINKS } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';

export function Footer() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getSocialIcon = (name) => {
    switch (name) {
      case 'Instagram': return Instagram;
      case 'Facebook': return Facebook;
      case 'WhatsApp': return MessageCircle;
      case 'LinkedIn': return Linkedin;
      case 'YouTube': return Youtube;
      default: return MessageCircle;
    }
  };

  return (
    <footer className={`pt-16 pb-12 relative overflow-hidden transition-colors duration-500 border-t ${
      isDark
        ? 'bg-[#040711] text-slate-400 border-slate-800/80'
        : 'bg-[#064e3b] text-emerald-100 border-emerald-800/80 shadow-2xl'
    }`}>
      {/* Background Glows */}
      {isDark ? (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/10 rounded-full blur-[140px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-[140px] pointer-events-none" />
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* BRAND COLUMN WITH LOGO & SOCIAL LINKS */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/cadpoint_logo.svg"
                alt="CADPOINT Authorized Training Centre - ISO Certified"
                className="w-[170px] sm:w-[210px] h-auto object-contain shrink-0 filter drop-shadow-[0_0_12px_rgba(239,68,68,0.25)] logo-white-glow cursor-pointer"
                style={{ preserveAspectRatio: 'xMidYMid meet' }}
              />
            </Link>
            
            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm ${
              isDark ? 'text-slate-400' : 'text-emerald-100/90'
            }`}>
              {COMPANY_INFO.tagline}. Premier ISO Certified training & engineering solutions institute pioneering technology since 1993.
            </p>

            <div className={`flex items-center gap-3 text-xs font-medium pt-2 ${
              isDark ? 'text-slate-300' : 'text-emerald-200'
            }`}>
              <ShieldCheck className={`w-5 h-5 shrink-0 ${isDark ? 'text-red-500' : 'text-emerald-400'}`} />
              <span>32 Years Track Record of Educational Excellence</span>
            </div>

            {/* OFFICIAL SOCIAL MEDIA CONNECT LINKS */}
            <div className="pt-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider block mb-3 ${
                isDark ? 'text-slate-400' : 'text-emerald-200/80'
              }`}>
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = getSocialIcon(item.name);
                  return (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300 shadow-md group cursor-pointer ${
                        isDark
                          ? 'bg-white/5 border-white/10 hover:border-red-500/50 hover:bg-red-600/20 text-slate-300 hover:text-white'
                          : 'bg-emerald-900/40 border-emerald-700/60 hover:border-emerald-400 hover:bg-emerald-800/60 text-emerald-200 hover:text-white'
                      }`}
                      title={`Follow CADPOINT on ${item.name}`}
                      aria-label={`CADPOINT ${item.name}`}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className={`transition-colors ${isDark ? 'hover:text-red-400' : 'text-emerald-200 hover:text-white'}`}>Home</Link></li>
              <li><Link to="/about" className={`transition-colors ${isDark ? 'hover:text-red-400' : 'text-emerald-200 hover:text-white'}`}>About Us</Link></li>
              <li><Link to="/services" className={`transition-colors ${isDark ? 'hover:text-red-400' : 'text-emerald-200 hover:text-white'}`}>IT & Engineering Services</Link></li>
              <li><Link to="/courses" className={`transition-colors ${isDark ? 'hover:text-red-400' : 'text-emerald-200 hover:text-white'}`}>Course Catalog (120+)</Link></li>
              <li><Link to="/ecosystem" className={`transition-colors ${isDark ? 'hover:text-red-400' : 'text-emerald-200 hover:text-white'}`}>Group Ecosystem</Link></li>
              <li><Link to="/registration" className={`transition-colors ${isDark ? 'hover:text-red-400' : 'text-emerald-200 hover:text-white'}`}>Online Registration</Link></li>
              <li><Link to="/contact" className={`transition-colors ${isDark ? 'hover:text-red-400' : 'text-emerald-200 hover:text-white'}`}>Contact Helpline</Link></li>
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
                  <Link to="/courses" className={`transition-colors line-clamp-1 ${isDark ? 'hover:text-red-400' : 'text-emerald-200 hover:text-white'}`}>
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
                <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-red-500' : 'text-emerald-400'}`} />
                <span className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-emerald-100'}`}>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className={`w-4 h-4 shrink-0 ${isDark ? 'text-red-500' : 'text-emerald-400'}`} />
                <a href={`tel:${COMPANY_INFO.phone}`} className={`transition-colors ${isDark ? 'text-slate-300 hover:text-white' : 'text-emerald-100 hover:text-white'}`}>
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className={`w-4 h-4 shrink-0 ${isDark ? 'text-red-500' : 'text-emerald-400'}`} />
                <a href={`mailto:${COMPANY_INFO.email}`} className={`transition-colors truncate ${isDark ? 'text-slate-300 hover:text-white' : 'text-emerald-100 hover:text-white'}`}>
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className={`w-4 h-4 shrink-0 ${isDark ? 'text-slate-500' : 'text-emerald-300/70'}`} />
                <span className={isDark ? 'text-slate-400' : 'text-emerald-200'}>{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM LEGAL & COPYRIGHT */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs ${
          isDark ? 'border-slate-800/80 text-slate-400' : 'border-emerald-800/80 text-emerald-200'
        }`}>
          <p>{COMPANY_INFO.copyright}</p>
          <div className={`flex items-center gap-6 ${isDark ? 'text-slate-500' : 'text-emerald-300'}`}>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
