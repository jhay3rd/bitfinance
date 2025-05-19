
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: string;
  status: 'approved' | 'denied' | 'pending';
}

const AdminTransactions: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updating, setUpdating] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    fetch('/api/admin/transactions', {
      headers: { 'Authorization': `Basic ${adminAuth}` }
    })
      .then(res => res.json())
      .then(data => setTransactions(data.transactions || []))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleStatusChange = async (id: string, status: 'approved' | 'denied' | 'pending') => {
    const adminAuth = localStorage.getItem('adminAuth');
    setUpdating(u => ({ ...u, [id]: true }));
    await fetch(`/api/admin/transactions/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${adminAuth || ''}`,
      },
      body: JSON.stringify({ status }),
    });
    setUpdating(u => ({ ...u, [id]: false }));
    window.location.reload();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Transactions</Typography>
      {loading ? <CircularProgress /> : (
        <>
          {transactions.length === 0 ? <Typography>No transactions found.</Typography> : (
            transactions.map(tx => (
              <Box key={tx.id} mb={3} p={2} border={1} borderRadius={2} borderColor="#ccc">
                <Typography><b>User ID:</b> {tx.userId}</Typography>
                <Typography><b>Amount:</b> {tx.amount}</Typography>
                <Typography><b>Type:</b> {tx.type}</Typography>
                <Typography><b>Status:</b> {tx.status}</Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleStatusChange(tx.id, 'approved')}
                  disabled={updating[tx.id] || tx.status === 'approved'}
                  sx={{ mr: 1 }}
                >Approve</Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleStatusChange(tx.id, 'denied')}
                  disabled={updating[tx.id] || tx.status === 'denied'}
                  sx={{ mr: 1 }}
                >Deny</Button>
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={() => handleStatusChange(tx.id, 'pending')}
                  disabled={updating[tx.id] || tx.status === 'pending'}
                >Set Pending</Button>
              </Box>
            ))
          )}
        </>
      )}
    </Box>
  );
};

export default AdminTransactions;
