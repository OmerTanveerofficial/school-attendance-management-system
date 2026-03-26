import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAttendance } from '../context/AttendanceContext';
import StatsCard from '../components/StatsCard';
import Loader from '../components/Loader';

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
        <StatsCard
          title="Total Students"
          value={data.totalStudents}
          icon="👥"
          color="#2563eb"
          subtitle={`Across ${data.totalClasses} classes`}
        />
        <StatsCard
          title="Overall Attendance"
          value={`${data.overallRate}%`}
          icon="📊"
          color="#16a34a"
          subtitle="With late = 0.5 weight"
        />
        <StatsCard
          title="Today Present"
          value={data.todayPresent}
          icon="✅"
          color="#16a34a"
          subtitle={`${data.todayMarked} total marked`}
        />
        <StatsCard
          title="Today Absent"
          value={data.todayAbsent}
          icon="❌"
          color="#dc2626"
          subtitle={`${data.todayLate} late arrivals`}
        />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2>Class Overview</h2>
            <Link to="/classes" className="card-link">View All</Link>
          </div>
          <div className="card-body">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Class</th>
                  <th>Students</th>
                  <th>Attendance Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.classSummaries.map(cls => {
                  const rate = parseFloat(cls.attendanceRate);
                  const rateColor = rate >= 90 ? '#16a34a' : rate >= 75 ? '#2563eb' : rate >= 60 ? '#d97706' : '#dc2626';
                  return (
                    <tr key={cls.id}>
                      <td><strong>{cls.name}</strong></td>
                      <td>{cls.studentCount}</td>
                      <td>
                        <div className="progress-cell">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${rate}%`, backgroundColor: rateColor }}
                            />
                          </div>
                          <span style={{ color: rateColor, fontWeight: 600 }}>{rate}%</span>
                        </div>
                      </td>
                      <td>
                        <Link to={`/classes/${cls.id}`} className="btn btn-sm btn-outline">
                          View
                        </Link>
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
            <h2>Quick Actions</h2>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <Link to="/attendance" className="quick-action-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                <span>Mark Attendance</span>
              </Link>
              <Link to="/classes" className="quick-action-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4-4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                <span>View Classes</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Attendance Distribution</h2>
          </div>
          <div className="card-body">
            <div className="distribution">
              <div className="distribution-item">
                <div className="distribution-bar-wrapper">
                  <div className="distribution-label">Present</div>
                  <div className="distribution-bar">
                    <div
                      className="distribution-fill present"
                      style={{ width: `${(data.totalPresent / (data.totalPresent + data.totalAbsent + data.totalLate)) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="distribution-value">{data.totalPresent}</span>
              </div>
              <div className="distribution-item">
                <div className="distribution-bar-wrapper">
                  <div className="distribution-label">Absent</div>
                  <div className="distribution-bar">
                    <div
                      className="distribution-fill absent"
                      style={{ width: `${(data.totalAbsent / (data.totalPresent + data.totalAbsent + data.totalLate)) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="distribution-value">{data.totalAbsent}</span>
              </div>
              <div className="distribution-item">
                <div className="distribution-bar-wrapper">
                  <div className="distribution-label">Late</div>
                  <div className="distribution-bar">
                    <div
                      className="distribution-fill late"
                      style={{ width: `${(data.totalLate / (data.totalPresent + data.totalAbsent + data.totalLate)) * 100}%` }}
                    />
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
