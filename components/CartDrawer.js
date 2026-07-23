'use client';
import { PlaceholderImg } from './BangleIcon';
import { useLanguage } from '@/lib/i18n';
import { money } from '@/lib/format';
import { useStore } from '@/lib/StoreContext';

export default function CartDrawer({ onClose, onCheckout }) {
  const { t, lang } = useLanguage();
  const { cart, products, changeQty } = useStore();

  const items = cart
    .map((c) => ({ ...c, p: products.find((p) => p.id === c.id) }))
    .filter((c) => c.p);
  const total = items.reduce((a, c) => a + c.p.price * c.qty, 0);

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <button className="close-x" onClick={onClose}>✕</button>
        <h2 style={{ marginTop: 0 }}>{t('cart')}</h2>
        {items.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>{t('cartEmpty')}</p>
        ) : (
          items.map((c) => (
            <div key={c.id} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--line)' }}>
              <div style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', background: 'var(--surface-2)', flexShrink: 0 }}>
                {c.p.image ? <img src={c.p.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <PlaceholderImg />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5 }}>{c.p.name}</div>
                <div style={{ color: 'var(--gold-soft)', fontSize: 13 }}>{money(c.p.price, lang)}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button className="icon-btn" onClick={() => changeQty(c.id, -1)}>−</button>
                <span>{c.qty}</span>
                <button className="icon-btn" onClick={() => changeQty(c.id, 1)}>+</button>
              </div>
            </div>
          ))
        )}
        {items.length > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: 16 }}>
              <b>{t('total')}</b>
              <b style={{ color: 'var(--gold-soft)' }}>{money(total, lang)}</b>
            </div>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { onClose(); onCheckout(); }}>
              {t('checkout')}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
