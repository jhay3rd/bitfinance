import { api } from './api';
import { ChatMessage, MessageType } from '../types/chat';

class ChatService {
  async sendMessage(message: string): Promise<string> {
    const response = await api.post('/chat/chat', { message });
    return response.data.response;
  }

  async sendCustomerServiceMessage(message: string, issueType: string): Promise<string> {
    const response = await api.post('/chat/customer-service', { message, issueType });
    return response.data.response;
  }

  async getChatHistory(): Promise<ChatMessage[]> {
    const response = await api.get('/chat/history');
    return response.data.map((item: any) => ({
      id: item.id,
      content: item.description,
      type: item.action === 'CUSTOMER_SERVICE' ? MessageType.CUSTOMER_SERVICE : MessageType.AI,
      timestamp: new Date(item.createdAt),
    }));
  }
}

export const chatService = new ChatService(); 