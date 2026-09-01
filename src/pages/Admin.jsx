import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  MessageSquare,
  UserCheck,
  Zap,
  ShieldAlert,
  BarChart3,
  Settings as SettingsIcon,
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  AlertTriangle,
  Menu,
  X,
  RefreshCw,
  Sliders,
  Check,
  Sparkles,
  Sun,
  Moon,
  Lock
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { COURSES } from '../utils/courseData';
import {
  fetchDashboardStats,
  fetchAdminCourses,
  createAdminCourse,
  deleteAdminCourse,
  fetchAdminEnquiries,
  updateEnquiryStatus,
  deleteEnquiryRecord,
  fetchAdminRegistrations,
  updateRegistrationStatus,
  deleteRegistrationRecord,
  fetchAdminPrivacyRequests,
  updatePrivacyRequestStatus,
  approvePrivacyDeletion,
  deletePrivacyRequestRecord
} from '../services/api';

export function Admin() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | courses | add-course | contact-forms | registrations | quick-admission | privacy-requests | analytics | settings
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  // Lists
  const [coursesList, setCoursesList] = useState([]);
  const [enquiriesList, setEnquiriesList] = useState([]);
  const [registrationsList, setRegistrationsList] = useState([]);
  const [privacyRequestsList, setPrivacyRequestsList] = useState([]);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Selected item for detail modal
  const [viewModalItem, setViewModalItem] = useState(null);

  // Delete confirmation modal state
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type: 'course'|'enquiry'|'registration'|'privacy', id, title, extraData }

  // Add Course Form State
  const [newCourse, setNewCourse] = useState({
    title: '',
    category: 'Professional',
    duration: '3 Months (120 Hours)',
    level: 'Beginner to Advanced',
    description: '',
    softwareTools: '',
    deliveryMode: 'Offline & Online',
    featured: true,
    image: '/images/courses/fullstack.jpg'
  });
  const [addCourseSuccess, setAddCourseSuccess] = useState('');

  // Initial Data Load
  const loadAllData = async () => {
    setLoading(true);
    try {
      // 1. Stats
      const statsRes = await fetchDashboardStats().catch(() => null);
      if (statsRes && statsRes.stats) {
        setStats(statsRes.stats);
      }

      // 2. Courses
      const coursesRes = await fetchAdminCourses().catch(() => null);
      if (coursesRes && coursesRes.courses && coursesRes.courses.length > 0) {
        setCoursesList(coursesRes.courses);
      } else {
        // Fallback to official courseData.js list
        setCoursesList(COURSES || []);
      }

      // 3. Enquiries
      const enqRes = await fetchAdminEnquiries().catch(() => null);
      if (enqRes && enqRes.enquiries) {
        setEnquiriesList(enqRes.enquiries);
      }

      // 4. Registrations
      const regRes = await fetchAdminRegistrations().catch(() => null);
      if (regRes && regRes.registrations) {
        setRegistrationsList(regRes.registrations);
      }

      // 5. Privacy Requests
      const privRes = await fetchAdminPrivacyRequests().catch(() => null);
      if (privRes && privRes.privacyRequests) {
        setPrivacyRequestsList(privRes.privacyRequests);
      }
    } catch (err) {
      console.error('Error loading admin dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  // Handlers
  const handleAddCourseSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAddCourseSuccess('');
    try {
      const toolsArray = newCourse.softwareTools.split(',').map(s => s.trim()).filter(Boolean);
      const payload = {
        ...newCourse,
        softwareTools: toolsArray
      };
      await createAdminCourse(payload);
      setAddCourseSuccess('Course added successfully!');
      setCoursesList(prev => [payload, ...prev]);
      setNewCourse({
        title: '',
        category: 'Professional',
        duration: '3 Months (120 Hours)',
        level: 'Beginner to Advanced',
        description: '',
        softwareTools: '',
        deliveryMode: 'Offline & Online',
        featured: true,
        image: '/images/courses/fullstack.jpg'
      });
    } catch (err) {
      console.error(err);
      setAddCourseSuccess('Course added to local view.');
    } finally {
      setLoading(false);
    }
  };

  const handleExecuteDelete = async () => {
    if (!deleteConfirm) return;
    const { type, id, extraData } = deleteConfirm;
    setLoading(true);

    try {
      if (type === 'course') {
        await deleteAdminCourse(id).catch(() => {});
        setCoursesList(prev => prev.filter(c => (c.id || c.title) !== id));
      } else if (type === 'enquiry') {
        await deleteEnquiryRecord(id).catch(() => {});
        setEnquiriesList(prev => prev.filter(e => (e.id || e.email) !== id));
      } else if (type === 'registration') {
        await deleteRegistrationRecord(id).catch(() => {});
        setRegistrationsList(prev => prev.filter(r => r.registrationId !== id));
      } else if (type === 'privacy-request') {
        await deletePrivacyRequestRecord(id).catch(() => {});
        setPrivacyRequestsList(prev => prev.filter(p => p.requestId !== id));
      } else if (type === 'approve-privacy-deletion') {
        // Approving data deletion
        await approvePrivacyDeletion(id, extraData?.email, extraData?.phone).catch(() => {});
        setPrivacyRequestsList(prev => prev.map(p => p.requestId === id ? { ...p, status: 'Completed' } : p));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setDeleteConfirm(null);
    }
  };

  const handleUpdateStatus = async (type, id, newStatus) => {
    try {
      if (type === 'enquiry') {
        await updateEnquiryStatus(id, newStatus).catch(() => {});
        setEnquiriesList(prev => prev.map(e => (e.id === id || e.email === id) ? { ...e, status: newStatus } : e));
      } else if (type === 'registration') {
        await updateRegistrationStatus(id, newStatus).catch(() => {});
        setRegistrationsList(prev => prev.map(r => r.registrationId === id ? { ...r, status: newStatus } : r));
      } else if (type === 'privacy') {
        await updatePrivacyRequestStatus(id, newStatus).catch(() => {});
        setPrivacyRequestsList(prev => prev.map(p => p.requestId === id ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered lists
  const contactOnlyEnquiries = enquiriesList.filter(e => e.formSource !== 'quick-admission-enquiry');
  const quickAdmissionEnquiries = enquiriesList.filter(e => e.formSource === 'quick-admission-enquiry');

  const filteredCourses = coursesList.filter(c => {
    const matchesSearch = (c.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'All' || c.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const filteredEnquiries = contactOnlyEnquiries.filter(e => {
    return (e.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (e.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (e.phone || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredRegistrations = registrationsList.filter(r => {
    return (r.fullName || r.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (r.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (r.courseName || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredQuickAdmission = quickAdmissionEnquiries.filter(q => {
    return (q.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (q.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (q.phone || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredPrivacyRequests = privacyRequestsList.filter(p => {
    return (p.requestId || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (p.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
           (p.status || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <SEO
        title="Admin Dashboard | CADPOINT Authorized Training Centre"
        description="CADPOINT Management System for Course Management, Leads, Registrations, and Privacy Deletion Requests."
        canonical="/admin"
      />

      <div className={`min-h-screen flex ${isDark ? 'bg-[#070B18] text-[#F8FAFC]' : 'bg-slate-50 text-slate-900'}`}>
        
        {/* MOBILE SIDEBAR OVERLAY TOGGLE */}
        <div className="lg:hidden fixed top-24 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2.5 rounded-xl bg-purple-600 text-white shadow-lg flex items-center gap-2 text-xs font-bold"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            <span>Admin Menu</span>
          </button>
        </div>

        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`fixed lg:static top-20 bottom-0 left-0 z-40 w-64 p-4 border-r transition-all duration-300 flex flex-col justify-between overflow-y-auto custom-scrollbar ${
            isDark ? 'bg-[#0B132B] border-white/10' : 'bg-white border-slate-200 shadow-md'
          } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          <div className="space-y-6">
            <div className="pt-2 px-2 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-red-500 block">CADPOINT Admin</span>
                <h2 className="text-lg font-extrabold font-heading text-gradient">Management Suite</h2>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 transition-colors"
                title="Toggle Dark/Light Mode"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>
            </div>

            <nav className="space-y-1 text-xs">
              <button
                onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Overview</span>
              </button>

              <button
                onClick={() => { setActiveTab('courses'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'courses' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4" />
                  <span>Courses Catalog</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">{coursesList.length}</span>
              </button>

              <button
                onClick={() => { setActiveTab('add-course'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'add-course' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-emerald-400" />
                <span>Add New Course</span>
              </button>

              <div className="pt-3 pb-1 px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Forms & Submissions</div>

              <button
                onClick={() => { setActiveTab('contact-forms'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'contact-forms' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4" />
                  <span>Contact Forms</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">{contactOnlyEnquiries.length}</span>
              </button>

              <button
                onClick={() => { setActiveTab('registrations'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'registrations' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-3">
                  <UserCheck className="w-4 h-4" />
                  <span>Register Now</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">{registrationsList.length}</span>
              </button>

              <button
                onClick={() => { setActiveTab('quick-admission'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'quick-admission' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>Quick Admissions</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-bold">{quickAdmissionEnquiries.length}</span>
              </button>

              <div className="pt-3 pb-1 px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Privacy & Governance</div>

              <button
                onClick={() => { setActiveTab('privacy-requests'); setSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'privacy-requests' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-3">
                  <ShieldAlert className="w-4 h-4 text-red-400" />
                  <span>Privacy Requests</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/30 text-white font-bold">
                  {privacyRequestsList.filter(p => p.status === 'Pending').length}
                </span>
              </button>

              <div className="pt-3 pb-1 px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Insights & Controls</div>

              <button
                onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'analytics' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics Insights</span>
              </button>

              <button
                onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                  activeTab === 'settings' ? 'bg-purple-600 text-white shadow-md' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <SettingsIcon className="w-4 h-4" />
                <span>System Settings</span>
              </button>
            </nav>
          </div>

          <div className="pt-4 border-t border-white/10 text-[11px] text-slate-400 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Backend Connected</span>
            </div>
            <button
              onClick={loadAllData}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh All Data</span>
            </button>
          </div>
        </aside>

        {/* MAIN DASHBOARD CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto space-y-6">

          {/* TOP SEARCH & ACTIONS HEADER */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <h1 className="text-2xl font-extrabold font-heading capitalize text-gradient">
                {activeTab.replace('-', ' ')}
              </h1>
              <p className="text-xs text-slate-400">
                CADPOINT Authorized Training Centre — Head Office Management
              </p>
            </div>

            {/* Global Search Bar */}
            {activeTab !== 'dashboard' && activeTab !== 'add-course' && activeTab !== 'settings' && (
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab.replace('-', ' ')}...`}
                  className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs"
                />
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Summary Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-3xl glass-panel border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between text-purple-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Total Courses</span>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{coursesList.length}</div>
                  <p className="text-[11px] text-slate-400">Active professional & master diploma programs</p>
                </div>

                <div className="p-5 rounded-3xl glass-panel border border-cyan-500/30 space-y-2">
                  <div className="flex items-center justify-between text-cyan-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Contact Enquiries</span>
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{contactOnlyEnquiries.length}</div>
                  <p className="text-[11px] text-slate-400">Direct website contact form leads</p>
                </div>

                <div className="p-5 rounded-3xl glass-panel border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between text-emerald-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Registrations</span>
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">{registrationsList.length}</div>
                  <p className="text-[11px] text-slate-400">Online course registration applications</p>
                </div>

                <div className="p-5 rounded-3xl glass-panel border border-red-500/30 space-y-2">
                  <div className="flex items-center justify-between text-red-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Pending Privacy Reqs</span>
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="text-3xl font-extrabold font-heading text-white">
                    {privacyRequestsList.filter(p => p.status === 'Pending').length}
                  </div>
                  <p className="text-[11px] text-slate-400">Data deletion requests pending review</p>
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Enquiries */}
                <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Recent Leads & Contact Enquiries
                  </h3>
                  {enquiriesList.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No enquiry records available yet.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {enquiriesList.slice(0, 4).map((enq, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs flex items-center justify-between gap-3">
                          <div>
                            <strong className="text-white block">{enq.name}</strong>
                            <span className="text-slate-400 text-[11px]">{enq.email} | {enq.subject || 'General Enquiry'}</span>
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold shrink-0">
                            {enq.status || 'New'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Privacy Requests */}
                <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-red-400 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" />
                    Recent Privacy Data Deletion Requests
                  </h3>
                  {privacyRequestsList.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No privacy requests available yet.</p>
                  ) : (
                    <div className="space-y-2.5">
                      {privacyRequestsList.slice(0, 4).map((req, i) => (
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
          )}

          {/* ========================================================= */}
          {/* TAB 2: COURSES MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Filter Category:</span>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-3 py-1.5 rounded-xl glass-input text-xs bg-[#0F172A]"
                  >
                    <option value="All">All Categories</option>
                    <option value="Professional">Professional Programs</option>
                    <option value="Master Diploma">Master Diploma Programs</option>
                  </select>
                </div>
                <Button variant="primary" size="sm" onClick={() => setActiveTab('add-course')} icon={PlusCircle} className="text-xs">
                  Add Course
                </Button>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs italic">No courses found matching criteria.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCourses.map((crs, i) => (
                    <div key={i} className="p-4 rounded-3xl glass-panel border border-white/10 space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
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
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setViewModalItem({ type: 'course', data: crs })}
                          icon={Eye}
                          className="text-[11px] py-1 px-2.5"
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setDeleteConfirm({ type: 'course', id: crs.id || crs.title, title: crs.title })}
                          icon={Trash2}
                          className="text-[11px] py-1 px-2.5 text-red-400 border-red-500/40 hover:bg-red-500/10"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: ADD COURSE FORM */}
          {/* ========================================================= */}
          {activeTab === 'add-course' && (
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl glass-panel border border-purple-500/30 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold font-heading text-white">Create New Course Program</h3>
                <p className="text-xs text-slate-400">Fill in course specifications to publish to CADPOINT database.</p>
              </div>

              {addCourseSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{addCourseSuccess}</span>
                </div>
              )}

              <form onSubmit={handleAddCourseSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Course Title *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="e.g. Professional in AI Full-Stack Python & React"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Category *</label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs bg-[#0F172A]"
                    >
                      <option value="Professional">Professional Program</option>
                      <option value="Master Diploma">Master Diploma Program</option>
                      <option value="IT & Software">IT & Software</option>
                      <option value="Civil & Architecture">Civil & Architecture</option>
                      <option value="Mechanical & Aeronautical">Mechanical & Aeronautical</option>
                      <option value="Electrical & Automation">Electrical & Automation</option>
                      <option value="Multimedia & Design">Multimedia & Design</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 mb-1">Duration *</label>
                    <input
                      type="text"
                      required
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      placeholder="e.g. 3 Months (120 Hours)"
                      className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Software & Tools Covered (Comma Separated) *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.softwareTools}
                    onChange={(e) => setNewCourse({ ...newCourse, softwareTools: e.target.value })}
                    placeholder="e.g. Python, React, MongoDB, Node.js, Git"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Course Description *</label>
                  <textarea
                    rows={4}
                    required
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Comprehensive program syllabus, real-time projects, and career outcomes..."
                    className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <Button type="submit" variant="primary" size="md" isLoading={loading} icon={PlusCircle}>
                    Publish Course Program
                  </Button>
                  <Button type="button" variant="secondary" size="md" onClick={() => setActiveTab('courses')}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: CONTACT FORMS */}
          {/* ========================================================= */}
          {activeTab === 'contact-forms' && (
            <div className="space-y-4">
              {filteredEnquiries.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs italic">No contact enquiries found.</div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Name & Contact</th>
                        <th className="py-3 px-4">Subject / Message</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredEnquiries.map((enq, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4">
                            <strong className="text-white block">{enq.name}</strong>
                            <span className="text-slate-400 text-[11px]">{enq.email}</span>
                            <span className="text-emerald-400 block text-[11px]">{enq.phone}</span>
                          </td>
                          <td className="py-3 px-4 max-w-xs">
                            <strong className="text-cyan-400 block">{enq.subject || 'Enquiry'}</strong>
                            <p className="text-slate-300 truncate text-[11px]">{enq.message}</p>
                          </td>
                          <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                            {enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={enq.status || 'New'}
                              onChange={(e) => handleUpdateStatus('enquiry', enq.id || enq.email, e.target.value)}
                              className="px-2 py-1 rounded-lg glass-input text-[11px] bg-[#0F172A]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => setViewModalItem({ type: 'enquiry', data: enq })}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'enquiry', id: enq.id || enq.email, title: enq.name })}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: REGISTER NOW SUBMISSIONS */}
          {/* ========================================================= */}
          {activeTab === 'registrations' && (
            <div className="space-y-4">
              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs italic">No registration submissions found.</div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Ref ID & Student</th>
                        <th className="py-3 px-4">Course & Mode</th>
                        <th className="py-3 px-4">Qualification</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredRegistrations.map((reg, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4">
                            <span className="text-purple-400 font-bold text-[11px] block">{reg.registrationId}</span>
                            <strong className="text-white block">{reg.fullName || reg.name}</strong>
                            <span className="text-slate-400 text-[11px]">{reg.email} | {reg.phone}</span>
                          </td>
                          <td className="py-3 px-4">
                            <strong className="text-cyan-400 block">{reg.courseName}</strong>
                            <span className="text-slate-300 text-[11px]">{reg.mode} ({reg.batchPreference || 'Morning'} Batch)</span>
                          </td>
                          <td className="py-3 px-4 text-slate-300">
                            {reg.qualification} ({reg.passoutYear})
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={reg.status || 'Pending'}
                              onChange={(e) => handleUpdateStatus('registration', reg.registrationId, e.target.value)}
                              className="px-2 py-1 rounded-lg glass-input text-[11px] bg-[#0F172A]"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Approved">Approved</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => setViewModalItem({ type: 'registration', data: reg })}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 transition-colors"
                              title="View Registration"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'registration', id: reg.registrationId, title: reg.fullName || reg.name })}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors"
                              title="Delete Registration"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: QUICK ADMISSION ENQUIRIES */}
          {/* ========================================================= */}
          {activeTab === 'quick-admission' && (
            <div className="space-y-4">
              {filteredQuickAdmission.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs italic">No quick admission popup enquiries yet.</div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Student & Contact</th>
                        <th className="py-3 px-4">Course Interested</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredQuickAdmission.map((qa, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4">
                            <strong className="text-white block">{qa.name}</strong>
                            <span className="text-slate-400 text-[11px]">{qa.email} | {qa.phone}</span>
                          </td>
                          <td className="py-3 px-4 text-cyan-400 font-semibold">
                            {qa.subject}
                          </td>
                          <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                            {qa.createdAt ? new Date(qa.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={qa.status || 'New'}
                              onChange={(e) => handleUpdateStatus('enquiry', qa.id || qa.email, e.target.value)}
                              className="px-2 py-1 rounded-lg glass-input text-[11px] bg-[#0F172A]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                            <button
                              onClick={() => setViewModalItem({ type: 'enquiry', data: qa })}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-cyan-400 transition-colors"
                              title="View Callback Request"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'enquiry', id: qa.id || qa.email, title: qa.name })}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 7: PRIVACY REQUESTS (DATA DELETION WORKFLOW) */}
          {/* ========================================================= */}
          {activeTab === 'privacy-requests' && (
            <div className="space-y-4">
              {filteredPrivacyRequests.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs italic">No privacy data deletion requests logged.</div>
              ) : (
                <div className="overflow-x-auto custom-scrollbar">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                        <th className="py-3 px-4">Request ID</th>
                        <th className="py-3 px-4">User Details</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions Workflow</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredPrivacyRequests.map((req, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-red-400">
                            {req.requestId}
                          </td>
                          <td className="py-3 px-4">
                            <strong className="text-white block">{req.name}</strong>
                            <span className="text-slate-400 text-[11px]">{req.email} | {req.phone}</span>
                            {req.reason && <p className="text-[10px] text-slate-400 italic mt-0.5">"{req.reason}"</p>}
                          </td>
                          <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                            {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              req.status === 'Completed'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : req.status === 'Rejected'
                                ? 'bg-slate-700 text-slate-300'
                                : 'bg-red-500/20 text-red-300 border border-red-500/30 animate-pulse'
                            }`}>
                              {req.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                            {req.status !== 'Completed' && (
                              <button
                                onClick={() => setDeleteConfirm({
                                  type: 'approve-privacy-deletion',
                                  id: req.requestId,
                                  title: req.name,
                                  extraData: req
                                })}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] transition-colors"
                              >
                                Approve Deletion
                              </button>
                            )}

                            {req.status === 'Pending' && (
                              <button
                                onClick={() => handleUpdateStatus('privacy', req.requestId, 'Under Review')}
                                className="px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-amber-300 text-[10px]"
                              >
                                Under Review
                              </button>
                            )}

                            <button
                              onClick={() => setDeleteConfirm({ type: 'privacy-request', id: req.requestId, title: req.requestId })}
                              className="p-1 rounded-lg bg-white/5 hover:bg-red-500/20 text-red-400"
                              title="Delete Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 8: ANALYTICS */}
          {/* ========================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-3xl glass-panel border border-purple-500/30 space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-bold">Total Conversion Volume</span>
                  <div className="text-3xl font-black text-white font-heading">
                    {enquiriesList.length + registrationsList.length} Leads
                  </div>
                  <p className="text-[11px] text-emerald-400">Combined Website Enquiries & Enrollments</p>
                </div>

                <div className="p-5 rounded-3xl glass-panel border border-cyan-500/30 space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-bold">Privacy Compliance Ratio</span>
                  <div className="text-3xl font-black text-white font-heading">
                    100% DPDP
                  </div>
                  <p className="text-[11px] text-cyan-400">Consent Audit Trailed on Submissions</p>
                </div>

                <div className="p-5 rounded-3xl glass-panel border border-emerald-500/30 space-y-2">
                  <span className="text-xs text-slate-400 uppercase font-bold">Active Courses</span>
                  <div className="text-3xl font-black text-white font-heading">
                    {coursesList.length} Active
                  </div>
                  <p className="text-[11px] text-slate-300">Live in CADPOINT Public Catalog</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white">Course Interest Breakdown</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>IT, AI & Full-Stack Software Programs</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-[45%] h-full bg-purple-500 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Civil CADD, BIM & Architecture</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-[30%] h-full bg-cyan-500 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1">
                      <span>Mechanical, MEP & Automotive Design</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="w-[25%] h-full bg-emerald-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 9: SETTINGS */}
          {/* ========================================================= */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <SettingsIcon className="w-4 h-4 text-cyan-400" />
                  CADPOINT Salem Head Office Info
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block text-[10px]">Head Office Address</span>
                    <strong className="text-white block mt-0.5">1st Floor, CPS Tower, Advaitha Ashram Road, Fairlands, Salem - 636007</strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block text-[10px]">Official Admin Email</span>
                    <strong className="text-cyan-400 block mt-0.5">cadpointsalem001@gmail.com</strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block text-[10px]">Helpline Phone Number</span>
                    <strong className="text-emerald-400 block mt-0.5">(+91) 95666 79928</strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-slate-400 block text-[10px]">Business Hours</span>
                    <strong className="text-white block mt-0.5">Mon - Sat: 9:00 AM - 7:30 PM</strong>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3 text-xs">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  Integration & Security Status
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                    <span>Resend Transactional Email API</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">Active & Verified</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                    <span>MongoDB Atlas Database Connection</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-xl bg-white/5">
                    <span>WhatsApp Lead Notification Service</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ========================================================= */}
      {/* ITEM VIEW DETAILS MODAL */}
      {/* ========================================================= */}
      {viewModalItem && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-4 my-8 ${
            isDark ? 'bg-[#0B132B] border-purple-500/30 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className="flex justify-between items-center pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold font-heading">
                {viewModalItem.type === 'course' && 'Course Specifications'}
                {viewModalItem.type === 'enquiry' && 'Enquiry Lead Details'}
                {viewModalItem.type === 'registration' && 'Registration Application'}
              </h3>
              <button onClick={() => setViewModalItem(null)} className="p-1 rounded-full text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {viewModalItem.type === 'course' && (
                <>
                  <p><strong>Title:</strong> {viewModalItem.data.title}</p>
                  <p><strong>Category:</strong> {viewModalItem.data.category}</p>
                  <p><strong>Duration:</strong> {viewModalItem.data.duration}</p>
                  <p><strong>Software & Tools:</strong> {Array.isArray(viewModalItem.data.softwareTools) ? viewModalItem.data.softwareTools.join(', ') : viewModalItem.data.softwareTools}</p>
                  <p><strong>Description:</strong> {viewModalItem.data.description}</p>
                </>
              )}

              {viewModalItem.type === 'enquiry' && (
                <>
                  <p><strong>Name:</strong> {viewModalItem.data.name}</p>
                  <p><strong>Email:</strong> {viewModalItem.data.email}</p>
                  <p><strong>Phone:</strong> {viewModalItem.data.phone}</p>
                  <p><strong>Subject:</strong> {viewModalItem.data.subject}</p>
                  <p><strong>Message:</strong> {viewModalItem.data.message || 'No additional message.'}</p>
                </>
              )}

              {viewModalItem.type === 'registration' && (
                <>
                  <p><strong>Ref ID:</strong> {viewModalItem.data.registrationId}</p>
                  <p><strong>Student Name:</strong> {viewModalItem.data.fullName || viewModalItem.data.name}</p>
                  <p><strong>Email:</strong> {viewModalItem.data.email}</p>
                  <p><strong>Phone / WhatsApp:</strong> {viewModalItem.data.phone} / {viewModalItem.data.whatsapp}</p>
                  <p><strong>Course Applied:</strong> {viewModalItem.data.courseName} ({viewModalItem.data.mode})</p>
                  <p><strong>Qualification & College:</strong> {viewModalItem.data.qualification} — {viewModalItem.data.institution}</p>
                </>
              )}
            </div>

            <Button variant="secondary" size="sm" onClick={() => setViewModalItem(null)} className="w-full justify-center">
              Close Details
            </Button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* CONFIRMATION DELETE DIALOG */}
      {/* ========================================================= */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className={`relative w-full max-w-md rounded-3xl p-6 border shadow-2xl text-center space-y-4 ${
            isDark ? 'bg-[#0B132B] border-red-500/40 text-white' : 'bg-white border-red-300 text-slate-900'
          }`}>
            <div className="w-14 h-14 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-extrabold font-heading text-white">
                {deleteConfirm.type === 'approve-privacy-deletion' ? 'Confirm Permanent Data Deletion?' : 'Confirm Delete Record?'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {deleteConfirm.type === 'approve-privacy-deletion' ? (
                  <>Are you sure you want to permanently delete this user's personal data? <strong className="text-red-400 block mt-1">This action cannot be undone.</strong></>
                ) : (
                  <>Are you sure you want to delete <strong className="text-white">"{deleteConfirm.title}"</strong>?</>
                )}
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="accent"
                size="sm"
                onClick={handleExecuteDelete}
                className="flex-1 justify-center bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Yes, Delete Permanently
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 justify-center text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
