'use client';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/StoreContext';
import { money } from '@/lib/format';

const DAY_KEYS_AR = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
const DAY_KEYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_KEYS_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const MONTH_KEYS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function StatsTab() {
  const { t, lang } = useLanguage();
  const { orders } = useStore();

  const now = new Date();
  const todayStr = now.toDateString();
  const weekAgo = new Date(now);
  weekAgo.setDate(weekAgo.getDate() - 7);
  const monthAgo = new Date(now);
  monthAgo.setMonth(monthAgo.getMonth() - 1);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((a, o) => a + (o.total_price || 0), 0);
  const avgOrder = totalOrders ? Math.round(totalRevenue / totalOrders) : 0;

  const todayOrders = orders.filter((o) => o.created_at && new Date(o.created_at).toDateString() === todayStr);
  const weekOrders = orders.filter((o) => o.created_at && new Date(o.created_at) >= weekAgo);
  const monthOrders = orders.filter((o) => o.created_at && new Date(o.created_at) >= monthAgo);

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
  const dayCounts = days.map((d) => orders.filter((o) => o.created_at && new Date(o.created_at).toDateString() === d.toDateString()).length);
  const maxDay = Math.max(1, ...dayCounts);

  const months = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push(d);
  }
  const monthLabels = lang === 'en' ? MONTH_KEYS_EN : MONTH_KEYS_AR;
  const monthCounts = months.map((d) => {
    const y = d.getFullYear();
    const m = d.getMonth();
    return orders.filter((o) => {
      if (!o.created_at) return false;
      const od = new Date(o.created_at);
      return od.getFullYear() === y && od.getMonth() === m;
    }).length;
  });
  const maxMonth = Math.max(1, ...monthCounts);

  return (
    <div>
      <h2 style={{ marginTop: 0 }}>{t('stats')}</h2>
      <div className="stat-cards">
        <div className="stat"><b>{totalOrders}</b><span>{t('totalOrders')}</span></div>
        <div className="stat"><b>{money(totalRevenue, lang)}</b><span>{t('totalSales')}</span></div>
        <div className="stat"><b>{money(avgOrder, lang)}</b><span>{t('avgOrderValue')}</span></div>
        <div className="stat"><b>{todayOrders.length}</b><span>{lang === 'ar' ? 'طلبات اليوم' : "Today's orders"}</span></div>
        <div className="stat"><b>{weekOrders.length}</b><span>{lang === 'ar' ? 'طلبات الأسبوع' : 'This week'}</span></div>
        <div className="stat"><b>{monthOrders.length}</b><span>{lang === 'ar' ? 'طلبات الشهر' : 'This month'}</span></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, alignItems: 'start' }}>
        <div className="stat" style={{ padding: 22 }}>
          <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>{t('last7Days')}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 130 }}>
            {dayCounts.map((c, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: c > 0 ? 700 : 400 }}>{c}</span>
                <div style={{ width: '100%', maxWidth: 34, background: 'var(--gold)', borderRadius: '6px 6px 0 0', height: Math.max(4, (c / maxDay) * 90), transition: 'height .3s' }} />
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>{dayLabels[days[i].getDay()]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="stat" style={{ padding: 22 }}>
          <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>{lang === 'ar' ? 'الطلبات الشهرية' : 'Monthly orders'}</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 130 }}>
            {monthCounts.map((c, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--muted)', fontWeight: c > 0 ? 700 : 400 }}>{c}</span>
                <div style={{ width: '100%', maxWidth: 34, background: 'var(--gold-soft)', borderRadius: '6px 6px 0 0', height: Math.max(4, (c / maxMonth) * 90), transition: 'height .3s' }} />
                <span style={{ fontSize: 10, color: 'var(--muted)' }}>{monthLabels[months[i].getMonth()]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="stat" style={{ padding: 22, marginTop: 20 }}>
        <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 16 }}>{t('bestSelling')}</div>
        {topProducts.length === 0 ? (
          <p style={{ color: 'var(--muted)', fontSize: 13 }}>{t('notEnoughData')}</p>
        ) : (
          topProducts.map(([name, qty]) => (
            <div key={name} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
                <span style={{ color: 'var(--cream)' }}>{name}</span>
                <span style={{ color: 'var(--gold-soft)', fontWeight: 600 }}>{qty}</span>
              </div>
              <div style={{ background: 'var(--surface-2)', borderRadius: 6, height: 7, overflow: 'hidden' }}>
                <div style={{ background: 'var(--gold)', height: '100%', width: `${(qty / maxQty) * 100}%`, borderRadius: 6, transition: 'width .4s' }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
