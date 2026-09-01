import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit3, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { fetchAdminCourses, updateAdminCourse } from '../services/adminApi';

export function AdminEditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Professional',
    duration: '',
    description: '',
    softwareTools: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await fetchAdminCourses();
        if (res && res.courses) {
          const match = res.courses.find(c => (c.id === id || encodeURIComponent(c.title) === id || c.title === id));
          if (match) {
            setFormData({
              title: match.title || '',
              category: match.category || 'Professional',
              duration: match.duration || '',
              description: match.description || '',
              softwareTools: Array.isArray(match.softwareTools) ? match.softwareTools.join(', ') : (match.softwareTools || ''),
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const toolsArray = formData.softwareTools.split(',').map(s => s.trim()).filter(Boolean);
      await updateAdminCourse(id, { ...formData, softwareTools: toolsArray });
      setMessage('Course program updated successfully!');
      setTimeout(() => navigate('/admin/courses'), 1200);
    } catch (err) {
      console.error(err);
      setMessage('Failed to update course.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-16 text-xs text-slate-400">Loading course details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <button
          onClick={() => navigate('/admin/courses')}
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Courses</span>
        </button>
        <h1 className="text-xl font-bold font-heading text-gradient">Edit Course Program</h1>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl glass-panel border border-amber-500/30 space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Course Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-[#0F172A]"
            >
              <option value="Professional">Professional Program</option>
              <option value="Master Diploma">Master Diploma Program</option>
              <option value="IT & Software">IT & Software</option>
              <option value="Civil & Architecture">Civil & Architecture</option>
              <option value="Mechanical & Aeronautical">Mechanical & Aeronautical</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Duration *</label>
            <input
              type="text"
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Software & Tools Covered *</label>
          <input
            type="text"
            required
            value={formData.softwareTools}
            onChange={(e) => setFormData({ ...formData, softwareTools: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Course Description *</label>
          <textarea
            rows={4}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
          />
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>{submitting ? 'Updating...' : 'Save Changes'}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/courses')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
