import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlusCircle, Search, Trash2, Eye, Edit3, X, AlertTriangle, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { fetchAdminCourses, deleteAdminCourse } from '../services/adminApi';

const ITEMS_PER_PAGE = 18;

export function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Requirement 1: Category Filter with ONLY 3 options
  const [category, setCategory] = useState('All Categories');
  
  // Requirement 2: Specific Course Filter Dropdown
  const [selectedCourseId, setSelectedCourseId] = useState('All Courses');
  
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

  // Compute dynamic course list options based on current category selection
  const courseOptionsForCategory = useMemo(() => {
    return courses.filter(c => {
      if (category === 'All Categories') return true;
      if (category === 'Professional Programs') {
        return (c.category || '').toLowerCase().includes('professional');
      }
      if (category === 'Master Diploma Programs') {
        return (c.category || '').toLowerCase().includes('master');
      }
      return true;
    });
  }, [courses, category]);

  // Requirement 2: Auto-reset course dropdown if selected course doesn't match new category
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);

    if (selectedCourseId !== 'All Courses') {
      const isStillValid = courses.some(c => {
        const matchesId = c.id === selectedCourseId || c.title === selectedCourseId;
        if (!matchesId) return false;

        if (newCategory === 'All Categories') return true;
        if (newCategory === 'Professional Programs') return (c.category || '').toLowerCase().includes('professional');
        if (newCategory === 'Master Diploma Programs') return (c.category || '').toLowerCase().includes('master');
        return true;
      });

      if (!isStillValid) {
        setSelectedCourseId('All Courses');
      }
    }
  };

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

  // Filtered courses based on search, category, and selected specific course
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      // 1. Category Filter
      let matchesCat = true;
      if (category === 'Professional Programs') {
        matchesCat = (c.category || '').toLowerCase().includes('professional');
      } else if (category === 'Master Diploma Programs') {
        matchesCat = (c.category || '').toLowerCase().includes('master');
      }

      // 2. Specific Course Selection Filter
      let matchesSpecificCourse = true;
      if (selectedCourseId !== 'All Courses') {
        matchesSpecificCourse = (c.id === selectedCourseId || c.title === selectedCourseId);
      }

      // 3. Search Query
      const softwareStr = Array.isArray(c.softwareTools) ? c.softwareTools.join(' ') : (c.softwareTools || c.software || '');
      const matchesSearch =
        (c.title || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.category || '').toLowerCase().includes(search.toLowerCase()) ||
        softwareStr.toLowerCase().includes(search.toLowerCase());

      return matchesCat && matchesSpecificCourse && matchesSearch;
    });
  }, [courses, category, selectedCourseId, search]);

  // Paginated Courses for rendering performance
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE) || 1;
  const paginatedCourses = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCourses.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCourses, currentPage]);

  return (
    <div className="space-y-6 pb-8">
      {/* HEADER BAR */}
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

      {/* FILTER BAR: CATEGORY + COURSE SELECT + SEARCH */}
      <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* SEARCH INPUT */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by title or software tools..."
              className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
            />
          </div>

          {/* REQUIREMENT 1: CATEGORY FILTER WITH ONLY 3 OPTIONS */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Category Filter
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-[#0F172A] text-white cursor-pointer"
            >
              <option value="All Categories">All Categories</option>
              <option value="Professional Programs">Professional Programs</option>
              <option value="Master Diploma Programs">Master Diploma Programs</option>
            </select>
          </div>

          {/* REQUIREMENT 2: SPECIFIC COURSE SELECTION FILTER */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Select Specific Course
            </label>
            <select
              value={selectedCourseId}
              onChange={(e) => { setSelectedCourseId(e.target.value); setCurrentPage(1); }}
              className="w-full px-3 py-2 rounded-xl glass-input text-xs bg-[#0F172A] text-white cursor-pointer truncate"
            >
              <option value="All Courses">All Courses ({courseOptionsForCategory.length})</option>
              {courseOptionsForCategory.map((crs) => (
                <option key={crs.id || crs.title} value={crs.id || crs.title}>
                  {crs.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ACTIVE FILTER SUMMARY */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
          <span>Showing <strong className="text-white">{filteredCourses.length}</strong> of <strong className="text-white">{courses.length}</strong> programs</span>
          {(category !== 'All Categories' || selectedCourseId !== 'All Courses' || search) && (
            <button
              onClick={() => { setCategory('All Categories'); setSelectedCourseId('All Courses'); setSearch(''); setCurrentPage(1); }}
              className="text-cyan-400 hover:underline cursor-pointer font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* COURSES LIST / GRID */}
      {loading ? (
        <div className="text-center py-20 text-xs text-slate-400 space-y-2">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p>Loading course catalog from database...</p>
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-20 text-xs text-slate-400 italic p-6 rounded-3xl glass-panel border border-white/10 space-y-2">
          <Filter className="w-8 h-8 text-slate-500 mx-auto" />
          <p>No courses found matching selected filters.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedCourses.map((crs, i) => (
              <div key={crs.id || i} className="p-5 rounded-3xl glass-panel border border-white/10 space-y-4 flex flex-col justify-between hover:border-purple-500/40 transition-all">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {crs.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{crs.duration}</span>
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
              <p><strong>Category:</strong> {viewModal.category}</p>
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
