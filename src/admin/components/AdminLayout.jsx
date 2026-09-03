import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  ShieldAlert,
  BarChart3,
  Settings as SettingsIcon,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useTheme } from '../../context/ThemeContext';

export function AdminLayout({ children }) {
  const { user, logout } = useAdminAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Forms & Enquiries', path: '/admin/forms', icon: MessageSquare },
    { name: 'Privacy Requests', path: '/admin/privacy-requests', icon: ShieldAlert, alert: true },
    { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
    { name: 'Settings', path: '/admin/settings', icon: SettingsIcon },
  ];

  return (
    <div className={`h-screen w-screen overflow-hidden flex transition-colors duration-300 ${
      isDark ? 'bg-[#070B18] text-[#F8FAFC]' : 'bg-[#F8FAFC] text-[#0F172A]'
    }`}>
      
      {/* MOBILE HAMBURGER BUTTON */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-3 rounded-2xl bg-emerald-600 text-white shadow-xl flex items-center gap-2 text-sm font-bold cursor-pointer"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          <span>Admin Menu</span>
        </button>
      </div>

      {/* FIXED ANCHORED SIDEBAR NAVIGATION */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 z-40 w-72 h-screen shrink-0 p-5 border-r transition-all duration-200 flex flex-col justify-between overflow-y-auto custom-scrollbar ${
          isDark ? 'bg-[#0B132B] border-white/10' : 'bg-white border-slate-200 shadow-lg'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="space-y-6">
          {/* Header Branding */}
          <div className="pt-2 px-2 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-red-500 block">
                CADPOINT Admin
              </span>
              <h2 className={`text-xl font-extrabold font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Control Panel
              </h2>
            </div>
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-2xl transition-colors cursor-pointer ${
                isDark ? 'bg-white/5 hover:bg-white/10 text-amber-400' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-sm">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path === '/admin/dashboard' && location.pathname === '/admin') ||
                (item.path === '/admin/courses' && location.pathname.startsWith('/admin/courses'));
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/20'
                      : isDark
                      ? 'text-slate-400 hover:text-white hover:bg-white/5'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center gap-3.5">
                    <Icon className={`w-5 h-5 ${item.alert ? 'text-red-400' : ''}`} />
                    <span>{item.name}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Profile & Logout */}
        <div className={`pt-5 border-t space-y-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              {/* ADMIN "A" AVATAR - 100% High-Contrast in Light & Dark Mode */}
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-base shadow-md transition-all ${
                isDark
                  ? 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white border border-emerald-400/30'
                  : 'bg-emerald-600 text-white border-2 border-emerald-700 shadow-emerald-600/30'
              }`}>
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div className="truncate max-w-[130px]">
                <strong className={`block leading-tight text-sm font-bold truncate ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {user?.username || 'Admin'}
                </strong>
                <span className="text-xs text-slate-400 block truncate font-medium">Salem Head Office</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors cursor-pointer shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/"
            target="_blank"
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-bold transition-colors cursor-pointer ${
              isDark ? 'bg-white/5 hover:bg-white/10 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* INDEPENDENTLY SCROLLABLE MAIN CONTENT AREA */}
      <main className="flex-1 h-screen overflow-y-auto p-6 sm:p-10 space-y-8 custom-scrollbar">
        {children}
      </main>
    </div>
  );
}
