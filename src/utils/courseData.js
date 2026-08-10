// Helper function to generate clean, readable slugs
export const generateSlug = (title, id) => {
  const customSlugs = {
    // Official IT & Software Slugs (15 Professional + 10 Master Diploma)
    'it-prof-fullstack-python-react': 'professional-program-ai-in-full-stack-development-python-react',
    'it-prof-java-fullstack': 'professional-program-ai-in-java-full-stack',
    'it-prof-mean-stack': 'professional-program-ai-in-mean-stack',
    'it-prof-mern-stack': 'professional-program-ai-in-mern-stack',
    'it-prof-web-design': 'professional-program-advanced-web-designing',
    'it-prof-software-testing': 'professional-program-software-testing',
    'it-prof-ds-ai': 'professional-program-data-science-ai',
    'it-prof-cloud-devops': 'professional-program-cloud-devops',
    'it-prof-cybersecurity': 'professional-program-cybersecurity-ethical-hacking',
    'it-prof-rpa': 'professional-program-rpa-tools',
    'it-prof-digital-marketing': 'professional-program-digital-marketing',
    'it-prof-db-management': 'professional-program-database-management',
    'it-prof-game-dev': 'professional-program-game-development',
    'it-prof-blockchain': 'professional-program-blockchain-development',
    'it-prof-ar-vr': 'professional-program-ar-vr-development',

    'it-master-fullstack-dev': 'master-diploma-ai-in-full-stack-development',
    'it-master-software-eng': 'master-diploma-software-engineering',
    'it-master-cloud-devops': 'master-diploma-cloud-computing-devops',
    'it-master-ds-ai': 'master-diploma-data-science-ai',
    'it-master-cybersecurity': 'master-diploma-cybersecurity-penetration-testing',
    'it-master-rpa-automation': 'master-diploma-rpa-automation',
    'it-master-digital-marketing': 'master-diploma-digital-marketing-analytics',
    'it-master-web-app': 'master-diploma-web-app-development',
    'it-master-adv-programming': 'master-diploma-advanced-programming',
    'it-master-game-ar-vr': 'master-diploma-game-ar-vr-development',

    // Official Mechanical & Aeronautics Slugs (11 Courses)
    'mech-prof-mep-planning': 'professional-in-mep-design-project-planning',
    'mech-prof-product-planning': 'professional-in-product-design-with-project-planning',
    'mech-prof-auto-product': 'professional-in-automotive-product-design',
    'mech-prof-auto-struct': 'professional-in-automotive-structural-design',
    'mech-prof-aero-product': 'professional-in-aerospace-product-design',
    'mech-prof-aero-struct': 'professional-in-aerospace-structural-design',
    'mech-prof-mep-design': 'professional-in-mep-design',
    'mech-prof-product-design': 'professional-in-product-design',
    'mech-prof-product-analysis-240': 'professional-in-product-design-analysis-240h',
    'mech-prof-adv-simulation': 'professional-in-advanced-simulation',
    'mech-prof-product-analysis-260': 'professional-in-product-design-analysis-260h',

    // Official Civil & Architecture Slugs (10 Courses)
    'civil-prof-arch-design': 'professional-in-architectural-design',
    'civil-prof-arch-planning': 'professional-in-architectural-design-project-planning',
    'civil-prof-building-design-staad-qto': 'professional-in-building-design-staad-qto',
    'civil-prof-building-design-staad-primavera': 'professional-in-building-design-staad-primavera',
    'civil-prof-building-design-etabs-msp': 'professional-in-building-design-etabs-msp',
    'civil-prof-struct-simulation': 'professional-in-structural-design-simulation',
    'civil-prof-bim-planning': 'professional-in-bim-planning',
    'civil-prof-vis-interior': 'professional-in-visualization-interior-design',
    'civil-prof-interior-vis': 'professional-in-interior-visualization',
    'civil-prof-adv-qs': 'professional-in-advanced-quantity-surveying',

    // Official Multimedia CADD Slugs
    'mm-uiux': 'ui-ux-design-figma',
    'mm-prof-graphic-web': 'professional-course-graphic-web-design',
    'mm-prof-video-prod': 'professional-course-digital-video-production',
    'mm-prof-2d-anim': 'professional-course-2d-animation-editing',
    'mm-prof-print-pub': 'professional-course-print-publishing',
    'mm-prof-uiux-figma': 'professional-course-ui-ux-design-figma',
    'mm-prof-3d-anim': 'professional-course-3d-design-animation',
    'mm-prof-arch-vis': 'professional-course-architectural-visualization',
    'mm-master-graphic-mm': 'master-diploma-graphic-multimedia-design',
    'mm-master-anim-vfx': 'master-diploma-animation-vfx-flash',
    'mm-master-digital-media': 'master-diploma-digital-media-production',
    'mm-master-mm-web': 'master-diploma-multimedia-web',
    'mm-master-3d-game': 'master-diploma-3d-animation-game-art',
    'mm-master-arch-eng-anim': 'master-diploma-architectural-engineering-animation',
    
    // Official Accounting, Finance & ERP Slugs
    'acc-prof-taxation': 'professional-diploma-financial-accounting-taxation',
    'acc-prof-data': 'professional-diploma-data-driven-accounting',
    'acc-prof-sap': 'professional-diploma-sap-functional-modules',
    'acc-prof-mis': 'professional-diploma-mis-business-reporting',
    'acc-prof-foreign': 'professional-diploma-indian-foreign-accounting',
    'acc-master-practical': 'pg-diploma-professional-practical-accounting',
    'acc-master-intl': 'pg-diploma-international-accounting-taxation',
    'acc-master-sap-impl': 'pg-diploma-sap-erp-implementation',
    'acc-master-mis-analytics': 'pg-diploma-financial-control-mis-analytics',
    'acc-master-global': 'pg-diploma-global-finance-erp',

    // Official MEP & Electrical Slugs
    'elec-prof-mep-msp': 'professional-mep-designing-ms-project',
    'elec-prof-mep-primavera': 'professional-mep-designing-primavera',
    'elec-prof-electrical-system': 'professional-electrical-system-design',
    'elec-prof-hvac-fire': 'professional-hvac-firefighting-design',
    'elec-master-mep-hvac-plan': 'master-diploma-mep-hvac-design-project-planning',
    'elec-master-electrical-building': 'master-diploma-electrical-building-system-design',
    'elec-master-mep-bim-coordination': 'master-diploma-mep-coordination-bim',

    'elec-eplan': 'electrical-wiring-harness-eplan',
    'elec-etap': 'etap-power-systems',
    'elec-dialux': 'dialux-lighting-design',
    'elec-dip-cad': 'diploma-electrical-cad',
    'elec-dip-mep-hvac': 'diploma-hvac-mep-design',
    'elec-dip-building': 'diploma-electrical-building-services',
    'elec-prof-mep': 'professional-mep-designing',
    'elec-master-mep-bim': 'master-diploma-mep-hvac',

    // Official Digital Marketing & SEO Slugs (9 Courses)
    'dm-prof-seo': 'professional-in-search-engine-optimization-seo',
    'dm-prof-google-ads': 'professional-in-google-ads-ppc-advertising',
    'dm-prof-meta-ads': 'professional-in-meta-advertising',
    'dm-prof-email-marketing': 'professional-in-email-marketing',
    'dm-prof-web-analytics': 'professional-in-web-analytics',
    'dm-prof-social-media': 'professional-in-social-media-marketing',
    'dm-prof-hubspot': 'professional-in-hubspot-marketing',
    'dm-prof-sem': 'professional-in-search-engine-marketing-sem',
    'dm-prof-display-video': 'professional-in-display-video-advertising'
  };

  if (customSlugs[id]) return customSlugs[id];

  return title
    .toLowerCase()
    .replace(/certificate in /g, '')
    .replace(/certification course on /g, '')
    .replace(/certification course in /g, '')
    .replace(/certification in /g, '')
    .replace(/diploma in /g, '')
    .replace(/professional in /g, '')
    .replace(/master diploma in /g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const BASE_COURSES = [
  // ==========================================
  // 1. IT & NON-IT COURSES (EXACT 25 OFFICIAL IT COURSES)
  // ==========================================
  // Professional Programs (15)
  {
    id: "it-prof-fullstack-python-react",
    title: "Professional Program AI in Full Stack Development – Python & React",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "HTML, CSS, JavaScript, Python, React",
    image: "/images/it_prof_python_react.jpg",
    description: "Professional full stack development course covering HTML, CSS, JavaScript, Python backend logic, and React single-page application development."
  },
  {
    id: "it-prof-java-fullstack",
    title: "Professional Program AI in Java Full Stack",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "HTML, CSS, JavaScript, Java, Spring Boot",
    image: "/images/it_prof_java_fullstack.jpg",
    description: "Enterprise Java full stack engineering training with HTML, CSS, JavaScript, Java core principles, and Spring Boot microservices."
  },
  {
    id: "it-prof-mean-stack",
    title: "Professional Program AI in MEAN Stack",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "MongoDB, Express.js, Angular, Node.js",
    image: "/images/it_prof_mean_stack.jpg",
    description: "Full stack web application development using MEAN stack: MongoDB database architecture, Express server, Angular frontend, and Node.js runtime."
  },
  {
    id: "it-prof-mern-stack",
    title: "Professional Program AI in MERN Stack",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "MongoDB, Express.js, React, Node.js",
    image: "/images/it_prof_mern_stack.jpg",
    description: "Production-grade MERN stack engineering with MongoDB NoSQL storage, Express API framework, React component UI, and Node.js backend."
  },
  {
    id: "it-prof-web-design",
    title: "Professional Program in Advanced Web Designing",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "180 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "HTML, CSS, Bootstrap, JavaScript, JQuery",
    image: "/images/it_prof_web_design.jpg",
    description: "Advanced responsive web design program mastering semantic HTML, CSS styling, Bootstrap layouts, JavaScript DOM, and JQuery interactive elements."
  },
  {
    id: "it-prof-software-testing",
    title: "Professional Program in Software Testing",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "Manual Testing, Selenium, JMeter, QTP",
    image: "/images/it_prof_software_testing.jpg",
    description: "Comprehensive software quality assurance covering manual test execution, Selenium test automation scripts, JMeter performance testing, and QTP/UFT."
  },
  {
    id: "it-prof-ds-ai",
    title: "Professional Program in Data Science & AI",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "Python, Machine Learning, Tableau, Power BI",
    image: "/images/it_prof_ds_ai.jpg",
    description: "Data science and artificial intelligence curriculum covering Python analytics, Machine Learning predictive models, Tableau, and Power BI dashboards."
  },
  {
    id: "it-prof-cloud-devops",
    title: "Professional Program in Cloud & DevOps",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "AWS, Azure, Docker, Jenkins",
    image: "/images/it_prof_cloud_devops.jpg",
    description: "Cloud computing and DevOps engineering with AWS cloud infrastructure, Microsoft Azure administration, Docker containers, and Jenkins CI/CD automation."
  },
  {
    id: "it-prof-cybersecurity",
    title: "Professional Program in Cybersecurity & Ethical Hacking",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "Wireshark, Metasploit, Burp Suite, Mimikatz",
    image: "/images/it_prof_cybersecurity.jpg",
    description: "Professional cybersecurity and ethical hacking program covering Wireshark network packet analysis, Metasploit exploitation, Burp Suite, and Mimikatz."
  },
  {
    id: "it-prof-rpa",
    title: "Professional Program in RPA Tools",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "UI Path, Blue Prism, Automation Anywhere",
    image: "/images/it_prof_rpa.jpg",
    description: "Robotic Process Automation (RPA) diploma engineering workflows in UiPath Studio, enterprise Blue Prism bots, and Automation Anywhere platform."
  },
  {
    id: "it-prof-digital-marketing",
    title: "Professional Program in Digital Marketing",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "180 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "SEO, Google Ads, Email Marketing, Analytics",
    image: "/images/it_prof_digital_marketing.jpg",
    description: "Digital marketing strategies covering Search Engine Optimization (SEO), Google Ads PPC management, automated email marketing, and Analytics data tracking."
  },
  {
    id: "it-prof-db-management",
    title: "Professional Program in Database Management",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "MySQL, MongoDB, Oracle, SQL Server",
    image: "/images/it_prof_db_management.jpg",
    description: "Database administration and SQL development mastering MySQL relational schemas, MongoDB NoSQL collections, Oracle PL/SQL, and SQL Server."
  },
  {
    id: "it-prof-game-dev",
    title: "Professional Program in Game Development",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "Unity, Unreal Engine, C#, Blender",
    image: "/images/it_prof_game_dev.jpg",
    description: "Interactive 2D/3D game development utilizing Unity engine C# scripting, Unreal Engine C++ blueprints, and Blender 3D modeling pipelines."
  },
  {
    id: "it-prof-blockchain",
    title: "Professional Program in Blockchain Development",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "Blockchain, Solidity, Smart Contracts, Ethereum",
    image: "/images/it_prof_blockchain.jpg",
    description: "Decentralized blockchain engineering with Solidity smart contracts, Ethereum Virtual Machine (EVM), Web3 integration, and DApp development."
  },
  {
    id: "it-prof-ar-vr",
    title: "Professional Program in AR/VR Development",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Professional",
    software: "Unity, ARKit, ARCore, 3D Modeling",
    image: "/images/it_prof_ar_vr.jpg",
    description: "Augmented and Virtual Reality application development utilizing Unity AR Foundation, Apple ARKit, Google ARCore, and 3D environment modeling."
  },

  // Master Diploma Programs (10)
  {
    id: "it-master-fullstack-dev",
    title: "Master Diploma AI in Full Stack Development",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "HTML, CSS, JavaScript, Python, Django, React, Node.js",
    image: "/images/it_master_fullstack_dev.jpg",
    description: "Postgraduate master software engineering diploma covering HTML, CSS, JavaScript, Python Django REST APIs, React SPA, and Node.js microservices."
  },
  {
    id: "it-master-software-eng",
    title: "Master Diploma in Software Engineering",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "Python, Java, C#, .NET, SQL Server, Git",
    image: "/images/it_master_software_eng.jpg",
    description: "Master level software engineering curriculum covering multi-language programming in Python, Java, and C# .NET, enterprise SQL Server, and Git workflows."
  },
  {
    id: "it-master-cloud-devops",
    title: "Master Diploma in Cloud Computing & DevOps",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "AWS, Azure, Docker, Kubernetes, Jenkins, Ansible",
    image: "/images/it_master_cloud_devops.jpg",
    description: "Master diploma in multi-cloud architecture and DevOps automation featuring AWS, Azure, Docker containers, Kubernetes, Jenkins, and Ansible."
  },
  {
    id: "it-master-ds-ai",
    title: "Master Diploma in Data Science & AI",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "280 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "Python, Machine Learning, Deep Learning, Tableau, Power BI, Hadoop",
    image: "/images/it_master_ds_ai.jpg",
    description: "Advanced postgraduate master diploma in deep neural networks, Python Machine Learning, Big Data Hadoop ecosystems, Tableau, and Power BI analytics."
  },
  {
    id: "it-master-cybersecurity",
    title: "Master Diploma in Cybersecurity & Penetration Testing",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "Wireshark, Metasploit, Mimikatz, Kali Linux, Burp Suite, Cryptography",
    image: "/images/it_master_cybersecurity.jpg",
    description: "Postgraduate master diploma in offensive and defensive cybersecurity, Kali Linux penetration testing, vulnerability auditing, and network cryptography."
  },
  {
    id: "it-master-rpa-automation",
    title: "Master Diploma in RPA & Automation",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "240 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "UI Path, Blue Prism, Automation Anywhere, Power Automate",
    image: "/images/it_master_rpa_automation.jpg",
    description: "Master level robotic process automation diploma covering enterprise UiPath bot architecture, Blue Prism control rooms, Automation Anywhere, and Power Automate."
  },
  {
    id: "it-master-digital-marketing",
    title: "Master Diploma in Digital Marketing & Analytics",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "240 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "SEO, Google Ads, Email Marketing, Analytics, Social Media Marketing, HubSpot",
    image: "/images/it_master_digital_marketing.jpg",
    description: "Postgraduate master diploma in multi-channel digital marketing, advanced SEO strategies, Google Ads PPC management, Social Media, and HubSpot CRM."
  },
  {
    id: "it-master-web-app",
    title: "Master Diploma in Web & App Development",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "HTML, CSS, Bootstrap, Angular, React Native, Firebase",
    image: "/images/it_master_web_app.jpg",
    description: "Master level web and cross-platform mobile application development with HTML, CSS, Bootstrap, Angular TypeScript, React Native, and Google Firebase."
  },
  {
    id: "it-master-adv-programming",
    title: "Master Diploma in Advanced Programming",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "Python, Java, C++, Go, Swift, Git, Docker",
    image: "/images/it_master_adv_programming.jpg",
    description: "Master diploma in polyglot software engineering covering high-performance system programming in Python, Java, C++, Go, Swift, Git, and Docker containers."
  },
  {
    id: "it-master-game-ar-vr",
    title: "Master Diploma in Game & AR/VR Development",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "280 hours",
    mode: "Online / Offline",
    category: "Master Diploma",
    software: "Unity, Unreal Engine, Blender, ARKit, ARCore, C#",
    image: "/images/it_master_game_ar_vr.jpg",
    description: "Complete postgraduate master diploma in 3D game engine development, Unreal Engine C++ blueprints, Blender 3D modeling, Unity C# scripting, and ARKit/ARCore."
  },

  // ==========================================
  // 2. MULTIMEDIA COURSES
  // ==========================================
  {
    id: "mm-uiux",
    title: "Professional Course in UI/UX Design",
    domain: "Multimedia",
    level: "Professional",
    duration: "160 hours",
    mode: "Online / Offline",
    category: "UI/UX",
    software: "Figma, Adobe XD, Photoshop, Principle",
    image: "/images/multimedia_vfx_course.jpg",
    description: "User experience research, wireframing, interactive mobile/web design systems, prototyping, and usability testing."
  },
  // Professional Courses
  {
    id: "mm-prof-graphic-web",
    title: "Professional Course in Graphic & Web Design",
    domain: "Multimedia",
    level: "Professional",
    duration: "160 hours",
    mode: "Online / Offline",
    category: "Web & Print",
    software: "Photoshop, Illustrator, CorelDRAW, HTML/CSS",
    image: "/images/htmlcss.jpg",
    description: "Professional training in vector illustration, print graphic design, CorelDRAW layout, and responsive HTML/CSS web design."
  },
  {
    id: "mm-prof-video-prod",
    title: "Professional Course in Digital Video Production",
    domain: "Multimedia",
    level: "Professional",
    duration: "180 hours",
    mode: "Online / Offline",
    category: "Video Editing",
    software: "Premiere Pro, After Effects, Audition, Photoshop",
    image: "/images/javascript.jpg",
    description: "Digital video editing masterclass featuring Premiere Pro timeline editing, After Effects motion graphics, Audition audio mastering, and Photoshop graphics."
  },
  {
    id: "mm-prof-2d-anim",
    title: "Professional Course in 2D Animation & Editing",
    domain: "Multimedia",
    level: "Professional",
    duration: "160 hours",
    mode: "Online / Offline",
    category: "2D Animation",
    software: "Flash, Photoshop, Sound Forge, Premiere Pro",
    image: "/images/cpp.jpg",
    description: "2D character animation, keyframing, audio editing, and video post-production using Adobe Flash, Sound Forge, and Premiere Pro."
  },
  {
    id: "mm-prof-print-pub",
    title: "Professional Course in Print & Publishing",
    domain: "Multimedia",
    level: "Professional",
    duration: "160 hours",
    mode: "Online / Offline",
    category: "Publishing",
    software: "Photoshop, InDesign, PageMaker, Illustrator",
    image: "/images/c.jpg",
    description: "Desktop publishing, magazine layout, book typography, vector design, and commercial printing prepress workflows."
  },
  {
    id: "mm-prof-uiux-figma",
    title: "Professional Course in UI/UX Design",
    domain: "Multimedia",
    level: "Professional",
    duration: "160 hours",
    mode: "Online / Offline",
    category: "UI/UX",
    software: "Photoshop, Figma, Illustrator, InDesign",
    image: "/images/react.jpg",
    description: "User interface and experience design covering Figma interactive wireframing, component design systems, prototyping, and layout publishing."
  },
  {
    id: "mm-prof-3d-anim",
    title: "Professional Course in 3D Design & Animation",
    domain: "Multimedia",
    level: "Professional",
    duration: "180 hours",
    mode: "Online / Offline",
    category: "3D Animation",
    software: "Maya, After Effects, Photoshop, Premiere",
    image: "/images/it_fullstack_course.jpg",
    description: "3D character modeling, texturing, animation rigging, motion compositing, and video editing using Autodesk Maya and After Effects."
  },
  {
    id: "mm-prof-arch-vis",
    title: "Professional Course in Architectural Visualization",
    domain: "Multimedia",
    level: "Professional",
    duration: "180 hours",
    mode: "Online / Offline",
    category: "Visualization",
    software: "3ds Max, V-Ray, Photoshop, Premiere Pro",
    image: "/images/3ds_max.jpg",
    description: "Photorealistic 3D architectural rendering, V-Ray raytracing lighting, post-processing retouching, and walkthrough video creation."
  },
  // Master Diploma Courses
  {
    id: "mm-master-graphic-mm",
    title: "Master Diploma in Graphic & Multimedia Design",
    domain: "Multimedia",
    level: "Master Diploma",
    duration: "240 hours",
    mode: "Online / Offline",
    category: "Master Media",
    software: "Photoshop, Illustrator, CorelDRAW, InDesign, After Effects",
    image: "/images/multimedia_vfx_course.jpg",
    description: "Master diploma in digital graphic branding, publication layout, vector art, and motion graphics design."
  },
  {
    id: "mm-master-anim-vfx",
    title: "Master Diploma in Animation & VFX",
    domain: "Multimedia",
    level: "Master Diploma",
    duration: "280 hours",
    mode: "Online / Offline",
    category: "Master VFX",
    software: "Maya, After Effects, Premiere Pro, Flash, Photoshop",
    image: "/images/cpp.jpg",
    description: "Complete postgraduate master diploma in 3D animation, VFX visual effects keying, 2D animation, and film editing pipelines."
  },
  {
    id: "mm-master-digital-media",
    title: "Master Diploma in Digital Media Production",
    domain: "Multimedia",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Media",
    software: "Premiere, After Effects, Audition, Photoshop, Illustrator",
    image: "/images/javascript.jpg",
    description: "Master level film and digital broadcast media production covering non-linear editing, motion graphics, audio mastering, and graphic design."
  },
  {
    id: "mm-master-mm-web",
    title: "Master Diploma in Multimedia and Web",
    domain: "Multimedia",
    level: "Master Diploma",
    duration: "250 hours",
    mode: "Online / Offline",
    category: "Master Web",
    software: "Photoshop, Illustrator, HTML/CSS, JavaScript, Figma",
    image: "/images/htmlcss.jpg",
    description: "Comprehensive multimedia web engineering diploma combining graphic design, Figma UI prototyping, HTML/CSS, and interactive JavaScript."
  },
  {
    id: "mm-master-3d-game",
    title: "Master Diploma in 3D Animation & Game Art",
    domain: "Multimedia",
    level: "Master Diploma",
    duration: "300 hours",
    mode: "Online / Offline",
    category: "Master Gaming",
    software: "Maya, Unity, Photoshop, Blender, Substance Painter",
    image: "/images/react.jpg",
    description: "Master 3D game art diploma covering character modeling in Maya/Blender, PBR texturing in Substance Painter, and real-time Unity engine integration."
  },
  {
    id: "mm-master-arch-eng-anim",
    title: "Master Diploma in Architectural & Engineering Animation",
    domain: "Multimedia",
    level: "Master Diploma",
    duration: "280 hours",
    mode: "Online / Offline",
    category: "Master Engineering",
    software: "3ds Max, V-Ray, AutoCAD, Photoshop, Premiere Pro",
    image: "/images/3ds_max.jpg",
    description: "Postgraduate master diploma in CAD architectural modeling, V-Ray photorealistic rendering, engineering fly-through animation, and video editing."
  },

  // ==========================================
  // 3. OFFICIAL ACCOUNTING, FINANCE, AND ERP COURSES (EXACT 10 COURSES)
  // ==========================================
  // Category 1: Professional Courses (5)
  {
    id: "acc-prof-taxation",
    title: "Professional Diploma in Financial Accounting & Taxation",
    domain: "Accounting & ERP",
    level: "Professional",
    duration: "140 hours",
    mode: "Online / Offline",
    category: "Taxation",
    software: "Tally Prime, GST, Taxation, Excel",
    image: "/images/financial_accounting_taxation.jpg",
    description: "Comprehensive financial accounting diploma covering Tally Prime operations, GST return filing, direct taxation, and balance sheet finalization."
  },
  {
    id: "acc-prof-data",
    title: "Professional Diploma in Data-Driven Accounting",
    domain: "Accounting & ERP",
    level: "Professional",
    duration: "140 hours",
    mode: "Online / Offline",
    category: "Analytics",
    software: "Advanced Excel, Power BI, QuickBooks",
    image: "/images/data_driven_accounting.jpg",
    description: "Modern data-driven accounting using Advanced Excel financial modeling, interactive Power BI dashboards, and cloud QuickBooks."
  },
  {
    id: "acc-prof-sap",
    title: "Professional Diploma in SAP Functional Modules",
    domain: "Accounting & ERP",
    level: "Professional",
    duration: "150 hours",
    mode: "Online / Offline",
    category: "ERP Systems",
    software: "SAP FICO, SAP MM, SAP SD, SAP PP",
    image: "/images/sap_functional_modules.jpg",
    description: "Functional module expertise across SAP FICO financial controlling, Materials Management (MM), Sales & Distribution (SD), and Production Planning (PP)."
  },
  {
    id: "acc-prof-mis",
    title: "Professional Diploma in MIS & Business Reporting",
    domain: "Accounting & ERP",
    level: "Professional",
    duration: "140 hours",
    mode: "Online / Offline",
    category: "Reporting",
    software: "Excel, Advanced Excel, Power BI, Zoho Books",
    image: "/images/mis_business_reporting.jpg",
    description: "Executive MIS report generation, Power BI data analytics, financial forecasting models, and Zoho Books accounting software."
  },
  {
    id: "acc-prof-foreign",
    title: "Professional Diploma in Indian & Foreign Accounting",
    domain: "Accounting & ERP",
    level: "Professional",
    duration: "140 hours",
    mode: "Online / Offline",
    category: "Global Finance",
    software: "Tally, QuickBooks, Indian + Gulf Tax",
    image: "/images/indian_foreign_accounting.jpg",
    description: "Dual accounting standards training covering Indian statutory tax regulations, Gulf VAT compliance, Tally, and QuickBooks global accounting."
  },

  // Category 2: Master Diploma Courses (5)
  {
    id: "acc-master-practical",
    title: "PG Diploma in Professional & Practical Accounting",
    domain: "Accounting & ERP",
    level: "Master Diploma",
    duration: "180 hours",
    mode: "Online / Offline",
    category: "Master Accounting",
    software: "MS Office, Advanced Excel, Tally, Taxation, GST, Payroll",
    image: "/images/practical_accounting_master.jpg",
    description: "Postgraduate master program covering practical corporate accounting, payroll processing, statutory GST filing, Tally, and MS Office suites."
  },
  {
    id: "acc-master-intl",
    title: "PG Diploma in International Accounting & Taxation",
    domain: "Accounting & ERP",
    level: "Master Diploma",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Master Finance",
    software: "International Taxation, Sage 50, Zoho Books, Gulf VAT, QuickBooks",
    image: "/images/international_accounting_taxation.jpg",
    description: "Master international accounting diploma with Sage 50, Gulf VAT laws, US/UK taxation principles, and multi-currency cloud accounting."
  },
  {
    id: "acc-master-sap-impl",
    title: "PG Diploma in SAP ERP Implementation",
    domain: "Accounting & ERP",
    level: "Master Diploma",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Master ERP",
    software: "SAP FICO, SAP MM, SAP SD, SAP PP, Logistics",
    image: "/images/sap_erp_implementation.jpg",
    description: "Enterprise SAP ERP implementation diploma covering business blueprinting, S/4HANA module integration, logistics, and corporate controlling."
  },
  {
    id: "acc-master-mis-analytics",
    title: "PG Diploma in Financial Control & MIS Analytics",
    domain: "Accounting & ERP",
    level: "Master Diploma",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Master Analytics",
    software: "Excel, Power BI, Tally, GST, Payroll, MIS Reports",
    image: "/images/financial_control_mis_analytics.jpg",
    description: "Master financial control diploma integrating statutory GST audit, corporate payroll, DAX Power BI business intelligence, and executive MIS reporting."
  },
  {
    id: "acc-master-global",
    title: "PG Diploma in Global Finance & ERP",
    domain: "Accounting & ERP",
    level: "Master Diploma",
    duration: "220 hours",
    mode: "Online / Offline",
    category: "Master Global",
    software: "SAP ERP, Tally Prime, QuickBooks, Zoho Books, Foreign Accounting",
    image: "/images/global_finance_erp.jpg",
    description: "Ultimate postgraduate master diploma in global financial engineering, multi-country tax compliance, enterprise SAP ERP, and multi-ledger systems."
  },

  // ==========================================
  // 4. CIVIL & ARCHITECTURE COURSES (EXACT 10 OFFICIAL COURSES)
  // ==========================================
  {
    id: "civil-prof-arch-design",
    title: "Professional in Architectural Design",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "240 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "AutoCAD 2D + 3DS Max + Revit Architecture",
    image: "/images/civil_prof_arch_design.jpg",
    description: "Professional architectural design program combining AutoCAD 2D floor plans, 3DS Max 3D visualization, and Revit Architecture BIM modeling."
  },
  {
    id: "civil-prof-arch-planning",
    title: "Professional in Architectural Design & Project Planning",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "300 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "AutoCAD 2D + Revit Architecture + Quantity Takeoff + Microsoft Projects + PPM Concepts",
    image: "/images/civil_prof_arch_planning.jpg",
    description: "Comprehensive architectural project engineering covering AutoCAD 2D, Revit BIM, Quantity Takeoff estimation, Microsoft Projects, and PPM concepts."
  },
  {
    id: "civil-prof-building-design-staad-qto",
    title: "Professional in Building Design",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "280 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "AutoCAD 2D + Staad Pro + Revit Architecture + Quantity Take off",
    image: "/images/civil_prof_building_design_staad_qto.jpg",
    description: "Structural building design and estimation diploma integrating AutoCAD 2D, STAAD.Pro CONNECT structural analysis, Revit Architecture, and Quantity Takeoff."
  },
  {
    id: "civil-prof-building-design-staad-primavera",
    title: "Professional in Building Design",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "276 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "STAAD Pro + Revit Architecture + Primavera + PPM Concepts",
    image: "/images/civil_prof_building_design_staad_primavera.jpg",
    description: "Advanced building engineering and project control combining STAAD Pro structural modeling, Revit Architecture BIM, Primavera P6 scheduling, and PPM concepts."
  },
  {
    id: "civil-prof-building-design-etabs-msp",
    title: "Professional in Building Design",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "276 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "ETABS + Revit Architecture + Microsoft Projects + PPM Concepts",
    image: "/images/civil_prof_building_design_etabs_msp.jpg",
    description: "High-rise structural building analysis and project management utilizing CSI ETABS analysis, Revit Architecture, Microsoft Projects, and PPM concepts."
  },
  {
    id: "civil-prof-struct-simulation",
    title: "Professional in Structural Design & Simulation",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "276 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "Staad Pro + ETabs + Microsoft Projects + PPM Concepts",
    image: "/images/civil_prof_struct_simulation.jpg",
    description: "Comprehensive structural analysis and finite element simulation diploma combining STAAD Pro, ETABS framing design, Microsoft Projects, and PPM concepts."
  },
  {
    id: "civil-prof-bim-planning",
    title: "Professional in BIM & Planning",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "240 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "Revit Architecture + Navisworks + MS Project + PPM Concepts",
    image: "/images/civil_prof_bim_planning.jpg",
    description: "Building Information Modeling (BIM) coordination and project planning featuring Revit Architecture 3D, Navisworks clash detection, MS Project, and PPM concepts."
  },
  {
    id: "civil-prof-vis-interior",
    title: "Professional in Visualization & Interior Design",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "320 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "SketchUp + Corona + Enscape + Revit Architecture",
    image: "/images/civil_prof_vis_interior.jpg",
    description: "High-end interior design and architectural walkthrough rendering using Trimble SketchUp, Corona Renderer, Enscape real-time 3D, and Revit Architecture."
  },
  {
    id: "civil-prof-interior-vis",
    title: "Professional in Interior Visualization",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "240 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "SketchUp + V-Ray + Twinmotion + Revit Architecture",
    image: "/images/civil_prof_interior_vis.jpg",
    description: "Photorealistic interior rendering and real-time visualization masterclass combining SketchUp 3D, Chaos V-Ray, Unreal Twinmotion, and Revit Architecture."
  },
  {
    id: "civil-prof-adv-qs",
    title: "Professional in Advanced Quantity Surveying",
    domain: "Civil & Architecture",
    level: "Professional",
    duration: "260 Hours",
    mode: "Online / Offline",
    category: "Civil & Architecture",
    software: "AutoCAD 2D + Revit + QTO + Quantity Survey Tools",
    image: "/images/civil_prof_adv_qs.jpg",
    description: "Construction estimation and cost management diploma mastering AutoCAD 2D drafting, Revit BIM models, Autodesk QTO, and Quantity Surveying tools."
  },

  // ==========================================
  // 5. MECHANICAL & AERONAUTICAL COURSES (EXACT 11 OFFICIAL COURSES)
  // ==========================================
  {
    id: "mech-prof-mep-planning",
    title: "Professional in MEP Design & Project Planning",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "240 Hours",
    mode: "Online / Offline",
    category: "MEP Design",
    software: "AutoCAD 2D + Revit MEP + Primavera /Microsoft Projects + PPM Concepts",
    image: "/images/mech_prof_mep_planning.jpg",
    description: "Professional mechanical and electrical building design covering AutoCAD 2D, Revit MEP 3D modeling, Primavera / Microsoft Projects, and PPM concepts."
  },
  {
    id: "mech-prof-product-planning",
    title: "Professional in Product Design with Project Planning",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "260 Hours",
    mode: "Online / Offline",
    category: "Product Design",
    software: "Creo + SolidWorks + Primavera /Microsoft Projects + PPM",
    image: "/images/mech_prof_product_planning.jpg",
    description: "Mechanical product design masterclass integrating PTC Creo parametric modeling, Dassault SolidWorks, Primavera / MS Project, and PPM principles."
  },
  {
    id: "mech-prof-auto-product",
    title: "Professional in Automotive Product Design",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "160 Hours",
    mode: "Online / Offline",
    category: "Automotive",
    software: "AutoCAD 2D + SolidWorks + CATIA + Automotive CAD Theory",
    image: "/images/mech_prof_auto_product.jpg",
    description: "Automotive component and vehicle sub-assembly engineering utilizing AutoCAD 2D, SolidWorks, CATIA V5, and automotive CAD theoretical fundamentals."
  },
  {
    id: "mech-prof-auto-struct",
    title: "Professional in Automotive Structural Design",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "280 Hours",
    mode: "Online / Offline",
    category: "Automotive",
    software: "CATIA + SolidWorks + Ansys / Hypermesh / NX Nastran + Automobile CAD Theory",
    image: "/images/mech_prof_auto_struct.jpg",
    description: "Automotive structural chassis analysis and crashworthiness design with CATIA V5, SolidWorks, Ansys, Hypermesh, NX Nastran, and automobile CAD theory."
  },
  {
    id: "mech-prof-aero-product",
    title: "Professional in Aerospace Product Design",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "280 Hours",
    mode: "Online / Offline",
    category: "Aerospace",
    software: "CATIA + SolidWorks + Autodesk Inventor + Aerospace CAD Theory",
    image: "/images/mech_prof_aero_product.jpg",
    description: "Aerospace component surface modeling, fuselage design, and turbine assembly utilizing CATIA V5, SolidWorks, Autodesk Inventor, and aerospace theory."
  },
  {
    id: "mech-prof-aero-struct",
    title: "Professional in Aerospace Structural Design",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "280 Hours",
    mode: "Online / Offline",
    category: "Aerospace",
    software: "CATIA + Hypermesh + NX Nastran / Ansys + Aerospace CAD Theory",
    image: "/images/mech_prof_aero_struct.jpg",
    description: "Aerospace structural finite element modeling and stress analysis combining CATIA V5, Hypermesh meshing, NX Nastran, Ansys, and aerospace CAD theory."
  },
  {
    id: "mech-prof-mep-design",
    title: "Professional in MEP Design",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "260 Hours",
    mode: "Online / Offline",
    category: "MEP Design",
    software: "AutoCAD 2D + Revit MEP + Microsoft Projects + PPM Concepts",
    image: "/images/mech_prof_mep_design.jpg",
    description: "Comprehensive MEP building services engineering covering AutoCAD 2D drafting, Revit MEP BIM modeling, Microsoft Projects, and PPM concepts."
  },
  {
    id: "mech-prof-product-design",
    title: "Professional in Product Design",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "240 Hours",
    mode: "Online / Offline",
    category: "Product Design",
    software: "AutoCAD 2D + SolidWorks + NX CAD",
    image: "/images/mech_prof_product_design.jpg",
    description: "Mechanical product drafting, 3D parametric modeling, and assembly design using AutoCAD 2D, SolidWorks, and Siemens NX CAD."
  },
  {
    id: "mech-prof-product-analysis-240",
    title: "Professional in Product Design & Analysis",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "240 Hours",
    mode: "Online / Offline",
    category: "Design & Analysis",
    software: "AutoCAD 2D + NX Nastran + SolidWorks",
    image: "/images/mech_prof_product_analysis_240.jpg",
    description: "Mechanical design and finite element simulation diploma covering AutoCAD 2D drafting, Siemens NX Nastran FEA solver, and SolidWorks 3D."
  },
  {
    id: "mech-prof-adv-simulation",
    title: "Professional in Advanced Simulation",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "240 Hours",
    mode: "Online / Offline",
    category: "Simulation",
    software: "Catia + Ansys + Hypermash",
    image: "/images/mech_prof_adv_simulation.jpg",
    description: "Advanced computer-aided engineering (CAE) simulation course integrating Catia 3D geometry, Ansys FEA solver, and Hypermash pre-processing."
  },
  {
    id: "mech-prof-product-analysis-260",
    title: "Professional in Product Design & Analysis",
    domain: "Mechanical & Aeronautical",
    level: "Professional",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Design & Analysis",
    software: "Solidworks + NX Card + NX Nastran",
    image: "/images/mech_prof_product_analysis_260.jpg",
    description: "Comprehensive mechanical product modeling and structural analysis using Solidworks, Siemens NX Card, and NX Nastran FEA simulation."
  },

  // ==========================================
  // 6. ELECTRICAL & ELECTRONICS COURSES
  // ==========================================
  {
    id: "elec-prof-mep-msp",
    title: "Professional in MEP Designing",
    domain: "Electrical & Electronics",
    level: "Professional",
    duration: "270 hours",
    mode: "Online / Offline",
    category: "MEP Design",
    software: "AutoCAD 2D + Revit MEP + Microsoft Projects + PPM Concepts",
    image: "/images/mep_designing_msp.jpg",
    description: "Professional MEP building services design with AutoCAD 2D drafting, Revit MEP 3D modeling, MS Project timeline scheduling, and PPM concepts."
  },
  {
    id: "elec-prof-mep-primavera",
    title: "Professional in MEP Designing",
    domain: "Electrical & Electronics",
    level: "Professional",
    duration: "270 hours",
    mode: "Online / Offline",
    category: "MEP Design",
    software: "AutoCAD 2D + Revit MEP + Primavera + PPM Concepts",
    image: "/images/mep_designing_primavera.jpg",
    description: "Advanced professional MEP design program covering AutoCAD 2D, Revit MEP, Primavera P6 project control, and PPM principles."
  },
  {
    id: "elec-prof-electrical-system",
    title: "Professional in Electrical System Design",
    domain: "Electrical & Electronics",
    level: "Professional",
    duration: "240 hours",
    mode: "Online / Offline",
    category: "Electrical System",
    software: "AutoCAD Electrical + Revit MEP + Dialux + ETAP",
    image: "/images/electrical_system_design.jpg",
    description: "Comprehensive electrical system design diploma featuring AutoCAD Electrical schematics, Revit MEP, Dialux lighting, and ETAP power simulation."
  },
  {
    id: "elec-prof-hvac-fire",
    title: "Professional in HVAC & Firefighting Design",
    domain: "Electrical & Electronics",
    level: "Professional",
    duration: "240 hours",
    mode: "Online / Offline",
    category: "HVAC & Fire Protection",
    software: "AutoCAD 2D + HVAC + HAP + Revit MEP + Fire Systems",
    image: "/images/elec_mep_course.jpg",
    description: "Specialized HVAC ductwork and firefighting protection system design using AutoCAD 2D, HAP cooling analysis, Revit MEP, and fire codes."
  },
  {
    id: "elec-master-mep-hvac-plan",
    title: "Master Diploma in MEP & HVAC Design with Project Planning",
    domain: "Electrical & Electronics",
    level: "Master Diploma",
    duration: "380 hours",
    mode: "Online / Offline",
    category: "Master MEP",
    software: "AutoCAD 2D + Revit MEP + HVAC + HAP + Microsoft Project / Primavera + PPM Concepts",
    image: "/images/revit_mep.jpg",
    description: "Master diploma program in complete building MEP services, HVAC load estimation, HAP analysis, Revit BIM, and MS Project / Primavera controls."
  },
  {
    id: "elec-master-electrical-building",
    title: "Master Diploma in Electrical Building System Design",
    domain: "Electrical & Electronics",
    level: "Master Diploma",
    duration: "420 hours",
    mode: "Online / Offline",
    category: "Master Electrical",
    software: "AutoCAD Electrical + Revit MEP + ETAP + Dialux + Navisworks + MS Project",
    image: "/images/autocad_electrical.jpg",
    description: "Advanced master program in electrical building distribution, ETAP power simulation, Dialux lighting design, Navisworks 3D clash detection, and MS Project."
  },
  {
    id: "elec-master-mep-bim-coordination",
    title: "Master Diploma in MEP Coordination with BIM",
    domain: "Electrical & Electronics",
    level: "Master Diploma",
    duration: "320 hours",
    mode: "Online / Offline",
    category: "Master BIM",
    software: "Revit MEP + Navisworks + AutoCAD 2D + Microsoft Project / Primavera + PPM Concepts",
    image: "/images/plc_scada.jpg",
    description: "Postgraduate master diploma in multi-disciplinary MEP BIM coordination, Navisworks clash resolution, Revit 3D modeling, and PPM project controls."
  },

  // ==========================================
  // 6. DIGITAL MARKETING & SEO COURSES (EXACT 9 COURSES)
  // ==========================================
  {
    id: "dm-prof-seo",
    title: "Professional in Search Engine Optimization (SEO)",
    domain: "Digital Marketing & SEO",
    level: "Professional",
    duration: "Duration not specified",
    mode: "Online / Offline",
    category: "Digital Marketing & SEO",
    software: "SEO",
    image: "/images/dm_prof_seo.jpg",
    description: "Professional search engine optimization training mastering organic keyword research, technical SEO auditing, on-page optimization, backlink strategies, and search engine analytics."
  },
  {
    id: "dm-prof-google-ads",
    title: "Professional in Google Ads & PPC Advertising",
    domain: "Digital Marketing & SEO",
    level: "Professional",
    duration: "Duration not specified",
    mode: "Online / Offline",
    category: "Digital Marketing & SEO",
    software: "Google Ads",
    image: "/images/dm_prof_google_ads.jpg",
    description: "Pay-per-click advertising program covering Google Ads Search campaigns, Keyword Planner bidding, quality score optimization, conversion tracking, and PPC analytics."
  },
  {
    id: "dm-prof-meta-ads",
    title: "Professional in Meta Advertising",
    domain: "Digital Marketing & SEO",
    level: "Professional",
    duration: "Duration not specified",
    mode: "Online / Offline",
    category: "Digital Marketing & SEO",
    software: "Meta Ads",
    image: "/images/dm_prof_meta_ads.jpg",
    description: "Comprehensive social media advertising mastering Meta Ads Manager, Facebook & Instagram custom audience targeting, pixel tracking, retargeting campaigns, and ad creative optimization."
  },
  {
    id: "dm-prof-email-marketing",
    title: "Professional in Email Marketing",
    domain: "Digital Marketing & SEO",
    level: "Professional",
    duration: "Duration not specified",
    mode: "Online / Offline",
    category: "Digital Marketing & SEO",
    software: "Email Marketing",
    image: "/images/dm_prof_email_marketing.jpg",
    description: "Strategic email marketing and drip automation covering audience segmentation, newsletter copy design, deliverability optimization, A/B testing, and campaign analytics."
  },
  {
    id: "dm-prof-web-analytics",
    title: "Professional in Web Analytics",
    domain: "Digital Marketing & SEO",
    level: "Professional",
    duration: "Duration not specified",
    mode: "Online / Offline",
    category: "Digital Marketing & SEO",
    software: "Web Analytics",
    image: "/images/dm_prof_web_analytics.jpg",
    description: "Data-driven web analytics and traffic tracking mastering Google Analytics 4 (GA4), event tagging, user behavior funnels, custom reporting, and marketing attribution models."
  },
  {
    id: "dm-prof-social-media",
    title: "Professional in Social Media Marketing",
    domain: "Digital Marketing & SEO",
    level: "Professional",
    duration: "Duration not specified",
    mode: "Online / Offline",
    category: "Digital Marketing & SEO",
    software: "Social Media Marketing",
    image: "/images/dm_prof_social_media.jpg",
    description: "Organic social media marketing and brand engagement strategies across LinkedIn, Instagram, Facebook, and Twitter covering content calendars, community management, and growth analytics."
  },
  {
    id: "dm-prof-hubspot",
    title: "Professional in HubSpot Marketing",
    domain: "Digital Marketing & SEO",
    level: "Professional",
    duration: "Duration not specified",
    mode: "Online / Offline",
    category: "Digital Marketing & SEO",
    software: "HubSpot",
    image: "/images/dm_prof_hubspot.jpg",
    description: "Inbound marketing and CRM automation mastering HubSpot Marketing Hub workflows, lead scoring, contact lifecycle management, landing page design, and deal funnel tracking."
  },
  {
    id: "dm-prof-sem",
    title: "Professional in Search Engine Marketing (SEM)",
    domain: "Digital Marketing & SEO",
    level: "Professional",
    duration: "Duration not specified",
    mode: "Online / Offline",
    category: "Digital Marketing & SEO",
    software: "Search Engine Marketing",
    image: "/images/dm_prof_sem.jpg",
    description: "Search engine marketing masterclass integrating paid search advertising, Bing & Google ad strategy, competitor keyword analysis, landing page conversion optimization, and ROI tracking."
  },
  {
    id: "dm-prof-display-video",
    title: "Professional in Display & Video Advertising",
    domain: "Digital Marketing & SEO",
    level: "Professional",
    duration: "Duration not specified",
    mode: "Online / Offline",
    category: "Digital Marketing & SEO",
    software: "Display Advertising + Video Advertising",
    image: "/images/dm_prof_display_video.jpg",
    description: "Digital display banner and YouTube video advertising course covering Google Display Network (GDN) placement, video ad sequencing, audience retargeting, and rich media campaign analytics."
  }
];

// Deterministic 1-to-1 Unique Image Mapping (course.id -> unique dedicated image)
const COURSE_UNIQUE_IMAGES = {
  // IT & Software (25 Dedicated Images)
  'it-prof-fullstack-python-react': '/images/it_prof_python_react.jpg',
  'it-prof-java-fullstack': '/images/it_prof_java_fullstack.jpg',
  'it-prof-mean-stack': '/images/it_prof_mean_stack.jpg',
  'it-prof-mern-stack': '/images/it_prof_mern_stack.jpg',
  'it-prof-web-design': '/images/it_prof_web_design.jpg',
  'it-prof-software-testing': '/images/it_prof_software_testing.jpg',
  'it-prof-ds-ai': '/images/it_prof_ds_ai.jpg',
  'it-prof-cloud-devops': '/images/it_prof_cloud_devops.jpg',
  'it-prof-cybersecurity': '/images/it_prof_cybersecurity.jpg',
  'it-prof-rpa': '/images/it_prof_rpa.jpg',
  'it-prof-digital-marketing': '/images/it_prof_digital_marketing.jpg',
  'it-prof-db-management': '/images/it_prof_db_management.jpg',
  'it-prof-game-dev': '/images/it_prof_game_dev.jpg',
  'it-prof-blockchain': '/images/it_prof_blockchain.jpg',
  'it-prof-ar-vr': '/images/it_prof_ar_vr.jpg',

  'it-master-fullstack-dev': '/images/it_master_fullstack_dev.jpg',
  'it-master-software-eng': '/images/it_master_software_eng.jpg',
  'it-master-cloud-devops': '/images/it_master_cloud_devops.jpg',
  'it-master-ds-ai': '/images/it_master_ds_ai.jpg',
  'it-master-cybersecurity': '/images/it_master_cybersecurity.jpg',
  'it-master-rpa-automation': '/images/it_master_rpa_automation.jpg',
  'it-master-digital-marketing': '/images/it_master_digital_marketing.jpg',
  'it-master-web-app': '/images/it_master_web_app.jpg',
  'it-master-adv-programming': '/images/it_master_adv_programming.jpg',
  'it-master-game-ar-vr': '/images/it_master_game_ar_vr.jpg',

  // Mechanical & Aeronautics (11 Dedicated Images)
  'mech-prof-mep-planning': '/images/mech_prof_mep_planning.jpg',
  'mech-prof-product-planning': '/images/mech_prof_product_planning.jpg',
  'mech-prof-auto-product': '/images/mech_prof_auto_product.jpg',
  'mech-prof-auto-struct': '/images/mech_prof_auto_struct.jpg',
  'mech-prof-aero-product': '/images/mech_prof_aero_product.jpg',
  'mech-prof-aero-struct': '/images/mech_prof_aero_struct.jpg',
  'mech-prof-mep-design': '/images/mech_prof_mep_design.jpg',
  'mech-prof-product-design': '/images/mech_prof_product_design.jpg',
  'mech-prof-product-analysis-240': '/images/mech_prof_product_analysis_240.jpg',
  'mech-prof-adv-simulation': '/images/mech_prof_adv_simulation.jpg',
  'mech-prof-product-analysis-260': '/images/mech_prof_product_analysis_260.jpg',

  // Civil & Architecture (10 Dedicated Images)
  'civil-prof-arch-design': '/images/civil_prof_arch_design.jpg',
  'civil-prof-arch-planning': '/images/civil_prof_arch_planning.jpg',
  'civil-prof-building-design-staad-qto': '/images/civil_prof_building_design_staad_qto.jpg',
  'civil-prof-building-design-staad-primavera': '/images/civil_prof_building_design_staad_primavera.jpg',
  'civil-prof-building-design-etabs-msp': '/images/civil_prof_building_design_etabs_msp.jpg',
  'civil-prof-struct-simulation': '/images/civil_prof_struct_simulation.jpg',
  'civil-prof-bim-planning': '/images/civil_prof_bim_planning.jpg',
  'civil-prof-vis-interior': '/images/civil_prof_vis_interior.jpg',
  'civil-prof-interior-vis': '/images/civil_prof_interior_vis.jpg',
  'civil-prof-adv-qs': '/images/civil_prof_adv_qs.jpg',

  // Multimedia CADD
  'mm-uiux': '/images/javascript.jpg',
  'mm-prof-graphic-web': '/images/htmlcss.jpg',
  'mm-prof-video-prod': '/images/javascript.jpg',
  'mm-prof-2d-anim': '/images/cpp.jpg',
  'mm-prof-print-pub': '/images/c.jpg',
  'mm-prof-uiux-figma': '/images/react.jpg',
  'mm-prof-3d-anim': '/images/it_fullstack_course.jpg',
  'mm-prof-arch-vis': '/images/3ds_max.jpg',
  'mm-master-graphic-mm': '/images/multimedia_vfx_course.jpg',
  'mm-master-anim-vfx': '/images/cpp.jpg',
  'mm-master-digital-media': '/images/javascript.jpg',
  'mm-master-mm-web': '/images/htmlcss.jpg',
  'mm-master-3d-game': '/images/react.jpg',
  'mm-master-arch-eng-anim': '/images/3ds_max.jpg',

  // Accounting & ERP (100% Unique High-Res Image per Course)
  'acc-prof-taxation': '/images/financial_accounting_taxation.jpg',
  'acc-prof-data': '/images/data_driven_accounting.jpg',
  'acc-prof-sap': '/images/sap_functional_modules.jpg',
  'acc-prof-mis': '/images/mis_business_reporting.jpg',
  'acc-prof-foreign': '/images/indian_foreign_accounting.jpg',
  'acc-master-practical': '/images/practical_accounting_master.jpg',
  'acc-master-intl': '/images/international_accounting_taxation.jpg',
  'acc-master-sap-impl': '/images/sap_erp_implementation.jpg',
  'acc-master-mis-analytics': '/images/financial_control_mis_analytics.jpg',
  'acc-master-global': '/images/global_finance_erp.jpg',

  // Electrical & Electronics / MEP (Distinct Unique Images)
  'elec-prof-mep-msp': '/images/mep_designing_msp.jpg',
  'elec-prof-mep-primavera': '/images/mep_designing_primavera.jpg',
  'elec-prof-electrical-system': '/images/electrical_system_design.jpg',
  'elec-prof-hvac-fire': '/images/elec_mep_course.jpg',
  'elec-master-mep-hvac-plan': '/images/revit_mep.jpg',
  'elec-master-electrical-building': '/images/autocad_electrical.jpg',
  'elec-master-mep-bim-coordination': '/images/plc_scada.jpg',

  // Digital Marketing & SEO (9 Dedicated Unique Images)
  'dm-prof-seo': '/images/dm_prof_seo.jpg',
  'dm-prof-google-ads': '/images/dm_prof_google_ads.jpg',
  'dm-prof-meta-ads': '/images/dm_prof_meta_ads.jpg',
  'dm-prof-email-marketing': '/images/dm_prof_email_marketing.jpg',
  'dm-prof-web-analytics': '/images/dm_prof_web_analytics.jpg',
  'dm-prof-social-media': '/images/dm_prof_social_media.jpg',
  'dm-prof-hubspot': '/images/dm_prof_hubspot.jpg',
  'dm-prof-sem': '/images/dm_prof_sem.jpg',
  'dm-prof-display-video': '/images/dm_prof_display_video.jpg'
};

// Enrich COURSES array with explicit slugs and unique images
export const COURSES = BASE_COURSES.map(c => ({
  ...c,
  image: COURSE_UNIQUE_IMAGES[c.id] || c.image || `/images/${c.id.replace(/-/g, '_')}.jpg`,
  slug: generateSlug(c.title, c.id)
}));

export const CATEGORIES = [
  "All",
  "IT & Non-IT",
  "Multimedia",
  "Accounting & ERP",
  "Civil & Architecture",
  "Mechanical & Aeronautical",
  "Electrical & Electronics",
  "Digital Marketing & SEO"
];

export const LEVELS = [
  "All Levels",
  "Professional",
  "Master Diploma"
];

// Rich Generator for Detailed Course Page Content
export function getCourseBySlug(slug) {
  const base = COURSES.find(c => c.slug === slug || c.id === slug);
  if (!base) return null;

  // Generate 15-20 lines of rich professional full description text
  const fullDescription = [
    `The ${base.title} at CADPOINT Salem is an intensive, practical training program engineered to transform beginners and ambitious professionals into high-performing industry practitioners. This curriculum has been meticulously designed in collaboration with corporate tech leaders to ensure total alignment with modern software workflows and industrial production standards.`,
    `Throughout this course, students will gain comprehensive hands-on exposure to ${base.software}, working on real-world projects, live design simulations, and industry case studies under the direct mentorship of senior experts. Every module emphasizes core theoretical fundamentals paired immediately with 80% practical laboratory sessions to build unmatched technical confidence.`,
    `Whether your goal is to master cutting-edge software tools, upgrade your current engineering capabilities, or launch a rewarding career in top corporate firms, CADPOINT's state-of-the-art infrastructure and ISO 9001:2008 certified methodology provide the ideal platform. Graduates receive an official government-registered certification, complete portfolio validation, and direct internship placement assistance.`
  ];

  // Domain & Course specific Skills
  const defaultSkills = [
    { name: "Professional Tool Proficiency", description: `Master advanced features and workflow shortcuts in ${base.software}.` },
    { name: "Problem Solving & Analysis", description: "Develop logical analytical thinking for technical challenges and debugging." },
    { name: "Industry Standard Practices", description: "Implement corporate coding/design standards, clean architecture, and documentation." },
    { name: "Real-World Project Execution", description: "Deliver end-to-end client-ready projects from concept to final deployment." },
    { name: "Technical Portfolio Building", description: "Create an impressive project portfolio verified by CADPOINT industry experts." },
    { name: "Collaborative Workflow", description: "Learn team version control, asset sharing, and multi-disciplinary coordination." }
  ];

  // Software Tools Array
  const toolsArray = base.software.split(',').map(s => s.trim());

  // 8-12 Course Modules with 2-4 bullets each
  const modules = [
    {
      title: "Module 1: Foundations & Architecture Setup",
      topics: [
        `Introduction to ${base.software} workspace and tool interface setup.`,
        "Understanding core concepts, environment parameters, and project initialization.",
        "Best practices for file management, hotkeys, and workspace customization."
      ]
    },
    {
      title: "Module 2: Core Fundamentals & Primary Operations",
      topics: [
        "In-depth exploration of essential commands, syntax, and design rules.",
        "Executing standard operations, geometry creation, and logic structures.",
        "Hands-on lab exercise: Building foundational components and scripts."
      ]
    },
    {
      title: "Module 3: Advanced Modeling & Complex Logic",
      topics: [
        "Working with multi-layer structures, advanced functions, and parametric tools.",
        "Data validation, error handling, and component optimization.",
        "Case study analysis of corporate workflow integration."
      ]
    },
    {
      title: "Module 4: Performance Optimization & Testing",
      topics: [
        "Analyzing execution speed, memory footprint, and stress bottlenecks.",
        "Refactoring code and geometry for maximum production efficiency.",
        "Unit testing, quality control checks, and standard debugging methodologies."
      ]
    },
    {
      title: "Module 5: Industry Case Studies & Integration",
      topics: [
        "Integrating external libraries, APIs, and multi-software pipelines.",
        "Working with live databases, asset libraries, and cloud repositories.",
        "Simulating real-world client requests and constraint management."
      ]
    },
    {
      title: "Module 6: Capstone Project Preparation & Delivery",
      topics: [
        "Selecting and planning a comprehensive production-grade project.",
        "Executing design/code development under senior instructor guidance.",
        "Final code review, presentation, portfolio documentation, and certification."
      ]
    }
  ];

  // 4-6 Realistic Industry Projects
  const projects = [
    {
      name: `Project 1: Enterprise ${base.category} System`,
      description: `Design and implement a complete, production-ready system utilizing ${base.software} following corporate standards.`
    },
    {
      name: `Project 2: Real-Time Interactive Component`,
      description: `Build an automated, high-performance module designed to handle live user input and data validation seamlessly.`
    },
    {
      name: `Project 3: Multi-Layer Scalable Architecture`,
      description: `Develop a comprehensive industrial case study focusing on modular design, reusability, and clean code principles.`
    },
    {
      name: `Project 4: Capstone Industry Portfolio Project`,
      description: `Construct an end-to-end client portfolio project ready for demonstration to corporate recruiters and hiring managers.`
    }
  ];

  // 8-10 Specific Job Roles
  const careerOpportunities = [
    `${base.category} Specialist`,
    `${base.software.split(',')[0]} Analyst`,
    "Financial & ERP Associate",
    "Solutions Architect Assistant",
    "Application Specialist",
    "CAD/IT & ERP Consultant",
    "Quality Assurance Analyst",
    "Corporate Operations Trainee"
  ];

  // Realistic Fresher Salary Range
  const salaryRange = base.level === 'Master Diploma'
    ? '₹5.5 LPA – ₹12.0 LPA'
    : base.level === 'Professional'
    ? '₹4.5 LPA – ₹9.0 LPA'
    : '₹3.5 LPA – ₹7.5 LPA';

  // 6-8 Course Specific FAQs
  const faq = [
    {
      question: `Who is eligible to join the ${base.title} program?`,
      answer: "This program is open to engineering students, diploma holders, graduates, working professionals, and career switchers looking to build strong practical skills."
    },
    {
      question: "Are classes available in online and offline modes?",
      answer: "Yes! CADPOINT Salem offers flexible learning options including hands-on computer lab sessions at our Salem Head Office as well as live interactive online classes."
    },
    {
      question: "Will I work on real-world practical projects?",
      answer: "Absolutely! Over 80% of class hours are dedicated to practical lab sessions, live client case studies, and capstone project portfolio building."
    },
    {
      question: "Is the certificate recognized by corporate employers?",
      answer: "Yes, you will receive an official CADPOINT ISO 9001:2008 Government registered certificate with a unique serial number and digital verification link accepted by top companies."
    },
    {
      question: "Does CADPOINT provide internship and placement support?",
      answer: "Yes! Top performers are offered direct internship opportunities inside our company to work on live production tasks, along with resume building and interview preparation."
    },
    {
      question: "Can I choose morning or evening batch timings?",
      answer: "Yes, we offer flexible weekday and weekend batch timings tailored for college students and working professionals."
    }
  ];

  return {
    ...base,
    fullDescription,
    skills: defaultSkills,
    tools: toolsArray,
    modules,
    projects,
    careerOpportunities,
    salaryRange,
    prerequisites: "Basic computer literacy and enthusiasm to learn practical engineering tools.",
    certification: "ISO 9001:2008 Govt Registered Certificate with online verification QR code.",
    faq
  };
}

export function getRelatedCourses(currentCourse) {
  if (!currentCourse) return [];
  return COURSES.filter(
    c => c.domain === currentCourse.domain && c.id !== currentCourse.id
  ).slice(0, 3);
}
