import { useEffect, useState } from "react";
import type { IProduct, IProductsResponse } from "../types/product";

export function useProducts(customUrl?: string) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // add AbortController for the future, for the search feature
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(customUrl ?? "https://dummyjson.com/products");
        const data: IProductsResponse = await res.json();

        setProducts(data.products || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}
