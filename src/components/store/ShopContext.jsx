'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'x-shop-state-v1';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [toast, setToast] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const toastTimer = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setWishlistItems(Array.isArray(parsed.wishlistItems) ? parsed.wishlistItems : []);
        setCartItems(Array.isArray(parsed.cartItems) ? parsed.cartItems : []);
      }
    } catch (error) {
      console.error('Failed to restore store data', error);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    if (!isReady) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        wishlistItems,
        cartItems,
      })
    );
  }, [wishlistItems, cartItems, isReady]);

  useEffect(
    () => () => {
      window.clearTimeout(toastTimer.current);
    },
    []
  );

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 1800);
  };

  const isInWishlist = (productId) =>
    wishlistItems.some((item) => item.id === productId);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.title} from wishlist`);
        return prev.filter((item) => item.id !== product.id);
      }
      showToast(`Added ${product.title} to wishlist`);
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          brand: product.brand,
        },
      ];
    });
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const current = prev.find((item) => item.id === product.id);
      if (current) {
        showToast(`Updated ${product.title} quantity`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      showToast(`Added ${product.title} to cart`);
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          brand: product.brand,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlistItems.length;
  const cartSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      wishlistItems,
      cartItems,
      cartCount,
      wishlistCount,
      cartSubtotal,
      toast,
      toggleWishlist,
      isInWishlist,
      addToCart,
      removeFromCart,
    }),
    [wishlistItems, cartItems, cartCount, wishlistCount, cartSubtotal, toast]
  );

  return (
    <ShopContext.Provider value={value}>
      {children}
      {toast ? <div className="shop-toast">{toast}</div> : null}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within ShopProvider');
  }
  return context;
}
