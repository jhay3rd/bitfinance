
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './Login';
import Dashboard from './Dashboard';
import Users from './Users';
import ActivityLogs from './ActivityLogs';
import Analytics from './Analytics';
import SupportMessages from './SupportMessages';
import Transactions from './Transactions';
import useAdminAuth from '@/hooks/useAdminAuth';

const AdminRoutes: React.FC = () => {
  const { isAuthenticated } = useAdminAuth();

  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/admin/login" replace />} 
      />
      <Route 
        path="/users" 
        element={isAuthenticated ? <Users /> : <Navigate to="/admin/login" replace />} 
      />
      <Route 
        path="/activity-logs" 
        element={isAuthenticated ? <ActivityLogs /> : <Navigate to="/admin/login" replace />} 
      />
      <Route 
        path="/analytics" 
        element={isAuthenticated ? <Analytics /> : <Navigate to="/admin/login" replace />} 
      />
      <Route 
        path="/support-messages" 
        element={isAuthenticated ? <SupportMessages /> : <Navigate to="/admin/login" replace />} 
      />
      <Route 
        path="/transactions" 
        element={isAuthenticated ? <Transactions /> : <Navigate to="/admin/login" replace />} 
      />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
