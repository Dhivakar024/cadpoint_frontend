import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
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
    <div className={`min-h-screen flex ${isDark ? 'bg-[#070B18] text-[#F8FAFC]' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* MOBILE HAMBURGER BUTTON */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2.5 rounded-xl bg-purple-600 text-white shadow-lg flex items-center gap-2 text-xs font-bold cursor-pointer"
        >
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          <span>Admin Menu</span>
        </button>
      </div>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-64 p-4 border-r transition-all duration-300 flex flex-col justify-between overflow-y-auto custom-scrollbar ${
          isDark ? 'bg-[#0B132B] border-white/10' : 'bg-white border-slate-200 shadow-md'
        } ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="space-y-6">
          {/* Header Branding */}
          <div className="pt-2 px-2 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-red-500 block">
                CADPOINT Admin
              </span>
              <h2 className="text-lg font-extrabold font-heading text-gradient">
                Control Panel
              </h2>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-amber-400 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin');
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${item.alert ? 'text-red-400' : ''}`} />
                    <span>{item.name}</span>
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Profile & Logout */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between px-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-600/30 border border-purple-500/50 flex items-center justify-center text-purple-300 font-bold text-[11px]">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <strong className="text-white block leading-tight text-[11px]">{user?.username || 'Admin User'}</strong>
                <span className="text-[10px] text-slate-400">Salem Head Office</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] transition-colors cursor-pointer"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto space-y-6">
        {children}
      </main>
    </div>
  );
}
