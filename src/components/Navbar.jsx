import React, { useState, useEffect } from 'react';
import { Search, Bell, Moon, Sun, MapPin } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ toggleSidebar }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header className="navbar glass">
      <div className="navbar-left">
        <div className="search-bar">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Search employees, reports..." />
        </div>
      </div>

      <div className="navbar-right">
        <div className="datetime-widget">
          <div className="time">{formatTime(time)}</div>
          <div className="date">{formatDate(time)}</div>
        </div>

        <div className="status-chip present">
          <MapPin size={14} />
          <span>At Office</span>
        </div>

        <button className="icon-btn theme-toggle">
          <Moon size={20} />
        </button>

        <button className="icon-btn notification-btn">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>

        <div className="profile-dropdown">
          <img src="https://i.pravatar.cc/150?u=vijay" alt="Profile" className="profile-img" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
