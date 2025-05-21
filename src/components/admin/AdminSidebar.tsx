
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Badge } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import MailIcon from '@mui/icons-material/Mail';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

interface AdminSidebarProps {
  supportBadge?: number;
  transactionsBadge?: number;
}

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
  { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
  { text: 'Activity Logs', icon: <ListAltIcon />, path: '/admin/activity-logs' },
  { text: 'Analytics', icon: <BarChartIcon />, path: '/admin/analytics' },
  { text: 'Support Messages', icon: <MailIcon />, path: '/admin/support-messages', badge: 'support' },
  { text: 'Transactions', icon: <MonetizationOnIcon />, path: '/admin/transactions', badge: 'transactions' },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ supportBadge = 0, transactionsBadge = 0 }) => (
  <Drawer
    variant="permanent"
    sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    <List sx={{ marginTop: '64px' }}>
      {navItems.map((item) => (
        <ListItem 
          key={item.text} 
          component={Link} 
          to={item.path}
          sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
        >
          <ListItemIcon>
            {item.badge === 'support' && supportBadge > 0 ? (
              <Badge badgeContent={supportBadge} color="error">{item.icon}</Badge>
            ) : item.badge === 'transactions' && transactionsBadge > 0 ? (
              <Badge badgeContent={transactionsBadge} color="error">{item.icon}</Badge>
            ) : item.icon}
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default AdminSidebar;
