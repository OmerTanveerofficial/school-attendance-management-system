import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AttendanceProvider } from './context/AttendanceContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MarkAttendance from './pages/MarkAttendance';
import ClassView from './pages/ClassView';
import StudentDetail from './pages/StudentDetail';
import Settings from './pages/Settings';
import Timetable from './pages/Timetable';
import CLOsPLOs from './pages/CLOsPLOs';
import ExamSchedule from './pages/ExamSchedule';
import Grades from './pages/Grades';
import Announcements from './pages/Announcements';
import LeaveManagement from './pages/LeaveManagement';
import './App.css';

function ProtectedRoute({ children, roles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/attendance" element={
          <ProtectedRoute roles={['teacher', 'admin']}>
            <MarkAttendance />
          </ProtectedRoute>
        } />
        <Route path="/classes" element={<ClassView />} />
        <Route path="/classes/:classId" element={<ClassView />} />
        <Route path="/student/:studentId" element={<StudentDetail />} />
        <Route path="/exams" element={
          <ProtectedRoute roles={['teacher', 'admin']}>
            <ExamSchedule />
          </ProtectedRoute>
        } />
        <Route path="/grades" element={
          <ProtectedRoute roles={['teacher', 'admin']}>
            <Grades />
          </ProtectedRoute>
        } />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/leaves" element={
          <ProtectedRoute roles={['teacher', 'admin']}>
            <LeaveManagement />
          </ProtectedRoute>
        } />
        <Route path="/timetable" element={
          <ProtectedRoute roles={['teacher', 'admin']}>
            <Timetable />
          </ProtectedRoute>
        } />
        <Route path="/clo-plo" element={
          <ProtectedRoute roles={['teacher', 'admin']}>
            <CLOsPLOs />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute roles={['admin']}>
            <Settings />
          </ProtectedRoute>
        } />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AttendanceProvider>
          <AppRoutes />
        </AttendanceProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
