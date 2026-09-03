import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, UserCheck, Zap, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { fetchDashboardStats } from '../services/adminApi';
import { useTheme } from '../../context/ThemeContext';

export function AdminDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentRegistrations, setRecentRegistrations] = useState([]);
  const [recentPrivacy, setRecentPrivacy] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats()
      .then((res) => {
        if (res && res.stats) {
          setStats(res.stats);
          setRecentEnquiries(res.recentEnquiries || []);
          setRecentRegistrations(res.recentRegistrations || []);
          setRecentPrivacy(res.recentPrivacyRequests || []);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      {/* HEADER OVERVIEW */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div>
          <h1 className={`text-3xl sm:text-4xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
            CADPOINT Salem Head Office — Live Production Database Metrics
          </p>
        </div>
        <span className="text-xs font-bold px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-2 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>MongoDB Atlas Connected</span>
        </span>
      </div>

      {/* 5 KPI CARDS — FULL SIZING & HIGH CONTRAST */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {/* Total Courses */}
        <Link
          to="/admin/courses"
          className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl space-y-3 ${
            isDark ? 'glass-panel border-purple-500/30 hover:border-purple-500/60' : 'bg-white border-purple-200 shadow-md hover:border-purple-400'
          }`}
        >
          <div className="flex items-center justify-between text-purple-600 dark:text-purple-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Courses</span>
            <BookOpen className="w-6 h-6" />
          </div>
          <div className={`text-4xl sm:text-5xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {stats?.totalCourses || 0}
          </div>
          <p className="text-xs text-slate-500 font-medium">Active catalog programs</p>
        </Link>

        {/* Contact Enquiries */}
        <Link
          to="/admin/forms"
          className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl space-y-3 ${
            isDark ? 'glass-panel border-cyan-500/30 hover:border-cyan-500/60' : 'bg-white border-cyan-200 shadow-md hover:border-cyan-400'
          }`}
        >
          <div className="flex items-center justify-between text-cyan-600 dark:text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider">Contact Leads</span>
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className={`text-4xl sm:text-5xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {stats?.contactEnquiries || 0}
          </div>
          <p className="text-xs text-slate-500 font-medium">Contact Us submissions</p>
        </Link>

        {/* Register Now Submissions */}
        <Link
          to="/admin/forms"
          className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl space-y-3 ${
            isDark ? 'glass-panel border-emerald-500/30 hover:border-emerald-500/60' : 'bg-white border-emerald-200 shadow-md hover:border-emerald-400'
          }`}
        >
          <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Registrations</span>
            <UserCheck className="w-6 h-6" />
          </div>
          <div className={`text-4xl sm:text-5xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {stats?.registrationRequests || 0}
          </div>
          <p className="text-xs text-slate-500 font-medium">Full course applications</p>
        </Link>

        {/* Quick Admission Enquiries */}
        <Link
          to="/admin/forms"
          className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl space-y-3 ${
            isDark ? 'glass-panel border-amber-500/30 hover:border-amber-500/60' : 'bg-white border-amber-200 shadow-md hover:border-amber-400'
          }`}
        >
          <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
            <span className="text-xs font-bold uppercase tracking-wider">Quick Admissions</span>
            <Zap className="w-6 h-6" />
          </div>
          <div className={`text-4xl sm:text-5xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {stats?.quickAdmissionEnquiries || 0}
          </div>
          <p className="text-xs text-slate-500 font-medium">Instant popup enquiries</p>
        </Link>

        {/* Pending Privacy Requests */}
        <Link
          to="/admin/privacy-requests"
          className={`p-6 sm:p-7 rounded-3xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-xl space-y-3 ${
            isDark ? 'glass-panel border-red-500/30 hover:border-red-500/60' : 'bg-white border-red-200 shadow-md hover:border-red-400'
          }`}
        >
          <div className="flex items-center justify-between text-red-600 dark:text-red-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Privacy</span>
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className={`text-4xl sm:text-5xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {stats?.pendingPrivacyRequests || 0}
          </div>
          <p className="text-xs text-slate-500 font-medium">Data erasure tickets</p>
        </Link>
      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
        {/* Recent Contact Leads */}
        <div className={`p-7 rounded-3xl border space-y-5 ${
          isDark ? 'glass-panel border-white/10' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Recent Contact Leads
            </h3>
            <Link
              to="/admin/forms"
              className="text-xs font-bold text-slate-500 hover:text-emerald-600 dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="text-sm text-slate-400 italic py-4">No enquiry records available yet.</p>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((enq, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border text-sm flex items-center justify-between gap-4 transition-colors ${
                    isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <strong className={`block font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{enq.name}</strong>
                    <span className="text-xs text-slate-500">{enq.email} | {enq.subject || 'Enquiry'}</span>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-600 dark:text-purple-300 font-bold shrink-0">
                    {enq.status || 'New'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Privacy Requests */}
        <div className={`p-7 rounded-3xl border space-y-5 ${
          isDark ? 'glass-panel border-white/10' : 'bg-white border-slate-200 shadow-md'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5" />
              Recent Privacy Deletion Requests
            </h3>
            <Link
              to="/admin/privacy-requests"
              className="text-xs font-bold text-slate-500 hover:text-red-600 dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          {recentPrivacy.length === 0 ? (
            <p className="text-sm text-slate-400 italic py-4">No privacy requests logged yet.</p>
          ) : (
            <div className="space-y-3">
              {recentPrivacy.map((req, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl border text-sm flex items-center justify-between gap-4 transition-colors ${
                    isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <strong className={`block font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{req.requestId}: {req.name}</strong>
                    <span className="text-xs text-slate-500">{req.email}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold shrink-0 ${
                    req.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                      : 'bg-red-500/20 text-red-600 dark:text-red-300'
                  }`}>
                    {req.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
