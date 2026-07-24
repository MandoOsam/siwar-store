import { DEFAULT_CATEGORIES } from './constants';

export function getCategories(products) {
  const fromProducts = products.map((p) => p.category).filter(Boolean);
  const set = new Set([...DEFAULT_CATEGORIES, ...fromProducts]);
  return Array.from(set);
}

export function computeSoldMap(orders) {
  const map = {};
  orders.forEach((o) => (o.item || []).forEach((i) => { map[i.id] = (map[i.id] || 0) + i.qty; }));
  return map;
}

export function filterAndSortProducts({ products, orders, activeCategory, searchQuery, priceMin, priceMax, sortBy }) {
  let list = activeCategory === 'ALL' ? products : products.filter((p) => p.category === activeCategory);

  const q = (searchQuery || '').trim();
  if (q) list = list.filter((p) => p.name.includes(q) || (p.description || '').includes(q));

  const min = parseFloat(priceMin);
  const max = parseFloat(priceMax);
  if (!isNaN(min)) list = list.filter((p) => p.price >= min);
  if (!isNaN(max)) list = list.filter((p) => p.price <= max);

  list = [...list];
  if (sortBy === 'price_asc') list.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price_desc') list.sort((a, b) => b.price - a.price);
  else if (sortBy === 'bestseller') {
    const sold = computeSoldMap(orders);
    list.sort((a, b) => (sold[b.id] || 0) - (sold[a.id] || 0));
  }

  return list;
}
