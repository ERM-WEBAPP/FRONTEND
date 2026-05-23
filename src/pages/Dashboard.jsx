import React, { useState, useEffect } from 'react';
import { LogIn, LogOut, Hourglass, Megaphone, Menu, Bell } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="mobile-dashboard-container">
      {/* Green Header Background Area */}
      <div className="mobile-header-bg">

        <div className="mobile-greeting">
          <h1>Hey Vijay 👋</h1>
          <p>Good Morning! Mark Your Attendance 👊</p>
        </div>
      </div>

      {/* Overlapping Card */}
      <div className="attendance-overlap-card card">
        <div className="shift-pill-wrapper">
          <span className="shift-pill">GENERAL SHIFT</span>
        </div>
        
        <div className="time-action-row">
          <div className="live-clock">{formatTime(time)}</div>
          <button 
            className={isCheckedIn ? "btn-checkout" : "btn-checkin"}
            onClick={() => setIsCheckedIn(!isCheckedIn)}
          >
            {isCheckedIn ? "Check Out" : "Check In"}
          </button>
        </div>
        
        <div className="attendance-metrics">
          <div className="metric-item">
            <LogIn size={24} className="metric-icon color-green" />
            <span className="metric-time">09:00 Am</span>
            <span className="metric-label color-green">Check In</span>
          </div>
          <div className="metric-item">
            <LogOut size={24} className="metric-icon color-blue" />
            <span className="metric-time">09:00 Am</span>
            <span className="metric-label color-blue">Check Out</span>
          </div>
          <div className="metric-item">
            <Hourglass size={24} className="metric-icon color-purple" />
            <span className="metric-time">08:05</span>
            <span className="metric-label color-purple">Working HR's</span>
          </div>
        </div>
      </div>

      {/* Announcements Section */}
      <div className="mobile-announcements">
        <div className="section-header">
          <div className="header-title">
            <h2>Announcement</h2>
            <Megaphone size={18} />
          </div>
        </div>
        <p className="section-subtitle">Latest company updates and important notices</p>

        <div className="announcement-cards">
          <div className="a-card">
            <h3>Office Holiday Notice</h3>
            <p>Office will remain closed for the upcoming public holiday...</p>
            <div className="a-card-footer">
              <span>Posted by HR</span>
              <span className="dot">•</span>
              <span>2h ago</span>
            </div>
          </div>
          <div className="a-card">
            <h3>Office Holiday Notice</h3>
            <p>Office will remain closed for the upcoming public holiday...</p>
            <div className="a-card-footer">
              <span>Posted by HR</span>
              <span className="dot">•</span>
              <span>2h ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
