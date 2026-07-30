import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';
import { COMPANY_INFO, SOCIAL_LINKS } from '../../utils/constants';

export function Footer() {
  return (
    <footer className="relative bg-[#070B18] pt-20 pb-10 overflow-hidden border-t border-white/10">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          <div className="flex flex-col gap-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center font-bold text-white text-xl font-heading shadow-lg shadow-purple-500/30">
                CP
              </div>
              <span className="text-2xl font-extrabold font-heading text-white">
                CAD<span className="text-cyan-400">POINT</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              CADPOINT is a premier training and design institute that blends creativity, technology, and innovation across CAD/CAM/BIM, IT, Digital Media, and Accounting.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500/50 hover:bg-purple-600/20 transition-all duration-300"
                  aria-label={item.name}
                >
                  <span className="text-xs font-semibold">{item.name[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold font-heading text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              Company Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: 'About CADPOINT', path: '/about' },
                { name: 'Services & Projects', path: '/services' },
                { name: 'Explore Courses', path: '/courses' },
                { name: 'Ecosystem & Ventures', path: '/ecosystem' },
                { name: 'Online Registration', path: '/registration' },
                { name: 'Contact & Support', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold font-heading text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              Our Specializations
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>CADD / BIM / Architectural Drafting</li>
              <li>Software Development & Full Stack</li>
              <li>Multimedia & AR / VR Design</li>
              <li>Accounts, GST & Tally Prime</li>
              <li>Corporate Upskilling Programs</li>
              <li>Academic Research & live Projects</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold font-heading text-lg mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COMPANY_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>{COMPANY_INFO.copyright}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
