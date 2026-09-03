import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Edit3, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { fetchAdminCourses, updateAdminCourse } from '../services/adminApi';
import { useTheme } from '../../context/ThemeContext';

export function AdminEditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    title: '',
    category: 'Professional Programs',
    domain: 'IT & Non-IT',
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
              category: match.category || 'Professional Programs',
              domain: match.domain || 'IT & Non-IT',
              duration: match.duration || '',
              description: match.description || '',
              softwareTools: Array.isArray(match.softwareTools) ? match.softwareTools.join(', ') : (match.softwareTools || match.software || ''),
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
    return <div className="text-center py-20 text-sm text-slate-400">Loading course details...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className={`flex items-center justify-between pb-6 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
        <button
          onClick={() => navigate('/admin/courses')}
          className={`flex items-center gap-2 text-sm font-bold transition-colors cursor-pointer ${
            isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Courses</span>
        </button>
        <h1 className={`text-2xl sm:text-3xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Edit Course Program
        </h1>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`p-8 rounded-3xl border space-y-6 text-sm ${
        isDark ? 'glass-panel border-amber-500/30' : 'bg-white border-slate-200 shadow-xl'
      }`}>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Course Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className={`w-full p-3.5 rounded-2xl text-sm transition-all ${
              isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-emerald-500'
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Program Type *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={`w-full p-3.5 rounded-2xl text-sm font-semibold cursor-pointer ${
                isDark ? 'bg-[#0F172A] text-white border border-white/10' : 'bg-white text-slate-900 border border-slate-300 shadow-sm'
              }`}
            >
              <option value="Professional Programs">Professional Programs</option>
              <option value="Master Diploma Programs">Master Diploma Programs</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Department / Domain *
            </label>
            <select
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className={`w-full p-3.5 rounded-2xl text-sm font-semibold cursor-pointer ${
                isDark ? 'bg-[#0F172A] text-white border border-white/10' : 'bg-white text-slate-900 border border-slate-300 shadow-sm'
              }`}
            >
              <option value="IT & Non-IT">IT & Non-IT</option>
              <option value="Multimedia">Multimedia</option>
              <option value="Accounts & Finance">Accounts & Finance</option>
              <option value="Civil & Architecture">Civil & Architecture</option>
              <option value="Mechanical & Aeronautical Designing">Mechanical & Aeronautical Designing</option>
              <option value="Electrical & Electronics Designing">Electrical & Electronics Designing</option>
              <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Duration *
          </label>
          <input
            type="text"
            required
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className={`w-full p-3.5 rounded-2xl text-sm transition-all ${
              isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-emerald-500'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Software Tools (Comma Separated) *
          </label>
          <input
            type="text"
            required
            value={formData.softwareTools}
            onChange={(e) => setFormData({ ...formData, softwareTools: e.target.value })}
            className={`w-full p-3.5 rounded-2xl text-sm transition-all ${
              isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-emerald-500'
            }`}
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Course Overview & Syllabus Summary *
          </label>
          <textarea
            rows="4"
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className={`w-full p-3.5 rounded-2xl text-sm transition-all ${
              isDark ? 'glass-input' : 'bg-white border border-slate-300 text-slate-900 shadow-sm focus:border-emerald-500'
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {submitting ? 'Saving Course Changes...' : 'Save Course Changes'}
        </button>
      </form>
    </div>
  );
}
