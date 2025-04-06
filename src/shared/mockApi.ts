export interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
}

let messages: Message[] = [
  {
    id: 1,
    text: "Hello!",
    sender: "User1",
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    text: "Hi there!",
    sender: "User2",
    timestamp: new Date().toISOString()
  }
];

export const fetchMessages = (): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...messages]);
    }, 500); // Simulate network delay
  });
};

export const sendMessage = (text: string, sender: string): Promise<Message> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newMessage: Message = {
        id: messages.length + 1,
        text,
        sender,
        timestamp: new Date().toISOString()
      };
      messages.push(newMessage);
      resolve(newMessage);
    }, 500); // Simulate network delay
  });
}; 