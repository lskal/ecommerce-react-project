import type { Route } from "./+types/home";
import { useProduct } from "../hooks/useProduct";
import { useParams } from "react-router";
import ProductPage from "../components/product-page/product-page";

// TODO: fix better metadata
export function meta({}: Route.MetaArgs) {
  return [{ name: "product page", content: "this is the product page" }];
}

export default function ProductDetails() {
  const { id } = useParams();

  if (!id) return null;

  const { product, loading, error } = useProduct(Number(id));

  if (loading) return <p>Loading...</p>;

  if (error || !product) {
    return <p>Sorry, the product you are looking for does not exist.</p>;
  }

  return <ProductPage product={product} />;
}
