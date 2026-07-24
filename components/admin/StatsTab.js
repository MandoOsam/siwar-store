'use client';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/StoreContext';
import { money } from '@/lib/format';

const DAY_KEYS_AR = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const DAY_KEYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function StatsTab() {
  const { t, lang } = useLanguage();
  const { orders } = useStore();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((a, o) => a + o.total_price, 0);
  const avgOrder = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

  const qtyMap = {};
  orders.forEach((o) => (o.item || []).forEach((i) => { qtyMap[i.name] = (qtyMap[i.name] || 0) + i.qty; }));
  const topProducts = Object.entries(qtyMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxQty = topProducts.length ? topProducts[0][1] : 1;

  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  const dayLabels = lang === 'en' ? DAY_KEYS_EN : DAY_KEYS_AR;
  const dayCounts = days.map((d) => orders.filter((o) => new Date(o.created_at).toDateString() === d.toDateString()).length);
  const maxDay = Math.max(1, ...dayCounts);

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>{t('stats')}</h2>
      <div className="stat-cards">
        <div className="stat"><b>{totalOrders}</b><span>{t('totalOrders')}</span></div>
        <div className="stat"><b>{money(totalRevenue, lang)}</b><span>{t('totalSales')}</span></div>
        <div className="stat"><b>{money(avgOrder, lang)}</b><span>{t('avgOrderValue')}</span></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20, alignItems: 'start' }}>
        <div className="stat" style={{ padding: 22 }}>
          <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>{t('last7Days')}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 120 }}>
            {dayCounts.map((c, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: '100%', maxWidth: 34, background: 'var(--gold)', borderRadius: '6px 6px 0 0', height: Math.max(4, (c / maxDay) * 90) }} />
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>{dayLabels[days[i].getDay()]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="stat" style={{ padding: 22 }}>
          <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>{t('bestSelling')}</div>
          {topProducts.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontSize: 13 }}>{t('notEnoughData')}</p>
          ) : (
            topProducts.map(([name, qty]) => (
              <div key={name} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span>{name}</span><span style={{ color: 'var(--muted)' }}>{qty}</span>
                </div>
                <div style={{ background: 'var(--surface-2)', borderRadius: 6, height: 6, overflow: 'hidden' }}>
                  <div style={{ background: 'var(--gold)', height: '100%', width: `${(qty / maxQty) * 100}%` }} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
