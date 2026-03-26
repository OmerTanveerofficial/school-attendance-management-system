import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAttendance } from '../context/AttendanceContext';
import { api } from '../data/api';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import SearchFilter from '../components/SearchFilter';
import { calculateAttendancePercentage, getAttendanceGrade } from '../utils/helpers';

function SortIndicator({ field, sortField, sortDir }) {
  return (
    <span className="sort-icon">
      {sortField === field ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
    </span>
  );
}

export default function ClassView() {
  const { classId } = useParams();
  const { user } = useAuth();
  const { lateValue } = useAttendance();
  const [classes, setClasses] = useState([]);
  const [activeClass, setActiveClass] = useState(classId || '');
  const [summary, setSummary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');

  useEffect(() => {
    api.getClasses(user?.id).then(list => {
      setClasses(list);
      if (!activeClass && list.length > 0) setActiveClass(list[0].id);
    });
  }, [user, activeClass]);

  const currentClass = classId || activeClass;

  const loadSummary = useCallback(async (cls) => {
    if (!cls) return;
    setLoading(true);
    try {
      const data = await api.getAttendanceSummary(cls);
      setSummary(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSummary(currentClass);
  }, [currentClass, loadSummary]);

  useEffect(() => {
    if (classId && classId !== activeClass) {
      setActiveClass(classId);
    }
  }, [classId, activeClass]);

  const processed = useMemo(() => {
    let data = summary.map(s => {
      const records = [];
      for (let i = 0; i < s.present; i++) records.push({ status: 'present' });
      for (let i = 0; i < s.absent; i++) records.push({ status: 'absent' });
      for (let i = 0; i < s.late; i++) records.push({ status: 'late' });
      const pct = calculateAttendancePercentage(records, lateValue);
      const grade = getAttendanceGrade(pct);
      return { ...s, percentage: pct, grade };
    });

    if (search) {
      const q = search.toLowerCase();
      data = data.filter(s =>
        s.name.toLowerCase().includes(q) || s.rollNo.includes(q)
      );
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'excellent') data = data.filter(s => s.percentage >= 90);
      else if (statusFilter === 'good') data = data.filter(s => s.percentage >= 75 && s.percentage < 90);
      else if (statusFilter === 'average') data = data.filter(s => s.percentage >= 60 && s.percentage < 75);
      else if (statusFilter === 'poor') data = data.filter(s => s.percentage < 60);
    }

    data.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortField === 'rollNo') cmp = a.rollNo.localeCompare(b.rollNo);
      else if (sortField === 'percentage') cmp = a.percentage - b.percentage;
      else if (sortField === 'present') cmp = a.present - b.present;
      else if (sortField === 'absent') cmp = a.absent - b.absent;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return data;
  }, [summary, search, statusFilter, sortField, sortDir, lateValue]);

  const handleSort = (field) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const filters = [
    { label: 'All', value: 'all', active: statusFilter === 'all' },
    { label: 'Excellent', value: 'excellent', active: statusFilter === 'excellent' },
    { label: 'Good', value: 'good', active: statusFilter === 'good' },
    { label: 'Average', value: 'average', active: statusFilter === 'average' },
    { label: 'Poor', value: 'poor', active: statusFilter === 'poor' },
  ];

  return (
    <div className="class-view">
      <div className="page-header">
        <h1>Class Attendance</h1>
        <p>View student-wise attendance summary</p>
      </div>

      <div className="class-tabs">
        {classes.map(c => (
          <button
            key={c.id}
            className={`class-tab ${activeClass === c.id ? 'active' : ''}`}
            onClick={() => setActiveClass(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <SearchFilter
        onSearch={setSearch}
        placeholder="Search by name or roll number..."
        filters={filters}
        onFilter={setStatusFilter}
      />

      {loading ? (
        <Loader text="Loading class data..." />
      ) : (
        <div className="card">
          <div className="card-header">
            <h2>{classes.find(c => c.id === activeClass)?.name} — {processed.length} Students</h2>
          </div>
          <div className="card-body table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th className="sortable" onClick={() => handleSort('rollNo')}>
                    Roll No <SortIndicator field="rollNo" sortField={sortField} sortDir={sortDir} />
                  </th>
                  <th className="sortable" onClick={() => handleSort('name')}>
                    Name <SortIndicator field="name" sortField={sortField} sortDir={sortDir} />
                  </th>
                  <th className="sortable" onClick={() => handleSort('present')}>
                    Present <SortIndicator field="present" sortField={sortField} sortDir={sortDir} />
                  </th>
                  <th className="sortable" onClick={() => handleSort('absent')}>
                    Absent <SortIndicator field="absent" sortField={sortField} sortDir={sortDir} />
                  </th>
                  <th>Late</th>
                  <th className="sortable" onClick={() => handleSort('percentage')}>
                    Attendance % <SortIndicator field="percentage" sortField={sortField} sortDir={sortDir} />
                  </th>
                  <th>Grade</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {processed.map((student, idx) => (
                  <tr key={student.id}>
                    <td>{idx + 1}</td>
                    <td>{student.rollNo}</td>
                    <td><strong>{student.name}</strong></td>
                    <td><Badge status="present" size="sm" /> {student.present}</td>
                    <td><Badge status="absent" size="sm" /> {student.absent}</td>
                    <td><Badge status="late" size="sm" /> {student.late}</td>
                    <td>
                      <div className="progress-cell">
                        <div className="progress-bar">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${student.percentage}%`,
                              backgroundColor: student.grade.color,
                            }}
                          />
                        </div>
                        <span style={{ color: student.grade.color, fontWeight: 600 }}>
                          {student.percentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td>
                      <span style={{ color: student.grade.color, fontWeight: 600 }}>
                        {student.grade.label}
                      </span>
                    </td>
                    <td>
                      <Link to={`/student/${student.id}`} className="btn btn-sm btn-outline">
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
                {processed.length === 0 && (
                  <tr>
                    <td colSpan="9" className="empty-cell">No students match your criteria.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
