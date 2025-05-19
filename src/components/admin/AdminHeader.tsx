
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAdminAuth from '@/hooks/useAdminAuth';

const AdminHeader: React.FC = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };
  
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
        <IconButton color="inherit" onClick={handleLogout} size="small">
          <Typography variant="body2">Logout</Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
