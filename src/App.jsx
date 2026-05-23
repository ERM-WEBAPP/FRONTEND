import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import Leave from './pages/Leave';
import Allowance from './pages/Allowance';
import Payslip from './pages/Payslip';
import Employees from './pages/Employees';
import Announcements from './pages/Announcements';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import RaiseComplaint from './pages/RaiseComplaint';
import Reports from './pages/Reports';
import EmployeeDetail from './pages/EmployeeDetail';
import LeaveApprovals from './pages/LeaveApprovals';
import LiveTracking from './pages/LiveTracking';
import ManagerAccess from './pages/ManagerAccess';
import Auth from './pages/Auth';

// Placeholder components for routing
const Placeholder = ({ title }) => (
  <div className="card" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
    <h2>{title} coming soon...</h2>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="manager" element={<ManagerAccess />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
          <Route path="allowance" element={<Allowance />} />
          <Route path="payslip" element={<Payslip />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="complaint" element={<RaiseComplaint />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
