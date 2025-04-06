export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  roomId: string;
  type: 'text' | 'system' | 'typing';
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  participants: User[];
  lastMessage?: Message;
} 