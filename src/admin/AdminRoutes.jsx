import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from './context/AdminAuthContext';
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

export function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        
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

        {/* Default /admin redirects to login or dashboard */}
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
}
