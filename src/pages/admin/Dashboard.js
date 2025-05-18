import React from 'react';
import { Box, CssBaseline, Toolbar, Typography } from '@mui/material';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const AdminDashboard = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminHeader />
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
        {children}
      </Box>
    </Box>
  );
};

export default AdminDashboard; 