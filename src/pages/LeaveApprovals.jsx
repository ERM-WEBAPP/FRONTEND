import React, { useState } from 'react';
import { Search, Check, X } from 'lucide-react';
import './LeaveApprovals.css';

// Mock data
const initialRequests = [
  {
    id: 1,
    empInitials: 'LF',
    empName: 'Liam Foster',
    empRole: 'Frontend Developer • Engineering',
    type: 'Sick Leave',
    duration: '2 Days',
    dateRange: 'May 25 - May 26, 2024',
    requestedAt: 'Requested: May 19, 2024 at 2:00 PM',
    reason: 'Medical appointment and recovery.',
    status: 'Pending',
    reqType: 'Leave'
  },
  {
    id: 2,
    empInitials: 'RP',
    empName: 'Ryan Patel',
    empRole: 'Product Manager • Sales',
    type: 'Casual Leave',
    duration: '1 Day',
    dateRange: 'May 22, 2024',
    requestedAt: 'Requested: May 19, 2024 at 9:30 AM',
    reason: 'Personal family matters.',
    status: 'Approved',
    reqType: 'Leave'
  },
  {
    id: 3,
    empInitials: 'ED',
    empName: 'Emma Davis',
    empRole: 'QA Engineer • Engineering',
    type: 'Permission (2h)',
    duration: '2 Hours (10:00 AM)',
    dateRange: 'May 21, 2024',
    requestedAt: 'Requested: May 19, 2024 at 11:15 AM',
    reason: 'Dentist consultation.',
    status: 'Pending',
    reqType: 'Permission'
  }
];

const LeaveApprovals = () => {
  const [filter, setFilter] = useState('All'); // 'All', 'Permission', 'Leave'
  const [search, setSearch] = useState('');
  const [requests, setRequests] = useState(initialRequests);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectId, setRejectId] = useState(null);
  const [rejectReasonText, setRejectReasonText] = useState('');

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [approveId, setApproveId] = useState(null);
  const [approveReasonText, setApproveReasonText] = useState('');

  const handleApproveClick = (id) => {
    setApproveId(id);
    setApproveReasonText('');
    setApproveModalOpen(true);
  };

  const confirmApprove = () => {
    setRequests(requests.map(r => r.id === approveId ? { ...r, status: 'Approved', approveReason: approveReasonText } : r));
    setApproveModalOpen(false);
    setApproveId(null);
  };

  const cancelApprove = () => {
    setApproveModalOpen(false);
    setApproveId(null);
  };

  const handleRejectClick = (id) => {
    setRejectId(id);
    setRejectReasonText('');
    setRejectModalOpen(true);
  };

  const confirmReject = () => {
    setRequests(requests.map(r => r.id === rejectId ? { ...r, status: 'Rejected', rejectReason: rejectReasonText } : r));
    setRejectModalOpen(false);
    setRejectId(null);
  };

  const cancelReject = () => {
    setRejectModalOpen(false);
    setRejectId(null);
  };

  const filtered = requests.filter(r => {
    if (filter !== 'All' && r.reqType !== filter) return false;
    if (search && !r.empName.toLowerCase().includes(search.toLowerCase()) && !r.reason.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="approvals-page page-enter">
      <div className="approvals-header">
        <div>
          <h1 className="approvals-title">
            {filter === 'Permission' ? 'Pending Permission Requests' : 'Pending Leave Requests'}
          </h1>
          <p className="approvals-subtitle">Action pending items to approve or reject requests.</p>
        </div>
        <div className="approvals-stats">
          <div className="stat-pill stat-red">On Leave: 0</div>
          <div className="stat-pill stat-purple">Permission: 0</div>
        </div>
      </div>

      <div className="approvals-controls">
        <div className="search-bar-approvals">
          <Search size={18} className="text-secondary" />
          <input 
            type="text" 
            placeholder="Search name, role or reason..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-pills">
          <button className={`filter-pill ${filter === 'Permission' ? 'active' : ''}`} onClick={() => setFilter('Permission')}>Permission</button>
          <button className={`filter-pill ${filter === 'Leave' ? 'active' : ''}`} onClick={() => setFilter('Leave')}>Leave</button>
          {filter !== 'All' && <button className="filter-pill clear-pill" onClick={() => setFilter('All')}>Clear</button>}
        </div>
      </div>

      <div className="approvals-table-wrapper">
        <table className="approvals-table">
          <thead>
            <tr>
              <th>EMPLOYEE</th>
              <th>TYPE</th>
              <th>DURATION</th>
              <th>DATE RANGE</th>
              <th>REASON</th>
              <th>MANAGER STATUS</th>
              <th className="text-right">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(req => (
              <tr key={req.id}>
                <td>
                  <div className="emp-cell">
                    <div className="emp-avatar-circle">{req.empInitials}</div>
                    <div>
                      <div className="emp-name-bold">{req.empName}</div>
                      <div className="emp-role-small">{req.empRole}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="type-text">{req.type}</div>
                </td>
                <td>
                  <div className="duration-text">{req.duration}</div>
                </td>
                <td>
                  <div className="date-main">{req.dateRange}</div>
                  <div className="date-sub">
                    <span className="req-icon">📥</span> {req.requestedAt}
                  </div>
                </td>
                <td>
                  <div className="reason-text">{req.reason}</div>
                </td>
                <td>
                  {req.status === 'Pending' && (
                    <div className="status-box pending-box" onClick={() => handleApprove(req.id)}>Pending (Click to Approve)</div>
                  )}
                  {req.status === 'Approved' && (
                    <div className="status-container">
                      <div className="status-box approved-box">Approved</div>
                      {req.approveReason && <div className="approve-reason-meta">Message: {req.approveReason}</div>}
                    </div>
                  )}
                  {req.status === 'Rejected' && (
                    <div className="status-container">
                      <div className="status-box rejected-box">Rejected</div>
                      {req.rejectReason && <div className="reject-reason-meta">Reason: {req.rejectReason}</div>}
                    </div>
                  )}
                </td>
                <td>
                  <div className="actions-cell">
                    <button 
                      className={`action-btn-text btn-reject ${req.status === 'Rejected' ? 'active-rej' : ''}`}
                      onClick={() => handleRejectClick(req.id)}
                    >
                      <X size={14} /> Reject
                    </button>
                    <button 
                      className={`action-btn-text btn-approve ${req.status === 'Approved' ? 'active-app' : ''}`}
                      onClick={() => handleApproveClick(req.id)}
                    >
                      <Check size={14} /> Approve
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="no-data">No requests found.</div>
        )}
      </div>

      {rejectModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Reject Request</h3>
            <p className="modal-desc">Please provide a reason for rejecting this request.</p>
            <textarea
              className="reject-textarea"
              placeholder="E.g., Team capacity is low this week..."
              value={rejectReasonText}
              onChange={(e) => setRejectReasonText(e.target.value)}
              rows={4}
            />
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelReject}>Cancel</button>
              <button className="btn-confirm-reject" onClick={confirmReject}>Confirm Reject</button>
            </div>
          </div>
        </div>
      )}

      {approveModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Approve Request</h3>
            <p className="modal-desc">Add an optional message for the employee.</p>
            <textarea
              className="approve-textarea"
              placeholder="E.g., Approved, have a safe trip!"
              value={approveReasonText}
              onChange={(e) => setApproveReasonText(e.target.value)}
              rows={4}
            />
            <div className="modal-actions">
              <button className="btn-cancel" onClick={cancelApprove}>Cancel</button>
              <button className="btn-confirm-approve" onClick={confirmApprove}>Confirm Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApprovals;
