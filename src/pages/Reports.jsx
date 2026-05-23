import React, { useState } from 'react';
import { 
  Search, 
  Download, 
  Filter, 
  Users, 
  UserCheck, 
  UserX, 
  Clock,
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Reports.css';

const reportsData = [
  { id: 'T001', name: 'Vijay Kumar', role: 'Senior Developer', status: 'Present', checkIn: '09:00 AM', checkOut: '06:00 PM', workingHrs: '09:00', date: 'May 21, 2026', avatar: 'https://i.pravatar.cc/150?u=vijay' },
  { id: 'T002', name: 'Sarah Connor', role: 'UI/UX Designer', status: 'Absent', checkIn: '-', checkOut: '-', workingHrs: '-', date: 'May 21, 2026', avatar: 'https://i.pravatar.cc/150?u=sarah' },
  { id: 'T003', name: 'John Doe', role: 'Product Manager', status: 'Late', checkIn: '10:15 AM', checkOut: '07:00 PM', workingHrs: '08:45', date: 'May 21, 2026', avatar: 'https://i.pravatar.cc/150?u=john' },
  { id: 'T004', name: 'Emily Chen', role: 'Frontend Developer', status: 'On Leave', checkIn: '-', checkOut: '-', workingHrs: '-', date: 'May 21, 2026', avatar: 'https://i.pravatar.cc/150?u=emily' },
  { id: 'T005', name: 'Michael Brown', role: 'Backend Developer', status: 'Present', checkIn: '08:45 AM', checkOut: '05:30 PM', workingHrs: '08:45', date: 'May 21, 2026', avatar: 'https://i.pravatar.cc/150?u=michael' },
  { id: 'T006', name: 'David Smith', role: 'QA Engineer', status: 'Present', checkIn: '09:05 AM', checkOut: '06:10 PM', workingHrs: '09:05', date: 'May 21, 2026', avatar: 'https://i.pravatar.cc/150?u=david' },
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const getStatusClass = (status) => {
    switch (status) {
      case 'Present': return 'status-present';
      case 'Absent': return 'status-absent';
      case 'Late': return 'status-late';
      case 'On Leave': return 'status-leave';
      default: return '';
    }
  };

  return (
    <div className="reports-page page-enter">
      
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Team Attendance Report</h1>
          <p className="page-subtitle">Daily attendance overview and working hours</p>
        </div>
        <div className="header-actions">
          <button className="btn-outline">
            <Filter size={16} /> Filter
          </button>
          <button className="btn-primary">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card">
          <div className="sc-icon bg-blue-light text-blue">
            <Users size={24} />
          </div>
          <div className="sc-info">
            <span className="sc-label">Total Team</span>
            <span className="sc-value">24</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="sc-icon bg-green-light text-green">
            <UserCheck size={24} />
          </div>
          <div className="sc-info">
            <span className="sc-label">Present Today</span>
            <span className="sc-value">18</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="sc-icon bg-red-light text-red">
            <UserX size={24} />
          </div>
          <div className="sc-info">
            <span className="sc-label">Absent Today</span>
            <span className="sc-value">3</span>
          </div>
        </div>
        <div className="summary-card">
          <div className="sc-icon bg-orange-light text-orange">
            <Clock size={24} />
          </div>
          <div className="sc-info">
            <span className="sc-label">Late In</span>
            <span className="sc-value">3</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card mt-6">
        <div className="table-controls mb-4">
          <div className="search-bar-table">
            <Search size={16} className="text-secondary" />
            <input 
              type="text" 
              placeholder="Search employee name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="table-filters">
            <div className="custom-select">
              Date: Today <ChevronDown size={14} />
            </div>
            <div className="custom-select">
              Department: All <ChevronDown size={14} />
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="reports-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Emp ID</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Working Hrs</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportsData.map((emp) => (
                <tr key={emp.id}>
                  <td>
                    <div className="emp-info">
                      <img src={emp.avatar} alt={emp.name} className="emp-avatar-img" />
                      <div>
                        <div className="emp-name">{emp.name}</div>
                        <div className="emp-role">{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="emp-id">{emp.id}</span></td>
                  <td>
                    <span className={`status-badge ${getStatusClass(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td><span className="time-pill">{emp.checkIn}</span></td>
                  <td><span className="time-pill">{emp.checkOut}</span></td>
                  <td><strong>{emp.workingHrs}</strong></td>
                  <td>
                    <button className="btn-outline-small" onClick={() => navigate(`/employee/${emp.id}`)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination mt-4">
          <span className="text-secondary text-sm">Showing 1 to 6 of 24 entries</span>
          <div className="page-controls">
            <button className="page-btn" disabled>Prev</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-btn">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
