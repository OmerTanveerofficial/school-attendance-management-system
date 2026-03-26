export default function StatsCard({ title, value, subtitle, icon, color = '#2563eb' }) {
  return (
    <div className="stats-card">
      <div className="stats-card-icon" style={{ backgroundColor: color + '15', color }}>
        {icon}
      </div>
      <div className="stats-card-content">
        <p className="stats-card-title">{title}</p>
        <h3 className="stats-card-value" style={{ color }}>{value}</h3>
        {subtitle && <p className="stats-card-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
