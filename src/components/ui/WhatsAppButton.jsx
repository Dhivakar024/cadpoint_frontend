import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export function WhatsAppButton() {
  const phoneNumber = "916383332121";
  const defaultMessage = encodeURIComponent("Hi CADPOINT, I would like to inquire about your courses and services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold shadow-2xl shadow-emerald-600/50 hover:shadow-emerald-500/70 border border-emerald-400/40 cursor-pointer group backdrop-blur-md"
      aria-label="Chat with CADPOINT on WhatsApp"
    >
      {/* Pulse Outer Ring */}
      <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping pointer-events-none" />

      <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center shrink-0">
        <MessageCircle className="w-4 h-4 fill-current text-white" />
      </div>

      <span className="text-xs sm:text-sm font-bold tracking-wide">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
