import type { ProductsResponse } from "../types";
import { CATEGORIES } from "./categories";

async function fetchProductsByCategory(category: string) {
  const response = await fetch(`https://dummyjson.com/products/category/${category}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: ProductsResponse = await response.json();
  return data.products;
}

export async function fetchAllProducts() {
  const requests = CATEGORIES.map(fetchProductsByCategory);
  const results = await Promise.all(requests);
  return results.flat();
}
