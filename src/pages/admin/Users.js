import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { getUsers } from '../../services/api';

const columns = [
  { field: 'id', headerName: 'User ID', width: 220 },
  { field: 'fullName', headerName: 'Full Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'verified', headerName: 'Verified', width: 100, type: 'boolean' },
  { field: 'role', headerName: 'Role', width: 100 },
  // Add edit/delete actions here
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers()
      .then(res => setUsers(res.data.users || []))
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>All Users</Typography>
      {loading ? <CircularProgress /> : (
        <DataGrid
          rows={users}
          columns={columns}
          autoHeight
          pageSize={10}
          getRowId={row => row.id}
        />
      )}
    </Box>
  );
};

export default AdminUsers; 