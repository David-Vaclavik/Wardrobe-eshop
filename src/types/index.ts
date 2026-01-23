// There are more fields available, but these are the ones we need for now
export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  brand: string;
  thumbnail: string;
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
};

export type OutletContext = {
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  products: Product[];
  isLoading: boolean;
  hasMore: boolean;
  cart: Cart;
};

export type Categories = {
  slug: string; // for API call
  name: string; // for UI display
  url: string;
};
