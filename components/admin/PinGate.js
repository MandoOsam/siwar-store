'use client';
import { useState } from 'react';
import BangleIcon from '@/components/BangleIcon';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/StoreContext';
import { useToast } from '@/lib/ToastContext';

export default function PinGate({ onSuccess }) {
  const { t } = useLanguage();
  const { pin } = useStore();
  const { showToast } = useToast();
  const [value, setValue] = useState('');

  const check = () => {
    if (value === pin) onSuccess();
    else showToast(t('wrongPin'));
  };

  return (
    <div className="pin-gate">
      <BangleIcon size={120} />
      <h2>{t('dashboardTitle')}</h2>
      <input
        type="password"
        inputMode="numeric"
        maxLength={6}
        placeholder={t('pinPlaceholder')}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') check(); }}
      />
      <div>
        <button className="btn-primary" onClick={check}>{t('login')}</button>
        <a href="/" style={{ display: 'block', marginTop: 14, color: 'var(--muted)', fontSize: 13, textAlign: 'center' }}>
          {t('backToStore')}
        </a>
      </div>
    </div>
  );
}
