'use client';
import { useLanguage } from '@/lib/i18n';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <video className="hero-video-bg" poster="/images/hero-poster.jpg" autoPlay muted loop playsInline>
        <source src="/videos/hero-bg.webm" type="video/webm" />
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />
      <div className="hero-inner">
        <div className="eyebrow">{t('heroEyebrow')}</div>
        <h1>
          <span>{t('heroTitleHighlight')}</span>{' '}{t('heroTitle')}
        </h1>
        <p>{t('heroSubtitle')}</p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={scrollToProducts}>
            {t('shopNow')}
          </button>
        </div>
      </div>
    </section>
  );
}
