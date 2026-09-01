import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { AdminProtectedRoute } from './components/AdminProtectedRoute';
import { AdminLayout } from './components/AdminLayout';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminCourses } from './pages/AdminCourses';
import { AdminAddCourse } from './pages/AdminAddCourse';
import { AdminEditCourse } from './pages/AdminEditCourse';
import { AdminForms } from './pages/AdminForms';
import { AdminPrivacyRequests } from './pages/AdminPrivacyRequests';
import { AdminAnalytics } from './pages/AdminAnalytics';
import { AdminSettings } from './pages/AdminSettings';

function AdminRoot() {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B18] text-white">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <AdminLogin />;
}

export function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* /admin or /admin/ -> Login if unauthenticated, Dashboard if authenticated */}
        <Route path="" element={<AdminRoot />} />
        <Route path="login" element={<AdminRoot />} />
        
        <Route
          path="dashboard"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="courses"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminCourses />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="courses/add"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminAddCourse />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="courses/edit/:id"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminEditCourse />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="forms"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminForms />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="privacy-requests"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminPrivacyRequests />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="analytics"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminAnalytics />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />
        <Route
          path="settings"
          element={
            <AdminProtectedRoute>
              <AdminLayout>
                <AdminSettings />
              </AdminLayout>
            </AdminProtectedRoute>
          }
        />

        {/* Catch-all for /admin/* */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
