import React from 'react';
import { Box, Typography, Paper, Avatar } from '@mui/material';
import { ChatMessage, MessageType } from '../../types/chat';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { format } from 'date-fns';

interface ChatMessageListProps {
  messages: ChatMessage[];
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({ messages }) => {
  const getMessageIcon = (type: MessageType) => {
    switch (type) {
      case MessageType.AI:
        return <SmartToyIcon />;
      case MessageType.CUSTOMER_SERVICE:
        return <SupportAgentIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getMessageColor = (type: MessageType) => {
    switch (type) {
      case MessageType.AI:
        return 'primary.light';
      case MessageType.CUSTOMER_SERVICE:
        return 'secondary.light';
      default:
        return 'grey.100';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {messages.map((message) => (
        <Box
          key={message.id}
          sx={{
            display: 'flex',
            flexDirection: message.type === MessageType.USER ? 'row-reverse' : 'row',
            gap: 1,
            alignItems: 'flex-start',
          }}
        >
          <Avatar
            sx={{
              bgcolor: message.type === MessageType.USER ? 'primary.main' : 'secondary.main',
            }}
          >
            {getMessageIcon(message.type)}
          </Avatar>
          <Box
            sx={{
              maxWidth: '70%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: message.type === MessageType.USER ? 'flex-end' : 'flex-start',
            }}
          >
            <Paper
              elevation={1}
              sx={{
                p: 2,
                bgcolor: getMessageColor(message.type),
                borderRadius: 2,
              }}
            >
              <Typography variant="body1">{message.content}</Typography>
            </Paper>
            <Typography
              variant="caption"
              sx={{ mt: 0.5, color: 'text.secondary' }}
            >
              {format(message.timestamp, 'MMM d, h:mm a')}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
}; 