'use client';
import ProductCard from './ProductCard';
import { useLanguage } from '@/lib/i18n';

export default function ProductGrid({ products, onProductClick, emptyIsSearch }) {
  const { t } = useLanguage();

  if (products.length === 0) {
    return (
      <div className="empty">
        {emptyIsSearch ? t('noResults') : t('noProductsInFilter')}
      </div>
    );
  }

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onClick={() => onProductClick(p.id)} />
      ))}
    </div>
  );
}
