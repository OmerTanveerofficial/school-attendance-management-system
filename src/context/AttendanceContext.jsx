import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '../data/api';

const AttendanceContext = createContext(null);

export function AttendanceProvider({ children }) {
  const [lateValue, setLateValue] = useState(() => {
    const saved = localStorage.getItem('late_value');
    return saved ? parseFloat(saved) : 0.5;
  });

  const updateLateValue = useCallback((val) => {
    const num = parseFloat(val);
    if (num >= 0 && num <= 1) {
      setLateValue(num);
      localStorage.setItem('late_value', num.toString());
    }
  }, []);

  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);

  const fetchDashboard = useCallback(async (userId) => {
    setDashboardLoading(true);
    try {
      const data = await api.getDashboardStats(userId);
      setDashboardData(data);
    } finally {
      setDashboardLoading(false);
    }
  }, []);

  return (
    <AttendanceContext.Provider value={{
      lateValue,
      updateLateValue,
      dashboardData,
      dashboardLoading,
      fetchDashboard,
    }}>
      {children}
    </AttendanceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAttendance() {
  const ctx = useContext(AttendanceContext);
  if (!ctx) throw new Error('useAttendance must be used within AttendanceProvider');
  return ctx;
}
