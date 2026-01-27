import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { useCart } from "../hooks/useCart";

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  const cart = useCart();

  return <CartContext value={cart}>{children}</CartContext>;
}
