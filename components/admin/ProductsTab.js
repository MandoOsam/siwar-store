'use client';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { useStore } from '@/lib/StoreContext';
import { useToast } from '@/lib/ToastContext';
import { money } from '@/lib/format';
import ProductForm from './ProductForm';

export default function ProductsTab() {
  const { t, lang } = useLanguage();
  const { products, setProducts } = useStore();
  const { showToast } = useToast();
  const [formId, setFormId] = useState(null);

  const remove = async (id) => {
    await setProducts(products.filter((p) => p.id !== id));
    showToast(t('deleted'));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>{t('products')} ({products.length})</h2>
        <button className="btn-primary" onClick={() => setFormId('new')}>{t('newProduct')}</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>{t('name')}</th>
            <th>{t('category')}</th>
            <th>{t('price')}</th>
            <th>{t('stock')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>
                <div style={{ width: 44, height: 44, borderRadius: 8, overflow: 'hidden', background: 'var(--surface-2)' }}>
                  {p.image && <img src={p.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                </div>
              </td>
              <td>{p.name}</td>
              <td>{p.category || '-'}</td>
              <td>{money(p.price, lang)}</td>
              <td>{p.stock}</td>
              <td style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
                <button className="icon-btn" onClick={() => setFormId(p.id)}>✎</button>
                <button className="icon-btn" onClick={() => remove(p.id)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {formId && <ProductForm productId={formId} onClose={() => setFormId(null)} />}
    </div>
  );
}
