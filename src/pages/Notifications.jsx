import React, { useState } from 'react';
import { CheckCircle, Info, AlertCircle, Megaphone } from 'lucide-react';
import './Notifications.css';

const initialNotifications = [
  {
    id: 1,
    title: 'Leave Approved',
    message: 'Your annual leave request for Oct 12-15 has been approved by the manager. Enjoy your time off!',
    dateStr: 'Oct 15, 2023 • 10:30 AM',
    relTime: '2h ago',
    category: 'LEAVE',
    icon: 'check',
    unread: true,
  },
  {
    id: 2,
    title: 'System Update Scheduled',
    message: 'The ERM portal will be undergoing maintenance tonight between 11:00 PM and 01:00 AM UTC. Some features may be unavailable.',
    dateStr: 'Oct 15, 2023 • 09:15 AM',
    relTime: '3h ago',
    category: 'SYSTEM',
    icon: 'info',
    unread: true,
  },
  {
    id: 3,
    title: 'Incomplete Complaint Profile',
    message: 'Your complaint #CMP-78455 requires additional documents to be processed by HR. Please upload the requested files.',
    dateStr: 'Oct 14, 2023 • 02:45 PM',
    relTime: 'Yesterday',
    category: 'COMPLAINT',
    icon: 'alert',
    unread: false,
  },
  {
    id: 4,
    title: 'New Policy Announcement',
    message: 'A new remote work policy has been uploaded to the Employee Handbook. Please review the updated guidelines at your convenience.',
    dateStr: 'Oct 13, 2023 • 11:00 AM',
    relTime: '2 days ago',
    category: 'ANNOUNCEMENT',
    icon: 'megaphone',
    unread: false,
  }
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState(initialNotifications);

  const getIcon = (iconStr) => {
    switch(iconStr) {
      case 'check': return <CheckCircle size={20} className="icon-check" />;
      case 'info': return <Info size={20} className="icon-info" />;
      case 'alert': return <AlertCircle size={20} className="icon-alert" />;
      case 'megaphone': return <Megaphone size={20} className="icon-megaphone" />;
      default: return <Info size={20} />;
    }
  };

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <div className="notif-page-new">
      <div className="notif-top-tabs">
        <button 
          className={`notif-tab ${activeTab === 'All' ? 'active' : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All
        </button>
        <button 
          className={`notif-tab ${activeTab === 'Notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('Notifications')}
        >
          Notifications
        </button>
        <button 
          className={`notif-tab ${activeTab === 'Announcements' ? 'active' : ''}`}
          onClick={() => setActiveTab('Announcements')}
        >
          Announcements
        </button>
      </div>

      <div className="notif-list-container">
        {notifications.map(notif => (
          <div 
            key={notif.id} 
            className={`notif-card-new ${notif.unread ? 'unread' : ''}`}
            onClick={() => markRead(notif.id)}
          >
            <div className={`notif-icon-box bg-${notif.icon}`}>
              {getIcon(notif.icon)}
            </div>
            
            <div className="notif-content">
              <div className="notif-header-row">
                <div className="notif-title-wrap">
                  <h3 className="notif-title">{notif.title}</h3>
                  {notif.unread && <span className="notif-unread-dot"></span>}
                </div>
                <div className="notif-date">{notif.dateStr}</div>
              </div>
              
              <p className="notif-message">{notif.message}</p>
              
              <div className="notif-footer-row">
                <span className={`notif-badge badge-${notif.icon}`}>{notif.category}</span>
                <span className="notif-rel-time">• {notif.relTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
