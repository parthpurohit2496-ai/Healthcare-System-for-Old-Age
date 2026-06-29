import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// General Pages
import LandingPage from './pages/LandingPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import HelperRequests from './pages/admin/HelperRequests';
import PatientData from './pages/admin/PatientData';
import MedicineData from './pages/admin/MedicineData';
import ReportPage from './pages/admin/ReportPage';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AuditLog from './pages/admin/AuditLog';
import AnnouncementsPage from './pages/admin/Announcements';
import AdminSettings from './pages/admin/AdminSettings';

// Helper Pages
import HelperLogin from './pages/helper/HelperLogin';
import HelperSignup from './pages/helper/HelperSignup';
import HelperDashboard from './pages/helper/HelperDashboard';
import LeaveRequest from './pages/helper/LeaveRequest';

// Old Person Pages
import OldPersonLogin from './pages/oldperson/OldPersonLogin';
import OldPersonSignup from './pages/oldperson/OldPersonSignup';
import OldPersonDashboard from './pages/oldperson/OldPersonDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Portal Selection */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Workspace */}
        <Route path="/admin" element={<Layout allowedRoles={['Admin']} />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="helper-requests" element={<HelperRequests />} />
          <Route path="patients" element={<PatientData />} />
          <Route path="medicines" element={<MedicineData />} />
          <Route path="reports" element={<ReportPage />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="audit-log" element={<AuditLog />} />
          <Route path="announcements" element={<AnnouncementsPage />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Helper Authentication */}
        <Route path="/helper/login" element={<HelperLogin />} />
        <Route path="/helper/signup" element={<HelperSignup />} />

        {/* Helper Workspace */}
        <Route path="/helper" element={<Layout allowedRoles={['Helper']} />}>
          <Route index element={<Navigate to="/helper/dashboard" replace />} />
          <Route path="dashboard" element={<HelperDashboard />} />
          <Route path="leaves" element={<LeaveRequest />} />
        </Route>

        {/* Old Person Authentication */}
        <Route path="/old-person/login" element={<OldPersonLogin />} />
        <Route path="/old-person/signup" element={<OldPersonSignup />} />

        {/* Old Person Workspace */}
        <Route path="/old-person" element={<Layout allowedRoles={['Old Person']} />}>
          <Route index element={<Navigate to="/old-person/dashboard" replace />} />
          <Route path="dashboard" element={<OldPersonDashboard />} />
        </Route>

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
