import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { getTodayString } from '../utils/helpers';

export default function MarkAttendance() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.getClasses(user?.id).then(setClasses);
  }, [user]);

  const loadStudents = useCallback(async () => {
    if (!selectedClass) return;
    setLoading(true);
    setError('');
    try {
      const [studentList, existingRecords] = await Promise.all([
        api.getStudentsByClass(selectedClass),
        api.getAttendance({ classId: selectedClass, date: selectedDate }),
      ]);
      setStudents(studentList);

      const existing = {};
      existingRecords.forEach(r => { existing[r.studentId] = r.status; });

      const initial = {};
      studentList.forEach(s => { initial[s.id] = existing[s.id] || 'present'; });
      setAttendance(initial);
    } catch {
      setError('Failed to load students');
    } finally {
      setLoading(false);
    }
  }, [selectedClass, selectedDate]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const setStatus = (studentId, status) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };

  const markAll = (status) => {
    const updated = {};
    students.forEach(s => { updated[s.id] = status; });
    setAttendance(updated);
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedDate) {
      setError('Please select a class and date');
      return;
    }
    if (students.length === 0) {
      setError('No students to mark');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const attendanceList = Object.entries(attendance).map(([studentId, status]) => ({
        studentId,
        status,
      }));
      await api.markAttendance(selectedClass, selectedDate, attendanceList, user?.id);
      setSuccess(`Attendance saved for ${attendanceList.length} students!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch {
      setError('Failed to save attendance');
    } finally {
      setSaving(false);
    }
  };

  const counts = {
    present: Object.values(attendance).filter(s => s === 'present').length,
    absent: Object.values(attendance).filter(s => s === 'absent').length,
    late: Object.values(attendance).filter(s => s === 'late').length,
  };

  return (
    <div className="mark-attendance">
      <div className="page-header">
        <h1>Mark Attendance</h1>
        <p>Select a class and date to mark attendance</p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="attendance-controls">
            <div className="form-group">
              <label htmlFor="class-select">Class</label>
              <select
                id="class-select"
                value={selectedClass}
                onChange={e => setSelectedClass(e.target.value)}
              >
                <option value="">Select a class</option>
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date-select">Date</label>
              <input
                id="date-select"
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                max={getTodayString()}
              />
            </div>
          </div>
        </div>
      </div>

      {loading && <Loader text="Loading students..." />}

      {!loading && selectedClass && students.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2>
              Students ({students.length})
            </h2>
            <div className="attendance-summary-badges">
              <Badge status="present" size="sm" /> <span>{counts.present}</span>
              <Badge status="absent" size="sm" /> <span>{counts.absent}</span>
              <Badge status="late" size="sm" /> <span>{counts.late}</span>
            </div>
          </div>
          <div className="card-body">
            <div className="mark-all-controls">
              <span>Mark All:</span>
              <button className="btn btn-sm btn-present" onClick={() => markAll('present')}>Present</button>
              <button className="btn btn-sm btn-absent" onClick={() => markAll('absent')}>Absent</button>
              <button className="btn btn-sm btn-late" onClick={() => markAll('late')}>Late</button>
            </div>

            <div className="attendance-list">
              {students.map((student, idx) => (
                <div key={student.id} className="attendance-row">
                  <div className="attendance-student">
                    <span className="attendance-index">{idx + 1}</span>
                    <div>
                      <p className="attendance-name">{student.name}</p>
                      <p className="attendance-roll">Roll: {student.rollNo}</p>
                    </div>
                  </div>
                  <div className="attendance-actions">
                    {['present', 'absent', 'late'].map(status => (
                      <button
                        key={status}
                        className={`status-btn status-${status} ${attendance[student.id] === status ? 'active' : ''}`}
                        onClick={() => setStatus(student.id, status)}
                      >
                        {status === 'present' ? '✓' : status === 'absent' ? '✗' : '◷'}
                        <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <div className="attendance-submit">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleSubmit}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Attendance'}
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && selectedClass && students.length === 0 && (
        <div className="empty-state">
          <p>No students found in this class.</p>
        </div>
      )}
    </div>
  );
}
