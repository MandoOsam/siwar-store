'use client';
import { useStore } from '@/lib/StoreContext';
import { useLanguage } from '@/lib/i18n';
import { useTheme } from '@/lib/ThemeContext';

export default function Nav({ searchQuery, onSearch, onCartClick }) {
  const { cart } = useStore();
  const { t, lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const count = cart.reduce((a, c) => a + c.qty, 0);

  return (
    <div className="nav">
      <div className="nav-inner">
        <a href="/" className="logo">
          SIWAR <span className="ar">{t('brand')}</span>
        </a>
        <div className="search-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#66738C" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="nav-actions">
          <button className="lang-toggle" onClick={toggleLang} aria-label="Toggle language">
            {lang === 'ar' ? 'EN' : 'AR'}
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button className="cart-btn" onClick={onCartClick}>
            🛍 {t('cart')} {count > 0 && <span className="badge">{count}</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
