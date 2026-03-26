import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import { formatDate } from '../utils/helpers';

const priorityConfig = {
  high: { bg: '#fee2e2', text: '#dc2626', border: '#fca5a5', label: 'High' },
  medium: { bg: '#fef3c7', text: '#d97706', border: '#fcd34d', label: 'Medium' },
  low: { bg: '#d1fae5', text: '#059669', border: '#6ee7b7', label: 'Low' },
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
              + New Announcement
            </button>
          )}
        </div>
      </div>

      <div className="filter-buttons" style={{ marginBottom: 16 }}>
        {['all', 'high', 'medium', 'low'].map(f => (
          <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : priorityConfig[f].label + ' Priority'}
          </button>
        ))}
      </div>

      <div className="ann-list">
        {filtered.map(ann => {
          const pc = priorityConfig[ann.priority];
          return (
            <div key={ann.id} className={`card ann-card ${ann.pinned ? 'ann-pinned' : ''}`}>
              <div className="ann-card-content">
                <div className="ann-card-top">
                  <div className="ann-title-row">
                    {ann.pinned && <span className="ann-pin-icon" title="Pinned">&#128204;</span>}
                    <h3>{ann.title}</h3>
                  </div>
                  <span className="ann-priority-badge" style={{ background: pc.bg, color: pc.text, borderColor: pc.border }}>
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
                  {ann.targetClasses.length > 0 && (
                    <div className="ann-target-classes">
                      {ann.targetClasses.map(cid => (
                        <span key={cid} className="exam-class-chip">{cid}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="empty-state"><p>No announcements found.</p></div>
        )}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Announcement">
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
              {saving ? 'Posting...' : 'Post Announcement'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
