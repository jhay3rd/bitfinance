
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Stack } from '@mui/material';
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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </Paper>
          </Box>
          <Box sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">{stats.activeUsers}</Typography>
            </Paper>
          </Box>
          {/* Add more analytics cards/charts here */}
        </Box>
      ) : (
        <Typography color="error">Failed to load analytics.</Typography>
      )}
    </Box>
  );
};

export default AdminAnalytics;
