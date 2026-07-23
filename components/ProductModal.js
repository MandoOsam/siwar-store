'use client';
import { PlaceholderImg } from './BangleIcon';
import { useLanguage } from '@/lib/i18n';
import { money } from '@/lib/format';
import { useStore } from '@/lib/StoreContext';
import { useToast } from '@/lib/ToastContext';

export default function ProductModal({ product, onClose }) {
  const { t, lang } = useLanguage();
  const { addToCart } = useStore();
  const { showToast } = useToast();

  if (!product) return null;
  const out = Number(product.stock) <= 0;

  const handleAdd = () => {
    addToCart(product.id);
    showToast(lang === 'ar' ? 'اتضاف للسلة ✓' : 'Added to cart ✓');
    onClose();
  };

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="sheet">
        <button className="close-x" onClick={onClose}>✕</button>
        <div className="card-img" style={{ borderRadius: 14, marginBottom: 16 }}>
          {product.image ? <img src={product.image} alt={product.name} /> : <PlaceholderImg />}
        </div>
        <div className="card-cat">{product.category || ''}</div>
        <h2 style={{ margin: '6px 0' }}>{product.name}</h2>
        <div className="card-price" style={{ fontSize: 19, marginBottom: 10 }}>{money(product.price, lang)}</div>
        <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: 14.5 }}>{product.description || ''}</p>
        {out ? (
          <div className="out-tag" style={{ marginTop: 14 }}>{t('outOfStock')}</div>
        ) : (
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }} onClick={handleAdd}>
            {t('addToCart')}
          </button>
        )}
      </div>
    </div>
  );
}
