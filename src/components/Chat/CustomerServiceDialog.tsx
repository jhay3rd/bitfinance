import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

interface CustomerServiceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (message: string, issueType: string) => void;
}

const ISSUE_TYPES = [
  'Account Issues',
  'Investment Questions',
  'Technical Support',
  'Security Concerns',
  'Billing Issues',
  'Other',
];

export const CustomerServiceDialog: React.FC<CustomerServiceDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const [message, setMessage] = useState('');
  const [issueType, setIssueType] = useState('');

  const handleSubmit = () => {
    if (message.trim() && issueType) {
      onSubmit(message, issueType);
      setMessage('');
      setIssueType('');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Contact Customer Service</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <FormControl fullWidth>
            <InputLabel>Issue Type</InputLabel>
            <Select
              value={issueType}
              label="Issue Type"
              onChange={(e) => setIssueType(e.target.value)}
            >
              {ISSUE_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Describe your issue"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please provide details about your issue..."
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!message.trim() || !issueType}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}; 