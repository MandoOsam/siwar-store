'use client';
import { useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { PlaceholderImg } from '@/components/BangleIcon';
import { useLanguage } from '@/lib/i18n';
import { money } from '@/lib/format';
import { useStore } from '@/lib/StoreContext';
import { useToast } from '@/lib/ToastContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { t, lang } = useLanguage();
  const { products, addToCart, loaded } = useStore();
  const { showToast } = useToast();

  const [activeIdx, setActiveIdx] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  if (!loaded) return null;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <>
        <Nav onCartClick={() => setShowCart(true)} />
        <div className="wrap product-detail-wrap">
          <div className="empty">{t('productNotFound')}</div>
          <button className="btn-primary" style={{ marginTop: 16 }} onClick={() => router.push('/')}>
            {t('backToStore')}
          </button>
        </div>
        <Footer />
        {showCart && (
          <CartDrawer
            onClose={() => setShowCart(false)}
            onCheckout={() => { setShowCart(false); setShowCheckout(true); }}
          />
        )}
        {showCheckout && (
          <CheckoutModal onClose={() => setShowCheckout(false)} />
        )}
      </>
    );
  }

  const images = product.images?.length
    ? product.images
    : product.image
      ? [product.image]
      : [];
  const out = Number(product.stock) <= 0;

  const handleAdd = () => {
    addToCart(product.id);
    showToast(lang === 'ar' ? 'اتضاف للسلة ✓' : 'Added to cart ✓');
  };

  const mainImage = images[activeIdx] || null;

  return (
    <>
      <Nav onCartClick={() => setShowCart(true)} />
      <div className="wrap product-detail-wrap">
        <button className="back-btn" onClick={() => router.push('/')}>
          {t('backToStore')}
        </button>

        <div className="product-detail-grid">
          <div className="gallery">
            <div className="gallery-main">
              {mainImage ? (
                <img src={mainImage} alt={product.name} />
              ) : (
                <PlaceholderImg />
              )}
            </div>
            {images.length > 1 && (
              <div className="gallery-thumbs">
                {images.map((url, idx) => (
                  <div
                    key={idx}
                    className={`gallery-thumb ${idx === activeIdx ? 'active' : ''}`}
                    onClick={() => setActiveIdx(idx)}
                  >
                    <img src={url} alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <div className="card-cat">{product.category || ''}</div>
            <h1 className="product-detail-name">{product.name}</h1>
            <div className="card-price product-detail-price">{money(product.price, lang)}</div>
            {product.description && (
              <p className="product-detail-desc">{product.description}</p>
            )}
            {out ? (
              <div className="out-tag">{t('outOfStock')}</div>
            ) : (
              <button className="btn-primary product-detail-add" onClick={handleAdd}>
                {t('addToCart')}
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
      {showCart && (
        <CartDrawer
          onClose={() => setShowCart(false)}
          onCheckout={() => { setShowCart(false); setShowCheckout(true); }}
        />
      )}
      {showCheckout && (
        <CheckoutModal onClose={() => setShowCheckout(false)} />
      )}
    </>
  );
}
