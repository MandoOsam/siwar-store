'use client';

export default function BangleIcon({ size = 280 }) {
  return (
    <svg className="spin" width={size} height={size} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="82" stroke="#3E7BFA" strokeWidth="2" strokeDasharray="6 10" opacity="0.55" />
      <circle cx="100" cy="100" r="66" stroke="#6FA0FF" strokeWidth="3" />
      <circle cx="100" cy="18" r="6" fill="#3E7BFA" />
      <circle cx="182" cy="100" r="4" fill="#2455C9" />
      <circle cx="100" cy="182" r="4" fill="#6FA0FF" />
      <circle cx="18" cy="100" r="6" fill="#3E7BFA" />
    </svg>
  );
}

export function PlaceholderImg() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="60%" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="34" fill="none" stroke="#3E7BFA" strokeWidth="3" strokeDasharray="4 7" opacity="0.7" />
      </svg>
    </div>
  );
}
