import React from 'react';
import { User } from './types';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar';
import './App.css';

const App: React.FC = () => {
  const currentUser: User = {
    id: 'user1',
    name: 'John Doe',
    avatar: '👨',
    status: 'online'
  };

  const participants: User[] = [
    currentUser,
    {
      id: 'bot',
      name: 'ChatBot',
      avatar: '🤖',
      status: 'online'
    }
  ];

  const room = {
    id: 'general',
    name: 'General Chat',
    description: 'Welcome to the general chat room! Feel free to discuss any topic.',
  };

  return (
    <div className="app">
      <Sidebar currentUser={currentUser} />
      <main className="main-content">
        <Chat
          room={room}
          currentUser={currentUser}
          participants={participants}
        />
      </main>
    </div>
  );
};

export default App; 