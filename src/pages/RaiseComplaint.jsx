import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './RaiseComplaint.css';

const RaiseComplaint = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('');
  const [description, setDescription] = useState('');

  const priorities = [
    { label: 'Low', color: '#4CAA17' },
    { label: 'Medium', color: '#FACC15' },
    { label: 'High', color: '#F97316' },
    { label: 'Critical', color: '#EF4444' },
  ];

  return (
    <div className="complaint-page">
      <div className="complaint-header-mobile">
        <button className="icon-btn-minimal" onClick={() => navigate(-1)}>
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="complaint-content">
        <h1 className="complaint-title">We're listening.</h1>
        <p className="complaint-desc">
          Your feedback helps us create a better workplace for everyone. Please provide the details below.
        </p>

        <form className="complaint-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Subject</label>
            <input 
              type="text" 
              placeholder="e.g. Broken AC in Floor 3"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Priority Level</label>
            <div className="priority-options">
              {priorities.map(p => (
                <button
                  key={p.label}
                  type="button"
                  className={`priority-pill ${priority === p.label ? 'active' : ''}`}
                  onClick={() => setPriority(p.label)}
                  style={{ '--p-color': p.color }}
                >
                  <span className="priority-dot" style={{ backgroundColor: p.color }}></span>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <div className="label-row">
              <label>Detailed Description</label>
              <span className="char-count">{description.length} / 500</span>
            </div>
            <textarea 
              placeholder="Describe the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value.slice(0, 500))}
              rows={8}
              required
            />
          </div>

          <div className="complaint-actions">
            <button type="submit" className="btn-submit-complaint">
              Submit Complaint <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseComplaint;
