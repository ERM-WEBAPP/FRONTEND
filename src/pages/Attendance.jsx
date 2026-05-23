import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, X } from 'lucide-react';
import './Attendance.css';

const Attendance = () => {
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [requestReason, setRequestReason] = useState('');

  const handleRequestSubmit = () => {
    setRequestModalOpen(false);
    setRequestReason('');
  };

  // Mock data for calendar dots
  const getDayStatus = (day) => {
    if (day === -2) return ['present']; 
    if (day === -1) return ['present']; 
    if (day === 1) return ['half-day'];
    if (day === 2) return ['present'];
    if (day === 3) return ['late', 'present']; 
    
    if (day === 4) return ['permission', 'present']; 
    if (day === 5) return ['late', 'present']; 
    if (day === 6 || day === 7) return ['absent'];
    if (day === 8 || day === 9) return ['present'];
    if (day === 10) return ['half-day'];
    
    return [];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return '#4CAA17'; 
      case 'absent': return '#EF4444'; 
      case 'permission': return '#FACC15'; 
      case 'late': return '#F97316'; 
      case 'half-day': return '#8B5CF6'; 
      default: return 'transparent';
    }
  };

  return (
    <div className="attendance-dashboard">
      
      <div className="dashboard-layout">
        
        {/* LEFT COLUMN: Calendar */}
        <div className="dashboard-left">
          <div className="calendar-card card">
            <div className="calendar-header">
              <h2>May 2026</h2>
              <div className="calendar-nav">
                <button className="icon-btn-minimal"><ChevronLeft size={20} /></button>
                <button className="icon-btn-minimal"><ChevronRight size={20} /></button>
              </div>
            </div>

            <div className="calendar-grid mt-6">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="weekday">{day}</div>
              ))}
              
              {/* First row */}
              {[28, 29, 30, 31].map((day, i) => {
                 const statuses = getDayStatus(-4 + i);
                 return (
                  <div key={`prev-${day}`} className="calendar-cell empty">
                    <span className="date-num">{day}</span>
                    <div className="status-dots">
                      {statuses.map((s, idx) => (
                        <div key={idx} className="s-dot" style={{ backgroundColor: getStatusColor(s) }}></div>
                      ))}
                    </div>
                  </div>
                 );
              })}
              
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const statuses = getDayStatus(day);
                return (
                  <div key={day} className="calendar-cell">
                    <span className="date-num">{day}</span>
                    <div className="status-dots">
                      {statuses.map((status, index) => (
                        <div key={index} className="s-dot" style={{ backgroundColor: getStatusColor(status) }}></div>
                      ))}
                    </div>
                  </div>
                );
              })}
              
              {[1,2,3,4,5,6,7].map(day => (
                 <div key={`next-${day}`} className="calendar-cell empty">
                    <span className="date-num">{day}</span>
                    <div className="status-dots"></div>
                 </div>
              ))}
            </div>

            <div className="calendar-legend-container mt-6">
              <div className="legend-row">
                <LegendItem color="#4CAA17" label="Present" />
                <LegendItem color="#EF4444" label="Absent" />
                <LegendItem color="#FACC15" label="Permission" />
              </div>
              <div className="legend-row mt-4">
                <LegendItem color="#F97316" label="Late" />
                <LegendItem color="#8B5CF6" label="Half day" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Stats & History */}
        <div className="dashboard-right">
          
          {/* Analytics Header */}
          <div className="section-header-compact">
            <h3 className="section-title">Attendance</h3>
            <div className="filters">
              <CustomDropdown options={['May']} defaultSelected="May" />
              <CustomDropdown options={['2026']} defaultSelected="2026" />
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="analytics-grid">
            <div className="stat-card bg-present text-white shadow-present">
              <div className="s-card-title">PRESENT</div>
              <div className="s-card-value">22</div>
            </div>
            <div className="stat-card bg-absent text-white shadow-absent">
              <div className="s-card-title">ABSENTS</div>
              <div className="s-card-value">02</div>
            </div>
            <div className="stat-card bg-late text-white shadow-late">
              <div className="s-card-title">LATE IN</div>
              <div className="s-card-value">04</div>
            </div>
            <div className="stat-card bg-permissions text-white shadow-permissions">
              <div className="s-card-title">PERMISSIONS</div>
              <div className="s-card-value">04</div>
            </div>
          </div>

          {/* History Header */}
          <div className="section-header-compact mt-6">
            <h3 className="section-title">Attendance</h3>
            <div className="filters">
              <CustomDropdown options={['May']} defaultSelected="May" />
              <CustomDropdown options={['2026']} defaultSelected="2026" />
            </div>
          </div>

          {/* History Cards */}
          <div className="history-cards-container">
            <HistoryCard 
              date="Tue Apr 1 2025" 
              status="Present" 
              statusClass="badge-present"
              checkIn="10:00 AM" 
              checkOut="10:00 AM" 
              workingHrs="10:00" 
              onRequest={() => setRequestModalOpen(true)}
            />
            <HistoryCard 
              date="Tue Apr 1 2025" 
              status="Absent" 
              statusClass="badge-absent"
              checkIn="10:00 AM" 
              checkOut="10:00 AM" 
              workingHrs="10:00" 
              onRequest={() => setRequestModalOpen(true)}
            />
            <HistoryCard 
              date="Tue Apr 1 2025" 
              status="Permission" 
              statusClass="badge-permission"
              checkIn="10:00 AM" 
              checkOut="10:00 AM" 
              workingHrs="10:00" 
              onRequest={() => setRequestModalOpen(true)}
            />
          </div>

        </div>
      </div>

      {requestModalOpen && (
        <div className="attendance-modal-overlay">
          <div className="attendance-modal-content">
            <div className="attendance-modal-header">
              <h2>Request</h2>
              <button className="btn-close-modal" onClick={() => setRequestModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="attendance-modal-body">
              <textarea 
                placeholder="Enter your reason..."
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                rows={6}
              />
            </div>
            <div className="attendance-modal-footer">
              <button className="btn-submit-request" onClick={handleRequestSubmit}>
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
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

const LegendItem = ({ color, label }) => (
  <div className="legend-item">
    <div className="s-dot" style={{ backgroundColor: color }}></div>
    <span>{label}</span>
  </div>
);

const HistoryCard = ({ date, status, statusClass, checkIn, checkOut, workingHrs, onRequest }) => (
  <div className="history-detail-card card">
    <div className="h-card-header mb-4">
      <span className="h-date">{date}</span>
      <span className={`h-badge ${statusClass}`}>{status}</span>
    </div>
    
    <div className="h-card-metrics mb-4">
      <div className="h-metric">
        <div className="h-metric-val text-green">{checkIn}</div>
        <div className="h-metric-lbl">Check In</div>
      </div>
      <div className="h-metric">
        <div className="h-metric-val text-green">{checkOut}</div>
        <div className="h-metric-lbl">Check Out</div>
      </div>
      <div className="h-metric">
        <div className="h-metric-val text-green">{workingHrs}</div>
        <div className="h-metric-lbl">Working HR's</div>
      </div>
    </div>
    
    <button className="btn-request" onClick={onRequest}>Request</button>
  </div>
);

export default Attendance;
