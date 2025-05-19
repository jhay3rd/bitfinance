
import React, { useEffect, useState, ReactNode } from 'react';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { useNavigate } from 'react-router-dom';

interface AdminDashboardProps {
  children?: ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [supportBadge, setSupportBadge] = useState(0);
  const [transactionsBadge, setTransactionsBadge] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin/login');
    }
    // Fetch badge counts
    const adminAuth = localStorage.getItem('adminAuth');
    if (adminAuth) {
      fetch('/api/admin/support-messages', { headers: { 'Authorization': `Basic ${adminAuth}` } })
        .then(res => res.json())
        .then(data => {
          setSupportBadge((data.messages || []).filter((m: any) => m.status === 'open').length);
        })
        .catch(err => console.error('Error fetching support messages:', err));
      
      fetch('/api/admin/transactions', { headers: { 'Authorization': `Basic ${adminAuth}` } })
        .then(res => res.json())
        .then(data => {
          setTransactionsBadge((data.transactions || []).filter((t: any) => t.status === 'pending').length);
        })
        .catch(err => console.error('Error fetching transactions:', err));
    }
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
