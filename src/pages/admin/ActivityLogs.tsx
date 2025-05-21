
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, TextField, MenuItem, FormControl, InputLabel, Select, Button } from '@mui/material';
import { DataGrid, GridColDef, GridFilterModel } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { getActivityLogs } from '../../services/api';
import { useToast } from "@/hooks/use-toast";

interface ActivityLog {
  id: string;
  userId: string;
  userName?: string;
  action: string;
  details?: string;
  ipAddress?: string;
  browser?: string;
  timestamp: string;
}

const AdminActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionFilter, setActionFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [userFilter, setUserFilter] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Get unique action types for filter dropdown
  const actionTypes = React.useMemo(() => {
    const types = new Set<string>();
    logs.forEach(log => types.add(log.action));
    return Array.from(types);
  }, [logs]);

  const fetchLogs = React.useCallback(async () => {
    setLoading(true);
    try {
      const filters: Record<string, string> = {};
      if (actionFilter && actionFilter !== 'all') filters.action = actionFilter;
      if (dateFilter) filters.date = dateFilter;
      if (userFilter) filters.userId = userFilter;
      
      const res = await getActivityLogs(filters);
      setLogs(res.data.logs || []);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch activity logs",
        variant: "destructive"
      });
      setLogs([]);
    } finally {
      setLoading(false);
    }
  }, [actionFilter, dateFilter, userFilter, toast]);

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    fetchLogs();
  }, [navigate, fetchLogs]);

  const handleFilterChange = () => {
    fetchLogs();
  };

  const handleClearFilters = () => {
    setActionFilter('all');
    setDateFilter('');
    setUserFilter('');
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Log ID', width: 150 },
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'userName', headerName: 'User Name', width: 150 },
    { field: 'action', headerName: 'Action', width: 150 },
    { field: 'details', headerName: 'Details', width: 200 },
    { field: 'ipAddress', headerName: 'IP Address', width: 120 },
    { field: 'browser', headerName: 'Browser', width: 120 },
    { 
      field: 'timestamp', 
      headerName: 'Timestamp', 
      width: 180, 
      type: 'dateTime',
      valueFormatter: (params: any) => {
        if (params.value) {
          return new Date(params.value);
        }
        return null;
      }
    }
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Activity Logs</Typography>
      
      <Box sx={{ mb: 3, p: 2, border: '1px solid #e0e0e0', borderRadius: 1 }}>
        <Typography variant="subtitle1" gutterBottom>Filters</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <FormControl sx={{ minWidth: 180 }} size="small">
            <InputLabel id="action-filter-label">Action</InputLabel>
            <Select
              labelId="action-filter-label"
              value={actionFilter}
              label="Action"
              onChange={(e) => setActionFilter(e.target.value as string)}
            >
              <MenuItem value="all">All Actions</MenuItem>
              {actionTypes.map(action => (
                <MenuItem key={action} value={action}>{action}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Date (YYYY-MM-DD)"
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            label="User ID"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            size="small"
          />
          
          <Box>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleFilterChange}
              size="small"
              sx={{ mr: 1 }}
            >
              Apply Filters
            </Button>
            <Button 
              variant="outlined"
              onClick={handleClearFilters}
              size="small"
            >
              Clear
            </Button>
          </Box>
        </Box>
      </Box>
      
      {loading ? <CircularProgress /> : (
        <DataGrid
          rows={logs}
          columns={columns}
          autoHeight
          pageSizeOptions={[10, 25, 50, 100]}
          initialState={{ 
            pagination: { paginationModel: { pageSize: 25 } },
            sorting: { sortModel: [{ field: 'timestamp', sort: 'desc' }] } 
          }}
          getRowId={row => row.id}
        />
      )}
    </Box>
  );
};

export default AdminActivityLogs;
