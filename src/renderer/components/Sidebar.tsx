import React from 'react';
import { User } from '../types';
import './Sidebar.css';

interface SidebarProps {
  currentUser: User;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser }) => {
  return (
    <aside className="sidebar">
      <div className="user-profile">
        <span className="user-avatar">{currentUser.avatar}</span>
        <div className="user-info">
          <span className="user-name">{currentUser.name}</span>
          <span className={`user-status ${currentUser.status}`}>
            {currentUser.status}
          </span>
        </div>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className="active">
            <span className="channel-icon">💬</span>
            Chat
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar; 