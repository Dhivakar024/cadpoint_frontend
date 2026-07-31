import React from 'react';
import { Target, Eye, CheckCircle2, Award, Building2, TrendingUp, MapPin } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';

export function About() {
  const aboutPoints = [
    {
      icon: Award,
      title: "ISO 9001 : 2008 Certified Pioneer (Est. 1993)",
      text: "CADPOINT ® Engineering Solutions Pvt. Ltd is an ISO 9001 : 2008 Certified Company, credited with introducing and pioneering the revolutionary concept of CAD/CAM/CAE/ Animation & Multimedia training and Architectural works & Engineering Designs in India in 1993.",
      color: "from-red-600 to-slate-900"
    },
    {
      icon: TrendingUp,
      title: "32 Years Track Record of Sustained Growth",
      text: "Our company has 32 years track record of sustained growth, student satisfaction & diversification.",
      color: "from-red-700 to-slate-800"
    },
    {
      icon: Building2,
      title: "Towering Presence in Computer Aided Designs",
      text: "From the humble beginning as a CAD/CAM/CAE trainer, the company has steadily grown into a towering presence in the business of computer aided designs & drafting.",
      color: "from-red-600 to-blue-900"
    },
    {
      icon: MapPin,
      title: "Registered & Administrative Offices",
      text: "Our Registered office in Chennai and admin office in Kerala.",
      color: "from-slate-800 to-red-900"
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
    },
    {
      year: "Pillar 4",
      title: "Career & Placement Drive",
      desc: "Resume optimization, mock interviews, and direct referral drives with partner companies."
    }
  ];

  return (
    <div className="space-y-20 sm:space-y-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER SECTION */}
      <div className="text-center pt-6">
        <Badge variant="red" className="mb-4">Get More About Us</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gradient font-heading tracking-tight">
          ABOUT CADPOINT
        </h1>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
          CADPOINT ® Engineering Solutions Pvt. Ltd is a premier ISO Certified company with 32 years of track record in CAD/CAM/CAE, Multimedia, IT, and Engineering Solutions.
        </p>
      </div>

      {/* ABOUT CADPOINT HIGHLIGHT POINTS (4 CARDS) */}
      <section className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aboutPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card key={index} className="p-8 border-red-500/20 flex flex-col justify-between group hover:border-red-500/50 transition-colors">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${point.color} flex items-center justify-center text-white shadow-lg shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-red-400 uppercase tracking-widest">
                      Point 0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-heading mb-3 group-hover:text-red-400 transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {point.text}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* MISSION & VISION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 sm:p-10 border-red-500/30">
          <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 mb-6">
            <Target className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white font-heading mb-4">Our Mission</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Our mission is to empower learners with modern skills and strong industry knowledge. We focus on building professionals who are confident, capable, and future-ready. By providing structured learning paths, we prepare students to excel in real careers.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-4">
            We create a holistic learning ecosystem that blends expert mentorship with practical training. Through hands-on projects and real-world exposure, learners gain job-ready experience. Our goal is to bridge the gap between education and industry demands effectively.
          </p>
        </Card>

        <Card className="p-8 sm:p-10 border-slate-700/80">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-blue-400 mb-6">
            <Eye className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-bold text-white font-heading mb-4">Our Vision</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            We strive to become the most trusted and innovative IT Academy & Service provider, empowering learners and businesses with future-ready skills.
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-4">
            Our ecosystem covers cutting-edge IT technologies, multimedia courses, CADD services across Civil, Mechanical, and Electrical domains, corporate training, and high-end mentorship.
          </p>
        </Card>
      </div>

      {/* ROADMAP */}
      <section>
        <SectionHeader
          eyebrow="Structured Learning"
          title="Our Mission Roadmap"
          subtitle="Our roadmap focuses on structured learning paths that guide students toward mastery. We emphasize practical, hands-on experience to build strong real-world capability."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <Card key={i} className="p-6 relative group border-slate-800 hover:border-red-500/40">
              <span className="text-xs font-bold text-red-400 uppercase tracking-widest block mb-2">{m.year}</span>
              <h3 className="text-lg font-bold text-white font-heading mb-2 group-hover:text-red-300 transition-colors">{m.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{m.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* FUTURE OUTLOOK */}
      <Card className="p-8 sm:p-12 bg-gradient-to-br from-red-950/40 via-[#111827] to-slate-900/60 border-red-500/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="red">Future Outlook</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
            What the Future Holds
          </h2>
          <p className="text-slate-300 text-base leading-relaxed">
            As we expand into advanced technology domains, we prioritize strong practical learning. Our focus is on hands-on projects that help students apply concepts effectively. We provide real-world problem-solving opportunities through internships and production work. This ensures every learner gains meaningful experience that prepares them for industry challenges.
          </p>
          <p className="text-slate-300 text-base leading-relaxed">
            Our curriculum covers modern domains such as AI, Machine Learning, Cloud Computing, and Cybersecurity. We also include multimedia and CADD training to broaden student expertise across industries. Each module is designed to build strong technical and creative capabilities. This comprehensive approach ensures students develop versatile, industry-ready skill sets.
          </p>
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
              AI, ML, Cloud & Cybersecurity focus
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0" />
              Personalized 1-on-1 mentorship
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              Specialized CADD & Multimedia solutions
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
