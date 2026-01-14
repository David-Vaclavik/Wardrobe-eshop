import type { Product } from "../types";
import { ProductCard } from "./ProductCard";
import "../styles/ProductsGrid.css";

type ProductsGridProps = {
  products: Product[];
};

export function ProductsGrid({ products }: ProductsGridProps) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
