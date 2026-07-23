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
