import React from 'react';
import { Target, Eye, CheckCircle2, Award, Building2, TrendingUp, MapPin } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';
import { useTheme } from '../context/ThemeContext';

import { SEO } from '../components/common/SEO';
import { getOrganizationSchema, getBreadcrumbSchema } from '../utils/seoSchemas';

export function About() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const aboutJsonLd = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' }
    ])
  ];

  const aboutPoints = [
    {
      icon: Award,
      title: "ISO 9001 : 2008 Certified Pioneer (Est. 1993)",
      text: "CADPOINT ® Engineering Solutions Pvt. Ltd is an ISO 9001 : 2008 Certified Company, credited with introducing and pioneering the revolutionary concept of CAD/CAM/CAE/ Animation & Multimedia training and Architectural works & Engineering Designs in India in 1993.",
      colorDark: "from-red-600 to-slate-900",
      colorLight: "from-emerald-500 to-teal-700"
    },
    {
      icon: TrendingUp,
      title: "32 Years Track Record of Sustained Growth",
      text: "Our company has 32 years track record of sustained growth, student satisfaction & diversification.",
      colorDark: "from-red-700 to-slate-800",
      colorLight: "from-emerald-600 to-teal-800"
    },
    {
      icon: Building2,
      title: "Towering Presence in Computer Aided Designs",
      text: "From the humble beginning as a CAD/CAM/CAE trainer, the company has steadily grown into a towering presence in the business of computer aided designs & drafting.",
      colorDark: "from-red-600 to-blue-900",
      colorLight: "from-teal-600 to-sky-700"
    },
    {
      icon: MapPin,
      title: "Registered & Administrative Offices",
      text: "Our Registered office in Chennai and admin office in Kerala.",
      colorDark: "from-slate-800 to-red-900",
      colorLight: "from-sky-700 to-emerald-700"
    }
  ];

  const milestones = [
    {
      year: "Pillar 1",
      title: "Hands-on Practical Training",
      desc: "Skill development through hands-on, modern tech projects with real-world case studies."
    },
    {
      year: "Pillar 2",
      title: "Personalized Mentorship",
      desc: "Direct guidance from senior industry professionals and software architects."
    },
    {
      year: "Pillar 3",
      title: "Internships & Live Projects",
      desc: "Production experience working on live client modules and enterprise workflows."
    }
  ];

  return (
    <>
      <SEO
        title="About CADPOINT | 32+ Years Authorized CAD & IT Training Institute"
        description="Learn about CADPOINT Authorized Training Centre's 32-year legacy of educational excellence, empowering over 50,000+ students with ISO-certified CAD, BIM, IT and Multimedia training."
        keywords="About CADPOINT, CADPOINT Salem, CAD Training Institute, ISO Certified CAD Center"
        canonical="/about"
        jsonLd={aboutJsonLd}
      />
      <div className="space-y-20 sm:space-y-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER SECTION */}
        <div className="text-center pt-6 space-y-3">
          <Badge variant={isDark ? "red" : "emerald"} className="mb-2">Get More About Us</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gradient font-heading tracking-tight">
            ABOUT CADPOINT AUTHORIZED TRAINING CENTRE
          </h1>
        <p className={`mt-4 text-base sm:text-lg max-w-3xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
          CADPOINT ® Engineering Solutions Pvt. Ltd is a premier ISO Certified company with 32 years of track record in CAD/CAM/CAE, Multimedia, IT, and Engineering Solutions.
        </p>
      </div>

      {/* ABOUT CADPOINT HIGHLIGHT POINTS (4 CARDS) */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card key={index} className="p-8 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${isDark ? point.colorDark : point.colorLight} flex items-center justify-center text-white shadow-lg shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-red-400' : 'text-emerald-600'}`}>
                      Point 0{index + 1}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold font-heading mb-3 transition-colors ${
                    isDark ? 'text-white group-hover:text-red-400' : 'text-slate-900 group-hover:text-emerald-600'
                  }`}>
                    {point.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {point.text}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8 sm:p-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-600'
            }`}>
              <Target className="w-6 h-6" />
            </div>
            <h2 className={`text-2xl font-bold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>Our Mission</h2>
          </div>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Education for All. Our mission is to guide students on the right path, foster their growth, and empower them with the knowledge and skills needed to contribute to an educated and progressive society.
          </p>
        </Card>

        <Card className="p-8 sm:p-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-sky-500/20 text-sky-600'
            }`}>
              <Eye className="w-6 h-6" />
            </div>
            <h2 className={`text-2xl font-bold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>Our Vision</h2>
          </div>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Our vision is to create a futuristic learning environment that empowers students at all levels, including those from lower- and middle-income and underprivileged backgrounds, by providing access to knowledge and current technologies.
          </p>
        </Card>
      </section>

      {/* CORE PILLARS / MILESTONES */}
      <section className="space-y-10">
        <SectionHeader
          eyebrow="Educational Framework"
          title="The 3 Pillars of CADPOINT Excellence"
          subtitle="Our proven learning methodology designed to transform beginners into confident industry professionals."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {milestones.map((item, index) => (
            <Card key={index} className="p-6 relative overflow-hidden">
              <span className={`text-xs font-bold uppercase tracking-wider block mb-2 ${
                isDark ? 'text-red-400' : 'text-emerald-600'
              }`}>
                {item.year}
              </span>
              <h3 className={`text-lg font-bold font-heading mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {item.title}
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {item.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  </>
);
}
