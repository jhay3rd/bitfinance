import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const AdminHeader = () => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        Admin Panel
      </Typography>
      {/* Add admin actions here if needed */}
    </Toolbar>
  </AppBar>
);

export default AdminHeader; 