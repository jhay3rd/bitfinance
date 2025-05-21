
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAdminAuth from '@/hooks/useAdminAuth';
import NotificationsIcon from '@mui/icons-material/Notifications';

interface AdminHeaderProps {
  notificationCount?: number;
  onNotificationsClick?: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ notificationCount = 0, onNotificationsClick }) => {
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
        <div>
          {onNotificationsClick && (
            <IconButton 
              color="inherit" 
              onClick={onNotificationsClick} 
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          )}
          <IconButton color="inherit" onClick={handleLogout} size="small">
            <Typography variant="body2">Logout</Typography>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
