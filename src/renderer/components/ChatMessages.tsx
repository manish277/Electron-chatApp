import React, { useEffect, useRef } from 'react';
import { Message, User } from '../types';
import './ChatMessages.css';

interface ChatMessagesProps {
  messages: Message[];
  currentUser: User;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, currentUser }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`message ${
            message.type === 'system'
              ? 'system-message'
              : message.type === 'typing'
              ? 'typing-message'
              : message.sender.id === currentUser.id
              ? 'message-sent'
              : 'message-received'
          }`}
        >
          {message.type === 'typing' ? (
            <div className="typing-indicator">
              <span className="typing-avatar">{message.sender.avatar}</span>
              <span className="typing-dots">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
          ) : (
            <>
              {message.type !== 'system' && (
                <div className="message-header">
                  <span className="message-avatar">{message.sender.avatar}</span>
                  <span className="message-sender">{message.sender.name}</span>
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                </div>
              )}
              <div className="message-content">{message.content}</div>
            </>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages; 