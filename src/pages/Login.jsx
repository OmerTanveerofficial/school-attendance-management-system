import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError('');

    if (!email.trim()) {
      setValidationError('Email is required');
      return;
    }
    if (!password.trim()) {
      setValidationError('Password is required');
      return;
    }

    try {
      await login(email, password);
    } catch {
      // error handled by context
    }
  };

  const displayError = validationError || error;

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
          </svg>
          <h1>AttendTrack</h1>
          <p>School Attendance Management System</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {displayError && (
            <div className="login-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              {displayError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-demo">
          <p>Demo Credentials:</p>
          <div className="demo-accounts">
            <button
              className="demo-btn"
              onClick={() => { setEmail('admin@school.edu'); setPassword('admin123'); }}
            >
              Admin
            </button>
            <button
              className="demo-btn"
              onClick={() => { setEmail('omer@school.edu'); setPassword('teacher123'); }}
            >
              Teacher 1
            </button>
            <button
              className="demo-btn"
              onClick={() => { setEmail('check@school.edu'); setPassword('teacher123'); }}
            >
              Teacher 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
