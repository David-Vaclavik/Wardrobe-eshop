import type { Product } from "../types";
import "../styles/ProductCard.css";
import { priceFormatter } from "../config/locale";
import { Link } from "react-router";
import { QuantityControl } from "./QuantityControl";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <img src={product.images[0]} alt={product.title} />
      <div className="product-card-info">
        <h3>{product.title}</h3>
        <p>{priceFormatter.format(product.price)}</p>
        <QuantityControl product={product} />
      </div>
    </Link>
  );
}
