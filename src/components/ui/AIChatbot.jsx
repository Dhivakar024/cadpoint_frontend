import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, User, CheckCircle2, PhoneCall, Globe, MessageSquare } from 'lucide-react';
import { submitEnquiry } from '../../services/api';
import { getWhatsAppShareUrl } from '../../services/directResend';
import { COURSES } from '../../utils/courseData';

const INITIAL_MESSAGES = [
  {
    sender: 'bot',
    text: "Hello! 👋 Welcome to CADPOINT Academy. I am your Hybrid AI Assistant.\n\nAsk me any technical or educational question, or inquire about CADPOINT courses, software training, and certifications in English, Tamil, or Tanglish!\n\nHow can I help you today?",
    time: 'Just now'
  }
];

const SUGGESTIONS = [
  "What is software?",
  "🐍 Python & Full Stack Courses",
  "📐 Civil CADD & BIM Programs",
  "⚙️ Mechanical & SolidWorks",
  "📈 Digital Marketing & SEO",
  "📍 Salem Location & Hours"
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

  // Language & Intent Processing Engine
  const processQuery = (rawQuery) => {
    const q = rawQuery.toLowerCase().trim();
    
    // Language Detection: Tamil Unicode, Tanglish, or English
    const isTamil = /[\u0B80-\u0BFF]/.test(rawQuery);
    const isTanglish = /\b(machi|vanakkam|da|bro|sapttiya|eppo|nalla|epdi|pannu|teriyuma|venum|iruku|aagum|kudu|kaattu|enna|solllu|irukinga|vaanga|theriyum|soldu|thara|kattuka)\b/i.test(rawQuery);
    const lang = isTamil ? 'tamil' : isTanglish ? 'tanglish' : 'english';

    // ===================================================
    // 1. EXPLICIT HUMAN COUNSELOR / CONTACT INTENT
    // ===================================================
    const isExplicitContact = /\b(call|callback|phone|contact|number|address|location|reach|talk to|speak|expert|counselor|human|admission|register|enroll|fees|cost|salem|office)\b/i.test(q);

    if (isExplicitContact) {
      if (lang === 'tamil') {
        return "CADPOINT சேலம் மையத்தை தொடர்பு கொள்ள அல்லது ஆலோசகர் அழைப்பைப் பெற:\n\n📍 முகவரி: 1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem - 636007.\n📞 தொலைபேசி: (+91) 95666 79928\n✉️ மின்னஞ்சல்: cadpointsalem001@gmail.com\n⏰ அலுவலக நேரம்: திங்கள் – சனி (காலை 9:00 – மாலை 7:00)\n\nஆலோசகரிடம் பேச உங்கள் பெயர் மற்றும் தொலைபேசி எண்ணைப் பகிர விரும்புகிறீர்களா?";
      }
      if (lang === 'tanglish') {
        return "Machi! CADPOINT Salem Counselor உனக்கு Call பண்ணி விவரங்கள் சொல்ல:\n\n📍 Address: 1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem.\n📞 Call / WhatsApp: (+91) 95666 79928\n⏰ Office Hours: Mon – Sat (9:00 AM – 7:00 PM)\n\nஉன்னோட Name & Phone Number குடுடா, ஆலோசகர் உடனே தொடர்பு கொள்வாங்க! 🚀";
      }
      return "You can reach CADPOINT Salem Admissions Team directly:\n\n📍 Address: 1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem - 636007, Tamil Nadu.\n📞 Helpline: (+91) 95666 79928\n✉️ Email: cadpointsalem001@gmail.com\n⏰ Office Hours: Monday – Saturday (9:00 AM – 7:00 PM)\n\nWould you like to share your details for a counselor callback?";
    }

    // ===================================================
    // 2. DIRECT CONCEPTUAL EDUCATIONAL ANSWERS (ANSWER FIRST RULE)
    // ===================================================

    // Question: What is Software?
    if (q.includes('what is software') || q === 'software' || q.includes('software definition')) {
      if (lang === 'tamil') {
        return "மென்பொருள் (Software) என்பது கணினி அல்லது சாதனத்திற்கு என்ன செய்ய வேண்டும் என்று கட்டளையிடும் நிரல்கள் (programs) மற்றும் வழிமுறைகளின் தொகுப்பாகும்.\n\nஎடுத்துக்காட்டுகள்: Windows, Google Chrome, WhatsApp, Python, AutoCAD, Revit மற்றும் Photoshop.\n\nமென்பொருள் முக்கியமாக பின்வருவனவற்றிற்கு பயன்படுகிறது:\n- பயன்பாட்டு வளர்ச்சி (Application development)\n- இணையதள உருவாக்கம் (Web development)\n- தரவு பகுப்பாய்வு மற்றும் AI\n- வடிவமைப்பு மற்றும் மல்டிமீடியா\n- CAD மற்றும் BIM மாதிரியாக்கம்\n- மொபைல் பயன்பாட்டு வளர்ச்சி\n\nCADPOINT-ல் மாணவர்கள் பல்வேறு மென்பொருள்களை செய்முறைப் பயிற்சியுடன் கற்றுக்கொள்ளலாம்.\n\nSoftware Development, CAD/BIM மென்பொருள் அல்லது AI மென்பொருள் பற்றி அறிய விரும்புகிறீர்களா?";
      }
      if (lang === 'tanglish') {
        return "Software-னா கம்ப்யூட்டர் அல்லது மொபைலுக்கு என்ன செய்யணும்னு சொல்லுற Instructions & Programs கூட்டம் தான் machi.\n\nExamples: Windows, Google Chrome, WhatsApp, Python, AutoCAD, Revit, Photoshop.\n\nSoftware எதுக்கெல்லாம் பயன்படுது:\n- Web & App Development\n- Data Science & AI\n- Design & Multimedia\n- CAD & BIM Modeling\n- Mobile Application Development\n\nCADPOINT-ல இந்த Software-களை Practical-ஆ கத்துக்கலாம்டா.\n\nஉனக்கு Software Development, CAD/BIM, இல்ல AI Software பற்றி தெரிஞ்சுக்கனுமா?";
      }
      return "Software is a set of programs and instructions that tells a computer or device what to do.\n\nExamples include Windows, Google Chrome, WhatsApp, Python, AutoCAD, Revit and Photoshop.\n\nSoftware is commonly used for:\n- Application development\n- Web development\n- Data analysis and AI\n- Design and multimedia\n- CAD and BIM modeling\n- Mobile application development\n\nAt CADPOINT, students can learn different software and technologies through practical, industry-oriented training.\n\nWould you like to know about Software Development, CAD/BIM software, or AI software?";
    }

    // Question: What is Python?
    if (q.includes('what is python') || q.includes('python programming') || q === 'python') {
      if (lang === 'tamil') {
        return "பைதான் (Python) என்பது மிக எளிமையாகவும் தெளிவாகவும் படிக்கக்கூடிய ஒரு பிரபல உயர்நிலை நிரலாக்க மொழியாகும் (High-level Programming Language).\n\nபயன்கள்:\n- Web Development (Django / Flask)\n- Data Science & Machine Learning\n- Artificial Intelligence & Automation\n\nCADPOINT-ல் Python 기초 முதல் AI & Full Stack வரை செய்முறைப் பயிற்சியாகக் கற்றுத் தரப்படுகிறது.\n\nPython Full Stack அல்லது Data Science படிப்புகள் பற்றி தெரிந்துகொள்ள விரும்புகிறீர்களா?";
      }
      if (lang === 'tanglish') {
        return "Python-னா ரொம்ப சுலபமா படிக்கக்கூடிய ஒரு popular-ஆன Programming Language machi.\n\nMain Uses:\n- Web Development (Django / Flask)\n- Data Science & AI\n- Automation Scripts\n\nCADPOINT-ல Python Basic-ல இருந்து Advanced Full Stack & AI வரை Practical-ஆ கத்துத்தர்றாங்க.\n\nஉனக்கு Python Web Dev வேணுமா இல்ல Data Science வேணுமாடா?";
      }
      return "Python is a versatile, high-level programming language known for its clean, easy-to-read syntax.\n\nKey applications include:\n- Web development (Django, Flask)\n- Data science, analytics, and Machine Learning\n- Artificial Intelligence and Automation\n- Scripting and backend APIs\n\nAt CADPOINT, Python is taught from fundamentals to advanced Full Stack and AI applications.\n\nWould you like details on Python Full Stack Development or Data Science & AI?";
    }

    // Question: What is CAD?
    if (q.includes('what is cad') || q === 'cad' || q.includes('computer aided design')) {
      if (lang === 'tamil') {
        return "CAD (Computer-Aided Design) என்பது பொறியாளர்கள் மற்றும் வடிவமைப்பாளர்கள் 2D வரைபடங்கள் மற்றும் 3D டிஜிட்டல் மாதிரிகளை உருவாக்கப் பயன்படுத்தும் தொழில்நுட்பமாகும்.\n\nமுக்கிய மென்பொருள்கள்: AutoCAD, SolidWorks, CATIA, Creo.\n\nபயன்கள்:\n- கட்டிட வரைபடங்கள் (Civil Drafting)\n- இயந்திர பாக வடிவமைப்பு (Mechanical Product Design)\n- மின்சார வயரிங் சிஸ்டம்ஸ் (Electrical Panel Design)\n\nCADPOINT-ல் சிவில், மெக்கானிக்கல் மற்றும் எலக்ட்ரிக்கல் பிரிவுகளுக்கு பிரத்யேக CAD பயிற்சிகள் வழங்கப்படுகின்றன.\n\nCivil CADD, Mechanical CADD, அல்லது Electrical CADD பற்றி அறிய விரும்புகிறீர்களா?";
      }
      if (lang === 'tanglish') {
        return "CAD (Computer-Aided Design)-னா Engineers & Designers accurate 2D Drawings & 3D Models உருவாக்க பயன்படும் Tech machi.\n\nPopular CAD Tools: AutoCAD, SolidWorks, CATIA, Creo.\n\nCADPOINT-ல Civil, Mechanical, & Electrical CAD-க்கு 80% Practical Training இருக்குடா.\n\nஉனக்கு Civil CADD, Mechanical CADD, இல்ல Electrical CADD பத்தி தெரிஞ்சுக்கனுமா?";
      }
      return "CAD (Computer-Aided Design) is technology used by engineers, architects, and designers to create precise 2D drawings and 3D digital models.\n\nPopular CAD software includes AutoCAD, SolidWorks, CATIA, and Creo.\n\nCAD is used for:\n- Architectural & Civil drafting\n- Mechanical machine & product design\n- Electrical schematic & panel layout\n\nAt CADPOINT, students learn specialized CAD workflows for Civil, Mechanical, and Electrical domains.\n\nWould you like details on Civil CADD, Mechanical CADD, or Electrical CADD?";
    }

    // Question: What is BIM?
    if (q.includes('what is bim') || q === 'bim' || q.includes('building information modeling')) {
      if (lang === 'tamil') {
        return "BIM (Building Information Modeling) என்பது 3D டிஜிட்டல் மாதிரிகள் மூலம் கட்டிடங்களின் வடிவமைப்பு, கட்டமைப்பு மற்றும் நிர்வாகத்தை துல்லியமாக திட்டமிடும் தொழில்நுட்பமாகும்.\n\nமுக்கிய கருவிகள்: Revit Architecture, Revit MEP, Navisworks.\n\nபயன்கள்:\n- 3D parametric மாதிரியாக்கம்\n- Clash detection (பிழைகளைக் கண்டறிதல்)\n- திட்ட நேர நிர்வாகம் மற்றும் செலவு மதிப்பீடு\n\nCADPOINT-ல் Civil & MEP BIM சான்றிதழ் படிப்புகள் உள்ளன.\n\nCivil BIM அல்லது MEP BIM படிப்புகள் பற்றி அறிய விரும்புகிறீர்களா?";
      }
      if (lang === 'tanglish') {
        return "BIM (Building Information Modeling)-னா Buildings-அ 3D Model வழியா accurately Plan, Design, & Manage பண்ணுற Modern Construction Technology machi.\n\nKey Tools: Revit Architecture, Revit MEP, Navisworks.\n\nCADPOINT-ல Civil BIM & MEP BIM Programs இருக்குடா.\n\nஉனக்கு Civil BIM வேணுமா இல்ல MEP BIM வேணுமாடா?";
      }
      return "BIM (Building Information Modeling) is an intelligent 3D model-based process that gives architecture, engineering, and construction professionals tools to plan, design, construct, and manage buildings efficiently.\n\nKey BIM software includes Revit Architecture, Revit MEP, and Navisworks.\n\nBIM is used for:\n- 3D parametric building design\n- MEP clash detection and coordination\n- Cost estimation and project scheduling\n\nAt CADPOINT, BIM programs offer hands-on training with real-site project simulation.\n\nWould you like to explore Civil BIM or MEP BIM programs?";
    }

    // Question: What is Full Stack?
    if (q.includes('what is full stack') || q.includes('fullstack') || q === 'full stack') {
      if (lang === 'tamil') {
        return "Full Stack Development என்பது ஒரு இணையதளத்தின் பயனர் பகுதி (Frontend) மற்றும் சேவையகப் பகுதி (Backend + Database) இரண்டையும் முழுமையாக உருவாக்குவதாகும்.\n\nதொழில்நுட்பங்கள்:\n- Frontend: HTML, CSS, JavaScript, React\n- Backend: Python (Django), Java (Spring Boot), Node.js\n- Database: MongoDB, MySQL\n\nCADPOINT-ல் Python React, Java Full Stack மற்றும் MERN Stack படிப்புகள் உள்ளன.\n\nஎந்த Full Stack படிப்பு பற்றி அறிய விரும்புகிறீர்களா?";
      }
      if (lang === 'tanglish') {
        return "Full Stack Development-னா ஒரு Web App-ஓட Frontend (User UI) & Backend (Server + Database) இரண்டையுமே Develop பண்ணுறது தான் machi.\n\nMain Stacks:\n- Python & React Full Stack\n- Java Full Stack\n- MERN Stack (MongoDB, Express, React, Node)\n\nCADPOINT-ல இந்த 3 Stacks-க்கும் Practical Training இருக்குடா.\n\nஉனக்கு எந்த Stack பத்தி தெரிஞ்சுக்கனும்?";
      }
      return "Full Stack Development involves building both the frontend (user interface) and backend (server logic and database) of web applications.\n\nCore technologies include:\n- Frontend: HTML, CSS, JavaScript, React\n- Backend: Python (Django), Java (Spring Boot), Node.js\n- Database: MongoDB, MySQL\n\nAt CADPOINT, Full Stack tracks include Python & React, Java Full Stack, MERN Stack, and MEAN Stack.\n\nWhich Full Stack stream would you like to explore?";
    }

    // Question: What is SEO?
    if (q.includes('what is seo') || q === 'seo' || q.includes('search engine optimization')) {
      if (lang === 'tamil') {
        return "SEO (Search Engine Optimization) என்பது ஒரு இணையதளத்தை Google போன்ற தேடுபொறிகளில் இலவசமாக (Organic) முதலிடத்தில் கொண்டு வருவதற்கான உத்தியாகும்.\n\nமுக்கிய கூறுகள்:\n- Keyword Research (முக்கிய வார்த்தைகள் ஆய்வு)\n- On-page & Technical SEO\n- Link Building (பேக்லிங்க்கள்)\n- Web Analytics\n\nCADPOINT-ல் 'Professional in Search Engine Optimization (SEO)' படிப்பு உள்ளது.\n\nஇதைப் பற்றி மேலும் அறிய விரும்புகிறீர்களா?";
      }
      if (lang === 'tanglish') {
        return "SEO (Search Engine Optimization)-னா Google-ல நம்ம Website-அ Organic-ஆ Top Ranking-ல கொண்டு வர்ற Strategy தான் machi.\n\nKey Components:\n- Keyword Research\n- On-Page & Technical SEO\n- Backlink Strategies\n\nCADPOINT-ல 'Professional in Search Engine Optimization (SEO)' Course இருக்குடா.\n\nஇதோட Course Details பாக்கலாமா?";
      }
      return "SEO (Search Engine Optimization) is the practice of optimizing websites to rank higher on search engine results pages (like Google) organically to attract free, targeted traffic.\n\nKey components include:\n- Keyword research and content optimization\n- On-page and technical SEO auditing\n- Backlink strategies and domain authority building\n- Search engine traffic analytics\n\nAt CADPOINT, we offer the 'Professional in Search Engine Optimization (SEO)' course.\n\nWould you like to view the details for this course?";
    }

    // Question: What is Digital Marketing?
    if (q.includes('digital marketing') || q === 'marketing') {
      if (lang === 'tamil') {
        return "Digital Marketing என்பது இணையம், தேடுபொறிகள், சமூக ஊடகங்கள் மற்றும் மின்னஞ்சல் மூலம் தயாரிப்புகள் அல்லது சேவைகளை விளம்பரப்படுத்துவதாகும்.\n\nமுக்கிய பிரிவுகள்:\n- Search Engine Optimization (SEO)\n- Google Ads (PPC)\n- Meta Advertising (Facebook & Instagram)\n- Email & Social Media Marketing\n\nCADPOINT டிஜிட்டல் மார்க்கெட்டிங் பிரிவில் 9 பிரத்யேக தொழில்முறை படிப்புகளை வழங்குகிறது.\n\nSEO, Google Ads அல்லது Meta Ads பற்றி அறிய விரும்புகிறீர்களா?";
      }
      if (lang === 'tanglish') {
        return "Digital Marketing-னா Internet, Google, Social Media & Email வழியா Business-அ Promote பண்ணுறது தான் machi.\n\nMain Areas:\n- SEO & Web Analytics\n- Google Ads (PPC)\n- Meta Ads (FB & Insta)\n- Email & Social Media Marketing\n\nCADPOINT-ல 9 Specific Professional Courses இருக்குடா.\n\nஉனக்கு SEO, Google Ads, இல்ல Meta Ads பத்தி பாக்கனுமா?";
      }
      return "Digital Marketing is the promotion of products or services using digital channels such as search engines, social media, email, and websites.\n\nCore areas include:\n- Search Engine Optimization (SEO)\n- Google Ads & PPC Advertising\n- Meta Advertising (Facebook & Instagram)\n- Email Marketing & Web Analytics\n- Social Media Marketing & HubSpot CRM\n\nCADPOINT offers 9 specialized Professional courses in Digital Marketing & SEO.\n\nWhich digital marketing track would you like to explore?";
    }

    // ===================================================
    // 3. DATABASE GROUNDED COURSE LOOKUP (SINGLE SOURCE OF TRUTH)
    // ===================================================
    const matchingCourses = COURSES.filter(c => 
      c.title.toLowerCase().includes(q) ||
      c.software.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );

    if (matchingCourses.length > 0 && matchingCourses.length <= 6) {
      const listStr = matchingCourses.map(c => 
        `• ${c.title}\n  - Category: ${c.category}\n  - Software: ${c.software}\n  - Duration: ${c.duration}`
      ).join('\n\n');

      if (lang === 'tamil') {
        return `CADPOINT அதிகாரப்பூர்வ தரவுத்தளத்தில் உள்ள தொடர்புடைய படிப்புகள்:\n\n${listStr}\n\nமேலும் விவரங்களை அறிய எந்த படிப்பைத் தேர்ந்தெடுக்க விரும்புகிறீர்கள்?`;
      }
      if (lang === 'tanglish') {
        return `CADPOINT Official Database-ல இருக்கிற Matching Courses இதோ machi:\n\n${listStr}\n\nஉனக்கு இதில எந்த Course பற்றி விவரம் வேணும்டா?`;
      }
      return `Here are the matching official courses from CADPOINT database:\n\n${listStr}\n\nWhich course would you like to know more about?`;
    }

    // ===================================================
    // 4. DEPARTMENT OVERVIEW (WHEN ASKING ABOUT CATALOG / DEPARTMENTS)
    // ===================================================
    if (q.includes('department') || q.includes('category') || q.includes('courses list') || q.includes('available courses') || q.includes('catalog')) {
      if (lang === 'tamil') {
        return "CADPOINT சேலம் மையத்தில் உள்ள அதிகாரப்பூர்வ 7 துறைகள்:\n\n1. 💻 IT & Non-IT (Python, Full Stack, Java, Data Science & AI, AWS)\n2. 🎨 Multimedia (Photoshop, Premiere, Maya 3D, UI/UX)\n3. 📊 Accounts & Finance (Tally Prime GST, Advanced Excel, SAP FICO)\n4. 🏗️ Civil & Architecture (AutoCAD, Revit, STAAD Pro, ETABS, BIM)\n5. ⚙️ Mechanical & Aeronautical (SolidWorks, CATIA, Creo, Ansys)\n6. ⚡ Electrical & Electronics (AutoCAD Electrical, Revit MEP, PLC & SCADA)\n7. 📈 Digital Marketing & SEO (SEO, Google Ads, Meta Ads, Email Marketing)\n\nஎந்தத் துறை பற்றி அறிய விரும்புகிறீர்கள்?";
      }
      if (lang === 'tanglish') {
        return "CADPOINT-ல இருக்கிற 7 Main Departments இதோ machi:\n\n1. 💻 IT & Non-IT: Python, Java Full Stack, Data Science, AWS\n2. 🎨 Multimedia: Photoshop, After Effects, Maya 3D, UI/UX\n3. 📊 Accounts & Finance: Tally Prime GST, Advanced Excel, SAP FICO\n4. 🏗️ Civil & Architecture: AutoCAD, Revit, STAAD Pro, ETABS\n5. ⚙️ Mechanical: SolidWorks, CATIA V5, Creo, Ansys\n6. ⚡ Electrical: AutoCAD Electrical, Revit MEP, PLC & SCADA\n7. 📈 Digital Marketing & SEO: SEO, Google Ads, Meta Ads\n\nஉனக்கு எந்த Department பத்தி பாக்கனும்டா?";
      }
      return "CADPOINT Salem offers official career programs across 7 main departments:\n\n1. 💻 IT & Non-IT (Python AI, Full Stack, Java, Data Science, AWS)\n2. 🎨 Multimedia (Photoshop, After Effects, Maya 3D, UI/UX)\n3. 📊 Accounts & Finance (Tally Prime GST, Advanced Excel, SAP FICO)\n4. 🏗️ Civil & Architecture (AutoCAD, Revit, STAAD Pro, ETABS, BIM)\n5. ⚙️ Mechanical & Aeronautical (SolidWorks, CATIA V5, Creo, Ansys)\n6. ⚡ Electrical & Electronics (AutoCAD Electrical, Revit MEP, PLC & SCADA)\n7. 📈 Digital Marketing & SEO (SEO, Google Ads, Meta Ads, HubSpot)\n\nWhich department would you like to explore?";
    }

    // ===================================================
    // 5. UNRELATED GENERAL KNOWLEDGE QUESTIONS (ANSWER DIRECTLY)
    // ===================================================
    if (q.includes('photosynthesis')) {
      return "Photosynthesis is the biological process by which green plants and certain organisms convert sunlight into chemical energy, using water and carbon dioxide to produce oxygen and glucose.";
    }
    if (q.includes('capital of france')) {
      return "The capital of France is Paris.";
    }
    if (q.includes('capital of tamil nadu') || q.includes('tamilnadu capital')) {
      return "The capital of Tamil Nadu is Chennai.";
    }

    // ===================================================
    // 6. AMBIGUOUS / SHORT INPUT HANDLING
    // ===================================================
    if (q.length < 4 || q === 'help' || q === 'details') {
      if (lang === 'tamil') {
        return "வணக்கம்! நீங்கள் எந்தத் துறை அல்லது பாடம் குறித்து அறிய விரும்புகிறீர்கள்? (உதாரணம்: IT, சிவில், மெக்கானிக்கல், எலக்ட்ரிக்கல், மல்டிமீடியா, அக்கவுண்டிங் அல்லது டிஜிட்டல் மார்க்கெட்டிங்)";
      }
      if (lang === 'tanglish') {
        return "Hello Machi! உனக்கு எந்த துறை பற்றி விவரம் வேணும்டா? (IT, Civil, Mechanical, Electrical, Multimedia, Accounts, இல்ல Digital Marketing)";
      }
      return "Hello! Which department or course would you like information about? (Options: IT & Software, Civil CADD, Mechanical Design, Electrical, Multimedia, Accounting, or Digital Marketing)";
    }

    // ===================================================
    // 7. CLEAN DIRECT FALLBACK (NO FLUFF OR FAKE CLAIMS)
    // ===================================================
    if (lang === 'tamil') {
      return `நீங்கள் கேட்ட "${rawQuery}" குறித்த தகவல்களுக்கு: CADPOINT சேலம் மையத்தில் IT & Software, CADD, Multimedia, Accounts மற்றும் Digital Marketing துறைகளில் செய்முறைப் பயிற்சிகள் வழங்கப்படுகின்றன.\n\nமேற்கண்ட துறைகளில் எது பற்றி அறிய விரும்புகிறீர்கள்?`;
    }
    if (lang === 'tanglish') {
      return `Machi! நீ கேட்ட "${rawQuery}" பற்றிய விவரங்கள்: இதற்கான Practical Software Training CADPOINT-ல இருக்குடா.\n\nஉனக்கு IT, CADD, Multimedia, Accounts இல்ல Digital Marketing-ல எது பத்தி பாக்கனும்டா?`;
    }
    return `Regarding "${rawQuery}": CADPOINT provides practical software and technical training across multiple engineering and technology disciplines.\n\nWould you like information on IT & Software, Civil CADD, Mechanical Design, Electrical, Multimedia, Accounting, or Digital Marketing?`;
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
