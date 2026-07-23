'use client';
import { useState } from 'react';
import Nav from './Nav';
import Hero from './Hero';
import FiltersBar from './FiltersBar';
import ProductGrid from './ProductGrid';
import CartDrawer from './CartDrawer';
import ProductModal from './ProductModal';
import CheckoutModal from './CheckoutModal';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import SetupBanner from './SetupBanner';
import { useStore } from '@/lib/StoreContext';
import { getCategories, filterAndSortProducts } from '@/lib/filters';

export default function StoreApp() {
  const { products, orders, loaded } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('latest');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  if (!loaded) return null;

  const categories = getCategories(products);

  const displayed = filterAndSortProducts({
    products,
    orders,
    activeCategory,
    searchQuery,
    priceMin,
    priceMax,
    sortBy,
  });

  const selectedProduct = selectedProductId
    ? products.find((p) => p.id === selectedProductId)
    : null;

  return (
    <>
      <SetupBanner />
      <Nav
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        onCartClick={() => setShowCart(true)}
      />
      <Hero />
      <div className="wrap" id="products">
        <FiltersBar
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          priceMin={priceMin}
          priceMax={priceMax}
          onPriceMinChange={setPriceMin}
          onPriceMaxChange={setPriceMax}
        />
        <ProductGrid
          products={displayed}
          onProductClick={setSelectedProductId}
          emptyIsSearch={!!searchQuery.trim()}
        />
      </div>
      <Footer />
      <WhatsAppFloat />
      {showCart && (
        <CartDrawer
          onClose={() => setShowCart(false)}
          onCheckout={() => { setShowCart(false); setShowCheckout(true); }}
        />
      )}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProductId(null)}
        />
      )}
      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
}
