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
    'mm-photoshop': 'graphic-design-photoshop',
    'mm-aftereffects': 'visual-effects-after-effects',
    'mm-maya': 'maya-3d-modeling',
    'mm-uiux': 'ui-ux-design-figma',
    'mm-master-vfx': 'master-animation-vfx',
    'acc-tally': 'tally-prime-gst',
    'acc-excel': 'advanced-excel-analytics',
    'acc-sap-fico': 'sap-erp-fico',
    'acc-diploma-tax': 'financial-accounting-taxation',
    'acc-master-sap': 'sap-erp-implementation',
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
    'elec-autocad-elec': 'autocad-electrical',
    'elec-revit-mep': 'revit-mep-electrical',
    'elec-eplan': 'electrical-wiring-harness-eplan',
    'elec-etap': 'etap-power-systems',
    'elec-dialux': 'dialux-lighting-design',
    'elec-plc-scada': 'plc-scada-automation',
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

  // ==========================================
  // 2. MULTIMEDIA COURSES
  // ==========================================
  {
    id: "mm-photoshop",
    title: "Certificate in Graphic Design with Photoshop",
    domain: "Multimedia",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Graphic Design",
    software: "Adobe Photoshop, Illustrator",
    image: "/images/htmlcss.jpg",
    description: "Graphic design principles, image manipulation, digital branding, photo retouching, and poster creation."
  },
  {
    id: "mm-aftereffects",
    title: "Certificate in Visual Effects with After Effects",
    domain: "Multimedia",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "VFX & Motion",
    software: "Adobe After Effects, Premiere Pro",
    image: "/images/cpp.jpg",
    description: "Motion graphics, visual effects compositing, green screen keying, title animations, and video post-production."
  },
  {
    id: "mm-maya",
    title: "Certificate in Maya 3D Modeling",
    domain: "Multimedia",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "3D & Animation",
    software: "Autodesk Maya, Arnold Renderer",
    image: "/images/c.jpg",
    description: "3D polygon modeling, texturing, UV unwrapping, lighting, and asset generation in Autodesk Maya."
  },
  {
    id: "mm-uiux",
    title: "Professional Course in UI/UX Design",
    domain: "Multimedia",
    level: "Professional",
    duration: "160 hours",
    mode: "Online / Offline",
    category: "UI/UX",
    software: "Figma, Adobe XD, Photoshop, Principle",
    image: "/images/javascript.jpg",
    description: "User experience research, wireframing, interactive mobile/web design systems, prototyping, and usability testing."
  },
  {
    id: "mm-master-vfx",
    title: "Master Diploma in Animation & VFX",
    domain: "Multimedia",
    level: "Master Diploma",
    duration: "280 hours",
    mode: "Online / Offline",
    category: "Master Media",
    software: "Maya, Blender, After Effects, Nuke, Premiere",
    image: "/images/react.jpg",
    description: "Complete master diploma in 3D character animation, VFX compositing, lighting, and film production pipelines."
  },

  // ==========================================
  // 3. ACCOUNTING, FINANCE, AND ERP
  // ==========================================
  {
    id: "acc-tally",
    title: "Certificate in Tally Prime",
    domain: "Accounting & ERP",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Accounting",
    software: "Tally Prime, GST Portal",
    image: "/images/mongodb.jpg",
    description: "Practical computerized accounting, GST filing, e-way bills, inventory control, and voucher entries using Tally Prime."
  },
  {
    id: "acc-excel",
    title: "Certificate in Microsoft Excel – Advanced",
    domain: "Accounting & ERP",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "Finance",
    software: "Excel 365, Power Query, Pivot, VBA",
    image: "/images/machine_learning.jpg",
    description: "Advanced Excel methods for financial modeling, data cleanup, XLOOKUP, pivot tables, and macro automation."
  },
  {
    id: "acc-sap-fico",
    title: "Certificate in SAP ERP – Financials (FICO)",
    domain: "Accounting & ERP",
    level: "Certificate",
    duration: "60 hours",
    mode: "Online / Offline",
    category: "ERP Systems",
    software: "SAP FICO S/4HANA",
    image: "/images/java.jpg",
    description: "SAP FICO module configuration, General Ledger, Accounts Payable, Receivable, and financial controlling."
  },
  {
    id: "acc-diploma-tax",
    title: "Professional Diploma in Financial Accounting & Taxation",
    domain: "Accounting & ERP",
    level: "Professional",
    duration: "140 hours",
    mode: "Online / Offline",
    category: "Taxation",
    software: "Tally Prime, Excel, GST & IT Portals",
    image: "/images/python.jpg",
    description: "Comprehensive accounting and direct/indirect taxation diploma covering GST returns, TDS calculation, and balance sheets."
  },
  {
    id: "acc-master-sap",
    title: "PG Diploma in SAP ERP Implementation",
    domain: "Accounting & ERP",
    level: "Master Diploma",
    duration: "200 hours",
    mode: "Online / Offline",
    category: "ERP Master",
    software: "SAP S/4HANA FICO, MM, SD",
    image: "/images/aws.jpg",
    description: "Master level SAP ERP implementation diploma covering business blueprinting, cross-module integration, and enterprise reporting."
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
    image: "/images/civil_bim_course.jpg",
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
    image: "/images/civil_bim_course.jpg",
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
    image: "/images/civil_bim_course.jpg",
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
    image: "/images/civil_bim_course.jpg",
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
    image: "/images/civil_bim_course.jpg",
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
    image: "/images/civil_bim_course.jpg",
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
    image: "/images/civil_bim_course.jpg",
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
    image: "/images/civil_bim_course.jpg",
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
    image: "/images/mech_cad_course.jpg",
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
    image: "/images/mech_cad_course.jpg",
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
    image: "/images/mech_cad_course.jpg",
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
    image: "/images/mech_cad_course.jpg",
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
    image: "/images/mech_cad_course.jpg",
    description: "Comprehensive master diploma in mechanical CAD/CAM/CAE engineering, GD&T tolerances, and automotive/aerospace design."
  },

  // ==========================================
  // 6. ELECTRICAL & ELECTRONICS COURSES
  // ==========================================
  {
    id: "elec-autocad-elec",
    title: "Certification Course on AutoCAD Electrical",
    domain: "Electrical & Electronics",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "Electrical Drafting",
    software: "AutoCAD Electrical",
    image: "/images/elec_mep_course.jpg",
    description: "Electrical control panel layout, schematic circuit design, PLC I/O wiring, and component terminal numbering."
  },
  {
    id: "elec-revit-mep",
    title: "Certification Course on Revit MEP Electrical",
    domain: "Electrical & Electronics",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "BIM Electrical",
    software: "Autodesk Revit MEP",
    image: "/images/elec_mep_course.jpg",
    description: "Revit MEP training for building electrical distribution, cable tray routing, lighting fixtures, and power load calculation."
  },
  {
    id: "elec-plc-scada",
    title: "Certification Course in PLC & SCADA Automation",
    domain: "Electrical & Electronics",
    level: "Certificate",
    duration: "80 hours",
    mode: "Online / Offline",
    category: "Automation",
    software: "Siemens S7, Allen Bradley PLC, SCADA",
    image: "/images/elec_mep_course.jpg",
    description: "Industrial automation fundamentals, PLC ladder logic programming, SCADA HMI design, and sensor interfacing."
  },
  {
    id: "elec-master-mep-bim",
    title: "Master Diploma in MEP & HVAC Design",
    domain: "Electrical & Electronics",
    level: "Master Diploma",
    duration: "380 hours",
    mode: "Online / Offline",
    category: "Master Electrical",
    software: "AutoCAD Electrical, Revit MEP, Dialux, ETAP",
    image: "/images/elec_mep_course.jpg",
    description: "Master level MEP & HVAC building services diploma covering electrical load calculations, BIM coordination, and site execution."
  }
];

// Enrich COURSES array with explicit slugs
export const COURSES = BASE_COURSES.map(c => ({
  ...c,
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
    `${base.software.split(',')[0]} Engineer`,
    "Technical Associate",
    "Solutions Architect Assistant",
    "Application Developer",
    "CAD/IT Design Analyst",
    "Quality Assurance Specialist",
    "Project Operations Trainee"
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
