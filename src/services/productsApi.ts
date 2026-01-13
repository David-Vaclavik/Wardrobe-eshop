import type { ProductsResponse } from "../types";

const LIMIT = 20;

export async function fetchPaginatedProducts(skip: number): Promise<ProductsResponse> {
  const response = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`);
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
  }

  const data: ProductsResponse = await response.json();
  return data;
}
