import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, UserCheck, Zap, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { fetchDashboardStats } from '../services/adminApi';

export function AdminDashboard() {
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-extrabold font-heading text-gradient">Dashboard Overview</h1>
          <p className="text-xs text-slate-400">CADPOINT Salem Head Office — Live Database Metrics</p>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>MongoDB Atlas Connected</span>
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/admin/courses" className="p-5 rounded-3xl glass-panel border border-purple-500/30 space-y-2 hover:border-purple-500/60 transition-all">
          <div className="flex items-center justify-between text-purple-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Courses</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{stats?.totalCourses || 0}</div>
          <p className="text-[11px] text-slate-400">Active catalog programs</p>
        </Link>

        <Link to="/admin/forms" className="p-5 rounded-3xl glass-panel border border-cyan-500/30 space-y-2 hover:border-cyan-500/60 transition-all">
          <div className="flex items-center justify-between text-cyan-400">
            <span className="text-xs font-bold uppercase tracking-wider">Contact Leads</span>
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{stats?.contactEnquiries || 0}</div>
          <p className="text-[11px] text-slate-400">Direct website contact submissions</p>
        </Link>

        <Link to="/admin/forms" className="p-5 rounded-3xl glass-panel border border-emerald-500/30 space-y-2 hover:border-emerald-500/60 transition-all">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Registrations</span>
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{stats?.registrationRequests || 0}</div>
          <p className="text-[11px] text-slate-400">Student online applications</p>
        </Link>

        <Link to="/admin/privacy-requests" className="p-5 rounded-3xl glass-panel border border-red-500/30 space-y-2 hover:border-red-500/60 transition-all">
          <div className="flex items-center justify-between text-red-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Privacy Reqs</span>
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="text-3xl font-extrabold font-heading text-white">{stats?.pendingPrivacyRequests || 0}</div>
          <p className="text-[11px] text-slate-400">Data deletion requests pending review</p>
        </Link>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Recent Contact Leads
            </h3>
            <Link to="/admin/forms" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {recentEnquiries.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No enquiry records available yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentEnquiries.map((enq, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs flex items-center justify-between gap-3">
                  <div>
                    <strong className="text-white block">{enq.name}</strong>
                    <span className="text-slate-400 text-[11px]">{enq.email} | {enq.subject || 'Enquiry'}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold shrink-0">
                    {enq.status || 'New'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              Recent Privacy Deletion Requests
            </h3>
            <Link to="/admin/privacy-requests" className="text-xs text-slate-400 hover:text-white flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          {recentPrivacy.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No privacy requests logged yet.</p>
          ) : (
            <div className="space-y-2.5">
              {recentPrivacy.map((req, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs flex items-center justify-between gap-3">
                  <div>
                    <strong className="text-white block">{req.requestId}: {req.name}</strong>
                    <span className="text-slate-400 text-[11px]">{req.email}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                    req.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
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
