import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, PhoneCall } from 'lucide-react';
import { Button } from '../ui/Button';
import { COMPANY_INFO } from '../../utils/constants';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Courses', path: '/courses' },
    { name: 'Ecosystem', path: '/ecosystem' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Contact Bar */}
      <div className="bg-[#040711] text-slate-300 py-1.5 px-4 text-xs border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <PhoneCall className="w-3.5 h-3.5 text-red-500" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <a href={`mailto:${COMPANY_INFO.email}`} className="hidden sm:inline hover:text-white transition-colors">
              {COMPANY_INFO.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Admissions Open 2026
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#070b18]/95 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl py-2.5'
            : 'bg-[#070b18]/70 backdrop-blur-md py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* OFFICIAL CADPOINT LOGO WITH RADIANT GLOW */}
          <Link to="/" className="flex items-center group">
            <img
              src="/cadpoint_logo.svg"
              alt="CADPOINT Authorized Training Centre - ISO Certified"
              className="w-[160px] sm:w-[215px] h-auto object-contain shrink-0 filter drop-shadow-[0_0_12px_rgba(239,68,68,0.35)] drop-shadow-[0_0_24px_rgba(30,58,138,0.25)] transition-transform group-hover:scale-105"
              style={{ preserveAspectRatio: 'xMidYMid meet' }}
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-slate-900 text-white shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/registration">
              <Button variant="primary" size="sm" icon={ArrowRight}>
                Register Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#070b18]/95 backdrop-blur-2xl border-b border-slate-800 p-6 space-y-4 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname === link.path
                      ? 'bg-red-600/20 text-red-400 border border-red-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-2">
              <Link to="/registration" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center" icon={ArrowRight}>
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
