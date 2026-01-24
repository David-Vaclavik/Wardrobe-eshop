// There are more fields available, but these are the ones we need for now
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
};

export type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Cart = {
  cartItems: CartItem[];
  updateQuantity: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  subtotal: number;
  tax: number;
  total: number;
};

export type OutletContext = {
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  products: Product[];
  isLoading: boolean;
  hasMore: boolean;
  cart: Cart;
};
