import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getActivityLogs } from '../../services/api';

const columns = [
  { field: 'id', headerName: 'Log ID', width: 220 },
  { field: 'userId', headerName: 'User ID', width: 180 },
  { field: 'action', headerName: 'Action', width: 200 },
  { field: 'timestamp', headerName: 'Timestamp', width: 180 },
  // Add more fields as needed
];

const AdminActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivityLogs()
      .then(res => setLogs(res.data.logs || []))
      .catch(() => setLogs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Activity Logs</Typography>
      {/* Add filters here */}
      {loading ? <CircularProgress /> : (
        <DataGrid
          rows={logs}
          columns={columns}
          autoHeight
          pageSize={10}
          getRowId={row => row.id}
        />
      )}
    </Box>
  );
};

export default AdminActivityLogs; 