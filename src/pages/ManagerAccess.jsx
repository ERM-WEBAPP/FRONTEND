import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LiveTracking from './LiveTracking';
import LeaveApprovals from './LeaveApprovals';
import Reports from './Reports';
import Announcements from './Announcements';
import './ManagerAccess.css';

const ManagerAccess = () => {
  const [activeTab, setActiveTab] = useState('tracking');
  const navigate = useNavigate();

  return (
    <div className="manager-access-page">
      <div className="manager-top-nav">
        <div className="manager-tabs">
          <button 
            className={`manager-tab ${activeTab === 'tracking' ? 'active' : ''}`} 
            onClick={() => setActiveTab('tracking')}
          >
            Live Tracking
          </button>
          <button 
            className={`manager-tab ${activeTab === 'approvals' ? 'active' : ''}`} 
            onClick={() => setActiveTab('approvals')}
          >
            Approvals
          </button>
          <button 
            className={`manager-tab ${activeTab === 'reports' ? 'active' : ''}`} 
            onClick={() => setActiveTab('reports')}
          >
            Team Attendance Report
          </button>
          <button 
            className={`manager-tab ${activeTab === 'announcements' ? 'active' : ''}`} 
            onClick={() => setActiveTab('announcements')}
          >
            Announcement
          </button>
        </div>
      </div>
      <div className="manager-content">
        {activeTab === 'tracking' && <LiveTracking />}
        {activeTab === 'approvals' && <LeaveApprovals />}
        {activeTab === 'reports' && <Reports />}
        {activeTab === 'announcements' && <Announcements />}
      </div>
    </div>
  );
};

export default ManagerAccess;
