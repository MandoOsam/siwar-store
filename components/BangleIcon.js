'use client';

export default function BangleIcon({ size = 280 }) {
  return (
    <svg className="spin" width={size} height={size} viewBox="0 0 200 200" fill="none">
      <circle cx="100" cy="100" r="82" stroke="#A0A0A0" strokeWidth="2" strokeDasharray="6 10" opacity="0.45" />
      <circle cx="100" cy="100" r="66" stroke="#C0C0C0" strokeWidth="3" />
      <circle cx="100" cy="18" r="6" fill="#C0C0C0" />
      <circle cx="182" cy="100" r="4" fill="#888888" />
      <circle cx="100" cy="182" r="4" fill="#A0A0A0" />
      <circle cx="18" cy="100" r="6" fill="#C0C0C0" />
    </svg>
  );
}

export function PlaceholderImg() {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="60%" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="34" fill="none" stroke="#A0A0A0" strokeWidth="3" strokeDasharray="4 7" opacity="0.5" />
      </svg>
    </div>
  );
}
