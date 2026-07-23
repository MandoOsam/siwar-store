'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { money } from '@/lib/format';
import { useStore } from '@/lib/StoreContext';
import { useToast } from '@/lib/ToastContext';

export default function CheckoutModal({ onClose }) {
  const { t, lang } = useLanguage();
  const { cart, products, orders, setOrders, clearCart } = useStore();
  const { showToast } = useToast();

  const [form, setForm] = useState({ name: '', phone: '', city: '', address: '', note: '' });

  const items = cart
    .map((c) => ({ ...c, p: products.find((p) => p.id === c.id) }))
    .filter((c) => c.p);
  const total = items.reduce((a, c) => a + c.p.price * c.qty, 0);

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submitOrder = async () => {
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      showToast(t('fillRequired'));
      return;
    }
    const now = Date.now(); // eslint-disable-line react-hooks/purity
    const order = {
      id: 'o' + now,
      date: new Date(now).toISOString(),
      name: form.name.trim(),
      phone: form.phone.trim(),
      city: form.city.trim(),
      address: form.address.trim(),
      note: form.note.trim(),
      items: items.map((c) => ({ id: c.id, name: c.p.name, qty: c.qty, price: c.p.price })),
      total,
      status: 'جديد',
    };
    await setOrders([order, ...orders]);
    clearCart();
    onClose();
    showToast(t('orderReceived'));
  };

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <button className="close-x" onClick={onClose}>✕</button>
        <h2 style={{ marginTop: 0 }}>{t('deliveryInfo')}</h2>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: -8 }}>{t('codNote')}</p>
        <div className="field">
          <label>{t('fullName')}</label>
          <input value={form.name} onChange={update('name')} />
        </div>
        <div className="row2">
          <div className="field">
            <label>{t('phone')}</label>
            <input value={form.phone} onChange={update('phone')} placeholder="01xxxxxxxxx" />
          </div>
          <div className="field">
            <label>{t('city')}</label>
            <input value={form.city} onChange={update('city')} />
          </div>
        </div>
        <div className="field">
          <label>{t('address')}</label>
          <textarea rows={2} value={form.address} onChange={update('address')} />
        </div>
        <div className="field">
          <label>{t('notes')}</label>
          <input value={form.note} onChange={update('note')} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 16px' }}>
          <span style={{ color: 'var(--muted)' }}>{t('total')}</span>
          <b style={{ color: 'var(--gold-soft)' }}>{money(total, lang)}</b>
        </div>
        <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={submitOrder}>
          {t('confirmOrder')}
        </button>
      </div>
    </div>
  );
}
