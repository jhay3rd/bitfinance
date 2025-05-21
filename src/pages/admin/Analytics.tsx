
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAnalytics } from '../../services/api';
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface UserGrowthData {
  date: string;
  users: number;
}

interface ActivityByDayData {
  day: string;
  logins: number;
  transactions: number;
  messages: number;
}

interface UserDistributionData {
  status: string;
  count: number;
}

interface NewUsersData {
  today: number;
  thisWeek: number;
  thisMonth: number;
}

interface UserActivityData {
  logins: number;
  registrations: number;
  deposits: number;
  withdrawals: number;
  portfolioUpdates: number;
}

interface FinancialStatsData {
  totalDeposits: number;
  totalWithdrawals: number;
  pendingTransactions: number;
  averageInvestment: number;
}

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: NewUsersData;
  userActivity: UserActivityData;
  financialStats: FinancialStatsData;
  userGrowth: UserGrowthData[];
  activityByDay: ActivityByDayData[];
  userDistribution: UserDistributionData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminAnalytics: React.FC = () => {
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const res = await getAnalytics();
      const apiData = res.data;
      
      // Make sure the data matches our interface structure
      const analyticsData: AnalyticsData = {
        totalUsers: apiData.totalUsers || 0,
        activeUsers: apiData.activeUsers || 0,
        newUsers: apiData.newUsers || {
          today: 0,
          thisWeek: 0,
          thisMonth: 0
        },
        userActivity: apiData.userActivity || {
          logins: 0,
          registrations: 0,
          deposits: 0,
          withdrawals: 0,
          portfolioUpdates: 0
        },
        financialStats: apiData.financialStats || {
          totalDeposits: 0,
          totalWithdrawals: 0,
          pendingTransactions: 0,
          averageInvestment: 0
        },
        userGrowth: apiData.userGrowth || [],
        activityByDay: apiData.activityByDay || [],
        userDistribution: apiData.userDistribution || []
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
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
        <Card sx={{ flex: '1 0 21%', minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Total Users</Typography>
            <Typography variant="h4">{stats.totalUsers}</Typography>
            <Typography variant="body2" color="success.main">
              +{stats.newUsers.thisWeek} this week
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ flex: '1 0 21%', minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Active Users</Typography>
            <Typography variant="h4">{stats.activeUsers}</Typography>
            <Typography variant="body2" color="textSecondary">
              {((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total
            </Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ flex: '1 0 21%', minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Total Deposits</Typography>
            <Typography variant="h4">${stats.financialStats.totalDeposits.toLocaleString()}</Typography>
          </CardContent>
        </Card>
        
        <Card sx={{ flex: '1 0 21%', minWidth: 200 }}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Pending Transactions</Typography>
            <Typography variant="h4">{stats.financialStats.pendingTransactions}</Typography>
          </CardContent>
        </Card>
      </Box>
      
      {/* Charts */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* User Growth Chart and User Distribution */}
        <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
          <Paper sx={{ p: 2, flex: '1 1 66%' }}>
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
          
          <Paper sx={{ p: 2, flex: '1 1 33%' }}>
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
        </Box>
        
        {/* Activity By Day */}
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
      </Box>
    </Box>
  );
};

export default AdminAnalytics;
