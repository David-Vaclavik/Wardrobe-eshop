import { useEffect, useState } from "react";
import { fetchPaginatedProducts, fetchProductsByCategory } from "../services/productsApi";
import type { Product } from "../types";

export function useProducts(category: string | null, skip: number) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const data = category
          ? await fetchProductsByCategory(category, skip)
          : await fetchPaginatedProducts(skip);

        if (ignore) return;

        setProducts((prev) => {
          const newProducts = [...prev, ...data.products];

          if (newProducts.length >= data.total) {
            setHasMore(false);
          }

          return newProducts;
        });
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : "An error occurred");
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    if (hasMore) {
      loadProducts();
    }

    return () => {
      ignore = true;
    };
  }, [skip, hasMore, category]);

  return { products, error, isLoading, hasMore, setProducts, setError, setHasMore };
}
