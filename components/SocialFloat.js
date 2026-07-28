'use client';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const socials = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/SIWARaccessories',
    bg: '#1877F2',
    shadow: 'rgba(24,119,242,.4)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/siwar_accessories00',
    bg: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    shadow: 'rgba(220,39,67,.4)',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@siwar.accessories0',
    bg: '#010101',
    shadow: 'rgba(0,0,0,.4)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9a6.27 6.27 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.41a8.16 8.16 0 0 0 3.76.92V6.69z" />
      </svg>
    ),
  },
];

export default function SocialFloat() {
  return (
    <div className="social-float-col">
      {socials.map((s) => (
        <a
          key={s.label}
          className="social-float-btn"
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          style={{ background: s.bg, boxShadow: `0 10px 24px ${s.shadow}` }}
        >
          {s.icon}
        </a>
      ))}
      <a
        className="social-float-btn wa-float"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff">
          <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h.01A7.94 7.94 0 0 0 20 12.05a7.9 7.9 0 0 0-2.4-5.73Zm-5.55 12.2h-.01a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 1 1 12.24-3.5 6.6 6.6 0 0 1-6.64 6.6Zm3.62-4.94c-.2-.1-1.17-.58-1.35-.64-.18-.07-.31-.1-.44.1-.13.2-.51.64-.62.77-.11.13-.23.14-.43.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.3.09-.4.1-.1.2-.24.3-.36.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.36-.05-.1-.44-1.06-.6-1.45-.16-.38-.32-.33-.44-.34h-.38c-.13 0-.34.05-.52.24-.18.2-.68.66-.68 1.6s.7 1.87.79 2c.1.13 1.37 2.1 3.33 2.94.47.2.83.32 1.11.42.47.15.9.13 1.24.08.38-.06 1.17-.48 1.34-.94.16-.46.16-.85.12-.94-.05-.09-.18-.14-.38-.24Z" />
        </svg>
      </a>
    </div>
  );
}
