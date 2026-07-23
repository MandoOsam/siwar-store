'use client';
import { useLanguage } from '@/lib/i18n';

export default function FiltersBar({
  categories, activeCategory, onCategoryChange,
  sortBy, onSortChange,
  priceMin, priceMax, onPriceMinChange, onPriceMaxChange,
}) {
  const { t } = useLanguage();

  return (
    <>
      <div className="chips">
        <button className={`chip ${activeCategory === 'ALL' ? 'active' : ''}`} onClick={() => onCategoryChange('ALL')}>
          {t('all')}
        </button>
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${activeCategory === c ? 'active' : ''}`}
            onClick={() => onCategoryChange(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="filters-bar">
        <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="latest">{t('sortLatest')}</option>
          <option value="bestseller">{t('sortBestseller')}</option>
          <option value="price_asc">{t('sortPriceAsc')}</option>
          <option value="price_desc">{t('sortPriceDesc')}</option>
        </select>
        <div className="price-range">
          <input
            type="number"
            placeholder={t('minPrice')}
            value={priceMin}
            onChange={(e) => onPriceMinChange(e.target.value)}
          />
          <span>—</span>
          <input
            type="number"
            placeholder={t('maxPrice')}
            value={priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
