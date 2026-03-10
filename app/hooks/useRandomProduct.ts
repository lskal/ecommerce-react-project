import { useMemo } from "react";
import type { IProduct, TNumberLike } from "../types/product";

function toSafeNumber(value: TNumberLike | undefined, fallback: number) {
  const parsedValue = Number(value ?? fallback);

  if (!Number.isFinite(parsedValue)) return fallback;

  return Math.max(0, Math.floor(parsedValue));
}

export function useRandomProduct(products: IProduct[], amount: TNumberLike = 1) {
  const safeAmount = toSafeNumber(amount, 1);

  return useMemo(() => {
    if (!products.length) return [];

    if (safeAmount >= products.length) {
      return [...products];
    }

    const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

    return shuffledProducts.slice(0, safeAmount);
  }, [products, safeAmount]);
}
