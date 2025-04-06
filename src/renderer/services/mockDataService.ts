import { Message, User } from '../types';

// Mock data store
class MockDataStore {
  private messages: Message[] = [];
  private users: User[] = [
    {
      id: 'user1',
      name: 'John Doe',
      avatar: '👨',
      status: 'online'
    },
    {
      id: 'bot',
      name: 'ChatBot',
      avatar: '🤖',
      status: 'online'
    }
  ];
  private typingTimeout: NodeJS.Timeout | null = null;

  // Message methods
  getMessages(roomId: string): Message[] {
    return this.messages.filter(msg => msg.roomId === roomId);
  }

  addMessage(message: Message): void {
    this.messages.push(message);
  }

  removeMessage(messageId: string): void {
    this.messages = this.messages.filter(msg => msg.id !== messageId);
  }

  // User methods
  getUsers(): User[] {
    return this.users;
  }

  getUserById(userId: string): User | undefined {
    return this.users.find(user => user.id === userId);
  }

  updateUserStatus(userId: string, status: User['status']): void {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = status;
    }
  }

  // Typing indicator methods
  addTypingIndicator(roomId: string, user: User): void {
    const typingMessage: Message = {
      id: `typing-${user.id}`,
      content: '',
      sender: user,
      timestamp: new Date(),
      type: 'typing',
      roomId: roomId
    };
    this.messages.push(typingMessage);
  }

  removeTypingIndicator(userId: string): void {
    this.messages = this.messages.filter(msg => msg.id !== `typing-${userId}`);
  }

  // Bot response methods
  generateBotResponse(message: string): string {
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi')) {
      return 'Hello! How can I help you today? 👋';
    }
    
    if (lowercaseMessage.includes('how are you')) {
      return "I'm doing great, thanks for asking! How about you? 😊";
    }
    
    if (lowercaseMessage.includes('?')) {
      return "That's an interesting question! Let me think about it... 🤔";
    }
    
    if (lowercaseMessage.includes('thank')) {
      return "You're welcome! Let me know if you need anything else! 😊";
    }
    
    const defaultResponses = [
      "That's interesting! Tell me more about that. 🤔",
      "I see what you mean! 👍",
      "Thanks for sharing that with me! 😊",
      "I understand completely! 💡",
      "That makes a lot of sense! 🎯"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  // Helper methods
  clearTypingTimeout(): void {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
      this.typingTimeout = null;
    }
  }

  setTypingTimeout(callback: () => void, delay: number): void {
    this.clearTypingTimeout();
    this.typingTimeout = setTimeout(callback, delay);
  }
}

// API service that uses the mock data store
class ChatApiService {
  private store: MockDataStore;
  private currentUser: User;

  constructor() {
    this.store = new MockDataStore();
    this.currentUser = this.store.getUsers()[0]; // Set current user to the first user
  }

  // Message API
  async getMessages(roomId: string): Promise<Message[]> {
    return this.store.getMessages(roomId);
  }

  async sendMessage(content: string, roomId: string): Promise<Message> {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: this.currentUser,
      timestamp: new Date(),
      type: 'text',
      roomId
    };

    this.store.addMessage(newMessage);

    // Simulate bot response
    const botUser = this.store.getUserById('bot');
    if (botUser) {
      // Add typing indicator
      this.store.addTypingIndicator(roomId, botUser);
      
      // Generate bot response after delay
      this.store.setTypingTimeout(() => {
        this.store.removeTypingIndicator(botUser.id);
        
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: this.store.generateBotResponse(content),
          sender: botUser,
          timestamp: new Date(),
          type: 'text',
          roomId
        };
        
        this.store.addMessage(botResponse);
      }, 1500);
    }

    return newMessage;
  }

  // User API
  getCurrentUser(): User {
    return this.currentUser;
  }

  getUsers(): User[] {
    return this.store.getUsers();
  }

  updateUserStatus(userId: string, status: User['status']): void {
    this.store.updateUserStatus(userId, status);
  }
}

// Export a singleton instance
export const chatApiService = new ChatApiService(); 