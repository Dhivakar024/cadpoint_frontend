import React from 'react';
import { Target, Eye, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { SectionHeader } from '../components/ui/SectionHeader';

export function About() {
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
      <div className="text-center pt-6">
        <Badge variant="purple" className="mb-4">About CADPOINT</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gradient font-heading tracking-tight">
          Our Journey & Mission
        </h1>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
          CADPOINT is a premier training and design institute that blends creativity, technology, and innovation. We specialize in CAD/CAM/BIM, IT, Digital Media, and Accounting — empowering learners through industry-level projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 sm:p-10 border-purple-500/30">
          <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-6">
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

        <Card className="p-8 sm:p-10 border-cyan-500/30">
          <div className="w-14 h-14 rounded-2xl bg-cyan-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-6">
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

      <section>
        <SectionHeader
          eyebrow="Structured Learning"
          title="Our Mission Roadmap"
          subtitle="Our roadmap focuses on structured learning paths that guide students toward mastery. We emphasize practical, hands-on experience to build strong real-world capability."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {milestones.map((m, i) => (
            <Card key={i} className="p-6 relative group">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-widest block mb-2">{m.year}</span>
              <h3 className="text-lg font-bold text-white font-heading mb-2 group-hover:text-cyan-300 transition-colors">{m.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{m.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <Card className="p-8 sm:p-12 bg-gradient-to-br from-purple-950/30 via-[#111827] to-cyan-950/30 border-purple-500/30">
        <div className="max-w-4xl mx-auto space-y-6">
          <Badge variant="cyan">Future Outlook</Badge>
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
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              AI, ML, Cloud & Cybersecurity focus
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
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
