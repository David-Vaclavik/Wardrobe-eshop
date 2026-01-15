import { useOutletContext } from "react-router";
import type { OutletContext } from "../types";
import { ProductsGrid } from "../components/ProductsGrid";
import { useEffect, useRef } from "react";
import "../styles/ShopPage.css";

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

  return (
    <>
      <h1>Shop Page</h1>
      {/* temporary button for testing purposes only */}
      <button onClick={() => console.log(products)}>CLG products</button>

      <ProductsGrid products={products} />

      <div className="load-more-sentinel" ref={loadMoreRef}>
        {isLoading && <h3>Loading more products...</h3>}
        {!hasMore && <h3>No more products to load</h3>}
      </div>
    </>
  );
}
