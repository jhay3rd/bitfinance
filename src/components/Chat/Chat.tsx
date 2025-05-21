import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, CircularProgress, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useAuth } from '../../contexts/AuthContext';
import { useSnackbar } from 'notistack';
import { ChatMessage, MessageType } from '../../types/chat';
import { chatService } from '../../services/chatService';
import { ChatMessageList } from './ChatMessageList';
import { CustomerServiceDialog } from './CustomerServiceDialog';
import { useTheme } from '@mui/material/styles';

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    loadChatHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadChatHistory = async () => {
    try {
      const history = await chatService.getChatHistory();
      setMessages(history);
    } catch (error) {
      enqueueSnackbar('Failed to load chat history', { variant: 'error' });
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      type: MessageType.USER,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatService.sendMessage(input);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: MessageType.AI,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerService = async (message: string, issueType: string) => {
    if (!user) {
      enqueueSnackbar('Please login to use customer service', { variant: 'warning' });
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      type: MessageType.USER,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatService.sendCustomerServiceMessage(message, issueType);
      const csMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response,
        type: MessageType.CUSTOMER_SERVICE,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, csMessage]);
    } catch (error) {
      enqueueSnackbar('Failed to send customer service message', { variant: 'error' });
    } finally {
      setIsLoading(false);
      setIsCustomerServiceOpen(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '800px',
        margin: '0 auto',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        {/* Chat Header */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.primary.main,
            color: 'white',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmartToyIcon />
            <Typography variant="h6">BitFinance Assistant</Typography>
          </Box>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SupportAgentIcon />}
            onClick={() => setIsCustomerServiceOpen(true)}
            sx={{ color: 'white' }}
          >
            Speak to Agent
          </Button>
        </Box>

        {/* Chat Messages */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          <ChatMessageList messages={messages} />
          <div ref={messagesEndRef} />
        </Box>

        {/* Chat Input */}
        <Box
          sx={{
            p: 2,
            borderTop: 1,
            borderColor: 'divider',
            backgroundColor: 'background.paper',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
              size="small"
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? <CircularProgress size={24} /> : <SendIcon />}
            </IconButton>
          </Box>
        </Box>
      </Paper>

      <CustomerServiceDialog
        open={isCustomerServiceOpen}
        onClose={() => setIsCustomerServiceOpen(false)}
        onSubmit={handleCustomerService}
      />
    </Box>
  );
}; 