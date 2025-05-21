
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Card, CardContent, Grid } from '@mui/material';
import { getAnalytics } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from "@/hooks/use-toast";

interface AnalyticsStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: {
    today: number;
    thisWeek: number;
    thisMonth: number;
  };
  userActivity: {
    logins: number;
    registrations: number;
    deposits: number;
    withdrawals: number;
    portfolioUpdates: number;
  };
  financialStats: {
    totalDeposits: number;
    totalWithdrawals: number;
    pendingTransactions: number;
    averageInvestment: number;
  };
  userGrowth: Array<{
    date: string;
    users: number;
  }>;
  activityByDay: Array<{
    day: string;
    logins: number;
    transactions: number;
    messages: number;
  }>;
  userDistribution: Array<{
    status: string;
    count: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminAnalytics: React.FC = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await getAnalytics();
      
      // Make sure the data matches our interface structure
      const analyticsData: AnalyticsStats = {
        totalUsers: res.data.totalUsers || 0,
        activeUsers: res.data.activeUsers || 0,
        newUsers: res.data.newUsers || {
          today: 0,
          thisWeek: 0,
          thisMonth: 0
        },
        userActivity: res.data.userActivity || {
          logins: 0,
          registrations: 0,
          deposits: 0,
          withdrawals: 0,
          portfolioUpdates: 0
        },
        financialStats: res.data.financialStats || {
          totalDeposits: 0,
          totalWithdrawals: 0,
          pendingTransactions: 0,
          averageInvestment: 0
        },
        userGrowth: res.data.userGrowth || [],
        activityByDay: res.data.activityByDay || [],
        userDistribution: res.data.userDistribution || []
      };
      
      setStats(analyticsData);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive"
      });
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    fetchAnalytics();
  }, [navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box>
        <Typography variant="h5" gutterBottom>Analytics</Typography>
        <Typography color="error">Failed to load analytics.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Analytics Dashboard</Typography>
      
      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Users</Typography>
              <Typography variant="h4">{stats.totalUsers}</Typography>
              <Typography variant="body2" color="success.main">
                +{stats.newUsers.thisWeek} this week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Active Users</Typography>
              <Typography variant="h4">{stats.activeUsers}</Typography>
              <Typography variant="body2" color="textSecondary">
                {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Total Deposits</Typography>
              <Typography variant="h4">${stats.financialStats.totalDeposits.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>Pending Transactions</Typography>
              <Typography variant="h4">{stats.financialStats.pendingTransactions}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts */}
      <Grid container spacing={3}>
        {/* User Growth Chart */}
        <Grid xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>User Growth</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={stats.userGrowth}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* User Distribution */}
        <Grid xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>User Distribution</Typography>
            <Box sx={{ height: 300, display: 'flex', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.userDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="status"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.userDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        
        {/* Activity By Day */}
        <Grid xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Daily Activity</Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.activityByDay}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="logins" fill="#8884d8" />
                  <Bar dataKey="transactions" fill="#82ca9d" />
                  <Bar dataKey="messages" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminAnalytics;
