import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';
import Loader from '../components/Loader';
import { formatDate } from '../utils/helpers';

const statusConfig = {
  pending: { bg: 'rgba(217, 119, 6, 0.08)', text: '#92400e', border: 'rgba(217, 119, 6, 0.2)', dot: '#d97706' },
  approved: { bg: 'rgba(16, 185, 129, 0.08)', text: '#065f46', border: 'rgba(16, 185, 129, 0.2)', dot: '#10b981' },
  rejected: { bg: 'rgba(239, 68, 68, 0.08)', text: '#7f1d1d', border: 'rgba(239, 68, 68, 0.2)', dot: '#ef4444' },
};

const typeIcons = {
  medical: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  personal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  academic: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  ),
  emergency: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
};

const typeConfig = {
  medical: { bg: 'rgba(14, 165, 233, 0.08)', text: '#0369a1', label: 'Medical' },
  personal: { bg: 'rgba(139, 92, 246, 0.08)', text: '#5b21b6', label: 'Personal' },
  academic: { bg: 'rgba(16, 185, 129, 0.08)', text: '#047857', label: 'Academic' },
  emergency: { bg: 'rgba(239, 68, 68, 0.08)', text: '#991b1b', label: 'Emergency' },
};

export default function LeaveManagement() {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [processing, setProcessing] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

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

  if (loading) {
    return (
      <div className="leave-page">
        <div className="leave-skeleton">
          <div className="skeleton-header" />
          <div className="skeleton-metrics">
            <div className="skeleton-metric" />
            <div className="skeleton-metric" />
            <div className="skeleton-metric" />
            <div className="skeleton-metric" />
          </div>
          <div className="skeleton-card" />
          <div className="skeleton-card" />
          <div className="skeleton-card" />
        </div>
      </div>
    );
  }

  return (
    <div className="leave-page">
      <div className="leave-header">
        <div className="leave-header-text">
          <h1>Leave requests</h1>
          <p>Review and action student absence requests across your classes</p>
        </div>
        {counts.pending > 0 && (
          <div className="leave-pending-indicator">
            <span className="leave-pending-dot" />
            <span className="leave-pending-count">{counts.pending}</span>
            <span>awaiting review</span>
          </div>
        )}
      </div>

      <div className="leave-metrics">
        <button
          className={`leave-metric ${filter === 'all' ? 'leave-metric-active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <span className="leave-metric-value">{counts.total}</span>
          <span className="leave-metric-label">Total</span>
        </button>
        <button
          className={`leave-metric ${filter === 'pending' ? 'leave-metric-active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          <span className="leave-metric-dot" style={{ background: '#d97706' }} />
          <span className="leave-metric-value">{counts.pending}</span>
          <span className="leave-metric-label">Pending</span>
        </button>
        <button
          className={`leave-metric ${filter === 'approved' ? 'leave-metric-active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          <span className="leave-metric-dot" style={{ background: '#10b981' }} />
          <span className="leave-metric-value">{counts.approved}</span>
          <span className="leave-metric-label">Approved</span>
        </button>
        <button
          className={`leave-metric ${filter === 'rejected' ? 'leave-metric-active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          <span className="leave-metric-dot" style={{ background: '#ef4444' }} />
          <span className="leave-metric-value">{counts.rejected}</span>
          <span className="leave-metric-label">Rejected</span>
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="leave-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: 'var(--gray-300)' }}>
            <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" />
            <path d="M9 14l2 2 4-4" />
          </svg>
          <h3>No requests found</h3>
          <p>
            {filter === 'all'
              ? 'No leave requests have been submitted yet.'
              : `No ${filter} requests to show. Try a different filter.`}
          </p>
        </div>
      ) : (
        <div className="leave-timeline">
          {filtered.map((leave, idx) => {
            const sc = statusConfig[leave.status];
            const tc = typeConfig[leave.type] || typeConfig.personal;
            const days = getDayCount(leave.startDate, leave.endDate);
            const isExpanded = expandedId === leave.id;

            return (
              <div
                key={leave.id}
                className={`leave-item ${leave.status === 'pending' ? 'leave-item-pending' : ''}`}
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <div className="leave-item-timeline">
                  <div className="leave-timeline-dot" style={{ background: sc.dot }} />
                  {idx < filtered.length - 1 && <div className="leave-timeline-line" />}
                </div>

                <div className="leave-item-content">
                  <div
                    className="leave-item-header"
                    onClick={() => setExpandedId(isExpanded ? null : leave.id)}
                  >
                    <div className="leave-item-avatar">
                      {leave.student?.name?.charAt(0)}
                    </div>

                    <div className="leave-item-main">
                      <div className="leave-item-name-row">
                        <h3>{leave.student?.name}</h3>
                        <span className="leave-item-class">{leave.className}</span>
                      </div>
                      <div className="leave-item-summary">
                        <span className="leave-item-dates">
                          {formatDate(leave.startDate)}
                          {leave.startDate !== leave.endDate && ` - ${formatDate(leave.endDate)}`}
                        </span>
                        <span className="leave-item-duration">{days}d</span>
                      </div>
                    </div>

                    <div className="leave-item-right">
                      <div className="leave-item-type" style={{ background: tc.bg, color: tc.text }}>
                        {typeIcons[leave.type]}
                        <span>{tc.label}</span>
                      </div>
                      <div className="leave-item-status" style={{ background: sc.bg, color: sc.text }}>
                        <span className="leave-status-dot" style={{ background: sc.dot }} />
                        {leave.status}
                      </div>
                    </div>

                    <svg
                      className={`leave-item-chevron ${isExpanded ? 'rotated' : ''}`}
                      width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>

                  {isExpanded && (
                    <div className="leave-item-body">
                      <div className="leave-item-reason">
                        <span className="leave-detail-label">Reason</span>
                        <p>{leave.reason}</p>
                      </div>

                      <div className="leave-item-info-row">
                        <div className="leave-info-block">
                          <span className="leave-detail-label">From</span>
                          <span className="leave-detail-value">{formatDate(leave.startDate)}</span>
                        </div>
                        <div className="leave-info-block">
                          <span className="leave-detail-label">To</span>
                          <span className="leave-detail-value">{formatDate(leave.endDate)}</span>
                        </div>
                        <div className="leave-info-block">
                          <span className="leave-detail-label">Duration</span>
                          <span className="leave-detail-value leave-mono">{days} {days === 1 ? 'day' : 'days'}</span>
                        </div>
                        <div className="leave-info-block">
                          <span className="leave-detail-label">Applied</span>
                          <span className="leave-detail-value">{formatDate(leave.appliedOn)}</span>
                        </div>
                        {leave.reviewedOn && (
                          <div className="leave-info-block">
                            <span className="leave-detail-label">Reviewed</span>
                            <span className="leave-detail-value">{formatDate(leave.reviewedOn)}</span>
                          </div>
                        )}
                      </div>

                      {leave.status === 'pending' && (
                        <div className="leave-action-bar">
                          <button
                            className="leave-action-btn leave-action-approve"
                            onClick={(e) => { e.stopPropagation(); handleAction(leave.id, 'approved'); }}
                            disabled={processing === leave.id}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M5 12l5 5L20 7" />
                            </svg>
                            {processing === leave.id ? 'Processing...' : 'Approve'}
                          </button>
                          <button
                            className="leave-action-btn leave-action-reject"
                            onClick={(e) => { e.stopPropagation(); handleAction(leave.id, 'rejected'); }}
                            disabled={processing === leave.id}
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                            {processing === leave.id ? 'Processing...' : 'Reject'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
