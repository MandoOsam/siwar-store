'use client';
import BangleIcon from './BangleIcon';
import { useLanguage } from '@/lib/i18n';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <div className="hero-bg">
        <svg className="hero-art" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C0C0C0" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#E8E8E8" stopOpacity="0.18" />
            </linearGradient>
            <radialGradient id="glow" cx="65%" cy="45%" r="35%">
              <stop offset="0%" stopColor="rgba(192,192,192,0.1)" />
              <stop offset="100%" stopColor="rgba(192,192,192,0)" />
            </radialGradient>
          </defs>
          <rect width="1200" height="800" fill="url(#glow)" />
          <circle className="hero-ring" cx="820" cy="400" r="240" stroke="url(#sg)" strokeWidth="1.5" fill="none" />
          <circle className="hero-ring-dashed" cx="820" cy="400" r="195" stroke="rgba(192,192,192,0.12)" strokeWidth="0.8" strokeDasharray="10 14" fill="none" />
          <circle cx="820" cy="400" r="155" stroke="rgba(192,192,192,0.06)" strokeWidth="0.5" fill="none" />
          <circle className="hero-ring" cx="640" cy="250" r="105" stroke="rgba(232,232,232,0.18)" strokeWidth="1.2" fill="none" />
          <circle cx="640" cy="250" r="70" stroke="rgba(192,192,192,0.09)" strokeWidth="0.6" strokeDasharray="5 9" fill="none" />
          <circle cx="990" cy="270" r="38" stroke="rgba(192,192,192,0.11)" strokeWidth="0.8" fill="none" />
          <circle className="hero-dot" cx="820" cy="160" r="3.5" fill="rgba(192,192,192,0.35)" />
          <circle className="hero-dot" cx="1020" cy="420" r="2.5" fill="rgba(232,232,232,0.25)" />
          <circle className="hero-dot" cx="700" cy="610" r="4" fill="rgba(192,192,192,0.2)" />
          <circle className="hero-dot" cx="560" cy="360" r="2.5" fill="rgba(192,192,192,0.22)" />
          <circle className="hero-dot" cx="950" cy="580" r="2" fill="rgba(232,232,232,0.16)" />
          <circle className="hero-dot" cx="480" cy="180" r="1.8" fill="rgba(192,192,192,0.14)" />
          <path d="M 600 340 Q 720 295 830 340" stroke="rgba(192,192,192,0.07)" strokeWidth="0.7" fill="none" />
          <path d="M 715 155 Q 810 190 860 270" stroke="rgba(192,192,192,0.05)" strokeWidth="0.5" fill="none" />
          <path d="M 900 530 Q 960 480 1000 380" stroke="rgba(192,192,192,0.04)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div>
          <div className="eyebrow">{t('heroEyebrow')}</div>
          <h1>
            {t('heroTitle1')}
            <br />
            {t('heroTitle2')} <span>{t('heroTitleHighlight')}</span>
          </h1>
          <p>{t('heroSubtitle')}</p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={scrollToProducts}>
              {t('shopNow')}
            </button>
          </div>
        </div>
        <div className="bangle-wrap">
          <BangleIcon size={300} />
        </div>
      </div>
    </section>
  );
}
