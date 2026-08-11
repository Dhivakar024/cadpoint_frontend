import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Download,
  HelpCircle,
  Laptop,
  Layers,
  ShieldCheck,
  Sparkles,
  Users,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  DollarSign,
  Target,
  FileText,
  Building,
  GraduationCap
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { getCourseBySlug, getRelatedCourses } from '../utils/courseData';
import { SEO } from '../components/common/SEO';
import { getCourseSchema, getBreadcrumbSchema, getFAQSchema } from '../utils/seoSchemas';

export function CourseDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const fetchedCourse = getCourseBySlug(slug);
    if (fetchedCourse) {
      setCourse(fetchedCourse);
    } else {
      // Fallback redirect if slug not found
      navigate('/courses');
    }
  }, [slug, navigate]);

  if (!course) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Loading course details...</p>
        </div>
      </div>
    );
  }

  const relatedCourses = getRelatedCourses(course);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleDownloadSyllabus = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const courseJsonLd = [
    getCourseSchema(course),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Courses', url: '/courses' },
      { name: course.title, url: `/courses/${course.slug}` }
    ]),
    course.faqs ? getFAQSchema(course.faqs) : null
  ].filter(Boolean);

  return (
    <>
      <SEO
        title={`${course.title} | CADPOINT`}
        description={`${course.title} course at CADPOINT Authorized Training Centre. Software covered: ${course.software}. Industry-aligned curriculum, ISO certification, and practical training.`}
        keywords={`${course.title}, ${course.software}, CADPOINT ${course.category}, ${course.software} course Salem, CADPOINT Authorized Training Centre, CAD training centre`}
        canonical={`/courses/${course.slug}`}
        ogImage={course.image}
        jsonLd={courseJsonLd}
      />
      <div className="space-y-16 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* BREADCRUMB & BACK BUTTON */}
      <div className="flex items-center justify-between pt-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2 text-xs text-slate-400 overflow-x-auto">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
          <span>/</span>
          <span className="text-cyan-400 font-medium truncate max-w-[200px] sm:max-w-none">{course.title}</span>
        </div>
        <Link to="/courses" className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Catalog</span>
        </Link>
      </div>

      {/* HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <Badge variant="red">{course.domain}</Badge>
            <Badge variant="cyan">{course.level}</Badge>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ISO 9001:2008 Govt Certified
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            {course.shortDescription}
          </p>

          {/* META SPECS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-2xl glass-card border border-white/10">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-red-400" /> Duration
              </span>
              <p className="text-sm font-bold text-white">{course.duration}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Laptop className="w-3.5 h-3.5 text-cyan-400" /> Training Mode
              </span>
              <p className="text-sm font-bold text-white">{course.mode}</p>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" /> Category
              </span>
              <p className="text-sm font-bold text-white">{course.category}</p>
            </div>
          </div>

          {/* CALL TO ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Link to="/registration" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto justify-center px-8" icon={ArrowRight}>
                Enroll Now Online
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* HERO IMAGE CONTAINER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-3xl overflow-hidden border border-red-500/30 shadow-2xl group">
            <img
              src={course.image}
              alt={`${course.title} course at CADPOINT Authorized Training Centre`}
              className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B18] via-transparent to-transparent" />
            
            {/* FLOATING BADGES */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl glass-panel border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Software Covered:</span>
                <span className="text-xs font-bold text-red-400">{course.software}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Practical Project Ratio:</span>
                <span className="text-emerald-400 font-bold">80% Hands-on Labs</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ABOUT COURSE SECTION */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-red-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            About This Program
          </h2>
        </div>

        <Card className="p-8 border-slate-800 space-y-6 bg-slate-900/40">
          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            {course.fullDescription.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </Card>
      </section>

      {/* SKILLS YOU WILL GAIN */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-cyan-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Skills You Will Gain
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {course.skills.map((skill, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              className="p-4 rounded-2xl glass-card border border-white/10 flex items-start gap-3 hover:border-cyan-500/40 transition-colors"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-heading">{skill.name || skill}</h4>
                {skill.description && (
                  <p className="text-xs text-slate-400 mt-1">{skill.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TOOLS & TECHNOLOGIES COVERED */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Laptop className="w-5 h-5 text-purple-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Tools & Software Covered
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {course.tools.map((tool, index) => (
            <div
              key={index}
              className="p-4 rounded-2xl glass-card text-center border border-white/10 hover:border-purple-500/40 transition-all flex flex-col items-center justify-center space-y-2 group"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                {tool}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* COURSE MODULES / CURRICULUM */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Course Modules & Syllabus
            </h2>
          </div>
          <span className="text-xs text-slate-400">{course.modules.length} Modules Included</span>
        </div>

        <div className="space-y-4">
          {course.modules.map((module, idx) => {
            const isOpen = activeModuleIndex === idx;
            return (
              <Card
                key={idx}
                className={`p-6 border-slate-800 transition-colors cursor-pointer ${
                  isOpen ? 'border-red-500/40 bg-slate-900/60' : 'hover:border-slate-700'
                }`}
                onClick={() => setActiveModuleIndex(isOpen ? null : idx)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-red-500/10 text-red-400 font-bold text-xs flex items-center justify-center border border-red-500/20">
                      {idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-white font-heading">
                      {module.title}
                    </h3>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-red-400' : ''}`} />
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-4 mt-4 border-t border-white/5 space-y-2"
                    >
                      {module.topics.map((topic, tIdx) => (
                        <div key={tIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>
      </section>


      {/* CAREER OPPORTUNITIES */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-emerald-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Career Opportunities
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {course.careerOpportunities.map((role, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl glass-card border border-white/10 text-xs font-semibold text-slate-200 flex items-center gap-2.5 hover:border-emerald-500/30 transition-colors"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{role}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHO CAN JOIN */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Who Can Join?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { title: 'College Students', icon: GraduationCap, desc: 'Engineering, Arts & Science students building career skills.' },
            { title: 'Recent Graduates', icon: Award, desc: 'Freshers aiming for immediate corporate placements & internships.' },
            { title: 'Working Professionals', icon: Building, desc: 'Engineers upgrading skills for promotion or role transition.' },
            { title: 'Career Switchers', icon: Target, desc: 'Candidates switching domain into IT, CAD, Multimedia, or ERP.' }
          ].map((item, idx) => {
            const IconComp = item.icon;
            return (
              <Card key={idx} className="p-5 border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-heading">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CERTIFICATION */}
      <section>
        <Card className="p-8 sm:p-10 border-red-500/30 bg-gradient-to-r from-red-950/30 via-slate-900 to-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <Badge variant="red">Official ISO Certification</Badge>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                ISO 9001:2008 & CADPOINT Government Certificate
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Upon successful completion of project evaluations and viva, students receive an official, globally recognized CADPOINT ISO 9001:2008 Government registered certificate with digital verification link.
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Unique Serial Number & QR Code Validation
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Accepted by 350+ Top Employers & Multinational Corporations
                </li>
              </ul>
            </div>
            <div className="lg:col-span-4 text-center">
              <div className="p-6 rounded-2xl glass-panel border border-red-500/40 space-y-3">
                <Award className="w-12 h-12 text-red-400 mx-auto" />
                <h4 className="text-base font-bold text-white font-heading">Industry Endorsed Certificate</h4>
                <span className="text-[11px] text-slate-400 block">Valid Globally for Corporate Employment</span>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-red-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {course.faq.map((faqItem, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <Card
                key={idx}
                className="p-5 border-slate-800 hover:border-slate-700 cursor-pointer transition-colors"
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white font-heading pr-4">
                    {faqItem.question}
                  </h3>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-red-400' : ''}`} />
                </div>
                {isOpen && (
                  <p className="text-xs text-slate-300 mt-3 pt-3 border-t border-white/5 leading-relaxed">
                    {faqItem.answer}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* RELATED RECOMMENDED COURSES */}
      {relatedCourses.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white font-heading">
              Recommended Related Programs
            </h2>
            <Link to="/courses" className="text-xs text-red-400 hover:underline">
              View All Courses &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedCourses.map((relCourse) => (
              <Card key={relCourse.id} className="p-5 border-slate-800 hover:border-red-500/40 transition-all group flex flex-col justify-between">
                <div className="space-y-3">
                  <Badge variant="cyan">{relCourse.level}</Badge>
                  <h3 className="text-base font-bold text-white font-heading group-hover:text-red-400 transition-colors">
                    {relCourse.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {relCourse.shortDescription || relCourse.description}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{relCourse.duration}</span>
                  <Link to={`/courses/${relCourse.slug}`} className="text-xs text-red-400 font-bold hover:underline flex items-center gap-1">
                    View Course <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* STICKY BOTTOM ENROLLMENT CALLOUT */}
      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-4xl mx-auto">
        <div className="p-4 rounded-2xl glass-panel border border-red-500/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white font-heading">Ready to Master {course.title}?</h4>
              <p className="text-[11px] text-slate-400">Batches starting this week in Salem Head Office & Online!</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link to="/registration" className="w-full sm:w-auto">
              <Button variant="primary" size="sm" className="w-full justify-center" icon={ArrowRight}>
                Enroll Now
              </Button>
            </Link>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
