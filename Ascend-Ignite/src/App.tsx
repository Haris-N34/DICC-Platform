import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { getProfile } from './services/profileService';

import { Landing } from './pages/Landing';
import { Signup } from './pages/Signup';
import { Onboarding } from './pages/Onboarding';

import { Dashboard } from './pages/Dashboard';
import { ModulePage } from './pages/ModulePage';
import { QuizPage } from './pages/QuizPage';

import { Community } from './pages/Community';
import { Networking } from './pages/Networking';
import { Advising } from './pages/Advising';
import { Certificates } from './pages/Certificates';
import { ChatBot } from './components/ChatBot';

// Component to protect routes requiring a profile
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const profile = getProfile();
  if (!profile) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const profile = getProfile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const isPublicPage = ['/', '/signup', '/onboarding'].includes(location.pathname);
  const showSidebar = profile && !isPublicPage;
  const isModulePage = location.pathname.startsWith('/module/') && !location.pathname.includes('/quiz');

  return (
    <div className="min-h-screen bg-slate-50 flex font-body text-slate-900">
      {showSidebar && <Sidebar onCollapseChange={setSidebarCollapsed} />}
      <div
        className="flex-1 flex flex-col transition-[margin] duration-300 ease-in-out"
        style={{ marginLeft: showSidebar ? (sidebarCollapsed ? 78 : 264) : 0 }}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
      </div>
      {profile && !isPublicPage && !isModulePage && (
        <ChatBot mode="global" />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/module/:id"
          element={
            <ProtectedRoute>
              <ModulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/module/:id/quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community"
          element={
            <ProtectedRoute>
              <Community />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/networking"
          element={
            <ProtectedRoute>
              <Networking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/advising"
          element={
            <ProtectedRoute>
              <Advising />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />

        {/* Fallback component for undefined routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
