import { useEffect, useState } from "react";
import type { Categories } from "../types";

export function useCategoryList(): Categories[] {
  const [data, setData] = useState<Categories[]>([]);

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products/categories");
        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}`);
        }

        const data: Categories[] = await response.json();

        if (ignore) return;

        setData(data);
      } catch (error) {
        if (!ignore) {
          console.error("Failed to fetch categories:", error);
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return data;
}
