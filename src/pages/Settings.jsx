import { useState } from 'react';
import { useAttendance } from '../context/AttendanceContext';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { lateValue, updateLateValue } = useAttendance();
  const { isAdmin } = useAuth();
  const [tempLate, setTempLate] = useState(lateValue.toString());
  const [saved, setSaved] = useState(false);

  if (!isAdmin) {
    return (
      <div className="settings">
        <div className="page-header">
          <h1>Settings</h1>
        </div>
        <div className="empty-state">
          <p>You don't have permission to access settings.</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    const val = parseFloat(tempLate);
    if (isNaN(val) || val < 0 || val > 1) return;
    updateLateValue(val);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="settings">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure attendance system parameters</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>Attendance Configuration</h2>
        </div>
        <div className="card-body">
          <div className="settings-group">
            <div className="setting-item">
              <div className="setting-info">
                <h3>Late Attendance Value</h3>
                <p>
                  Configure how "Late" status contributes to attendance percentage.
                  A value of 0.5 means late counts as half-present. Set to 1 to count
                  late as fully present, or 0 to count as absent.
                </p>
              </div>
              <div className="setting-control">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={tempLate}
                  onChange={e => setTempLate(e.target.value)}
                  className="range-input"
                />
                <div className="range-labels">
                  <span>0 (Absent)</span>
                  <span className="range-value">{tempLate}</span>
                  <span>1 (Present)</span>
                </div>
              </div>
            </div>

            <div className="setting-item">
              <div className="setting-info">
                <h3>Current Formula</h3>
                <p className="formula">
                  Attendance % = (Present + Late × {tempLate}) / Total Sessions × 100
                </p>
              </div>
            </div>
          </div>

          {saved && <div className="alert alert-success">Settings saved successfully!</div>}

          <div className="settings-actions">
            <button className="btn btn-primary" onClick={handleSave}>
              Save Settings
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2>System Information</h2>
        </div>
        <div className="card-body">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Version</span>
              <span className="info-value">1.0.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Data Source</span>
              <span className="info-value">Mock API</span>
            </div>
            <div className="info-item">
              <span className="info-label">Late Value</span>
              <span className="info-value">{lateValue}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
