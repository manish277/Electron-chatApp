import React from 'react';
import { User } from '../../types';
import './Chat.css';

interface ChatHeaderProps {
  title: string;
  description: string;
  participants: User[];
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  description,
  participants,
}) => {
  return (
    <div className="chat-header">
      <div className="chat-header-info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="chat-header-participants">
        {participants.map((participant) => (
          <div key={participant.id} className="participant">
            <span className="avatar">{participant.avatar}</span>
            <span className="name">{participant.name}</span>
            <span className={`status ${participant.status}`}></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHeader; 