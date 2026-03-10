import { useEffect, useState } from "react";
import type { IProduct } from "../types/product";

export function useProduct(id: number) {
  const [product, setProduct] = useState<IProduct>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        setProduct(undefined);

        const res = await fetch(`https://dummyjson.com/products/${id}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data: IProduct = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  return { product, loading, error };
}
