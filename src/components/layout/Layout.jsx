import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ContactPopup } from '../ui/ContactPopup';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { AIChatbot } from '../ui/AIChatbot';
import { WhyChooseUs } from '../sections/WhyChooseUs';
import { useTheme } from '../../context/ThemeContext';
import { CookieConsentBanner } from '../common/CookieConsentBanner';
import { CookiePreferencesModal } from '../common/CookiePreferencesModal';
import { PrivacyNoticeModal } from '../common/PrivacyNoticeModal';
import { PrivacyCenterModal } from '../common/PrivacyCenterModal';
import { FluidCursor } from '../ui/FluidCursor';

export function Layout({ children }) {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${
      isDark
        ? 'bg-[#070B18] text-[#F8FAFC]'
        : 'bg-gradient-to-b from-white via-[#f8fffc] via-[#f3fff9] to-[#ecfdf5] text-[#0F172A]'
    }`}>
      {/* Public Website Lightweight Fluid Cursor */}
      <FluidCursor />

      <Navbar />
      <main className="flex-grow pt-24 sm:pt-28">{children}</main>
      
      {/* Why Choose CADPOINT Section (Mounted directly above Footer) */}
      <WhyChooseUs />
      
      <Footer />

      {/* Automatic 1.5-second Lead Popup */}
      <ContactPopup />
      {/* Floating AI Chatbot Assistant */}
      <AIChatbot />
      {/* Floating Circular WhatsApp Icon Button */}
      <WhatsAppButton />

      {/* Cookie Consent Banner, Preferences Modal, Privacy Notice Modal & Privacy Center Modal */}
      <CookieConsentBanner />
      <CookiePreferencesModal />
      <PrivacyNoticeModal />
      <PrivacyCenterModal />
    </div>
  );
}
