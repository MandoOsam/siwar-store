'use client';
import { useState, useMemo } from 'react';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/StoreContext';
import { money } from '@/lib/format';

function formatOrderDate(dateStr, lang) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  const opts = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', opts);
}

function isWithinDays(dateStr, days) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const now = new Date();
  const diff = (now - d) / (1000 * 60 * 60 * 24);
  return diff <= days;
}

export default function OrdersTab() {
  const { t, lang } = useLanguage();
  const { orders, removeOrder } = useStore();
  const [sortBy, setSortBy] = useState('newest');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    let list = [...orders];
    if (filter === 'today') {
      list = list.filter((o) => {
        if (!o.created_at) return false;
        return new Date(o.created_at).toDateString() === new Date().toDateString();
      });
    } else if (filter === '7days') {
      list = list.filter((o) => isWithinDays(o.created_at, 7));
    } else if (filter === '30days') {
      list = list.filter((o) => isWithinDays(o.created_at, 30));
    }
    list.sort((a, b) => {
      const da = new Date(a.created_at || 0);
      const db = new Date(b.created_at || 0);
      return sortBy === 'newest' ? db - da : da - db;
    });
    return list;
  }, [orders, sortBy, filter]);

  const totalFiltered = filtered.reduce((a, o) => a + (o.total_price || 0), 0);

  const remove = async (id) => {
    await removeOrder(id);
  };

  return (
    <div>
      <div className="stat-cards">
        <div className="stat"><b>{filtered.length}</b><span>{t('totalOrders')}</span></div>
        <div className="stat"><b>{money(totalFiltered, lang)}</b><span>{t('totalSales')}</span></div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>{t('orders')}</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--surface-2)', border: '1px solid var(--line)',
              color: 'var(--cream)', padding: '7px 12px', borderRadius: 10, fontSize: 13, fontFamily: 'inherit',
            }}
          >
            <option value="newest">{t('sortByNewest')}</option>
            <option value="oldest">{t('sortByOldest')}</option>
          </select>
        </div>
      </div>

      <div className="order-filters">
        {[
          ['all', 'filterAll'],
          ['today', 'filterToday'],
          ['7days', 'filter7Days'],
          ['30days', 'filter30Days'],
        ].map(([key, label]) => (
          <button
            key={key}
            className={filter === key ? 'active' : ''}
            onClick={() => setFilter(key)}
          >
            {t(label)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>{t('noOrdersYet')}</p>
      ) : (
        filtered.map((o) => (
          <div key={o.id} className="order-card">
            <div className="order-header">
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--cream)' }}>{o.customer_name}</div>
                <div className="order-meta">
                  <span>{o.phone}</span>
                  {o.city && <span>{o.city}</span>}
                  {o.adderess && <span>{o.adderess}</span>}
                </div>
              </div>
              <div className="order-actions">
                <button className="icon-btn" onClick={() => remove(o.id)}>🗑</button>
              </div>
            </div>

            <div className="order-items">
              {(o.item || []).map((i, idx) => (
                <div key={idx} className="order-item-row">
                  <span>{i.name}</span>
                  <span className="item-qty">×{i.qty} — {money(i.price * i.qty, lang)}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                {t('orderDate')}: {formatOrderDate(o.created_at, lang)}
              </span>
              <div className="order-total">
                <span>{t('total')}</span>
                <span>{money(o.total_price, lang)}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
