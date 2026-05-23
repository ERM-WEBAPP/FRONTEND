import React, { useState } from 'react';
import { Calendar, Search, RefreshCw } from 'lucide-react';
import './LiveTracking.css';

const personnelList = [
  { id: 1, name: 'Liam Foster', initials: 'LF', role: 'HQ - Narim...', time: 'Just now', dotColor: 'green' },
  { id: 2, name: 'Zoe Martinez', initials: 'ZM', role: 'Studio -...', time: '2 min ago', dotColor: 'green' },
  { id: 3, name: 'Ryan Patel', initials: 'RP', role: 'HQ - Narim P...', time: 'Just now', dotColor: 'blue' },
];

const LiveTracking = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="tracking-page page-enter">
      <div className="tracking-header">
        <div className="title-row">
          <h1>Live Employee Tracking</h1>
          <span className="live-feed-badge"><span className="pulse-dot"></span> LIVE FEED</span>
        </div>
        <p className="subtitle">Monitoring real-time onsite staff movements and deployment status</p>
      </div>

      <div className="tracking-stats-bar">
        <div className="stat-item">
          <div className="stat-number text-green">3</div>
          <div className="stat-label">ACTIVE</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number text-blue">3</div>
          <div className="stat-label">IN OFFICE</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number text-gray">1</div>
          <div className="stat-label">OFFLINE</div>
        </div>
      </div>

      <div className="tracking-layout">
        {/* Left Sidebar Control Panel */}
        <div className="tracking-sidebar card">
          <div className="ts-control">
            <div className="date-picker-box">
              <Calendar size={18} className="text-secondary" />
              <span>21 - 05 - 2026</span>
              <Calendar size={18} className="text-secondary ml-auto" />
            </div>
          </div>

          <div className="ts-control">
            <div className="search-box">
              <Search size={18} className="text-secondary" />
              <input 
                type="text" 
                placeholder="Search by Name or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="filter-pills-row">
            <button className={`pill ${activeFilter === 'All' ? 'active' : ''}`} onClick={() => setActiveFilter('All')}>
              All <span className="badge">8</span>
            </button>
            <button className={`pill ${activeFilter === 'Traveling' ? 'active' : ''}`} onClick={() => setActiveFilter('Traveling')}>
              Traveling <span className="badge bg-green">3</span>
            </button>
            <button className={`pill ${activeFilter === 'Office' ? 'active' : ''}`} onClick={() => setActiveFilter('Office')}>
              Office <span className="badge bg-blue">3</span>
            </button>
          </div>

          <div className="personnel-section">
            <div className="section-title">ONSITE PERSONNEL</div>
            <div className="personnel-list">
              {personnelList.map(p => (
                <div className="personnel-card" key={p.id}>
                  <div className={`avatar-initials bg-color-${p.id}`}>{p.initials}</div>
                  <div className="p-info">
                    <div className="p-name">{p.name}</div>
                    <div className="p-role">{p.role}</div>
                  </div>
                  <div className="p-status">
                    <div className={`status-dot dot-${p.dotColor}`}></div>
                    <div className="time-text">{p.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="refresh-section">
            <button className="btn-force-refresh">
              <RefreshCw size={16} /> Force Refresh
            </button>
            <div className="updated-text">UPDATED: 14:04:23</div>
          </div>
        </div>

        {/* Right Map Panel */}
        <div className="tracking-map-container card">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d120638.06452266713!2d72.8776559!3d19.0759837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1716281084206!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{border:0, borderRadius: '12px'}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Live Map"
          ></iframe>
          
          {/* Map Overlay Floating Controls */}
          <div className="map-overlay-panel">
            <div className="map-view-toggles">
              <button className="active">DEFAULT</button>
              <button>SATELLITE</button>
              <button>TERRAIN</button>
            </div>
            <div className="map-onsite-count">
              3 ACTIVE PERSONNEL ONSITE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
