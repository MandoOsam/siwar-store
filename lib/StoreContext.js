'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { sget, sset } from './storage';
import { SEED_PRODUCTS, ADMIN_PIN } from './constants';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProductsState] = useState([]);
  const [orders, setOrdersState] = useState([]);
  const [pin, setPinState] = useState(ADMIN_PIN);
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      let p = await sget('products', SEED_PRODUCTS);
      if (!p || p.length === 0) {
        p = SEED_PRODUCTS;
        await sset('products', SEED_PRODUCTS);
      }
      const o = await sget('orders', []);
      const savedPin = await sget('pin', ADMIN_PIN);
      setProductsState(p);
      setOrdersState(o);
      setPinState(savedPin);
      setLoaded(true);
    })();
  }, []);

  const setProducts = useCallback(async (next) => {
    setProductsState(next);
    await sset('products', next);
  }, []);

  const setOrders = useCallback(async (next) => {
    setOrdersState(next);
    await sset('orders', next);
  }, []);

  const setPin = useCallback(async (next) => {
    setPinState(next);
    await sset('pin', next);
  }, []);

  const addToCart = useCallback((id) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) return prev.map((c) => (c.id === id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const changeQty = useCallback((id, delta) => {
    setCart((prev) =>
      prev
        .map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  return (
    <StoreContext.Provider
      value={{
        products, setProducts,
        orders, setOrders,
        pin, setPin,
        cart, addToCart, changeQty, clearCart,
        loaded,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
