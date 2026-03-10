import ProductListing from "../components/product-listing/product-listing";
import type { Route } from "./+types/home";

// TODO: fix better metadata
export function meta({}: Route.MetaArgs) {
  return [{ name: "products listing", content: "this is the products page" }];
}

export default function Products() {
  return (
    <>
      <ProductListing />
    </>
  );
}
