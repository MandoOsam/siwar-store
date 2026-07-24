'use client';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/StoreContext';
import { money } from '@/lib/format';

export default function OrdersTab() {
  const { t, lang } = useLanguage();
  const { orders, updateOrder, removeOrder } = useStore();

  const newCount = orders.filter((o) => o.status === 'جديد').length;

  const markDone = async (id) => {
    await updateOrder(id, 'تم التوصيل');
  };
  const remove = async (id) => {
    await removeOrder(id);
  };

  return (
    <div>
      <div className="stat-cards">
        <div className="stat"><b>{orders.length}</b><span>{t('totalOrders')}</span></div>
        <div className="stat"><b>{newCount}</b><span>{t('newOrders')}</span></div>
        <div className="stat"><b>{money(orders.reduce((a, o) => a + o.total_price, 0), lang)}</b><span>{t('totalSales')}</span></div>
      </div>
      <h2 style={{ marginTop: 0 }}>{t('orders')}</h2>
      {orders.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>{t('noOrdersYet')}</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>{t('customer')}</th>
              <th>{t('phoneCol')}</th>
              <th>{t('productsCol')}</th>
              <th>{t('totalCol')}</th>
              <th>{t('statusCol')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const isNew = o.status === 'جديد';
              return (
                <tr key={o.id}>
                  <td>{o.customer_name}<div style={{ color: 'var(--muted)', fontSize: 12 }}>{o.city || ''}</div></td>
                  <td>{o.phone}</td>
                  <td style={{ fontSize: 12.5, color: 'var(--muted)' }}>
                    {o.items.map((i) => `${i.name} ×${i.qty}`).join('، ')}
                  </td>
                  <td>{money(o.total_price, lang)}</td>
                  <td>
                    <span className={`status-pill ${isNew ? 'status-new' : 'status-done'}`}>
                      {isNew ? t('statusNew') : t('statusDone')}
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {isNew && <button className="icon-btn" onClick={() => markDone(o.id)}>✔</button>}
                    <button className="icon-btn" onClick={() => remove(o.id)}>🗑</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
