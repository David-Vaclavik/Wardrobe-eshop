import { createContext } from "react";
import type { Cart } from "../types";

export const CartContext = createContext<Cart | null>(null);
