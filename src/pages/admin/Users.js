import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../../services/api';

const columns = [
  { field: 'id', headerName: 'User ID', width: 220 },
  { field: 'fullName', headerName: 'Full Name', width: 180 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'verified', headerName: 'Verified', width: 100, type: 'boolean' },
  { field: 'role', headerName: 'Role', width: 100 },
  { field: 'investmentBalance', headerName: 'Investment Balance', width: 160, type: 'number',
    renderCell: (params) => {
      const [newBalance, setNewBalance] = React.useState(params.value);
      return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="number"
            value={newBalance}
            style={{ width: 80, marginRight: 8 }}
            onChange={e => setNewBalance(Number(e.target.value))}
          />
          <button
            style={{ padding: '2px 8px', background: '#1976d2', color: 'white', border: 'none', borderRadius: 4 }}
            onClick={() => handleUpdateBalance(params.row.id, newBalance)}
          >Update</button>
        </div>
      );
    }
  },
  { field: 'createdAt', headerName: 'Registered', width: 180, type: 'dateTime',
    valueGetter: (params) => params.value ? new Date(params.value) : null
  },
  // Add edit/delete actions here
];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/Login');
      return;
    }
    fetch('/api/admin/users', {
      headers: { 'Authorization': `Basic ${adminAuth}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
  }, [navigate]);

  const handleUpdateBalance = async (userId, newBalance) => {
    const adminAuth = localStorage.getItem('adminAuth');
    const res = await fetch(`/api/admin/users/${userId}/investment-balance`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${adminAuth}`,
      },
      body: JSON.stringify({ investmentBalance: newBalance }),
    });
    if (res.ok) {
      // Optionally refresh users list or show success
      alert('Investment balance updated');
    } else {
      alert('Failed to update balance');
    }
  };

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
          initialState={{ sorting: { sortModel: [{ field: 'createdAt', sort: 'desc' }] } }}
        />
      )}
    </Box>
  );
};

export default AdminUsers; 