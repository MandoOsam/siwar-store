'use client';
import { PlaceholderImg } from './BangleIcon';
import { useLanguage } from '@/lib/i18n';
import { money } from '@/lib/format';

export default function ProductCard({ product, onClick }) {
  const { t, lang } = useLanguage();
  const out = Number(product.stock) <= 0;

  return (
    <div className="card" onClick={onClick}>
      <div className="card-img">
        {product.image ? <img src={product.image} alt={product.name} /> : <PlaceholderImg />}
      </div>
      <div className="card-body">
        <div className="card-cat">{product.category || ''}</div>
        <div className="card-name">{product.name}</div>
        <div className="card-price">{money(product.price, lang)}</div>
        {out && <div className="out-tag">{t('outOfStock')}</div>}
      </div>
    </div>
  );
}
