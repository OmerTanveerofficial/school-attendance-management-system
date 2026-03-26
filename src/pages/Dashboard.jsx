import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAttendance } from '../context/AttendanceContext';
import StatsCard from '../components/StatsCard';
import Loader from '../components/Loader';

const icons = {
  students: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  chart: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>,
  check: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>,
  x: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>,
};

export default function Dashboard() {
  const { user } = useAuth();
  const { dashboardData, dashboardLoading, fetchDashboard } = useAttendance();

  useEffect(() => {
    if (user) fetchDashboard(user.id);
  }, [user, fetchDashboard]);

  if (dashboardLoading || !dashboardData) return <Loader text="Loading dashboard..." />;

  const data = dashboardData;

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {user?.name}</p>
      </div>

      <div className="stats-grid">
        <StatsCard title="Total Students" value={data.totalStudents} icon={icons.students} color="#0ea5e9" subtitle={`Across ${data.totalClasses} classes`} />
        <StatsCard title="Overall Attendance" value={`${data.overallRate}%`} icon={icons.chart} color="#10b981" subtitle="With late = 0.5 weight" />
        <StatsCard title="Today Present" value={data.todayPresent} icon={icons.check} color="#10b981" subtitle={`${data.todayMarked} total marked`} />
        <StatsCard title="Today Absent" value={data.todayAbsent} icon={icons.x} color="#ef4444" subtitle={`${data.todayLate} late arrivals`} />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2>Class overview</h2>
            <Link to="/classes" className="card-link">View all</Link>
          </div>
          <div className="card-body">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Students</th>
                  <th>Attendance rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.classSummaries.map(cls => {
                  const rate = parseFloat(cls.attendanceRate);
                  const rateColor = rate >= 90 ? '#10b981' : rate >= 75 ? '#0ea5e9' : rate >= 60 ? '#d97706' : '#ef4444';
                  return (
                    <tr key={cls.id}>
                      <td><strong>{cls.name}</strong></td>
                      <td>{cls.studentCount}</td>
                      <td>
                        <div className="progress-cell">
                          <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${rate}%`, backgroundColor: rateColor }} />
                          </div>
                          <span style={{ color: rateColor, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{rate}%</span>
                        </div>
                      </td>
                      <td>
                        <Link to={`/classes/${cls.id}`} className="btn btn-sm btn-outline">View</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Quick actions</h2>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <Link to="/attendance" className="quick-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                <span>Mark attendance</span>
              </Link>
              <Link to="/classes" className="quick-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2"/><circle cx="9" cy="7" r="4"/></svg>
                <span>View classes</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Attendance distribution</h2>
          </div>
          <div className="card-body">
            <div className="distribution">
              <div className="distribution-item">
                <div className="distribution-bar-wrapper">
                  <div className="distribution-label">Present</div>
                  <div className="distribution-bar">
                    <div className="distribution-fill present" style={{ width: `${(data.totalPresent / (data.totalPresent + data.totalAbsent + data.totalLate)) * 100}%` }} />
                  </div>
                </div>
                <span className="distribution-value">{data.totalPresent}</span>
              </div>
              <div className="distribution-item">
                <div className="distribution-bar-wrapper">
                  <div className="distribution-label">Absent</div>
                  <div className="distribution-bar">
                    <div className="distribution-fill absent" style={{ width: `${(data.totalAbsent / (data.totalPresent + data.totalAbsent + data.totalLate)) * 100}%` }} />
                  </div>
                </div>
                <span className="distribution-value">{data.totalAbsent}</span>
              </div>
              <div className="distribution-item">
                <div className="distribution-bar-wrapper">
                  <div className="distribution-label">Late</div>
                  <div className="distribution-bar">
                    <div className="distribution-fill late" style={{ width: `${(data.totalLate / (data.totalPresent + data.totalAbsent + data.totalLate)) * 100}%` }} />
                  </div>
                </div>
                <span className="distribution-value">{data.totalLate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
