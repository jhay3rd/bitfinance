
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid as MuiGrid, Paper } from '@mui/material';
import { getAnalytics } from '../../services/api';
import { useNavigate } from 'react-router-dom';

interface AnalyticsStats {
  totalUsers: number;
  activeUsers: number;
  // Add other stat properties as needed
}

const AdminAnalytics: React.FC = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    getAnalytics()
      .then(res => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Analytics</Typography>
      {loading ? <CircularProgress /> : stats ? (
        <MuiGrid container spacing={2}>
          <MuiGrid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </Paper>
          </MuiGrid>
          <MuiGrid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">{stats.activeUsers}</Typography>
            </Paper>
          </MuiGrid>
          {/* Add more analytics cards/charts here */}
        </MuiGrid>
      ) : (
        <Typography color="error">Failed to load analytics.</Typography>
      )}
    </Box>
  );
};

export default AdminAnalytics;
