import React, { useState, useEffect } from 'react';
import { COURSES, CATEGORIES, LEVELS } from '../utils/courseData';
import { getCourses } from '../services/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CustomSelect } from '../components/ui/CustomSelect';
import { Search, Clock, Laptop, ArrowRight, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { SEO } from '../components/common/SEO';
import { getBreadcrumbSchema } from '../utils/seoSchemas';

const CourseHeroBanner = ({ course, isDark }) => {
  const domainFallbackImages = {
    'IT & Non-IT': '/images/python.jpg',
    'Multimedia': '/images/htmlcss.jpg',
    'Accounting & ERP': '/images/machine_learning.jpg',
    'Civil & Architecture': '/images/c.jpg',
    'Mechanical & Aeronautical': '/images/cpp.jpg',
    'Electrical & Electronics': '/images/kubernetes.jpg',
    'Digital Marketing & SEO': '/images/dm_prof_seo.jpg',
  };

  const imageSrc = course.image || domainFallbackImages[course.domain] || '/images/python.jpg';

  return (
    <div className="relative h-44 w-full overflow-hidden bg-slate-950">
      <img
        src={imageSrc}
        alt={`${course.title} course at CADPOINT`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${
        isDark ? 'from-[#0F172A] via-transparent to-black/30' : 'from-slate-900/60 via-transparent to-black/20'
      }`} />
      <Badge variant={isDark ? "red" : "emerald"} className={`absolute top-3 left-3 shadow-lg backdrop-blur-md ${
        isDark ? 'bg-red-600/90' : 'bg-emerald-600/90'
      }`}>
        {course.level || 'Professional'}
      </Badge>
      <span className="absolute bottom-3 right-3 text-xs text-white font-medium flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
        <Clock className={`w-3.5 h-3.5 ${isDark ? 'text-red-400' : 'text-emerald-400'}`} />
        {course.duration}
      </span>
    </div>
  );
};

export function Courses() {
  const [coursesList, setCoursesList] = useState(COURSES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Fetch live courses from Backend API / MongoDB
    getCourses()
      .then((res) => {
        if (res && res.courses && Array.isArray(res.courses) && res.courses.length > 0) {
          setCoursesList(res.courses);
        }
      })
      .catch((err) => {
        console.warn('Backend API courses offline, serving full static catalog fallback:', err);
      });
  }, []);

  const filteredCourses = coursesList.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All' || (course.domain || course.category) === selectedCategory;
    const matchesLevel =
      selectedLevel === 'All Levels' || (course.level || 'Professional') === selectedLevel;
    
    const softwareStr = Array.isArray(course.softwareTools) 
      ? course.softwareTools.join(', ') 
      : (course.software || course.softwareTools || '');

    const matchesSearch =
      (course.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      softwareStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.description || '').toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLevel && matchesSearch;
  });

  const coursesJsonLd = [
    getBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Courses', url: '/courses' }
    ])
  ];

  return (
    <>
      <SEO
        title="Official CADPOINT Courses | AutoCAD, Revit, Python, SolidWorks & Digital Marketing"
        description="Explore official CADPOINT courses across Civil CADD, Mechanical Design, Electrical Automation, IT & AI Full Stack, Accounts & Digital Marketing with hands-on lab training."
        keywords="CADPOINT Courses, CAD Courses, AutoCAD Training, Revit Training, BIM Courses, SolidWorks Training, Python Full Stack Course, Tally Prime"
        canonical="/courses"
        jsonLd={coursesJsonLd}
      />
      <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-6 space-y-3">
          <Badge variant={isDark ? "red" : "emerald"} className="mb-2">Course Catalog ({filteredCourses.length} Programs)</Badge>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-gradient font-heading tracking-tight">
            OFFICIAL CADPOINT COURSES
          </h1>
          <p className={`mt-4 text-base sm:text-lg max-w-3xl mx-auto ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Explore industry-aligned certification, diploma, and master diploma programs across IT, Multimedia, CADD, and ERP domains.
          </p>
        </div>

        {/* FILTER BAR CARD */}
        <div className="glass-card p-6 rounded-[24px] space-y-6 relative z-30 overflow-visible">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <Search className={`w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses or tools (Python, React, Tally, CAD)..."
                className="w-full pl-12 pr-4 py-3 rounded-xl glass-input text-sm"
              />
            </div>

            <div className="flex flex-wrap md:flex-nowrap gap-4 w-full md:w-auto items-center">
              <div className="w-full sm:w-64">
                <CustomSelect
                  options={CATEGORIES}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Filter Category"
                />
              </div>

              <div className="w-full sm:w-48">
                <CustomSelect
                  options={LEVELS}
                  value={selectedLevel}
                  onChange={setSelectedLevel}
                  placeholder="Filter Level"
                />
              </div>
            </div>
          </div>
        </div>

        {/* COURSES GRID */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <Filter className="w-12 h-12 text-slate-500 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-white font-heading">No matching courses found</h3>
            <p className="text-sm text-slate-400">Try adjusting your category, level, or search keyword.</p>
            <Button variant="secondary" onClick={() => { setSelectedCategory('All'); setSelectedLevel('All Levels'); setSearchQuery(''); }}>
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <div
                key={course.id || idx}
                className="group glass-card rounded-[24px] overflow-hidden flex flex-col justify-between hover:border-purple-500/50 transition-all duration-300 shadow-xl"
              >
                <div>
                  <CourseHeroBanner course={course} isDark={isDark} />
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {course.domain || course.category}
                      </span>
                      <span className="text-xs text-slate-400">{course.mode || 'Online / Offline'}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-heading group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="pt-2 border-t border-white/10">
                      <span className="text-[11px] font-semibold text-slate-400 block mb-1">Software & Tools:</span>
                      <p className="text-xs text-cyan-300 font-mono truncate">
                        {Array.isArray(course.softwareTools) ? course.softwareTools.join(', ') : (course.software || course.softwareTools || 'Industry Tools')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    View Details
                  </button>
                  <Link
                    to="/registration"
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1 shadow-md cursor-pointer"
                  >
                    Enroll Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK VIEW DETAILS MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-xl rounded-3xl p-6 sm:p-8 glass-panel border border-purple-500/40 space-y-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-start pb-3 border-b border-white/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 block">{selectedCourse.domain || selectedCourse.category}</span>
                <h3 className="text-xl font-extrabold font-heading text-white">{selectedCourse.title}</h3>
              </div>
              <button onClick={() => setSelectedCourse(null)} className="p-1.5 rounded-full text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Duration</span>
                  <strong className="text-white text-sm">{selectedCourse.duration}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 block text-[10px]">Level</span>
                  <strong className="text-white text-sm">{selectedCourse.level || 'Professional'}</strong>
                </div>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">Software & Tools Covered:</span>
                <p className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-cyan-300 font-mono text-xs">
                  {Array.isArray(selectedCourse.softwareTools) ? selectedCourse.softwareTools.join(', ') : (selectedCourse.software || selectedCourse.softwareTools || 'Industry Tools')}
                </p>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">Course Description & Syllabus:</span>
                <p className="leading-relaxed text-slate-300 p-3 rounded-xl bg-white/5 border border-white/10">{selectedCourse.description}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-3">
              <button onClick={() => setSelectedCourse(null)} className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs cursor-pointer">
                Close
              </button>
              <Link
                to="/registration"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
              >
                <span>Apply for Course</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
