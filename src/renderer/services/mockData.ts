import { User, Message, ChatRoom } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: 'u1',
    name: 'You',
    avatar: '👤',
    status: 'online',
  },
  {
    id: 'u2',
    name: 'Alice',
    avatar: '👩',
    status: 'online',
  },
  {
    id: 'u3',
    name: 'Bob',
    avatar: '👨',
    status: 'online',
  },
];

// Mock Rooms
export const rooms: ChatRoom[] = [
  {
    id: 'r1',
    name: 'General Chat',
    description: 'Welcome to our chat community! Feel free to join the conversation.',
    participants: users,
  },
];

// Initial messages
export const initialMessages: Message[] = [
  {
    id: 'm1',
    content: 'Welcome to the General Chat! 👋',
    sender: users[1], // Alice
    timestamp: new Date(Date.now() - 3600000 * 2), // 2 hours ago
    roomId: 'r1',
    type: 'system',
  },
  {
    id: 'm2',
    content: 'Hey everyone! How is your day going?',
    sender: users[1], // Alice
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    roomId: 'r1',
    type: 'text',
  },
  {
    id: 'm3',
    content: 'Having a great day! Just finished my work 💻',
    sender: users[2], // Bob
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    roomId: 'r1',
    type: 'text',
  },
  {
    id: 'm4',
    content: 'Nice! Anyone up for a coffee break? ☕',
    sender: users[1], // Alice
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    roomId: 'r1',
    type: 'text',
  },
];

// Smart responses based on message content
const smartResponses = {
  greetings: {
    triggers: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
    responses: [
      "Hey there! 👋",
      "Hello! How are you?",
      "Hi! Nice to see you!",
      "Hey! How's it going?",
    ]
  },
  questions: {
    triggers: ['what', 'how', 'when', 'where', 'why', 'who', '?'],
    responses: [
      "That's an interesting question! 🤔",
      "Let me think about that...",
      "Good question! 💭",
      "I was wondering the same thing!",
    ]
  },
  agreement: {
    triggers: ['yes', 'agree', 'true', 'right', 'good idea'],
    responses: [
      "Totally agree with you! 👍",
      "You're absolutely right!",
      "Couldn't agree more! 💯",
      "That's exactly what I was thinking!",
    ]
  },
  excitement: {
    triggers: ['wow', 'amazing', 'awesome', 'cool', 'great', 'nice'],
    responses: [
      "That's fantastic! 🎉",
      "So exciting! ✨",
      "Amazing news! 🌟",
      "Love to hear that! 🙌",
    ]
  },
  default: [
    "That's interesting! Tell me more 👀",
    "Thanks for sharing! 🙌",
    "I see what you mean 💭",
    "Good point! 🎯",
    "Interesting perspective! 🤔",
  ]
};

// Mock data service
class MockDataService {
  private messages: Message[] = [...initialMessages];
  private currentUser = users[0];
  private typingTimeout: NodeJS.Timeout | null = null;

  getCurrentUser(): User {
    return this.currentUser;
  }

  getUsers(): User[] {
    return users;
  }

  getRooms(): ChatRoom[] {
    return rooms;
  }

  getMessages(roomId: string): Message[] {
    return this.messages.filter(msg => msg.roomId === roomId);
  }

  private getSmartResponse(content: string): string {
    const lowercaseContent = content.toLowerCase();
    
    // Check each category for triggers
    for (const [category, data] of Object.entries(smartResponses)) {
      if (category === 'default') continue;
      
      const categoryData = data as { triggers: string[], responses: string[] };
      if (categoryData.triggers.some(trigger => lowercaseContent.includes(trigger))) {
        return categoryData.responses[Math.floor(Math.random() * categoryData.responses.length)];
      }
    }
    
    // If no specific category matches, use default responses
    return smartResponses.default[Math.floor(Math.random() * smartResponses.default.length)];
  }

  private simulateTyping(roomId: string, user: User) {
    // Add typing indicator
    const typingMessage: Message = {
      id: `typing-${user.id}`,
      content: '...',
      sender: user,
      timestamp: new Date(),
      roomId: roomId,
      type: 'typing',
    };
    this.messages.push(typingMessage);

    // Remove typing indicator after response
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.messages = this.messages.filter(m => m.id !== `typing-${user.id}`);
        resolve();
      }, 1500);
    });
  }

  async addMessage(content: string, roomId: string): Promise<Message> {
    const newMessage: Message = {
      id: `m${this.messages.length + 1}`,
      content,
      sender: this.currentUser,
      timestamp: new Date(),
      roomId: roomId,
      type: 'text',
    };
    this.messages.push(newMessage);

    // Clear any existing timeout
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }

    // Simulate response with typing indicator
    const respondingUser = users[Math.floor(Math.random() * (users.length - 1)) + 1];
    
    // Wait a bit before showing typing indicator
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.simulateTyping(roomId, respondingUser);

    // Add response message
    const responseMessage: Message = {
      id: `m${this.messages.length + 1}`,
      content: this.getSmartResponse(content),
      sender: respondingUser,
      timestamp: new Date(),
      roomId: roomId,
      type: 'text',
    };
    this.messages.push(responseMessage);

    return newMessage;
  }

  updateUserStatus(userId: string, status: User['status']): void {
    const user = users.find(u => u.id === userId);
    if (user) {
      user.status = status;
    }
  }
}

export const mockDataService = new MockDataService(); 