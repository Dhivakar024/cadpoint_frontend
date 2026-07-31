import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Award,
  Sparkles,
  Laptop,
  GraduationCap,
  Users,
  Monitor,
  TrendingUp,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function WhyChooseUs() {
  const features = [
    {
      id: 1,
      icon: Briefcase,
      title: "Industry-Oriented Training",
      desc: "Learn practical skills through real-world projects and industry workflows.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 2,
      icon: Award,
      title: "Globally Recognized Certification",
      desc: "Receive certifications valued by industries with placement guidance.",
      color: "from-cyan-500 to-blue-600"
    },
    {
      id: 3,
      icon: Sparkles,
      title: "Updated Curriculum",
      desc: "Courses are continuously updated with the latest technologies.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 4,
      icon: Laptop,
      title: "Hands-On Learning",
      desc: "Practice with live projects, assignments and practical exercises.",
      color: "from-amber-500 to-orange-600"
    },
    {
      id: 5,
      icon: GraduationCap,
      title: "Expert Trainers",
      desc: "Learn from experienced professionals and certified instructors.",
      color: "from-pink-500 to-rose-600"
    },
    {
      id: 6,
      icon: Users,
      title: "Personalized Mentorship",
      desc: "Small batches ensure one-to-one guidance and better learning.",
      color: "from-violet-500 to-purple-600"
    },
    {
      id: 7,
      icon: Monitor,
      title: "Flexible Learning",
      desc: "Choose online or classroom training with dedicated support.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 8,
      icon: TrendingUp,
      title: "Career Support",
      desc: "Resume building, interview preparation and placement assistance.",
      color: "from-teal-500 to-emerald-600"
    },
    {
      id: 9,
      icon: CheckCircle2,
      title: "Skill-Based Learning",
      desc: "Complete your training based on your practical mastery instead of fixed classroom hours.",
      color: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden border-t border-white/10 bg-grid-pattern">
      {/* Background Radial Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="purple">WHY CADPOINT</Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
            Why Thousands of Students Choose <span className="text-gradient-purple">CADPOINT</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Empowering students and professionals with industry-focused training, hands-on learning and career-ready skills.
          </p>
        </div>

        {/* 3 x 3 FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-8 h-full flex flex-col justify-between group border-purple-500/20 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-950/40 transition-all duration-300 transform hover:-translate-y-1.5">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                        0{item.id}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white font-heading mb-3 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* BOTTOM CTA CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative rounded-3xl p-10 sm:p-14 bg-gradient-to-r from-purple-950/60 via-[#111827] to-cyan-950/60 border border-purple-500/30 overflow-hidden shadow-2xl text-center flex flex-col items-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <h3 className="text-2xl sm:text-4xl font-extrabold text-white font-heading tracking-tight max-w-2xl">
              Ready to Build Your Career?
            </h3>
            <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
              Join CADPOINT and gain industry-ready skills through practical learning and expert mentorship.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/courses">
                <Button variant="primary" size="lg" icon={ArrowRight}>
                  Explore Courses
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="secondary" size="lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
