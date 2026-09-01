import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, PlusCircle, Search, Trash2, Eye, Edit3, X, AlertTriangle } from 'lucide-react';
import { fetchAdminCourses, deleteAdminCourse } from '../services/adminApi';

export function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
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

  const filtered = courses.filter(c => {
    const matchesSearch = (c.title || '').toLowerCase().includes(search.toLowerCase()) ||
                          (c.category || '').toLowerCase().includes(search.toLowerCase());
    const matchesCat = category === 'All' || c.category === category;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-gradient">Courses Catalog Management</h1>
          <p className="text-xs text-slate-400">Manage programs displayed live on public website /courses</p>
        </div>
        <Link
          to="/admin/courses/add"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Course</span>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses by name or software..."
            className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 shrink-0">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-xl glass-input text-xs bg-[#0F172A] w-full sm:w-auto"
          >
            <option value="All">All Categories</option>
            <option value="Professional">Professional Programs</option>
            <option value="Master Diploma">Master Diploma Programs</option>
            <option value="IT & Software">IT & Software</option>
            <option value="Civil & Architecture">Civil & Architecture</option>
            <option value="Mechanical & Aeronautical">Mechanical & Aeronautical</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-xs text-slate-400">Loading course catalog from database...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-xs text-slate-400 italic">No courses found matching criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((crs, i) => (
            <div key={i} className="p-5 rounded-3xl glass-panel border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {crs.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{crs.duration}</span>
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
      )}

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
              <p><strong>Software Tools:</strong> {Array.isArray(viewModal.softwareTools) ? viewModal.softwareTools.join(', ') : viewModal.softwareTools}</p>
              <p><strong>Description:</strong> {viewModal.description}</p>
            </div>
            <button onClick={() => setViewModal(null)} className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer">
              Close Details
            </button>
          </div>
        </div>
      )}

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
