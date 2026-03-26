import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../data/api';
import Loader from '../components/Loader';

const dayColors = {
  Monday: '#0ea5e9',
  Tuesday: '#10b981',
  Wednesday: '#f59e0b',
  Thursday: '#8b5cf6',
  Friday: '#ef4444',
};

export default function Timetable() {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [activeClass, setActiveClass] = useState('');
  const [timetable, setTimetable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    api.getClasses(user?.id).then(list => {
      setClasses(list);
      if (list.length > 0) setActiveClass(list[0].id);
    });
  }, [user]);

  const loadTimetable = useCallback(async (classId) => {
    if (!classId) return;
    setLoading(true);
    try {
      const data = await api.getTimetable(classId);
      setTimetable(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTimetable(activeClass);
  }, [activeClass, loadTimetable]);

  const currentDay = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySchedule = timetable.find(d => d.day === currentDay);

  const allPeriods = timetable.length > 0 ? timetable[0].periods.map(p => p.period) : [];

  return (
    <div className="timetable-page">
      <div className="page-header">
        <h1>Class Timetable</h1>
        <p>View weekly schedule for your assigned classes</p>
      </div>

      <div className="timetable-top-bar">
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
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            Grid
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
            List
          </button>
        </div>
      </div>

      {loading && <Loader text="Loading timetable..." />}

      {!loading && todaySchedule && (
        <div className="card today-highlight">
          <div className="card-header">
            <h2>Today — {currentDay}</h2>
            <span className="today-badge">Current Schedule</span>
          </div>
          <div className="card-body">
            <div className="today-periods">
              {todaySchedule.periods.map(p => (
                <div key={p.period} className="today-period-card">
                  <div className="today-period-num">P{p.period}</div>
                  <div className="today-period-info">
                    <h4>{p.subject?.name}</h4>
                    <p>{p.subject?.code}</p>
                  </div>
                  <div className="today-period-meta">
                    <span className="today-time">{p.time}</span>
                    <span className="today-room">{p.room}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!loading && timetable.length > 0 && viewMode === 'grid' && (
        <div className="card">
          <div className="card-header">
            <h2>Weekly Schedule — {classes.find(c => c.id === activeClass)?.name}</h2>
          </div>
          <div className="card-body table-responsive">
            <table className="timetable-grid">
              <thead>
                <tr>
                  <th className="tt-day-header">Day</th>
                  {allPeriods.map(p => (
                    <th key={p} className="tt-period-header">Period {p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetable.map(day => (
                  <tr key={day.day} className={day.day === currentDay ? 'tt-today-row' : ''}>
                    <td className="tt-day-cell">
                      <span className="tt-day-dot" style={{ background: dayColors[day.day] }} />
                      {day.day}
                    </td>
                    {day.periods.map(p => (
                      <td key={p.period} className="tt-cell">
                        <div className="tt-subject">{p.subject?.name}</div>
                        <div className="tt-code">{p.subject?.code}</div>
                        <div className="tt-meta">
                          <span>{p.time.split(' - ')[0]}</span>
                          <span>{p.room}</span>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {!loading && timetable.length > 0 && viewMode === 'list' && (
        <div className="tt-list-view">
          {timetable.map(day => (
            <div key={day.day} className={`card ${day.day === currentDay ? 'today-highlight' : ''}`}>
              <div className="card-header">
                <h2>
                  <span className="tt-day-dot" style={{ background: dayColors[day.day] }} />
                  {day.day}
                </h2>
                {day.day === currentDay && <span className="today-badge">Today</span>}
              </div>
              <div className="card-body">
                <div className="tt-list-periods">
                  {day.periods.map(p => (
                    <div key={p.period} className="tt-list-item">
                      <div className="tt-list-period">P{p.period}</div>
                      <div className="tt-list-time">{p.time}</div>
                      <div className="tt-list-subject">
                        <strong>{p.subject?.name}</strong>
                        <span>{p.subject?.code}</span>
                      </div>
                      <div className="tt-list-room">{p.room}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && timetable.length === 0 && activeClass && (
        <div className="empty-state">
          <p>No timetable available for this class.</p>
        </div>
      )}
    </div>
  );
}
