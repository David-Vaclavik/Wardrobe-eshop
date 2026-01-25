import { useEffect, useState } from "react";
import {
  fetchPaginatedProducts,
  fetchProductsByCategory,
  fetchProductsBySearch,
} from "../services/productsApi";
import type { Product } from "../types";
import { useSearchParams } from "react-router";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || null;
  const search = searchParams.get("search") || null;

  // Reset to clean state for fetch, fixes back/forward navigation issues
  useEffect(() => {
    setHasMore(true);
    setProducts([]);
    setSkip(0);
  }, [category, search]);

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        let data;

        if (search) {
          data = await fetchProductsBySearch(search, skip);
        } else if (category) {
          data = await fetchProductsByCategory(category, skip);
        } else {
          data = await fetchPaginatedProducts(skip);
        }

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
  }, [skip, hasMore, category, search]);

  return { products, error, isLoading, hasMore, setSkip };
}
