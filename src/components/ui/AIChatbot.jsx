import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, CheckCircle2, PhoneCall, Globe, MessageSquare } from 'lucide-react';
import { submitEnquiry } from '../../services/api';
import { getWhatsAppShareUrl } from '../../services/directResend';

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Hello! 👋 Welcome to CADPOINT Academy. I am your Hybrid AI Assistant & Admission Counselor.\n\nI can assist you with CADPOINT Courses, ISO Certifications, Direct Internships, or help with Programming, CAD Design & Career Guidance in English, Tamil, or Tanglish!\n\nHow can I help you today?",
    time: 'Just now'
  }
];

const SUGGESTIONS = [
  "🐍 Python & Full Stack Courses",
  "📐 Civil CADD & BIM Programs",
  "⚙️ Mechanical & SolidWorks",
  "💼 Direct Internships",
  "📍 Salem Location & Hours",
  "💬 Request Free Counselor Call"
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Lead Capture State inside chat
  const [leadMode, setLeadMode] = useState(false);
  const [leadData, setLeadData] = useState({ name: '', phone: '', course: 'General Course Inquiry' });
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  // Language & Intent Detection Logic
  const processQuery = (rawQuery) => {
    const q = rawQuery.toLowerCase().trim();
    
    // Detect Language: Tamil Unicode or Tanglish
    const isTamil = /[\u0B80-\u0BFF]/.test(rawQuery);
    const isTanglish = /\b(machi|vanakkam|da|bro|sapttiya|eppo|nalla|epdi|pannu|teriyuma|venum|iruku|aagum|kudu|kaattu|enna|solllu|irukinga|vaanga|theriyum)\b/i.test(rawQuery);

    // ===================================================
    // 1. LEAD CAPTURE INTENT
    // ===================================================
    if (q.includes('call') || q.includes('callback') || q.includes('contact me') || q.includes('admission') || q.includes('discount') || q.includes('demo') || q.includes('register') || q.includes('enroll')) {
      if (isTamil) {
        return "நிச்சயமாக! CADPOINT ஆலோசகர் உங்களுடன் தொடர்பு கொள்ள, கீழே உள்ள படிவத்தில் உங்கள் பெயர் மற்றும் தொலைபேசி எண்ணைப் பகிரவும், அல்லது நேரடி ஆலோசகர் அழைப்பை மேற்கொள்ளவும்! 📞";
      }
      if (isTanglish) {
        return "Super Machi! CADPOINT Counselor உனக்கு உடனே Call பண்ணி Batch timing & Discount சொல்வாங்க. உன்னோட Name & Mobile Number சொல்லுடா! 🚀";
      }
      return "I would be happy to arrange a direct phone callback from our CADPOINT Salem Admissions Counselor! Please share your Name, Phone Number, and Interested Course, or use our quick lead form below.";
    }

    // ===================================================
    // 2. CADPOINT SPECIFIC KNOWLEDGE BASE
    // ===================================================
    if (q.includes('course') || q.includes('offer') || q.includes('department') || q.includes('catalog') || q.includes('study')) {
      if (isTamil) {
        return "CADPOINT சேலத்தில் 120+ சிறந்த தொழில்நுட்ப சான்றிதழ் படிப்புகள் உள்ளன:\n\n1. 🏗️ சிவில் & ஆர்க்கிடெக்சர் (AutoCAD, Revit, STAAD Pro, ETABS, Tekla)\n2. 💻 IT & சாப்ட்வேர் (Python, Full Stack, MERN, Data Science & AI, AWS)\n3. ⚙️ மெக்கானிக்கல் & ஏரோநாட்டிக்கல் (SolidWorks, CATIA, Creo, Ansys FEA/CFD)\n4. ⚡ எலக்ட்ரிக்கல் (AutoCAD Electrical, Revit MEP, EPLAN, PLC & SCADA)\n5. 🎨 மல்டிமீடியா (Photoshop, After Effects, Maya 3D, UI/UX Design)\n6. 📊 அக்கவுண்டிங் (Tally Prime, Advanced Excel, SAP FICO)\n\nஅனைத்து படிப்புகளுக்கும் 80% செய்முறை பயிற்சி வழங்கப்படுகிறது!";
      }
      if (isTanglish) {
        return "Machi, CADPOINT-ல 120+ Industry Courses இருக்குடா:\n\n1. 💻 IT & Software: Python, React, Java Full Stack, Data Science, AWS\n2. 🏗️ Civil & BIM: AutoCAD 2D/3D, Revit, STAAD Pro, ETABS\n3. ⚙️ Mechanical: SolidWorks, CATIA V5, Creo, Ansys Workbench\n4. ⚡ Electrical: AutoCAD Electrical, Revit MEP, PLC & SCADA\n5. 🎨 Multimedia: Photoshop, After Effects, Maya 3D, UI/UX\n6. 📊 Accounts: Tally Prime GST, Advanced Excel, SAP FICO\n\nஎல்லா கோர்ஸ்களுக்கும் Live Client Projects + Certificate கிடைக்கும்!";
      }
      return "CADPOINT Salem offers 120+ industry-accredited programs across 6 core departments:\n\n1. 🏗️ Civil & Architectural CADD / BIM (AutoCAD, Revit Architecture, STAAD Pro, ETABS, Tekla)\n2. 💻 IT & Software Engineering (Python, Java Full Stack, MERN, Data Science & AI, Cloud & DevOps)\n3. ⚙️ Mechanical & Aeronautical Design (SolidWorks, CATIA V5, Creo Parametric, Ansys FEA/Fluent)\n4. ⚡ Electrical & Electronics Automation (AutoCAD Electrical, Revit MEP, EPLAN, ETAP, PLC & SCADA)\n5. 🎨 Multimedia & AR/VR (Adobe Photoshop, After Effects, Maya 3D, UI/UX Design)\n6. 📊 Accounting & ERP (Tally Prime with GST, Advanced Excel, SAP FICO S/4HANA)\n\nPrograms include 80% practical laboratory sessions and government-recognized ISO 9001:2008 certification!";
    }

    // Civil & BIM
    if (q.includes('civil') || q.includes('bim') || q.includes('autocad') || q.includes('revit') || q.includes('staad') || q.includes('etabs') || q.includes('tekla')) {
      return "🏗️ Civil & Architectural CADD / BIM at CADPOINT:\n\n- Certification & Master Diplomas in AutoCAD Civil 2D/3D, Revit Architecture, STAAD Pro CONNECT, ETABS, Tekla Steel Detailing, and 3ds Max / V-Ray.\n- Focuses on 2D structural drafting, 3D BIM parametric modeling, clash detection, and seismic load analysis.\n\nWould you like to book a free lab demo at our Salem CPS Tower branch?";
    }

    // IT & Programming
    if (q.includes('it') || q.includes('python') || q.includes('java') || q.includes('react') || q.includes('node') || q.includes('full stack') || q.includes('mern') || q.includes('data science') || q.includes('aws')) {
      return "💻 IT & Full Stack Development at CADPOINT:\n\n- Complete hands-on tracks in Python Full Stack (Django/React), Java Spring Boot Microservices, MERN Stack (MongoDB, Express, React, Node), Data Science & AI, and Cloud DevOps (AWS, Docker, Kubernetes).\n- Practical exposure to REST APIs, Git version control, deployment, and clean architecture.\n\nWhich software track are you most interested in?";
    }

    // Mechanical
    if (q.includes('mechanical') || q.includes('solidworks') || q.includes('catia') || q.includes('creo') || q.includes('ansys') || q.includes('cam') || q.includes('cnc')) {
      return "⚙️ Mechanical & Aeronautical CAD/CAM/CAE at CADPOINT:\n\n- Programs covering SolidWorks 3D Parametric, CATIA V5 Surface Modeling, Creo Parametric, Ansys Workbench FEA, Ansys Fluent CFD, and NX CAM / Mastercam CNC programming.\n- Master CAD/CAM design with GD&T tolerances and industrial component analysis.";
    }

    // Internships & Certification
    if (q.includes('internship') || q.includes('certificate') || q.includes('iso') || q.includes('placement') || q.includes('job')) {
      return "🏆 Internships & Government ISO Certification at CADPOINT:\n\n- Top performers receive Direct Internship Opportunities inside our company to work on live client production projects.\n- Every student receives an official ISO 9001:2008 Government Registered Certificate with a unique online QR verification link accepted globally by corporate recruiters!";
    }

    // Location & Contact Info
    if (q.includes('salem') || q.includes('location') || q.includes('where') || q.includes('address') || q.includes('contact') || q.includes('phone') || q.includes('number') || q.includes('email')) {
      return "📍 CADPOINT Salem Head Office:\n1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem - 636007, Tamil Nadu, India.\n\n📞 Helpline: (+91) 95666 79928\n✉️ Official Email: cadpointsalem001@gmail.com\n⏰ Office Hours: Monday – Saturday (9:00 AM – 7:00 PM)\n\nFlexible Morning, Evening, and Weekend batches available!";
    }

    // ===================================================
    // 3. GENERAL AI & TECHNICAL TUTOR CAPABILITIES
    // ===================================================
    // Python code / concept
    if (q.includes('python code') || q.includes('python list') || q.includes('what is python') || q.includes('dict') || q.includes('def ')) {
      return "🐍 Python Technical Guide:\nPython is a high-level, interpreted programming language known for clean syntax. Key features:\n- Easy data structures (Lists, Dicts, Tuples, Sets)\n- Dynamic typing & automatic memory management\n- Massive ecosystem for Web (Django/Flask) and AI (NumPy, Pandas, TensorFlow)\n\nExample List Comprehension:\n`squared = [x**2 for x in range(10)]`\n\nAt CADPOINT, we teach Python from fundamentals to advanced web & AI applications!";
    }

    // React / Web Dev
    if (q.includes('react') || q.includes('state') || q.includes('props') || q.includes('hook') || q.includes('jsx')) {
      return "⚛️ React Framework Guide:\nReact is a component-based UI library developed by Meta. Key concepts:\n- JSX: HTML-like syntax inside JavaScript\n- State (`useState`): Local reactive data storage\n- Props: Passing parameters from parent to child components\n- Hooks (`useEffect`, `useMemo`): Managing side-effects & performance\n\nCADPOINT covers React 19, Tailwind CSS, REST API integration, and full-stack deployment!";
    }

    // Resume / Career Advice
    if (q.includes('resume') || q.includes('interview') || q.includes('career') || q.includes('prepare') || q.includes('fresher')) {
      return "💼 Career & Interview Preparation Tips:\n1. Tailor your resume to highlight practical projects rather than just theoretical subjects.\n2. Include GitHub / portfolio links for code & CAD drawing samples.\n3. Master core software fundamentals (AutoCAD / Python / Tally / SolidWorks).\n4. Practice mock technical interviews and explain project architecture clearly.\n\nOur CADPOINT counselors provide resume building and interview guidance for all enrolled students!";
    }

    // General Greeting / Chit-Chat
    if (q.includes('hi') || q.includes('hello') || q.includes('hey') || q.includes('good morning') || q.includes('good evening') || q.includes('vanakkam')) {
      if (isTanglish) {
        return "Hello Machi! CADPOINT AI Assistant தயாராக இருக்குடா. உனக்கு Courses, Coding, CAD Design பத்தி எந்த சந்தேகமும் கேக்கலாம்! 🚀";
      }
      if (isTamil) {
        return "வணக்கம்! CADPOINT தமிழ் AI உதவியாளருக்கு நல்வரவு. படிப்புகள், சான்றிதழ்கள், வகுப்புகள் பற்றி என்ன தெரிந்து கொள்ள வேண்டும்?";
      }
      return "Hello there! 👋 I am your CADPOINT Hybrid AI Assistant. Feel free to ask me anything about our CAD/IT courses, software coding concepts, or request an official counselor call!";
    }

    // Dynamic Intelligent Fallback (Never says "I don't know")
    if (isTanglish) {
      return `Machi, நீ கேட்ட "${rawQuery}" விஷயத்த பத்தி நான் உனக்கு கத்துத்தரத் தயார்! CADPOINT-ல இதோட Complete Practical Training இருக்குடா. உனக்கு இத பத்தி ஆலோசகர் பேசணும்னா கீழே பெயர் & நம்பர் குடு, உடனே பேச வைக்குறேன்! 🚀`;
    }
    if (isTamil) {
      return `நீங்கள் கேட்ட "${rawQuery}" குறித்த தகவல்களுக்கு CADPOINT-ல் சிறந்த நிபுணத்துவப் பயிற்சி உள்ளது. மேலும் விவரங்களை எங்களின் ஆலோசகர் தொலைபேசி வழியே விளக்க, உங்கள் தொடர்பை கீழே பகிரலாம்!`;
    }

    return `That is a great technical question regarding "${rawQuery}"! As your CADPOINT AI Assistant, I can confirm that our courses and practical labs cover this domain thoroughly with hands-on exercises.\n\nWould you like me to connect you with our CADPOINT Salem Subject Matter Expert for a detailed discussion?`;
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
      const botResponse = processQuery(query);
      const botMsg = {
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleLeadSubmit = async (e) => {
    e.preventDefault();
    if (!leadData.name || !leadData.phone) return;

    try {
      await submitEnquiry({
        name: leadData.name,
        phone: leadData.phone,
        email: 'chatbot-lead@cadpoint.com',
        subject: `AI Chatbot Callback Lead (${leadData.course})`,
        message: `Student ${leadData.name} requested callback via Hybrid AI Chatbot for ${leadData.course}. Phone: ${leadData.phone}`
      });
      setLeadSubmitted(true);
      
      const confirmMsg = {
        sender: 'bot',
        text: `🎉 Thank you ${leadData.name}! Your callback request has been submitted to CADPOINT Salem Admissions Team.\n\nOur counselor will call you at ${leadData.phone} shortly!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, confirmMsg]);
    } catch (err) {
      setLeadSubmitted(true);
    }
  };

  return (
    <>
      {/* FLOATING AI CHATBOT TRIGGER BUTTON */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-red-600 via-red-700 to-slate-900 text-white flex items-center justify-center shadow-2xl shadow-red-950/50 hover:shadow-red-900/70 border border-red-500/40 cursor-pointer group backdrop-blur-md"
        aria-label="Open CADPOINT Hybrid AI Assistant"
        title="CADPOINT Hybrid AI Assistant & Counselor"
      >
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

      {/* AI CHATBOT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-40 right-4 sm:right-6 z-[100] w-[calc(100vw-2rem)] sm:w-[390px] h-[540px] rounded-3xl glass-panel border border-red-500/40 shadow-2xl overflow-hidden flex flex-col bg-[#070b18]/95 backdrop-blur-xl"
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
                    CADPOINT Hybrid AI
                    <Sparkles className="w-3.5 h-3.5 text-red-400" />
                  </h4>
                  <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                    <Globe className="w-3 h-3" /> EN • தமிழ் • Tanglish AI
                  </span>
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
                    className={`max-w-[82%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed shadow-sm ${
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

              {/* In-Chat Lead Form Trigger */}
              {leadMode && !leadSubmitted && (
                <div className="p-4 rounded-2xl glass-card border border-red-500/40 space-y-3 bg-red-950/20">
                  <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-red-400" /> Request Free Counselor Callback
                  </h5>
                  <form onSubmit={handleLeadSubmit} className="space-y-2.5">
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={leadData.name}
                      onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number *"
                      value={leadData.phone}
                      onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs"
                    />
                    <select
                      value={leadData.course}
                      onChange={(e) => setLeadData({ ...leadData, course: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-[#111827]"
                    >
                      <option value="IT & Full Stack">IT & Full Stack Development</option>
                      <option value="Civil & Architecture CADD">Civil & Architecture CADD</option>
                      <option value="Mechanical Design">Mechanical Design</option>
                      <option value="Electrical Automation">Electrical Automation</option>
                      <option value="Multimedia & UI/UX">Multimedia & UI/UX</option>
                      <option value="Tally & Accounting">Tally & Accounting</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-red-600 to-slate-900 text-white font-bold text-xs hover:opacity-90 transition-opacity cursor-pointer border border-red-500/30"
                    >
                      Submit Callback Request
                    </button>
                  </form>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="p-2 border-t border-white/10 overflow-x-auto flex gap-1.5 no-scrollbar bg-white/[0.02]">
              {SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (sug.includes('Callback')) {
                      setLeadMode(true);
                      handleSend(sug);
                    } else {
                      handleSend(sug);
                    }
                  }}
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
                placeholder="Ask anything (EN / தமிழ் / Tanglish)..."
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
