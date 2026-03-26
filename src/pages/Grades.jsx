import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';
import Loader from '../components/Loader';

const gradeColors = {
  'A+': '#047857', 'A': '#059669', 'B': '#0369a1', 'C': '#d97706', 'D': '#ea580c', 'F': '#dc2626',
};

export default function Grades() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [activeClass, setActiveClass] = useState('');
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState('all');

  useEffect(() => {
    api.getClasses(user?.id).then(list => {
      setClasses(list);
      if (list.length > 0) setActiveClass(list[0].id);
    });
  }, [user]);

  const loadGrades = useCallback(async (classId) => {
    if (!classId) return;
    setLoading(true);
    try {
      const data = await api.getGrades(classId);
      setGrades(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGrades(activeClass);
  }, [activeClass, loadGrades]);

  const examOptions = useMemo(() => {
    const map = new Map();
    grades.forEach(g => {
      if (g.exam && !map.has(g.examId)) {
        map.set(g.examId, `${g.exam.title} - ${g.subject?.name}`);
      }
    });
    return Array.from(map.entries());
  }, [grades]);

  const filtered = useMemo(() => {
    let data = grades;
    if (examFilter !== 'all') data = data.filter(g => g.examId === examFilter);
    if (search) {
      const q = search.toLowerCase();
      data = data.filter(g => g.student?.name.toLowerCase().includes(q) || g.student?.rollNo.includes(q));
    }
    return data;
  }, [grades, examFilter, search]);

  const stats = useMemo(() => {
    if (filtered.length === 0) return null;
    const avg = filtered.reduce((sum, g) => sum + parseFloat(g.percentage), 0) / filtered.length;
    const highest = Math.max(...filtered.map(g => parseFloat(g.percentage)));
    const lowest = Math.min(...filtered.map(g => parseFloat(g.percentage)));
    const passing = filtered.filter(g => parseFloat(g.percentage) >= 50).length;
    return { avg: avg.toFixed(1), highest: highest.toFixed(1), lowest: lowest.toFixed(1), passing, total: filtered.length };
  }, [filtered]);

  return (
    <div className="grades-page">
      <div className="page-header">
        <h1>Student Grades</h1>
        <p>View and analyze student performance across exams</p>
      </div>

      <div className="class-tabs">
        {classes.map(c => (
          <button key={c.id} className={`class-tab ${activeClass === c.id ? 'active' : ''}`} onClick={() => setActiveClass(c.id)}>
            {c.name}
          </button>
        ))}
      </div>

      {loading ? <Loader text="Loading grades..." /> : (
        <>
          {stats && (
            <div className="stats-grid stats-grid-4">
              <div className="mini-stat">
                <h4>Class Average</h4>
                <p className="mini-stat-value" style={{ color: '#0ea5e9' }}>{stats.avg}%</p>
                <span>{stats.total} results</span>
              </div>
              <div className="mini-stat present-bg">
                <h4>Highest</h4>
                <p className="mini-stat-value" style={{ color: '#047857' }}>{stats.highest}%</p>
              </div>
              <div className="mini-stat absent-bg">
                <h4>Lowest</h4>
                <p className="mini-stat-value" style={{ color: '#dc2626' }}>{stats.lowest}%</p>
              </div>
              <div className="mini-stat late-bg">
                <h4>Pass Rate</h4>
                <p className="mini-stat-value" style={{ color: '#d97706' }}>{((stats.passing / stats.total) * 100).toFixed(0)}%</p>
                <span>{stats.passing}/{stats.total} passed</span>
              </div>
            </div>
          )}

          <div className="grades-controls">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input type="text" className="search-input" placeholder="Search student..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <select className="month-select" value={examFilter} onChange={e => setExamFilter(e.target.value)}>
              <option value="all">All Exams</option>
              {examOptions.map(([id, label]) => (
                <option key={id} value={id}>{label}</option>
              ))}
            </select>
          </div>

          <div className="card">
            <div className="card-body table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student</th>
                    <th>Roll No</th>
                    <th>Exam</th>
                    <th>Subject</th>
                    <th>Obtained</th>
                    <th>Total</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((g, idx) => (
                    <tr key={g.id}>
                      <td>{idx + 1}</td>
                      <td><strong>{g.student?.name}</strong></td>
                      <td>{g.student?.rollNo}</td>
                      <td><span className="grade-exam-label">{g.exam?.title}</span></td>
                      <td>{g.subject?.name}</td>
                      <td><strong>{g.obtainedMarks}</strong></td>
                      <td>{g.totalMarks}</td>
                      <td>
                        <div className="progress-cell">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${g.percentage}%`, backgroundColor: gradeColors[g.grade] || '#6b7280' }} />
                          </div>
                          <span style={{ color: gradeColors[g.grade], fontWeight: 600 }}>{g.percentage}%</span>
                        </div>
                      </td>
                      <td>
                        <span className="grade-badge" style={{ color: gradeColors[g.grade], background: gradeColors[g.grade] + '15', borderColor: gradeColors[g.grade] + '40' }}>
                          {g.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan="9" className="empty-cell">No grades found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
