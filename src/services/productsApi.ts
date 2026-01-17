import type { ProductsResponse } from "../types";

export async function fetchPaginatedProducts(
  skip: number,
  limit: number = 20,
): Promise<ProductsResponse> {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  if (!response.ok) {
    throw new Error(`HTTP Error ${response.status} ${response.statusText}`);
  }

  const data: ProductsResponse = await response.json();
  return data;
}
