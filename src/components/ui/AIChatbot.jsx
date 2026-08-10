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
  const [lastTopic, setLastTopic] = useState(null);
  
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
    let q = rawQuery.toLowerCase().trim();
    
    // Language & Tone Detection
    const isTamil = /[\u0B80-\u0BFF]/.test(rawQuery);
    const isTanglish = /\b(machi|vanakkam|da|bro|sapttiya|eppo|nalla|epdi|pannu|teriyuma|venum|iruku|aagum|kudu|kaattu|enna|solllu|irukinga|vaanga|theriyum|soldu|thara|kattuka|idha|panradhu)\b/i.test(rawQuery);
    const usesMachi = /\b(machi|da)\b/i.test(rawQuery);
    const lang = isTamil ? 'tamil' : isTanglish ? 'tanglish' : 'english';

    // ===================================================
    // RULE 9: CONVERSATION CONTEXT MEMORY
    // Detect context references ("idha", "this", "it", "that", "learn this", "courses for this")
    // ===================================================
    const isContextualFollowup = /\b(idha|this|it|that|for this|learn this|learn panna|course for this|courses for this)\b/i.test(q);

    if (isContextualFollowup && lastTopic) {
      q = `${lastTopic} courses`;
    }

    // ===================================================
    // 1. EXPLICIT HUMAN COUNSELOR / CONTACT REDIRECTION (RULE 8)
    // Only suggest human contact when explicitly requested
    // ===================================================
    const isExplicitContact = /\b(call|callback|phone|contact|number|address|location|reach|talk to|speak|expert|counselor|human|admission|register|enroll|fees|cost|salem|office)\b/i.test(q);

    if (isExplicitContact) {
      if (lang === 'tamil') {
        return "CADPOINT சேலம் மையத்தை தொடர்பு கொள்ள அல்லது ஆலோசகர் அழைப்பைப் பெற:\n\n📍 முகவரி: 1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem - 636007.\n📞 தொலைபேசி: (+91) 95666 79928\n✉️ மின்னஞ்சல்: cadpointsalem001@gmail.com\n⏰ அலுவலக நேரம்: திங்கள் – சனி (காலை 9:00 – மாலை 7:00)\n\nஆலோசகரிடம் பேச உங்கள் பெயர் மற்றும் தொலைபேசி எண்ணைப் பகிர விரும்புகிறீர்களா?";
      }
      if (lang === 'tanglish') {
        const greeting = usesMachi ? "Machi! " : "";
        return `${greeting}CADPOINT Salem Counselor உனக்கு Call பண்ணி விவரங்கள் சொல்ல:\n\n📍 Address: 1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem.\n📞 Call / WhatsApp: (+91) 95666 79928\n⏰ Office Hours: Mon – Sat (9:00 AM – 7:00 PM)\n\nஉன்னோட Name & Phone Number குடுத்தா, ஆலோசகர் உடனே தொடர்பு கொள்வாங்க! 🚀`;
      }
      return "You can reach CADPOINT Salem Admissions Team directly:\n\n📍 Address: 1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem - 636007, Tamil Nadu.\n📞 Helpline: (+91) 95666 79928\n✉️ Email: cadpointsalem001@gmail.com\n⏰ Office Hours: Monday – Saturday (9:00 AM – 7:00 PM)\n\nWould you like to share your details for a counselor callback?";
    }

    // ===================================================
    // 2. DIRECT CONCEPTUAL EDUCATIONAL ANSWERS (RULES 1, 2, 4, 7, 10, 13)
    // Priority: 1. Answer Directly -> 2. Explain -> 3. Example -> 4. Connect CADPOINT only if relevant -> 5. Specific Follow-Up
    // ===================================================

    // Question: Python (Rule 2)
    if (q.includes('what is python') || q.includes('python programming') || q === 'python' || q.includes('python enna') || q.includes('meaning of python') || q.includes('python na enna')) {
      setLastTopic('python');
      if (lang === 'tanglish') {
        const daSuffix = usesMachi ? " da" : "";
        return `Python na oru high-level programming language${daSuffix}. 🐍\n\nIdha Web Development, AI & Machine Learning, Data Science, Automation and Software Development-ku use pannuvanga.\n\nSimple-aa sonna, computer-ku instructions kudukka Python use pannuvom.\n\nExample:\nprint('Hello World')\n\nIdhu screen-la Hello World nu print pannum.\n\nIf you're interested in learning Python, CADPOINT's relevant Python/full-stack/AI courses can be shown.\n\nUnakku Python basics mattum venuma, illa AI/Data Science side-la Python use panradhu theriyanuma?`;
      }
      if (lang === 'tamil') {
        return "பைதான் (Python) என்பது மிக எளிமையாகவும் தெளிவாகவும் படிக்கக்கூடிய ஒரு பிரபல உயர்நிலை நிரலாக்க மொழியாகும் (High-level Programming Language). 🐍\n\nபயன்கள்:\n- Web Development (Django / Flask)\n- Data Science & Machine Learning\n- Artificial Intelligence & Automation\n- Software Engineering\n\nஉதாரணம்:\nprint('Hello World')\n\nஇது திரையில் Hello World என்று அச்சிடும்.\n\nநீங்கள் பைதான் கற்க விரும்பினால், CADPOINT-ன் தொடர்புடைய Python / Full Stack / AI பயிற்சிகளைக் காணலாம்.\n\nஉங்களுக்கு Python அடிப்படைகள் மட்டும் போதுமா அல்லது AI/Data Science பிரிவில் படிக்க விரும்புகிறீர்களா?";
      }
      return "Python is a versatile, high-level programming language known for its clean, easy-to-read syntax. 🐍\n\nIt is widely used for:\n- Web Development (Django, Flask)\n- Artificial Intelligence & Machine Learning\n- Data Science & Analytics\n- Automation scripts and software engineering\n\nExample:\nprint('Hello World')\n\nThis simple line prints 'Hello World' to the screen.\n\nIf you're interested in learning Python, CADPOINT's relevant Python/full-stack/AI courses can be shown.\n\nAre you interested in Python for web development or Data Science & AI?";
    }

    // Question: Software (Rule 1)
    if (q.includes('what is software') || q === 'software' || q.includes('software definition')) {
      setLastTopic('software');
      if (lang === 'tanglish') {
        const daSuffix = usesMachi ? " machi" : "";
        return `Software-னா கம்ப்யூட்டர் அல்லது மொபைலுக்கு என்ன செய்யணும்னு சொல்லுற Instructions & Programs கூட்டம் தான்${daSuffix}.\n\nFor example, Windows, Chrome, WhatsApp, Python, AutoCAD, Revit and Photoshop are software.\n\nSoftware எதுக்கெல்லாம் பயன்படுது:\n- Application development\n- Web development\n- Data analysis and AI\n- Design and multimedia\n- CAD and BIM modeling\n- Mobile application development\n\nAt CADPOINT, students can learn different software and technologies through practical training.\n\nUnakku Software Development, CAD/BIM software, இல்ல AI software பற்றி தெரிஞ்சுக்கனுமா?`;
      }
      if (lang === 'tamil') {
        return "மென்பொருள் (Software) என்பது கணினி அல்லது சாதனத்திற்கு என்ன செய்ய வேண்டும் என்று கட்டளையிடும் நிரல்கள் (programs) மற்றும் வழிமுறைகளின் தொகுப்பாகும்.\n\nஎடுத்துக்காட்டுகள்: Windows, Google Chrome, WhatsApp, Python, AutoCAD, Revit மற்றும் Photoshop.\n\nமென்பொருள் முக்கியமாக பின்வருவனவற்றிற்கு பயன்படுகிறது:\n- பயன்பாட்டு வளர்ச்சி (Application development)\n- இணையதள உருவாக்கம் (Web development)\n- தரவு பகுப்பாய்வு மற்றும் AI\n- வடிவமைப்பு மற்றும் மல்டிமீடியா\n- CAD மற்றும் BIM மாதிரியாக்கம்\n- மொபைல் பயன்பாட்டு வளர்ச்சி\n\nCADPOINT-ல் மாணவர்கள் பல்வேறு மென்பொருள்களை செய்முறைப் பயிற்சியுடன் கற்றுக்கொள்ளலாம்.\n\nSoftware Development, CAD/BIM மென்பொருள் அல்லது AI மென்பொருள் பற்றி அறிய விரும்புகிறீர்களா?";
      }
      return "Software is a set of programs and instructions that tells a computer what to do.\n\nFor example, Windows, Chrome, WhatsApp, Python, AutoCAD, Revit and Photoshop are software.\n\nSoftware is commonly used for:\n- Application development\n- Web development\n- Data analysis and AI\n- Design and multimedia\n- CAD and BIM modeling\n- Mobile application development\n\nAt CADPOINT, students can learn different software and technologies through practical training.\n\nWould you like to know about Software Development, CAD/BIM software, or AI software?";
    }

    // Question: HTML
    if (q.includes('what is html') || q === 'html' || q.includes('html definition')) {
      setLastTopic('html');
      if (lang === 'tanglish') {
        const daSuffix = usesMachi ? " da" : "";
        return `HTML (HyperText Markup Language)-னா Websites-ோட Basic Structure-அ உருவாக்க பயன்படும் Standard Markup Language${daSuffix}.\n\nWeb page-ல இருக்கிற Headings, Paragraphs, Images, Links, & Buttons எல்லாமே HTML மூலமா தான் Structure பண்ணுவோம்.\n\nExample:\n<h1>Hello World</h1>\n\nIdhu Web Page-ல ஒரு பெரிய Heading-ஆ Display ஆகும்.\n\nIf you're interested in web design, CADPOINT offers Web Designing & Full Stack Development tracks.\n\nUnakku HTML & Web Design basics பத்தி பாக்கனுமா, இல்ல Full Stack Development வேணுமா?`;
      }
      if (lang === 'tamil') {
        return "HTML (HyperText Markup Language) என்பது இணையதளங்களின் அடிப்படை கட்டமைப்பை (Structure) உருவாக்க பயன்படும் நிலையான மொழியாகும்.\n\nஇணைய பக்கத்தில் உள்ள தலைப்புகள் (Headings), பத்திகள் (Paragraphs), படங்கள், இணைப்புகள் மற்றும் பொத்தான்கள் அனைத்தும் HTML மூலம் கட்டமைக்கப்படுகின்றன.\n\nஉதாரணம்:\n<h1>Hello World</h1>\n\nஇது இணைய பக்கத்தில் பெரிய தலைப்பாக அச்சிடும்.\n\nCADPOINT-ல் Web Designing & Full Stack Development பிரிவுகளில் HTML கற்பிக்கப்படுகிறது.\n\nஉங்களுக்கு Web Designing அல்லது Full Stack Development படிப்புகள் பற்றி தெரிய வேண்டுமா?";
      }
      return "HTML (HyperText Markup Language) is the standard markup language used to create the structure of web pages.\n\nIt defines elements like headings, paragraphs, images, links, forms, and buttons on a website.\n\nExample:\n<h1>Hello World</h1>\n\nThis line creates a prominent heading on a web page.\n\nAt CADPOINT, HTML is taught as part of Web Designing and Full Stack Development programs.\n\nWould you like to know about Web Designing or Full Stack Development courses?";
    }

    // Question: AutoCAD
    if (q.includes('what is autocad') || q === 'autocad') {
      setLastTopic('autocad');
      if (lang === 'tanglish') {
        const daSuffix = usesMachi ? " da" : "";
        return `AutoCAD-னா Architects & Engineers accurate-ஆ 2D Drawings & 3D Models உருவாக்க பயன்படும் Computer-Aided Design (CAD) Software${daSuffix}.\n\nCivil blueprints, Mechanical machine parts, Electrical panel layouts உருவாக்க AutoCAD தான் Industry Standard.\n\nExample: Building floor plan 2D layouts, structural drafting, mechanical component designs.\n\nCADPOINT-ல Civil, Mechanical, & Electrical AutoCAD-க்கு Practical Lab Training இருக்கு.\n\nUnakku Civil CADD, Mechanical CADD, இல்ல Electrical CADD பத்தி தெரிஞ்சுக்கனுமா?`;
      }
      if (lang === 'tamil') {
        return "AutoCAD என்பது கட்டிடக் கலைஞர்கள் மற்றும் பொறியாளர்கள் துல்லியமான 2D வரைபடங்கள் மற்றும் 3D மாதிரிகளை உருவாக்கப் பயன்படுத்தும் கணினி உதவி வடிவமைப்பு (CAD) மென்பொருளாகும்.\n\nஇது கட்டிட வரைபடங்கள் (floor plans), இயந்திர பாகங்கள் மற்றும் மின்சார வரைபடங்களை வரைவதற்கான உலகளாவிய தரநிலையாகும்.\n\nஎடுத்துக்காட்டு: 2D கட்டிட வரைபடம் வரைதல், இயந்திர பாக வரைபடம் தயாரித்தல்.\n\nCADPOINT-ல் சிவில், மெக்கானிக்கல் மற்றும் எலக்ட்ரிக்கல் பிரிவுகளுக்கு பிரத்யேக AutoCAD பயிற்சிகள் உள்ளன.\n\nCivil CADD, Mechanical CADD அல்லது Electrical CADD பற்றி அறிய விரும்புகிறீர்களா?";
      }
      return "AutoCAD is a Computer-Aided Design (CAD) software used by architects, engineers, and construction professionals to create precise 2D drawings and 3D models.\n\nIt is the industry standard for architectural blueprints, mechanical component drawings, and electrical schematics.\n\nExample: Drafting 2D building floor plans, structural details, and machine parts.\n\nAt CADPOINT, AutoCAD is taught across Civil, Mechanical, and Electrical design tracks.\n\nAre you interested in Civil CADD, Mechanical CADD, or Electrical CADD?";
    }

    // Question: Revit
    if (q.includes('what is revit') || q === 'revit') {
      setLastTopic('revit');
      if (lang === 'tanglish') {
        const daSuffix = usesMachi ? " da" : "";
        return `Revit-னா Buildings-அ 3D Model-ஆ Design பண்ண பயன்படும் Building Information Modeling (BIM) Software${daSuffix}.\n\n3D Plan-ல ஒரு சின்ன Change பண்ணினாலும் Elevation & Section Views தானாகவே Update ஆகிடும்.\n\nExample: Architectural 3D building modeling & MEP ductwork design.\n\nIf you want to learn Revit, CADPOINT offers Civil Revit Architecture & Revit MEP BIM courses.\n\nUnakku Revit Architecture வேணுமா இல்ல Revit MEP பத்தி பாக்கனுமா?`;
      }
      if (lang === 'tamil') {
        return "Revit என்பது 3D டிஜிட்டல் மாதிரிகள் மூலம் கட்டிடங்களை வடிவமைக்கப் பயன்படும் Building Information Modeling (BIM) மென்பொருளாகும்.\n\nவரைபடத்தில் மாற்றங்கள் செய்தால், Elevations மற்றும் 3D Views தானாகவே புதுப்பிக்கப்படும்.\n\nஎடுத்துக்காட்டு: முப்பரிமாண கட்டிட வடிவமைப்பு மற்றும் MEP குழாய் வடிவமைப்பு.\n\nCADPOINT-ல் Civil Revit Architecture மற்றும் Revit MEP BIM படிப்புகள் உள்ளன.\n\nRevit Architecture அல்லது Revit MEP பற்றி அறிய விரும்புகிறீர்களா?";
      }
      return "Revit is a 3D Building Information Modeling (BIM) software developed by Autodesk for architects, structural engineers, and MEP designers.\n\nIt allows professionals to model a building in 3D, automatically updating floor plans, elevations, and section views whenever changes are made.\n\nExample: Creating a complete 3D digital model of a building with structural elements.\n\nAt CADPOINT, Revit is taught in Civil BIM and MEP BIM programs.\n\nWould you like to explore Revit Architecture or Revit MEP?";
    }

    // Question: AI
    if (q.includes('what is ai') || q === 'ai' || q.includes('artificial intelligence')) {
      setLastTopic('ai');
      if (lang === 'tanglish') {
        const daSuffix = usesMachi ? " da" : "";
        return `AI (Artificial Intelligence)-னா மனிதர்கள் மாதிரியே யோசித்து, கத்துக்கிட்டு, Decisions எடுக்கக்கூடிய Computer Systems தான்${daSuffix}.\n\nExamples: ChatGPT, self-driving cars, image generators, recommendation algorithms.\n\nIdha Machine Learning algorithms & Python code வழியா Develop பண்ணுவாங்க.\n\nCADPOINT-ல Python Data Science & AI Programs இருக்கு.\n\nUnakku Python AI Programming பத்தி தெரிஞ்சுக்கனுமா, இல்ல AI Full Stack Development வேணுமா?`;
      }
      if (lang === 'tamil') {
        return "செயற்கை நுண்ணறிவு (Artificial Intelligence - AI) என்பது மனிதர்களின் கற்றல், சிந்தனை மற்றும் முடிவெடுக்கும் திறன்களை கணினி அமைப்புகள் மூலம் செயலாக்குவதாகும்.\n\nஎடுத்துக்காட்டுகள்: ChatGPT, தானியங்கி வாகனங்கள், குரல் உதவியாளர்கள்.\n\nஇவை Python மற்றும் Machine Learning வழிமுறைகள் மூலம் உருவாக்கப்படுகின்றன.\n\nCADPOINT-ல் Data Science & AI மற்றும் AI Full Stack படிப்புகள் உள்ளன.\n\nPython AI Programming அல்லது AI Full Stack பற்றி அறிய விரும்புகிறீர்களா?";
      }
      return "Artificial Intelligence (AI) refers to computer systems engineered to perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and learning.\n\nExamples include ChatGPT, recommendation engines, facial recognition, and autonomous systems.\n\nAI applications are primarily built using Python, Machine Learning algorithms, and neural networks.\n\nAt CADPOINT, AI concepts are integrated into Data Science & AI and Full Stack Development programs.\n\nAre you interested in Python for Data Science & AI or AI Full Stack applications?";
    }

    // Question: SEO
    if (q.includes('what is seo') || q === 'seo' || q.includes('search engine optimization')) {
      setLastTopic('seo');
      if (lang === 'tanglish') {
        const daSuffix = usesMachi ? " da" : "";
        return `SEO (Search Engine Optimization)-னா Google-ல நம்ம Website-அ Organic-ஆ Top Ranking-ல கொண்டு வர்ற Strategy தான்${daSuffix}.\n\nKey Components:\n- Keyword Research\n- On-Page & Technical SEO\n- Backlink Strategies & Web Analytics\n\nCADPOINT offers a dedicated 'Professional in Search Engine Optimization (SEO)' course.\n\nUnakku SEO Course details பாக்கனுமா, இல்ல Digital Marketing & Google Ads பத்தி பாக்கனுமா?`;
      }
      if (lang === 'tamil') {
        return "SEO (Search Engine Optimization) என்பது ஒரு இணையதளத்தை Google போன்ற தேடுபொறிகளில் இலவசமாக (Organic) முதலிடத்தில் கொண்டு வருவதற்கான உத்தியாகும்.\n\nமுக்கிய கூறுகள்:\n- Keyword Research (முக்கிய வார்த்தைகள் ஆய்வு)\n- On-page & Technical SEO\n- Link Building & Web Analytics\n\nCADPOINT-ல் 'Professional in Search Engine Optimization (SEO)' படிப்பு உள்ளது.\n\nஉங்களுக்கு SEO பாடவிவரங்கள் பார்க்க வேண்டுமா அல்லது Digital Marketing பற்றி தெரிய வேண்டுமா?";
      }
      return "SEO (Search Engine Optimization) is the practice of optimizing websites to rank higher on search engine results pages (like Google) organically to attract free, targeted traffic.\n\nKey components include:\n- Keyword research and content optimization\n- On-page and technical SEO auditing\n- Backlink strategies and domain authority building\n- Search engine traffic analytics\n\nAt CADPOINT, we offer the 'Professional in Search Engine Optimization (SEO)' course.\n\nWould you like to view details for the SEO course or explore Digital Marketing?";
    }

    // Question: Digital Marketing
    if (q.includes('what is digital marketing') || q === 'digital marketing') {
      setLastTopic('digital_marketing');
      if (lang === 'tanglish') {
        const daSuffix = usesMachi ? " da" : "";
        return `Digital Marketing-னா Internet, Google, Social Media & Email வழியா Business & Products-அ Promote பண்ணுறது தான்${daSuffix}.\n\nMain Areas:\n- SEO & Web Analytics\n- Google Ads (PPC)\n- Meta Ads (FB & Insta)\n- Email & Social Media Marketing\n\nCADPOINT offers 9 specialized Professional courses in Digital Marketing & SEO.\n\nUnakku SEO, Google Ads, இல்ல Meta Ads-ல எது பத்தி பாக்கனும்?`;
      }
      if (lang === 'tamil') {
        return "Digital Marketing என்பது இணையம், தேடுபொறிகள், சமூக ஊடகங்கள் மற்றும் மின்னஞ்சல் மூலம் தயாரிப்புகள் அல்லது சேவைகளை விளம்பரப்படுத்துவதாகும்.\n\nமுக்கிய பிரிவுகள்:\n- Search Engine Optimization (SEO)\n- Google Ads (PPC)\n- Meta Advertising (Facebook & Instagram)\n- Email & Social Media Marketing\n\nCADPOINT டிஜிட்டல் மார்க்கெட்டிங் பிரிவில் 9 பிரத்யேக தொழில்முறை படிப்புகளை வழங்குகிறது.\n\nஉங்களுக்கு SEO, Google Ads அல்லது Meta Ads பற்றி அறிய விரும்புகிறீர்களா?";
      }
      return "Digital Marketing is the promotion of products or services using digital channels such as search engines, social media, email, and websites.\n\nCore areas include:\n- Search Engine Optimization (SEO)\n- Google Ads & PPC Advertising\n- Meta Advertising (Facebook & Instagram)\n- Email Marketing & Web Analytics\n- Social Media Marketing & HubSpot CRM\n\nCADPOINT offers 9 specialized Professional courses in Digital Marketing & SEO.\n\nWhich digital marketing area would you like to explore?";
    }

    // ===================================================
    // 3. EXPLICIT COURSE SEARCH & DATABASE LOOKUP (RULES 5 & 6)
    // Single Source of Truth: COURSES in courseData.js
    // ===================================================
    const isExplicitCourseQuery = /\b(courses|course|programs|program|diploma|learn|study|offer|classes|training|show me|list)\b/i.test(q) ||
      q.includes('python course') || q.includes('revit course') || q.includes('autocad course') || q.includes('mep course') || q.includes('mechanical course') || q.includes('electrical course') || q.includes('digital marketing');

    if (isExplicitCourseQuery) {
      const searchKey = q.replace(/\b(courses|course|programs|program|diploma|learn|study|offer|classes|training|show me|list|have|do you|in cadpoint)\b/gi, '').trim();

      const matching = COURSES.filter(c => 
        (searchKey && c.title.toLowerCase().includes(searchKey)) ||
        (searchKey && c.software.toLowerCase().includes(searchKey)) ||
        (searchKey && c.category.toLowerCase().includes(searchKey)) ||
        (searchKey && c.domain.toLowerCase().includes(searchKey))
      );

      if (matching.length > 0) {
        const listStr = matching.map(c => 
          `• ${c.title}\n  - Level: ${c.level}\n  - Software: ${c.software}\n  - Duration: ${c.duration}`
        ).join('\n\n');

        if (lang === 'tamil') {
          return `CADPOINT அதிகாரப்பூர்வ பாடவுத்தரவுத்தளத்திலிருந்து (${matching.length} படிப்புகள்):\n\n${listStr}\n\nஇதில் எந்த படிப்பு பற்றிய மேலும் தகவல்கள் வேண்டும்?`;
        }
        if (lang === 'tanglish') {
          const greeting = usesMachi ? "Machi! " : "";
          return `${greeting}CADPOINT Official Database-ல இருக்கிற Matching Courses இதோ:\n\n${listStr}\n\nஉனக்கு இதில எந்த Course பற்றி விவரம் வேணும்?`;
        }
        return `Here are the official matching courses from the CADPOINT database:\n\n${listStr}\n\nWhich of these courses would you like to know more about?`;
      } else if (searchKey.length > 2) {
        // RULE 11: Accuracy & No Hallucination
        return "I don't have that information in the current CADPOINT data.";
      }
    }

    // ===================================================
    // 4. UNRELATED GENERAL KNOWLEDGE QUESTIONS (RULES 9 & 13)
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
    if (q.includes('speed of light')) {
      return "The speed of light in a vacuum is approximately 299,792,458 meters per second (about 300,000 km/s).";
    }

    // ===================================================
    // 5. AMBIGUOUS / SHORT INPUT HANDLING
    // ===================================================
    if (q.length < 4 || q === 'hi' || q === 'hello' || q === 'hey' || q === 'vanakkam') {
      if (lang === 'tamil') {
        return "வணக்கம்! CADPOINT AI உதவியாளருக்கு நல்வரவு. எந்த பாடம் அல்லது தொழில்நுட்பம் பற்றி அறிய விரும்புகிறீர்கள்?";
      }
      if (lang === 'tanglish') {
        const daSuffix = usesMachi ? " machi" : "";
        return `Hello${daSuffix}! CADPOINT AI Assistant தயாராக இருக்கு. உனக்கு எந்த Software இல்ல Course பற்றி விவரம் வேணும்?`;
      }
      return "Hello! 👋 Welcome to CADPOINT AI Assistant. How can I help you today?";
    }

    // ===================================================
    // 6. DEFAULT FALLBACK
    // ===================================================
    if (lang === 'tamil') {
      return `நீங்கள் கேட்ட "${rawQuery}" குறித்த தகவல்களுக்கு: CADPOINT சேலத்தில் IT, CADD, Multimedia, Accounts மற்றும் Digital Marketing துறைகளில் செய்முறைப் பயிற்சிகள் வழங்கப்படுகின்றன.\n\nஎந்தத் துறை அல்லது தொழில்நுட்பம் பற்றி அறிய விரும்புகிறீர்கள்?`;
    }
    if (lang === 'tanglish') {
      const daSuffix = usesMachi ? " da" : "";
      return `"${rawQuery}" பற்றிய விவரங்களுக்கு CADPOINT-ல Practical Training இருக்கு${daSuffix}.\n\nUnakku IT, CADD, Multimedia, Accounts இல்ல Digital Marketing-ல எது பத்தி பாக்கனும்?`;
    }
    return `Regarding "${rawQuery}": CADPOINT provides practical software training across IT, CADD, Multimedia, Accounts, and Digital Marketing disciplines.\n\nWhich software or technology area would you like to explore?`;
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
        text: `Thank you ${leadData.name}! 🎉 Your request for ${leadData.course} has been submitted.\n\nOur Salem career counselor will call you on ${leadData.phone} shortly.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, confirmMsg]);
      setLeadMode(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 sm:right-6 z-[100] w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 via-slate-900 to-red-950 text-white shadow-2xl flex items-center justify-center cursor-pointer border-2 border-red-500/50 group"
        aria-label="Toggle AI Assistant"
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
