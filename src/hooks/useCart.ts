import { useEffect, useState } from "react";
import type { Cart, CartItem, Product } from "../types";
import { CART_STORAGE_KEY, SHIPPING_FEE, TAX_RATE } from "../config/constants";

export function useCart(): Cart {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync across tabs
  const handleStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY && event.newValue) {
      setCartItems(JSON.parse(event.newValue));
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Logger for testing purposes, will remove later
  useEffect(() => {
    console.log("Logger", cartItems);
  }, [cartItems]);

  const updateQuantity = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const index = prev.findIndex((item) => item.product.id === product.id);

      // Update quantity or remove existing item
      if (index !== -1) {
        const newCart = [...prev];
        const newQty = newCart[index].quantity + quantity;

        newCart[index] = { ...newCart[index], quantity: newQty };
        return newCart.filter((item) => item.quantity > 0);
      }

      // Add new item
      if (index === -1 && quantity > 0) {
        return [...prev, { product, quantity }];
      }

      return prev;
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + SHIPPING_FEE;

  return { cartItems, removeFromCart, updateQuantity, clearCart, subtotal, tax, total };
}
