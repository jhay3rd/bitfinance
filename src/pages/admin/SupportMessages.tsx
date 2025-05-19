
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface SupportMessage {
  id: string;
  userId?: string;
  email?: string;
  message: string;
  response?: string;
  status: 'open' | 'responded' | 'closed';
}

const AdminSupportMessages: React.FC = () => {
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [responding, setResponding] = useState<Record<string, boolean>>({});
  const [responseText, setResponseText] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    fetch('/api/admin/support-messages', {
      headers: { 'Authorization': `Basic ${adminAuth}` }
    })
      .then(res => res.json())
      .then(data => setMessages(data.messages || []))
      .catch(err => console.error('Error fetching support messages:', err))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleRespond = async (id: string) => {
    const adminAuth = localStorage.getItem('adminAuth');
    setResponding(r => ({ ...r, [id]: true }));
    try {
      await fetch(`/api/admin/support-messages/${id}/respond`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${adminAuth}`,
        },
        body: JSON.stringify({ response: responseText[id] }),
      });
      setResponding(r => ({ ...r, [id]: false }));
      window.location.reload();
    } catch (err) {
      console.error('Error responding to message:', err);
      setResponding(r => ({ ...r, [id]: false }));
    }
  };

  const handleClose = async (id: string) => {
    const adminAuth = localStorage.getItem('adminAuth');
    try {
      await fetch(`/api/admin/support-messages/${id}/close`, {
        method: 'PUT',
        headers: { 'Authorization': `Basic ${adminAuth}` },
      });
      window.location.reload();
    } catch (err) {
      console.error('Error closing message:', err);
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Support Messages</Typography>
      {loading ? <CircularProgress /> : (
        <>
          {messages.length === 0 ? <Typography>No messages found.</Typography> : (
            messages.map(msg => (
              <Box key={msg.id} mb={3} p={2} border={1} borderRadius={2} borderColor="#ccc">
                <Typography><b>From:</b> {msg.email || msg.userId}</Typography>
                <Typography><b>Message:</b> {msg.message}</Typography>
                <Typography><b>Status:</b> {msg.status}</Typography>
                {msg.response && <Typography><b>Response:</b> {msg.response}</Typography>}
                {msg.status === 'open' && (
                  <>
                    <TextField
                      label="Response"
                      multiline
                      minRows={2}
                      value={responseText[msg.id] || ''}
                      onChange={e => setResponseText(t => ({ ...t, [msg.id]: e.target.value }))}
                      fullWidth
                      sx={{ my: 1 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRespond(msg.id)}
                      disabled={responding[msg.id] || !responseText[msg.id]}
                      sx={{ mr: 1 }}
                    >Respond</Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleClose(msg.id)}
                    >Close</Button>
                  </>
                )}
              </Box>
            ))
          )}
        </>
      )}
    </Box>
  );
};

export default AdminSupportMessages;
