
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { getUsers, updateUser, updateUserPortfolio } from '../../services/api';
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  fullName: string;
  email: string;
  verified: boolean;
  role: string;
  investmentBalance: number;
  portfolioAllocation?: Record<string, number>;
  lastLogin?: string;
  createdAt: string;
  status?: 'active' | 'suspended' | 'inactive';
}

interface EditUserDialogProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, user, onClose, onSave }) => {
  const [editedUser, setEditedUser] = useState<User | null>(null);
  
  useEffect(() => {
    setEditedUser(user ? {...user} : null);
  }, [user]);
  
  if (!editedUser) return null;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setEditedUser(prev => prev ? ({
      ...prev,
      [name as string]: value
    }) : null);
  };
  
  const handleSave = () => {
    if (editedUser) {
      onSave(editedUser);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Full Name"
            name="fullName"
            value={editedUser.fullName}
            onChange={handleChange}
            fullWidth
          />
          
          <TextField
            label="Email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            fullWidth
            disabled
          />
          
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={editedUser.role}
              label="Role"
              onChange={handleChange}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="moderator">Moderator</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={editedUser.status || 'active'}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="suspended">Suspended</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            label="Investment Balance"
            name="investmentBalance"
            type="number"
            value={editedUser.investmentBalance}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const adminAuth = localStorage.getItem('adminAuth');
      if (!adminAuth) {
        navigate('/admin/login');
        return;
      }
      
      const response = await getUsers();
      setUsers(response.data.users || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  const handleUpdateBalance = async (userId: string, newBalance: number) => {
    try {
      await updateUser(userId, { investmentBalance: newBalance });
      toast({
        title: "Success",
        description: "Investment balance updated",
      });
      // Update user in the state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, investmentBalance: newBalance } : user
      ));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update balance",
        variant: "destructive"
      });
    }
  };
  
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };
  
  const handleSaveUser = async (editedUser: User) => {
    try {
      await updateUser(editedUser.id, editedUser);
      toast({
        title: "Success",
        description: "User updated successfully",
      });
      setUsers(users.map(user => 
        user.id === editedUser.id ? editedUser : user
      ));
      setEditDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update user",
        variant: "destructive"
      });
    }
  };
  
  const handleViewPortfolio = (userId: string) => {
    navigate(`/admin/users/${userId}/portfolio`);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'User ID', width: 130 },
    { field: 'fullName', headerName: 'Full Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'verified', headerName: 'Verified', width: 80, type: 'boolean' },
    { field: 'status', headerName: 'Status', width: 100 },
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
      field: 'lastLogin', 
      headerName: 'Last Login', 
      width: 180, 
      type: 'dateTime',
      valueFormatter: (params: any) => {
        if (params.value) {
          return new Date(params.value);
        }
        return null;
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
    {
      field: 'actions',
      headerName: 'Actions',
      width: 180,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            size="small" 
            variant="outlined"
            onClick={() => handleEditUser(params.row)}
          >
            Edit
          </Button>
          <Button 
            size="small" 
            variant="outlined" 
            color="info"
            onClick={() => handleViewPortfolio(params.row.id)}
          >
            Portfolio
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Typography variant="h5" gutterBottom>All Users</Typography>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="outlined"
          onClick={fetchUsers}
        >
          Refresh Data
        </Button>
      </Box>
      
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
      
      <EditUserDialog 
        open={editDialogOpen} 
        user={selectedUser} 
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveUser}
      />
    </Box>
  );
};

export default AdminUsers;
