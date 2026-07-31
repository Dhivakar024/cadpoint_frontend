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
  const HERO_STATS = [
    { label: "Years Experience", value: 10, suffix: "+", icon: "Award" },
    { label: "Career Courses", value: 150, suffix: "+", icon: "BookOpen" },
    { label: "Enrolled Students", value: 5000, suffix: "+", icon: "Users" },
    { label: "Hiring Partners", value: 100, suffix: "+", icon: "Building" }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* =====================================================
          FULL-SCREEN BACKGROUND 3D HERO SECTION (OFFICIAL RED & NAVY BRANDING)
         ===================================================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-8 pb-16 overflow-hidden bg-grid-pattern">
        {/* Full-Screen 3D Background Canvas Layer */}
        <KnowledgeCore />

        {/* Soft Red & Dark Navy Radial Glows */}
        <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-blue-900/15 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '3s' }} />

        {/* High-Readability Gradient Backdrop Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B18]/95 via-[#070B18]/80 to-[#070B18]/40 pointer-events-none z-5" />

        {/* Content Container (Layered z-10 above 3D scene) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-2xl flex flex-col items-start text-left">
            
            {/* Small Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-red-500/30 text-red-300 text-xs sm:text-sm font-semibold backdrop-blur-md mb-6 shadow-lg shadow-red-950/30"
            >
              <Sparkles className="w-4 h-4 text-red-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>ISO Certified Premier Training & IT Services</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </motion.div>

            {/* Large Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white font-heading tracking-tight leading-[1.1]"
            >
              Welcome to the Future of <br />
              <span className="text-gradient-red">Tech, Design & Business</span> Excellence
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed"
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
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full pt-8 border-t border-white/10"
            >
              {HERO_STATS.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-xs text-slate-400 font-medium mt-1">
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
                    <Badge variant="red">{dept.badge}</Badge>
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading mb-3 group-hover:text-red-400 transition-colors">
                    {dept.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {dept.desc}
                  </p>
                </div>
                <Link to="/courses" className="inline-flex items-center gap-2 text-red-400 font-semibold text-sm hover:text-red-300 transition-colors">
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
        <Card className="p-8 sm:p-12 relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#070B18] to-slate-900 border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="red" className="mb-4">About CADPOINT</Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading mb-6">
                Bridging Creativity, Technology & Industry Standards
              </h2>
              <p className="text-slate-300 text-base leading-relaxed mb-6">
                CADPOINT is a premier training and design institute that blends creativity, technology, and innovation. We specialize in CAD/CAM/BIM, IT, Digital Media, and Accounting — empowering learners through industry-level projects and skill-based learning.
              </p>
              <div className="space-y-3 mb-8">
                {HERO_HIGHLIGHTS.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-200 font-medium text-sm">
                    <ShieldCheck className="w-5 h-5 text-red-400 shrink-0" />
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
              <div className="w-full h-80 rounded-2xl glass-panel p-6 border border-slate-800 flex flex-col justify-center items-center text-center relative overflow-hidden">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-600 to-slate-900 flex items-center justify-center text-white text-3xl font-extrabold font-heading mb-4 shadow-xl border border-red-500/30">
                  CP
                </div>
                <h3 className="text-xl font-bold text-white font-heading mb-2">32 Years of Excellence</h3>
                <p className="text-slate-400 text-xs max-w-xs">
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
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading mb-2">{serv.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{serv.desc}</p>
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

      {/* 5. INTERNSHIP & PLACEMENT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-8 sm:p-12 bg-gradient-to-r from-red-950/30 via-[#111827] to-slate-900/40 border-slate-800">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="emerald" className="mb-3">Career Advancement</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              Internship Opportunities & Live Project Exposure
            </h2>
            <p className="text-slate-300 text-base mt-4">
              Best performers are offered direct internships in our company. Work with our dev teams on real-world production tasks and secure permanent placement!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-red-600/20 mx-auto flex items-center justify-center text-red-400 mb-4 font-bold text-xl">1</div>
              <h3 className="text-lg font-bold text-white font-heading mb-2">Internship Opportunity</h3>
              <p className="text-slate-400 text-xs">Best performers are offered internship in our company with hands-on live project training.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 mx-auto flex items-center justify-center text-blue-400 mb-4 font-bold text-xl">2</div>
              <h3 className="text-lg font-bold text-white font-heading mb-2">Live Project Exposure</h3>
              <p className="text-slate-400 text-xs">Work with our senior dev teams on real-world client production tasks and architecture.</p>
            </div>
            <div className="glass-card p-6 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-emerald-600/20 mx-auto flex items-center justify-center text-emerald-400 mb-4 font-bold text-xl">3</div>
              <h3 className="text-lg font-bold text-white font-heading mb-2">Permanent Placement</h3>
              <p className="text-slate-400 text-xs">Top performers get placed directly in our company or through partner hiring drives.</p>
            </div>
          </div>
        </Card>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-10 sm:p-16 bg-gradient-to-r from-red-600 via-red-700 to-slate-900 overflow-hidden shadow-2xl text-center flex flex-col items-center border border-red-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight max-w-3xl">
            Ready to Build Your Tech or Design Career?
          </h2>
          <p className="mt-4 text-red-100 text-base sm:text-lg max-w-2xl">
            Enroll today in our certified diploma and professional courses. Take the first step toward corporate excellence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
            <Link to="/registration">
              <Button variant="accent" size="lg" icon={ArrowRight}>
                Register Now Online
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                Contact Helpline
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
