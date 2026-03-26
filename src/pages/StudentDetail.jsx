import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../data/api';
import { useAttendance } from '../context/AttendanceContext';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { calculateAttendancePercentage, getAttendanceGrade, formatDate } from '../utils/helpers';

export default function StudentDetail() {
  const { studentId } = useParams();
  const { lateValue } = useAttendance();
  const [student, setStudent] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthFilter, setMonthFilter] = useState('all');

  const loadData = useCallback(async (id) => {
    setLoading(true);
    try {
      const [s, r] = await Promise.all([
        api.getStudent(id),
        api.getAttendance({ studentId: id }),
      ]);
      setStudent(s);
      setRecords(r.sort((a, b) => b.date.localeCompare(a.date)));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(studentId);
  }, [studentId, loadData]);

  const months = useMemo(() => {
    const set = new Set(records.map(r => r.date.substring(0, 7)));
    return Array.from(set).sort().reverse();
  }, [records]);

  const filtered = useMemo(() => {
    if (monthFilter === 'all') return records;
    return records.filter(r => r.date.startsWith(monthFilter));
  }, [records, monthFilter]);

  const stats = useMemo(() => {
    const pct = calculateAttendancePercentage(filtered, lateValue);
    const grade = getAttendanceGrade(pct);
    return {
      total: filtered.length,
      present: filtered.filter(r => r.status === 'present').length,
      absent: filtered.filter(r => r.status === 'absent').length,
      late: filtered.filter(r => r.status === 'late').length,
      percentage: pct,
      grade,
    };
  }, [filtered, lateValue]);

  if (loading) return <Loader text="Loading student details..." />;
  if (!student) return <div className="empty-state"><p>Student not found.</p></div>;

  return (
    <div className="student-detail">
      <div className="page-header">
        <div>
          <Link to="/classes" className="back-link">
            ← Back to Classes
          </Link>
          <h1>{student.name}</h1>
          <p>Roll No: {student.rollNo} | {student.email}</p>
        </div>
      </div>

      <div className="stats-grid stats-grid-4">
        <div className="mini-stat">
          <h4>Attendance</h4>
          <p className="mini-stat-value" style={{ color: stats.grade.color }}>
            {stats.percentage.toFixed(1)}%
          </p>
          <span style={{ color: stats.grade.color }}>{stats.grade.label}</span>
        </div>
        <div className="mini-stat present-bg">
          <h4>Present</h4>
          <p className="mini-stat-value">{stats.present}</p>
          <span>of {stats.total} sessions</span>
        </div>
        <div className="mini-stat absent-bg">
          <h4>Absent</h4>
          <p className="mini-stat-value">{stats.absent}</p>
          <span>of {stats.total} sessions</span>
        </div>
        <div className="mini-stat late-bg">
          <h4>Late</h4>
          <p className="mini-stat-value">{stats.late}</p>
          <span>counted as {lateValue}</span>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Attendance History</h2>
          <select
            className="month-select"
            value={monthFilter}
            onChange={e => setMonthFilter(e.target.value)}
          >
            <option value="all">All Months</option>
            {months.map(m => (
              <option key={m} value={m}>
                {new Date(m + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div className="card-body table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Day</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((record, idx) => (
                <tr key={record.id}>
                  <td>{idx + 1}</td>
                  <td>{formatDate(record.date)}</td>
                  <td>{new Date(record.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' })}</td>
                  <td><Badge status={record.status} /></td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="4" className="empty-cell">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Monthly Heatmap</h2>
        </div>
        <div className="card-body">
          <div className="heatmap">
            {filtered.slice(0, 60).map(r => (
              <div
                key={r.id}
                className={`heatmap-cell heatmap-${r.status}`}
                title={`${r.date}: ${r.status}`}
              >
                {new Date(r.date + 'T00:00:00').getDate()}
              </div>
            ))}
          </div>
          <div className="heatmap-legend">
            <span><span className="heatmap-dot present" /> Present</span>
            <span><span className="heatmap-dot absent" /> Absent</span>
            <span><span className="heatmap-dot late" /> Late</span>
          </div>
        </div>
      </div>
    </div>
  );
}
