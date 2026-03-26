export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="skeleton-container">
      <div className="skeleton-bar skeleton-w-40" />
      <div className="skeleton-bar skeleton-w-60" />
      <div className="skeleton-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton-block" style={{ animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="skeleton-row" style={{ animationDelay: `${i * 120}ms` }}>
          <div className="skeleton-avatar" />
          <div className="skeleton-lines">
            <div className="skeleton-bar skeleton-w-70" />
            <div className="skeleton-bar skeleton-w-40" />
          </div>
        </div>
      ))}
      <p className="skeleton-label">{text}</p>
    </div>
  );
}
