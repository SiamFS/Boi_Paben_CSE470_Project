import React, { createContext, useState, useEffect, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://localhost:5000');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'CART_UPDATE' && data.email === userEmail) {
        setCartCount(data.count);
      }
    };

    return () => {
      socket.close();
    };
  }, [userEmail]);

  const updateCartCount = useCallback((count) => {
    setCartCount(count);
  }, []);

  const setUser = useCallback((email) => {
    setUserEmail(email);
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, setUser }}>
      {children}
    </CartContext.Provider>
  );
};