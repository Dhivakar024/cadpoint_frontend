import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlusCircle, Search, Trash2, Eye, Edit3, X, AlertTriangle, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { fetchAdminCourses, deleteAdminCourse } from '../services/adminApi';
import { useTheme } from '../../context/ThemeContext';

const ITEMS_PER_PAGE = 18;

// Requirement 2: Exact Canonical Department Options
const DEPARTMENT_OPTIONS = [
  'All Departments',
  'IT & Non-IT',
  'Multimedia',
  'Accounts & Finance',
  'Civil & Architecture',
  'Mechanical & Aeronautical Designing',
  'Electrical & Electronics Designing',
  'Digital Marketing & SEO',
];

// Requirement 6: Program Type Options
const PROGRAM_OPTIONS = [
  'All Categories',
  'Professional Programs',
  'Master Diploma Programs',
];

// Canonical Alias Mapping Table for 100% Exact Matching
const CANONICAL_DEPT_MAP = {
  'IT & Non-IT': 'IT & Non-IT',
  'IT & Software': 'IT & Non-IT',
  'Multimedia': 'Multimedia',
  'Accounting & ERP': 'Accounts & Finance',
  'Accounts & Finance': 'Accounts & Finance',
  'Civil & Architecture': 'Civil & Architecture',
  'Mechanical & Aeronautical': 'Mechanical & Aeronautical Designing',
  'Mechanical & Aeronautical Designing': 'Mechanical & Aeronautical Designing',
  'Electrical & Electronics': 'Electrical & Electronics Designing',
  'Electrical & Electronics Designing': 'Electrical & Electronics Designing',
  'Digital Marketing & SEO': 'Digital Marketing & SEO',
};

