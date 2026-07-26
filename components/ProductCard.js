'use client';
import { useRouter } from 'next/navigation';
import { PlaceholderImg } from './BangleIcon';
import { useLanguage } from '@/lib/i18n';
import { money } from '@/lib/format';

export default function ProductCard({ product }) {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const out = Number(product.stock) <= 0;

  const images = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];
  const thumb = images[0] || null;

  return (
    <div className="card" onClick={() => router.push(`/product/${product.id}`)}>
      <div className="card-img">
        {thumb ? <img src={thumb} alt={product.name} /> : <PlaceholderImg />}
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
