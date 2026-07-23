'use client';
import { dbReady } from '@/lib/supabaseClient';
import { useLanguage } from '@/lib/i18n';

export default function SetupBanner() {
  const { t } = useLanguage();
  if (dbReady) return null;
  return <div className="setup-banner">{t('setupBanner')}</div>;
}
