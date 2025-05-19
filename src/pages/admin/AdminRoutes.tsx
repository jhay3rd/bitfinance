
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './Dashboard';
import AdminLogin from './Login';
import Users from './Users';
import ActivityLogs from './ActivityLogs';
import Analytics from './Analytics';
import SupportMessages from './SupportMessages';
import Transactions from './Transactions';

const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="users" element={<AdminDashboard><Users /></AdminDashboard>} />
      <Route path="activity-logs" element={<AdminDashboard><ActivityLogs /></AdminDashboard>} />
      <Route path="analytics" element={<AdminDashboard><Analytics /></AdminDashboard>} />
      <Route path="support-messages" element={<AdminDashboard><SupportMessages /></AdminDashboard>} />
      <Route path="transactions" element={<AdminDashboard><Transactions /></AdminDashboard>} />
      <Route path="*" element={<AdminLogin />} />
    </Routes>
  );
};

export default AdminRoutes;
