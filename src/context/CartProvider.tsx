import type { ReactNode } from "react";
import { CartContext } from "./CartContext";
import { useCart } from "../hooks/useCart";

type CartProviderProps = {
  children: ReactNode;
};

export function CartProvider({ children }: CartProviderProps) {
  // useCart is only used here to provide the cart context, and context acts as a wrapper
  const cart = useCart();

  return <CartContext value={cart}>{children}</CartContext>;
}
