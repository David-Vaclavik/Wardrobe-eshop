import { useOutletContext } from "react-router";
import type { OutletContext } from "../types";
import { ProductsGrid } from "../components/ProductsGrid";
import { useEffect, useRef } from "react";
import "../styles/ShopPage.css";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { PRODUCTS_BATCH_SIZE } from "../config/constants";

export function ShopPage() {
  const { setSkip, products, isLoading, hasMore } = useOutletContext<OutletContext>();
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const passConditions = !isLoading && hasMore && products.length > 0;
        if (entries[0].isIntersecting && passConditions) {
          const BATCH_SIZE = 20;
          setSkip((prev) => prev + BATCH_SIZE);
        }
      },
      { threshold: 0.1, rootMargin: "150px" }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isLoading, hasMore, setSkip, products.length]);

  if (isLoading && products.length === 0) {
    return (
      <>
        <h1>Shop Page</h1>

        <div className="products-grid">
          {Array.from({ length: PRODUCTS_BATCH_SIZE }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <h1>Shop Page</h1>

      <ProductsGrid products={products} isLoading={isLoading} />

      <div className="load-more-sentinel" ref={loadMoreRef}>
        {isLoading && <h3>Loading more products...</h3>}
        {!hasMore && <h3>No more products to load</h3>}
      </div>
    </>
  );
}
