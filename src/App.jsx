import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { SplashScreen } from './components/ui/SplashScreen';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Courses } from './pages/Courses';
import { CourseDetails } from './pages/CourseDetails';
import { Ecosystem } from './pages/Ecosystem';
import { Registration } from './pages/Registration';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { RefundPolicy } from './pages/RefundPolicy';
import { NotFound } from './pages/NotFound';

function AdminRedirect() {
  React.useEffect(() => {
    window.location.href = 'https://admin.cadpoint.co.in/login';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-bold font-heading text-white">Redirecting to Admin Portal...</h2>
        <p className="text-xs text-slate-400">Taking you to https://admin.cadpoint.co.in/login</p>
      </div>
    </div>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<CourseDetails />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/admin" element={<AdminRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </>
  );
}
