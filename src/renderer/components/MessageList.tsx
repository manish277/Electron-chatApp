import React from 'react';
import { Message } from '../../shared/mockApi';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list" style={styles.container}>
      {messages.map((message) => (
        <div key={message.id} style={styles.messageContainer}>
          <div style={styles.messageHeader}>
            <span style={styles.sender}>{message.sender}</span>
            <span style={styles.timestamp}>
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
          <div style={styles.messageText}>{message.text}</div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '20px',
    backgroundColor: '#f5f5f5',
  },
  messageContainer: {
    marginBottom: '10px',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  messageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px',
  },
  sender: {
    fontWeight: 'bold' as const,
    color: '#333',
  },
  timestamp: {
    color: '#666',
    fontSize: '0.8em',
  },
  messageText: {
    color: '#444',
    lineHeight: '1.4',
  },
};

export default MessageList; 