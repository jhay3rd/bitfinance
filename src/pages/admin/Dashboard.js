import React, { useEffect, useState } from 'react';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();
  const [supportBadge, setSupportBadge] = useState(0);
  const [transactionsBadge, setTransactionsBadge] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin/Login');
    }
    // Fetch badge counts
    const adminAuth = localStorage.getItem('adminAuth');
    fetch('/api/admin/support-messages', { headers: { 'Authorization': `Basic ${adminAuth}` } })
      .then(res => res.json())
      .then(data => {
        setSupportBadge((data.messages || []).filter(m => m.status === 'open').length);
      });
    fetch('/api/admin/transactions', { headers: { 'Authorization': `Basic ${adminAuth}` } })
      .then(res => res.json())
      .then(data => {
        setTransactionsBadge((data.transactions || []).filter(t => t.status === 'pending').length);
      });
  }, [navigate]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminHeader />
      <AdminSidebar supportBadge={supportBadge} transactionsBadge={transactionsBadge} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AdminDashboard; 