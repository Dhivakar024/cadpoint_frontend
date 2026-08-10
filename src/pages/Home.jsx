import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Award,
  Users,
  BookOpen,
  Building,
  Briefcase,
  GraduationCap,
  TrendingUp,
  Code2,
  Gamepad2,
  FileSpreadsheet,
  Building2,
  Cog,
  Zap,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { AnimatedCounter } from '../components/ui/AnimatedCounter';
import { KnowledgeCore } from '../components/ui/KnowledgeCore/KnowledgeCore';
import { useTheme } from '../context/ThemeContext';
import {
  DEPARTMENTS,
  HERO_HIGHLIGHTS,
  HOME_SERVICES
} from '../utils/constants';

const iconMap = {
  Code2,
  Gamepad2,
  FileSpreadsheet,
  Building2,
  Cog,
  Zap,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  Users,
  BookOpen,
  Building,
  Award
};

export function Home() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const HERO_STATS = [
    { label: "Years Experience", value: 10, suffix: "+", icon: "Award" },
    { label: "Career Courses", value: 150, suffix: "+", icon: "BookOpen" },
    { label: "Enrolled Students", value: 5000, suffix: "+", icon: "Users" },
    { label: "Hiring Partners", value: 100, suffix: "+", icon: "Building" }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* =====================================================
          HERO SECTION (DARK MODE: 3D FUTURISTIC | LIGHT MODE: BRIGHT EMERALD MESH)
         ===================================================== */}
      <section className={`relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 overflow-hidden ${
        isDark 
          ? 'bg-grid-pattern bg-[#070b18]' 
          : 'bg-transparent'
      }`}>
        {/* CONDITIONAL BACKDROP: 3D Canvas in Dark Mode | Bright Soft Blobs in Light Mode */}
        {isDark ? (
          <>
            {/* Full-Screen 3D Background Canvas Layer */}
            <KnowledgeCore />

            {/* Soft Red & Dark Navy Radial Glows */}
            <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }} />

            {/* High-Readability Dark Gradient Backdrop Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#070B18]/95 via-[#070B18]/80 to-[#070B18]/40 pointer-events-none z-5" />
          </>
        ) : (
          <>
            {/* Soft Blurred Emerald & Sky Blobs for Light Mode */}
            <div className="absolute top-10 left-10 w-[550px] h-[550px] bg-emerald-200/40 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />
            <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-teal-200/30 rounded-full blur-[110px] pointer-events-none" />

            {/* Subtle Light Mesh Pattern */}
            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />

            {/* Floating Light Pills around hero */}
            <div className="absolute inset-0 pointer-events-none z-0 hidden lg:block">
              <div className="max-w-7xl mx-auto h-full relative">
                <div className="absolute top-16 right-24 px-4 py-2 rounded-full bg-white/90 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '6s' }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 animate-pulse" />
                  Artificial Intelligence & AI
                </div>
                <div className="absolute top-36 right-8 px-4 py-2 rounded-full bg-white/90 border border-teal-200 text-xs font-bold text-teal-800 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '7s' }}>
                  <span className="w-2 h-2 rounded-full bg-teal-500 inline-block mr-2 animate-pulse" />
                  Full Stack & Cloud DevOps
                </div>
                <div className="absolute top-60 right-28 px-4 py-2 rounded-full bg-white/90 border border-sky-200 text-xs font-bold text-sky-800 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '6.5s' }}>
                  <span className="w-2 h-2 rounded-full bg-sky-500 inline-block mr-2 animate-pulse" />
                  CADD & Architectural Design
                </div>
                <div className="absolute bottom-32 right-16 px-4 py-2 rounded-full bg-white/90 border border-emerald-200 text-xs font-bold text-emerald-800 shadow-lg backdrop-blur-md animate-bounce" style={{ animationDuration: '8s' }}>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-2 animate-pulse" />
                  Multimedia, VFX & UI/UX
                </div>
              </div>
            </div>
          </>
        )}

        {/* Content Container (Layered z-10 above background) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl flex flex-col items-start text-left">
            
            {/* Small Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md mb-6 shadow-lg ${
                isDark 
                  ? 'bg-white/5 border border-red-500/30 text-red-300 shadow-red-950/30'
                  : 'bg-white border border-emerald-300 text-emerald-800 shadow-md'
              }`}
            >
              <Sparkles className={`w-4 h-4 animate-spin ${isDark ? 'text-red-400' : 'text-emerald-600'}`} style={{ animationDuration: '8s' }} />
              <span>ISO Certified Premier Training & IT Services</span>
              <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            </motion.div>

            {/* Large Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold font-heading tracking-tight leading-[1.1] ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Welcome to the Future of <br />
              <span className={isDark ? 'text-gradient-red' : 'text-gradient-brand'}>
                Tech, Design & Business
              </span> Excellence
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mt-6 text-base sm:text-lg font-normal leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
            >
              Dive into our immersive ecosystem where cutting-edge AI, multimedia innovation, CADD engineering, and creative design converge. Experience hands-on projects, expert mentorship, and next-gen training that shapes your skills for tomorrow's industries.
            </motion.p>

            {/* Two CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              <Link to="/courses" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl" icon={ArrowRight}>
                  Explore Courses
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </motion.div>

            {/* Hero Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-8 border-t ${
                isDark ? 'border-white/10' : 'border-emerald-200'
              }`}
            >
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className={`text-2xl sm:text-3xl font-extrabold font-heading ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className={`text-xs font-semibold mt-1 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. ACADEMIC SPECTRUM / DEPARTMENTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Academic Spectrum"
          title="Explore Our Core Departments"
          subtitle="From CADD & Engineering drafting to AI, Software Engineering, and Multimedia production — we deliver end-to-end skill building."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DEPARTMENTS.map((dept) => {
            const Icon = iconMap[dept.icon] || Code2;
            return (
              <Card key={dept.id} className="flex flex-col justify-between h-full p-8 group">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-white shadow-lg`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <Badge variant={isDark ? "red" : "emerald"}>{dept.badge}</Badge>
                  </div>
                  <h3 className={`text-xl font-bold font-heading mb-3 transition-colors ${
                    isDark ? 'text-white group-hover:text-red-400' : 'text-slate-900 group-hover:text-emerald-600'
                  }`}>
                    {dept.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 ${
                    isDark ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {dept.desc}
                  </p>
                </div>
                <Link to="/courses" className={`inline-flex items-center gap-2 font-semibold text-sm transition-colors ${
                  isDark ? 'text-red-400 hover:text-red-300' : 'text-emerald-600 hover:text-emerald-700'
                }`}>
                  <span>Explore Department</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      {/* 3. ABOUT CADPOINT SUMMARY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant={isDark ? "red" : "emerald"} className="mb-4">About CADPOINT</Badge>
              <h2 className={`text-3xl sm:text-4xl font-extrabold font-heading mb-6 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Bridging Creativity, Technology & Industry Standards
              </h2>
              <p className={`text-base leading-relaxed mb-6 font-normal ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                CADPOINT is a premier training and design institute that blends creativity, technology, and innovation. We specialize in CAD/CAM/BIM, IT, Digital Media, and Accounting — empowering learners through industry-level projects and skill-based learning.
              </p>
              <div className="space-y-3 mb-8">
                {HERO_HIGHLIGHTS.map((h, i) => (
                  <div key={i} className={`flex items-center gap-3 font-semibold text-sm ${
                    isDark ? 'text-slate-200' : 'text-slate-800'
                  }`}>
                    <ShieldCheck className={`w-5 h-5 shrink-0 ${isDark ? 'text-red-400' : 'text-emerald-600'}`} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
              <Link to="/about">
                <Button variant="primary" icon={ArrowRight}>
                  Know More About Us
                </Button>
              </Link>
            </div>
            <div className="relative flex justify-center">
              <div className="w-full h-80 rounded-2xl glass-panel p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-extrabold font-heading mb-4 shadow-xl border ${
                  isDark
                    ? 'bg-gradient-to-tr from-red-600 to-slate-900 border-red-500/30'
                    : 'bg-gradient-to-tr from-emerald-600 to-teal-600 border-emerald-400/30'
                }`}>
                  CP
                </div>
                <h3 className={`text-xl font-bold font-heading mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>32 Years of Excellence</h3>
                <p className={`text-xs max-w-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Trusted by thousands of professionals, college students, and corporate teams across India since 1993.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* 4. SERVICES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Core Capabilities"
          title="Comprehensive Corporate & Student Services"
          subtitle="We offer end-to-end IT services, software development, CAD drafting, and placement drives."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOME_SERVICES.map((serv, index) => {
            const Icon = iconMap[serv.icon] || Briefcase;
            return (
              <Card key={index} className="p-6">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${
                  isDark
                    ? 'bg-red-500/10 border-red-500/20 text-red-400'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold font-heading mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>{serv.title}</h3>
                <p className={`text-xs leading-relaxed mb-4 ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>{serv.desc}</p>
              </Card>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link to="/services">
            <Button variant="outline" icon={ArrowRight}>
              View All 10 Services
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. PLACEMENT SUPPORT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-12 relative overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="emerald" className="mb-3">Career Advancement</Badge>
            <h2 className={`text-3xl sm:text-4xl font-extrabold font-heading ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              Placement Support
            </h2>
            <p className={`text-base mt-3 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              Build your career with structured placement support, career guidance and preparation for industry opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  isDark ? 'bg-red-600/20 text-red-400' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold font-heading mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Career Guidance
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  One-on-one career counseling to align your learned technical skills with relevant industry roles.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-sky-100 text-sky-800'
                }`}>
                  <Award className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold font-heading mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Resume / Profile Guidance
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Professional portfolio building and resume optimization highlighting verified project work.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  isDark ? 'bg-emerald-600/20 text-emerald-400' : 'bg-teal-100 text-teal-800'
                }`}>
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold font-heading mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Interview Preparation
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Mock technical interviews, coding challenges, and HR assessment readiness sessions.
                </p>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                  isDark ? 'bg-purple-600/20 text-purple-400' : 'bg-purple-100 text-purple-800'
                }`}>
                  <Building className="w-5 h-5" />
                </div>
                <h3 className={`text-base font-bold font-heading mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Industry Opportunity Support
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Connecting job-ready learners with opening drives across our corporate partner ecosystem.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button variant="primary" icon={ArrowRight}>
                Explore Placement Support
              </Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* 6. CALL TO ACTION SECTION (WITH HIGH READABILITY LIGHT/DARK THEMES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`relative rounded-3xl p-10 sm:p-16 overflow-hidden shadow-2xl text-center flex flex-col items-center border ${
          isDark
            ? 'bg-gradient-to-r from-red-600 via-red-700 to-slate-900 border-red-500/30'
            : 'bg-gradient-to-br from-[#059669] to-[#10B981] border-emerald-400/30 text-white'
        }`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight max-w-3xl">
            Ready to Build Your Tech or Design Career?
          </h2>
          <p className="mt-4 text-white/90 text-base sm:text-lg max-w-2xl font-medium">
            Enroll today in our certified diploma and professional courses. Take the first step toward corporate excellence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/registration">
              {isDark ? (
                <Button variant="accent" size="lg" icon={ArrowRight}>
                  Register Now Online
                </Button>
              ) : (
                <button className="px-8 py-4 rounded-xl bg-white text-[#059669] font-bold text-base shadow-xl hover:bg-slate-50 transition-all flex items-center gap-2 cursor-pointer">
                  <span>Register Now Online</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}
            </Link>
            <Link to="/contact">
              <button className="px-8 py-4 rounded-xl bg-transparent text-white font-bold text-base border border-white hover:bg-white/10 transition-all flex items-center gap-2 cursor-pointer">
                <span>Contact Helpline</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