export function AdminCourses() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Filter 1: Program Type
  const [programType, setProgramType] = useState('All Categories');
  
  // Filter 2: Department / Section
  const [department, setDepartment] = useState('All Departments');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [viewModal, setViewModal] = useState(null);
  const [deleteModal, setDeleteModal] = useState(null);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminCourses();
      if (res && res.courses) {
        setCourses(res.courses);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleDelete = async () => {
    if (!deleteModal) return;
    try {
      await deleteAdminCourse(deleteModal.id || deleteModal.title);
      setCourses(prev => prev.filter(c => (c.id || c.title) !== (deleteModal.id || deleteModal.title)));
    } catch (err) {
      console.error(err);
    } finally {
      setDeleteModal(null);
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setProgramType('All Categories');
    setDepartment('All Departments');
    setCurrentPage(1);
  };

  // Requirement 3 & 5 & 7: Exact Canonical Filter Matching Logic
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      // 1. Program Type Filter
      let matchesProgram = true;
      const catLower = (c.category || c.level || '').toLowerCase();
      if (programType === 'Professional Programs') {
        matchesProgram = catLower.includes('professional');
      } else if (programType === 'Master Diploma Programs') {
        matchesProgram = catLower.includes('master');
      }

      // 2. Department Filter — EXACT Canonical Comparison
      let matchesDepartment = true;
      if (department !== 'All Departments') {
        const rawDept = (c.domain || c.department || c.category || '').trim();
        const canonDept = CANONICAL_DEPT_MAP[rawDept] || rawDept;
        matchesDepartment = (canonDept === department);
      }

      // 3. Search Query
      const softwareStr = Array.isArray(c.softwareTools) ? c.softwareTools.join(' ') : (c.softwareTools || c.software || '');
      const matchesSearch =
        !search ||
        (c.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.category || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.domain || '').toLowerCase().includes(search.toLowerCase()) ||
        softwareStr.toLowerCase().includes(search.toLowerCase());

      return matchesProgram && matchesDepartment && matchesSearch;
    });
  }, [courses, programType, department, search]);

  // Paginated Courses for Fast DOM Performance
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE) || 1;
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  return (
    <div className="space-y-8 pb-8">
      {/* PAGE HEADER */}
      <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-6 border-b ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Courses Catalog Management
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Total {courses.length} courses loaded from production database
          </p>
        </div>
        <Link
          to="/admin/courses/add"
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer transition-all shrink-0"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Course</span>
        </Link>
      </div>

      {/* ALIGNED RESPONSIVE FILTER ROW */}
      <div className={`p-6 rounded-3xl border space-y-4 ${
        isDark ? 'glass-panel border-white/10' : 'bg-white border-slate-200 shadow-md'
      }`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          {/* SEARCH INPUT */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Search Courses
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search by title, software..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all ${
                  isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-emerald-500'
                }`}
              />
            </div>
          </div>

          {/* FILTER 1: PROGRAM TYPE */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Program Type
            </label>
            <select
              value={programType}
              onChange={(e) => { setProgramType(e.target.value); setCurrentPage(1); }}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer ${
                isDark ? 'bg-[#0F172A] text-white border border-white/10' : 'bg-white text-slate-900 border border-slate-300 shadow-sm'
              }`}
            >
              {PROGRAM_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* FILTER 2: DEPARTMENT / COURSE SECTION */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Course Department
            </label>
            <select
              value={department}
              onChange={(e) => { setDepartment(e.target.value); setCurrentPage(1); }}
              className={`w-full px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer truncate ${
                isDark ? 'bg-[#0F172A] text-white border border-white/10' : 'bg-white text-slate-900 border border-slate-300 shadow-sm'
              }`}
            >
              {DEPARTMENT_OPTIONS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          {/* RESET FILTERS BUTTON */}
          <div>
            <button
              onClick={handleResetFilters}
              className={`w-full py-2.5 px-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white'
                  : 'bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* ACTIVE FILTER SUMMARY */}
        <div className={`flex items-center justify-between text-xs text-slate-500 pt-3 border-t ${
          isDark ? 'border-white/5' : 'border-slate-100'
        }`}>
          <span>
            Showing <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{filteredCourses.length}</strong> of <strong className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{courses.length}</strong> programs
          </span>
          {totalPages > 1 && (
            <span>Page {currentPage} of {totalPages}</span>
          )}
        </div>
      </div>

      {/* COURSE CARDS GRID */}
      {loading ? (
        <div className="text-center py-20 text-sm text-slate-400">Loading courses catalog...</div>
      ) : paginatedCourses.length === 0 ? (
        <div className={`text-center py-20 rounded-3xl border space-y-3 ${
          isDark ? 'glass-panel border-white/10' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <p className="text-sm text-slate-400 italic">No courses found matching selected filters.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.map((course) => {
            const isMaster = (course.category || course.level || '').toLowerCase().includes('master');
            const softwareList = Array.isArray(course.softwareTools)
              ? course.softwareTools
              : (course.softwareTools || course.software || '').split(',').filter(Boolean);

            return (
              <div
                key={course.id || course.title}
                className={`p-6 rounded-3xl border flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl space-y-4 ${
                  isDark ? 'glass-panel border-white/10 hover:border-emerald-500/40' : 'bg-white border-slate-200 shadow-md hover:border-emerald-400'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                      isMaster
                        ? 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30'
                    }`}>
                      {isMaster ? 'Master Diploma' : 'Professional'}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold truncate max-w-[130px]">
                      {CANONICAL_DEPT_MAP[course.domain || course.department] || course.domain || course.department || 'CADPOINT'}
                    </span>
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold line-clamp-2 leading-snug ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {course.title}
                  </h3>

                  {course.duration && (
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                      <span className="font-bold">Duration:</span> {course.duration}
                    </p>
                  )}

                  {softwareList.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {softwareList.slice(0, 3).map((tool, idx) => (
                        <span
                          key={idx}
                          className={`text-[11px] px-2.5 py-0.5 rounded-lg font-semibold ${
                            isDark ? 'bg-white/5 text-slate-300 border border-white/5' : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {tool.trim()}
                        </span>
                      ))}
                      {softwareList.length > 3 && (
                        <span className="text-[10px] text-slate-400 px-1 py-0.5 self-center">
                          +{softwareList.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* CARD ACTIONS */}
                <div className={`flex items-center justify-between pt-4 border-t gap-2 ${
                  isDark ? 'border-white/5' : 'border-slate-100'
                }`}>
                  <button
                    onClick={() => setViewModal(course)}
                    className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isDark ? 'bg-white/5 hover:bg-white/10 text-cyan-400' : 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>

                  <Link
                    to={`/admin/courses/edit/${course.id || course.slug || encodeURIComponent(course.title)}`}
                    className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      isDark ? 'bg-white/5 hover:bg-white/10 text-purple-400' : 'bg-purple-50 hover:bg-purple-100 text-purple-700'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>

                  <button
                    onClick={() => setDeleteModal(course)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      isDark ? 'bg-white/5 hover:bg-red-500/20 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'
                    }`}
                    title="Delete Course"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* PAGINATION CONTROLS */}
      {totalPages > 1 && (
        <div className={`flex items-center justify-center gap-3 pt-6 border-t ${
          isDark ? 'border-white/10' : 'border-slate-200'
        }`}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className={`p-2.5 rounded-2xl border flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-300 text-slate-700 shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>
          <span className="text-xs font-bold text-slate-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className={`p-2.5 rounded-2xl border flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              isDark ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-white border-slate-300 text-slate-700 shadow-sm'
            }`}
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* VIEW MODAL */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className={`relative w-full max-w-lg rounded-3xl p-8 border space-y-5 text-sm ${
            isDark ? 'glass-panel border-cyan-500/40' : 'bg-white border-slate-200 shadow-2xl'
          }`}>
            <div className={`flex justify-between items-center pb-3 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
              <h3 className={`text-lg font-bold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {viewModal.title}
              </h3>
              <button
                onClick={() => setViewModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className={`space-y-3 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Category:</strong> {viewModal.category || 'Professional Program'}</p>
              <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Department:</strong> {viewModal.domain || viewModal.department || 'N/A'}</p>
              <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Duration:</strong> {viewModal.duration || 'N/A'}</p>
              <p><strong className={isDark ? 'text-white' : 'text-slate-900'}>Overview:</strong> {viewModal.description || viewModal.overview || 'No description provided.'}</p>
            </div>
            <button
              onClick={() => setViewModal(null)}
              className={`w-full py-3 rounded-2xl font-bold text-sm transition-colors cursor-pointer ${
                isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className={`relative w-full max-w-md rounded-3xl p-8 border text-center space-y-5 ${
            isDark ? 'glass-panel border-red-500/40' : 'bg-white border-red-300 shadow-2xl'
          }`}>
            <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-500 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h3 className={`text-lg font-bold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Confirm Delete
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Are you sure you want to delete <strong>{deleteModal.title}</strong>? This action will permanently remove the course from the database catalog.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => setDeleteModal(null)}
                className={`py-3 px-5 rounded-2xl font-bold text-sm transition-colors cursor-pointer ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="py-3 px-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-colors shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
