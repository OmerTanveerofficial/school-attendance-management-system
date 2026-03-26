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
    if (!email.trim()) { setValidationError('Email is required'); return; }
    if (!password.trim()) { setValidationError('Password is required'); return; }
    try { await login(email, password); } catch { /* handled by context */ }
  };

  const displayError = validationError || error;

  return (
    <div className="login-page">
      <div className="login-brand">
        <div className="sidebar-logo-mark" style={{ marginBottom: 24 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
          </svg>
        </div>
        <h1>School attendance,<br />simplified.</h1>
        <p>Track attendance, manage exams, view grades, and handle leave requests — all from one dashboard built for educators.</p>
      </div>

      <div className="login-form-side">
        <div className="login-card">
          <div className="login-header">
            <h2>Sign in</h2>
            <p>Enter your credentials to continue</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {displayError && (
              <div className="login-error">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
                {displayError}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@school.edu" autoComplete="email" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" autoComplete="current-password" />
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="login-demo">
            <p>Demo accounts</p>
            <div className="demo-accounts">
              <button className="demo-btn" onClick={() => { setEmail('admin@school.edu'); setPassword('admin123'); }}>Admin</button>
              <button className="demo-btn" onClick={() => { setEmail('omer@school.edu'); setPassword('teacher123'); }}>Teacher 1</button>
              <button className="demo-btn" onClick={() => { setEmail('check@school.edu'); setPassword('teacher123'); }}>Teacher 2</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
