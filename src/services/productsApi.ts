import { PRODUCTS_BATCH_SIZE } from "../config/constants";
import type { Order, ProductsResponse, SortBy } from "../types";

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

  // Priority: search > category > sort > base
  if (search) {
    return `${BASE_URL}/search?q=${search}&sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`;
  } else if (category) {
    return `${BASE_URL}/category/${category}?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`;
  } else if (sortBy !== "id" || order !== "asc") {
    return `${BASE_URL}?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`;
  } else {
    return `${BASE_URL}?limit=${limit}&skip=${skip}`;
  }
}
