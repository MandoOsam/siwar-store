'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { sget, sset, fetchOrders, insertOrder, updateOrderStatus, deleteOrder } from './storage';
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
      const o = await fetchOrders();
      const savedPin = await sget('pin', ADMIN_PIN);
      setProductsState(p);
      setOrdersState(o);
      setPinState(savedPin);
      setLoaded(true);
    })();
  }, []);

  const setProducts = useCallback(async (next) => {
    setProductsState(next);
    return await sset('products', next);
  }, []);

  const addOrder = useCallback(async (row) => {
    const res = await insertOrder(row);
    if (res.ok) {
      setOrdersState((prev) => [row, ...prev]);
    }
    return res;
  }, []);

  const updateOrder = useCallback(async (id, status) => {
    const res = await updateOrderStatus(id, status);
    if (res.ok) {
      setOrdersState((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    }
    return res;
  }, []);

  const removeOrder = useCallback(async (id) => {
    const res = await deleteOrder(id);
    if (res.ok) {
      setOrdersState((prev) => prev.filter((o) => o.id !== id));
    }
    return res;
  }, []);

  const setPin = useCallback(async (next) => {
    setPinState(next);
    return await sset('pin', next);
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
        orders, addOrder, updateOrder, removeOrder,
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
