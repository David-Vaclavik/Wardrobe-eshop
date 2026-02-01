import { PRODUCTS_BATCH_SIZE } from "../config/constants";
import type { Order, Product, ProductsResponse, SortBy } from "../types";

export async function fetchProducts(
  search: string | null = null,
  category: string | null = null,
  sortBy: SortBy = "id",
  order: Order = "asc",
  skip: number = 0,
  limit: number = PRODUCTS_BATCH_SIZE
): Promise<ProductsResponse> {
  const response = await fetch(urlBuilder(search, category, sortBy, order, skip, limit));

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
  }

  const data: ProductsResponse = await response.json();
  return data;
}

function urlBuilder(
  search: string | null = null,
  category: string | null = null,
  sortBy: SortBy = "id",
  order: Order = "asc",
  skip: number = 0,
  limit: number = PRODUCTS_BATCH_SIZE
): string {
  const BASE_URL = "https://dummyjson.com/products";

  let url: URL;

  if (search) {
    url = new URL(`${BASE_URL}/search`);
    url.searchParams.set("q", search);
  } else if (category) {
    url = new URL(`${BASE_URL}/category/${category}`);
  } else {
    url = new URL(BASE_URL);
  }

  url.searchParams.set("sortBy", sortBy);
  url.searchParams.set("order", order);
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("skip", skip.toString());

  return url.toString();
}

// Fetches a single product, only used in ProductPage
export async function fetchProductById(id: string): Promise<ProductsResponse> {
  const response = await fetch(`https://dummyjson.com/products/${id}`);

  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
  }

  const product: Product = await response.json();

  return {
    products: [product],
    total: 1,
    skip: 0,
    limit: 1,
  };
}
