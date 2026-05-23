import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Tag, User, Calendar, Plus, X, Send } from 'lucide-react';
import './Announcements.css';

const initialAnnouncements = [
  {
    id: 1,
    category: 'EVENT',
    isNew: true,
    title: 'Company Picnic 2024!',
    content: 'We are excited to announce our annual company picnic will be held at Central Park on June 15th. Family and friends are welcome!',
    author: 'HR Department',
    date: 'May 02, 2024',
    priority: 'Low',
    color: '#4CAA17' // green
  },
  {
    id: 2,
    category: 'BENEFITS',
    isNew: false,
    title: 'New Health Insurance Policy',
    content: 'Please review the updated health insurance benefits for the upcoming fiscal year. Documentation is available in the portal.',
    author: 'Finance Team',
    date: 'May 01, 2024',
    priority: 'High',
    color: '#EF4444' // red
  },
  {
    id: 3,
    category: 'OFFICE',
    isNew: false,
    title: 'Office Upgrade: New Coffee Machines',
    content: 'By popular demand, we have installed high-end espresso machines in every pantry. Enjoy!',
    author: 'Facility Management',
    date: 'Apr 28, 2024',
    priority: 'Medium',
    color: '#EAB308' // yellow
  }
];

const Announcements = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newPriority, setNewPriority] = useState('Low');
  const [newContent, setNewContent] = useState('');

  const handlePost = () => {
    const newAnn = {
      id: Date.now(),
      category: newCategory.toUpperCase(),
      isNew: true,
      title: newTitle,
      content: newContent,
      author: 'HR Manager',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      priority: newPriority,
      color: newPriority === 'High' ? '#EF4444' : newPriority === 'Medium' ? '#EAB308' : '#4CAA17'
    };
    setAnnouncements([newAnn, ...announcements]);
    setModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="mgr-announcements-page page-enter">
      <div className="ann-header">
        <div>
          <h1 className="ann-title">Company Announcements</h1>
          <p className="ann-subtitle">Stay updated with the latest news and updates across the organization.</p>
        </div>
        <button className="btn-post-ann" onClick={() => setModalOpen(true)}>
          <Plus size={16} /> Post Announcement
        </button>
      </div>

      <div className="ann-controls">
        <div className="search-bar-ann">
          <Search size={16} className="text-secondary" />
          <input type="text" placeholder="Search announcements..." />
        </div>
        <button className="btn-filter">
          <Filter size={16} /> Filter
        </button>
      </div>

      <div className="ann-grid">
        {announcements.map(ann => (
          <div className="ann-card" key={ann.id} style={{ borderLeftColor: ann.color }}>
            <div className="ann-card-top">
              <div className="ann-tags">
                <span className="ann-tag" style={{ color: ann.color, backgroundColor: `${ann.color}15` }}>
                  <Tag size={12} /> {ann.category}
                </span>
                {ann.isNew && <span className="ann-new-badge">New</span>}
              </div>
              <button className="btn-icon-more">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <h3 className="ann-card-title">{ann.title}</h3>
            <p className="ann-card-content">{ann.content}</p>

            <div className="ann-card-footer">
              <div className="ann-footer-left">
                <span className="ann-author"><User size={12} /> {ann.author}</span>
                <span className="ann-date"><Calendar size={12} /> {ann.date}</span>
              </div>
              <span className={`ann-priority badge-${ann.priority.toLowerCase()}`}>
                <span className="p-dot">!</span> {ann.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="ann-modal-content">
            <div className="ann-modal-header">
              <h2>New Announcement</h2>
              <button className="btn-close" onClick={() => setModalOpen(false)}><X size={20} /></button>
            </div>
            
            <div className="ann-form">
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" 
                  placeholder="e.g., Upcoming Holiday Schedule" 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
                  <option>General</option>
                  <option>Event</option>
                  <option>Benefits</option>
                  <option>Office</option>
                </select>
              </div>

              <div className="form-group">
                <label>Priority</label>
                <div className="priority-toggles">
                  <button 
                    className={`priority-btn ${newPriority === 'Low' ? 'active-low' : ''}`}
                    onClick={() => setNewPriority('Low')}
                  >Low</button>
                  <button 
                    className={`priority-btn ${newPriority === 'Medium' ? 'active-med' : ''}`}
                    onClick={() => setNewPriority('Medium')}
                  >Medium</button>
                  <button 
                    className={`priority-btn ${newPriority === 'High' ? 'active-high' : ''}`}
                    onClick={() => setNewPriority('High')}
                  >High</button>
                </div>
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea 
                  placeholder="Share details about the announcement..." 
                  rows={4}
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                />
              </div>
            </div>

            <div className="ann-modal-footer">
              <button className="btn-cancel" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn-post-now" onClick={handlePost}><Send size={14} /> Post Now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
