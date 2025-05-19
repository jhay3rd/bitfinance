
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { getActivityLogs } from '../../services/api';

interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
}

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Log ID', width: 220 },
  { field: 'userId', headerName: 'User ID', width: 180 },
  { field: 'action', headerName: 'Action', width: 200 },
  { 
    field: 'timestamp', 
    headerName: 'Timestamp', 
    width: 180, 
    type: 'dateTime',
    valueFormatter: (params) => {
      return new Date(params.value as string);
    }
  },
  // Add more fields as needed
];

const AdminActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    getActivityLogs()
      .then(res => setLogs(res.data.logs || []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Activity Logs</Typography>
      {/* Add filters here */}
      {loading ? <CircularProgress /> : (
        <DataGrid
          rows={logs}
          columns={columns}
          autoHeight
          pageSizeOptions={[10, 25, 50]}
          initialState={{ 
            pagination: { paginationModel: { pageSize: 10 } },
            sorting: { sortModel: [{ field: 'timestamp', sort: 'desc' }] } 
          }}
          getRowId={row => row.id}
        />
      )}
    </Box>
  );
};

export default AdminActivityLogs;
