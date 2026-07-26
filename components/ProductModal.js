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
      <div className="sheet product-modal">
        <button className="close-x" onClick={onClose}>✕</button>
        <div className="modal-body">
          <div className="modal-img">
            {product.image ? <img src={product.image} alt={product.name} /> : <PlaceholderImg />}
          </div>
          <div className="modal-info">
            <div className="card-cat">{product.category || ''}</div>
            <h2>{product.name}</h2>
            <div className="card-price modal-price">{money(product.price, lang)}</div>
            <p className="modal-desc">{product.description || ''}</p>
            {out ? (
              <div className="out-tag modal-out">{t('outOfStock')}</div>
            ) : (
              <button className="btn-primary modal-add" onClick={handleAdd}>
                {t('addToCart')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
