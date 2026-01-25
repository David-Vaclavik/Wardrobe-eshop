import { PRODUCTS_BATCH_SIZE } from "../config/constants";
import type { ProductsResponse } from "../types";

export async function fetchPaginatedProducts(
  skip: number,
  limit: number = PRODUCTS_BATCH_SIZE
): Promise<ProductsResponse> {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
  }

  const data: ProductsResponse = await response.json();
  return data;
}

export async function fetchProductsByCategory(
  category: string,
  skip: number = 0,
  limit: number = PRODUCTS_BATCH_SIZE
): Promise<ProductsResponse> {
  const response = await fetch(
    `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
  }

  const data: ProductsResponse = await response.json();
  return data;
}

export async function fetchProductsBySearch(
  query: string,
  skip: number = 0,
  limit: number = PRODUCTS_BATCH_SIZE
): Promise<ProductsResponse> {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`
  );
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
  }

  const data: ProductsResponse = await response.json();
  return data;
}
