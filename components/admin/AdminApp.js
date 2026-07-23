'use client';
import { useState } from 'react';
import PinGate from './PinGate';
import ProductsTab from './ProductsTab';
import OrdersTab from './OrdersTab';
import StatsTab from './StatsTab';
import SettingsTab from './SettingsTab';
import SetupBanner from '@/components/SetupBanner';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/StoreContext';

export default function AdminApp() {
  const { t } = useLanguage();
  const { loaded } = useStore();
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState('products');

  if (!loaded) return null;
  if (!authed) return <PinGate onSuccess={() => setAuthed(true)} />;

  return (
    <>
      <SetupBanner />
      <div className="admin-shell">
        <div className="admin-side">
          <div className="logo" style={{ fontSize: 20, marginBottom: 20 }}>SIWAR</div>
          <button className={`side-link ${tab === 'products' ? 'active' : ''}`} onClick={() => setTab('products')}>
            🧿 <span className="txt">{t('products')}</span>
          </button>
          <button className={`side-link ${tab === 'orders' ? 'active' : ''}`} onClick={() => setTab('orders')}>
            📦 <span className="txt">{t('orders')}</span>
          </button>
          <button className={`side-link ${tab === 'stats' ? 'active' : ''}`} onClick={() => setTab('stats')}>
            📊 <span className="txt">{t('stats')}</span>
          </button>
          <button className={`side-link ${tab === 'settings' ? 'active' : ''}`} onClick={() => setTab('settings')}>
            ⚙️ <span className="txt">{t('settings')}</span>
          </button>
          <a href="/" style={{ marginTop: 'auto' }}><span className="txt">{t('backToStore')}</span></a>
        </div>
        <div className="admin-main">
          {tab === 'products' && <ProductsTab />}
          {tab === 'orders' && <OrdersTab />}
          {tab === 'stats' && <StatsTab />}
          {tab === 'settings' && <SettingsTab />}
        </div>
      </div>
    </>
  );
}
