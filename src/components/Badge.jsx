import { getStatusColor } from '../utils/helpers';

export default function Badge({ status, size = 'md' }) {
  const colors = getStatusColor(status);
  const sizes = {
    sm: { padding: '2px 8px', fontSize: '11px' },
    md: { padding: '4px 12px', fontSize: '12px' },
    lg: { padding: '6px 16px', fontSize: '14px' },
  };

  return (
    <span
      style={{
        display: 'inline-block',
        ...sizes[size],
        borderRadius: '9999px',
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        fontWeight: 600,
        textTransform: 'capitalize',
        letterSpacing: '0.025em',
      }}
    >
      {status}
    </span>
  );
}
