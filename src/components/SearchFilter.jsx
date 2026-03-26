import { useState } from 'react';

export default function SearchFilter({ onSearch, placeholder = 'Search...', filters = [], onFilter }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch?.(val);
  };

  return (
    <div className="search-filter">
      <div className="search-input-wrapper">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={handleSearch}
        />
      </div>
      {filters.length > 0 && (
        <div className="filter-buttons">
          {filters.map(f => (
            <button
              key={f.value}
              className={`filter-btn ${f.active ? 'active' : ''}`}
              onClick={() => onFilter?.(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
