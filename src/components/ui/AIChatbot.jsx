import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, ChevronRight, MessageSquare, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Hello! 👋 Welcome to CADPOINT Academy & IT Services. I am your AI Assistant. How can I help you today?",
    time: 'Just now'
  }
];

const SUGGESTIONS = [
  "What courses do you offer?",
  "Tell me about Civil & BIM courses",
  "IT & Full Stack Development",
  "Placement Assistance & Internships",
  "Where is CADPOINT located?",
  "How can I register?"
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const generateAIResponse = (userQuery) => {
    const q = userQuery.toLowerCase();

    if (q.includes('course') || q.includes('offer') || q.includes('program') || q.includes('study')) {
      return "CADPOINT offers 120+ Industry-Certified Programs across 6 main departments:\n\n1. 🏗️ Civil & Architecture CADD / BIM (AutoCAD, Revit, STAAD Pro, ETABS, Tekla)\n2. 💻 IT & Non-IT (Python, Full Stack Development, MERN, Data Science & AI)\n3. ⚙️ Mechanical & Aeronautical (SolidWorks, CATIA V5, Creo, Ansys Workbench, CFD)\n4. ⚡ Electrical & Electronics (AutoCAD Electrical, Revit MEP, EPLAN, ETAP, PLC & SCADA)\n5. 🎨 Multimedia & AR/VR (Photoshop, After Effects, Maya, UI/UX, 3D Assets)\n6. 📊 Accounts & ERP (Tally Prime, Advanced Excel, SAP FICO)\n\nAll courses include hands-on live project training and certification!";
    }

    if (q.includes('civil') || q.includes('bim') || q.includes('autocad') || q.includes('revit') || q.includes('staad')) {
      return "Our Civil & Architecture Department offers Certification, Diploma, and Master Diploma programs in:\n- AutoCAD 2D & 3D Drafting\n- Revit Architecture & Structural BIM\n- STAAD Pro & ETABS Structural Analysis\n- Tekla Steel Detailing\n- Civil 3D & Land Survey\n- 3ds Max, SketchUp & V-Ray Visualization\n\nWould you like to enroll or register for a free demo session?";
    }

    if (q.includes('it') || q.includes('python') || q.includes('full stack') || q.includes('web') || q.includes('data science') || q.includes('java')) {
      return "Our IT & Software Department covers:\n- Python & Full Stack Development (Django / React)\n- Java Full Stack & Spring Boot\n- MERN Stack (MongoDB, Express, React, Node.js)\n- Data Science, Machine Learning & AI\n- Cloud Computing & DevOps (AWS, Docker, Kubernetes)\n\nPrograms range from 60-hour Certifications to 280-hour Master Diplomas!";
    }

    if (q.includes('placement') || q.includes('job') || q.includes('internship') || q.includes('hiring')) {
      return "Yes! CADPOINT provides 100% Placement Assistance with 350+ corporate hiring partners and a 96% placement record.\n\nOur top performers also get DIRECT INTERNSHIP opportunities inside our company to work on live client projects!";
    }

    if (q.includes('location') || q.includes('where') || q.includes('address') || q.includes('salem') || q.includes('contact') || q.includes('phone') || q.includes('number')) {
      return "📍 CADPOINT Salem Location:\n1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem - 636007, Tamil Nadu, India.\n\n📞 Phone: (+91) 95666 79928\n✉️ Email: cadpointsalem001@gmail.com\n⏰ Office Hours: Mon – Sat (9 AM – 7 PM)";
    }

    if (q.includes('register') || q.includes('enroll') || q.includes('apply') || q.includes('fees') || q.includes('price') || q.includes('admission')) {
      return "You can register online directly through our website Registration page! Or click the button below to submit your application right now. Our admissions counselor will call you with complete batch timing and fee discount details.";
    }

    return "Thank you for your question! CADPOINT is a premier Training Institute & IT Services company in Salem offering 120+ courses in CADD, IT Full Stack, Multimedia, Accounts, and Engineering. Would you like to check our course catalog or speak directly with a counselor?";
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateAIResponse(query);
      const botMsg = {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <>
      {/* FLOATING AI CHATBOT BUTTON (Positioned above WhatsApp Button) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white flex items-center justify-center shadow-2xl shadow-red-950/50 hover:shadow-red-900/70 border border-red-500/40 cursor-pointer group backdrop-blur-md"
        aria-label="Open CADPOINT AI Assistant"
        title="Ask CADPOINT AI Assistant"
      >
        {/* Pulse Ring */}
        <span className="absolute -inset-1.5 rounded-full bg-red-500/30 animate-ping pointer-events-none" />

        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <Bot className="w-7 h-7 text-white transition-transform group-hover:scale-110" />
            <Sparkles className="w-3.5 h-3.5 text-red-300 absolute -top-1 -right-1 animate-pulse" />
          </div>
        )}
      </motion.button>

      {/* AI CHATBOT MODAL WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-40 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] rounded-3xl glass-panel border border-red-500/40 shadow-2xl overflow-hidden flex flex-col bg-[#070b18]/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-red-950/80 via-[#111827] to-slate-900/90 border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-red-600 to-slate-900 p-0.5 shadow-md border border-red-500/30">
                  <div className="w-full h-full rounded-full bg-[#070b18] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-red-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#070b18]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-heading flex items-center gap-1.5">
                    CADPOINT AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  </h4>
                  <span className="text-[11px] text-emerald-400 font-medium">Online • Instant Support</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-red-400" />
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-red-600 to-slate-900 text-white rounded-br-none border border-red-500/30'
                        : 'bg-white/10 text-slate-200 border border-white/10 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                    <div
                      className={`text-[9px] mt-1.5 text-right ${
                        msg.sender === 'user' ? 'text-red-200' : 'text-slate-400'
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-slate-300" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2.5 items-center text-slate-400 text-xs">
                  <div className="w-7 h-7 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="bg-white/10 p-3 rounded-2xl border border-white/10 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-slate-300 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2 border-t border-white/10 overflow-x-auto flex gap-1.5 no-scrollbar bg-white/[0.02]">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(sug)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 text-[10px] whitespace-nowrap transition-colors cursor-pointer shrink-0"
                >
                  {sug}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-[#040711] border-t border-white/10 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about CADPOINT..."
                className="flex-1 px-3.5 py-2 rounded-xl glass-input text-xs bg-white/5 text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="w-9 h-9 rounded-xl bg-gradient-to-r from-red-600 to-slate-900 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-opacity cursor-pointer shrink-0 border border-red-500/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
