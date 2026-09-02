import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlusCircle, Search, Trash2, Eye, Edit3, X, AlertTriangle, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { fetchAdminCourses, deleteAdminCourse } from '../services/adminApi';

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
    <div className="space-y-6 pb-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-gradient">Courses Catalog Management</h1>
          <p className="text-xs text-slate-400">
            Total {courses.length} courses loaded from production database
          </p>
        </div>
        <Link
          to="/admin/courses/add"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Course</span>
        </Link>
      </div>

      {/* ALIGNED RESPONSIVE FILTER ROW */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
          {/* SEARCH INPUT */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Search Courses
            </label>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                placeholder="Search by title, software..."
                className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
              />
            </div>
          </div>

          {/* FILTER 1: PROGRAM TYPE */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Program Type
            </label>
            <select
              value={programType}
              onChange={(e) => { setProgramType(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-[#0F172A] text-white cursor-pointer"
            >
              {PROGRAM_OPTIONS.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* FILTER 2: DEPARTMENT / COURSE SECTION */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Course Department
            </label>
            <select
              value={department}
              onChange={(e) => { setDepartment(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-[#0F172A] text-white cursor-pointer truncate"
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
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </div>

        {/* ACTIVE FILTER SUMMARY */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/5">
          <span>
            Showing <strong className="text-white">{filteredCourses.length}</strong> of <strong className="text-white">{courses.length}</strong> programs
          </span>
          <span className="text-[10px] text-cyan-400 font-medium">
            Department: {department} | Program: {programType}
          </span>
        </div>
      </div>

      {/* COURSES LIST / GRID */}
      {loading ? (
        <div className="text-center py-20 text-xs text-slate-400 space-y-2">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Loading course catalog from database...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-16 text-xs text-slate-400 italic p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
          <p className="text-sm font-semibold text-white">No courses found for {department !== 'All Departments' ? department : 'selected criteria'}.</p>
          <p className="text-slate-400">Try adjusting your Department, Program Type, or search keyword.</p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedCourses.map((crs, i) => (
              <div key={crs.id || i} className="p-5 rounded-3xl glass-panel border border-white/10 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 truncate max-w-[170px]">
                      {CANONICAL_DEPT_MAP[crs.domain || crs.department || crs.category] || crs.domain || crs.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">{crs.duration}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white line-clamp-2 font-heading">{crs.title}</h3>
                  <p className="text-xs text-slate-300 line-clamp-2">{crs.description}</p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-xs">
                  <button
                    onClick={() => setViewModal(crs)}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                  <Link
                    to={`/admin/courses/edit/${crs.id || encodeURIComponent(crs.title)}`}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-amber-300 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Link>
                  <button
                    onClick={() => setDeleteModal(crs)}
                    className="px-3 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[11px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION CONTROLS */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <span className="text-slate-400 font-semibold">
                Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}

      {/* VIEW COURSE DETAILS MODAL */}
      {viewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl p-6 glass-panel border border-purple-500/40 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <h3 className="text-base font-bold font-heading text-white">{viewModal.title}</h3>
              <button onClick={() => setViewModal(null)} className="p-1 rounded-full text-slate-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <p><strong>Department / Domain:</strong> {CANONICAL_DEPT_MAP[viewModal.domain || viewModal.department || viewModal.category] || viewModal.domain || viewModal.category}</p>
              <p><strong>Program Type:</strong> {viewModal.category || viewModal.level}</p>
              <p><strong>Duration:</strong> {viewModal.duration}</p>
              <p><strong>Software Tools:</strong> {Array.isArray(viewModal.softwareTools) ? viewModal.softwareTools.join(', ') : (viewModal.softwareTools || viewModal.software)}</p>
              <p><strong>Description:</strong> {viewModal.description}</p>
            </div>
            <button onClick={() => setViewModal(null)} className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer">
              Close Details
            </button>
          </div>
        </div>
      )}

      {/* DELETE COURSE MODAL */}
      {deleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl p-6 glass-panel border border-red-500/40 text-center space-y-4">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Delete Course Program?</h3>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete <strong className="text-white">"{deleteModal.title}"</strong>?
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Yes, Delete Course
              </button>
              <button
                onClick={() => setDeleteModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
