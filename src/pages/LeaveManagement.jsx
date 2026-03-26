import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';
import Loader from '../components/Loader';
import { formatDate } from '../utils/helpers';

const statusConfig = {
  pending: { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' },
  approved: { bg: '#d1fae5', text: '#047857', border: '#6ee7b7' },
  rejected: { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' },
};

const typeConfig = {
  medical: { bg: '#e0f2fe', text: '#0369a1' },
  personal: { bg: '#ede9fe', text: '#5b21b6' },
  academic: { bg: '#d1fae5', text: '#047857' },
  emergency: { bg: '#fee2e2', text: '#991b1b' },
};

export default function LeaveManagement() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [processing, setProcessing] = useState(null);

  const loadLeaves = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getLeaveRequests(user?.id);
      setLeaves(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadLeaves();
  }, [loadLeaves]);

  const filtered = useMemo(() => {
    if (filter === 'all') return leaves;
    return leaves.filter(l => l.status === filter);
  }, [leaves, filter]);

  const counts = useMemo(() => ({
    total: leaves.length,
    pending: leaves.filter(l => l.status === 'pending').length,
    approved: leaves.filter(l => l.status === 'approved').length,
    rejected: leaves.filter(l => l.status === 'rejected').length,
  }), [leaves]);

  const handleAction = async (leaveId, status) => {
    setProcessing(leaveId);
    try {
      await api.updateLeaveStatus(leaveId, status, user?.id);
      loadLeaves();
    } finally {
      setProcessing(null);
    }
  };

  const getDayCount = (start, end) => {
    const s = new Date(start);
    const e = new Date(end);
    return Math.ceil((e - s) / (1000 * 60 * 60 * 24)) + 1;
  };

  if (loading) return <Loader text="Loading leave requests..." />;

  return (
    <div className="leave-page">
      <div className="page-header">
        <h1>Leave Management</h1>
        <p>Review and manage student leave requests</p>
      </div>

      <div className="stats-grid stats-grid-4">
        <div className="mini-stat">
          <h4>Total Requests</h4>
          <p className="mini-stat-value" style={{ color: '#0ea5e9' }}>{counts.total}</p>
        </div>
        <div className="mini-stat" style={{ borderLeft: '4px solid #d97706' }}>
          <h4>Pending</h4>
          <p className="mini-stat-value" style={{ color: '#d97706' }}>{counts.pending}</p>
        </div>
        <div className="mini-stat present-bg">
          <h4>Approved</h4>
          <p className="mini-stat-value" style={{ color: '#047857' }}>{counts.approved}</p>
        </div>
        <div className="mini-stat absent-bg">
          <h4>Rejected</h4>
          <p className="mini-stat-value" style={{ color: '#dc2626' }}>{counts.rejected}</p>
        </div>
      </div>

      <div className="filter-buttons" style={{ marginBottom: 16 }}>
        {[
          { label: `All (${counts.total})`, value: 'all' },
          { label: `Pending (${counts.pending})`, value: 'pending' },
          { label: `Approved (${counts.approved})`, value: 'approved' },
          { label: `Rejected (${counts.rejected})`, value: 'rejected' },
        ].map(f => (
          <button key={f.value} className={`filter-btn ${filter === f.value ? 'active' : ''}`} onClick={() => setFilter(f.value)}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="leave-list">
        {filtered.map(leave => {
          const sc = statusConfig[leave.status];
          const tc = typeConfig[leave.type] || typeConfig.personal;
          const days = getDayCount(leave.startDate, leave.endDate);

          return (
            <div key={leave.id} className={`card leave-card ${leave.status === 'pending' ? 'leave-pending' : ''}`}>
              <div className="leave-card-content">
                <div className="leave-card-top">
                  <div className="leave-student-info">
                    <div className="leave-avatar">{leave.student?.name?.charAt(0)}</div>
                    <div>
                      <h3>{leave.student?.name}</h3>
                      <p>Roll: {leave.student?.rollNo} | {leave.className}</p>
                    </div>
                  </div>
                  <div className="leave-badges">
                    <span className="leave-type-badge" style={{ background: tc.bg, color: tc.text }}>
                      {leave.type}
                    </span>
                    <span className="leave-status-badge" style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}>
                      {leave.status}
                    </span>
                  </div>
                </div>

                <div className="leave-details">
                  <div className="leave-dates">
                    <div className="leave-date-item">
                      <span className="leave-date-label">From</span>
                      <span className="leave-date-value">{formatDate(leave.startDate)}</span>
                    </div>
                    <div className="leave-date-arrow">→</div>
                    <div className="leave-date-item">
                      <span className="leave-date-label">To</span>
                      <span className="leave-date-value">{formatDate(leave.endDate)}</span>
                    </div>
                    <div className="leave-day-count">{days} {days === 1 ? 'day' : 'days'}</div>
                  </div>

                  <div className="leave-reason">
                    <span className="leave-reason-label">Reason:</span>
                    <p>{leave.reason}</p>
                  </div>

                  <div className="leave-meta">
                    <span>Applied: {formatDate(leave.appliedOn)}</span>
                    {leave.reviewedOn && <span>Reviewed: {formatDate(leave.reviewedOn)}</span>}
                  </div>
                </div>

                {leave.status === 'pending' && (
                  <div className="leave-actions">
                    <button
                      className="btn btn-sm btn-present"
                      onClick={() => handleAction(leave.id, 'approved')}
                      disabled={processing === leave.id}
                    >
                      {processing === leave.id ? '...' : 'Approve'}
                    </button>
                    <button
                      className="btn btn-sm btn-absent"
                      onClick={() => handleAction(leave.id, 'rejected')}
                      disabled={processing === leave.id}
                    >
                      {processing === leave.id ? '...' : 'Reject'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="empty-state"><p>No leave requests found.</p></div>
        )}
      </div>
    </div>
  );
}
