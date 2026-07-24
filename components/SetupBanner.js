'use client';
import { useLanguage } from '@/lib/i18n';

export default function SetupBanner() {
  const { t } = useLanguage();
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  return <div className="setup-banner">{t('setupBanner')}</div>;
}
