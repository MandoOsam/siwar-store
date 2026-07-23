'use client';
import { useLanguage } from '@/lib/i18n';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer>
      {t('footerText')}
    </footer>
  );
}
