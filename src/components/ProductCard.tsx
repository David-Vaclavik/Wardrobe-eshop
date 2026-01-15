import type { Product } from "../types";
import "../styles/ProductCard.css";
import { priceFormatter } from "../config/locale";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="product-card">
      <img src={product.images[0]} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{priceFormatter.format(product.price)}</p>
    </div>
  );
}
