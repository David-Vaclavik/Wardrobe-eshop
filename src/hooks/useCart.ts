import { useEffect, useState } from "react";
import type { Cart, CartItem, Product } from "../types";

export function useCart(): Cart {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  return { cartItems, removeFromCart, updateQuantity };
}
