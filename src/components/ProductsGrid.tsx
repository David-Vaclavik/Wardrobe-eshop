import type { Product } from "../types";
import { ProductCard } from "./ProductCard";
import "../styles/ProductsGrid.css";
import { ProductCardSkeleton } from "./ProductCardSkeleton";
import { LOADING_SKELETON_COUNT } from "../config/constants";

type ProductsGridProps = {
  products: Product[];
  isLoading?: boolean;
};

export function ProductsGrid({ products, isLoading = false }: ProductsGridProps) {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {isLoading &&
        Array.from({ length: LOADING_SKELETON_COUNT }).map((_, i) => (
          <ProductCardSkeleton key={`skeleton-${i}`} />
        ))}
    </div>
  );
}
