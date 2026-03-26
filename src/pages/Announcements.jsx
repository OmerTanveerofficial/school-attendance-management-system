import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { formatDate } from '../utils/helpers';

const priorityConfig = {
  high: { bg: 'rgba(239, 68, 68, 0.06)', text: '#b91c1c', border: 'rgba(239, 68, 68, 0.15)', label: 'High', dot: '#ef4444' },
  medium: { bg: 'rgba(217, 119, 6, 0.06)', text: '#92400e', border: 'rgba(217, 119, 6, 0.15)', label: 'Medium', dot: '#d97706' },
  low: { bg: 'rgba(16, 185, 129, 0.06)', text: '#065f46', border: 'rgba(16, 185, 129, 0.15)', label: 'Low', dot: '#10b981' },
};

export default function Announcements() {
  const { user, isAdmin, isTeacher } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({ title: '', body: '', priority: 'low' });
  const [saving, setSaving] = useState(false);

  const loadAnnouncements = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAnnouncements();
      setAnnouncements(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnnouncements();
  }, [loadAnnouncements]);

  const filtered = filter === 'all'
    ? announcements
    : announcements.filter(a => a.priority === filter);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.body.trim()) return;
    setSaving(true);
    try {
      await api.createAnnouncement({
        ...formData,
        author: user?.name,
        authorRole: user?.role,
        targetClasses: [],
      });
      setShowCreate(false);
      setFormData({ title: '', body: '', priority: 'low' });
      loadAnnouncements();
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading announcements..." />;

  return (
    <div className="announcements-page">
      <div className="page-header">
        <div className="page-header-row">
          <div>
            <h1>Announcements</h1>
            <p>School notices and important updates</p>
          </div>
          {(isAdmin || isTeacher) && (
            <button className="btn btn-primary" onClick={() => setShowCreate(true)}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
              New announcement
            </button>
          )}
        </div>
      </div>

      <div className="filter-buttons" style={{ marginBottom: 16 }}>
        {['all', 'high', 'medium', 'low'].map(f => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : priorityConfig[f].label + ' priority'}
          </button>
        ))}
      </div>

      <div className="ann-list">
        {filtered.map((ann, idx) => {
          const pc = priorityConfig[ann.priority];
          return (
            <div key={ann.id} className={`ann-item ${ann.pinned ? 'ann-pinned' : ''}`} style={{ animationDelay: `${idx * 50}ms` }}>
              {ann.pinned && (
                <div className="ann-pin-indicator">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <path d="M16 2v5.586l1.707 1.707A1 1 0 0118 10v2a1 1 0 01-1 1h-4v7a1 1 0 01-2 0v-7H7a1 1 0 01-1-1v-2a1 1 0 01.293-.707L8 8.586V2a1 1 0 011-1h6a1 1 0 011 1z"/>
                  </svg>
                  <span>Pinned</span>
                </div>
              )}
              <div className="ann-item-header">
                <h3>{ann.title}</h3>
                <span className="ann-priority" style={{ background: pc.bg, color: pc.text }}>
                  <span className="ann-priority-dot" style={{ background: pc.dot }} />
                  {pc.label}
                </span>
              </div>
              <p className="ann-body">{ann.body}</p>
              <div className="ann-footer">
                <div className="ann-author">
                  <span className="ann-author-avatar">{ann.author?.charAt(0)}</span>
                  <div>
                    <span className="ann-author-name">{ann.author}</span>
                    <span className="ann-author-role">{ann.authorRole}</span>
                  </div>
                </div>
                <span className="ann-date">{formatDate(ann.date)}</span>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="leave-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--gray-300)' }}>
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/>
            </svg>
            <h3>No announcements</h3>
            <p>No announcements match the current filter.</p>
          </div>
        )}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create announcement">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label htmlFor="ann-title">Title</label>
            <input id="ann-title" type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Announcement title" required />
          </div>
          <div className="form-group">
            <label htmlFor="ann-body">Message</label>
            <textarea id="ann-body" rows="5" className="form-textarea" value={formData.body} onChange={e => setFormData({ ...formData, body: e.target.value })} placeholder="Write your announcement..." required />
          </div>
          <div className="form-group">
            <label htmlFor="ann-priority">Priority</label>
            <select id="ann-priority" value={formData.priority} onChange={e => setFormData({ ...formData, priority: e.target.value })}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={() => setShowCreate(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Posting...' : 'Post announcement'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
