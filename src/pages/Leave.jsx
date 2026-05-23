import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './Leave.css';

const Leave = () => {
  const [activeTab, setActiveTab] = useState('leave');
  const [isHalfDay, setIsHalfDay] = useState(false);

  return (
    <div className="leave-dashboard">
      <div className="dashboard-layout">
        
        {/* Left Column: Form */}
        <div className="dashboard-left">
          
          <div className="tabs-container">
            <button 
              className={`tab-btn ${activeTab === 'leave' ? 'active' : ''}`}
              onClick={() => setActiveTab('leave')}
            >
              Apply Leave
            </button>
            <button 
              className={`tab-btn ${activeTab === 'permission' ? 'active' : ''}`}
              onClick={() => setActiveTab('permission')}
            >
              Permission
            </button>
          </div>

          <div className="leave-form-container">
            {activeTab === 'leave' ? (
              <form className="leave-form">
                <div className="form-group">
                  <label>Leave Type</label>
                  <div className="custom-select-wrapper">
                    <select className="form-control form-select">
                      <option>Casual Leave</option>
                      <option>Sick Leave</option>
                      <option>Annual Leave</option>
                    </select>
                    <ChevronDown className="select-icon" size={16} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="date" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input type="date" className="form-control" />
                  </div>
                </div>

                <div className="form-group half-day-group">
                  <label>Applying for Half Day?</label>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={isHalfDay}
                      onChange={(e) => setIsHalfDay(e.target.checked)}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="form-group">
                  <label>Reason for leave</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="Enter reason for leave..."
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-submit-green">Submit Leave Request</button>
                </div>
              </form>
            ) : (
              <form className="leave-form">
                <div className="form-group">
                  <label>Permission Date</label>
                  <input type="date" className="form-control" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input type="time" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label>End Time</label>
                    <input type="time" className="form-control" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Reason for permission</label>
                  <textarea 
                    className="form-control" 
                    rows="4" 
                    placeholder="Enter reason for permission..."
                  ></textarea>
                </div>

                <div className="form-actions">
                  <button type="button" className="btn-submit-green">Submit Permission Request</button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: History */}
        <div className="dashboard-right">
          <div className="section-header-compact">
            <h3 className="section-title">{activeTab === 'leave' ? 'Leave History' : 'Permission History'}</h3>
            <div className="filters">
              <CustomDropdown options={['May']} defaultSelected="May" />
              <CustomDropdown options={['2026', '2025']} defaultSelected="Year" />
            </div>
          </div>

          <div className="leave-history-list mt-6">
            {activeTab === 'leave' ? (
              <>
                <HistoryCard 
                  type="Casual Leave"
                  reason="Personal emergency at home"
                  status="Approved"
                  statusColor="green"
                  durationLabel="Duration"
                  durationValue="Oct 12 - Oct 14"
                  daysLabel="Days"
                  daysValue="3 Days"
                  hrNote="HR: Recover Well. Health First."
                />
                <HistoryCard 
                  type="Casual Leave"
                  reason="Personal emergency at home"
                  status="Pending"
                  statusColor="orange"
                  durationLabel="Duration"
                  durationValue="Oct 12 - Oct 14"
                  daysLabel="Days"
                  daysValue="3 Days"
                  hrNote="HR: Recover Well. Health First."
                />
                <HistoryCard 
                  type="Casual Leave"
                  reason="Personal emergency at home"
                  status="Rejected"
                  statusColor="red"
                  durationLabel="Duration"
                  durationValue="Oct 12 - Oct 14"
                  daysLabel="Days"
                  daysValue="3 Days"
                  hrNote="HR: Recover Well. Health First."
                />
              </>
            ) : (
              <>
                <HistoryCard 
                  type="Medical Permission"
                  reason="Nov 12, 2023"
                  status="Approved"
                  statusColor="green"
                  durationLabel="Time Slot"
                  durationValue="09:00 AM - 11:00 AM"
                  daysLabel="Duration"
                  daysValue="2 Hours"
                  hrNote="HR: Recover Well. Health First."
                />
                <HistoryCard 
                  type="Medical Permission"
                  reason="Nov 12, 2023"
                  status="Pending"
                  statusColor="orange"
                  durationLabel="Time Slot"
                  durationValue="09:00 AM - 11:00 AM"
                  daysLabel="Duration"
                  daysValue="2 Hours"
                  hrNote="HR: Recover Well. Health First."
                />
                <HistoryCard 
                  type="Medical Permission"
                  reason="Nov 12, 2023"
                  status="Rejected"
                  statusColor="red"
                  durationLabel="Time Slot"
                  durationValue="09:00 AM - 11:00 AM"
                  daysLabel="Duration"
                  daysValue="2 Hours"
                  hrNote="HR: Recover Well. Health First."
                />
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-components

const CustomDropdown = ({ options, defaultSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button 
        className={`dropdown-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selected}</span>
        <ChevronDown size={14} className={`chevron ${isOpen ? 'rotate' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((opt) => (
            <div 
              key={opt} 
              className={`dropdown-item ${selected === opt ? 'selected' : ''}`}
              onClick={() => {
                setSelected(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const HistoryCard = ({ type, reason, status, statusColor, durationLabel, durationValue, daysLabel, daysValue, hrNote }) => (
  <div className={`leave-card border-${statusColor}`}>
    <div className="leave-card-header">
      <div className="leave-info">
        <h4>{type}</h4>
        <p>{reason}</p>
      </div>
      <span className={`status-badge badge-${statusColor}`}>{status}</span>
    </div>
    
    <div className="leave-card-divider"></div>
    
    <div className="leave-card-footer">
      <div className="lc-metric">
        <span className="lc-label">{durationLabel}</span>
        <span className="lc-value">{durationValue}</span>
      </div>
      <div className="lc-metric text-right">
        <span className="lc-label">{daysLabel}</span>
        <span className="lc-value">{daysValue}</span>
      </div>
    </div>

    {hrNote && (
      <div className={`leave-card-hr hr-border-${statusColor}`}>
        {hrNote}
      </div>
    )}
  </div>
);

export default Leave;
