// Helper function to generate clean, readable slugs
export const generateSlug = (title, id) => {
  const customSlugs = {
    'it-python': 'python-programming',
    'it-java': 'java-programming',
    'it-c': 'c-programming',
    'it-cpp': 'cpp-programming',
    'it-js': 'javascript-essentials',
    'it-htmlcss': 'html-css-web-design',
    'it-react': 'react-basics',
    'it-node': 'node-js-basics',
    'it-mongodb': 'mongodb-database',
    'it-aws': 'aws-essentials',
    'it-docker': 'docker-containerization',
    'it-k8s': 'kubernetes-devops',
    'it-ml': 'machine-learning-python',
    'it-powerbi': 'power-bi-analytics',
    'it-prof-python': 'full-stack-python-react',
    'it-prof-java': 'java-full-stack-spring-boot',
    'it-prof-mern': 'mern-stack-development',
    'it-prof-ds': 'data-science-ai',
    'it-prof-devops': 'cloud-devops-engineering',
    'it-master-fullstack': 'master-diploma-full-stack',
    'it-master-ds': 'master-diploma-data-science',
    
    // Official IT & Software Slugs
    'it-prof-fullstack-python-react': 'professional-program-full-stack-python-react',
    'it-prof-java-fullstack': 'professional-program-java-full-stack',
    'it-prof-mean-stack': 'professional-program-mean-stack',
    'it-prof-mern-stack': 'professional-program-mern-stack',
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

    'it-master-fullstack-dev': 'master-diploma-full-stack-development',
    'it-master-software-eng': 'master-diploma-software-engineering',
    'it-master-cloud-devops': 'master-diploma-cloud-computing-devops',
    'it-master-ds-ai': 'master-diploma-data-science-ai',
    'it-master-cybersecurity': 'master-diploma-cybersecurity-penetration-testing',
    'it-master-rpa-automation': 'master-diploma-rpa-automation',
    'it-master-digital-marketing': 'master-diploma-digital-marketing-analytics',
    'it-master-web-app': 'master-diploma-web-app-development',
    'it-master-adv-programming': 'master-diploma-advanced-programming',
    'it-master-game-ar-vr': 'master-diploma-game-ar-vr-development',

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

    'civil-cad-2d': 'autocad-2d-civil',
    'civil-cad-3d': 'autocad-3d-civil',
    'civil-microstation': 'microstation-civil',
    'civil-archicad': 'archicad-bim',
    'civil-revit-arch': 'revit-architecture',
    'civil-bim-cert': 'building-information-modeling-bim',
    'civil-3dsmax': '3ds-max-architectural-visualization',
    'civil-staad': 'staad-pro-structural-design',
    'civil-etabs': 'etabs-structural-analysis',
    'civil-navisworks': 'navisworks-bim-coordination',
    'civil-tekla-detail': 'tekla-structural-detailing',
    'civil-vray': 'vray-rendering-architecture',
    'civil-sketchup': 'sketchup-3d-modeling',
    'civil-civil3d': 'civil-3d-land-survey',
    'civil-ansys-fea': 'ansys-structural-fea',
    'civil-dip-autocad': 'diploma-autocad-civil',
    'civil-dip-bim': 'diploma-bim-design',
    'civil-dip-rcc-etabs': 'diploma-rcc-structural-design',
    'civil-dip-steel-tekla': 'diploma-steel-structure-tekla',
    'civil-dip-interior': 'diploma-interior-designing',
    'civil-dip-estimation': 'diploma-estimation-costing',
    'civil-dip-roadway': 'diploma-roadway-design',
    'civil-prof-arch': 'professional-architectural-design',
    'civil-prof-building-staad': 'professional-building-design',
    'civil-prof-transport': 'professional-transportation-design',
    'civil-master-arch': 'master-diploma-architectural-design',
    'civil-master-struct': 'master-diploma-structural-engineering',
    'civil-master-bim': 'master-diploma-bim-engineering',
    'mech-autocad-2d': 'autocad-2d-mechanical',
    'mech-solidworks': 'solidworks-3d-design',
    'mech-catia': 'catia-v5-design',
    'mech-creo': 'creo-parametric',
    'mech-ansys-wb': 'ansys-workbench-fea',
    'mech-ansys-fluent': 'ansys-fluent-cfd',
    'mech-hypermesh': 'hypermesh-fea',
    'mech-inventor': 'autodesk-inventor',
    'mech-gdt': 'gdt-standards',
    'mech-pdms': 'pdms-piping-plant',
    'mech-cnc-cam': 'cnc-cam-mastercam',
    'mech-aero-cad': 'aeronautical-cad-design',
    'mech-auto-cad': 'automobile-cad-design',
    'mech-dip-draft-3d': 'diploma-mechanical-drafting-3d',
    'mech-dip-cam': 'diploma-nx-cam-cnc',
    'mech-dip-piping': 'diploma-piping-design',
    'mech-prof-cam-cnc': 'professional-cam-cnc',
    'mech-master-cad': 'master-diploma-mechanical-cad',
    'mech-master-aero': 'master-diploma-aerospace-design',
    'elec-eplan': 'electrical-wiring-harness-eplan',
    'elec-etap': 'etap-power-systems',
    'elec-dialux': 'dialux-lighting-design',
    'elec-dip-cad': 'diploma-electrical-cad',
    'elec-dip-mep-hvac': 'diploma-hvac-mep-design',
    'elec-dip-building': 'diploma-electrical-building-services',
    'elec-prof-mep': 'professional-mep-designing',
    'elec-master-mep-bim': 'master-diploma-mep-hvac'
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
  // 1. IT & NON-IT COURSES
  // ==========================================
  {
    id: "it-python",
    title: "Certificate in Python Programming",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Languages",
    software: "Python, VS Code, Git",
    image: "/images/python.jpg",
    description: "Foundational Python programming concepts, object-oriented principles, and hands-on algorithm exercises."
  },
  {
    id: "it-java",
    title: "Certificate in Java Programming",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Languages",
    software: "Java, Eclipse, Maven",
    image: "/images/java.jpg",
    description: "Java basics, object-oriented concepts, multithreading, and core application development."
  },
  {
    id: "it-c",
    title: "Certificate in C Programming",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Languages",
    software: "C, GCC, Code::Blocks",
    image: "/images/c.jpg",
    description: "C language fundamentals, pointers, memory management, and procedural programming."
  },
  {
    id: "it-cpp",
    title: "Certificate in C++ Programming",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Languages",
    software: "C++, STL, CLion",
    image: "/images/cpp.jpg",
    description: "C++ syntax, Object-Oriented Programming (OOP) principles, Templates, and Standard Template Library."
  },
  {
    id: "it-js",
    title: "Certificate in JavaScript Essentials",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Web Designing",
    software: "JavaScript ES6+, DevTools, Node.js",
    image: "/images/javascript.jpg",
    description: "Modern JavaScript (ES6+), DOM manipulation, asynchronous programming, and web app logic."
  },
  {
    id: "it-htmlcss",
    title: "Certificate in HTML & CSS",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Web Designing",
    software: "HTML5, CSS3, Flexbox, Grid",
    image: "/images/htmlcss.jpg",
    description: "Semantic HTML5, CSS3 styling, responsive layouts, Flexbox, Grid, and cross-browser design."
  },
  {
    id: "it-react",
    title: "Certificate in React Basics",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Frameworks",
    software: "React 19, Vite, JSX, Tailwind CSS",
    image: "/images/react.jpg",
    description: "React fundamentals: component lifecycle, hooks, state management, router, and SPA architecture."
  },
  {
    id: "it-node",
    title: "Certificate in Node.js Basics",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Frameworks",
    software: "Node.js, Express.js, REST APIs",
    image: "/images/node.jpg",
    description: "Node.js runtime, asynchronous event loop, Express backend routes, and REST API development."
  },
  {
    id: "it-mongodb",
    title: "Certificate in MongoDB",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Database",
    software: "MongoDB, Compass, Mongoose",
    image: "/images/mongodb.jpg",
    description: "NoSQL document database design, CRUD operations, aggregation pipelines, and indexing."
  },
  {
    id: "it-aws",
    title: "Certificate in AWS Essentials",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Cloud Computing",
    software: "AWS Console, EC2, S3, Lambda, IAM",
    image: "/images/aws.jpg",
    description: "Core AWS cloud services: EC2 instances, S3 storage, IAM security, Lambda, and VPC networking."
  },
  {
    id: "it-docker",
    title: "Certificate in Docker",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "DevOps",
    software: "Docker Engine, Dockerfile, Docker Compose",
    image: "/images/docker.jpg",
    description: "Containerization fundamentals, writing Dockerfiles, image building, container networking, and Compose."
  },
  {
    id: "it-k8s",
    title: "Certificate in Kubernetes",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "DevOps",
    software: "Kubernetes, kubectl, Helm, Minikube",
    image: "/images/kubernetes.jpg",
    description: "Container orchestration, Pods, Deployments, Services, ConfigMaps, and cluster management."
  },
  {
    id: "it-ml",
    title: "Certificate in Machine Learning",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Database & AI",
    software: "Python, Scikit-Learn, NumPy, Pandas",
    image: "/images/machine_learning.jpg",
    description: "Machine Learning foundations, supervised and unsupervised algorithms, regression, and classification."
  },
  {
    id: "it-powerbi",
    title: "Certificate in Power BI Basics",
    domain: "IT & Non-IT",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Database & AI",
    software: "Power BI Desktop, DAX, Query Editor",
    image: "/images/machine_learning.jpg",
    description: "Power BI essentials for business analytics, DAX formulas, interactive dashboards, and automated reports."
  },
  {
    id: "it-prof-python",
    title: "Professional Program in Full Stack Development – Python & React",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Full Stack",
    software: "Python, Django, React, PostgreSQL, Git",
    image: "/images/python.jpg",
    description: "Complete full-stack engineering covering Python, Django REST framework, React UI, and PostgreSQL deployment."
  },
  {
    id: "it-prof-java",
    title: "Professional Program in Java Full Stack",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Full Stack",
    software: "Java, Spring Boot, Angular, MySQL",
    image: "/images/java.jpg",
    description: "Enterprise Java full stack training with Spring Boot microservices, REST APIs, and Angular frontend."
  },
  {
    id: "it-prof-mern",
    title: "Professional Program in MERN Stack",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Full Stack",
    software: "MongoDB, Express, React, Node.js",
    image: "/images/react.jpg",
    description: "Complete MERN stack professional development with real-time state management and production cloud deployment."
  },
  {
    id: "it-prof-ds",
    title: "Professional Program in Data Science & AI",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "AI & Analytics",
    software: "Python, Pandas, TensorFlow, Tableau, SQL",
    image: "/images/machine_learning.jpg",
    description: "In-depth data science training covering data modeling, exploratory analysis, neural networks, and AI deployment."
  },
  {
    id: "it-prof-devops",
    title: "Professional Program in Cloud & DevOps",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "DevOps",
    software: "AWS, Azure, Docker, Kubernetes, Jenkins, Terraform",
    image: "/images/kubernetes.jpg",
    description: "Cloud & DevOps engineering covering CI/CD pipelines, Infrastructure as Code, Kubernetes clusters, and security."
  },
  {
    id: "it-master-fullstack",
    title: "Master Diploma in Full Stack Development",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Engineering",
    software: "Full Stack Suite, Cloud, Microservices, DevOps",
    image: "/images/node.jpg",
    description: "Master-level software engineering covering multi-tier architecture, system design, cloud microservices, and live client projects."
  },
  {
    id: "it-master-ds",
    title: "Master Diploma in Data Science & AI",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "280 hours",
    mode: "Online / Offline",
    category: "Master Engineering",
    software: "Python, PyTorch, Deep Learning, Big Data, Spark",
    image: "/images/machine_learning.jpg",
    description: "Advanced master program in deep learning, neural networks, NLP, Computer Vision, and big data ecosystems."
  },

  // Additional Official IT Professional Programs (15)
  {
    id: "it-prof-fullstack-python-react",
    title: "Professional Program in Full Stack Development - Python & React",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Full Stack",
    software: "HTML, CSS, Javascript, Python, React",
    image: "/images/python.jpg",
    description: "Professional full stack development course covering HTML, CSS, JavaScript, Python backend logic, and React single-page frontend application building."
  },
  {
    id: "it-prof-java-fullstack",
    title: "Professional Program in Java Full Stack",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Full Stack",
    software: "HTML, CSS, Javascript, Java, Spring Boot",
    image: "/images/java.jpg",
    description: "Enterprise Java full stack engineering training with Spring Boot microservices, REST API integration, and web frontend interfaces."
  },
  {
    id: "it-prof-mean-stack",
    title: "Professional Program in MEAN Stack",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Full Stack",
    software: "MongoDB, Express.js, Angular, Node.js",
    image: "/images/mongodb.jpg",
    description: "Full stack web development using the MEAN stack: MongoDB database design, Express server, Angular TypeScript frontend, and Node runtime."
  },
  {
    id: "it-prof-mern-stack",
    title: "Professional Program in MERN Stack",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Full Stack",
    software: "MongoDB, Express.js, React, Node.js",
    image: "/images/react.jpg",
    description: "Complete MERN stack professional engineering with MongoDB NoSQL, Express REST routing, React component UI, and Node backend deployment."
  },
  {
    id: "it-prof-web-design",
    title: "Professional Program in Advanced Web Designing",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "180 hours",
    mode: "Online / Offline",
    category: "Web Designing",
    software: "HTML, CSS, Bootstrap, Javascript, jQuery",
    image: "/images/htmlcss.jpg",
    description: "Responsive web design masterclass covering HTML5 semantics, CSS3 grid systems, Bootstrap frameworks, JavaScript DOM, and jQuery interactions."
  },
  {
    id: "it-prof-software-testing",
    title: "Professional Program in Software Testing",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "QA & Testing",
    software: "Manual Testing, Selenium, JMeter, QTP",
    image: "/images/c.jpg",
    description: "Software quality assurance engineering covering manual test case execution, automated Selenium WebDriver scripts, JMeter performance testing, and QTP/UFT."
  },
  {
    id: "it-prof-ds-ai",
    title: "Professional Program in Data Science & AI",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "AI & Analytics",
    software: "Python, Machine Learning, Tableau, Power BI",
    image: "/images/machine_learning.jpg",
    description: "Data science and artificial intelligence course featuring Python algorithms, Machine Learning models, Tableau business intelligence, and Power BI dashboards."
  },
  {
    id: "it-prof-cloud-devops",
    title: "Professional Program in Cloud & DevOps",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "DevOps",
    software: "AWS, Azure, Docker, Jenkins",
    image: "/images/kubernetes.jpg",
    description: "Cloud computing and DevOps engineering with AWS cloud infrastructure, Azure administration, Docker containerization, and Jenkins CI/CD pipelines."
  },
  {
    id: "it-prof-cybersecurity",
    title: "Professional Program in Cybersecurity & Ethical Hacking",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Cybersecurity",
    software: "Wireshark, Metasploit, Burp Suite, Mimikatz",
    image: "/images/docker.jpg",
    description: "Ethical hacking and network security professional diploma covering Wireshark packet capture, Metasploit exploitation, Burp Suite web audits, and Mimikatz."
  },
  {
    id: "it-prof-rpa",
    title: "Professional Program in RPA Tools",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Automation",
    software: "UI Path, Blue Prism, Automation Anywhere",
    image: "/images/aws.jpg",
    description: "Robotic Process Automation (RPA) engineering with UiPath Studio workflows, Blue Prism enterprise bots, and Automation Anywhere digital workforce automation."
  },
  {
    id: "it-prof-digital-marketing",
    title: "Professional Program in Digital Marketing",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "180 hours",
    mode: "Online / Offline",
    category: "Marketing",
    software: "SEO, Google Ads, Email Marketing, Analytics",
    image: "/images/javascript.jpg",
    description: "Digital marketing strategies covering Search Engine Optimization (SEO), Google Ads campaigns, automated email marketing, and Google Analytics conversion tracking."
  },
  {
    id: "it-prof-db-management",
    title: "Professional Program in Database Management",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Database",
    software: "MySQL, MongoDB, Oracle, SQL Server",
    image: "/images/mongodb.jpg",
    description: "Database administration and SQL development covering MySQL relational schemas, MongoDB NoSQL collections, Oracle PL/SQL, and MS SQL Server query optimization."
  },
  {
    id: "it-prof-game-dev",
    title: "Professional Program in Game Development",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Gaming",
    software: "Unity, Unreal Engine, C#, Blender",
    image: "/images/cpp.jpg",
    description: "Interactive 2D/3D game engineering using Unity engine C# scripting, Unreal Engine C++ blueprints, and Blender 3D asset creation."
  },
  {
    id: "it-prof-blockchain",
    title: "Professional Program in Blockchain Development",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "Blockchain",
    software: "Blockchain, Solidity, Smart Contracts, Ethereum",
    image: "/images/node.jpg",
    description: "Decentralized blockchain engineering with Solidity smart contracts, Ethereum Virtual Machine (EVM), Web3 libraries, and decentralized applications (DApps)."
  },
  {
    id: "it-prof-ar-vr",
    title: "Professional Program in AR/VR Development",
    domain: "IT & Non-IT",
    level: "Professional",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "AR / VR",
    software: "Unity, ARKit, ARCore, 3D Modeling",
    image: "/images/it_fullstack_course.jpg",
    description: "Augmented and Virtual Reality development utilizing Unity AR Foundation, Apple ARKit, Google ARCore, spatial tracking, and 3D environment modeling."
  },

  // Additional Official IT Master Diploma Programs (10)
  {
    id: "it-master-fullstack-dev",
    title: "Master Diploma in Full Stack Development",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Software",
    software: "HTML, CSS, JavaScript, Python, Django, React, Node.js",
    image: "/images/node.jpg",
    description: "Postgraduate master software engineering diploma covering HTML/CSS/JS web UI, Python Django REST APIs, React SPA, Node microservices, and cloud deployment."
  },
  {
    id: "it-master-software-eng",
    title: "Master Diploma in Software Engineering",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Software",
    software: "Python, Java, C#, .NET, SQL Server, Git",
    image: "/images/python.jpg",
    description: "Master level software engineering curriculum covering multi-language programming in Python, Java, and C# .NET, enterprise SQL Server databases, and Git workflows."
  },
  {
    id: "it-master-cloud-devops",
    title: "Master Diploma in Cloud Computing & DevOps",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Cloud",
    software: "AWS, Azure, Docker, Kubernetes, Jenkins, Ansible",
    image: "/images/aws.jpg",
    description: "Master diploma in multi-cloud architecture and DevOps automation featuring AWS, Azure, Docker containers, Kubernetes orchestration, Jenkins pipelines, and Ansible configuration."
  },
  {
    id: "it-master-ds-ai",
    title: "Master Diploma in Data Science & AI",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "280 hours",
    mode: "Online / Offline",
    category: "Master AI",
    software: "Python, Machine Learning, Deep Learning, Tableau, Power BI, Hadoop",
    image: "/images/machine_learning.jpg",
    description: "Advanced postgraduate master diploma in deep neural networks, Python Machine Learning, Big Data Hadoop ecosystems, Tableau, and Power BI executive analytics."
  },
  {
    id: "it-master-cybersecurity",
    title: "Master Diploma in Cybersecurity & Penetration Testing",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Security",
    software: "Wireshark, Metasploit, Mimikatz, Kali Linux, Burp Suite, Cryptography",
    image: "/images/docker.jpg",
    description: "Postgraduate master diploma in offensive and defensive cybersecurity, Kali Linux penetration testing, vulnerability auditing, cryptography, and network forensics."
  },
  {
    id: "it-master-rpa-automation",
    title: "Master Diploma in RPA & Automation",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "240 hours",
    mode: "Online / Offline",
    category: "Master Automation",
    software: "UI Path, Blue Prism, Automation Anywhere, Power Automate",
    image: "/images/kubernetes.jpg",
    description: "Master level robotic process automation diploma covering enterpriseUiPath bot architecture, Blue Prism control rooms, Automation Anywhere, and Microsoft Power Automate."
  },
  {
    id: "it-master-digital-marketing",
    title: "Master Diploma in Digital Marketing & Analytics",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "240 hours",
    mode: "Online / Offline",
    category: "Master Marketing",
    software: "SEO, Google Ads, Email Marketing, Analytics, Social Media Marketing, HubSpot",
    image: "/images/javascript.jpg",
    description: "Postgraduate master diploma in multi-channel digital marketing, advanced SEO strategies, Google Ads PPC management, HubSpot CRM inbound marketing, and web analytics."
  },
  {
    id: "it-master-web-app",
    title: "Master Diploma in Web & App Development",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master App Dev",
    software: "HTML, CSS, Bootstrap, Angular, React Native, Firebase",
    image: "/images/react.jpg",
    description: "Master level web and cross-platform mobile application development with Angular TypeScript, React Native mobile UIs, Bootstrap, and Google Firebase cloud backend."
  },
  {
    id: "it-master-adv-programming",
    title: "Master Diploma in Advanced Programming",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "260 hours",
    mode: "Online / Offline",
    category: "Master Programming",
    software: "Python, Java, C++, Go, Swift, Git, Docker",
    image: "/images/cpp.jpg",
    description: "Master diploma in polyglot software engineering covering high-performance system programming in C++, Go, Swift iOS, Python, Java, Git, and Docker containers."
  },
  {
    id: "it-master-game-ar-vr",
    title: "Master Diploma in Game & AR/VR Development",
    domain: "IT & Non-IT",
    level: "Master Diploma",
    duration: "280 hours",
    mode: "Online / Offline",
    category: "Master Gaming",
    software: "Unity, Unreal Engine, Blender, ARKit, ARCore, C#",
    image: "/images/it_fullstack_course.jpg",
    description: "Complete postgraduate master diploma in 3D game engine development, Unreal Engine C++ blueprints, Blender 3D modeling, Unity C# scripting, and ARKit/ARCore spatial experiences."
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
  // 4. CIVIL & ARCHITECTURE COURSES
  // ==========================================
  {
    id: "civil-cad-2d",
    title: "Certification Course on AutoCAD 2D",
    domain: "Civil & Architecture",
    level: "Certificate",
    duration: "64 hours",
    mode: "Online / Offline",
    category: "Drafting",
    software: "AutoCAD 2D Civil",
    image: "/images/autocad_2d_civil.jpg",
    description: "Foundational civil engineering drafting, architectural floor plans, sections, elevations, and CAD standards."
  },
  {
    id: "civil-cad-3d",
    title: "Certification Course on AutoCAD 3D",
    domain: "Civil & Architecture",
    level: "Certificate",
    duration: "100 hours",
    mode: "Online / Offline",
    category: "Modeling",
    software: "AutoCAD 3D Civil",
    image: "/images/civil_bim_course.jpg",
    description: "3D solid modeling, surface generation, rendering, and structural detailing in AutoCAD 3D."
  },
  {
    id: "civil-archicad",
    title: "Certification Course on ArchiCAD for BIM",
    domain: "Civil & Architecture",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "BIM",
    software: "Graphisoft ArchiCAD",
    image: "/images/htmlcss.jpg",
    description: "Building Information Modeling (BIM) using ArchiCAD for parametric architectural design and documentation."
  },
  {
    id: "civil-revit-arch",
    title: "Certification Course on Revit Architecture",
    domain: "Civil & Architecture",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "BIM",
    software: "Autodesk Revit Architecture",
    image: "/images/revit_architecture.jpg",
    description: "Revit Architecture BIM training covering 3D building components, parametric families, and construction drawings."
  },
  {
    id: "civil-3dsmax",
    title: "Certificate Course in 3ds Max Architectural Visualization",
    domain: "Civil & Architecture",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "Visualization",
    software: "Autodesk 3ds Max, V-Ray",
    image: "/images/3ds_max.jpg",
    description: "Photorealistic 3D architectural rendering, materials, camera setup, and interior/exterior lighting."
  },
  {
    id: "civil-staad",
    title: "Certification Course on Structural Design (STAAD Pro)",
    domain: "Civil & Architecture",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "Structural",
    software: "STAAD.Pro CONNECT Edition",
    image: "/images/staad_pro.jpg",
    description: "Structural analysis and Reinforced Concrete (RCC) & Steel structure design using STAAD.Pro."
  },
  {
    id: "civil-etabs",
    title: "Certification Course on ETABS Structural Analysis",
    domain: "Civil & Architecture",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "Structural",
    software: "CSI ETABS",
    image: "/images/etabs_analysis.jpg",
    description: "High-rise building structural analysis, seismic load evaluation, shear wall design, and framing using ETABS."
  },
  {
    id: "civil-dip-autocad",
    title: "Diploma in AutoCAD Civil & Arch",
    domain: "Civil & Architecture",
    level: "Diploma",
    duration: "96 hours",
    mode: "Online / Offline",
    category: "Drafting",
    software: "AutoCAD 2D & 3D Civil",
    image: "/images/c.jpg",
    description: "Complete civil drafting diploma covering residential/commercial layouts, structural drawings, and 3D perspectives."
  },
  {
    id: "civil-master-arch",
    title: "Master Diploma in Architectural Design",
    domain: "Civil & Architecture",
    level: "Master Diploma",
    duration: "380 hours",
    mode: "Online / Offline",
    category: "Master Civil",
    software: "AutoCAD, Revit, 3ds Max, V-Ray, Lumion",
    image: "/images/react.jpg",
    description: "Master level architectural engineering diploma covering BIM, photorealistic rendering, walkthroughs, and project management."
  },

  // ==========================================
  // 5. MECHANICAL & AERONAUTICAL COURSES
  // ==========================================
  {
    id: "mech-autocad-2d",
    title: "Certification in AutoCAD 2D Mechanical",
    domain: "Mechanical & Aeronautical",
    level: "Certificate",
    duration: "64 hours",
    mode: "Online / Offline",
    category: "Drafting",
    software: "AutoCAD Mechanical",
    image: "/images/mech_cad_course.jpg",
    description: "Mechanical component drafting, assembly drawings, geometric dimensioning, and CAD standards."
  },
  {
    id: "mech-solidworks",
    title: "Certification in SolidWorks",
    domain: "Mechanical & Aeronautical",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "3D Design",
    software: "Dassault SolidWorks",
    image: "/images/solidworks.jpg",
    description: "SolidWorks 3D parametric modeling, complex sheet metal design, assembly creation, and technical drafting."
  },
  {
    id: "mech-catia",
    title: "Certification in CATIA V5",
    domain: "Mechanical & Aeronautical",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "3D Design",
    software: "CATIA V5-6",
    image: "/images/catia_v5.jpg",
    description: "CATIA V5 surface modeling, generative shape design, aerospace components, and solid body modeling."
  },
  {
    id: "mech-creo",
    title: "Certification in Creo Parametric",
    domain: "Mechanical & Aeronautical",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "3D Design",
    software: "PTC Creo Parametric",
    image: "/images/c.jpg",
    description: "PTC Creo parametric modeling, mechanism design, sheet metal, and manufacturing drafting."
  },
  {
    id: "mech-ansys-wb",
    title: "Certification in Ansys Workbench FEA",
    domain: "Mechanical & Aeronautical",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "FEA & Simulation",
    software: "Ansys Mechanical Workbench",
    image: "/images/ansys_workbench.jpg",
    description: "Finite Element Analysis (FEA), static structural stress distribution, thermal conduction, and modal analysis in Ansys."
  },
  {
    id: "mech-master-cad",
    title: "Master Diploma in Mechanical CAD",
    domain: "Mechanical & Aeronautical",
    level: "Master Diploma",
    duration: "620 hours",
    mode: "Online / Offline",
    category: "Master Mechanical",
    software: "AutoCAD, SolidWorks, CATIA, Creo, Ansys",
    image: "/images/node.jpg",
    description: "Comprehensive master diploma in mechanical CAD/CAM/CAE engineering, GD&T tolerances, and automotive/aerospace design."
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
  }
];

// Deterministic 1-to-1 Unique Image Mapping (course.id -> unique image)
const COURSE_UNIQUE_IMAGES = {
  // IT & Software
  'it-python': '/images/python.jpg',
  'it-java': '/images/java.jpg',
  'it-c': '/images/c.jpg',
  'it-cpp': '/images/cpp.jpg',
  'it-js': '/images/javascript.jpg',
  'it-htmlcss': '/images/htmlcss.jpg',
  'it-react': '/images/react.jpg',
  'it-node': '/images/node.jpg',
  'it-mongodb': '/images/mongodb.jpg',
  'it-aws': '/images/aws.jpg',
  'it-docker': '/images/docker.jpg',
  'it-k8s': '/images/kubernetes.jpg',
  'it-ml': '/images/machine_learning.jpg',
  'it-powerbi': '/images/it_fullstack_course.jpg',
  'it-prof-python': '/images/python.jpg',
  'it-prof-java': '/images/java.jpg',
  'it-prof-mern': '/images/react.jpg',
  'it-prof-ds': '/images/machine_learning.jpg',
  'it-prof-devops': '/images/kubernetes.jpg',
  'it-master-fullstack': '/images/node.jpg',
  'it-master-ds': '/images/machine_learning.jpg',

  'it-prof-fullstack-python-react': '/images/python.jpg',
  'it-prof-java-fullstack': '/images/java.jpg',
  'it-prof-mean-stack': '/images/mongodb.jpg',
  'it-prof-mern-stack': '/images/react.jpg',
  'it-prof-web-design': '/images/htmlcss.jpg',
  'it-prof-software-testing': '/images/c.jpg',
  'it-prof-ds-ai': '/images/machine_learning.jpg',
  'it-prof-cloud-devops': '/images/kubernetes.jpg',
  'it-prof-cybersecurity': '/images/docker.jpg',
  'it-prof-rpa': '/images/aws.jpg',
  'it-prof-digital-marketing': '/images/javascript.jpg',
  'it-prof-db-management': '/images/mongodb.jpg',
  'it-prof-game-dev': '/images/cpp.jpg',
  'it-prof-blockchain': '/images/node.jpg',
  'it-prof-ar-vr': '/images/it_fullstack_course.jpg',

  'it-master-fullstack-dev': '/images/node.jpg',
  'it-master-software-eng': '/images/python.jpg',
  'it-master-cloud-devops': '/images/aws.jpg',
  'it-master-ds-ai': '/images/machine_learning.jpg',
  'it-master-cybersecurity': '/images/docker.jpg',
  'it-master-rpa-automation': '/images/kubernetes.jpg',
  'it-master-digital-marketing': '/images/javascript.jpg',
  'it-master-web-app': '/images/react.jpg',
  'it-master-adv-programming': '/images/cpp.jpg',
  'it-master-game-ar-vr': '/images/it_fullstack_course.jpg',

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

  // Civil & Architecture (Distinct Unique Images)
  'civil-cad-2d': '/images/autocad_2d_civil.jpg',
  'civil-cad-3d': '/images/civil_bim_course.jpg',
  'civil-archicad': '/images/htmlcss.jpg',
  'civil-revit-arch': '/images/revit_architecture.jpg',
  'civil-3dsmax': '/images/3ds_max.jpg',
  'civil-staad': '/images/staad_pro.jpg',
  'civil-etabs': '/images/etabs_analysis.jpg',
  'civil-dip-autocad': '/images/c.jpg',
  'civil-master-arch': '/images/react.jpg',

  // Mechanical & Aeronautical (Distinct Unique Images)
  'mech-autocad-2d': '/images/mech_cad_course.jpg',
  'mech-solidworks': '/images/solidworks.jpg',
  'mech-catia': '/images/catia_v5.jpg',
  'mech-creo': '/images/c.jpg',
  'mech-ansys-wb': '/images/ansys_workbench.jpg',
  'mech-master-cad': '/images/node.jpg',

  // Electrical & Electronics / MEP (Distinct Unique Images)
  'elec-prof-mep-msp': '/images/mep_designing_msp.jpg',
  'elec-prof-mep-primavera': '/images/mep_designing_primavera.jpg',
  'elec-prof-electrical-system': '/images/electrical_system_design.jpg',
  'elec-prof-hvac-fire': '/images/elec_mep_course.jpg',
  'elec-master-mep-hvac-plan': '/images/revit_mep.jpg',
  'elec-master-electrical-building': '/images/autocad_electrical.jpg',
  'elec-master-mep-bim-coordination': '/images/plc_scada.jpg'
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
  "Electrical & Electronics"
];

export const LEVELS = [
  "All Levels",
  "Certificate",
  "Diploma",
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
