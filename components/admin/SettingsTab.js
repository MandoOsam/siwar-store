'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/StoreContext';
import { useToast } from '@/lib/ToastContext';

export default function SettingsTab() {
  const { t } = useLanguage();
  const { setPin } = useStore();
  const { showToast } = useToast();
  const [value, setValue] = useState('');

  const save = async () => {
    if (value.trim().length < 4) {
      showToast(t('pinTooShort'));
      return;
    }
    await setPin(value.trim());
    setValue('');
    showToast(t('pinChanged'));
  };

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>{t('settings')}</h2>
      <div className="field" style={{ maxWidth: 280 }}>
        <label>{t('changePin')}</label>
        <input type="password" maxLength={6} placeholder={t('newPin')} value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <button className="btn-primary" onClick={save}>{t('savePin')}</button>
      <div className="divider" style={{ maxWidth: 400 }}><div className="line" /></div>
      <p style={{ color: 'var(--muted)', fontSize: 13, maxWidth: 420, lineHeight: 1.8 }}>{t('settingsNote')}</p>
    </div>
  );
}
