import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid, Paper } from '@mui/material';
import { getAnalytics } from '../../services/api';

const AdminAnalytics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics()
      .then(res => setStats(res.data))
      .catch(() => setStats(null))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Analytics</Typography>
      {loading ? <CircularProgress /> : stats ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Total Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Active Users</Typography>
              <Typography variant="h4">{stats.activeUsers}</Typography>
            </Paper>
          </Grid>
          {/* Add more analytics cards/charts here */}
        </Grid>
      ) : (
        <Typography color="error">Failed to load analytics.</Typography>
      )}
    </Box>
  );
};

export default AdminAnalytics; 