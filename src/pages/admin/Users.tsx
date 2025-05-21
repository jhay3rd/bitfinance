
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  fullName: string;
  email: string;
  verified: boolean;
  role: string;
  investmentBalance: number;
  createdAt: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleUpdateBalance = async (userId: string, newBalance: number) => {
    const adminAuth = localStorage.getItem('adminAuth');
    const res = await fetch(`/api/admin/users/${userId}/investment-balance`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${adminAuth || ''}`,
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'User ID', width: 220 },
    { field: 'fullName', headerName: 'Full Name', width: 180 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'verified', headerName: 'Verified', width: 100, type: 'boolean' },
    { field: 'role', headerName: 'Role', width: 100 },
    { 
      field: 'investmentBalance', 
      headerName: 'Investment Balance', 
      width: 160, 
      type: 'number',
      renderCell: (params: GridRenderCellParams) => {
        const [newBalance, setNewBalance] = React.useState<number>(params.row.investmentBalance);
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
    { 
      field: 'createdAt', 
      headerName: 'Registered', 
      width: 180, 
      type: 'dateTime',
      valueFormatter: (params: any) => {
        if (params.value) {
          return new Date(params.value);
        }
        return null;
      }
    },
  ];

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    
    fetch('/api/admin/users', {
      headers: { 'Authorization': `Basic ${adminAuth}` }
    })
      .then(res => res.json())
      .then(data => {
        setUsers(data.users || []);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, [navigate]);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>All Users</Typography>
      {loading ? <CircularProgress /> : (
        <DataGrid
          rows={users}
          columns={columns}
          autoHeight
          pageSizeOptions={[10, 25, 50]}
          initialState={{ 
            pagination: { paginationModel: { pageSize: 10 } },
            sorting: { sortModel: [{ field: 'createdAt', sort: 'desc' }] } 
          }}
          getRowId={row => row.id}
        />
      )}
    </Box>
  );
};

export default AdminUsers;
