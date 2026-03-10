import type { Route } from "./+types/home";
import { useProduct } from "../hooks/useProduct";
import usePrice from "../hooks/usePrice";
import { useParams } from "react-router";
import NotFound from "../components/not-found/not-found";

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

  return (
    <>
      <img src={product.images?.[0]} alt={product.title} />
      <p>{product.title}</p>
      <p>{usePrice(product.price)}</p>
    </>
  );
}
