import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Paper, Button, TextField, Slider, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUserPortfolio } from '../../services/api';
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface UserPortfolio {
  id: string;
  userId: string;
  assets: {
    [key: string]: {
      allocation: number;
      value: number;
    }
  };
  totalValue: number;
  lastUpdated: string;
}

interface User {
  id: string;
  fullName: string;
  email: string;
  investmentBalance: number;
}

interface UserResponse {
  user: User;
  portfolio?: UserPortfolio;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const AVAILABLE_ASSETS = ['BTC', 'ETH', 'SOL', 'BNB', 'XRP', 'USDT', 'ADA', 'DOGE'];

const UserPortfolio: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [portfolio, setPortfolio] = useState<UserPortfolio | null>(null);
  const [allocations, setAllocations] = useState<Record<string, number>>({});
  const [newAsset, setNewAsset] = useState('');
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    
    const fetchUserData = async () => {
      if (!userId) return;
      
      setLoading(true);
      try {
        const response = await getUser(userId);
        const userData = response.data as UserResponse;
        
        if (userData.user) {
          setUser(userData.user);
          
          // If portfolio data exists in the response
          if (userData.portfolio) {
            setPortfolio(userData.portfolio);
            
            // Initialize allocations state
            const initialAllocations: Record<string, number> = {};
            Object.entries(userData.portfolio.assets).forEach(([asset, data]) => {
              initialAllocations[asset] = data.allocation;
            });
            setAllocations(initialAllocations);
          } else {
            // Create empty portfolio if none exists
            const emptyPortfolio: UserPortfolio = {
              id: `portfolio_${userId}`,
              userId: userId,
              assets: {},
              totalValue: 0,
              lastUpdated: new Date().toISOString()
            };
            setPortfolio(emptyPortfolio);
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load user portfolio",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [userId, navigate]);

  const handleAllocationChange = (asset: string, newValue: number) => {
    setAllocations(prev => ({
      ...prev,
      [asset]: newValue
    }));
  };

  const handleAddAsset = () => {
    if (!newAsset || allocations[newAsset] !== undefined) {
      return;
    }
    
    setAllocations(prev => ({
      ...prev,
      [newAsset]: 0
    }));
    setNewAsset('');
  };

  const handleRemoveAsset = (asset: string) => {
    const newAllocations = { ...allocations };
    delete newAllocations[asset];
    setAllocations(newAllocations);
  };

  const handleSavePortfolio = async () => {
    if (!portfolio || !userId || !user) return;
    
    // Check if allocations sum to 100
    const allocationSum = Object.values(allocations).reduce((sum, val) => sum + val, 0);
    if (Math.abs(allocationSum - 100) > 1) { // Allow small rounding errors
      toast({
        title: "Error",
        description: "Asset allocations must sum to 100%",
        variant: "destructive"
      });
      return;
    }
    
    setSaving(true);
    try {
      // Calculate asset values based on allocation percentages and total investment balance
      const totalValue = user.investmentBalance || 0;
      const assets: Record<string, { allocation: number; value: number }> = {};
      
      Object.entries(allocations).forEach(([asset, allocation]) => {
        const value = (allocation / 100) * totalValue;
        assets[asset] = {
          allocation,
          value
        };
      });
      
      const updatedPortfolio: UserPortfolio = {
        ...portfolio,
        assets,
        totalValue,
        lastUpdated: new Date().toISOString()
      };
      
      await updateUserPortfolio(userId, updatedPortfolio);
      setPortfolio(updatedPortfolio);
      
      toast({
        title: "Success",
        description: "Portfolio updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update portfolio",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Typography color="error">User not found</Typography>
    );
  }

  // Prepare data for pie chart
  const chartData = Object.entries(allocations).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5">Portfolio Management: {user.fullName}</Typography>
        <Button 
          variant="outlined" 
          onClick={() => navigate('/admin/users')}
        >
          Back to Users
        </Button>
      </Box>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1">User Info</Typography>
        <Paper sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">Email</Typography>
              <Typography variant="body1">{user.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">User ID</Typography>
              <Typography variant="body1">{user.id}</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography variant="body2" color="textSecondary">Investment Balance</Typography>
              <Typography variant="body1">${user.investmentBalance.toLocaleString()}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="subtitle1">Asset Allocations</Typography>
          <Paper sx={{ p: 2 }}>
            {Object.keys(allocations).length === 0 ? (
              <Typography color="textSecondary">No assets in portfolio. Add some below.</Typography>
            ) : (
              Object.entries(allocations).map(([asset, allocation]) => (
                <Box key={asset} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography>{asset}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography>{allocation}%</Typography>
                      <Button 
                        size="small" 
                        color="error" 
                        onClick={() => handleRemoveAsset(asset)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                  <Slider
                    value={allocation}
                    onChange={(_, value) => handleAllocationChange(asset, value as number)}
                    aria-labelledby={`${asset}-slider`}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={100}
                  />
                </Box>
              ))
            )}
            
            <Box sx={{ mt: 4 }}>
              <Typography variant="subtitle2" gutterBottom>Add New Asset</Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel id="new-asset-label">Asset</InputLabel>
                  <Select
                    labelId="new-asset-label"
                    value={newAsset}
                    label="Asset"
                    onChange={(e) => setNewAsset(e.target.value)}
                  >
                    {AVAILABLE_ASSETS.filter(asset => !allocations[asset]).map(asset => (
                      <MenuItem key={asset} value={asset}>{asset}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button 
                  variant="contained" 
                  onClick={handleAddAsset}
                  disabled={!newAsset}
                >
                  Add
                </Button>
              </Box>
            </Box>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSavePortfolio}
                disabled={saving || Object.keys(allocations).length === 0}
              >
                {saving ? 'Saving...' : 'Save Portfolio'}
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Typography variant="subtitle1">Portfolio Visualization</Typography>
          <Paper sx={{ p: 2, height: 300 }}>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="textSecondary">No allocation data to display</Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserPortfolio;
