export function calculateAttendancePercentage(records, lateValue = 0.5) {
  if (!records || records.length === 0) return 0;
  const present = records.filter(r => r.status === 'present').length;
  const late = records.filter(r => r.status === 'late').length;
  const total = records.length;
  return ((present + late * lateValue) / total) * 100;
}

export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getTodayString() {
  return new Date().toISOString().split('T')[0];
}

export function getStatusColor(status) {
  switch (status) {
    case 'present': return { bg: '#dcfce7', text: '#166534', border: '#86efac' };
    case 'absent': return { bg: '#fee2e2', text: '#991b1b', border: '#fca5a5' };
    case 'late': return { bg: '#fef3c7', text: '#92400e', border: '#fcd34d' };
    default: return { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' };
  }
}

export function getAttendanceGrade(percentage) {
  if (percentage >= 90) return { label: 'Excellent', color: '#16a34a' };
  if (percentage >= 75) return { label: 'Good', color: '#2563eb' };
  if (percentage >= 60) return { label: 'Average', color: '#d97706' };
  return { label: 'Poor', color: '#dc2626' };
}

export function debounce(fn, ms = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}
