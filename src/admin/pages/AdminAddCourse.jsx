import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { createAdminCourse } from '../services/adminApi';

export function AdminAddCourse() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: 'Professional Programs',
    domain: 'IT & Non-IT',
    duration: '3 Months (120 Hours)',
    level: 'Professional',
    description: '',
    softwareTools: '',
    deliveryMode: 'Offline & Online',
    featured: true,
    image: '/images/python.jpg'
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    try {
      const toolsArray = formData.softwareTools.split(',').map(s => s.trim()).filter(Boolean);
      await createAdminCourse({ ...formData, softwareTools: toolsArray });
      setMessage('Course program successfully published to database!');
      setTimeout(() => navigate('/admin/courses'), 1200);
    } catch (err) {
      console.error(err);
      setMessage('Failed to publish course. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
        <h1 className="text-xl font-bold font-heading text-gradient">Create New Course Program</h1>
      </div>

      {message && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 space-y-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-300 mb-1">Course Title *</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Professional Program AI in Full-Stack Python & React"
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Program Type *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value, level: e.target.value.includes('Master') ? 'Master Diploma' : 'Professional' })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-[#0F172A]"
            >
              <option value="Professional Programs">Professional Programs</option>
              <option value="Master Diploma Programs">Master Diploma Programs</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Course Department / Section *</label>
            <select
              value={formData.domain}
              onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-[#0F172A]"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Duration *</label>
            <input
              type="text"
              required
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder="e.g. 3 Months (120 Hours)"
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Delivery Mode *</label>
            <select
              value={formData.deliveryMode}
              onChange={(e) => setFormData({ ...formData, deliveryMode: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-[#0F172A]"
            >
              <option value="Offline & Online">Offline & Online</option>
              <option value="Offline Classroom">Offline Classroom</option>
              <option value="Online Virtual">Online Virtual</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-300 mb-1">Software & Tools Covered (Comma Separated) *</label>
          <input
            type="text"
            required
            value={formData.softwareTools}
            onChange={(e) => setFormData({ ...formData, softwareTools: e.target.value })}
            placeholder="e.g. Python, React, MongoDB, Node.js, Git, Docker"
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
            placeholder="Syllabus overview, practical lab projects, career outcomes..."
            className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
          />
        </div>

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{submitting ? 'Publishing...' : 'Publish Course'}</span>
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
