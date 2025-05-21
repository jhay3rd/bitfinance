
import React, { useEffect, useState, ReactNode } from 'react';
import { Box, CssBaseline, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

interface Notification {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface AdminDashboardProps {
  children?: ReactNode;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ children }) => {
  const navigate = useNavigate();
  const [supportBadge, setSupportBadge] = useState(0);
  const [transactionsBadge, setTransactionsBadge] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);

  // Function to fetch notifications
  const fetchNotifications = () => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) return;
    
    // Fetch notifications here (using mock data for now)
    const mockNotifications = [
      {
        id: 'notif_1',
        type: 'user_login',
        message: 'User John D. just logged in',
        timestamp: new Date().toISOString(),
        read: false
      },
      {
        id: 'notif_2',
        type: 'deposit_initiated',
        message: 'New deposit of $500 initiated by Sarah M.',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        read: false
      },
      {
        id: 'notif_3',
        type: 'withdrawal_request',
        message: 'Withdrawal request of $200 by Robert J.',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        read: false
      },
      {
        id: 'notif_4',
        type: 'new_user',
        message: 'New user registration: emma@example.com',
        timestamp: new Date(Date.now() - 36000000).toISOString(),
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
  };

  useEffect(() => {
    if (!localStorage.getItem('adminAuth')) {
      navigate('/admin/login');
    }
    
    // Fetch badge counts and notifications
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
        
      // Initial notifications fetch
      fetchNotifications();
      
      // Set up polling for notifications (every 30 seconds)
      const notificationInterval = setInterval(fetchNotifications, 30000);
      
      return () => clearInterval(notificationInterval);
    }
  }, [navigate]);

  const toggleNotificationDrawer = () => {
    setNotificationDrawerOpen(!notificationDrawerOpen);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AdminHeader 
        notificationCount={unreadCount} 
        onNotificationsClick={toggleNotificationDrawer} 
      />
      <AdminSidebar supportBadge={supportBadge} transactionsBadge={transactionsBadge} />
      
      {/* Notifications Drawer */}
      <Drawer
        anchor="right"
        open={notificationDrawerOpen}
        onClose={toggleNotificationDrawer}
      >
        <Box
          sx={{ width: 320 }}
          role="presentation"
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Notifications</Typography>
          </Box>
          <Divider />
          <List>
            {notifications.length === 0 ? (
              <ListItem>
                <ListItemText primary="No notifications" />
              </ListItem>
            ) : (
              notifications.map((notification) => (
                <ListItem 
                  key={notification.id} 
                  sx={{ 
                    bgcolor: notification.read ? 'transparent' : 'rgba(25, 118, 210, 0.08)',
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  <ListItemText 
                    primary={notification.message}
                    secondary={new Date(notification.timestamp).toLocaleString()}
                  />
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
      
      <Toaster />
    </Box>
  );
};

export default AdminDashboard;
