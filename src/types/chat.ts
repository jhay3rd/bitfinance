export enum MessageType {
  USER = 'USER',
  AI = 'AI',
  CUSTOMER_SERVICE = 'CUSTOMER_SERVICE',
}

export interface ChatMessage {
  id: string;
  content: string;
  type: MessageType;
  timestamp: Date;
} 