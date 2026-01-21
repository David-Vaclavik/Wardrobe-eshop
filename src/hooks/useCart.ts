import { useEffect, useState } from "react";
import type { Product } from "../types";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  cartItems: CartItem[];
  updateQuantity: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
};

export function useCart(): Cart {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Logger for testing purposes, will remove later
  useEffect(() => {
    let ignore = false;

    if (ignore) return;
    console.log("Logger", cartItems[0]);

    return () => {
      ignore = true;
    };
  }, [cartItems]);

  const updateQuantity = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);

      // Update quantity or remove existing item
      if (existingItem) {
        const newCartItems = prev.map((item) => {
          if (item.product.id === product.id) {
            const newQuantity = item.quantity + quantity;
            return { ...item, quantity: newQuantity };
          }

          return item;
        });

        return newCartItems.filter((item) => item.quantity > 0);
      }

      // Add new item
      if (!existingItem && quantity > 0) {
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
