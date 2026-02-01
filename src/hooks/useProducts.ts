import { useEffect, useState } from "react";
import { fetchProductById, fetchProducts } from "../services/productsApi";
import type { Order, Product, SortBy } from "../types";
import { useParams, useSearchParams } from "react-router";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || null;
  const search = searchParams.get("search") || null;
  const sortBy = (searchParams.get("sortBy") || "id") as SortBy;
  const order = (searchParams.get("order") || "asc") as Order;

  const { id } = useParams();

  // Reset to clean state for fetch, fixes back/forward navigation issues
  useEffect(() => {
    setHasMore(true);
    setProducts([]);
    setSkip(0);
  }, [category, search, sortBy, order, id]);

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const data = id
          ? await fetchProductById(id)
          : await fetchProducts(search, category, sortBy, order, skip);

        if (ignore) return;

        if (search) {
          // We filter again on client side because API searches multiple fields, we want title only
          data.products = data.products.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (data.limit + skip >= data.total || data.products.length === 0) {
          setHasMore(false);
        }

        setProducts((prev) => [...prev, ...data.products]);
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
  }, [skip, hasMore, category, search, sortBy, order, id]);

  return { products, error, isLoading, hasMore, setSkip };
}
