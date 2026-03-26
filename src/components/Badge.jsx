import { getStatusColor } from '../utils/helpers';

export default function Badge({ status, size = 'md' }) {
  const colors = getStatusColor(status);
  const sizes = {
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '3px 10px', fontSize: '12px' },
    lg: { padding: '5px 14px', fontSize: '13px' },
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        ...sizes[size],
        borderRadius: '6px',
        backgroundColor: colors.bg,
        color: colors.text,
        fontWeight: 600,
        textTransform: 'capitalize',
        letterSpacing: '0.01em',
      }}
    >
      <span style={{
        width: '5px',
        height: '5px',
        borderRadius: '50%',
        background: colors.text,
        opacity: 0.6,
      }} />
      {status}
    </span>
  );
}
