import React, { useState } from 'react';
import { COURSES, CATEGORIES, LEVELS } from '../utils/courseData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CustomSelect } from '../components/ui/CustomSelect';
import { Search, Clock, Laptop, ArrowRight, Filter, X, Sparkles, Layers, Box, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseHeroBanner = ({ course }) => {
  // Map domain default 3D artwork images so NO card ever renders a plain gradient
  const domainFallbackImages = {
    'IT & Non-IT': '/images/python.jpg',
    'Multimedia': '/images/htmlcss.jpg',
    'Accounting & ERP': '/images/machine_learning.jpg',
    'Civil & Architecture': '/images/c.jpg',
    'Mechanical & Aeronautical': '/images/cpp.jpg',
    'Electrical & Electronics': '/images/kubernetes.jpg',
  };

  const imageSrc = course.image || domainFallbackImages[course.domain] || '/images/python.jpg';

  return (
    <div className="relative h-44 w-full overflow-hidden bg-slate-950">
      <img
        src={imageSrc}
        alt={course.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/30" />
      <Badge variant="red" className="absolute top-3 left-3 shadow-lg backdrop-blur-md bg-red-600/90">
        {course.level}
      </Badge>
      <span className="absolute bottom-3 right-3 text-xs text-white font-medium flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-md border border-white/10">
        <Clock className="w-3.5 h-3.5 text-red-400" />
        {course.duration}
      </span>
    </div>
  );
};

export function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = COURSES.filter((course) => {
    const matchesCategory =
      selectedCategory === 'All' || course.domain === selectedCategory;
    const matchesLevel =
      selectedLevel === 'All Levels' || course.level === selectedLevel;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.software.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center pt-6">
        <Badge variant="red" className="mb-4">Course Catalog</Badge>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-gradient font-heading tracking-tight">
          Career & Technical Programs
        </h1>
        <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-3xl mx-auto">
          Explore industry-aligned certification, diploma, and master diploma programs across IT, Multimedia, CADD, and ERP domains.
        </p>
      </div>

      {/* FILTER BAR CARD */}
      <div className="glass-card p-6 rounded-2xl space-y-6 relative z-30 overflow-visible">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses or tools (Python, React, Tally, CAD)..."
              className="w-full pl-12 pr-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Filter className="w-4 h-4 text-red-400 shrink-0" />
            <CustomSelect
              options={LEVELS}
              value={selectedLevel}
              onChange={(val) => setSelectedLevel(val)}
              className="w-full md:w-auto"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-2 border-t border-white/5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-red-600 to-slate-900 text-white shadow-lg border border-red-500/30'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* COURSE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="flex flex-col justify-between h-full p-0 overflow-hidden group border-slate-800 hover:border-red-500/50">
            {/* HERO COVER BANNER (GENERATED JPG OR CUSTOM 3D ENTERPRISE BANNER) */}
            <CourseHeroBanner course={course} />

            <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
              <div>
                <h3 className="text-lg font-bold text-white font-heading mb-2 group-hover:text-red-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {course.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-red-400 mb-2">
                  <Laptop className="w-3.5 h-3.5" />
                  <span>Tools: {course.software}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                <span className="text-xs text-slate-400">{course.mode}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
                  >
                    Details
                  </button>
                  <Link to="/registration">
                    <Button variant="primary" size="sm" icon={ArrowRight}>
                      Enroll
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 glass-card rounded-2xl">
          <p className="text-slate-400 text-base">No courses found matching your filter criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedLevel('All Levels');
              setSearchQuery('');
            }}
            className="mt-4 text-red-400 hover:underline text-sm font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="glass-panel p-8 rounded-3xl max-w-lg w-full relative border border-red-500/40">
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <Badge variant="red" className="mb-3">{selectedCourse.domain}</Badge>
            <h3 className="text-2xl font-bold text-white font-heading mb-3">{selectedCourse.title}</h3>
            <p className="text-slate-300 text-sm mb-6">{selectedCourse.description}</p>
            <div className="space-y-3 mb-8 text-xs text-slate-300">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Duration:</span>
                <span className="font-semibold text-white">{selectedCourse.duration}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Mode:</span>
                <span className="font-semibold text-white">{selectedCourse.mode}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Software Covered:</span>
                <span className="font-semibold text-red-400">{selectedCourse.software}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <Link to="/registration" className="w-full">
                <Button variant="primary" className="w-full justify-center" icon={ArrowRight}>
                  Proceed to Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
