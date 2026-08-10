import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, GraduationCap, PhoneCall, ArrowLeft, Search } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { useTheme } from '../context/ThemeContext';

export function NotFound() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      <SEO
        title="404 Page Not Found | CADPOINT Authorized Training Centre"
        description="The page you are looking for does not exist on CADPOINT. Explore our official CAD, BIM, IT, AI, and Multimedia courses."
        noindex={true}
      />

      <div className={`min-h-[75vh] flex items-center justify-center px-4 py-16 transition-colors duration-500 ${
        isDark ? 'bg-[#040711] text-white' : 'bg-slate-50 text-slate-900'
      }`}>
        <div className="max-w-xl mx-auto text-center space-y-8 relative z-10">
          {/* Animated 404 Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-block"
          >
            <span className={`text-8xl sm:text-9xl font-black font-heading tracking-tight ${
              isDark
                ? 'bg-gradient-to-r from-red-500 via-rose-400 to-amber-500 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent'
            }`}>
              404
            </span>
            <div className="text-xs uppercase tracking-widest font-bold mt-2 text-slate-400">
              Page Not Found
            </div>
          </motion.div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">
              Oops! We couldn't find that page
            </h1>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              The URL you requested might have been moved, renamed, or is temporarily unavailable. 
              Explore CADPOINT's career-focused training programs or head back home.
            </p>
          </div>

          {/* Quick Navigation Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <Link
              to="/"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-lg hover:scale-105 ${
                isDark
                  ? 'bg-gradient-to-r from-red-600 to-slate-900 text-white hover:shadow-red-900/30'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:shadow-emerald-900/20'
              }`}
            >
              <Home className="w-4 h-4" /> Go to Home
            </Link>

            <Link
              to="/courses"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm border transition-all hover:scale-105 ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                  : 'bg-white border-emerald-200 text-slate-800 hover:bg-emerald-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-500" /> Explore Courses
            </Link>

            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm border transition-all hover:scale-105 ${
                isDark
                  ? 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <PhoneCall className="w-4 h-4 text-red-500" /> Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
