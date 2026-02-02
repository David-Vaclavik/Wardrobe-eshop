import { useOutletContext, useSearchParams } from "react-router";
import type { OutletContext } from "../types";
import { ProductsGrid } from "../components/ProductsGrid";
import { useEffect, useRef } from "react";
import "../styles/ShopPage.css";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { PRODUCTS_BATCH_SIZE } from "../config/constants";
import { ShopControls } from "../components/ShopControls";
import { useCategoryList } from "../hooks/useCategoryList";

export function ShopPage() {
  const { setSkip, products, isLoading, hasMore } = useOutletContext<OutletContext>();

  const categories = useCategoryList();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || null;
  const category = searchParams.get("category") || null;

  const displayCategory = categories.find((cat) => cat.slug === category)?.name || null;

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const passConditions = !isLoading && hasMore && products.length > 0;
        if (entries[0].isIntersecting && passConditions) {
          setSkip((prev) => prev + PRODUCTS_BATCH_SIZE);
        }
      },
      //! CRITICAL: rootMargin sometimes causes multiple triggers, adjust as needed
      //! This is garbage, time spent solving bugs because of this: ~4 hours
      { threshold: 0.1, rootMargin: "20px" }
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
        <h2 className="shop-title">
          {search ? `Search: "${search}"` : displayCategory ? `${displayCategory}` : "Shop"}
        </h2>

        <ShopControls categories={categories} />

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
      <h2 className="shop-title">
        {search ? `Search: "${search}"` : displayCategory ? `${displayCategory}` : "Shop"}
      </h2>

      <ShopControls categories={categories} />

      <ProductsGrid products={products} isLoading={isLoading} />

      <div className="load-more-sentinel" ref={loadMoreRef}>
        {isLoading && <h3>Loading more products...</h3>}
        {!hasMore && <h3>No more products to load</h3>}
      </div>
    </>
  );
}
