import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';
import Loader from '../components/Loader';
import { formatDate } from '../utils/helpers';

const typeColors = {
  midterm: { bg: '#e0f2fe', text: '#0369a1', label: 'Mid-Term' },
  final: { bg: '#fce7f3', text: '#9d174d', label: 'Final' },
  quiz: { bg: '#d1fae5', text: '#047857', label: 'Quiz' },
  assignment: { bg: '#fef3c7', text: '#92400e', label: 'Assignment' },
  practical: { bg: '#ede9fe', text: '#5b21b6', label: 'Practical' },
};

export default function ExamSchedule() {
  const { user } = useAuth();
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const loadExams = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getExams(user?.id);
      setExams(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadExams();
  }, [loadExams]);

  const filtered = useMemo(() => {
    let data = exams;
    if (filter === 'upcoming') data = data.filter(e => e.status === 'upcoming');
    else if (filter === 'completed') data = data.filter(e => e.status === 'completed');
    if (typeFilter !== 'all') data = data.filter(e => e.type === typeFilter);
    return data.sort((a, b) => a.date.localeCompare(b.date));
  }, [exams, filter, typeFilter]);

  const upcoming = exams.filter(e => e.status === 'upcoming');
  const completed = exams.filter(e => e.status === 'completed');

  if (loading) return <Loader text="Loading exam schedule..." />;

  return (
    <div className="exam-page">
      <div className="page-header">
        <h1>Exam Schedule</h1>
        <p>View upcoming and past examinations</p>
      </div>

      <div className="stats-grid">
        <div className="exam-stat-card">
          <div className="exam-stat-num">{exams.length}</div>
          <div className="exam-stat-label">Total Exams</div>
        </div>
        <div className="exam-stat-card upcoming-stat">
          <div className="exam-stat-num">{upcoming.length}</div>
          <div className="exam-stat-label">Upcoming</div>
        </div>
        <div className="exam-stat-card completed-stat">
          <div className="exam-stat-num">{completed.length}</div>
          <div className="exam-stat-label">Completed</div>
        </div>
      </div>

      <div className="exam-filters">
        <div className="filter-buttons">
          {[
            { label: 'All', value: 'all' },
            { label: 'Upcoming', value: 'upcoming' },
            { label: 'Completed', value: 'completed' },
          ].map(f => (
            <button key={f.value} className={`filter-btn ${filter === f.value ? 'active' : ''}`} onClick={() => setFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
        <div className="filter-buttons">
          {[
            { label: 'All Types', value: 'all' },
            { label: 'Mid-Term', value: 'midterm' },
            { label: 'Final', value: 'final' },
            { label: 'Quiz', value: 'quiz' },
            { label: 'Assignment', value: 'assignment' },
            { label: 'Practical', value: 'practical' },
          ].map(f => (
            <button key={f.value} className={`filter-btn ${typeFilter === f.value ? 'active' : ''}`} onClick={() => setTypeFilter(f.value)}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="exam-list">
        {filtered.map(exam => {
          const tc = typeColors[exam.type] || typeColors.quiz;
          return (
            <div key={exam.id} className={`card exam-card ${exam.status === 'upcoming' ? 'exam-upcoming' : ''}`}>
              <div className="exam-card-left">
                <div className="exam-date-block">
                  <span className="exam-date-day">{new Date(exam.date + 'T00:00:00').getDate()}</span>
                  <span className="exam-date-month">{new Date(exam.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short' })}</span>
                </div>
              </div>
              <div className="exam-card-body">
                <div className="exam-card-top-row">
                  <h3>{exam.title}</h3>
                  <div className="exam-badges">
                    <span className="exam-type-badge" style={{ background: tc.bg, color: tc.text }}>{tc.label}</span>
                    <span className={`exam-status-badge ${exam.status}`}>{exam.status}</span>
                  </div>
                </div>
                <p className="exam-subject">{exam.subject?.name} ({exam.subject?.code})</p>
                <div className="exam-meta-row">
                  <span className="exam-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                    {exam.startTime} - {exam.endTime}
                  </span>
                  <span className="exam-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {exam.room}
                  </span>
                  <span className="exam-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>
                    {exam.totalMarks} marks
                  </span>
                  <span className="exam-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                    {formatDate(exam.date)}
                  </span>
                </div>
                <div className="exam-classes">
                  {exam.classNames.map((cn, i) => (
                    <span key={i} className="exam-class-chip">{cn}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="empty-state"><p>No exams match your filter criteria.</p></div>
        )}
      </div>
    </div>
  );
}
