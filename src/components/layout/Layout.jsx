import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ContactPopup } from '../ui/ContactPopup';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { AIChatbot } from '../ui/AIChatbot';

export function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#070B18] text-[#F8FAFC]">
      <Navbar />
      <main className="flex-grow pt-24 sm:pt-28">{children}</main>
      <Footer />
      {/* Automatic 1-second Lead Popup */}
      <ContactPopup />
      {/* Floating AI Chatbot Assistant */}
      <AIChatbot />
      {/* Floating Circular WhatsApp Icon Button */}
      <WhatsAppButton />
    </div>
  );
}
