import React, { useState, KeyboardEvent } from 'react';
import './Chat.css';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isSending: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isSending }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !isSending) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        disabled={isSending}
      />
      <button
        onClick={handleSubmit}
        disabled={isSending || !message.trim()}
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput; 