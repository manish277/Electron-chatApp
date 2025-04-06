import React, { useState, useEffect } from 'react';
import { Message, User } from '../../types';
import { chatApiService } from '../../services/mockDataService';
import ChatMessages from '../ChatMessages';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import './Chat.css';

interface ChatProps {
  room: {
    id: string;
    name: string;
    description: string;
  };
  currentUser: User;
  participants: User[];
}

const Chat: React.FC<ChatProps> = ({ room, currentUser, participants }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const initialMessages = await chatApiService.getMessages(room.id);
      setMessages(initialMessages);
    };

    fetchInitialMessages();

    const interval = setInterval(async () => {
      const updatedMessages = await chatApiService.getMessages(room.id);
      setMessages(updatedMessages);
    }, 500);

    return () => clearInterval(interval);
  }, [room.id]);

  const handleSendMessage = async (content: string) => {
    if (isSending || !content.trim()) return;

    try {
      setIsSending(true);
      await chatApiService.sendMessage(content, room.id);
      const updatedMessages = await chatApiService.getMessages(room.id);
      setMessages(updatedMessages);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat">
      <ChatHeader
        title={room.name}
        description={room.description}
        participants={participants}
      />
      <ChatMessages messages={messages} currentUser={currentUser} />
      <ChatInput onSendMessage={handleSendMessage} isSending={isSending} />
    </div>
  );
};

export default Chat; 