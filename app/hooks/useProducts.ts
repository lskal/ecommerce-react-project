import { useEffect, useMemo, useState } from "react";
import type { IProduct, IProductsFetchParams, IProductsResponse } from "../types/product";

export function useProducts({
  limit = 194,
  skip,
  select,
  sortBy,
  order,
  category,
  search,
}: IProductsFetchParams = {}) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // to know what kind of base url to generate
  const mode = search ? "search" : category ? "category" : "all";

  // generate base url
  const baseUrl = useMemo(() => {
    if (mode === "search") return "https://dummyjson.com/products/search";
    if (mode === "category") return `https://dummyjson.com/products/category/${category}`;
    return "https://dummyjson.com/products";
  }, [mode, category]);

  // generate query string
  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    params.set("limit", String(limit));

    if (skip !== undefined) params.set("skip", String(skip));
    if (select) params.set("select", select);

    if (mode === "search" && search) {
      params.set("q", search);
    }

    if (sortBy) params.set("sortBy", sortBy);
    if (order) params.set("order", order);

    return params.toString();
  }, [limit, skip, select, sortBy, order, search, mode]);

  // fetch products based on baseUrl and queryString
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${baseUrl}?${queryString}`);

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: IProductsResponse = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err as Error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [baseUrl, queryString]);

  return { products, loading, error };
}
