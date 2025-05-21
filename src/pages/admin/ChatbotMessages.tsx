
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, TextField, Button, Paper, Chip, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getChatbotMessages, respondToChatMessage } from '../../services/api';
import { useToast } from "@/hooks/use-toast";

interface ChatMessage {
  id: string;
  userId: string;
  userName?: string;
  message: string;
  response?: string;
  timestamp: string;
  status: 'pending' | 'responded' | 'automated';
}

const AdminChatbotMessages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [respondingIds, setRespondingIds] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await getChatbotMessages();
      setMessages(res.data.messages || []);
      
      // Initialize responses state
      const initialResponses: Record<string, string> = {};
      res.data.messages.forEach((msg: ChatMessage) => {
        initialResponses[msg.id] = msg.response || '';
      });
      setResponses(initialResponses);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch chatbot messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
      return;
    }
    fetchMessages();
  }, [navigate]);

  const handleResponseChange = (id: string, value: string) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleSendResponse = async (id: string) => {
    if (!responses[id]?.trim()) {
      toast({
        title: "Error",
        description: "Response cannot be empty",
        variant: "destructive"
      });
      return;
    }

    setRespondingIds(prev => ({ ...prev, [id]: true }));
    try {
      await respondToChatMessage(id, responses[id]);
      toast({
        title: "Success",
        description: "Response sent successfully",
      });
      
      // Update message in state
      setMessages(messages.map(msg => 
        msg.id === id 
          ? { ...msg, response: responses[id], status: 'responded' } 
          : msg
      ));
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to send response",
        variant: "destructive"
      });
    } finally {
      setRespondingIds(prev => ({ ...prev, [id]: false }));
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Chatbot Messages</Typography>
      
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="outlined"
          onClick={fetchMessages}
        >
          Refresh Messages
        </Button>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : messages.length === 0 ? (
        <Typography>No chatbot messages found.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {messages.map((msg) => (
            <Paper key={msg.id} elevation={1} sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="subtitle2">
                  From: {msg.userName || msg.userId}
                </Typography>
                <Chip 
                  label={msg.status} 
                  color={
                    msg.status === 'pending' ? 'warning' : 
                    msg.status === 'responded' ? 'success' : 'default'
                  }
                  size="small"
                />
              </Box>
              
              <Typography variant="body1" sx={{ mb: 1, whiteSpace: 'pre-wrap' }}>
                {msg.message}
              </Typography>
              
              <Typography variant="caption" color="text.secondary">
                {new Date(msg.timestamp).toLocaleString()}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              {msg.response && (
                <Box sx={{ mb: 2, p: 1, bgcolor: 'rgba(0, 0, 0, 0.04)', borderRadius: 1 }}>
                  <Typography variant="subtitle2">Current Response:</Typography>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {msg.response}
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ mt: 1 }}>
                <TextField
                  label="Your Response"
                  multiline
                  rows={3}
                  fullWidth
                  value={responses[msg.id] || ''}
                  onChange={(e) => handleResponseChange(msg.id, e.target.value)}
                  sx={{ mb: 1 }}
                />
                <Button
                  variant="contained"
                  onClick={() => handleSendResponse(msg.id)}
                  disabled={respondingIds[msg.id]}
                >
                  {respondingIds[msg.id] ? 'Sending...' : 'Send Response'}
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AdminChatbotMessages;
